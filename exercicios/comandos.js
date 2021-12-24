const env = require('../.env') //para pegar o env
const Telegraf = require('telegraf') //para pegar o modulo telegraf
const bot = new Telegraf(env.token) //passando o env.token

bot.start(ctx => {
    const from = ctx.update.message.from
    console.log(from)
    ctx.reply(`Seja Bem vindo, ${from.first_name}!\n Avise se precisar de /ajuda`)
   // ctx.reply('Seja bem vindo, ${from.first_name} !')
})

bot.command('ajuda', ctx =>{
    ctx.reply('/ajuda: Vou mostrar as opções: '
    + '\n/ajuda2: para testar hears '
    + '\n/op2: Opção Genérica'
    + '\n/op3: Outra Opção Genérica Qualuqer'
    )
})

bot.hears('/ajuda2',ctx=> ctx.reply('Eu também consigo capturar comandos'
            +', mas utilize a /ajuda mesmo!')
)

bot.hears(/\/op\d+/i, ctx => ctx.reply('Resposta padrão para comandos genéricos'))

bot.startPolling()