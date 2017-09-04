const fs = require('fs');
const InCache = require('../src/incache');
const be = require('bejs');
const typis = require('typis');

describe('cache-events', function () {

    this.timeout(5000);

    describe('onBeforeSet', function () {
        it('should be return done', (done)=>{

            const cache = new InCache({
                save: false,
                share: false
            });

            cache.onBeforeSet((key)=>{
                console.log('on before set', key);
                done();
                return false;
            });
            cache.onSet((key)=>{
                console.log('on set', key);
                done();
            });
            cache.set('myKeyBI', 'myValue');
        });
    });

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
});
