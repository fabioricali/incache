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