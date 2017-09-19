const InCache = require('../src/incache');
const be = require('bejs');

describe('exceeded', function () {

    it('enable maxRecordNumber', () => {
        const cache = new InCache({
            maxRecordNumber: 2
        });

        cache.set('k0', 'v0');
        cache.set('k1', 'v1');
        cache.set('k2', 'v2');
        cache.set('k3', 'v3');
        cache.set('k4', 'v4');
        cache.set('k5', 'v5');
        cache.set('k6', 'v6');
        cache.set('k7', 'v7');

        console.log(cache.all());

        be.err.equal(cache.count(), 2);
        be.err.true(cache.has('k6'));
        be.err.true(cache.has('k7'));
    });

    it('disable maxRecordNumber', () => {
        const cache = new InCache({
            maxRecordNumber: 0
        });

        cache.set('k0', 'v0');
        cache.set('k1', 'v1');
        cache.set('k2', 'v2');
        cache.set('k3', 'v3');
        cache.set('k4', 'v4');
        cache.set('k5', 'v5');
        cache.set('k6', 'v6');
        cache.set('k7', 'v7');

        console.log(cache.all());

        be.err.equal(cache.count(), 8);
    });

    it('_checkExceeded', () => {
        const cache = new InCache({
            maxRecordNumber: 0
        });

        cache.set('k0', 'v0');
        cache.set('k1', 'v1');
        cache.set('k2', 'v2');
        cache.set('k3', 'v3');
        cache.set('k4', 'v4');
        cache.set('k5', 'v5');
        cache.set('k6', 'v6');
        cache.set('k7', 'v7');
        cache._opts.maxRecordNumber = 2;
        cache._checkExceeded();

        console.log(cache.all());

        be.err.equal(cache.count(), 2);
    });
});