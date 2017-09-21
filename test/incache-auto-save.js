const InCache = require('../src/incache');
const fs = require('fs');

const FILE_PATH = './test/.incache-save3';

describe('cache-auto-save', function () {
    this.timeout(10000);

    before(function () {
        if(fs.existsSync(FILE_PATH)) {
            fs.unlinkSync(FILE_PATH);
        }
    });

    it('should create cache file', (done) => {

        const cache = new InCache({
            autoSave: true,
            filePath: FILE_PATH,
            autoSaveMode: InCache.SAVE_MODE.TIMER,
            autoSavePeriod: 1
        });

        cache.set('myKey', 'hello');

        setTimeout(function () {
            if(fs.existsSync(FILE_PATH)) {
                console.log('exists');
                // Add new key
                cache.set('myKey2', 'hello2');
            } else
                done('file cache not exists');
        }, 1500);

        setTimeout(function () {
            const data = JSON.parse(fs.readFileSync(FILE_PATH));
            console.log(data);
            if(data.hasOwnProperty('myKey2'))
                done();
            else
                done('key not exists');
        }, 3000);

        //be.err.object(result);
    });
});
