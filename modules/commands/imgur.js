const axios = require('axios');

module.exports.config = {
    name: "imgur",
    version: "1.0.1",
    credits: "Réynél",
    cooldowns: 5,
    hasPermission: 0,
    description: "Upload image or video to Imgur by replying to photo or video",
    commandCategory: "tools",
    usages: "[image, video]"
  },

  module.exports.run = async function ({ api, event }) {
    const link = event.messageReply?.attachments[0]?.url;
    if (!link) {
      return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝖺𝗇 𝗂𝗆𝖺𝗀𝖾 𝗈𝗋 𝗏𝗂𝖽𝖾𝗈.', event.threadID, event.messageID);
    }

    try {
      const res = await axios.get(`https://rishadapi.rishad100.repl.co/imgur2?apikey=fuck&link=${encodeURIComponent(link)}`);
      const uploaded = res.data.uploaded;

      if (uploaded.status === "success") {
        return api.sendMessage(uploaded.url, event.threadID, event.messageID);
      } else {
        return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗎𝗉𝗅𝗈𝖺𝖽 𝗂𝗆𝖺𝗀𝖾 𝗈𝗋 𝗏𝗂𝖽𝖾𝗈 𝗍𝗈 𝖨𝗆𝗀𝗎𝗋.', event.threadID, event.messageID);
      }
    } catch (error) {
      console.error(error);
      return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗎𝗉𝗅𝗈𝖺𝖽 𝗂𝗆𝖺𝗀𝖾 𝗈𝗋 𝗏𝗂𝖽𝖾𝗈 𝗍𝗈 𝖨𝗆𝗀𝗎𝗋.', event.threadID, event.messageID);
    }
};
