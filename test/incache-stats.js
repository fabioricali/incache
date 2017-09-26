const InCache = require('../src/incache');
const fs = require('fs');

describe('cache-stats', function () {
    this.timeout(10000);

    it('should be return an object', () => {

        const cache = new InCache({
            autoSave: false
        });

        for(let i = 0; i < 2000; i++)
            cache.set(`myKey${i}`, `hello${i}`);

        console.log(cache.stats());
    });

});
