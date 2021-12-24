const env              = require('../.env')
const Telegraf         = require('telegraf')
const session          = require('telegraf/session')
const Stage            = require('telegraf/stage')
const Scene            = require('telegraf/scenes/base')
const SceneContext = require('telegraf/scenes/context')
const { enter, leave } = Stage //recurso do action script 2015

/*
const Extra     = require('telegraf/extra') //teclado
const Markup    = require('telegraf/markup') //teclado personalizado
const axios     = require('axios') //requisições remotas
*/

const bot       = new Telegraf(env.token)

bot.start(ctx => {
    const name = ctx.update.message.from.first_name
    ctx.reply(`Seja bem vindo, ${name}`)
    ctx.reply(`Entre com /echo ou /soma para iniciar o bot...`)

})

const echoScence = new Scene('echo') //nome da scene
echoScence.enter(
    ctx => ctx.reply('Entrando em EchoScene')
    ) //momento que entrar ele mostra essa middleware

echoScence.leave(
    ctx => ctx.reply(`Saindo de EchoScene`)
    ) //momento que sair ele mostra esse middleware

echoScence.command('sair',leave())
echoScence.on('text', ctx => ctx.reply(ctx.message.text))
echoScence.on('message', ctx => ctx.reply('Apenas mensagem de texto, por favor') )

//scene de somar
let soma = 0
const  somaScene = new Scene('soma')
somaScene.enter(
    ctx => ctx.reply('Entrando em Soma Scene')


)
somaScene.leave(
    ctx => ctx.reply('Saindo de Soma Scene')
)

somaScene.use(async (ctx, next) => {
    await ctx.reply('Você está em Soma Scene, escreva números para somar')
    await ctx.reply('Outros comandos: /zerar e /sair')
    next()
})

somaScene.command('zerar', ctx => {
    soma = 0
    ctx.reply(`Valor: ${soma}`)
})

somaScene.command('sair', leave())

somaScene.hears(/(\d+)/, ctx => {
 soma += parseInt(ctx.match[1])
 ctx.reply(`Valor: ${soma}`)
}) //pega os valores dos campos que o usuário digitar

somaScene.on('message', ctx => {
    ctx => ctx.reply('Apenas números por favor') 
})

const stage = new Stage([echoScence, somaScene])
bot.use(session())
bot.use(stage.middleware())
bot.command('soma', enter('soma'))
bot.command('echo',enter('echo'))
bot.on('message', ctx => ctx.reply('Entre com /echo ou /soma para iniciar....'))

bot.startPolling()