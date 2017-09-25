const InCache = require('../src/incache');
const fs = require('fs');

const FILE_PATH = './test/.incache-save4';

describe('cache-save-param', function () {
    this.timeout(10000);

    before(function () {
        if(fs.existsSync(FILE_PATH)) {
            fs.unlinkSync(FILE_PATH);
        }
    });

    it('should create cache file', (done) => {

        const cache = new InCache({
            autoSave: false
        });

        cache.set('myKey', 'hello');

        cache.save(FILE_PATH).then(()=>{
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
            autoSave: false
        });

        cache.save('z:/t.t').then(()=>{
            done('error');
        }).catch(e=>{
            done();
        });

    });
});
