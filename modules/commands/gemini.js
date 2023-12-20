const axios = require('axios');

module.exports.config = {
  name: "gemini",
  hasPermssion: 0,
  credits: "Clark",
  description: "Ask questions with Gemini AI",
  commandCategory: "ai",
  usages: "[question]",
  cooldowns: 5,
};
  module.exports.run = async function ({ args, event, api }) {
    const content = args.join(" ");
    if (!content) {
      return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇𝗌!", event.threadID, event.messageID);
    }
api.sendMessage("⏱️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗀𝖾𝗆𝗂𝗇𝗂 𝗂𝗌 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝖺𝗇𝗌𝗐𝖾𝗋! 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍..", event.threadID, event.messageID);
    try {
      const response = await axios.get(`https://bnw.samirzyx.repl.co/api/Gemini?text=${content}`);
      const candidates = response.data.candidates;
      if (candidates.length > 0) {
        const geminiResponse = candidates[0].content.parts.map(part => part.text).join(" ");
        return api.sendMessage(`${geminiResponse}`, event.threadID, event.messageID);
      } else {
        return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗀𝖾𝗆𝗂𝗇𝗂 𝖽𝗂𝖽𝗇'𝗍 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾.", event.threadID, event.messageID);
      }
    } catch (error) {
      console.error("❎ | Error making Gemini API request:", error.message);
      return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍.", event.threadID, event.messageID);
    }
};