const axios = require('axios');

module.exports.config = {
  name: "rexai",
  version: "1.0.0",
  credits: "Réynél",
  description: "Rexai (Reseach-Expert-AI)",
  commandCategory: "ai",
  usages: "[prompt]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
    const prompt = args.join(" ");

    if (!prompt) {
        return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗍𝗂𝗍𝗅𝖾 𝗍𝗈 𝗉𝗋𝗈𝖼𝖾𝖾𝖽.", event.threadID, event.messageID);
    }

    try {
        const response = await axios.post('https://rexai-reseach-expert-ai.august-api.repl.co/Title', { prompt });
        const responseData = response.data;

        api.sendMessage(`${responseData.google.generated_text}`, event.threadID, event.messageID);
    } catch (error) {
        console.error('ERROR', error.response?.data || error.message);
        api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.', event.threadID);
    }
};
