const InCache = require('../src/incache');
const be = require('bejs');

describe('delete on expires', function () {

    this.timeout(5000);

    it('deleteOnExpires false', (done) => {
        const cache = new InCache({
            deleteOnExpires: false,
            maxAge: 1000
        });

        cache.set('k0', 'v0');

        setTimeout(function () {
            be.err(done).equal(cache.count(), 1);
        }, 1500);
    });

    it('deleteOnExpires true, autoRemove', (done) => {
        const cache = new InCache({
            deleteOnExpires: true,
            maxAge: 500,
            autoRemovePeriod: 1
        });

        cache.set('k0', 'v0');

        setTimeout(function () {
            be.err(done).equal(cache.count(), 0);
        }, 1500);
    });

    it('deleteOnExpires true, on get', (done) => {
        const cache = new InCache({
            deleteOnExpires: true,
            maxAge: 1000
        });

        cache.set('k0', 'v0');

        console.log(cache);

        setTimeout(function () {
            cache.get('k0');
            be.err(done).equal(cache.count(), 0);
        }, 1500);
    });

});