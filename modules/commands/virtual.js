module.exports.config = {
  name: "virtual",
  version: "1.0.1",
  hasPermission: 2,
  credits: "Réynél",
  description: "GPT By Réynél",
  commandCategory: "ai",
  usages: "[ask something]",
  cooldowns: 2,
};

const axios = require("axios");

module.exports.run = async function({ api, event, args }) {
  let { messageID, threadID, senderID } = event;
  let tid = threadID,
    mid = messageID;
  
  if (!args[0]) {
    return api.sendMessage("⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎𝗋 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗋𝖾𝖼𝗂𝖾𝗏𝖾𝖽. 𝗐𝖺𝗂𝗍𝗂𝗇𝗀 𝖿𝗈𝗋 𝗍𝗁𝖾 𝖼𝗅𝖺𝗋𝗄-𝗌𝖾𝗋𝗏𝖾𝗋 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾 𝖺𝗇𝖽 𝖽𝗈 𝗂𝗍 𝖺𝗀𝖺𝗂𝗇.", tid, mid);
  }
  
  try {
    const userMessage = args.join(" ");
    const apiUrl = 'https://blackbox.chatbotmesss.repl.co/ask';
    
    const response = await axios.get(apiUrl, { params: { q: userMessage } });
    const data = response.data;

    if (data.message !== "") {
      api.sendMessage(data.message, tid, mid);
    } else {
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗎𝗇𝖺𝖻𝗅𝖾 𝗍𝗈 𝗀𝖾𝗍 𝖺 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝖼𝗅𝖺𝗋𝗄-𝗌𝖾𝗋𝗏𝖾𝗋", tid, mid);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝖽𝖺𝗍𝖺.", tid, mid);
  }
};