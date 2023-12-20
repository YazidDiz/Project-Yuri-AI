const axios = require('axios');

module.exports.config = {
  name: "mathai",
  version: "1.0.0",
  credits: "Réynél",
  description: "Get math questions solved.",
  commandCategory: "ai",
  usages: "[prompt]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const prompt = args.join(" ");

  if (!prompt) {
    return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇.", event.threadID, event.messageID);
  }

  try {
    const response = await axios.get(`https://bnw.samirzyx.repl.co/mathai?q=${encodeURI(prompt)}`);
    const mathai = response.data.data;

    const message = `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 𝗋𝖾𝗌𝗎𝗅𝗍:\n\n${mathai}`;
    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.', event.threadID);
  }
};