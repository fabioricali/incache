const perf = require('execution-time')();
const InCache = require('../../');

perf.start();
console.log('start load');

const cache = new InCache();

console.log('result', cache.count());
console.log('finish load', perf.stop().time / 1000);
