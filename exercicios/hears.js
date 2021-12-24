//necessita da dependencia moment
// npm i --save moment@2.20.1 -E

const env = require('../.env') //para pegar o env
const Telegraf = require('telegraf') //para pegar o modulo telegraf
const moment = require('moment') //para pegar o modulo telegraf
const bot = new Telegraf(env.token) //passando o env.token

bot.hears('pizza', ctx => ctx.reply('Quero!'))

bot.hears(['figado','chuchu'], ctx => ctx.reply('Passo!'))

bot.hears('🍇', ctx => ctx.reply('Quero! ♥'))

//expressão regular
bot.hears(/burguer/i, ctx => ctx.reply('QUERO!'))

//array de expressões regulares
bot.hears([/brocolis/i,/salada/i,], ctx => ctx.reply('Entendi!'))

bot.hears(/(\d{2}\/\d{2}\/\d{4})/g, ctx=> {
    moment.locale('pt-BR')
    const data = moment(ctx.match[1], 'DD/MM/YYYY')
    ctx.reply(`${ctx.match[1]} cai em uma ${data.format('dddd')}`)
}
) //regex

bot.startPolling()