const koa = require('koa');
const api = require('koa-router')();
const apiRoutes = require('./routes/index');
const InCache = require('../../src/incache');
const cache = new InCache({
    filePath: __dirname +'/.incache-koa'
});
const app = new koa();

app.context.cache = cache;

api.use(apiRoutes.routes());
app.use(api.routes());

app.listen(3188);

function randomData(keyNumber, dataAmount) {
  const testArray = [];

  for(let k=0; k<keyNumber; k++){

    testArray.push([]);

    for(let i=0; i<dataAmount; i++){
      console.log('test k ', testArray[k]);
      testArray[k].push({ id: i+1, name: `test-${i+1}` });
    }

    cache.set(`${k}`, testArray[k]);
  }
}

randomData(5, 600);

