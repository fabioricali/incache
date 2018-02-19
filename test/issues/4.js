const InCache = require('../../src/incache');

describe('issue 4', function () {

    describe('load', function () {
        it('should be return done, false', (done)=>{
            const cache = new InCache({
                autoLoad: true,
                filePath: false
            });

            cache.load().then(()=>{
                console.log('load nothing');
                done();
            }).catch(e => {
                console.log(e);
            });

        });

        it('should be return done, null', (done)=>{
            const cache = new InCache({
                autoLoad: true,
                filePath: null
            });

            cache.load().then(()=>{
                console.log('load nothing');
                done();
            }).catch(e => {
                console.log(e);
            });

        });

        it('should be return done, undefined', (done)=>{
            const cache = new InCache({
                autoLoad: true,
                filePath: undefined
            });

            cache.load().then(()=>{
                console.log('load nothing');
                done();
            }).catch(e => {
                console.log(e);
            });

        });

        it('should be return done, ""', (done)=>{
            const cache = new InCache({
                autoLoad: true,
                filePath: ""
            });

            cache.load().then(()=>{
                console.log('load nothing');
                done();
            }).catch(e => {
                console.log(e);
            });

        });
    });

    describe('save', function () {
        it('should be return done, false', (done) => {
            const cache = new InCache({
                filePath: false
            });

            cache.save().then(() => {
                console.log('save nothing');
                done();
            }).catch(e => {
                console.log(e);
            });

        });

    });

});