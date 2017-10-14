const InCache = require('../../src/incache');

const store = new InCache()
    .on('save', () => {
        console.log('save');
    });

store.set('a key', 'a value');

store.save('cache.json').then(me => {
    console.log('save, promise response');
}).catch(e => {
    console.log(e);
});