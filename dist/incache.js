// [AIV]  InCache Build version: 7.1.1  
 (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("incache", [], factory);
	else if(typeof exports === 'object')
		exports["incache"] = factory();
	else
		root["incache"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function splitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function () {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = i >= 0 ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function (path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function (p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function (path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function () {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function (p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};

// path.relative(from, to)
// posix version
exports.relative = function (from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};

exports.basename = function (path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  return splitPath(path)[3];
};

function filter(xs, f) {
  if (xs.filter) return xs.filter(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
  return str.substr(start, len);
} : function (str, start, len) {
  if (start < 0) start = str.length + start;
  return str.substr(start, len);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(16);
var ieee754 = __webpack_require__(17);
var isArray = __webpack_require__(18);

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength();

function typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {
        return 42;
      } };
    return arr.foo() === 42 && // typed array instances can be augmented
    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
  } catch (e) {
    return false;
  }
}

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that;
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }
  return createBuffer(that, size);
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that;
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }
  return length | 0;
}

function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length);
}

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

Buffer.compare = function compare(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;
    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};

function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0;

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;
      case 'hex':
        return len >>> 1;
      case 'base64':
        return base64ToBytes(string).length;
      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }
  if (thisStart >= thisEnd) {
    return -1;
  }
  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0;

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1;

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset; // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }
      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }
  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
    // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
    // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0;

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds');

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return '';
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        }

        // valid lead
        leadSurrogate = codePoint;

        continue;
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }
  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(7);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var helper = __webpack_require__(8);
var Flak = __webpack_require__(9);
var fs = __webpack_require__(2);
var write = __webpack_require__(10);
var uuid = __webpack_require__(12);
var clone = __webpack_require__(15);
var sizeOf = __webpack_require__(19);

var _require = __webpack_require__(21),
    SAVE_MODE = _require.SAVE_MODE,
    RECORD = _require.RECORD;

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
 * InCache recordInfo
 * @typedef {Object} InCache~recordInfo
 * @property {string} id - uuid
 * @property {boolean} isNew - indicates if is a new record
 * @property {boolean} isPreserved - indicates if record will no longer be editable once created
 * @property {boolean} toDelete - indicates if record will be deleted after expiry
 * @property {number} hits - how many times it has been used
 * @property {Date|null} lastHit - last usage
 * @property {Date|null} createdOn - creation date
 * @property {Date|null} updatedOn - update date
 * @property {Date|null} expiresOn - expiry date
 */

/**
 * @class
 */


var InCache = function (_Flak) {
    _inherits(InCache, _Flak);

    /**
     * Create instance
     * @param [opts] {Object} configuration object
     * @param [opts.maxAge=0] {number} max age in milliseconds. If 0 not expire. (overwritable by `set`)
     * @param [opts.expires] {Date|string} a Date for expiration. (overwrites `opts.maxAge`, overwritable by `set`)
     * @param [opts.silent=false] {boolean} if true no event will be triggered. (overwritable by `set`)
     * @param [opts.deleteOnExpires=true] {boolean} if false, the record will not be deleted after expiry. (overwritable by `set`)
     * @param [opts.clone=false] {boolean} if true, the object will be cloned before to put it in storage. (overwritable by `set`)
     * @param [opts.preserve=false] {boolean} if true, you will no longer be able to update the record once created. (overwritable by `set`)
     * @param [opts.maxRecordNumber=0] {number} the maximum of record number of the cache, if exceeded some records will be deleted. If 0 is disabled
     * @param [opts.autoLoad=true] {boolean} load cache from disk when instance is created.
     * @param [opts.autoSave=false] {boolean} if true saves cache in disk when the process is terminated.
     * @param [opts.autoSaveMode=terminate] {string} there are 2 modes -> "terminate": saves before the process is terminated (server only). "timer": every n seconds checks for new changes and save on disk.
     * @param [opts.autoSavePeriod=5] {number} period in seconds to check for new changes to save on disk. Works only if `opts.autoSaveMode` is set to 'timer' mode.
     * @param [opts.filePath=.incache] {string|*} cache file path or key. If is a falsy value, `load` and `save` will always be solved
     * @param [opts.storeName] {string} store name
     * @param [opts.share=false] {boolean} if true, use global object as storage
     * @param [opts.autoRemovePeriod=0] {number} period in seconds to remove expired records. When set, the records will be removed only on check, when 0 it won't run
     * @param [opts.nullIfNotFound=false] {boolean} calling `get` if the key is not found returns `null`. If false returns `undefined`
     * @param [opts.save=false] {boolean} **deprecated:** if true saves cache in disk when the process is terminated. Use `autoSave` instead.
     * @param [opts.global] {Object} **deprecated:** global record configuration
     * @param [opts.global.silent=false] {boolean} **deprecated:** if true no event will be triggered, use `silent` instead
     * @param [opts.global.life=0] {number} **deprecated:** max age in seconds. If 0 not expire, use `maxAge` instead
     * @fires InCache#expired
     * @fires InCache#change
     * @fires InCache#exceed
     * @constructor
     * @returns {InCache}
     */
    function InCache() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, InCache);

        var _this = _possibleConstructorReturn(this, (InCache.__proto__ || Object.getPrototypeOf(InCache)).call(this));

        Object.defineProperties(_this, {
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
        _this.GLOBAL_KEY = '___InCache___storage___global___key___';

        /**
         * InCache default configuration
         * @ignore
         */
        _this.DEFAULT_CONFIG = {
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
            maxRecordNumber: 0,
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
        _this._onRemoved = function () {};
        _this._onCreated = function () {};
        _this._onUpdated = function () {};

        _this.on('_change', function (by) {
            _this._lastChange = new Date().getTime();
            if (!_this._opts.silent) _this.fire('change', by);
        });

        _this.setConfig(opts);

        //return this;
        return _this;
    }

    _createClass(InCache, [{
        key: '_checkExceeded',
        value: function _checkExceeded() {
            if (!this._opts.maxRecordNumber) return;
            var keys = Object.keys(this._memory.data);
            /* istanbul ignore else  */
            if (keys.length > this._opts.maxRecordNumber) {
                var diff = keys.length - this._opts.maxRecordNumber;
                this.fire('exceed', diff);
                this.bulkRemove(keys.slice(0, diff), true);
            }
        }
    }, {
        key: '_importData',
        value: function _importData(data) {
            /* istanbul ignore else  */
            if (helper.is(data, 'object')) {
                var keys = Object.keys(data);

                if (keys.length) {
                    if (InCache.isRecord(data[keys[0]])) this._memory.data = data;else this.bulkSet(data, true);
                }
            } else if (helper.is(data, 'array')) {
                if (data.length) this.bulkSet(data, true);
            } else {
                throw new Error('bad data');
            }
        }

        /**
         * Load cache from disk
         * @param [path=opts.filePath] {string} file path or key (browser scenario)
         * @fires InCache#beforeLoad
         * @fires InCache#load
         * @returns {Promise}
         * @since 6.0.0
         */

    }, {
        key: 'load',
        value: function load() {
            var _this2 = this;

            var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._opts.filePath;

            return new Promise(function (resolve, reject) {
                if (!path) return resolve(_this2);

                if (_this2._loading) return reject('loading locked');

                /* istanbul ignore else  */
                if (_this2.fireTheFirst('beforeLoad', _this2) === false) {
                    return reject();
                }

                _this2._loading = true;

                try {
                    var content = helper.isServer() ? fs.readFileSync(path) : window.localStorage.getItem(path);

                    if (content === null) helper.throwError('content cannot is null');

                    _this2._importData(JSON.parse(content.toString()));
                    _this2._loading = false;
                    resolve(_this2);
                    _this2.fireAsync('load', null, _this2);
                } catch (err) {
                    err = err.message;
                    _this2._loading = false;
                    reject(err);
                    _this2.fireAsync('load', err, _this2);
                }
            });
        }

        /**
         * Save cache into disk
         * @param [path=opts.filePath] {string} file path or key (browser scenario)
         * @fires InCache#beforeSave
         * @fires InCache#save
         * @returns {Promise}
         * @since 6.0.0
         */

    }, {
        key: 'save',
        value: function save() {
            var _this3 = this;

            var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._opts.filePath;

            return new Promise(function (resolve, reject) {
                if (!path) return resolve(_this3);

                if (_this3._saving) return reject('saving locked');

                /* istanbul ignore else  */
                if (_this3.fireTheFirst('beforeSave', _this3) === false) {
                    return reject();
                }

                _this3._saving = true;

                var dataString = JSON.stringify(_this3._memory.data);

                try {
                    if (helper.isServer()) write.sync(path, dataString, {});else window.localStorage.setItem(path, dataString);

                    _this3._lastSave = new Date().getTime();
                    _this3._saving = false;
                    resolve(_this3);
                    _this3.fireAsync('save', null, _this3);
                } catch (err) {
                    err = err.message;
                    _this3._saving = false;
                    reject(err);
                    _this3.fireAsync('save', err, _this3);
                }
            });
        }

        /**
         * Set configuration
         * @param [opts] {Object} configuration object
         * @see {@link constructor} for further information
         * @since 3.0.0
         */

    }, {
        key: 'setConfig',
        value: function setConfig() {
            var _this4 = this;

            var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


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
            this._root = opts.share ? helper.isServer() ? global : window : {};

            /* istanbul ignore else  */
            if (opts.storeName) this.GLOBAL_KEY += opts.storeName;

            /* istanbul ignore else  */
            if (!this._root[this.GLOBAL_KEY]) {
                this._root[this.GLOBAL_KEY] = {
                    data: {}
                };
            }

            this._memory = this._root[this.GLOBAL_KEY];

            /* istanbul ignore else  */
            //if (helper.isServer()) {
            if (opts.autoLoad) this.load().then().catch(function (e) {});

            /* istanbul ignore else  */
            if (opts.autoSave || opts.save) {

                /* istanbul ignore else  */
                if (opts.autoSaveMode === SAVE_MODE.TERMINATE && helper.isServer()) {

                    // Wrap function
                    var pWrite = function pWrite() {
                        self.save().then().catch(function (e) {});
                    };

                    // Remove if event already exists


                    var self = this;process.removeListener('exit', pWrite);
                    process.removeListener('SIGINT', pWrite);

                    //process.stdin.resume();
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
                        this._timerSaveCheck = setInterval(function () {
                            if (_this4._lastChange !== _this4._lastChangeDetected) {
                                _this4._lastChangeDetected = _this4._lastChange;
                                _this4.save().then().catch(function (e) {});
                            }
                        }, opts.autoSavePeriod * 1000);
                    }
                }
            }
            //}

            /* istanbul ignore else  */
            if (this._timerExpiryCheck) {
                clearInterval(this._timerExpiryCheck);
                this._timerExpiryCheck = null;
            }

            /* istanbul ignore else  */
            if (opts.autoRemovePeriod) {
                this._timerExpiryCheck = setInterval(function () {
                    var expired = _this4.removeExpired();
                    if (expired.length) {
                        _this4.fire('expired', expired);
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
            return this._opts;
        }

        /**
         * Set/update record
         * @param key {string}
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

    }, {
        key: 'set',
        value: function set(key, value) {
            var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


            /* istanbul ignore else  */
            if (!opts.silent && this.fireTheFirst('beforeSet', key, value) === false) {
                return;
            }

            opts = helper.defaults(opts, this._opts);

            /* istanbul ignore else  */
            if (this.has(key) && this._memory.data[key].isPreserved) {
                return;
            }

            /* istanbul ignore else  */
            if (opts.clone) {
                value = clone(value);
            }

            var record = Object.assign({}, RECORD);

            record.isNew = true;
            record.isPreserved = opts.preserve;
            record.toDelete = opts.deleteOnExpires;
            record.hits = 0;
            record.value = value;

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
                record.hits = this._memory.data[key].hits;
                record.id = this._memory.data[key].id;
                record.createdOn = this._memory.data[key].createdOn;
                record.updatedOn = new Date();
                if (!opts.silent) {
                    this._onUpdated.call(this, key, record);
                    this.fire('update', key, record);
                }
            } else {
                record.id = uuid();
                record.createdOn = new Date();
                if (!opts.silent) {
                    this._onCreated.call(this, key, record);
                    this.fire('create', key, record);
                }
            }

            this._memory.data[key] = record;

            if (!opts.silent) {
                this.fire('set', key, record);
            }

            this._checkExceeded();

            this.fire('_change', 'set');

            return record;
        }

        /**
         * Get record by key
         * @param key {string}
         * @param [onlyValue=true] {boolean} if false get InCache record
         * @returns {InCache~record|*|null|undefined}
         * @example
         * inCache.get('my key');
         */

    }, {
        key: 'get',
        value: function get(key) {
            var onlyValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (this.has(key)) {
                if (this.canBeAutoRemove(key)) {
                    this.remove(key, true);
                    return this._opts.nullIfNotFound ? null : undefined;
                }
                this._memory.data[key].hits += 1;
                this._memory.data[key].lastHit = new Date();

                this.fire('get', key, this._memory.data[key]);

                return onlyValue ? this._memory.data[key].value : this._memory.data[key];
            } else {
                return this._opts.nullIfNotFound ? null : undefined;
            }
        }

        /**
         * Get info record by key
         * @param key {string}
         * @returns {InCache~recordInfo|*|undefined}
         * @example
         * inCache.info('my key');
         * @since 7.1.0
         */

    }, {
        key: 'info',
        value: function info(key) {
            if (this.has(key)) {
                if (this.canBeAutoRemove(key)) {
                    this.remove(key, true);
                    return undefined;
                }

                var record = Object.assign({}, this._memory.data[key]);
                delete record.value;

                return record;
            } else {
                return undefined;
            }
        }

        /**
         * Delete a record
         * @param key {string}
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

            if (!silent && this.fireTheFirst('beforeRemove', key) === false) {
                return;
            }
            delete this._memory.data[key];
            if (!silent) {
                this._onRemoved.call(this, key);
                this.fire('remove', key);
            }
            this.fire('_change', 'remove');
        }

        /**
         * Given a key that has value like an array removes key(s) if `where` is satisfied
         * @param key {string}
         * @param where {*}
         * @example
         * inCache.set('myArray', ['hello', 'world']);
         * inCache.removeFrom('myArray', 'hello'); //-> ['world'];
         * @since 3.0.0
         */

    }, {
        key: 'removeFrom',
        value: function removeFrom(key, where) {
            if (!this.has(key)) return null;

            if (helper.is(where, 'undefined')) throw new Error('where cannot be undefined');

            if (this._memory.data[key].isPreserved) {
                return;
            }

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

    }, {
        key: 'removeExpired',
        value: function removeExpired() {
            var expired = [];
            for (var key in this._memory.data) {
                if (this._memory.data.hasOwnProperty(key) && this.expired(key) && this._memory.data[key].toDelete) {
                    this.remove(key, true);
                    expired.push(key);
                }
            }
            return expired;
        }

        /**
         * Given a key that has value like an array adds value to end of array
         * @param key {string}
         * @param value {*}
         * @returns {InCache~record|undefined}
         * @example
         * inCache.set('myArray', ['hello', 'world']);
         * inCache.addTo('myArray', 'ciao'); //-> ['hello', 'world', 'ciao'];
         * @since 3.0.0
         */

    }, {
        key: 'addTo',
        value: function addTo(key, value) {
            if (!this.has(key)) return;
            var record = this.get(key);

            if (this._memory.data[key].isPreserved) {
                return;
            }

            if (!helper.is(record, 'array')) throw new Error('object must be an array');

            record.push(value);

            return this.set(key, record);
        }

        /**
         * Given a key that has value like an array adds value to beginning of array
         * @param key {string}
         * @param value {*}
         * @returns {InCache~record|undefined}
         * @example
         * inCache.set('myArray', ['hello', 'world']);
         * inCache.prependTo('myArray', 'ciao'); //-> ['ciao', 'hello', 'world'];
         * @since 3.0.0
         */

    }, {
        key: 'prependTo',
        value: function prependTo(key, value) {
            if (!this.has(key)) return;

            if (this._memory.data[key].isPreserved) {
                return;
            }

            var record = this.get(key);

            if (!helper.is(record, 'array')) throw new Error('object must be an array');

            record.unshift(value);

            return this.set(key, record);
        }

        /**
         * Given a key that has value like an array updates key(s) if `where` is satisfied
         * @param key {string}
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

    }, {
        key: 'updateIn',
        value: function updateIn(key, value, where) {
            if (!this.has(key)) return;

            if (helper.is(value, 'undefined')) throw new Error('value cannot be undefined');

            if (helper.is(where, 'undefined')) throw new Error('where cannot be undefined');

            if (this._memory.data[key].isPreserved) {
                return;
            }

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
         * @param records {Array} e.g. [{key: foo1, value: bar1},{key: foo2, value: bar2}]
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
         * // or
         * inCache.bulkSet(['hello','world']);
         *
         * @returns {{}|undefined}
         */

    }, {
        key: 'bulkSet',
        value: function bulkSet(records) {
            var silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (!helper.is(records, 'array') && !helper.is(records, 'object')) throw new Error('records must be an array, e.g. {key: foo, value: bar}');

            if (!silent && this.fireTheFirst('beforeBulkSet', records) === false) {
                return;
            }

            var result = {};
            var record = void 0;

            for (var i = 0; i < records.length; i++) {

                if (!helper.is(records[i].key, 'undefined') && !helper.is(records[i].value, 'undefined')) {
                    record = this.set(records[i].key, records[i].value, { silent: true, fromBulk: true });
                    if (record) result[records[i].key] = record;
                } else {
                    record = this.set(i, records[i], { silent: true, fromBulk: true });
                    if (record) result[i] = record;
                }
            }

            if (!silent) {
                this.fire('bulkSet', records);
            }

            return result;
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

    }, {
        key: 'bulkRemove',
        value: function bulkRemove(keys, silent) {
            if (!helper.is(keys, 'array')) throw new Error('keys must be an array of keys');

            if (!silent && this.fireTheFirst('beforeBulkRemove', keys) === false) {
                return;
            }

            for (var i = 0; i < keys.length; i++) {
                this.remove(keys[i], true);
            }

            if (!silent) {
                this.fire('bulkRemove', keys);
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

            for (var k in this._memory.data) {
                if (this._memory.data.hasOwnProperty(k) && k.indexOf(key) !== -1) {
                    delete this._memory.data[k];
                    this.fire('_change', 'clean');
                }
            }
        }

        /**
         * Fetch all records
         * @param asObject
         * @returns {*}
         */

    }, {
        key: 'all',
        value: function all() {
            var asObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var records = asObject ? {} : [];

            for (var key in this._memory.data) {
                if (this._memory.data.hasOwnProperty(key)) {
                    if (this.canBeAutoRemove(key)) {
                        this.remove(key, true);
                    } else {
                        if (Array.isArray(records)) {
                            records.push({
                                key: key,
                                value: this._memory.data[key].value
                            });
                        } else {
                            records[key] = this._memory.data[key].value;
                        }
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

    }, {
        key: 'count',
        value: function count() {
            this.removeExpired();
            return Object.keys(this._memory.data).length;
        }

        /**
         * Check if record is expired
         * @param key {string}
         * @returns {boolean}
         */

    }, {
        key: 'expired',
        value: function expired(key) {
            if (this._memory.data[key] && this._memory.data[key].expiresOn) {
                var now = new Date();
                var expiry = new Date(this._memory.data[key].expiresOn);
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
            this._memory.data = {};
            this.fire('_change', 'clear');
        }

        /**
         * Check if key exists
         * @param key {string}
         * @returns {boolean}
         * @example
         * inCache.has('my key');
         */

    }, {
        key: 'has',
        value: function has(key) {
            return this._memory.data.hasOwnProperty(key);
        }

        /**
         * Alias of `remove`
         * @borrows remove as destroy
         * @param args
         * @since 4.1.1
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
         * Returns stats of storage
         * @returns {{count: Number, size: Number}}
         * @since 6.3.0
         */

    }, {
        key: 'stats',
        value: function stats() {
            return {
                count: this.count(),
                size: sizeOf(this._memory.data)
            };
        }

        /**
         * Check if key can be auto removed
         * @param key
         * @returns {boolean|*}
         */

    }, {
        key: 'canBeAutoRemove',
        value: function canBeAutoRemove(key) {
            return !this._opts.autoRemovePeriod && this.expired(key) && this._memory.data[key].toDelete;
        }

        /**
         * Adds listener to instance
         * @param eventName {string} event name
         * @param callback {Function} callback
         * @returns {InCache}
         */

        /**
         * Suspends firing of the named event(s).
         * @param eventName {...string} multiple event names to suspend
         * @returns {InCache}
         * @since 6.6.0
         */

        /**
         * Resumes firing of the named event(s).
         * @param eventName {...string} multiple event names to resume.
         * @returns {InCache}
         * @since 6.6.0
         */

        /**
         * Suspends all events.
         * @returns {InCache}
         * @since 6.6.0
         */

        /**
         * Resume all events.
         * @returns {InCache}
         * @since 6.6.0
         */

        /**
         * Triggered after get
         * @event InCache#get
         * @param key {string} key
         * @param record {InCache~record} record object
         * @since 7.1.1
         */

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
         * @param records {Array} array of objects
         * @since 5.0.0
         */

        /**
         * Triggered after bulk set
         * @event InCache#bulkSet
         * @param records {Array} array of objects
         * @since 5.0.0
         */

        /**
         * Triggered before remove the records
         * @event InCache#beforeBulkRemove
         * @param keys {Array} array of keys to be removed
         * @since 5.0.0
         */

        /**
         * Triggered after records have been removed
         * @event InCache#bulkRemove
         * @param keys {Array} array of keys removed
         * @since 5.0.0
         */

        /**
         * Triggered when records are expired and `opts.autoRemovePeriod` is set
         * @event InCache#expired
         * @param keys {Array} array of keys expired
         * @since 5.0.0
         */

        /**
         * Triggered before load (only if `autoLoad` is false)
         * @event InCache#beforeLoad
         * @param me {InCache}
         * @since 6.4.0
         */

        /**
         * Triggered after load invocation
         * @event InCache#load
         * @param err {null|string} error message, if no errors occurred is null
         * @param me {InCache}
         * @since 6.0.0
         */

        /**
         * Triggered before save
         * @event InCache#beforeSave
         * @param me {InCache}
         * @since 6.4.0
         */

        /**
         * Triggered after save invocation
         * @event InCache#save
         * @param err {null|string} error message, if no errors occurred is null
         * @param me {InCache}
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

        /**
         * Check if object is a InCache~record
         * @param obj {InCache~record} InCache record
         * @returns {boolean}
         */

    }, {
        key: 'onRemoved',


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
         * Triggered when a record has been created. **Deprecated since 5.0.0:** use `on('create', callback)` instead
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
         * Triggered when a record has been updated. **Deprecated since 5.0.0:** use `on('update', callback)` instead
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

    }], [{
        key: 'isRecord',
        value: function isRecord(obj) {
            return Object.keys(RECORD).every(function (el) {
                return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.hasOwnProperty(el);
            });
        }
    }]);

    return InCache;
}(Flak);

/**
 * Expose module
 */


module.exports = InCache;
module.exports.SAVE_MODE = SAVE_MODE;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(1)))

/***/ }),
/* 8 */
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
            if (_typeof(opts[i]) === 'object' && opts[i] !== null) {
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
    //return typeof process === 'object' && typeof process.pid !== 'undefined';
    return typeof window === 'undefined';
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

/**
 * Throw error
 * @param msg
 */
helper.throwError = function (msg) {
    throw new Error(msg);
};

module.exports = helper;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// [AIV]  Flak Build version: 1.0.0  
(function webpackUniversalModuleDefinition(root, factory) {
    if (( false ? 'undefined' : _typeof2(exports)) === 'object' && ( false ? 'undefined' : _typeof2(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object') exports["flak"] = factory();else root["flak"] = factory();
})(undefined, function () {
    return (/******/function (modules) {
            // webpackBootstrap
            /******/ // The module cache
            /******/var installedModules = {};
            /******/
            /******/ // The require function
            /******/function __webpack_require__(moduleId) {
                /******/
                /******/ // Check if module is in cache
                /******/if (installedModules[moduleId]) {
                    /******/return installedModules[moduleId].exports;
                    /******/
                }
                /******/ // Create a new module (and put it into the cache)
                /******/var module = installedModules[moduleId] = {
                    /******/i: moduleId,
                    /******/l: false,
                    /******/exports: {}
                    /******/ };
                /******/
                /******/ // Execute the module function
                /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                /******/
                /******/ // Flag the module as loaded
                /******/module.l = true;
                /******/
                /******/ // Return the exports of the module
                /******/return module.exports;
                /******/
            }
            /******/
            /******/
            /******/ // expose the modules object (__webpack_modules__)
            /******/__webpack_require__.m = modules;
            /******/
            /******/ // expose the module cache
            /******/__webpack_require__.c = installedModules;
            /******/
            /******/ // define getter function for harmony exports
            /******/__webpack_require__.d = function (exports, name, getter) {
                /******/if (!__webpack_require__.o(exports, name)) {
                    /******/Object.defineProperty(exports, name, {
                        /******/configurable: false,
                        /******/enumerable: true,
                        /******/get: getter
                        /******/ });
                    /******/
                }
                /******/
            };
            /******/
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/__webpack_require__.n = function (module) {
                /******/var getter = module && module.__esModule ?
                /******/function getDefault() {
                    return module['default'];
                } :
                /******/function getModuleExports() {
                    return module;
                };
                /******/__webpack_require__.d(getter, 'a', getter);
                /******/return getter;
                /******/
            };
            /******/
            /******/ // Object.prototype.hasOwnProperty.call
            /******/__webpack_require__.o = function (object, property) {
                return Object.prototype.hasOwnProperty.call(object, property);
            };
            /******/
            /******/ // __webpack_public_path__
            /******/__webpack_require__.p = "";
            /******/
            /******/ // Load entry module and return exports
            /******/return __webpack_require__(__webpack_require__.s = 0);
            /******/
        }(
        /************************************************************************/
        /******/[
        /* 0 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            module.exports = __webpack_require__(1);

            /***/
        },
        /* 1 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
                };
            }();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            var helper = __webpack_require__(2);
            var error = __webpack_require__(3);

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

                        listener.state = {
                            suspended: false,
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
                        if (eventListener.state.suspended) return;

                        if (eventListener.opts.maxCalls && eventListener.state.calls++ >= eventListener.opts.maxCalls) {
                            this.off(eventName, eventListener);
                            return;
                        }

                        this._catchAll.call(this, args);
                        return eventListener.apply(this, args);
                    }

                    /**
                     *
                     * @param events {Array} event list
                     * @param suspended {boolean}
                     * @returns {Flak}
                     * @private
                     * @ignore
                     */

                }, {
                    key: '_suspendEvent',
                    value: function _suspendEvent() {
                        var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                        var suspended = arguments[1];

                        var eventName = void 0;

                        for (var event in events) {
                            eventName = events[event];
                            if (this.events[eventName]) {
                                this.events[eventName].forEach(function (e) {
                                    e.state.suspended = suspended;
                                });
                            }
                        }

                        return this;
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

                        /* istanbul ignore else  */
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

                        /* istanbul ignore else  */
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
                     * Suspends firing of the named event(s).
                     * @param eventName {...string} multiple event names to suspend
                     * @returns {Flak}
                     */

                }, {
                    key: 'suspendEvent',
                    value: function suspendEvent() {
                        for (var _len4 = arguments.length, eventName = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                            eventName[_key4] = arguments[_key4];
                        }

                        return this._suspendEvent(eventName, true);
                    }

                    /**
                     * Resumes firing of the named event(s).
                     * @param eventName {...string} multiple event names to resume.
                     * @returns {Flak}
                     */

                }, {
                    key: 'resumeEvent',
                    value: function resumeEvent() {
                        for (var _len5 = arguments.length, eventName = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                            eventName[_key5] = arguments[_key5];
                        }

                        return this._suspendEvent(eventName, false);
                    }

                    /**
                     * Suspends all events.
                     * @returns {Flak}
                     */

                }, {
                    key: 'suspendEvents',
                    value: function suspendEvents() {
                        return this._suspendEvent(Object.keys(this.events), true);
                    }

                    /**
                     * Resume all events.
                     * @returns {Flak}
                     */

                }, {
                    key: 'resumeEvents',
                    value: function resumeEvents() {
                        return this._suspendEvent(Object.keys(this.events), false);
                    }

                    /**
                     * Check if an event is suspended
                     * @param eventName {string}
                     * @returns {boolean}
                     */

                }, {
                    key: 'isSuspended',
                    value: function isSuspended(eventName) {
                        /* istanbul ignore else  */
                        if (!this.exists(eventName)) return false;
                        return this.events[eventName][0].state.suspended;
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

            /***/
        },
        /* 2 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
                return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
            };

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

            /***/
        },
        /* 3 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            module.exports = ['event name is required and must be a string', 'listener is required and must be a function or an array of function', 'value must be a number', 'increase maxListeners per event: ', 'event name not valid', 'event not found'];

            /***/
        }]
        /******/)
    );
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * write <https://github.com/jonschlinkert/write>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var fs = __webpack_require__(2);
var path = __webpack_require__(4);
var mkdirp = __webpack_require__(11);

/**
 * Asynchronously writes data to a file, replacing the file if it already
 * exists and creating any intermediate directories if they don't already
 * exist. Data can be a string or a buffer. Returns a promise if a callback
 * function is not passed.
 *
 * ```js
 * var writeFile = require('write');
 * writeFile('foo.txt', 'This is content...', function(err) {
 *   if (err) console.log(err);
 * });
 *
 * // promise
 * writeFile('foo.txt', 'This is content...')
 *   .then(function() {
 *     // do stuff
 *   });
 * ```
 * @name writeFile
 * @param {string|Buffer|integer} `filepath` filepath or file descriptor.
 * @param {string|Buffer|Uint8Array} `data` String to write to disk.
 * @param {object} `options` Options to pass to [fs.writeFile][fs]{#fs_fs_writefile_file_data_options_callback} and/or [mkdirp][]
 * @param {Function} `callback` (optional) If no callback is provided, a promise is returned.
 * @api public
 */

function writeFile(filepath, data, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (typeof cb !== 'function') {
    return writeFile.promise.apply(null, arguments);
  }

  if (typeof filepath !== 'string') {
    cb(new TypeError('expected filepath to be a string'));
    return;
  }

  mkdirp(path.dirname(filepath), options, function (err) {
    if (err) {
      cb(err);
      return;
    }
    fs.writeFile(filepath, data, options, cb);
  });
};

/**
 * The promise version of [writeFile](#writefile). Returns a promise.
 *
 * ```js
 * var writeFile = require('write');
 * writeFile.promise('foo.txt', 'This is content...')
 *   .then(function() {
 *     // do stuff
 *   });
 * ```
 * @name .promise
 * @param {string|Buffer|integer} `filepath` filepath or file descriptor.
 * @param {string|Buffer|Uint8Array} `val` String or buffer to write to disk.
 * @param {object} `options` Options to pass to [fs.writeFile][fs]{#fs_fs_writefile_file_data_options_callback} and/or [mkdirp][]
 * @return {Promise}
 * @api public
 */

writeFile.promise = function (filepath, val, options) {
  if (typeof filepath !== 'string') {
    return Promise.reject(new TypeError('expected filepath to be a string'));
  }

  return new Promise(function (resolve, reject) {
    mkdirp(path.dirname(filepath), options, function (err) {
      if (err) {
        reject(err);
        return;
      }

      fs.writeFile(filepath, val, options, function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(val);
      });
    });
  });
};

/**
 * The synchronous version of [writeFile](#writefile). Returns undefined.
 *
 * ```js
 * var writeFile = require('write');
 * writeFile.sync('foo.txt', 'This is content...');
 * ```
 * @name .sync
 * @param {string|Buffer|integer} `filepath` filepath or file descriptor.
 * @param {string|Buffer|Uint8Array} `data` String or buffer to write to disk.
 * @param {object} `options` Options to pass to [fs.writeFileSync][fs]{#fs_fs_writefilesync_file_data_options} and/or [mkdirp][]
 * @return {undefined}
 * @api public
 */

writeFile.sync = function (filepath, data, options) {
  if (typeof filepath !== 'string') {
    throw new TypeError('expected filepath to be a string');
  }
  mkdirp.sync(path.dirname(filepath), options);
  fs.writeFileSync(filepath, data, options);
};

/**
 * Uses `fs.createWriteStream` to write data to a file, replacing the
 * file if it already exists and creating any intermediate directories
 * if they don't already exist. Data can be a string or a buffer. Returns
 * a new [WriteStream](https://nodejs.org/api/fs.html#fs_class_fs_writestream)
 * object.
 *
 * ```js
 * var fs = require('fs');
 * var writeFile = require('write');
 * fs.createReadStream('README.md')
 *   .pipe(writeFile.stream('a/b/c/other-file.md'))
 *   .on('close', function() {
 *     // do stuff
 *   });
 * ```
 * @name .stream
 * @param {string|Buffer|integer} `filepath` filepath or file descriptor.
 * @param {object} `options` Options to pass to [mkdirp][] and [fs.createWriteStream][fs]{#fs_fs_createwritestream_path_options}
 * @return {Stream} Returns a new [WriteStream](https://nodejs.org/api/fs.html#fs_class_fs_writestream) object. (See [Writable Stream](https://nodejs.org/api/stream.html#stream_class_stream_writable)).
 * @api public
 */

writeFile.stream = function (filepath, options) {
  mkdirp.sync(path.dirname(filepath), options);
  return fs.createWriteStream(filepath, options);
};

/**
 * Expose `writeFile`
 */

module.exports = writeFile;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var path = __webpack_require__(4);
var fs = __webpack_require__(2);
var _0777 = parseInt('0777', 8);

module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;

function mkdirP(p, opts, f, made) {
    if (typeof opts === 'function') {
        f = opts;
        opts = {};
    } else if (!opts || (typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object') {
        opts = { mode: opts };
    }

    var mode = opts.mode;
    var xfs = opts.fs || fs;

    if (mode === undefined) {
        mode = _0777 & ~process.umask();
    }
    if (!made) made = null;

    var cb = f || function () {};
    p = path.resolve(p);

    xfs.mkdir(p, mode, function (er) {
        if (!er) {
            made = made || p;
            return cb(null, made);
        }
        switch (er.code) {
            case 'ENOENT':
                mkdirP(path.dirname(p), opts, function (er, made) {
                    if (er) cb(er, made);else mkdirP(p, opts, cb, made);
                });
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                xfs.stat(p, function (er2, stat) {
                    // if the stat fails, then that's super weird.
                    // let the original error be the failure reason.
                    if (er2 || !stat.isDirectory()) cb(er, made);else cb(null, made);
                });
                break;
        }
    });
}

mkdirP.sync = function sync(p, opts, made) {
    if (!opts || (typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object') {
        opts = { mode: opts };
    }

    var mode = opts.mode;
    var xfs = opts.fs || fs;

    if (mode === undefined) {
        mode = _0777 & ~process.umask();
    }
    if (!made) made = null;

    p = path.resolve(p);

    try {
        xfs.mkdirSync(p, mode);
        made = made || p;
    } catch (err0) {
        switch (err0.code) {
            case 'ENOENT':
                made = sync(path.dirname(p), opts, made);
                sync(p, opts, made);
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                var stat;
                try {
                    stat = xfs.statSync(p);
                } catch (err1) {
                    throw err0;
                }
                if (!stat.isDirectory()) throw err0;
                break;
        }
    }

    return made;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rng = __webpack_require__(13);
var bytesToUuid = __webpack_require__(14);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [_seedBytes[0] | 0x01, _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0,
    _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function rng() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer, module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var clone = function () {
  'use strict';

  function _instanceof(obj, type) {
    return type != null && obj instanceof type;
  }

  var nativeMap;
  try {
    nativeMap = Map;
  } catch (_) {
    // maybe a reference error because no `Map`. Give it a dummy value that no
    // value will ever be an instanceof.
    nativeMap = function nativeMap() {};
  }

  var nativeSet;
  try {
    nativeSet = Set;
  } catch (_) {
    nativeSet = function nativeSet() {};
  }

  var nativePromise;
  try {
    nativePromise = Promise;
  } catch (_) {
    nativePromise = function nativePromise() {};
  }

  /**
   * Clones (copies) an Object using deep copying.
   *
   * This function supports circular references by default, but if you are certain
   * there are no circular references in your object, you can save some CPU time
   * by calling clone(obj, false).
   *
   * Caution: if `circular` is false and `parent` contains circular references,
   * your program may enter an infinite loop and crash.
   *
   * @param `parent` - the object to be cloned
   * @param `circular` - set to true if the object to be cloned may contain
   *    circular references. (optional - true by default)
   * @param `depth` - set to a number if the object is only to be cloned to
   *    a particular depth. (optional - defaults to Infinity)
   * @param `prototype` - sets the prototype to be used when cloning an object.
   *    (optional - defaults to parent prototype).
   * @param `includeNonEnumerable` - set to true if the non-enumerable properties
   *    should be cloned as well. Non-enumerable properties on the prototype
   *    chain will be ignored. (optional - false by default)
  */
  function clone(parent, circular, depth, prototype, includeNonEnumerable) {
    if ((typeof circular === 'undefined' ? 'undefined' : _typeof(circular)) === 'object') {
      depth = circular.depth;
      prototype = circular.prototype;
      includeNonEnumerable = circular.includeNonEnumerable;
      circular = circular.circular;
    }
    // maintain two arrays for circular references, where corresponding parents
    // and children have the same index
    var allParents = [];
    var allChildren = [];

    var useBuffer = typeof Buffer != 'undefined';

    if (typeof circular == 'undefined') circular = true;

    if (typeof depth == 'undefined') depth = Infinity;

    // recurse this function so we don't reset allParents and allChildren
    function _clone(parent, depth) {
      // cloning null always returns null
      if (parent === null) return null;

      if (depth === 0) return parent;

      var child;
      var proto;
      if ((typeof parent === 'undefined' ? 'undefined' : _typeof(parent)) != 'object') {
        return parent;
      }

      if (_instanceof(parent, nativeMap)) {
        child = new nativeMap();
      } else if (_instanceof(parent, nativeSet)) {
        child = new nativeSet();
      } else if (_instanceof(parent, nativePromise)) {
        child = new nativePromise(function (resolve, reject) {
          parent.then(function (value) {
            resolve(_clone(value, depth - 1));
          }, function (err) {
            reject(_clone(err, depth - 1));
          });
        });
      } else if (clone.__isArray(parent)) {
        child = [];
      } else if (clone.__isRegExp(parent)) {
        child = new RegExp(parent.source, __getRegExpFlags(parent));
        if (parent.lastIndex) child.lastIndex = parent.lastIndex;
      } else if (clone.__isDate(parent)) {
        child = new Date(parent.getTime());
      } else if (useBuffer && Buffer.isBuffer(parent)) {
        child = new Buffer(parent.length);
        parent.copy(child);
        return child;
      } else if (_instanceof(parent, Error)) {
        child = Object.create(parent);
      } else {
        if (typeof prototype == 'undefined') {
          proto = Object.getPrototypeOf(parent);
          child = Object.create(proto);
        } else {
          child = Object.create(prototype);
          proto = prototype;
        }
      }

      if (circular) {
        var index = allParents.indexOf(parent);

        if (index != -1) {
          return allChildren[index];
        }
        allParents.push(parent);
        allChildren.push(child);
      }

      if (_instanceof(parent, nativeMap)) {
        parent.forEach(function (value, key) {
          var keyChild = _clone(key, depth - 1);
          var valueChild = _clone(value, depth - 1);
          child.set(keyChild, valueChild);
        });
      }
      if (_instanceof(parent, nativeSet)) {
        parent.forEach(function (value) {
          var entryChild = _clone(value, depth - 1);
          child.add(entryChild);
        });
      }

      for (var i in parent) {
        var attrs;
        if (proto) {
          attrs = Object.getOwnPropertyDescriptor(proto, i);
        }

        if (attrs && attrs.set == null) {
          continue;
        }
        child[i] = _clone(parent[i], depth - 1);
      }

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(parent);
        for (var i = 0; i < symbols.length; i++) {
          // Don't need to worry about cloning a symbol because it is a primitive,
          // like a number or string.
          var symbol = symbols[i];
          var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
          if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
            continue;
          }
          child[symbol] = _clone(parent[symbol], depth - 1);
          if (!descriptor.enumerable) {
            Object.defineProperty(child, symbol, {
              enumerable: false
            });
          }
        }
      }

      if (includeNonEnumerable) {
        var allPropertyNames = Object.getOwnPropertyNames(parent);
        for (var i = 0; i < allPropertyNames.length; i++) {
          var propertyName = allPropertyNames[i];
          var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
          if (descriptor && descriptor.enumerable) {
            continue;
          }
          child[propertyName] = _clone(parent[propertyName], depth - 1);
          Object.defineProperty(child, propertyName, {
            enumerable: false
          });
        }
      }

      return child;
    }

    return _clone(parent, depth);
  }

  /**
   * Simple flat clone using prototype, accepts only objects, usefull for property
   * override on FLAT configuration object (no nested props).
   *
   * USE WITH CAUTION! This may not behave as you wish if you do not know how this
   * works.
   */
  clone.clonePrototype = function clonePrototype(parent) {
    if (parent === null) return null;

    var c = function c() {};
    c.prototype = parent;
    return new c();
  };

  // private utility functions

  function __objToStr(o) {
    return Object.prototype.toString.call(o);
  }
  clone.__objToStr = __objToStr;

  function __isDate(o) {
    return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object Date]';
  }
  clone.__isDate = __isDate;

  function __isArray(o) {
    return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object Array]';
  }
  clone.__isArray = __isArray;

  function __isRegExp(o) {
    return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object RegExp]';
  }
  clone.__isRegExp = __isRegExp;

  function __getRegExpFlags(re) {
    var flags = '';
    if (re.global) flags += 'g';
    if (re.ignoreCase) flags += 'i';
    if (re.multiline) flags += 'm';
    return flags;
  }
  clone.__getRegExpFlags = __getRegExpFlags;

  return clone;
}();

if (( false ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
  module.exports = clone;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer, __webpack_require__(3)(module)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}

revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function placeHoldersCount(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
}

function byteLength(b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64);
}

function toByteArray(b64) {
  var i, l, tmp, placeHolders, arr;
  var len = b64.length;
  placeHolders = placeHoldersCount(b64);

  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0; i < l; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = tmp >> 16 & 0xFF;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 0x3F];
    output += lookup[tmp << 2 & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('');
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright 2014 Andrei Karpushonak



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ECMA_SIZES = __webpack_require__(20);
var Buffer = __webpack_require__(5).Buffer;

/**
 * Main module's entry point
 * Calculates Bytes for the provided parameter
 * @param object - handles object/string/boolean/buffer
 * @returns {*}
 */
function sizeof(object) {
  if (object !== null && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object') {
    if (Buffer.isBuffer(object)) {
      return object.length;
    } else {
      var bytes = 0;
      for (var key in object) {

        if (!Object.hasOwnProperty.call(object, key)) {
          continue;
        }

        bytes += sizeof(key);
        try {
          bytes += sizeof(object[key]);
        } catch (ex) {
          if (ex instanceof RangeError) {
            // circular reference detected, final result might be incorrect
            // let's be nice and not throw an exception
            bytes = 0;
          }
        }
      }
      return bytes;
    }
  } else if (typeof object === 'string') {
    return object.length * ECMA_SIZES.STRING;
  } else if (typeof object === 'boolean') {
    return ECMA_SIZES.BOOLEAN;
  } else if (typeof object === 'number') {
    return ECMA_SIZES.NUMBER;
  } else {
    return 0;
  }
}

module.exports = sizeof;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Byte sizes are taken from ECMAScript Language Specification
 * http://www.ecma-international.org/ecma-262/5.1/
 * http://bclary.com/2004/11/07/#a-4.3.16
 */

module.exports = {
  STRING: 2,
  BOOLEAN: 4,
  NUMBER: 8
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* istanbul ignore */

exports.SAVE_MODE = Object.defineProperties({}, {
    TERMINATE: {
        value: 'terminate',
        enumerable: true
    },
    TIMER: {
        value: 'timer',
        enumerable: true
    }
});

exports.REMOVE_EXCEED = Object.defineProperties({}, {
    OLDER: {
        value: 'older',
        enumerable: true
    },
    USAGE: {
        value: 'usage',
        enumerable: true
    },
    NONE: {
        value: 'none',
        enumerable: true
    }
});

exports.RECORD = {
    id: null,
    isNew: true,
    isPreserved: null,
    toDelete: null,
    hits: null,
    lastHit: null,
    createdOn: null,
    updatedOn: null,
    expiresOn: null,
    value: null
};

/***/ })
/******/ ]);
}); 