//Correção da mensagem
process.env.NTBA_FIX_319 = 1;

//Inserindo seu bot-Token na constante 'TOKEN'
const TOKEN = process.env.TELEGRAM_TOKEN || 'seuToken';

const TelegramBot = require('node-telegram-bot-api')
const options = {
  webHook: {
    port: process.env.PORT
  }
};
const url = process.env.APP_URL || 'https://seuProjetoHerokuURL.herokuapp.com:443';
const bot = new TelegramBot(TOKEN, options);

bot.setWebHook(`${url}/bot${TOKEN}`);


bot.on('message', (msg) => {

  const chatId = msg.chat.id;
  const text = msg.text;

  //Lendo a lista de Tutoriais
  var fs = require('fs');
  try {
    var data = fs.readFileSync('lista.txt', 'utf8');
  } catch (e) {
    console.log('Error:', e.stack);
  }

  //Enviando a mensagem de Tutoriais

  if (text.includes('/comando')) {
    bot.sendMessage(chatId, `Olá! ${msg.chat.first_name} 😎`)
    bot.sendMessage(chatId, data);
  }
});