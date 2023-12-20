const axios = require('axios');

module.exports.config = {
  name: "plagiarism",
  version: "1.0.0",
  credits: "Réynél",
  description: "Check for plagiarism powered by Winston AI.",
  commandCategory: "ai",
  usage: "[content]",
  cooldowns: 5,
  requiredArgs: 1,
};

module.exports.run = async ({ api, event, args }) => {
  const text = args.join(' ');

  if (!text) {
    api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖼𝗈𝗇𝗍𝖾𝗇𝗍 𝗍𝗈 𝖺𝗇𝖺𝗅𝗒𝗓𝖾 𝖿𝗈𝗋 𝗉𝗅𝖺𝗀𝗂𝖺𝗋𝗂𝗌𝗆.", event.threadID, event.messageID);
    return;
  }

  try {
    const response = await axios.post('http://plagiarism-detector.august-quinn-api.repl.co/result', { text });
    const result = response.data;

    let message = `👁‍🗨 | 𝗣𝗟𝗔𝗚𝗜𝗔𝗥𝗜𝗦𝗠 𝗦𝗖𝗢𝗥𝗘: ${result.plagia_score}\n\n`;

    if (result.items && result.items.length > 0) {
      result.items.forEach((item, index) => {
        message += `✅ 𝗖𝗔𝗡𝗗𝗜𝗗𝗔𝗧𝗘 ${index + 1}:\n\n🔗 | 𝗨𝗥𝗟: ${item.candidates[0].url}\n💯 | 𝗣𝗟𝗔𝗚𝗜𝗔𝗥𝗜𝗦𝗠 𝗦𝗖𝗢𝗥𝗘: ${item.candidates[0].plagia_score}\n🗣️ | 𝗣𝗥𝗘𝗗𝗜𝗖𝗧𝗜𝗢𝗡: ${item.candidates[0].prediction}\n\n`;
      });

      api.sendMessage(message, event.threadID, event.messageID);
    } else {
      api.sendMessage("✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗇𝗈 𝗉𝗅𝖺𝗀𝗂𝖺𝗋𝗂𝗌𝗆 𝖼𝖺𝗇𝖽𝗂𝖽𝖺𝗍𝖾𝗌 𝖿𝗈𝗎𝗇𝖽.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖼𝗁𝖾𝖼𝗄𝗂𝗇𝗀 𝖿𝗈𝗋 𝗉𝗅𝖺𝗀𝗂𝖺𝗋𝗂𝗌𝗆.", event.threadID, event.messageID);
  }
};