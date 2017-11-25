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
        describe('load', function () {
            it('should be return done, file not found', (done)=>{
                const cache = new InCache({
                    filePath: 'no-found'
                });

                cache.on('load', (err)=>{
                    console.log('load with', 'error', err);
                    if(err)
                        done();
                });
            });
            it('should be return done', (done)=>{
                const cache = new InCache({
                    filePath: './test/.incache-save2'
                });

                cache.on('load', (err)=>{
                    console.log('load with', 'error', err);
                    if(err === null)
                        done();
                });
            });
            it('should be return done, autoLoad false', (done)=>{
                const cache = new InCache({
                    autoLoad: false,
                    filePath: './test/.incache-save2'
                });

                cache.load().then(()=>{
                    console.log('loaded');
                }).catch(e => {
                    console.log(e);
                });

                cache.on('load', (err)=>{
                    console.log('load with', 'error', err);
                    if(err === null)
                        done();
                });
            });
        });
        describe('beforeLoad', function () {
            it('should be reject', (done)=>{
                const cache = new InCache({
                    autoLoad: false,
                    filePath: './test/.incache-save2'
                });

                cache.on('beforeLoad', ()=>{
                    console.log('beforeLoad');
                    return false;
                });

                cache.load().then(()=>{
                    done('loaded');
                }).catch(e => {
                    done();
                });

            });
            it('should be not reject, autoLoad true', (done)=>{
                new InCache({
                    autoLoad: true,
                    filePath: './test/.incache-save2'
                }).on('beforeLoad', ()=>{
                    console.log('beforeLoad');
                    return false;
                }).on('load', (err)=>{
                    console.log(err, 'load');
                    done();
                });

            });
        });
        describe('beforeSave', function () {
            it('should be reject', (done)=>{
                const cache = new InCache({
                    autoSave: false,
                    filePath: './test/.incache-save6'
                });

                cache.on('beforeSave', ()=>{
                    return false;
                });

                cache.save().then(()=>{
                    done('saved');
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

                cache.save().then(()=>{
                    console.log('saved');
                }).catch(e => {
                    console.log(e);
                });

                cache.on('save', (err)=>{
                    console.log('save with', 'error', err);
                    if(err === null)
                        done();
                });
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
        describe('change', function () {
            it('should be return done', (done)=>{
                const cache = new InCache({
                    save: false
                });

                cache.on('change', by => {
                    console.log('change', by);
                    done();
                });

                cache.set('myKeyBBB', 'myValue');
            });
        });
        describe('exceed', function () {
            it('should be return done', (done)=>{
                const cache = new InCache({
                    save: false,
                    maxRecordNumber: 2
                });

                cache.on('exceed', diff => {
                    console.log('exceed', diff);
                    if(diff === 1)
                        done();
                });

                cache.set('myKeyBBB1', 'myValue');
                cache.set('myKeyBBB2', 'myValue');
                cache.set('myKeyBBB3', 'myValue');
            });
        });

        describe('suspendEvent change', function () {
            it('should be return done', (done)=>{
                const cache = new InCache({
                    save: false
                });

                cache.on('change', by => {
                    throw new Error('suspendEvent error');
                });

                cache.suspendEvent('change');

                cache.set('myKeyBBB', 'myValue');
                done();
            });
        });

        describe('resumeEvent change', function () {
            it('should be return done', (done)=>{
                const cache = new InCache({
                    save: false
                });

                cache.on('change', by => {
                    done();
                });

                cache.suspendEvent('change');

                cache.set('myKeyBBB', 'myValue');

                cache.resumeEvent('change');

                cache.set('myKeyBBB', 'myValue2');

            });
        });

        describe('suspendEvents', function () {
            it('should be return done', (done)=>{
                const cache = new InCache({
                    save: false
                });

                cache.on('change', by => {
                    throw new Error('suspendEvent error');
                });

                cache.suspendEvents();

                cache.set('myKeyBBB', 'myValue');
                done();
            });
        });

        describe('resumeEvents', function () {
            it('should be return done', (done)=>{
                const cache = new InCache({
                    save: false
                });

                cache.on('change', by => {
                    done();
                });

                cache.suspendEvents();

                cache.set('myKeyBBB', 'myValue');

                cache.resumeEvents();

                cache.set('myKeyBBB', 'myValue2');

            });
        });
    });
});
