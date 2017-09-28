const helper = require('./helper');
const Flak = require('flak');
const fs = require('fs');
const uuid = require('uuid/v1');
const clone = require('clone');
const sizeOf = require('object-sizeof');

/**
 * @constant SAVE_MODE
 */

/**
 * @memberOf SAVE_MODE
 * @name TERMINATE
 */

/**
 * @memberOf SAVE_MODE
 * @name TIMER
 */

/**
 * @constant REMOVE_EXCEED
 */

/**
 * @memberOf REMOVE_EXCEED
 * @name OLDER
 */

/**
 * @memberOf REMOVE_EXCEED
 * @name USAGE
 */

const {SAVE_MODE, REMOVE_EXCEED} = require('./constants');

class InCache {

    /**
     * Create instance
     * @param [opts] {Object} configuration object
     * @param [opts.maxAge=0] {number} max age in milliseconds. If 0 not expire. (overwritable by `set`)
     * @param [opts.expires] {Date|string} a Date for expiration. (overwrites `opts.maxAge`, overwritable by `set`)
     * @param [opts.silent=false] {boolean} if true no event will be triggered. (overwritable by `set`)
     * @param [opts.deleteOnExpires=true] {boolean} if false, the record will not be deleted after expiry. (overwritable by `set`)
     * @param [opts.clone=false] {boolean} if true, the object will be cloned before to put it in storage. (overwritable by `set`)
     * @param [opts.preserve=false] {boolean} if true, you will no longer be able to update the record once created. (overwritable by `set`)
     * @param [opts.maxSize=0] {number} the maximum bytes of the cache, if exceeded the older records will be deleted. If 0 is disabled
     * @param [opts.maxRecordNumber=0] {number} the maximum of record number of the cache, if exceeded the older records will be deleted. If 0 is disabled
     * @param [opts.autoLoad=true] {boolean} load cache from disk when instance is created. (server only)
     * @param [opts.autoSave=false] {boolean} if true saves cache in disk when the process is terminated. (server only)
     * @param [opts.autoSaveMode=terminate] {string} there are 2 modes -> "terminate": saves before the process is terminated. "timer": every n seconds checks for new changes and save on disk. (server only)
     * @param [opts.autoSavePeriod=5] {number} period in seconds to check for new changes to save on disk. Works only if `opts.autoSaveMode` is set to 'timer' mode. (server only)
     * @param [opts.removeExceededBy=older] {string} there are 2 modes -> "older": remove older records. "usage": remove less used records.
     * @param [opts.filePath=.incache] {string} cache file path
     * @param [opts.storeName] {string} store name
     * @param [opts.share=false] {boolean} if true, use global object as storage
     * @param [opts.autoRemovePeriod=0] {number} period in seconds to remove expired records. When set, the records will be removed only on check, when 0 it won't run
     * @param [opts.nullIfNotFound=false] {boolean} calling `get` if the key is not found returns `null`. If false returns `undefined`
     * @param [opts.save=false] {boolean} **deprecated:** if true saves cache in disk when the process is terminated. Use `autoSave` instead. (server only)
     * @param [opts.global] {Object} **deprecated:** global record configuration
     * @param [opts.global.silent=false] {boolean} **deprecated:** if true no event will be triggered, use `silent` instead
     * @param [opts.global.life=0] {number} **deprecated:** max age in seconds. If 0 not expire, use `maxAge` instead
     * @fires InCache#expired
     * @fires InCache#change
     * @fires InCache#exceed
     * @constructor
     */
    constructor(opts = {}) {

        Object.defineProperties(this, {
            _root: {
                writable: true,
                enumerable: false
            },
            _storage: {
                writable: true,
                enumerable: false
            },
            _memory: {
                writable: true,
                enumerable: false
            },
            _emitter: {
                value: new Flak()
            },
            _opts: {
                writable: true,
                enumerable: false
            },
            _timerExpiryCheck: {
                value: null,
                writable: true,
                enumerable: false
            },
            _timerSaveCheck: {
                value: null,
                writable: true,
                enumerable: false
            },
            GLOBAL_KEY: {
                writable: true,
                enumerable: false
            },
            _lastChange: {
                value: null,
                writable: true,
                enumerable: false
            },
            _lastChangeDetected: {
                value: null,
                writable: true,
                enumerable: false
            },
            _lastSave: {
                value: null,
                writable: true,
                enumerable: false
            },
            _saving: {
                value: false,
                writable: true,
                enumerable: false
            },
            _loading: {
                value: false,
                writable: true,
                enumerable: false
            }
        });

        /**
         * Global key
         * @type {string}
         * @ignore
         */
        this.GLOBAL_KEY = '___InCache___storage___global___key___';

        /**
         * InCache default configuration
         * @ignore
         */
        this.DEFAULT_CONFIG = {
            storeName: '',
            autoLoad: true,
            autoSave: false,
            autoSaveMode: SAVE_MODE.TERMINATE,
            autoSavePeriod: 5,
            save: false,
            clone: false,
            preserve: false,
            deleteOnExpires: true,
            filePath: '.incache',
            maxAge: 0,
            maxSize: 0,
            maxRecordNumber: 0,
            removeExceededBy: REMOVE_EXCEED.OLDER,
            expires: null,
            silent: false,
            share: false,
            autoRemovePeriod: 0,
            nullIfNotFound: false,
            global: {
                silent: false,
                life: 0
            }
        };

        // Defines callback private
        this._onRemoved = () => {
        };
        this._onCreated = () => {
        };
        this._onUpdated = () => {
        };

        this.on('_change', (by) => {
            this._lastChange = (new Date()).getTime();
            if (!this._opts.silent)
                this._emitter.fire('change', by);
        });

        this.setConfig(opts);
    }

    _checkExceeded() {
        //todo add maxSize check
        //todo REMOVE_EXCEED.USAGE
        let keys = Object.keys(this._storage);
        /* istanbul ignore else  */
        if(this._opts.removeExceededBy === REMOVE_EXCEED.OLDER) {
            if (helper.is(this._opts.maxRecordNumber, 'number') && this._opts.maxRecordNumber > 0 && keys.length > this._opts.maxRecordNumber) {
                let diff = keys.length - this._opts.maxRecordNumber;
                this._emitter.fire('exceed', diff);
                this.bulkRemove(keys.slice(0, diff), true);
            }
        } else if (this._opts.removeExceededBy === REMOVE_EXCEED.USAGE){

        }
    }

    /**
     * Load cache from disk
     * @param [path=opts.filePath] {string} file path
     * @fires InCache#load
     * @returns {Promise}
     * @since 6.0.0
     */
    load(path = this._opts.filePath) {
        return new Promise(
            (resolve, reject) => {
                if (!helper.isServer()) return reject('operation not allowed');
                if (this._loading) return reject('loading locked');

                this._loading = true;

                try {
                    let content = fs.readFileSync(path);
                    this._storage = this._memory.data = JSON.parse(content.toString());
                    this._loading = false;
                    resolve();
                    this._emitter.fireAsync('load', null);
                } catch (err) {
                    err = err.message;
                    this._loading = false;
                    reject(err);
                    this._emitter.fireAsync('load', err);
                }
            }
        )
    }

    /**
     * Save cache into disk
     * @param [path=opts.filePath] {string} file path
     * @fires InCache#save
     * @returns {Promise}
     * @since 6.0.0
     */
    save(path = this._opts.filePath) {
        return new Promise(
            (resolve, reject) => {
                if (!helper.isServer()) return reject('operation not allowed');
                if (this._saving) return reject('saving locked');

                this._saving = true;

                try {
                    fs.writeFileSync(path, JSON.stringify(this._memory.data));
                    this._lastSave = (new Date()).getTime();
                    this._saving = false;
                    resolve();
                    this._emitter.fireAsync('save', null);
                } catch (err) {
                    err = err.message;
                    this._saving = false;
                    reject(err);
                    this._emitter.fireAsync('save', err);
                }
            }
        )
    }

    /**
     * Set configuration
     * @param [opts] {Object} configuration object
     * @see {@link constructor} for further information
     * @since 3.0.0
     */
    setConfig(opts = {}) {

        /* istanbul ignore if  */
        if (opts.global) {
            helper.deprecated(opts.global.life, 'global.life is deprecated use maxAge instead');
            helper.deprecated(opts.global.silent, 'global.silent is deprecated use silent instead');
        }

        helper.defaults(opts, this.DEFAULT_CONFIG);

        this._opts = opts;

        /**
         * Root object
         * @ignore
         */
        this._root = opts.share
            ? helper.isServer()
                ? global
                : window
            : {};

        /* istanbul ignore else  */
        if (opts.storeName)
            this.GLOBAL_KEY += opts.storeName;

        /* istanbul ignore else  */
        if (!this._root[this.GLOBAL_KEY]) {
            this._root[this.GLOBAL_KEY] = {
                metadata: {
                    _lastSave: null
                },
                data: {},
                config: this._opts
            };
        }

        this._root[this.GLOBAL_KEY].config = opts;

        this._memory = this._root[this.GLOBAL_KEY];

        this._storage = this._memory.data;

        /* istanbul ignore else  */
        if (helper.isServer()) {
            if (opts.autoLoad)
                this.load().then().catch((e) => {
                });

            /* istanbul ignore else  */
            if (opts.autoSave || opts.save) {

                /* istanbul ignore else  */
                if (opts.autoSaveMode === SAVE_MODE.TERMINATE) {
                    let self = this;

                    // Wrap function
                    function pWrite() {
                        self.save().then().catch((e) => {
                        });
                    }

                    // Remove if event already exists
                    process.removeListener('exit', pWrite);
                    process.removeListener('SIGINT', pWrite);

                    process.stdin.resume();
                    process.on('exit', pWrite);
                    process.on('SIGINT', pWrite);

                } else if (opts.autoSaveMode === SAVE_MODE.TIMER) {
                    /* istanbul ignore else  */
                    if (this._timerSaveCheck) {
                        clearInterval(this._timerSaveCheck);
                        this._timerSaveCheck = null;
                    }

                    /* istanbul ignore else  */
                    if (opts.autoSavePeriod) {
                        this._timerSaveCheck = setInterval(() => {
                            if (this._lastChange !== this._lastChangeDetected) {
                                this._lastChangeDetected = this._lastChange;
                                this.save().then().catch(e => {
                                });
                            }
                        }, opts.autoSavePeriod * 1000);
                    }
                }

            }
        }

        /* istanbul ignore else  */
        if (this._timerExpiryCheck) {
            clearInterval(this._timerExpiryCheck);
            this._timerExpiryCheck = null;
        }

        /* istanbul ignore else  */
        if (opts.autoRemovePeriod) {
            this._timerExpiryCheck = setInterval(() => {
                let expired = this.removeExpired();
                if (expired.length) {
                    this._emitter.fire('expired', expired);
                }
            }, opts.autoRemovePeriod * 1000);
        }
    }

    /**
     * Get configuration
     * @returns {*}
     */
    getConfig() {
        return this._memory.config;
    }

    /**
     * InCache record
     * @typedef {Object} InCache~record
     * @property {string} id - uuid
     * @property {boolean} isNew - indicates if is a new record
     * @property {boolean} isPreserved - indicates if record will no longer be editable once created
     * @property {boolean} toDelete - indicates if record will be deleted after expiry
     * @property {number} hits - how many times it has been used
     * @property {Date|null} lastHit - last usage
     * @property {Date|null} createdOn - creation date
     * @property {Date|null} updatedOn - update date
     * @property {Date|null} expiresOn - expiry date
     * @property {*} value - record value
     */

    /**
     * Set/update record
     * @param key {*}
     * @param value {*}
     * @param [opts] {Object} options object
     * @param [opts.silent=false] {boolean} if true no event will be triggered. (overwrites global configuration)
     * @param [opts.maxAge=0] {number} max age in milliseconds. If 0 not expire. (overwrites global configuration)
     * @param [opts.clone=false] {boolean} if true, the object will be cloned before to put it in storage. (overwrites global configuration)
     * @param [opts.preserve=false] {boolean} if true, you will no longer be able to update the record once created. (overwrites global configuration)
     * @param [opts.expires] {Date|string} a Date for expiration. (overwrites global configuration and `opts.maxAge`)
     * @param [opts.deleteOnExpires=true] {boolean} if false, the record will not be deleted after expiry. (overwrites global configuration)
     * @param [opts.life=0] {number} **deprecated:** max age in seconds. If 0 not expire. (overwrites global configuration)
     * @returns {InCache~record|*}
     * @fires InCache#beforeSet
     * @fires InCache#create
     * @fires InCache#update
     * @fires InCache#set
     * @example
     * inCache.set('my key', 'my value');
     * inCache.set('my object', {a: 1, b: 2});
     * inCache.set('my boolean', true, {maxAge: 2000}); // Expires after 2 seconds
     */
    set(key, value, opts = {}) {

        /* istanbul ignore else  */
        if (!opts.silent && this._emitter.fireTheFirst('beforeSet', key, value) === false) {
            return;
        }

        opts = helper.defaults(opts, this._opts);

        /* istanbul ignore else  */
        if (this.has(key) && this._storage[key].isPreserved) {
            return;
        }

        /* istanbul ignore else  */
        if (opts.clone) {
            value = clone(value);
        }

        let record = {
            id: null,
            isNew: true,
            isPreserved: opts.preserve,
            toDelete: opts.deleteOnExpires,
            hits: 0,
            lastHit: null,
            createdOn: null,
            updatedOn: null,
            expiresOn: null,
            value: value
        };

        if (opts.expires && (helper.is(opts.expires, 'date') || helper.is(opts.expires, 'string'))) {
            record.expiresOn = new Date(opts.expires);
        } else if (opts.maxAge && helper.is(opts.maxAge, 'number')) {
            record.expiresOn = helper.addMSToNow(opts.maxAge);
        } else if (opts.life && helper.is(opts.life, 'number')) {
            helper.deprecated(opts.life, 'life is deprecated use maxAge instead');
            record.expiresOn = helper.addSecondsToNow(opts.life);
        }

        if (this.has(key)) {
            record.isNew = false;
            record.hits = this._storage[key].hits;
            record.id = this._storage[key].id;
            record.createdOn = this._storage[key].createdOn;
            record.updatedOn = new Date();
            if (!opts.silent) {
                this._onUpdated.call(this, key, record);
                this._emitter.fire('update', key, record);
            }
        } else {
            record.id = uuid();
            record.createdOn = new Date();
            if (!opts.silent) {
                this._onCreated.call(this, key, record);
                this._emitter.fire('create', key, record);
            }
        }

        this._storage[key] = record;

        if (!opts.silent) {
            this._emitter.fire('set', key, record);
        }

        this._checkExceeded();

        this._emitter.fire('_change', 'set');

        return record;
    }

    /**
     * Get record by key
     * @param key {*}
     * @param [onlyValue=true] {boolean} if false get InCache record
     * @returns {InCache~record|*|null|undefined}
     * @example
     * inCache.get('my key');
     */
    get(key, onlyValue = true) {
        if (this.has(key)) {
            if (!this._opts.autoRemovePeriod && this.expired(key) && this._storage[key].toDelete) {
                this.remove(key, true);
                return (this._opts.nullIfNotFound ? null : undefined);
            }
            this._storage[key].hits += 1;
            this._storage[key].lastHit = new Date();
            return onlyValue ? this._storage[key].value : this._storage[key];
        } else {
            return (this._opts.nullIfNotFound ? null : undefined);
        }
    }

    /**
     * Delete a record
     * @param key {*}
     * @param [silent=false] {boolean} if true no event will be triggered
     * @fires InCache#beforeRemove
     * @fires InCache#remove
     * @example
     * inCache.remove('my key');
     */
    remove(key, silent = false) {
        if (!silent && this._emitter.fireTheFirst('beforeRemove', key) === false) {
            return;
        }
        delete this._storage[key];
        if (!silent) {
            this._onRemoved.call(this, key);
            this._emitter.fire('remove', key);
        }
        this._emitter.fire('_change', 'remove');
    }

    /**
     * Given a key that has value like an array removes key(s) if `where` is satisfied
     * @param key {*}
     * @param where {*}
     * @example
     * inCache.set('myArray', ['hello', 'world']);
     * inCache.removeFrom('myArray', 'hello'); //-> ['world'];
     * @since 3.0.0
     */
    removeFrom(key, where) {
        if (!this.has(key)) return null;

        if (helper.is(where, 'undefined'))
            throw new Error('where cannot be undefined');

        if (this._storage[key].isPreserved) {
            return;
        }

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
     * Remove expired records
     * @returns {Array} expired keys
     * @since 4.1.0
     * @example
     * inCache.set('my key 1', 'my value');
     * inCache.set('my key 2', 'my value', {maxAge: 1000});
     * inCache.set('my key 3', 'my value', {maxAge: 1500});
     * setTimeout(()=>{
     *      inCache.removeExpired();
     *      inCache.all(); //-> [{key: 'my key 1', value: 'my value'}]
     * }, 2000)
     */
    removeExpired() {
        const expired = [];
        for (let key in this._storage) {
            if (this._storage.hasOwnProperty(key) && this.expired(key) && this._storage[key].toDelete) {
                this.remove(key, true);
                expired.push(key);
            }
        }
        return expired;
    }

    /**
     * Given a key that has value like an array adds value to end of array
     * @param key {*}
     * @param value {*}
     * @returns {InCache~record|undefined}
     * @example
     * inCache.set('myArray', ['hello', 'world']);
     * inCache.addTo('myArray', 'ciao'); //-> ['hello', 'world', 'ciao'];
     * @since 3.0.0
     */
    addTo(key, value) {
        if (!this.has(key)) return;
        let record = this.get(key);

        if (this._storage[key].isPreserved) {
            return;
        }

        if (!helper.is(record, 'array'))
            throw new Error('object must be an array');

        record.push(value);

        return this.set(key, record);
    }

    /**
     * Given a key that has value like an array adds value to beginning of array
     * @param key {*}
     * @param value {*}
     * @returns {InCache~record|undefined}
     * @example
     * inCache.set('myArray', ['hello', 'world']);
     * inCache.prependTo('myArray', 'ciao'); //-> ['ciao', 'hello', 'world'];
     * @since 3.0.0
     */
    prependTo(key, value) {
        if (!this.has(key)) return;

        if (this._storage[key].isPreserved) {
            return;
        }

        let record = this.get(key);

        if (!helper.is(record, 'array'))
            throw new Error('object must be an array');

        record.unshift(value);

        return this.set(key, record);
    }


    /**
     * Given a key that has value like an array updates key(s) if `where` is satisfied
     * @param key {*}
     * @param value {*}
     * @param where {*}
     * @example
     * inCache.set('myArray', ['hello', 'world']);
     * inCache.updateIn('myArray', 'ciao', 'hello'); //-> ['ciao', 'world'];
     *
     * inCache.set('myArray', [{a: 1, b: 2, c: 3], {b: 2, c: 3}, {b: 4, e: 5});
     * inCache.updateIn('myArray', {z: 0, x: 0}, {b: 2, c: 3}); //-> [{z: 0, x: 0}, {z: 0, x: 0}, {b: 4, e: 5}];
     * @since 3.0.0
     */
    updateIn(key, value, where) {
        if (!this.has(key)) return;

        if (helper.is(value, 'undefined'))
            throw new Error('value cannot be undefined');

        if (helper.is(where, 'undefined'))
            throw new Error('where cannot be undefined');

        if (this._storage[key].isPreserved) {
            return;
        }

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
     * Set/update multiple records. This method not trigger any event.
     * @param records {array} array of object, e.g. [{key: foo1, value: bar1},{key: foo2, value: bar2}]
     * @param [silent=false] {boolean} if true no event will be triggered
     * @fires InCache#beforeBulkSet
     * @fires InCache#bulkSet
     * @example
     * inCache.bulkSet([
     *      {key: 'my key 1', value: 'my value 1'},
     *      {key: 'my key 2', value: 'my value 2'},
     *      {key: 'my key 3', value: 'my value 3'},
     *      {key: 'my key 4', value: 'my value 4'}
     * ]);
     */
    bulkSet(records, silent = false) {
        if (!helper.is(records, 'array'))
            throw new Error('records must be an array of object, e.g. {key: foo, value: bar}');

        if (!silent && this._emitter.fireTheFirst('beforeBulkSet', records) === false) {
            return;
        }

        for (let i = 0; i < records.length; i++) {
            if (helper.is(records[i].key, 'undefined') || helper.is(records[i].value, 'undefined'))
                throw new Error('key and value properties are required');
            this.set(records[i].key, records[i].value, {silent: true, fromBulk: true});
        }

        if (!silent) {
            this._emitter.fire('bulkSet', records);
        }
    }

    /**
     * Delete multiple records
     * @param keys {Array} an array of keys
     * @param [silent=false] {boolean} if true no event will be triggered
     * @fires InCache#beforeBulkRemove
     * @fires InCache#bulkRemove
     * @example
     * inCache.bulkRemove(['key1', 'key2', 'key3']);
     */
    bulkRemove(keys, silent) {
        if (!helper.is(keys, 'array'))
            throw new Error('keys must be an array of keys');

        if (!silent && this._emitter.fireTheFirst('beforeBulkRemove', keys) === false) {
            return;
        }

        for (let i = 0; i < keys.length; i++) {
            this.remove(keys[i], true);
        }

        if (!silent) {
            this._emitter.fire('bulkRemove', keys);
        }
    }

    /**
     * Delete multiple records that contain the passed keyword
     * @param key {string} a string that is relative to a group of keys
     * @example
     * inCache.set('/api/users/foo', 'Mario Rossi');
     * inCache.set('/api/users/bar', 'Antonio Bianchi');
     * inCache.clean('/api/users');
     */
    clean(key) {
        if (!helper.is(key, 'string'))
            throw new Error('key must be a string');

        for (let k in this._storage) {
            if (this._storage.hasOwnProperty(k) && k.indexOf(key) !== -1) {
                delete this._storage[k];
                this._emitter.fire('_change', 'clean');
            }
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
                if (!this._opts.autoRemovePeriod && this.expired(key) && this._storage[key].toDelete) {
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
     * Returns total of records in storage
     * @returns {Number}
     * @since 6.0.0
     */
    count() {
        this.removeExpired();
        return Object.keys(this._storage).length;
    }

    /**
     * Check if record is expired
     * @param key {*}
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
        this._emitter.fire('_change', 'clear');
    }

    /**
     * Check if key exists
     * @param key {*}
     * @returns {boolean}
     * @example
     * inCache.has('my key');
     */
    has(key) {
        return this._storage.hasOwnProperty(key);
    }

    /**
     * Alias of `remove`
     * @borrows remove as destroy
     * @param args
     * @since 4.1.1
     */
    destroy(...args) {
        this.remove.apply(this, args);
    }

    /**
     * Adds listener to instance
     * @param eventName {string} event name
     * @param callback {Function} callback
     */
    on(eventName, callback) {
        this._emitter.on.call(this._emitter, eventName, callback);
    }

    /**
     * Returns stats of storage
     * @returns {{count: Number, size: Number}}
     * @since 6.3.0
     */
    stats() {
        return {
            count: this.count(),
            size: sizeOf(this._storage)
        }
    }

    /**
     * Triggered before set
     * @event InCache#beforeSet
     * @param key {string} key
     * @param value {string} value
     * @since 5.0.0
     */

    /**
     * Triggered after set
     * @event InCache#set
     * @param key {string} key
     * @param record {InCache~record} record object
     * @since 5.0.0
     */

    /**
     * Triggered after create the record
     * @event InCache#create
     * @param key {string} key of record
     * @param record {InCache~record} record object
     * @since 5.0.0
     */

    /**
     * Triggered after update the record
     * @event InCache#update
     * @param key {string} key of record
     * @param record {InCache~record} record object
     * @since 5.0.0
     */

    /**
     * Triggered before remove the record
     * @event InCache#beforeRemove
     * @param key {string} key of record to be removed
     * @since 5.0.0
     */

    /**
     * Triggered after record has been removed
     * @event InCache#remove
     * @param key {string} key of record
     * @since 5.0.0
     */

    /**
     * Triggered before bulk set
     * @event InCache#beforeBulkSet
     * @param records {array} array of objects
     * @since 5.0.0
     */

    /**
     * Triggered after bulk set
     * @event InCache#bulkSet
     * @param records {array} array of objects
     * @since 5.0.0
     */

    /**
     * Triggered before remove the records
     * @event InCache#beforeBulkRemove
     * @param keys {array} array of keys to be removed
     * @since 5.0.0
     */

    /**
     * Triggered after records have been removed
     * @event InCache#bulkRemove
     * @param keys {array} array of keys removed
     * @since 5.0.0
     */

    /**
     * Triggered when records are expired and `opts.autoRemovePeriod` is set
     * @event InCache#expired
     * @param keys {array} array of keys expired
     * @since 5.0.0
     */

    /**
     * Triggered after load invocation
     * @event InCache#load
     * @param err {null|string} error message, if no errors occurred is null
     * @since 6.0.0
     */

    /**
     * Triggered after save invocation
     * @event InCache#save
     * @param err {null|string} error message, if no errors occurred is null
     * @since 6.0.0
     */

    /**
     * Triggered when data is changed
     * @event InCache#change
     * @param by {string} event called by `set`,`remove`,`clear` or `clean`
     * @since 6.1.0
     */

    /**
     * Triggered when data exceed max size
     * @event InCache#exceed
     * @param diff {number} exceeded by record number
     * @since 6.1.0
     */

    /***************************** DEPRECATED ********************************/

    /**
     * Triggered when a record has been deleted. **Deprecated since 5.0.0:** use `on('remove', callback)` instead.
     * @param callback {InCache~removedCallback} callback function
     * @deprecated
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
     * @deprecated
     */

    /**
     * Triggered when a record has been created. **Deprecated since 5.0.0:** use `on('create', callback)` instead
     * @param callback {InCache~createdCallback} callback function
     * @deprecated
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
     * @param record {InCache~record} record object
     * @deprecated
     */

    /**
     * Triggered when a record has been updated. **Deprecated since 5.0.0:** use `on('update', callback)` instead
     * @param callback {InCache~updatedCallback} callback function
     * @deprecated
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
     * @param record {InCache~record} record object
     * @deprecated
     */
}

/**
 * Expose module
 */
module.exports = InCache;
module.exports.SAVE_MODE = SAVE_MODE;
module.exports.REMOVE_EXCEED = REMOVE_EXCEED;