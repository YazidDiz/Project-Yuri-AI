const axios = require('axios');

module.exports.config = {
  name: "palm",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "asking questions with palm",
  commandCategory: "ai",
  usages: "[your question]",
  cooldowns: 10,
};
module.exports.run = async function ({ api, event, args }) {
  const question = args.join(" ");
  api.setMessageReaction("⏱️", event.messageID, () => { }, true);

  if (!question) {
    return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖯𝗅𝖾𝖺𝗌𝖾 𝖤𝗇𝗍𝖾𝗋 𝗒𝗈𝗎𝗋 𝖰𝗎𝖾𝗌𝗍𝗂𝗈𝗇", event.threadID, event.messageID);
  } else {
    try {
      const response = await axios.get(
        `https://google.odernder.repl.co/palm?text=hi${encodeURIComponent(question)}`
      );
      const answer = response.data.output; api.setMessageReaction("🌴", event.messageID, () => { }, true);
      return api.sendMessage(answer, event.threadID, event.messageID); 
    } catch (error) {
      console.log(error);
      return api.sendMessage("📫 | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗈𝗎𝗍𝗉𝗎𝗍 𝖿𝗈𝗎𝗇𝖽 𝗂𝗇 𝗍𝗁𝖾 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾", event.threadID);
    }
  }
};