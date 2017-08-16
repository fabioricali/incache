// [AIV]  InCache Build version: 2.0.0  
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var helper = __webpack_require__(4);

/**
 * @namespace incache
 */
var incache = {};

/**
 * Global key
 * @type {string}
 * @ignore
 */
var GLOBAL_KEY = '___incache___storage___global___key___';

/**
 * Default options
 * @type {{silent: boolean, life: number}}
 * @ignore
 */
var DEFAULT_OPTS = {
    silent: false,
    life: 0
};

/**
 * Root object
 * @ignore
 */
var root = (typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' && typeof process.pid !== 'undefined' ? global : window;

if (!root[GLOBAL_KEY]) root[GLOBAL_KEY] = {};

/**
 * Short storage
 * @ignore
 */
var storage = root[GLOBAL_KEY];

var _onRemoved = function _onRemoved() {};
var _onCreated = function _onCreated() {};
var _onUpdated = function _onUpdated() {};

/**
 * Set/update record
 * @param key {any}
 * @param value {any}
 * @param [opts] {Object} options object
 * @param [opts.silent=false] {boolean} if true no event will be triggered
 * @param [opts.life=0] {number} seconds of life. If 0 not expire.
 * @returns {{isNew: boolean, createdOn: Date|null, updatedOn: Date|null, value: *}}
 * @example
 * incache.set('my key', 'my value');
 * incache.set('my object', {a: 1, b: 2});
 * incache.set('my boolean', true, {life: 2}); // Expires after 2 seconds
 */
incache.set = function (key, value) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var record = {
        isNew: true,
        createdOn: null,
        updatedOn: null,
        expiresOn: null,
        value: value
    };

    opts = helper.defaults(opts, DEFAULT_OPTS);

    if (opts.life && helper.is(opts.life, 'number')) {
        record.expiresOn = helper.addSecondsToNow(opts.life);
    }

    if (incache.has(key)) {
        record.isNew = false;
        record.updatedOn = new Date();
        if (!opts.silent) _onUpdated.call(undefined, key, record);
    } else {
        record.createdOn = new Date();
        if (!opts.silent) _onCreated.call(undefined, key, record);
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
incache.bulkSet = function (records) {
    if (!helper.is(records, 'array')) throw new Error('records must be an array of object, e.g. {key: foo, value: bar}');

    for (var i = 0; i < records.length; i++) {
        if (helper.is(records[i].key, 'undefined') || helper.is(records[i].value, 'undefined')) throw new Error('key and value properties are required');
        incache.set(records[i].key, records[i].value, { silent: true });
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
incache.get = function (key) {
    var onlyValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (incache.has(key)) {
        if (incache.expired(key)) {
            incache.remove(key, true);
            return null;
        }
        return onlyValue ? storage[key].value : storage[key];
    } else {
        return null;
    }
};

/**
 * Delete a record
 * @param key {any}
 * @param [silent=false] {boolean} if true no event will be triggered
 * @example
 * incache.remove('my key');
 */
incache.remove = function (key) {
    var silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    delete storage[key];
    if (!silent) _onRemoved.call(undefined, key);
};

/**
 * Delete multiple records
 * @param keys {array} an array of keys
 * @example
 * incache.bulkRemove(['key1', 'key2', 'key3']);
 */
incache.bulkRemove = function (keys) {
    if (!helper.is(keys, 'array')) throw new Error('keys must be an array of keys');

    for (var i = 0; i < keys.length; i++) {
        incache.remove(keys[i], true);
    }
};

/**
 * Fetch all records
 * @returns {Array}
 */
incache.all = function () {
    var records = [];

    for (var key in storage) {
        if (storage.hasOwnProperty(key)) {
            if (incache.expired(key)) {
                incache.remove(key, true);
            } else {
                records.push({
                    key: key,
                    value: storage[key].value
                });
            }
        }
    }

    return records;
};

/**
 * Check if record is expired
 * @param key {any}
 * @returns {boolean}
 */
incache.expired = function (key) {
    if (storage[key] && storage[key].expiresOn) {
        var now = new Date();
        var expiry = new Date(storage[key].expiresOn);
        return now > expiry;
    } else {
        return false;
    }
};

/**
 * Remove all records
 */
incache.clear = function () {
    /**
     * Reset object
     * @ignore
     */
    storage = root[GLOBAL_KEY] = {};
};

/**
 * Check if key exists
 * @param key {any}
 * @returns {boolean}
 * @example
 * incache.has('my key');
 */
incache.has = function (key) {
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
incache.onRemoved = function (callback) {
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
incache.onCreated = function (callback) {
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
incache.onUpdated = function (callback) {
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
module.exports._global_key = GLOBAL_KEY;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),
/* 2 */
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
 */
helper.addSecondsToNow = function (seconds) {
    var now = new Date();
    return new Date(now.setSeconds(now.getSeconds() + seconds));
};

module.exports = helper;

/***/ })
/******/ ]); 