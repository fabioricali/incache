const incache = require('../src/incache');
const be = require('bejs');

describe('incache', function () {
    this.timeout(5000);
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
            }, 1000);
        });
        it('should be equal', ()=>{
            let result;
            result = incache.set('myKeyA', 'myValue');
            be.err.true(result.isNew);
            result = incache.set('myKeyA', 'myValueUpdate');
            be.err.false(result.isNew);
            result = incache.get('myKeyA');
            console.log(result);
            be.err.equal(global[incache._global_key]['myKeyA'].value, result);
        });
    });

    describe('get, not found', function () {
        it('should be return null', ()=>{
            let result = incache.get('myKey_not_found');
            console.log(result);
            be.err.null(result);
        });
    });

    describe('get, onlyValue false', function () {
        it('should be return null', ()=>{
            incache.set('myKeyWow', 'myValue');
            let result = incache.get('myKeyWow', false);
            console.log(result);
            be.err.object(result);
        });
    });

    describe('has', function () {
        it('should be return true', ()=>{
            incache.set('myKey', 'myValue');
            let result = incache.has('myKey');
            console.log(result);
            be.err.true(result);
        });
        it('should be return false', ()=>{
            let result = incache.has('myKey2');
            console.log(result);
            be.err.false(result);
        });
    });

    describe('remove', function () {
        it('should be return false', ()=>{
            incache.set('myKeyB', 'myValue');
            let result = incache.has('myKeyB');
            be.err.true(result);
            console.log(result);
            incache.remove('myKeyB');
            result = incache.has('myKeyB');
            console.log(result);
            be.err.falsy(global[incache._global_key]['myKeyB']);
            be.err.false(result);
        });
    });

    describe('onRemoved', function () {
        it('should be return false', (done)=>{
            incache.onRemoved((key)=>{
                console.log('deleted', key);
                done();
            });
            incache.set('myKeyBI', 'myValue');
            incache.remove('myKeyBI');
        });
    });

    describe('onCreated', function () {
        it('should be return false', (done)=>{
            incache.onCreated((key, record)=>{
                console.log('created', key, record);
                if(key === 'myKeyBB')
                    done();
            });
            incache.set('myKeyBB', 'myValue');
        });
    });

    describe('onUpdated', function () {
        it('should be return false', (done)=>{
            incache.onUpdated((key, record)=>{
                console.log('updated', record);
                done();
            });
            incache.set('myKeyBBB', 'myValue');
            incache.set('myKeyBBB', 'myValue 2');
        });
    });

    describe('all', function () {
        it('should be return an array of 5 items', ()=>{
            incache.clear();
            incache.set('myKey1', 'myValue1');
            incache.set('myKey2', 'myValue2');
            incache.set('myKey3', 'myValue3');
            incache.set('myKey4', 'myValue4');
            incache.set('myKey5', 'myValue5');
            result = incache.all();
            console.log(result);
            be.err.array(result);
            be.err.equal(result.length, 5);
        });
        it('with expired, should be return an array of 4 items', (done)=>{
            incache.clear();
            incache.set('myKey1', 'myValue1');
            incache.set('myKey2', 'myValue2');
            incache.set('myKey3', 'myValue3');
            incache.set('myKey4', 'myValue4', {life: 1});
            incache.set('myKey5', 'myValue5');
            setTimeout(()=>{
                result = incache.all();
                console.log(result);
                be.err.array(result);
                be.err.equal(result.length, 4);
                done();
            }, 1500);

        });
    });

    describe('clear', function () {
        it('should be return an array', ()=>{
            incache.clear();
            incache.set('myKey1', 'myValue1');
            incache.set('myKey2', 'myValue2');
            incache.set('myKey3', 'myValue3');
            incache.set('myKey4', 'myValue4');
            incache.set('myKey5', 'myValue5');
            result = incache.all();
            be.err.array(result);
            be.err.equal(result.length, 5);
            incache.clear();
            result = incache.all();
            console.log(result);
            be.err.empty(global[incache._global_key]);
            be.err.array(result);
            be.err.equal(result.length, 0);
        });
    });

    describe('bulkSet', function () {
        it('should be return 5 records', ()=>{
            incache.clear();

            incache.bulkSet([
                {key: 'key1', value: 'value1'},
                {key: 'key2', value: 'value2'},
                {key: 'key3', value: 'value3'},
                {key: 'key4', value: 'value4'},
                {key: 'key5', value: 'value5'},
            ]);
            let result = incache.all();
            console.log(result);
            be.err.equal(result.length, 5);
        });

        it('wrong params type, should be return error', (done)=>{
            incache.clear();

            try {
                incache.bulkSet('hello');
            } catch (e) {
                console.log(e.message);
                done();
            }
        });

        it('key params missing, should be return error', (done)=>{
            incache.clear();

            try {
                incache.bulkSet([{value: 'foo'}]);
            } catch (e) {
                console.log(e.message);
                done();
            }
        });

        it('value params missing, should be return error', (done)=>{
            incache.clear();

            try {
                incache.bulkSet([{key: 'foo'}]);
            } catch (e) {
                console.log(e.message);
                done();
            }
        });
    });

    describe('bulkRemove', function () {
        it('should be return 2 records', ()=> {
            incache.clear();
            incache.bulkSet([
                {key: 'key1', value: 'value1'},
                {key: 'key2', value: 'value2'},
                {key: 'key3', value: 'value3'},
                {key: 'key4', value: 'value4'},
                {key: 'key5', value: 'value5'},
            ]);

            incache.bulkRemove(['key1', 'key2', 'key5']);

            let result = incache.all();
            console.log(result);
            be.err.equal(result.length, 2);
            be.err.equal(result[0].key, 'key3');
        });

        it('wrong params type, should be return error', (done)=>{

            try {
                incache.bulkRemove('hello');
            } catch (e) {
                console.log(e.message);
                done();
            }
        });
    });

    describe('expired', function () {
        it('with expiry, should be return true', (done)=>{
            incache.set('myKeyExpiry1', 'myValue', {
                life: 1
            });
            setTimeout(()=>{
                be.err.true(incache.expired('myKeyExpiry1'));
                done();
            }, 2000);
        });
        it('key not found, should be return false', ()=>{
            be.err.false(incache.expired('myKeyExpiry10'));
        });
    });
});
