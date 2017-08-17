exports.hello = async (ctx) => {
  const result = 'hello world';
  ctx.cache.set(ctx.path, result);
  ctx.body = result;
};

exports.world = async (ctx) => {
  ctx.body = 'hello world';
};
