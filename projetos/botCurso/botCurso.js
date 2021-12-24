const env       = require('../../.env')
const Telegraf  = require('telegraf')
const Extra     = require('telegraf/extra') //teclado
const Markup    = require('telegraf/markup') //teclado personalizado
const axios     = require('axios') //requisições remotas
const bot       = new Telegraf(env.token)

const tecladoOpcoes = Markup.keyboard([
    ['O que são bots?', 'O que verei no curso?'],
    ['Posso mesmo automatizar tarefas?'],
    ['Como comprar o curso?']
]).resize().extra()

//inlinekeyboard botoes que geram acoes
const botoes = Extra.markup(Markup.inlineKeyboard(
    [
        Markup.callbackButton('Sim', 's'),
        Markup.callbackButton('Não', 'n')    
    ], {columns: 2}
))


const localizacao = Markup.keyboard(
    [
        Markup.locationRequestButton('Clique aqui para enviar sua localização')
    ]
).resize().oneTime().extra()

bot.start(async ctx => {
    const nome =  ctx.update.message.from.first_name
    await ctx.replyWithMarkdown(`*Olá, ${nome}!*\nEu sou o ChatBot do curso`)
    await ctx.replyWithPhoto('https://files.cod3r.com.br/curso-bot/bot.png')
    await ctx.replyWithMarkdown(`_Posso te ajudar em algo?_`, tecladoOpcoes)
})

//frases prontas do teclado de opçoes: utilizando os hears
bot.hears('O que são bots?', ctx => {
    console.log('o que são bots?')
    ctx.replyWithMarkdown(`Chatbot é um programa de computador que tenta simular um ser humano na conversação com as pessoas.\nO objetivo é responder as perguntas de tal forma que as pessoas tenham a impressão de estar conversando com outra pessoa e não com um programa de computador\n
    _Algo mais que eu possa ajudar?_`,tecladoOpcoes)
})

bot.hears('O que verei no curso?', async ctx => {
    console.log('O que verei no curso?')
    await ctx.replyWithMarkdown('No *curso* .... Também vamos criar *3 projetos*:')
    await ctx.replyWithMarkdown('1. Um bot que vai gerenciar sua lista de compras')
    await ctx.replyWithMarkdown('2. Um bot que vai permitir você cadastrar seus eventos')
    await ctx.replyWithMarkdown('3. Um bot para você saber como fui criado, isso mesmo, você poderá me analisar desde meu nascimentos')
    await ctx.replyWithMarkdown('\n\n_Algo mais que eu possa ajudar?_', tecladoOpcoes)
})

bot.hears('Posso mesmo automatizar tarefas?', async ctx => {
    console.log('Posso mesmo automatizar tarefas?')
    await ctx.replyWithMarkdown('Sim, o bot servirá para auxiliar em sua automatização.... \nQuer dar um conferida?', botoes)

})

//se deseja enviar uma sequencia de passos necessita ser async

bot.hears('Como comprar o curso?', ctx => {
    console.log('Como comprar o curso?')
    ctx.replyWithMarkdown('Otimo, [link](https://www.luizladeira.com)', tecladoOpcoes)
})

//TRATAMENTOS DE S: sim e N: não
bot.action('n', ctx => {
    ctx.reply('Ok, tudo bem!', tecladoOpcoes)
})

bot.action('s', async ctx => {
    await ctx.reply('Ótimo, tente me enviar a sua localização, ou escreva uma mensagem qualquer', localizacao)

} )

bot.hears(/mensagem qualquer/i, ctx=>{
    ctx.reply('Essa piada é velha, tente outra...', tecladoOpcoes)
})

bot.on('text', async ctx => {
    let msg = ctx.message.text
    msg = msg.split(``).reverse().join(``)
    await ctx.reply(`A sua mensagem ao contrário é: ${msg}`)
    await ctx.reply('Isso mostra que eu consigo ler o que voce escreve e processar sua mensagem', tecladoOpcoes)
})

bot.on('location', async ctx => {
    try {
        const url = 'http://api.openweathermap.org/data/2.5/weather'
        const {latitude: lat, longitude: lon } = ctx.message.location
       // console.log(lat, lon)
       const res = await axios.get(`${url}?lat=${lat}&lon=${lon}&APPID=9c0f487e07c645e76da1eb52287702a3&units=metric`)
       await ctx.reply(`Hum... você está em ${res.data.name}`)
       await ctx.reply(`Hum... você está em ${res.data.main.temp}ºC`,tecladoOpcoes)
       
    }catch(e){
        ctx.reply('Estou tendo problemas para pegar a sua localização...', tecladoOpcoes)
    }
})

bot.startPolling()

