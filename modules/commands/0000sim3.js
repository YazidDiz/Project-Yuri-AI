const axios = require("axios");

const simStatus = {
  enabled: true,
};

module.exports.config = {
  name: "sim3",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Clark",
  description: "Talk to sim",
  commandCategory: "chatbots",
  usages: "[ask]",
  cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
  if (args[0] === 'off' && event.senderID === '100080098527733') {
    simStatus.enabled = false;
    return api.sendMessage('✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗂𝗆 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗂𝗌 𝗇𝗈𝗐 𝖽𝗂𝗌𝖺𝖻𝗅𝖾𝖽', event.threadID, event.messageID);
  } else if (args[0] === 'on' && event.senderID === '100080098527733') {
    simStatus.enabled = true;
    return api.sendMessage('✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗂𝗆 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗂𝗌 𝗇𝗈𝗐 𝖾𝗇𝖺𝖻𝗅𝖾𝖽', event.threadID, event.messageID);
  }

  if (!simStatus.enabled) {
    return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗌𝗂𝗆 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗂𝗌 𝖼𝗎𝗋𝗋𝖾𝗇𝗍𝗅𝗒 𝗇𝗈𝗍 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋!!', event.threadID, event.messageID);
  }

  const content = encodeURIComponent(args.join(" "));
  if (!args[0]) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗒𝗉𝖾 𝖺 𝗆𝖾𝗌𝗌𝖺𝗀𝖾...", event.threadID, event.messageID);
  try {
    const res = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=ph&message=${content}&filter=true`);
    const respond = res.data.success;
    if (res.data.error) {
      api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝖺𝗍: ${res.data.error} 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝖽𝖺𝗍𝖺`, event.threadID, event.messageID);
    } else {
      api.sendMessage(respond, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝖽𝖺𝗍𝖺.", event.threadID, event.messageID);
  }
};