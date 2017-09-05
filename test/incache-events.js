const fs = require('fs');
const InCache = require('../src/incache');
const be = require('bejs');
const typis = require('typis');

describe('cache-events', function () {

    this.timeout(5000);

    describe('onRemoved', function () {
        it('should be return done', (done)=>{
            const cache = new InCache({
                save: false,
                share: false
            });

            cache.onRemoved((key)=>{
                console.log('deleted', key);
                if(key === 'myKeyBI')
                done();
            });
            cache.set('myKeyBI', 'myValue');
            cache.remove('myKeyBI');
        });
    });

    describe('onCreated', function () {
        it('should be return done', (done)=>{
            const cache = new InCache({
                save: false,
                share: false
            });

            cache.onCreated((key, record)=>{
                console.log('created', key, record);
                if(key === 'myKeyBB')
                    done();
            });
            cache.set('myKeyBB', 'myValue');
        });
    });

    describe('onUpdated', function () {
        it('should be return done', (done)=>{
            const cache = new InCache({
                save: false,
                share: false
            });

            cache.onUpdated((key, record)=>{
                console.log('updated', record);
                if(record.createdOn && key === 'myKeyBBB') done();
            });
            cache.destroy('myKeyBBB');
            cache.set('myKeyBBB', 'myValue');
            cache.set('myKeyBBB', 'myValue 2');
        });
    });

    describe('on', function () {
        describe('created', function () {
            it('should be return done', (done)=>{
                const cache = new InCache({
                    save: false,
                    share: false
                });

                cache.on('created', (key, record)=>{
                    console.log('created', key, record);
                    done();
                });

                cache.set('myKeyBBB', 'myValue');
            });
        });
        describe('removed', function () {
            it('should be return done', (done)=>{
                const cache = new InCache({
                    save: false,
                    share: false
                });

                cache.on('removed', (key)=>{
                    console.log('removed', key);
                    done();
                });

                cache.set('myKeyBBB', 'myValue');
                cache.remove('myKeyBBB');
            });
        });
        describe('set', function () {
            it('should be return done', (done)=>{
                const cache = new InCache({
                    save: false,
                    share: false
                });

                cache.on('set', (key, record)=>{
                    console.log('set', key, record);
                    done();
                });

                cache.set('myKeyBBB', 'myValue');
ì            });
        });
        describe('beforeSet', function () {
            it('should be return done', (done)=>{
                const cache = new InCache({
                    save: false,
                    share: false
                });

                cache.on('beforeSet', (key, value)=>{
                    console.log('beforeSet', key, value);
                    done();
                });

                cache.set('myKeyBBB', 'myValue');
            });
            it('returning false, should be return done', (done)=>{
                const cache = new InCache({
                    save: false,
                    share: false
                });

                cache.on('beforeSet', (key, value)=>{
                    console.log('beforeSet', key, value);
                    return false;
                });

                cache.set('myKeyBBB', 'myValue');
                setTimeout(function () {
                    be.err(done).null(cache.get('myKeyBBB'));
                },100);
            });
        });
        describe('updated', function () {
            it('should be return done', (done)=>{
                const cache = new InCache({
                    save: false,
                    share: false
                });

                cache.on('updated', (key, record)=>{
                    console.log('updated', record);
                    if(record.createdOn && key === 'myKeyBBB') done();
                });

                cache.destroy('myKeyBBB');
                cache.set('myKeyBBB', 'myValue');
                cache.set('myKeyBBB', 'myValue 2');
            });
        });

    });
});
