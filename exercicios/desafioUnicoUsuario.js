const env = require('../.env') //para pegar o env
const Telegraf = require('telegraf') //para pegar o modulo telegraf
const bot = new Telegraf(env.token) //passando o env.token

bot.start(ctx => {
    const from = ctx.update.message.from
    console.log(from)

    if( from.id != 1655232619){
        ctx.reply(`Olá, ${from.first_name}!\nQual é a boa de hoje?`)
    }else{
        ctx.reply(`Sinto muito ${from.first_name} mais não quero falar com você hoje!`)
    }
})


//fica perguntando pro servidor o que é para ser feito
bot.startPolling() 