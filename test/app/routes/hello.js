const fs = require('fs');
const filePath = './test/app/fake-content';

exports.hello = async (ctx) => {
  const result = fs.readFileSync(filePath).toString();
  ctx.cache.set(ctx.path, result);
  ctx.body = result;
};

exports.world = async (ctx) => {
  ctx.body = fs.readFileSync(filePath).toString();
};
