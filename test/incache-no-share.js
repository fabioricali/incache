const InCache = require('../src/incache');
const cache = new InCache();
const be = require('bejs');

cache.setConfig({
    storeName: 'no-share',
    save: false,
    share: false
});

describe('cache-no-share', function () {
    this.timeout(5000);

    describe('set', function () {
        it('should be return true', ()=>{
            cache.set('myKey', 'myValue');
            let result = cache.get('myKey');
            console.log(result);
            be.err.equal(result, 'myValue');
        });
        it('with expiry, should be return true', (done)=>{
            cache.set('myKeyExpiry', 'myValue', {
                maxAge: 1000
            });
            setTimeout(()=>{
                let result = cache.get('myKeyExpiry', false);
                console.log(result);
                be.err(done).null(result);
            }, 1200);
        });
        it('should be equal', ()=>{
            let result;
            cache.remove('myKeyAB--noshare');
            result = cache.set('myKeyAB--noshare', 'myValue');
            be.err.true(result.isNew);
            result = cache.set('myKeyAB--noshare', 'myValueUpdate');
            be.err.false(result.isNew);
            result = cache.get('myKeyAB--noshare');
            console.log(result);
            be.err.undefined(global[cache.GLOBAL_KEY]);
        });
    });
});
