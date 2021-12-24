//middleware patter (chain of responsability)

/*
* @const exec = é um metodo que recebe dois parametros
* sendo eles: contexto que é um objeto, um conjunto de middlewares
* os ... é uma lista de parametros
*/

const exec = (ctx, ...middlewares) => {
   const run = index =>  {
       middlewares && index < middlewares.length &&
         middlewares[index](ctx, () => run(
                index+1
            )
        )
   }
   run (0)
}

const mid1 = (ctx, next) => {
    ctx.info1 = 'mid1'
    next()
}

const mid2 = (ctx, next) => {
    ctx.info2 = 'mid2'
    next()
}

const mid3 = (ctx) => ctx.info3 = 'mid3'

const ctx = {} //recebe vazio
exec( ctx, mid1, mid2, mid3)
console.log(ctx)