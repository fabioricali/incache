const perf = require('execution-time')();
const InCache = require('../../');

console.log('start load');
perf.start();

const cache = new InCache();

console.log('finish load', perf.stop().time / 1000);

perf.start();
console.log('start set');

for (let i = 0; i<1000000; i++) {
    cache.set('i' + i, {
        a: {
            b: {
                c: {
                    d: {
                        e: {
                            f: {
                                g: [
                                    {
                                        h: {
                                            i: 'hello'
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }
    });
}
console.log('result', cache.count());
console.log('finish set', perf.stop().time / 1000);

perf.start();
console.log('start save');
cache.save().then(()=>{
    console.log('finish save', perf.stop().time / 1000);
});
