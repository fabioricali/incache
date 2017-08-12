const helper = require('./helper');

/**
 * @namespace incache
 */
const incache = {};

/**
 * Global key
 * @type {string}
 * @ignore
 */
const globalKey = '___incache___storage___global___key';

/**
 * Root object
 * @ignore
 */
const root = typeof process === 'object' && typeof process.pid !== 'undefined' ? global : window;

if (!root[globalKey])
    root[globalKey] = {};

/**
 * Short storage
 * @ignore
 */
let storage = root[globalKey];

let _onRemoved = () => {
};
let _onCreated = () => {
};
let _onUpdated = () => {
};

/**
 * Set/update record
 * @param key {any}
 * @param value {any}
 * @param [silent=false] {boolean} if true no event will be triggered
 * @returns {{isNew: boolean, createdOn: Date|null, updatedOn: Date|null, value: *}}
 * @example
 * incache.set('my key', 'my value');
 * incache.set('my object', {a: 1, b: 2});
 * incache.set('my boolean', true);
 */
incache.set = (key, value, silent) => {
    let record = {
        isNew: true,
        createdOn: null,
        updatedOn: null,
        value: value
    };

    if (incache.has(key)) {
        record.isNew = false;
        record.updatedOn = new Date();
        if(!silent)
            _onUpdated.call(this, key, record);
    } else {
        record.createdOn = new Date();
        if(!silent)
            _onCreated.call(this, key, record);
    }

    storage[key] = record;

    return record;
};

/**
 * Set/update multiple records. This method not trigger any event.
 * @param records {array} array of object, e.g. [{key: foo1, value: bar1},{key: foo2, value: bar2}]
 * @example
 * incache.bulkSet([
 *      {key: 'my key 1', value: 'my value 1'},
 *      {key: 'my key 2', value: 'my value 2'},
 *      {key: 'my key 3', value: 'my value 3'},
 *      {key: 'my key 4', value: 'my value 4'}
 * ]);
 */
incache.bulkSet = (records) => {
    if (!helper.is(records, 'array'))
        throw new Error('records must be an array of object, e.g. {key: foo, value: bar}');

    for (let i = 0; i < records.length; i++) {
        if (helper.is(records[i].key, 'undefined') || helper.is(records[i].value, 'undefined'))
            throw new Error('key and value properties are required');
        incache.set(records[i].key, records[i].value, true);
    }
};

/**
 * Get record by key
 * @param key {any}
 * @param [onlyValue=true] {boolean} if false get incache record
 * @returns {any|null}
 * @example
 * incache.get('my key');
 */
incache.get = (key, onlyValue = true) => {
    return incache.has(key) ?
        onlyValue ?
            storage[key].value : storage[key]
        : null;
};

/**
 * Delete a record
 * @param key {any}
 * @param [silent=false] {boolean} if true no event will be triggered
 * @example
 * incache.remove('my key');
 */
incache.remove = (key, silent = false) => {
    delete storage[key];
    if(!silent)
        _onRemoved.call(this, key);
};

/**
 * Delete multiple records
 * @param keys {array} an array of keys
 * @example
 * incache.bulkRemove(['key1', 'key2', 'key3']);
 */
incache.bulkRemove = (keys) => {
    if (!helper.is(keys, 'array'))
        throw new Error('keys must be an array of keys');

    for (let i = 0; i < keys.length; i++) {
        incache.remove(keys[i], true);
    }
};

/**
 * Fetch all records
 * @returns {Array}
 */
incache.all = () => {
    let records = [];

    for (let key in storage)
        if (storage.hasOwnProperty(key))
            records.push({
                key: key,
                value: storage[key].value
            });

    return records;
};

/**
 * Remove all records
 */
incache.clear = () => {
    /**
     * Reset object
     * @ignore
     */
    storage = root[globalKey] = {};
};

/**
 * Check if key exists
 * @param key {any}
 * @returns {boolean}
 * @example
 * incache.has('my key');
 */
incache.has = (key) => {
    return storage.hasOwnProperty(key);
};

/**
 * Triggered when a record has been deleted
 * @param callback {incache.onRemoved~removedCallback} callback function
 * @example
 * incache.onRemoved((key)=>{
 *      console.log('removed', key);
 * });
 */
incache.onRemoved = (callback) => {
    _onRemoved = callback;
};

/**
 * onRemoved callback
 * @callback incache.onRemoved~removedCallback
 * @param key {string} key of record removed
 */

/**
 * Triggered when a record has been created
 * @param callback {incache.onCreated~createdCallback} callback function
 * @example
 * incache.onCreated((key, record)=>{
 *      console.log('created', key, record);
 * });
 */
incache.onCreated = (callback) => {
    _onCreated = callback;
};

/**
 * onCreated callback
 * @callback incache.onCreated~createdCallback
 * @param key {string} key of record created
 * @param record {Object} record object
 */

/**
 * Triggered when a record has been updated
 * @param callback {incache.onUpdated~updatedCallback} callback function
 * @example
 * incache.onUpdated((key, record)=>{
 *      console.log('updated', key, record);
 * });
 */
incache.onUpdated = (callback) => {
    _onUpdated = callback;
};

/**
 * onUpdated callback
 * @callback incache.onUpdated~updatedCallback
 * @param key {string} key of record updated
 * @param record {Object} record object
 */

/**
 * Expose module
 */
module.exports = incache;
module.exports._global_key = globalKey;