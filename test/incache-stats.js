const InCache = require('../src/incache');
const be = require('bejs');

describe('cache-stats', function () {
    this.timeout(10000);

    it('should be return an object', () => {

        const cache = new InCache({
            autoSave: false
        });

        for(let i = 0; i < 2000; i++)
            cache.set(`myKey${i}`, `hello${i}`);

        let result = cache.stats();
        console.log(result);
        be.err.equal(result.count, 2000);
        be.err.equal(result.size, 527560);
    });

});
