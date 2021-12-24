const env = require('../.env') //para pegar o env
const Telegraf = require('telegraf') //para pegar o modulo telegraf
const bot = new Telegraf(env.token) //passando o env.token

bot.start(async ctx => {
    await ctx.reply(`Seja Bem Vindo, ${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name}! ☺`)
   /*
    await ctx.replyWithHTML(`Destacando mensagem <b>HTML</b>
        <i>de várias</i> <code>formas</code> <pre>disponíveis</pre>
        <a href="http://www.luizladeira.com">Portfólio Profissional</a>
    `)
    await ctx.replyWithMarkdown('Destacando mensagem *Markdown*'
    + ' _de várias_ formas possiveis'+
    ' Luiz Ladeira (http://www.luizladeira.com)'
    )
    */
    await ctx.replyWithMarkdown(
        'Meu nome é *Luiz Ladeira*!'
        + ' Sou graduado em Análise e Desenvolvimento de Sistemas,'
        +' pós graduado em Engenharia de Software com ênfase em desenvolvimento em JAVA,'
        +' pós Graduando Docência do Ensino Superior e graduando Ciências Contábeis. '
        +'*Acesse:* [Luiz Ladeira](http://www.luizladeira.com)'
    )

       await ctx.replyWithPhoto({source: `${__dirname}/logo_luiz.png`}) //pega dentro da pasta da aplicação
       // await ctx.replyWithPhoto('http://luizladeira.com/profissional/wp-content/uploads/2020/02/luiz-ladeira.png', {caption: 'Portfólio do Luiz Ladeira'}) //pega através de uma URL
      //  await ctx.replyWithPhoto({url: 'http://luizladeira.com/profissional/wp-content/uploads/2020/02/luiz-ladeira.png'}) //pega dentro da pasta da aplicação
        await ctx.replyWithLocation(-23.5409151,-46.6480338)
//        await ctx.replyWithVideo('http://youtube.com/embed/TK0Xc_dc5_Y') //inserir link do video

})

bot.startPolling()