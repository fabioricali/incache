const InCache = require('../../src/incache');

const store = new InCache({
    autoSave: true,
    autoSaveMode: InCache.SAVE_MODE.TIMER,
    filePath: 'cache-timer.json'
}).on('beforeSave', () => {
    console.log('before save');
}).on('save', () => {
    console.log('save');
});

store.set('a key', 'a value');

console.log(store.get('a key'));