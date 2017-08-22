// [AIV]  InCache Build version: 4.0.0  
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
/* WEBPACK VAR INJECTION */(function(global, process) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var helper = __webpack_require__(4);
var fs = __webpack_require__(5);

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
     * @param [opts.global] {Object} **deprecated:** global record configuration
     * @param [opts.global.silent=false] {boolean} **deprecated:** if true no event will be triggered, use `silent` instead
     * @param [opts.global.life=0] {number} **deprecated:** max age in seconds. If 0 not expire, use `maxAge` instead
     * @constructor
     */
    function InCache() {
        var _this = this;

        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, InCache);

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
            maxAge: 0,
            silent: false,
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
            var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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

            if (opts.global) {
                helper.deprecated(opts.global.life, 'global.life is deprecated use maxAge instead');
                helper.deprecated(opts.global.silent, 'global.silent is deprecated use silent instead');
            }

            this._root[this.GLOBAL_KEY].config = helper.defaults(opts, this.DEFAULT_CONFIG);

            this._memory = this._root[this.GLOBAL_KEY];

            this._storage = this._memory.data;

            if (helper.isServer()) this._read();
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
         * @property {any} value - record value
         */

        /**
         * Set/update record
         * @param key {any}
         * @param value {any}
         * @param [opts] {Object} options object
         * @param [opts.silent=false] {boolean} if true no event will be triggered. (overwrites global configuration)
         * @param [opts.maxAge=0] {number} max age in milliseconds. If 0 not expire. (overwrites global configuration)
         * @param [opts.expires] {Date|string} a Date for expiration. (overwrites global configuration and `opts.maxAge`)
         * @param [opts.life=0] {number} **deprecated:** max age in seconds. If 0 not expire. (overwrites global configuration)
         * @returns {InCache~record}
         * @example
         * inCache.set('my key', 'my value');
         * inCache.set('my object', {a: 1, b: 2});
         * inCache.set('my boolean', true, {maxAge: 2000}); // Expires after 2 seconds
         */

    }, {
        key: 'set',
        value: function set(key, value) {
            var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var record = {
                isNew: true,
                createdOn: null,
                updatedOn: null,
                expiresOn: null,
                value: value
            };

            opts = helper.defaults(opts, this.DEFAULT_CONFIG);

            if (opts.maxAge && helper.is(opts.maxAge, 'number')) {
                record.expiresOn = helper.addMSToNow(opts.maxAge);
            } else if (opts.life && helper.is(opts.life, 'number')) {
                helper.deprecated(opts.life, 'life is deprecated use maxAge instead');
                record.expiresOn = helper.addSecondsToNow(opts.life);
            } else if (opts.expires && (helper.is(opts.expires, 'date') || helper.is(opts.expires, 'string'))) {
                record.expiresOn = new Date(opts.expires);
            }

            if (this.has(key)) {
                record.isNew = false;
                record.updatedOn = new Date();
                if (!opts.silent) this._onUpdated.call(this, key, record);
            } else {
                record.createdOn = new Date();
                if (!opts.silent) this._onCreated.call(this, key, record);
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

    }, {
        key: 'bulkSet',
        value: function bulkSet(records) {
            if (!helper.is(records, 'array')) throw new Error('records must be an array of object, e.g. {key: foo, value: bar}');

            for (var i = 0; i < records.length; i++) {
                if (helper.is(records[i].key, 'undefined') || helper.is(records[i].value, 'undefined')) throw new Error('key and value properties are required');
                this.set(records[i].key, records[i].value, { silent: true, fromBulk: true });
            }
        }

        /**
         * Get record by key
         * @param key {any}
         * @param [onlyValue=true] {boolean} if false get InCache record
         * @returns {any|null|InCache~record}
         * @example
         * inCache.get('my key');
         */

    }, {
        key: 'get',
        value: function get(key) {
            var onlyValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

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

    }, {
        key: 'remove',
        value: function remove(key) {
            var silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            delete this._storage[key];
            if (!silent) this._onRemoved.call(this, key);
        }

        /**
         * Given a key that has value like an array adds value to end of array
         * @param key {any}
         * @param value {any}
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
         * @param key {any}
         * @param value {any}
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
         * Given a key that has value like an array removes key(s) if `where` is satisfied
         * @param key {any}
         * @param where {any}
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
         * Delete multiple records
         * @param keys {array} an array of keys
         * @example
         * inCache.bulkRemove(['key1', 'key2', 'key3']);
         */

    }, {
        key: 'bulkRemove',
        value: function bulkRemove(keys) {
            if (!helper.is(keys, 'array')) throw new Error('keys must be an array of keys');

            for (var i = 0; i < keys.length; i++) {
                this.remove(keys[i], true, { fromBulk: true });
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
         * @param key {any}
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
         * Triggered when a record has been deleted
         * @param callback {InCache~removedCallback} callback function
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
         */

        /**
         * Triggered when a record has been created
         * @param callback {InCache~createdCallback} callback function
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
         */

        /**
         * Triggered when a record has been updated
         * @param callback {InCache~updatedCallback} callback function
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
         */

    }]);

    return InCache;
}();

/**
 * Expose module
 */


module.exports = InCache;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(0)))

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


/***/ })
/******/ ]); 