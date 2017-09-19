const InCache = require('../src/incache');
const be = require('bejs');

describe('preserve', function () {

    this.timeout(5000);

    it('should be return true', () => {
        const cache = new InCache({
            autoLoad: false,
            preserve: true
        });

        cache.set('k', 'v');
        cache.set('k', 'v2');
        let result = cache.get('k');

        be.err.equal(result, 'v');
    });

    it('should be return true, overwrite option', () => {
        const cache = new InCache({
            autoLoad: false,
            preserve: true
        });

        cache.set('k', 'v', {preserve: false});
        cache.set('k', 'v2');
        let result = cache.get('k');

        be.err.equal(result, 'v2');
    });

    it('should be return true, isPreserved', () => {
        const cache = new InCache({
            autoLoad: false,
            preserve: true
        });

        cache.set('k', 'v');

        let result = cache.isPreserved('k');

        be.err.true(result);
    });

    it('should be return true, isPreserved false', () => {
        const cache = new InCache({
            autoLoad: false
        });

        cache.set('k', 'v');

        let result = cache.isPreserved('k');

        be.err.false(result);
    });
});