const axios = require("axios");
 
module.exports = { config: {
    name: "adping2",
    hasPermssion: 2,
    version: "2.0.0",
    author: "Réynél",
    description: "Keep a URL alive using an uptime service.",
    commandCategory: "monitor",
    usages: "[name] [url]",
    cooldowns: 5,
  },
  run: async ({ api, event, args }) => {
    const name = args[0];
    const url = args[1];
 
    if (!name || !url) {
      api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖻𝗈𝗍𝗁 𝖺 𝗇𝖺𝗆𝖾 𝖺𝗇𝖽 𝖺 𝖴𝖱𝖫 𝗍𝗈 𝗄𝖾𝖾𝗉 𝖺𝗅𝗂𝗏𝖾.", event.threadID, event.messageID);
      return;
    }
 
    try {
      const response = await axios.get(`https://uptimer-jerome.educ0991.repl.co/add?user=${encodeURIComponent(name)}&url=${encodeURIComponent(url)}`);
 
      if (response.status === 200) {
        api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝖴𝖱𝖫 '${name}' 𝗂𝗌 𝗇𝗈𝗐 𝖻𝖾𝗂𝗇𝗀 𝗄𝖾𝗉𝗍 𝖺𝗅𝗂𝗏𝖾.`, event.threadID, event.messageID);
      } else {
        api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗉𝗂𝗇𝗀 𝗍𝗁𝖾 𝖴𝖱𝖫. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", event.threadID, event.messageID);
      }
    } catch (error) {
      console.error("Error occurred while pinging the URL:", error);
      api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗌𝗉𝖾𝖼𝗂𝖿𝗂𝖾𝖽 𝖴𝖱𝖫 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 𝖾𝗑𝗂𝗌𝗍𝗌 𝗂𝗇 𝗍𝗁𝖾 𝗆𝗈𝗇𝗂𝗍𝗈𝗋𝖾𝖽 𝗅𝗂𝗌𝗍.", event.threadID, event.messageID);
    }
  },
};