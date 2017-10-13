const InCache = require('../../src/incache');

const store = new InCache({
    autoSave: true,
    autoSaveMode: InCache.SAVE_MODE.TERMINATE
});

store.set('a key', 'a value');

console.log(store.get('a key'));