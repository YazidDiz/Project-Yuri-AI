const axios = require('axios');
 
module.exports.config = {
  name: "aidetect",
  version: "1.0.0",
  credits: "Réynél",
  description: "Detect AI-generated content powered by Originality AI.",
  commandCategory: "ai",
  usage: "[content]",
  cooldowns: 5,
  requiredArgs: 1,
};
 
module.exports.run = async ({ api, event, args }) => {
  const text = args.join(' ');
 
  if (!text) {
    api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖼𝗈𝗇𝗍𝖾𝗇𝗍 𝖿𝗈𝗋 𝖠𝖨 𝖽𝖾𝗍𝖾𝖼𝗍𝗂𝗈𝗇.", event.threadID, event.messageID);
    return;
  }
 
  try {
    const response = await axios.post('http://ai-content-detector.august-quinn-api.repl.co/result', { text });
    const result = response.data;
 
    let message = `👁‍🗨 | 𝗔𝗜 𝗗𝗘𝗧𝗘𝗖𝗧𝗜𝗢𝗡 𝗦𝗖𝗢𝗥𝗘: ${result.originalityai.ai_score}\n\n`;
 
    if (result.originalityai.items && result.originalityai.items.length > 0) {
      result.originalityai.items.forEach((item) => {
        message += `✅ | 𝗖𝗔𝗡𝗗𝗜𝗗𝗔𝗧𝗘:\n\n💬 | 𝗧𝗘𝗫𝗧: ${item.text}\n\n🗣️ | 𝗣𝗥𝗘𝗗𝗜𝗖𝗧𝗜𝗢𝗡: ${item.prediction}\n💯 | 𝗔𝗜 𝗦𝗖𝗢𝗥𝗘: ${item.ai_score}\n\n`;
      });
 
      api.sendMessage(message, event.threadID, event.messageID);
    } else {
      api.sendMessage("✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗇𝗈 𝖠𝖨-𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝖾𝖽 𝖼𝗈𝗇𝗍𝖾𝗇𝗍 𝖽𝖾𝗍𝖾𝖼𝗍𝖾𝖽.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖽𝖾𝗍𝖾𝖼𝗍𝗂𝗇𝗀 𝖠𝖨-𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝖾𝖽 𝖼𝗈𝗇𝗍𝖾𝗇𝗍.", event.threadID, event.messageID);
  }
};
 