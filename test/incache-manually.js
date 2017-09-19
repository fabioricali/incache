const InCache = require('../src/incache');

describe('manually', function () {

    this.timeout(5000);

    describe('load', function () {
        it('should be return done, autoLoad false', (done)=>{
            const cache = new InCache({
                autoLoad: false,
                filePath: './test/.incache-save2'
            });

            cache.load().then(()=>{
                console.log('loaded');
                done();
            }).catch(e => {
                console.log(e);
            });

        });
    });
    describe('save', function () {
        it('should be return done', (done)=>{
            const cache = new InCache({
                autoSave: false,
                filePath: './test/.incache-save2'
            });

            cache.save().then(()=>{
                console.log('saved');
                done();
            }).catch(e => {
                console.log(e);
            });

        });
    });
});