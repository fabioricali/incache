const helper = require('./helper');
const fs = require('fs');

class InCache {
    /**
     * Create instance
     * @param [opts] {Object} configuration object
     * @param [opts.save=true] {boolean} if true saves cache in disk
     * @param [opts.filePath=.incache] {string} cache file path
     * @param [opts.storeName] {string} store name
     * @param [opts.global] {Object} global record configuration
     * @param [opts.global.silent=false] {boolean} if true no event will be triggered
     * @param [opts.global.life=0] {number} max age. If 0 not expire
     * @constructor
     */
    constructor(opts = {}) {

        /**
         * Global key
         * @type {string}
         * @ignore
         */

        this.GLOBAL_KEY = '___InCache___storage___global___key___';

        /**
         * Root object
         * @ignore
         */
        this._root = helper.isServer() ? global : window;

        /**
         * InCache default configuration
         * @type {{storeName: string, save: boolean, filePath: string, global: {silent: boolean, life: number}}}
         * @ignore
         */
        this.DEFAULT_CONFIG = {
            storeName: '',
            save: true,
            filePath: '.incache',
            global: {
                silent: false,
                life: 0
            }
        };

        // Defines callback private
        this._onRemoved = () => {};
        this._onCreated = () => {};
        this._onUpdated = () => {};

        if(helper.isServer()) {
            process.stdin.resume();
            process.on('exit', () => {
                this._write()
            });
            process.on('SIGINT', () => {
                this._write()
            });
        }

        this.setConfig(opts);
    }

    _write() {
        let {config, data} = this._memory;
        if (config.save) {
            let content = JSON.stringify(data);
            fs.writeFileSync(config.filePath, content);
        }
    }

    _read() {
        let config = this._memory.config;
        if (config.save && fs.existsSync(config.filePath)) {
            let content = fs.readFileSync(config.filePath);
            try {
                this._storage = this._memory.data = JSON.parse(content);
            } catch (e) {
                this._storage = this._memory.data = {};
            }
        }
    }

    /**
     * Set configuration
     * @param [opts] {Object} configuration object
     * @param [opts.save=true] {boolean} if true saves cache in disk
     * @param [opts.filePath=.incache] {string} cache file path
     * @param [opts.storeName] {string} store name
     * @param [opts.global] {Object} global record configuration
     * @param [opts.global.silent=false] {boolean} if true no event will be triggered
     * @param [opts.global.life=0] {number} max age. If 0 not expire
     */
    setConfig(opts = {}) {
        if (opts.storeName)
            this.GLOBAL_KEY += opts.storeName;

        if (!this._root[this.GLOBAL_KEY]) {
            this._root[this.GLOBAL_KEY] = {
                metadata: {
                    lastSave: null
                },
                data: {},
                config: this.DEFAULT_CONFIG
            };
        }

        this._root[this.GLOBAL_KEY].config = helper.defaults(opts, this.DEFAULT_CONFIG);

        this._memory = this._root[this.GLOBAL_KEY];

        this._storage = this._memory.data;

        if (helper.isServer())
            this._read();
    }

    /**
     * Get configuration
     * @returns {*}
     */
    getConfig() {
        return this._memory.config;
    }

    /**
     * Set/update record
     * @param key {any}
     * @param value {any}
     * @param [opts] {Object} options object
     * @param [opts.silent=false] {boolean} if true no event will be triggered. (overwrites global configuration)
     * @param [opts.life=0] {number} max age. If 0 not expire. (overwrites global configuration)
     * @returns {{isNew: boolean, createdOn: Date|null, updatedOn: Date|null, value: *}}
     * @example
     * inCache.set('my key', 'my value');
     * inCache.set('my object', {a: 1, b: 2});
     * inCache.set('my boolean', true, {life: 2}); // Expires after 2 seconds
     */
    set(key, value, opts = {}) {
        let record = {
            isNew: true,
            createdOn: null,
            updatedOn: null,
            expiresOn: null,
            value: value
        };

        opts = helper.defaults(opts, this.DEFAULT_CONFIG.global);

        if (opts.life && helper.is(opts.life, 'number')) {
            record.expiresOn = helper.addSecondsToNow(opts.life);
        }

        if (this.has(key)) {
            record.isNew = false;
            record.updatedOn = new Date();
            if (!opts.silent)
                this._onUpdated.call(this, key, record);
        } else {
            record.createdOn = new Date();
            if (!opts.silent)
                this._onCreated.call(this, key, record);
        }

        this._storage[key] = record;

        return record;
    }

    /**
     * Set/update multiple records. This method not trigger any event.
     * @param records {array} array of object, e.g. [{key: foo1, value: bar1},{key: foo2, value: bar2}]
     * @example
     * inCache.bulkSet([
     *      {key: 'my key 1', value: 'my value 1'},
     *      {key: 'my key 2', value: 'my value 2'},
     *      {key: 'my key 3', value: 'my value 3'},
     *      {key: 'my key 4', value: 'my value 4'}
     * ]);
     */
    bulkSet(records) {
        if (!helper.is(records, 'array'))
            throw new Error('records must be an array of object, e.g. {key: foo, value: bar}');

        for (let i = 0; i < records.length; i++) {
            if (helper.is(records[i].key, 'undefined') || helper.is(records[i].value, 'undefined'))
                throw new Error('key and value properties are required');
            this.set(records[i].key, records[i].value, {silent: true, fromBulk: true});
        }
    }

    /**
     * Get record by key
     * @param key {any}
     * @param [onlyValue=true] {boolean} if false get InCache record
     * @returns {any|null}
     * @example
     * inCache.get('my key');
     */
    get(key, onlyValue = true) {
        if (this.has(key)) {
            if (this.expired(key)) {
                this.remove(key, true);
                return null;
            }
            return onlyValue ? this._storage[key].value : this._storage[key];
        } else {
            return null;
        }
    }

    /**
     * Delete a record
     * @param key {any}
     * @param [silent=false] {boolean} if true no event will be triggered
     * @param [opts] {Object} optional arguments
     * @example
     * inCache.remove('my key');
     */
    remove(key, silent = false, opts = {}) {
        delete this._storage[key];
        if (!silent)
            this._onRemoved.call(this, key);
    }

    /**
     * Given a key that has value like an array adds value to end of array
     * @param key {any}
     * @param value {any}
     * @returns {*}
     * @example
     * inCache.set('myArray', ['hello', 'world']);
     * inCache.addTo('myArray', 'ciao'); //-> ['hello', 'world', 'ciao'];
     */
    addTo(key, value) {
        if (!this.has(key)) return null;
        let record = this.get(key);

        if (!helper.is(record, 'array'))
            throw new Error('object must be an array');

        record.push(value);

        return this.set(key, record);
    }

    /**
     * Given a key that has value like an array adds value to beginning of array
     * @param key {any}
     * @param value {any}
     * @returns {*}
     * @example
     * inCache.set('myArray', ['hello', 'world']);
     * inCache.prependTo('myArray', 'ciao'); //-> ['ciao', 'hello', 'world'];
     */
    prependTo(key, value) {
        if (!this.has(key)) return null;
        let record = this.get(key);

        if (!helper.is(record, 'array'))
            throw new Error('object must be an array');

        record.unshift(value);

        return this.set(key, record);
    }


    /**
     * Given a key that has value like an array updates key(s) if `where` is satisfied
     * @param key {any}
     * @param value {any}
     * @param where {any}
     * @example
     * inCache.set('myArray', ['hello', 'world']);
     * inCache.updateIn('myArray', 'ciao', 'hello'); //-> ['ciao', 'world'];
     *
     * inCache.set('myArray', [{a: 1, b: 2, c: 3], {b: 2, c: 3}, {b: 4, e: 5});
     * inCache.updateIn('myArray', {z: 0, x: 0}, {b: 2, c: 3}); //-> [{z: 0, x: 0}, {z: 0, x: 0}, {b: 4, e: 5}];
     */
    updateIn(key, value, where) {
        if (!this.has(key)) return null;

        if (helper.is(value, 'undefined'))
            throw new Error('value cannot be undefined');

        if (helper.is(where, 'undefined'))
            throw new Error('where cannot be undefined');

        let recordValue = this.get(key);

        if (!helper.is(recordValue, 'array'))
            throw new Error('value must be an array');

        let updated = false;
        for (let i in recordValue) {
            if (recordValue.hasOwnProperty(i)) {
                let result = [];
                for (let prop in where) {
                    if (where.hasOwnProperty(prop))
                        if (helper.is(where, 'object'))
                            result.push(typeof recordValue[i][prop] !== 'undefined' && recordValue[i][prop] === where[prop]);
                        else
                            result.push(recordValue[i] === where);
                }

                if (result.length && result.indexOf(false) === -1) {
                    updated = true;
                    recordValue[i] = value;
                }
            }
        }

        if (updated) {
            this.set(key, recordValue);
        }
    }

    /**
     * Given a key that has value like an array removes key(s) if `where` is satisfied
     * @param key {any}
     * @param where {any}
     * @example
     * inCache.set('myArray', ['hello', 'world']);
     * inCache.removeFrom('myArray', 'hello'); //-> ['world'];
     */
    removeFrom(key, where) {
        if (!this.has(key)) return null;

        if (helper.is(where, 'undefined'))
            throw new Error('where cannot be undefined');

        let recordValue = this.get(key);

        if (!helper.is(recordValue, 'array'))
            throw new Error('value must be an array');

        let recordLengthBefore = recordValue.length;
        for (let i in recordValue) {
            if (recordValue.hasOwnProperty(i)) {
                let result = [];
                for (let prop in where) {
                    if (where.hasOwnProperty(prop))
                        if (helper.is(where, 'object'))
                            result.push(typeof recordValue[i][prop] !== 'undefined' && recordValue[i][prop] === where[prop]);
                        else
                            result.push(recordValue[i] === where);
                }

                if (result.length && result.indexOf(false) === -1)
                    recordValue.splice(i, 1);
            }
        }

        if (recordLengthBefore !== recordValue.length) {
            this.set(key, recordValue);
        }
    }

    /**
     * Delete multiple records
     * @param keys {array} an array of keys
     * @example
     * inCache.bulkRemove(['key1', 'key2', 'key3']);
     */
    bulkRemove(keys) {
        if (!helper.is(keys, 'array'))
            throw new Error('keys must be an array of keys');

        for (let i = 0; i < keys.length; i++) {
            this.remove(keys[i], true, {fromBulk: true});
        }
    }

    /**
     * Fetch all records
     * @returns {Array}
     */
    all() {
        let records = [];

        for (let key in this._storage) {
            if (this._storage.hasOwnProperty(key)) {
                if (this.expired(key)) {
                    this.remove(key, true);
                } else {
                    records.push({
                        key: key,
                        value: this._storage[key].value
                    });
                }
            }
        }

        return records;
    }

    /**
     * Check if record is expired
     * @param key {any}
     * @returns {boolean}
     */
    expired(key) {
        if (this._storage[key] && this._storage[key].expiresOn) {
            let now = new Date();
            let expiry = new Date(this._storage[key].expiresOn);
            return now > expiry;
        } else {
            return false;
        }
    }

    /**
     * Remove all records
     */
    clear() {
        /**
         * Reset object
         * @ignore
         */
        this._storage = this._memory.data = {};
    }

    /**
     * Check if key exists
     * @param key {any}
     * @returns {boolean}
     * @example
     * inCache.has('my key');
     */
    has(key) {
        return this._storage.hasOwnProperty(key);
    }

    /**
     * Triggered when a record has been deleted
     * @param callback {InCache~removedCallback} callback function
     * @example
     * inCache.onRemoved((key)=>{
     *      console.log('removed', key);
     * });
     */
    onRemoved(callback) {
        this._onRemoved = callback;
    }

    /**
     * onRemoved callback
     * @callback InCache~removedCallback
     * @param key {string} key of record removed
     */

    /**
     * Triggered when a record has been created
     * @param callback {InCache~createdCallback} callback function
     * @example
     * inCache.onCreated((key, record)=>{
     *      console.log('created', key, record);
     * });
     */
    onCreated(callback) {
        this._onCreated = callback;
    }

    /**
     * onCreated callback
     * @callback InCache~createdCallback
     * @param key {string} key of record created
     * @param record {Object} record object
     */

    /**
     * Triggered when a record has been updated
     * @param callback {InCache~updatedCallback} callback function
     * @example
     * inCache.onUpdated((key, record)=>{
     *      console.log('updated', key, record);
     * });
     */
    onUpdated(callback) {
        this._onUpdated = callback;
    }

    /**
     * onUpdated callback
     * @callback InCache~updatedCallback
     * @param key {string} key of record updated
     * @param record {Object} record object
     */
}

/**
 * Expose module
 */
module.exports = InCache;