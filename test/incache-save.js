const InCache = require('../src/incache');
const cache = new InCache();
const be = require('bejs');

cache.setConfig({
    save: true,
    filePath: './test/.incache-save'
});

describe('cache-save', function () {
    this.timeout(5000);

    describe('get, onlyValue false', function () {
        it('should be return object', ()=>{
            let result = cache.get('myKey', false);
            console.log(result);
            be.err.object(result);
        });
    });

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
                be.err(done).undefined(result);
            }, 1200);
        });
        it('should be equal', ()=>{
            let result;
            cache.remove('myKeyAB');
            result = cache.set('myKeyAB', 'myValue');
            be.err.true(result.isNew);
            result = cache.set('myKeyAB', 'myValueUpdate');
            be.err.false(result.isNew);
            result = cache.get('myKeyAB');
            console.log(result);
            be.err.equal(global[cache.GLOBAL_KEY].data['myKeyAB'].value, result);
        });
    });
});
