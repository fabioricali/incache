const InCache = require('../src/incache');
const be = require('bejs');

describe('cache-hits', function () {
    this.timeout(10000);

    it('should be return true', () => {

        const cache = new InCache({
            autoSave: false
        });


        let record = cache.set(`myKey`, `hello`);

        console.log(record);
        be.err.equal(record.hits, 0);
        be.err.null(record.lastHit);


        record = cache.get(`myKey`, false);

        console.log(record);
        be.err.equal(record.hits, 1);
        be.err.equal(record.lastHit.getTime(), new Date().getTime());


        record = cache.get(`myKey`, false);

        console.log(record);
        be.err.equal(record.hits, 2);
        be.err.equal(record.lastHit.getTime(), new Date().getTime());
    });

});
