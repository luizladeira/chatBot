const env = require('../.env') //para pegar o env
const Telegraf = require('telegraf') //para pegar o modulo telegraf
const bot = new Telegraf(env.token) //passando o env.token

bot.start(ctx => {
    const from = ctx.update.message.from
    console.log(from)
    ctx.reply(`Seja Bem vindo, ${from.first_name}!`)
   // ctx.reply('Seja bem vindo, ${from.first_name} !')
})

//PEGA O TEXTO
bot.on('text', async(ctx, next) => {
    await ctx.reply('Mid 1')
    next()
})

//PEGA O TEXTO
bot.on('text', async(ctx, next) => {
    await ctx.reply('Mid 2')
    next()
})

//fica perguntando pro servidor o que é para ser feito
bot.startPolling() 