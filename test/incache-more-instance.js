const InCache = require('../src/incache');
const be = require('bejs');

describe('cache-save-more-instance', function () {
    this.timeout(5000);

    describe('set', function () {
        it('should be return true', ()=>{

            const cache = new InCache({
                save: true,
                filePath: './test/.incache-save-more-instance'
            });

            cache.set('myKeyXCV', 'myValue');
            let result = cache.get('myKeyXCV');
            console.log(result);
            be.err.equal(result, 'myValue');
        });
        it('with expiry, should be return true', (done)=>{

            const cache = new InCache({
                save: true,
                filePath: './test/.incache-save-more-instance'
            });

            cache.set('myKeyXCVExpiry', 'myValue', {
                life: 1
            });
            setTimeout(()=>{
                let result = cache.get('myKeyXCVExpiry', false);
                console.log(result);
                be.err(done).null(result);
            }, 1200);
        });
        it('should be equal', ()=>{

            const cache = new InCache({
                save: true,
                storeName: 'new',
                filePath: './test/.incache-save-more-instance-1'
            });

            let result;
            cache.remove('myKeyABVB');
            result = cache.set('myKeyABVB', 'myValue');
            be.err.true(result.isNew);
            result = cache.set('myKeyABVB', 'myValueUpdate');
            be.err.false(result.isNew);
            result = cache.get('myKeyABVB');
            console.log(result);
            be.err.equal(global[cache.GLOBAL_KEY].data['myKeyABVB'].value, result);
        });
    });
});
