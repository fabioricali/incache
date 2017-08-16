const router = require('koa-router')();
const { helloWorld } = require('./hello');
const cacheMiddleware = require('../middleware');

router
  .get('/benchmark/cached', cacheMiddleware(), helloWorld)
  .get('/benchmark/notCached', helloWorld)

module.exports = router;
