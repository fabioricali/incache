exports.helloWorld = async (ctx) => {
  const result = 'hello world';
  ctx.cache.set(ctx.path, result);
  ctx.body = result;
};
