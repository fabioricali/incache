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
