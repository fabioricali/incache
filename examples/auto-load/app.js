const InCache = require('../../src/incache');

new InCache({
    autoLoad: true,
    filePath: 'cache.json'
}).on('load', (err, me) => {
    if(!err)
        console.log('load', me.get('a key'));
});