const env = require('../.env') //para pegar o env
const Telegraf = require('telegraf') //para pegar o modulo telegraf
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token) //passando o env.token

const tecladoAnimais = Markup.keyboard([
    ['🐶 cachorro','🐱 gato','🐭 rato'],
    ['🐥 pintinho','🐓 galo','🐔 galinha'],
    ['🐙 lula','🐡 baiacu','🐟 peixe'],
    ['🐑 ovelha','🐖 porco','🐒 macaco']
]).resize().extra()

bot.start(async ctx => {
    await ctx.reply(`Seja Bem Vindo!, ${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name}!` )
    await ctx.reply(`Qual Bebida você prefere? `, Markup.keyboard(['Coca Cola', 'Pepsi', 'Fanta', 'Cerveja']).resize().oneTime().extra())
})

bot.hears(['Coca Cola', 'Pepsi', 'Fanta', 'Cerveja'], async ctx => {
    await ctx.reply(`Nossa eu só gosto de ${ctx.match}`)
    await ctx.reply(`Qual o seu animal favorito? `, tecladoAnimais)
})

bot.hears('🐶 cachorro', ctx => ctx.reply(`O meu favorito é: 🐱 gato`))
bot.hears('🐥 pintinho', ctx => ctx.reply(`O meu favorito é: 🐔 galinha`))
bot.hears('🐡 baiacu', ctx => ctx.reply(`A não! O 🐡 baiacu é a cara do Bruno quando faz BARBA KKKKKKKK`))

bot.on('text', ctx => ctx.reply('Legal! Mais possuo outro animal favorito!'))

bot.startPolling()