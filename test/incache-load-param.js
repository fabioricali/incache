const InCache = require('../src/incache');
const fs = require('fs');

const FILE_PATH = './test/.incache-save5';

describe('cache-load-param', function () {
    this.timeout(10000);

    it('should read cache file', (done) => {

        const cache = new InCache({
            autoLoad: false
        });

        cache.load(FILE_PATH).then(()=>{
            const data = JSON.parse(fs.readFileSync(FILE_PATH));
            console.log(data);
            if(data.hasOwnProperty('myKey'))
                done();
            else
                done('key not exists');
        }).catch(e=>{
            done(e);
        });

    });

    it('should return error', (done) => {

        const cache = new InCache({
            autoLoad: false
        });

        cache.load('-wrong-path').then(()=>{
            done('error');
        }).catch(e=>{
            done();
        });

    });
});
