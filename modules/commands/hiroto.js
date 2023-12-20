const axios = require('axios');

module.exports.config = {
  name: 'hiroto',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'An Ai Chatgpt',
  commandCategory: 'ai',
  usages: '[query]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, args, event }) {
  try {
    const text = args.join(' ');

    if (!text) {
      api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖪𝗂𝗇𝖽𝗅𝗒 provide some questions.', event.threadID, event.messageID);
      return;
    }

    const apiUrl = 'https://chatgpt.august-api.repl.co/response';
    const response = await axios.post(apiUrl, { prompt: text });

    if (response.data && response.data.answer) {
      const answer = response.data.answer.trim();
      api.sendMessage(`🌟 | 𝗛𝗶𝗿𝗼𝘁𝗼:\n╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n\n${answer}\n\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯`, event.threadID, event.messageID);
    } else {
      api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗍𝗈 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('Error in hiroto command:', error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗍𝗈 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', event.threadID, event.messageID);
  }
};