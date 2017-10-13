const InCache = require('../../src/incache');

const store = new InCache();

store.set('a key', 'a value');

console.log(store.get('a key'));