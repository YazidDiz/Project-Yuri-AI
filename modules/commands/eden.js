const axios = require('axios');

module.exports.config = {
  name: "eden",
  version: "1.0.0",
  credits: "Réynél",
  description: "Get a response from Eden AI",
  commandCategory: "ai",
  usages: "[prompt]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
    const prompt = args.join(" ");

    if (!prompt) {
        return api.sendMessage("👋 | 𝖧𝖾𝗅𝗅𝗈 𝗍𝗁𝖾𝗋𝖾, 𝗁𝗈𝗐 𝖼𝖺𝗇 𝖨 𝖺𝗌𝗌𝗂𝗌𝗍 𝗒𝗈𝗎 𝗍𝗈𝖽𝖺𝗒?", event.threadID, event.messageID);
    }

    try {
        const response = await axios.post('https://eden.august-api.repl.co/Eden', { prompt });
        const responseData = response.data;

        api.sendMessage(`${responseData.openai.generated_text}`, event.threadID, event.messageID);
    } catch (error) {
        console.error('ERROR', error.response?.data || error.message);
        api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.', event.threadID);
    }
};