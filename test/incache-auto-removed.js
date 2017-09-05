const InCache = require('../src/incache');
const cache = new InCache();
const be = require('bejs');

cache.setConfig({
    storeName: 'auto-remove',
    save: false,
    share: false,
    autoRemovePeriod: 2
});

describe('cache-auto-remove', function () {
    this.timeout(5000);

    describe('on expired event', function () {
        it('with expiry, should be return true', (done)=>{
            cache.on('expired', keys => {
                console.log(keys);
                be.err.array(keys);
                be.err.equal(keys[0], 'myKeyExpiry');
                done();
            });

            cache.set('myKeyExpiry', 'myValue', {
                maxAge: 1000
            });

            cache.set('myKey', 'myValue');
        });
    });
});
