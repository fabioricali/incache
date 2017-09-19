const InCache = require('../src/incache');
const be = require('bejs');

describe('clone', function () {

    this.timeout(5000);

    it('should be return false', () => {
        const cache = new InCache({
            autoLoad: false,
            clone: true
        });

        const o = {a: 1, b: 2};

        cache.set('k', o);

        let result = cache.get('k');

        be.err.false(result === o);
    });

    it('should be return true', () => {
        const cache = new InCache({
            autoLoad: false,
            clone: false
        });

        const o = {a: 1, b: 2};

        cache.set('k', o);

        let result = cache.get('k');

        be.err.true(result === o);
    });

});