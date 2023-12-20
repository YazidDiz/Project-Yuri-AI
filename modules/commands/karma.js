const axios = require('axios');

module.exports.config = {
  name: 'karma',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'Get a karma quote.',
  commandCategory: 'quotes',
  usages: '[karma]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  try {
    const response = await axios.get('https://karmaquotes.august-api.repl.co/quotes');
    const karmaQuotes = response.data;

    if (karmaQuotes.length === 0) {
      return api.sendMessage('❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗇𝗈 𝗄𝖺𝗋𝗆𝖺 𝗊𝗎𝗈𝗍𝖾𝗌 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', event.threadID, event.messageID);
    }

    const randomIndex = Math.floor(Math.random() * karmaQuotes.length);
    const randomKarmaQuote = karmaQuotes[randomIndex];

    const message = `💬 | 𝗞𝗔𝗥𝗠𝗔 𝗤𝗨𝗢𝗧𝗘:\n\n➩ ${randomKarmaQuote.quote}`;

    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗄𝖺𝗋𝗆𝖺 𝗊𝗎𝗈𝗍𝖾𝗌. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', event.threadID, event.messageID);
  }
};
      