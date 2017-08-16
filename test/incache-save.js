const incache = require('../src/incache');
const be = require('bejs');

incache.setConfig({
    save: true,
    filePath: './test/.incache-save'
});

describe('incache-save', function () {
    this.timeout(5000);

    describe('get, onlyValue false', function () {
        it('should be return null', ()=>{
            let result = incache.get('myKey', false);
            console.log(result);
            be.err.object(result);
        });
    });

    describe('set', function () {
        it('should be return true', ()=>{
            incache.set('myKey', 'myValue');
            let result = incache.get('myKey');
            console.log(result);
            be.err.equal(result, 'myValue');
        });
        it('with expiry, should be return true', (done)=>{
            incache.set('myKeyExpiry', 'myValue', {
                life: 1
            });
            setTimeout(()=>{
                let result = incache.get('myKeyExpiry', false);
                console.log(result);
                be.err(done).null(result);
            }, 1200);
        });
        it('should be equal', ()=>{
            let result;
            incache.remove('myKeyAB');
            result = incache.set('myKeyAB', 'myValue');
            be.err.true(result.isNew);
            result = incache.set('myKeyAB', 'myValueUpdate');
            be.err.false(result.isNew);
            result = incache.get('myKeyAB');
            console.log(result);
            be.err.equal(global[incache._global_key].data['myKeyAB'].value, result);
        });
    });
});
