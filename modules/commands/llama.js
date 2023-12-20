const axios = require('axios');

module.exports.config = {
    name: "Llama",
    version: "1.0.0",
    credits: "Réynél",
    description: "Get a llama response.",
    commandCategory: "ai",
    usages: "[prompt]",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    const prompt = args.join(" ");

    if (!prompt) {
        return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗉𝗋𝗈𝗆𝗉𝗍 for 𝗍𝗁𝖾 𝗅𝗅𝖺𝗆𝖺.", event.threadID, event.messageID);
    }

    try {
        const response = await axios.get(`https://llama.august-api.repl.co/llama?prompt=${encodeURI(prompt)}`);
        const llamaResponse = response.data.response;

        const message = {
            body: `🦙 | 𝗟𝗟𝗔𝗠𝗔 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘:\n\n${llamaResponse}`,
        };

        api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
        console.error('[ERROR]', error);
        api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.', event.threadID);
    }
};