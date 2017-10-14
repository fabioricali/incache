const InCache = require('../../src/incache');

const store = new InCache({
    autoLoad: false,
    filePath: 'cache.json'
}).on('beforeLoad', () => {
    console.log('beforeLoad');
}).on('load', (err, me) => {
    if(!err)
        console.log('load', me.get('a key'));
});

store.load().then(me => {
    console.log(me);
}).catch(e => {
    console.log(e);
});