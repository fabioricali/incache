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
        describe('create', function () {
            it('should be return done', (done)=>{
                const cache = new InCache({
                    save: false,
                    share: false
                });

                cache.on('create', (key, record)=>{
                    console.log('create', key, record);
                    done();
                });

                cache.set('myKeyBBB', 'myValue');
            });
        });
        describe('remove', function () {
            it('should be return done', (done)=>{
                const cache = new InCache({
                    save: false,
                    share: false
                });

                cache.on('remove', (key)=>{
                    console.log('remove', key);
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
                    be.err(done).undefined(cache.get('myKeyBBB'));
                },100);
            });
        });
        describe('update', function () {
            it('should be return done', (done)=>{
                const cache = new InCache({
                    save: false,
                    share: false
                });

                cache.on('update', (key, record)=>{
                    console.log('update', record);
                    if(record.createdOn && key === 'myKeyBBB') done();
                });

                cache.destroy('myKeyBBB');
                cache.set('myKeyBBB', 'myValue');
                cache.set('myKeyBBB', 'myValue 2');
            });
        });

    });
});
