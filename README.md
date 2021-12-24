# ChatBot com NodeJs para TELEGRAM
 
Como criamos um chatbot no Telegram?
Para nomear nosso chatbot e criar os comandos de cada uma das nossas funcionalidades, precisaremos trocar uma ideia com o chatbot do Telegram chamado @BotFather.
1 - Procure por um chatbot chamado BotFather
Entre no seu Telegram e procure pelo BotFather, como ilustrado no gif abaixo:

Como achar o BotFather
2 - Vamos dar nome e nickname para o nosso chatbot
O BotFather é responsável por criar todos os chatbots do Telegram, ele é um bot baseado em regras, portanto, é limitado a alguns comandos. O primeiro comando que precisamos aprender é o de como criar um chatbot. Para fazer isto, basta mandar a mensagem para ele /newbot, conforme é ilustrado no gif abaixo:

Como criar o chatbot no Telegram
Você só não vai conseguir criar um bot com o nome de EventosTechBot. :-)
Das instruções pra baixo, toda vez que eu me referir ao EventosTechBot, você deverá trocar para o nome do chatbot que você está criando.
3 - Criando o comando para nossa primeira funcionalidade
Nossa primeira funcionalidade será listar todos os eventos que irão acontecer. Nessa primeira versão nosso chatbot (EventosTechBot) será da mesma categoria do BotFather, um bot baseados em regras. Por isso, vamos pedir para o BotFather ensinar dois comandos para o nosso o EventosTechBot. Para fazermos isso, basta passarmos o comando /setcommand e realizar os passos ilustrados no gif abaixo:

Definindo comando para o chatbot no Telegram
4- Conversando com o nosso próprio chatbot
Procure o EventosTechBot e envie o comando (/allevents) que acabamos de cadastrar. Infelizmente, nosso chatbot ainda não sabe responder a mensagem, está no momento de abandonarmos um pouco o BotFather e partimos para o nosso código em JavaScript em cima da plataforma do NodeJS. Ah! Antes de sairmos escrevendo o código é importante entender o que acontece com as mensagens que acabamos de enviar para o nosso chatbot, seja ela comandos ou apenas mensagens de texto.
Toda mensagem que enviamos para um chatbot do Telegram fica aguardando uma resposta por 24 horas, ou seja, para conseguirmos respondê-la precisamos ir até o Telegram, coletar as mensagens que estão aguardando resposta e respondê-las. Esse será o código que vamos desenvolver em JavaScript utilizando o NodeJS como plataforma.
