const InCache = require('../src/incache');
const cache = new InCache({
    save: true,
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
                if(key === 'myKeyBBB') done();
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

    describe('addTo', function () {
        it('should be return a record', (done)=>{
            cache.set('myAddTo', ['hello', 'world']);
            let result = cache.addTo('myAddTo', 'ciao');
            console.log(result);
            be.err(done).inArray('ciao', result.value);
        });
        it('should be return error', (done)=>{
            try {
                cache.set('myAddTo', 'hello');
                cache.addTo('myAddTo', 'world');
            } catch (e) {
                console.log(e.message);
                done();
            }

        });
    });

    describe('prependTo', function () {
        it('should be return a record', ()=>{
            cache.set('myPrependTo', ['hello', 'world']);
            let result = cache.prependTo('myPrependTo', 'ciao');
            console.log(result);
            be.err.equal(result.value.indexOf('ciao'), 0);
        });
        it('should be return error', (done)=>{
            try {
                cache.set('myPrependTo', 'hello');
                cache.prependTo('myPrependTo', 'world');
            } catch (e) {
                console.log(e.message);
                done();
            }

        });
    });

    describe('removeFrom', function () {
        it('should be remove array of object', ()=>{
            cache.set('myRemoveFrom', [{a: 1, b: 2, c: 3}, {a: 1, d: 4}, {b: 2}]);
            cache.removeFrom('myRemoveFrom', {b: 2});
            let result = cache.get('myRemoveFrom');
            console.log(result);
            be.err.equal(result.length, 1);
            be.err.equal(result[0], {a: 1, d: 4});
        });
        it('should be remove array of string', ()=>{
            cache.set('myRemoveFrom', ['hello', 'world', 'hello']);
            cache.removeFrom('myRemoveFrom', 'hello');
            let result = cache.get('myRemoveFrom');
            console.log(result);
            be.err.equal(result.length, 1);
            be.err.equal(result[0], 'world');
        });
        it('undefined where, should be return error', (done)=>{
            try {
                cache.set('myRemoveFrom', 'hello world');
                cache.removeFrom('myRemoveFrom');
            } catch (e) {
                console.log(e.message);
                done();
            }
        });
        it('should be return error', (done)=>{
            try {
                cache.set('myRemoveFrom', 'hello world');
                cache.removeFrom('myRemoveFrom', 'world');
            } catch (e) {
                console.log(e.message);
                done();
            }
        });
    });

    describe('updateIn', function () {
        it('should be update', ()=>{
            cache.set('myUpdateIn', [{a: 1, b: 2, c: 3}, {a: 1, d: 4}, {b: 2}]);
            cache.updateIn('myUpdateIn', {test: 1}, {b: 2});
            let result = cache.get('myUpdateIn');
            console.log(result);
            be.err.equal(result[0], {test: 1});
            be.err.equal(result[2], {test: 1});
        });
        it('should be remove array of string', ()=>{
            cache.set('myUpdateIn', ['hello', 'world', 'hello']);
            cache.updateIn('myUpdateIn', 'ciao', 'hello');
            let result = cache.get('myUpdateIn');
            console.log(result);
            be.err.equal(result[0], 'ciao');
            be.err.equal(result[2], 'ciao');
        });
        it('undefined value, should be return error', (done)=>{
            try {
                cache.set('myUpdateIn', 'hello world');
                cache.updateIn('myUpdateIn');
            } catch (e) {
                console.log(e.message);
                done();
            }
        });
        it('undefined where, should be return error', (done)=>{
            try {
                cache.set('myUpdateIn', 'hello world');
                cache.updateIn('myUpdateIn', 'ciao');
            } catch (e) {
                console.log(e.message);
                done();
            }
        });
        it('should be return error', (done)=>{
            try {
                cache.set('myUpdateIn', 'hello world');
                cache.updateIn('myUpdateIn', 'world', 'hello');
            } catch (e) {
                console.log(e.message);
                done();
            }
        });
    });
});
