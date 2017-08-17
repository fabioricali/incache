const InCache = require('../src/incache');
const cache = new InCache({
    save: false,
    filePath: './test/.incache'
});
const be = require('bejs');

describe('cache', function () {
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
                life: 1
            });
            setTimeout(()=>{
                let result = cache.get('myKeyExpiry', false);
                console.log(result);
                be.err(done).null(result);
            }, 1200);
        });
        it('should be equal', ()=>{
            let result;
            result = cache.set('myKeyAX', 'myValue');
            console.log('=================================>',cache.getConfig());
            console.log('=================================>',result);
            be.err.true(result.isNew);
            result = cache.set('myKeyAX', 'myValueUpdate');
            be.err.false(result.isNew);
            result = cache.get('myKeyAX');
            //console.log(result);
            be.err.equal(global[cache.GLOBAL_KEY].data['myKeyAX'].value, result);
        });
        it('with slash, should be equal', ()=>{
            let result;
            let route = '/benchmark/cached';
            cache.set(route, 'myValue');
            result = cache.get(route);
            //console.log(result);
            be.err.equal(global[cache.GLOBAL_KEY].data[route].value, result);
        });
    });

    describe('get, not found', function () {
        it('should be return null', ()=>{
            let result = cache.get('myKey_not_found');
            console.log(result);
            be.err.null(result);
        });
    });

    describe('get, onlyValue false', function () {
        it('should be return null', ()=>{
            cache.set('myKeyWow', 'myValue');
            let result = cache.get('myKeyWow', false);
            console.log(result);
            be.err.object(result);
        });
    });

    describe('has', function () {
        it('should be return true', ()=>{
            cache.set('myKey', 'myValue');
            let result = cache.has('myKey');
            console.log(result);
            be.err.true(result);
        });
        it('should be return false', ()=>{
            let result = cache.has('myKey2');
            console.log(result);
            be.err.false(result);
        });
    });

    describe('remove', function () {
        it('should be return false', ()=>{
            cache.set('myKeyB', 'myValue');
            let result = cache.has('myKeyB');
            be.err.true(result);
            console.log(result);
            cache.remove('myKeyB');
            result = cache.has('myKeyB');
            console.log(result);
            be.err.falsy(global[cache.GLOBAL_KEY]['myKeyB']);
            be.err.false(result);
        });
    });

    describe('onRemoved', function () {
        it('should be return false', (done)=>{
            cache.onRemoved((key)=>{
                console.log('deleted', key);
                done();
            });
            cache.set('myKeyBI', 'myValue');
            cache.remove('myKeyBI');
        });
    });

    describe('onCreated', function () {
        it('should be return false', (done)=>{
            cache.onCreated((key, record)=>{
                console.log('created', key, record);
                if(key === 'myKeyBB')
                    done();
            });
            cache.set('myKeyBB', 'myValue');
        });
    });

    describe('onUpdated', function () {
        it('should be return false', (done)=>{
            cache.onUpdated((key, record)=>{
                console.log('updated', record);
                done();
            });
            cache.set('myKeyBBB', 'myValue');
            cache.set('myKeyBBB', 'myValue 2');
        });
    });

    describe('all', function () {
        it('should be return an array of 5 items', ()=>{
            cache.clear();
            cache.set('myKey1', 'myValue1');
            cache.set('myKey2', 'myValue2');
            cache.set('myKey3', 'myValue3');
            cache.set('myKey4', 'myValue4');
            cache.set('myKey5', 'myValue5');
            result = cache.all();
            console.log(result);
            be.err.array(result);
            be.err.equal(result.length, 5);
        });
        it('with expired, should be return an array of 4 items', (done)=>{
            cache.clear();
            cache.set('myKey1', 'myValue1');
            cache.set('myKey2', 'myValue2');
            cache.set('myKey3', 'myValue3');
            cache.set('myKey4', 'myValue4', {life: 1});
            cache.set('myKey5', 'myValue5');
            setTimeout(()=>{
                result = cache.all();
                console.log(result);
                be.err.array(result);
                be.err.equal(result.length, 4);
                done();
            }, 1500);

        });
    });

    describe('clear', function () {
        it('should be return an array', ()=>{
            cache.clear();
            cache.set('myKey1', 'myValue1');
            cache.set('myKey2', 'myValue2');
            cache.set('myKey3', 'myValue3');
            cache.set('myKey4', 'myValue4');
            cache.set('myKey5', 'myValue5');
            result = cache.all();
            be.err.array(result);
            be.err.equal(result.length, 5);
            cache.clear();
            result = cache.all();
            console.log(result);
            be.err.empty(global[cache.GLOBAL_KEY].data);
            be.err.array(result);
            be.err.equal(result.length, 0);
        });
    });

    describe('bulkSet', function () {
        it('should be return 5 records', ()=>{
            cache.clear();

            cache.bulkSet([
                {key: 'key1', value: 'value1'},
                {key: 'key2', value: 'value2'},
                {key: 'key3', value: 'value3'},
                {key: 'key4', value: 'value4'},
                {key: 'key5', value: 'value5'},
            ]);
            let result = cache.all();
            console.log(result);
            be.err.equal(result.length, 5);
        });

        it('wrong params type, should be return error', (done)=>{
            cache.clear();

            try {
                cache.bulkSet('hello');
            } catch (e) {
                console.log(e.message);
                done();
            }
        });

        it('key params missing, should be return error', (done)=>{
            cache.clear();

            try {
                cache.bulkSet([{value: 'foo'}]);
            } catch (e) {
                console.log(e.message);
                done();
            }
        });

        it('value params missing, should be return error', (done)=>{
            cache.clear();

            try {
                cache.bulkSet([{key: 'foo'}]);
            } catch (e) {
                console.log(e.message);
                done();
            }
        });
    });

    describe('bulkRemove', function () {
        it('should be return 2 records', ()=> {
            cache.clear();
            cache.bulkSet([
                {key: 'key1', value: 'value1'},
                {key: 'key2', value: 'value2'},
                {key: 'key3', value: 'value3'},
                {key: 'key4', value: 'value4'},
                {key: 'key5', value: 'value5'},
            ]);

            cache.bulkRemove(['key1', 'key2', 'key5']);

            let result = cache.all();
            console.log(result);
            be.err.equal(result.length, 2);
            be.err.equal(result[0].key, 'key3');
        });

        it('wrong params type, should be return error', (done)=>{

            try {
                cache.bulkRemove('hello');
            } catch (e) {
                console.log(e.message);
                done();
            }
        });
    });

    describe('expired', function () {
        it('with expiry, should be return true', (done)=>{
            cache.set('myKeyExpiry1', 'myValue', {
                life: 1
            });
            setTimeout(()=>{
                be.err.true(cache.expired('myKeyExpiry1'));
                done();
            }, 2000);
        });
        it('key not found, should be return false', ()=>{
            be.err.false(cache.expired('myKeyExpiry10'));
        });
    });
});
