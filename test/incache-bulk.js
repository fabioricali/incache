const InCache = require('../src/incache');
const be = require('bejs');

describe('cache-bulk', function () {
    this.timeout(5000);

    describe('cancel bulkSet by events', function () {
        it('should be return true', (done)=>{
            const cache = new InCache();
            cache.on('beforeBulkSet', function () {
                return false;
            });
            cache.bulkSet([{key: 'hello', value: 'world'}]);
            setTimeout(function () {
                be.err(done).empty(cache.all());
            }, 200);
        });
    });

    describe('bulkSet', function () {
        it('object with key and value should be ok', ()=>{
            const cache = new InCache();
            let result = cache.bulkSet([{key: 'hello', value: 'world'}]);

            console.log(result);

        });
        it('object should be ok', ()=>{
            const cache = new InCache();
            let result = cache.bulkSet([{value: 'world'}]);

            console.log(result);

        });
        it('array should be ok', ()=>{
            const cache = new InCache();
            let result = cache.bulkSet(['world']);

            console.log(result);

        });
    });

    describe('bulkSet silent true', function () {
        it('should be return true', (done)=>{
            const cache = new InCache();
            cache.on('beforeBulkSet', function () {
                return false;
            });
            cache.bulkSet([{key: 'hello', value: 'world'}], true);
            setTimeout(function () {
                be.err(done).not.empty(cache.all());
            }, 200);
        });
    });

    describe('cancel bulkRemove by events', function () {
        it('should be return true', (done)=>{
            const cache = new InCache();
            cache.on('beforeBulkRemove', function () {
                return false;
            });
            cache.set('hello', 'world');
            cache.bulkRemove(['hello']);
            setTimeout(function () {
                be.err(done).not.empty(cache.all());
            }, 200);
        });
    });

    describe('bulkRemove silent true', function () {
        it('should be return true', (done)=>{
            const cache = new InCache();
            cache.on('beforeBulkRemove', function () {
                return false;
            });
            cache.set('hello', 'world');
            cache.bulkRemove(['hello'], true);
            setTimeout(function () {
                be.err(done).empty(cache.all());
            }, 200);
        });
    });
});
