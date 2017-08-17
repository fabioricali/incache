module.exports = function(){

  return async function(ctx, next){

    const cache = ctx.cache.get(ctx.path);

    if(cache !== null){
      return ctx.body = cache;
    }

    await next();
  }

};
