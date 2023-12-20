const axios = require('axios');

module.exports.config = {
  name: "autoquotes",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Clark",
  description: "Randomly receive quotes",
  commandCategory: "quotes",
  usages: "[autoquotes]",
  cooldowns: 10,
};

async function sendQuote(api, threadID) {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const quote = response.data;
    const content = quote.content;
    const author = quote.author;
    const message = `❝${content}❞\n━━━━━━━━━━━━━━━━━━━\n- ${author}\n━━━━━━━━━━━━━━━━━━━`;
    api.sendMessage(message, threadID);
  } catch (error) {
    console.error('Something went wrong:', error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝖺𝗉𝗂. 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇.', threadID);
  }
}

module.exports.run = async function({ api, event }) {
  // Send a quote when the command is initially invoked
  sendQuote(api, event.threadID);

  // Schedule sending a quote every 5 minutes (300000 milliseconds)
  setInterval(() => {
    sendQuote(api, event.threadID);
  }, 300000);
};