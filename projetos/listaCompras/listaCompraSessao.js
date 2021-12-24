const env       = require('../../.env')
const Telegraf  = require('telegraf')
const Extra     = require('telegraf/extra') //colocar o teclado
const Markup    = require('telegraf/markup')
const session   = require('telegraf/session') //trabalhando com sessions
const bot       = new Telegraf(env.token)

const botoes = lista => Extra.markup(
    Markup.inlineKeyboard(
        lista.map(item => Markup.callbackButton(item, `delete ${item}`)), //map é responsável por fazer um for e mapear os botões
        {columns: 3}
       
    )
)

bot.use(session()) //função session

bot.start(async ctx => {
    const nome = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem, ${nome}!`)
    await ctx.reply(`Escreva os itens que você deseja adicionar!`)
    ctx.session.lista = []
})

bot.on('text', ctx => {
    let mensagem = ctx.message.text //pega a mensagem escrita no telegram pelo cliente
    ctx.session.lista.push(mensagem)
    ctx.reply(`${mensagem} adicionada!`, botoes(ctx.session.lista))
})

//excluir os itens
bot.action(/delete (.+)/, ctx =>{
    ctx.session.lista = ctx.session.lista.filter(
        item => item !== ctx.match[1]
        )
    ctx.reply(`${ctx.match[1]} deletado!`, botoes(ctx.session.lista))
})

bot.startPolling()