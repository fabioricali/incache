const InCache = require('../src/incache');
const be = require('bejs');

describe('cache-info', function () {
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
        be.err.date(record.lastHit);


        record = cache.info(`myKey`);

        console.log(record);
        be.err.equal(record.hits, 1);
        be.err.undefined(record.value);
    });

});
