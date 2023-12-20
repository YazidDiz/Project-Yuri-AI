const axios = require('axios');

module.exports.config = {
  name: "quotes",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Randomly receive quotes",
  commandCategory: "quotes",
  usages: "[quotes]",
  cooldowns: 10,
};

module.exports.run = async function({ api, event }) {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const quote = response.data;
    const content = quote.content;
    const author = quote.author;
    const message = `"${content}" - ${author}`;
    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error('Something went wrong:', error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝖺𝗉𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇.', event.threadID, event.messageID);
  }
};
