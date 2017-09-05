// [AIV]  InCache Build version: 5.0.0  
 var incache =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var helper = __webpack_require__(4);
var Flak = __webpack_require__(5);
var fs = __webpack_require__(9);

var InCache = function () {

    /**
     * Create instance
     * @param [opts] {Object} configuration object
     * @param [opts.maxAge=0] {number} max age in milliseconds. If 0 not expire
     * @param [opts.expires] {Date|string} a Date for expiration. (overwrites `opts.maxAge`)
     * @param [opts.silent=false] {boolean} if true no event will be triggered
     * @param [opts.save=true] {boolean} if true saves cache in disk. (server only)
     * @param [opts.filePath=.incache] {string} cache file path
     * @param [opts.storeName] {string} store name
     * @param [opts.share=true] {boolean} if true use global object as storage
     * @param [opts.autoRemovePeriod=0] {number} period in seconds to remove expired records. When set, the records will be removed only on check, when 0 it won't run
     * @param [opts.nullIfNotFound=true] {boolean} calling `get` if the key is not found returns `null`. If false returns `undefined`
     * @param [opts.global] {Object} **deprecated:** global record configuration
     * @param [opts.global.silent=false] {boolean} **deprecated:** if true no event will be triggered, use `silent` instead
     * @param [opts.global.life=0] {number} **deprecated:** max age in seconds. If 0 not expire, use `maxAge` instead
     * @fires InCache#expired
     * @constructor
     */
    function InCache() {
        var _this = this;

        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, InCache);

        this._emitter = new Flak();

        this._timerExpiryCheck = null;

        /**
         * Global key
         * @type {string}
         * @ignore
         */
        this.GLOBAL_KEY = '___InCache___storage___global___key___';

        /**
         * InCache default configuration
         * @ignore
         * @type {{storeName: string, save: boolean, filePath: string, maxAge: number, expires: null, silent: boolean, share: boolean, global: {silent: boolean, life: number}}}
         */
        this.DEFAULT_CONFIG = {
            storeName: '',
            save: true,
            filePath: '.incache',
            maxAge: 0,
            expires: null,
            silent: false,
            share: true,
            autoRemovePeriod: 0,
            nullIfNotFound: true,
            global: {
                silent: false,
                life: 0
            }
        };

        // Defines callback private
        this._onRemoved = function () {};
        this._onCreated = function () {};
        this._onUpdated = function () {};

        if (helper.isServer()) {
            process.stdin.resume();
            process.on('exit', function () {
                _this._write();
            });
            process.on('SIGINT', function () {
                _this._write();
            });
        }

        this.setConfig(opts);
    }

    _createClass(InCache, [{
        key: '_write',
        value: function _write() {
            var _memory = this._memory,
                config = _memory.config,
                data = _memory.data;

            if (config.save) {
                var content = JSON.stringify(data);
                fs.writeFileSync(config.filePath, content);
            }
        }
    }, {
        key: '_read',
        value: function _read() {
            var config = this._memory.config;
            if (config.save && fs.existsSync(config.filePath)) {
                var content = fs.readFileSync(config.filePath);
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
         * @see {@link constructor} for further information
         */

    }, {
        key: 'setConfig',
        value: function setConfig() {
            var _this2 = this;

            var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


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
            this._root = opts.share ? helper.isServer() ? global : window : {};

            if (opts.storeName) this.GLOBAL_KEY += opts.storeName;

            if (!this._root[this.GLOBAL_KEY]) {
                this._root[this.GLOBAL_KEY] = {
                    metadata: {
                        lastSave: null
                    },
                    data: {},
                    config: this.DEFAULT_CONFIG
                };
            }

            this._root[this.GLOBAL_KEY].config = opts;

            this._memory = this._root[this.GLOBAL_KEY];

            this._storage = this._memory.data;

            if (helper.isServer()) this._read();

            if (this._timerExpiryCheck) {
                clearInterval(this._timerExpiryCheck);
                this._timerExpiryCheck = null;
            }

            if (opts.autoRemovePeriod) {
                this._timerExpiryCheck = setInterval(function () {
                    var expired = _this2.removeExpired();
                    if (expired.length) {
                        _this2._emitter.fire('expired', expired);
                    }
                }, opts.autoRemovePeriod * 1000);
            }
        }

        /**
         * Get configuration
         * @returns {*}
         */

    }, {
        key: 'getConfig',
        value: function getConfig() {
            return this._memory.config;
        }

        /**
         * InCache record
         * @typedef {Object} InCache~record
         * @property {boolean} isNew - indicates if is a new record
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
         * @param [opts.expires] {Date|string} a Date for expiration. (overwrites global configuration and `opts.maxAge`)
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

    }, {
        key: 'set',
        value: function set(key, value) {
            var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


            if (!opts.silent && this._emitter.fireTheFirst('beforeSet', key, value) === false) {
                return;
            }

            var record = {
                isNew: true,
                createdOn: null,
                updatedOn: null,
                expiresOn: null,
                value: value
            };

            opts = helper.defaults(opts, this.DEFAULT_CONFIG);

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
                record.createdOn = this._storage[key].createdOn;
                record.updatedOn = new Date();
                if (!opts.silent) {
                    this._onUpdated.call(this, key, record);
                    this._emitter.fire('update', key, record);
                }
            } else {
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

            return record;
        }

        /**
         * Get record by key
         * @param key {*}
         * @param [onlyValue=true] {boolean} if false get InCache record
         * @returns {*|null|InCache~record}
         * @example
         * inCache.get('my key');
         */

    }, {
        key: 'get',
        value: function get(key) {
            var onlyValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (this.has(key)) {
                if (!this._opts.autoRemovePeriod && this.expired(key)) {
                    this.remove(key, true);
                    return this._opts.nullIfNotFound ? null : undefined;
                }
                return onlyValue ? this._storage[key].value : this._storage[key];
            } else {
                return this._opts.nullIfNotFound ? null : undefined;
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

    }, {
        key: 'remove',
        value: function remove(key) {
            var silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (!silent && this._emitter.fireTheFirst('beforeRemove', key) === false) {
                return;
            }
            delete this._storage[key];
            if (!silent) {
                this._onRemoved.call(this, key);
                this._emitter.fire('remove', key);
            }
        }

        /**
         * Given a key that has value like an array removes key(s) if `where` is satisfied
         * @param key {*}
         * @param where {*}
         * @example
         * inCache.set('myArray', ['hello', 'world']);
         * inCache.removeFrom('myArray', 'hello'); //-> ['world'];
         */

    }, {
        key: 'removeFrom',
        value: function removeFrom(key, where) {
            if (!this.has(key)) return null;

            if (helper.is(where, 'undefined')) throw new Error('where cannot be undefined');

            var recordValue = this.get(key);

            if (!helper.is(recordValue, 'array')) throw new Error('value must be an array');

            var recordLengthBefore = recordValue.length;
            for (var i in recordValue) {
                if (recordValue.hasOwnProperty(i)) {
                    var result = [];
                    for (var prop in where) {
                        if (where.hasOwnProperty(prop)) if (helper.is(where, 'object')) result.push(typeof recordValue[i][prop] !== 'undefined' && recordValue[i][prop] === where[prop]);else result.push(recordValue[i] === where);
                    }

                    if (result.length && result.indexOf(false) === -1) recordValue.splice(i, 1);
                }
            }

            if (recordLengthBefore !== recordValue.length) {
                this.set(key, recordValue);
            }
        }

        /**
         * Remove expired records
         * @returns {Array} expired keys
         * @example
         * inCache.set('my key 1', 'my value');
         * inCache.set('my key 2', 'my value', {maxAge: 1000});
         * inCache.set('my key 3', 'my value', {maxAge: 1500});
         * setTimeout(()=>{
         *      inCache.removeExpired();
         *      inCache.all(); //-> [{key: 'my key 1', value: 'my value'}]
         * }, 2000)
         */

    }, {
        key: 'removeExpired',
        value: function removeExpired() {
            var expired = [];
            for (var key in this._storage) {
                if (this._storage.hasOwnProperty(key) && this.expired(key)) {
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
         * @returns {InCache~record}
         * @example
         * inCache.set('myArray', ['hello', 'world']);
         * inCache.addTo('myArray', 'ciao'); //-> ['hello', 'world', 'ciao'];
         */

    }, {
        key: 'addTo',
        value: function addTo(key, value) {
            if (!this.has(key)) return null;
            var record = this.get(key);

            if (!helper.is(record, 'array')) throw new Error('object must be an array');

            record.push(value);

            return this.set(key, record);
        }

        /**
         * Given a key that has value like an array adds value to beginning of array
         * @param key {*}
         * @param value {*}
         * @returns {InCache~record}
         * @example
         * inCache.set('myArray', ['hello', 'world']);
         * inCache.prependTo('myArray', 'ciao'); //-> ['ciao', 'hello', 'world'];
         */

    }, {
        key: 'prependTo',
        value: function prependTo(key, value) {
            if (!this.has(key)) return null;
            var record = this.get(key);

            if (!helper.is(record, 'array')) throw new Error('object must be an array');

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
         */

    }, {
        key: 'updateIn',
        value: function updateIn(key, value, where) {
            if (!this.has(key)) return null;

            if (helper.is(value, 'undefined')) throw new Error('value cannot be undefined');

            if (helper.is(where, 'undefined')) throw new Error('where cannot be undefined');

            var recordValue = this.get(key);

            if (!helper.is(recordValue, 'array')) throw new Error('value must be an array');

            var updated = false;
            for (var i in recordValue) {
                if (recordValue.hasOwnProperty(i)) {
                    var result = [];
                    for (var prop in where) {
                        if (where.hasOwnProperty(prop)) if (helper.is(where, 'object')) result.push(typeof recordValue[i][prop] !== 'undefined' && recordValue[i][prop] === where[prop]);else result.push(recordValue[i] === where);
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

    }, {
        key: 'bulkSet',
        value: function bulkSet(records) {
            var silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (!helper.is(records, 'array')) throw new Error('records must be an array of object, e.g. {key: foo, value: bar}');

            if (!silent && this._emitter.fireTheFirst('beforeBulkSet', records) === false) {
                return;
            }

            for (var i = 0; i < records.length; i++) {
                if (helper.is(records[i].key, 'undefined') || helper.is(records[i].value, 'undefined')) throw new Error('key and value properties are required');
                this.set(records[i].key, records[i].value, { silent: true, fromBulk: true });
            }

            if (!silent) {
                this._emitter.fire('bulkSet', records);
            }
        }

        /**
         * Delete multiple records
         * @param keys {array} an array of keys
         * @param [silent=false] {boolean} if true no event will be triggered
         * @fires InCache#beforeBulkRemove
         * @fires InCache#bulkRemove
         * @example
         * inCache.bulkRemove(['key1', 'key2', 'key3']);
         */

    }, {
        key: 'bulkRemove',
        value: function bulkRemove(keys, silent) {
            if (!helper.is(keys, 'array')) throw new Error('keys must be an array of keys');

            if (!silent && this._emitter.fireTheFirst('beforeBulkRemove', keys) === false) {
                return;
            }

            for (var i = 0; i < keys.length; i++) {
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

    }, {
        key: 'clean',
        value: function clean(key) {
            if (!helper.is(key, 'string')) throw new Error('key must be a string');

            for (var k in this._storage) {
                if (this._storage.hasOwnProperty(k) && k.indexOf(key) !== -1) delete this._storage[k];
            }
        }

        /**
         * Fetch all records
         * @returns {Array}
         */

    }, {
        key: 'all',
        value: function all() {
            var records = [];

            for (var key in this._storage) {
                if (this._storage.hasOwnProperty(key)) {
                    if (!this._opts.autoRemovePeriod && this.expired(key)) {
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
         * @param key {*}
         * @returns {boolean}
         */

    }, {
        key: 'expired',
        value: function expired(key) {
            if (this._storage[key] && this._storage[key].expiresOn) {
                var now = new Date();
                var expiry = new Date(this._storage[key].expiresOn);
                return now > expiry;
            } else {
                return false;
            }
        }

        /**
         * Remove all records
         */

    }, {
        key: 'clear',
        value: function clear() {
            /**
             * Reset object
             * @ignore
             */
            this._storage = this._memory.data = {};
        }

        /**
         * Check if key exists
         * @param key {*}
         * @returns {boolean}
         * @example
         * inCache.has('my key');
         */

    }, {
        key: 'has',
        value: function has(key) {
            return this._storage.hasOwnProperty(key);
        }

        /**
         * Alias of `remove`
         * @borrows remove as destroy
         * @param args
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            this.remove.apply(this, args);
        }

        /**
         * Adds listener to instance
         * @param eventName {string} event name
         * @param callback {Function} callback
         */

    }, {
        key: 'on',
        value: function on(eventName, callback) {
            this._emitter.on.call(this._emitter, eventName, callback);
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

        /***************************** DEPRECATED ********************************/

        /**
         * Triggered when a record has been deleted. **Deprecated:** use `on('remove', callback)` instead
         * @param callback {InCache~removedCallback} callback function
         * @deprecated
         * @example
         * inCache.onRemoved((key)=>{
         *      console.log('removed', key);
         * });
         */

    }, {
        key: 'onRemoved',
        value: function onRemoved(callback) {
            this._onRemoved = callback;
        }

        /**
         * onRemoved callback
         * @callback InCache~removedCallback
         * @param key {string} key of record removed
         * @deprecated
         */

        /**
         * Triggered when a record has been created. **Deprecated:** use `on('create', callback)` instead
         * @param callback {InCache~createdCallback} callback function
         * @deprecated
         * @example
         * inCache.onCreated((key, record)=>{
         *      console.log('created', key, record);
         * });
         */

    }, {
        key: 'onCreated',
        value: function onCreated(callback) {
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
         * Triggered when a record has been updated. **Deprecated:** use `on('update', callback)` instead
         * @param callback {InCache~updatedCallback} callback function
         * @deprecated
         * @example
         * inCache.onUpdated((key, record)=>{
         *      console.log('updated', key, record);
         * });
         */

    }, {
        key: 'onUpdated',
        value: function onUpdated(callback) {
            this._onUpdated = callback;
        }

        /**
         * onUpdated callback
         * @callback InCache~updatedCallback
         * @param key {string} key of record updated
         * @param record {InCache~record} record object
         * @deprecated
         */

    }]);

    return InCache;
}();

/**
 * Expose module
 */


module.exports = InCache;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var helper = {};

/**
 * Get object type
 * @param object {*}
 * @param type {string}
 * @returns {boolean}
 */
helper.is = function (object, type) {
    var objectToString = Object.prototype.toString.call(object);
    return objectToString.toLowerCase() === '[object ' + type + ']'.toLowerCase();
};

/**
 * Set default value
 * @param opts {Object} options
 * @param defaultOpts {Object} default options
 * @returns {*}
 */
helper.defaults = function (opts, defaultOpts) {
    for (var i in defaultOpts) {
        if (defaultOpts.hasOwnProperty(i)) if (!opts.hasOwnProperty(i)) {
            opts[i] = defaultOpts[i];
        } else {
            if (_typeof(opts[i]) === 'object') {
                helper.defaults(opts[i], defaultOpts[i]);
            }
        }
    }
    return opts;
};

/**
 * Adds seconds to current date
 * @param seconds {number} number of seconds to add
 * @returns {Date}
 * @deprecated
 */
helper.addSecondsToNow = function (seconds) {
    var now = new Date();
    return new Date(now.setSeconds(now.getSeconds() + seconds));
};

/**
 * Adds milliseconds to current date
 * @param ms {number} number of milliseconds to add
 * @returns {Date}
 */
helper.addMSToNow = function (ms) {
    var now = new Date();
    return new Date(now.setMilliseconds(now.getMilliseconds() + ms));
};

/**
 * Check if is Node environment
 * @returns {boolean}
 */
helper.isServer = function () {
    return (typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' && typeof process.pid !== 'undefined';
};

/**
 * Throw deprecated
 * @param prop
 * @param msg
 * @param [type=warn]
 */
helper.deprecated = function (prop, msg) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'warn';

    if (typeof prop !== 'undefined') {
        console[type](msg || prop);
        return true;
    }
    return false;
};

module.exports = helper;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(6);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var helper = __webpack_require__(7);
var error = __webpack_require__(8);

var Flak = function () {
    //TODO add support to cross-domain through postMessage, see: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
    /**
     * Constructor
     * @param [opts] {Object} options
     * @param [opts.maxListeners=10] {number} Max number listeners per event
     * @param [opts.asyncDelay=10] {number} Delay in ms for async method `fireAsync`
     * @example
     * const emitter = new Flak();
     */
    function Flak() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Flak);

        /**
         * Class options
         * @type {{maxListeners: number, asyncDelay: number}}
         * @ignore
         */
        this.defaultClassOpts = {
            maxListeners: 10,
            asyncDelay: 10 // ms
        };

        /**
         * Event options
         * @type {{maxCalls: number, prepend: boolean}}
         * @ignore
         */
        this.defaultListenerOpts = {
            maxCalls: 0,
            prepend: false
        };

        this.opts = helper.defaults(opts, this.defaultClassOpts);
        this.events = {};
    }

    /**
     * Create event and add listener
     * @param eventName {string} event name
     * @param listener {Function} listener function
     * @param [opts] {Object} option object
     * @param [opts.maxCalls=0] {number} Max calls for event created, disabled if is `0`
     * @param [opts.prepend=false] {boolean} Adds the listener function to the beginning of the listeners array for the event named `eventName`
     * @private
     * @ignore
     */


    _createClass(Flak, [{
        key: '_createEvent',
        value: function _createEvent(eventName, listener, opts) {

            if (!this.events[eventName]) this.events[eventName] = [];

            if (this.opts.maxListeners) {
                var maxListeners = this.opts.maxListeners;
                var listenersCount = this.events[eventName].length;
                if (listenersCount >= maxListeners) throw new Error(error[3] + maxListeners);
            }

            listener.opts = helper.defaults(opts, this.defaultListenerOpts);

            listener.info = {
                calls: 0
            };

            if (opts.prepend) this.events[eventName].unshift(listener);else this.events[eventName].push(listener);

            this._created.call(this, eventName, listener, opts);
        }

        /**
         * Call event
         * @param eventName {string} event name
         * @param eventListener {Function} event listener
         * @param args args {*} ...arguments
         * @private
         * @ignore
         */

    }, {
        key: '_callEvent',
        value: function _callEvent(eventName, eventListener, args) {
            if (eventListener.opts.maxCalls && eventListener.info.calls++ >= eventListener.opts.maxCalls) {
                this.off(eventName, eventListener);
                return;
            }

            this._catchAll.call(this, args);
            return eventListener.apply(this, args);
        }

        /**
         * Callback on create
         * @private
         * @ignore
         */

    }, {
        key: '_created',
        value: function _created() {}

        /**
         * Callback on remove
         * @private
         * @ignore
         */

    }, {
        key: '_removed',
        value: function _removed() {}

        /**
         * Callback catch all
         * @private
         * @ignore
         */

    }, {
        key: '_catchAll',
        value: function _catchAll() {}

        /**
         * Adds event listener for eventName
         * @param eventName {string} event name
         * @param listener {(Function|Function[])} listener function
         * @param [opts] {Object} option object
         * @param [opts.maxCalls=0] {number} Max calls for event created, disabled if is `0`
         * @param [opts.prepend=false] {boolean} Adds the listener function to the beginning of the listeners array for the event named `eventName`
         * @returns {Flak}
         * @example
         * emitter.on('myEvent', (param)=>{
         *      console.log(param);
         * });
         */

    }, {
        key: 'on',
        value: function on(eventName, listener) {
            var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            if (!helper.is(eventName, 'string')) throw new Error(error[0]);

            eventName = eventName.trim();

            if (!eventName.length) throw new Error(error[4]);

            if (helper.is(listener, 'array')) {
                for (var i in listener) {
                    if (listener.hasOwnProperty(i)) {
                        if (!helper.is(listener[i], 'function')) throw new Error(error[1]);
                        this._createEvent(eventName, listener[i], opts);
                    }
                }
            } else {
                if (!helper.is(listener, 'function')) throw new Error(error[1]);
                this._createEvent(eventName, listener, opts);
            }

            return this;
        }

        /**
         * Adds a one time listener function for the event named eventName.
         * This is a wrapper method of `on` that set to `opts.maxCalls = 1`
         * @param eventName {string} event name
         * @param listener {(Function|Function[])} listener function
         * @returns {Flak}
         * @example
         * emitter.once('myEvent', (param)=>{
         *      console.log(param);
         * });
         */

    }, {
        key: 'once',
        value: function once(eventName, listener) {
            return this.on(eventName, listener, {
                maxCalls: 1
            });
        }

        /**
         * Calls each of the listeners registered for the event
         * @param eventName {string} event name
         * @param [args] {*} ...arguments
         * @returns {Flak}
         * @example
         * emitter.fire('myEvent', param1, param2, ...);
         */

    }, {
        key: 'fire',
        value: function fire(eventName) {

            if (this.exists(eventName)) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                for (var j = 0; j < this.events[eventName].length; j++) {
                    this._callEvent(eventName, this.events[eventName][j], args);
                }
            }return this;
        }

        /**
         * Calls the first of the listeners registered for the event and return it
         * @param eventName {string} event name
         * @param [args] {*} ...arguments
         * @returns {*}
         * @since 0.3.0
         * @example
         * emitter.on('myEvent', (param1, param2)=>{
         *      return param1 + '-' + param2;
         * });
         * console.log('foo-bar' === emitter.fireTheFirst('myEvent', 'foo', 'bar')) //=> true;
         */

    }, {
        key: 'fireTheFirst',
        value: function fireTheFirst(eventName) {
            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            if (this.exists(eventName)) return this._callEvent(eventName, this.events[eventName][0], args);
        }

        /**
         * Calls each of the listeners registered for the event, this method is async
         * @param eventName {string} event name
         * @param args {*} ...arguments
         * @example
         * emitter.fireAsync('myEvent', param1, param2, ...);
         */

    }, {
        key: 'fireAsync',
        value: function fireAsync(eventName) {
            var _this = this;

            for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                args[_key3 - 1] = arguments[_key3];
            }

            args.unshift(eventName);
            setTimeout(function () {
                _this.fire.apply(_this, args);
            }, this.opts.asyncDelay);
        }

        /**
         * Remove event/listener
         * @param eventName {string} event name
         * @param [listener] {Function} listener function, if is set remove listener only for this event
         * @returns {Flak}
         * @example
         * emitter.off('myEvent'); // remove event
         * emitter.off('myEvent', listener); // remove specific listener
         */

    }, {
        key: 'off',
        value: function off(eventName, listener) {
            if (!helper.is(eventName, 'string')) throw new Error(error[0]);

            if (this.events[eventName]) if (typeof listener === 'function') {
                for (var i = 0; i < this.events[eventName].length; i++) {
                    if (this.events[eventName][i] === listener) {
                        this.events[eventName].splice(i, 1);
                        this._removed.call(this, eventName, listener);
                    }
                }
            } else {
                delete this.events[eventName];
                this._removed.call(this, eventName);
            }

            return this;
        }

        /**
         * Adds the listener function to the beginning of the listeners array for the event named eventName.
         * This is a wrapper method of `on` that set to `opts.prepend = true`
         * @param eventName {string} event name
         * @param listener {(Function|Function[])} listener function
         * @returns {Flak}
         */

    }, {
        key: 'prependListener',
        value: function prependListener(eventName, listener) {
            return this.on(eventName, listener, {
                prepend: true
            });
        }

        /**
         * Adds a one time listener function to the beginning of the listeners array for the event named eventName.
         * This is a wrapper method of `on` that set to `opts.maxCalls = 1` and `opts.prepend = true`
         * @param eventName {string} event name
         * @param listener {(Function|Function[])} listener function
         * @returns {Flak}
         */

    }, {
        key: 'prependOnceListener',
        value: function prependOnceListener(eventName, listener) {
            return this.on(eventName, listener, {
                maxCalls: 1,
                prepend: true
            });
        }

        /**
         * Remove all events
         * @returns {Flak}
         * @example
         * emitter.clear();
         */

    }, {
        key: 'clear',
        value: function clear() {
            this.events = [];
            return this;
        }

        /**
         * Get listeners count
         * @param eventName {string} event name
         * @returns {number}
         * @example
         * emitter.on('event', listener1);
         * emitter.on('event', listener2);
         * emitter.on('event1', listener3);
         *
         * emitter.getListenersCount('event'); // 2
         */

    }, {
        key: 'getListenersCount',
        value: function getListenersCount(eventName) {
            return this.getListeners(eventName).length;
        }

        /**
         * Get listeners list of event
         * @param eventName {string} event name
         * @returns {Array}
         */

    }, {
        key: 'getListeners',
        value: function getListeners(eventName) {
            if (!helper.is(eventName, 'string')) throw new Error(error[0]);

            if (!this.exists(eventName)) throw new Error(error[5]);

            return this.events[eventName];
        }

        /**
         * Get events list
         * @returns {Object}
         */

    }, {
        key: 'getEvents',
        value: function getEvents() {
            return this.events;
        }

        /**
         * Check if event exists
         * @param eventName {string} event name
         * @returns {boolean}
         */

    }, {
        key: 'exists',
        value: function exists(eventName) {
            if (!helper.is(eventName, 'string')) throw new Error(error[0]);

            return !helper.is(this.events[eventName], 'undefined');
        }

        /**
         * Get max number of listeners per event
         * @returns {number}
         */

    }, {
        key: 'getMaxListeners',
        value: function getMaxListeners() {
            return this.opts.maxListeners;
        }

        /**
         * Set max number of listeners per event
         * @param value {int} number max listeners
         * @returns {Flak}
         */

    }, {
        key: 'setMaxListeners',
        value: function setMaxListeners(value) {
            if (!helper.is(value, 'number')) throw new Error(error[2]);

            this.opts.maxListeners = value;
            return this;
        }

        /**
         * Triggered when an event is fired
         * @param callback {Function} callback function
         * @returns {Flak}
         * @since 0.2.0
         * @example
         * emitter.onCatchAll(args=>{
         *      // args is an array of params
         *      console.log(args);
         * });
         *
         * emitter.on('myEvent', param=>{
         *      console.log(param);
         * });
         *
         * emitter.fire('myEvent');
         */

    }, {
        key: 'onCatchAll',
        value: function onCatchAll(callback) {
            this._catchAll = callback;
            return this;
        }

        /**
         * Triggered when an event is created
         * @param callback {Function} callback function
         * @returns {Flak}
         * @example
         * emitter.onCreated(obj=>{
         *      console.log(obj); //-> eventName, listener, opts
         * });
         *
         * emitter.on('myEvent', (param)=>{
         *      console.log(param);
         * });
         */

    }, {
        key: 'onCreated',
        value: function onCreated(callback) {
            this._created = callback;
            return this;
        }

        /**
         * Triggered when an event is removed
         * @param callback {Function} callback function
         * @returns {Flak}
         * @example
         * emitter.onRemoved(obj=>{
         *      console.log(obj); //-> eventName, (listener)
         * });
         *
         * emitter.off('myEvent');
         */

    }, {
        key: 'onRemoved',
        value: function onRemoved(callback) {
            this._removed = callback;
            return this;
        }
    }]);

    return Flak;
}();

module.exports = Flak;
module.exports._error = error;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var helper = {};

/**
 * Get object type
 * @param object {*}
 * @param type {string}
 * @returns {boolean}
 */
helper.is = function (object, type) {
    var objectToString = Object.prototype.toString.call(object);
    return objectToString.toLowerCase() === '[object ' + type + ']'.toLowerCase();
};

/**
 * Set default value
 * @param opts {Object} options
 * @param defaultOpts {Object} default options
 * @returns {*}
 */
helper.defaults = function (opts, defaultOpts) {
    for (var i in defaultOpts) {
        if (defaultOpts.hasOwnProperty(i)) if (!opts.hasOwnProperty(i)) {
            opts[i] = defaultOpts[i];
        } else {
            if (_typeof(opts[i]) === 'object') {
                helper.defaults(opts[i], defaultOpts[i]);
            }
        }
    }
    return opts;
};

module.exports = helper;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ['event name is required and must be a string', 'listener is required and must be a function or an array of function', 'value must be a number', 'increase maxListeners per event: ', 'event name not valid', 'event not found'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ })
/******/ ]); 