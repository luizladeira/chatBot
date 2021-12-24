const env = require('../.env') //para pegar o env
const Telegraf = require('telegraf') //para pegar o modulo telegraf
const bot = new Telegraf(env.token) //passando o env.token

bot.start(ctx => {
    const from = ctx.update.message.from
    console.log(from)
    ctx.reply(`Seja Bem vindo, ${from.first_name}!`)
   // ctx.reply('Seja bem vindo, ${from.first_name} !')
})

//EVENTO DE PEGAR TEXTO DIGITADO
bot.on('text', ctx => 
    ctx.reply(`Texto '${ctx.update.message.text}' recebido com sucesso! `)
)

//EVENTO PARA PEGAR A LOCALIZAÇÃO
bot.on('location', ctx => {
        const location = ctx.update.message.location
        console.log(location)
        
        ctx.reply(`Entendido, você está em 
        Latitude: (${location.latitude}), 
        Longitude: (${location.longitude})!`)//enviar para o usuário

    }
)

//EVENTO PARA PEGAR O CONTATO
bot.on('contact', ctx =>  {
        const contact = ctx.update.message.contact
        console.log(contact)
        ctx.reply(`Vou lembrar o contato de ${contact.first_name} - (${contact.phone_number})`)
    }
)
 
//EVENTO PARA PEGAR AUDIO
bot.on('voice', ctx =>{
    const voice = ctx.update.message.voice
    console.log(voice)
    ctx.reply(`Sua mensagem de voz tem: ${voice.duration} segundos`)
})

//EVENTO PARA PEGAR FOTO
bot.on('photo', ctx =>{
    const photo = ctx.update.message.photo
    console.log(photo)
    //percorrer as fotos recebidas com foreach
    photo.forEach((ph, i) => {
        ctx.reply(`A foto ${i} tem resolução de Largura: ${ph.width} e Altura ${ph.height}`)
    })
})

//EVENTO PARA PEGAR STICKER - ICONS DE ANIMAÇÃO
bot.on('sticker', ctx =>{
    const sticker = ctx.update.message.sticker
    console.log(sticker)
    ctx.reply(`Estou vendo que você enviou o ${sticker.emoji} do conjunto ${sticker.set_name}`)
})

//fica perguntando pro servidor o que é para ser feito
bot.startPolling() 
