const axios = require('axios');
module.exports.config = {
  name: "catguru",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Chat with catgpt",
  commandCategory: "ai",
  usages: "[text]",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  const q = args.join(" ");
  try {
    const response = await axios.post("https://catgpt.guru/api/chat", {
      messages: [
        {
          role: "user",
          content: q,
        },
      ],
    });
    api.sendMessage(response.data, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖼𝖺𝗍𝗀𝗎𝗋𝗎 𝖽𝗂𝖽𝗇’𝗍 𝗋𝖾𝗌𝗉𝗈𝗇𝖽', event.threadID, event.messageID);
  }
};