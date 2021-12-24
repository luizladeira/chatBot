
//necessita da dependencia axios 
//npm i --save axios@0.17.1 -E

const env = require('../.env') //para pegar o env
const axios = require('axios') //coloca o axios 
const Telegraf = require('telegraf') //para pegar o modulo telegraf
const bot = new Telegraf(env.token) //passando o env.token

//tratamento de voz
bot.on('voice', async ctx => {
       //retorna uma promisse - promessa no futuro
       const id = ctx.update.message.voice.file_id
       const response = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`)
       ctx.replyWithVoice({url:`${env.apiFileUrl}/${response.data.result.file_path}`})

})

bot.on('photo', async ctx => {
    const id = ctx.update.message.photo[0].file_id
    const response = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`)
    ctx.replyWithPhoto({url:`${env.apiFileUrl}/${response.data.result.file_path}`})
})

bot.startPolling()
