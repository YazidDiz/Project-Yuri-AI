const axios = require('axios');

module.exports.config = {
  name: 'programmingjoke',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Réynél',
  description: 'Get a random programming joke.',
  commandCategory: 'meme',
  usages: '[programmingjoke]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/jokes/programming/random');
    const joke = response.data[0];

    api.sendMessage(`💻 | 𝗣𝗥𝗢𝗚𝗥𝗔𝗠𝗠𝗜𝗡𝗚 𝗝𝗢𝗞𝗘:\n━━━━━━━━━━━━━━━━━━━\n${joke.setup}\n━━━━━━━━━━━━━━━━━━━\n${joke.punchline}`, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖺 𝗉𝗋𝗈𝗀𝗋𝖺𝗆𝗆𝗂𝗇𝗀 𝗃𝗈𝗄𝖾.', event.threadID, event.messageID);
  }
};
