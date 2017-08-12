const helper = {};

/**
 * Get object type
 * @param object {*}
 * @param type {string}
 * @returns {boolean}
 */
helper.is = (object, type) => {
    let objectToString = Object.prototype.toString.call(object);
    return objectToString.toLowerCase() === '[object ' + type + ']'.toLowerCase();
};

/**
 * Set default value
 * @param opts {Object} options
 * @param defaultOpts {Object} default options
 * @returns {*}
 */
helper.defaults = (opts, defaultOpts) => {
    for (let i in defaultOpts) {
        if(defaultOpts.hasOwnProperty(i))
            if (!opts.hasOwnProperty(i)) {
                opts[i] = defaultOpts[i];
            } else {
                if (typeof opts[i] === 'object') {
                    helper.defaults(opts[i], defaultOpts[i]);
                }
            }
    }
    return opts;
};

module.exports = helper;