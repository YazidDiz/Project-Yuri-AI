const axios = require('axios');

module.exports.config = {
  name: 'rcb',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'rcb test gpt',
  commandCategory: 'ai',
  usages: '[prompt]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, args, event }) {
  try {
    const text = args.join(' ');

    if (!text) {
      api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗌𝗈𝗆𝖾 𝗍𝖾𝗑𝗍 𝖿𝗈𝗋 𝗍𝖾𝗌𝗍𝗂𝗇𝗀.', event.threadID, event.messageID);
      return;
    }

    const apiUrl = 'https://chatgpt.august-api.repl.co/response';
    const response = await axios.post(apiUrl, { prompt: text });

    if (response.data && response.data.answer) {
      const answer = response.data.answer.trim();
      api.sendMessage(`${answer}`, event.threadID, event.messageID);
    } else {
      api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗍𝖾𝗌𝗍𝗂𝗇𝗀. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('Error in rcb command:', error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗍𝖾𝗌𝗍𝗂𝗇𝗀. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', event.threadID, event.messageID);
  }
};