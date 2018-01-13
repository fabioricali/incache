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
        it('more call to load, fails', (done)=>{
            const cache = new InCache({
                autoLoad: false,
                filePath: './test/.incache-save2'
            });

            cache._loading = true;

            cache.load().then(()=>{
                done('fail');
            }).catch(e => {
                done();
            });

        });
        it('in browser fails', (done)=>{
            require('browser-env')();
            require('mock-local-storage');
            //delete process.pid;

            const cache = new InCache({
                autoLoad: false,
                filePath: './test/.incache-save2'
            });

            cache.load().then(()=>{
                done('fail');
            }).catch(e => {
                done();
            });

        });
    });

    describe('save', function () {
        it('should be return done', (done)=>{
            const cache = new InCache({
                autoSave: false,
                filePath: './test/.incache-save2'
            });

            if(typeof window !== 'undefined')
                delete window;

            cache.save().then(()=>{
                console.log('saved');
                done();
            }).catch(e => {
                console.log(e);
            });

        });
        it('more call to save, fails', (done)=>{
            const cache = new InCache({
                autoSave: false,
                filePath: './test/.incache-save2'
            });

            cache._saving = true;

            cache.save().then(()=>{
                done('fail');
            }).catch(e => {
                done();
            });

        });

        it('in browser fails', (done)=>{
            require('browser-env')();
            //delete process.pid;

            const cache = new InCache({
                autoSave: false,
                filePath: './test/.incache-save2'
            });

            cache.save().then(()=>{
                done('fail');
            }).catch(e => {
                done();
            });

        });
    });
});