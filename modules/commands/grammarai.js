const axios = require('axios');

module.exports.config = {
  name: 'grammarai',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'Your AI grammar expert for analysis and corrections.',
  commandCategory: 'ai',
  cooldowns: 5,
};

module.exports.run = async function ({ api, args, event }) {
  try {
    const prompt = args.join(' ');

    if (!prompt) {
      api.sendMessage(
        '👋 | 𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨 𝖺𝗆 𝗁𝖾𝗋𝖾 𝗍𝗈 𝖺𝗌𝗌𝗂𝗌𝗍 𝗒𝗈𝗎 𝗐𝗂𝗍𝗁 𝗀𝗋𝖺𝗆𝗆𝖺𝗋 𝖺𝗇𝖺𝗅𝗒𝗌𝗂𝗌 𝖺𝗇𝖽 𝖼𝗈𝗋𝗋𝖾𝖼𝗍𝗂𝗈𝗇𝗌.',
        event.threadID,
        event.messageID
      );
      return;
    }

  api.sendMessage('🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨’𝗆 𝖺𝗇𝖺𝗅𝗒𝗓𝗂𝗇𝗀 𝖺𝗇𝖽 𝖼𝗋𝖺𝖿𝗍𝗂𝗇𝗀 𝖺 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍....', event.threadID, event.messageID);

    const response = await axios.post('https://grammarai.august-api.repl.co/textanalysis', { prompt });

    if (response.status === 200 && response.data && response.data.answer) {
      const messageText = response.data.answer.trim();
      api.sendMessage(`💬 | 𝖦𝗋𝖺𝗆𝗆𝖺𝗋 𝖠𝖨'𝗌 𝖠𝗇𝖺𝗅𝗒𝗌𝗂𝗌 𝖺𝗇𝖽 𝖢𝗈𝗋𝗋𝖾𝖼𝗍𝗂𝗈𝗇:\n\n${messageText}`, event.threadID, event.messageID);
    } else {
      throw new Error('Invalid or missing response from Grammar AI API');
    }
  } catch (error) {
    console.error(`Failed to get an answer: ${error.message}`);
   api.sendMessage(`❎ | 𝖤𝗋𝗋𝗈𝗋: ${error.message}. 𝖠𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽; 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋 𝗌𝖾𝗇𝗌𝖾𝗂.`, event.threadID, event.messageID);
  }
};