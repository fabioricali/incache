const router = require('koa-router')();
const { hello, world } = require('./hello');
const cacheMiddleware = require('../middleware');

router
  .get('/benchmark/cached', cacheMiddleware(), hello)
  .get('/benchmark/notCached', world);

module.exports = router;
