module.exports.config = {
  name: "replitai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Get response from Replit AI",
  commandCategory: "ai",
  usages: "[your question]",
  cooldowns: 10,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async function ({ api, event, args, client }) {
  const axios = require('axios');
  if (!args[0]) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗂𝗇𝗉𝗎𝗍 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇", event.threadID, event.messageID);
  const question = encodeURIComponent(args.join(" "));
  const apiUrl = `https://hazeyy-api-useless.kyrinwu.repl.co/api/replit/ai?input=${question}`;
  
  try {
    api.sendMessage("⏱️ | 𝖱𝖾𝗉𝗅𝗂𝗍 𝖠𝖨 𝗂𝗌 𝖳𝗒𝗉𝗂𝗇𝗀 𝖩𝗎𝗌𝗍 𝖯𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", event.threadID, event.messageID);
    const response = await axios.get(apiUrl);
    if(response.data && response.data.bot_response && response.data.bot_response.trim() !== "") {
      api.sendMessage(response.data.bot_response, event.threadID, event.messageID);
    } else {
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗋𝖾𝗉𝗅𝗂𝗍 𝖠𝖨 𝖽𝗂𝖽 𝗇𝗈𝗍 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾.", event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖨 𝖼𝖺𝗇'𝗍 𝗀𝖾𝗍 𝖺 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾 𝖿𝗋𝗈𝗆 𝖱𝖾𝗉𝗅𝗂𝗍 𝖠𝖨 𝖺𝗍 𝗍𝗁𝖾 𝗆𝗈𝗆𝖾𝗇𝗍.", event.threadID, event.messageID);
    console.error(error);
  }
};