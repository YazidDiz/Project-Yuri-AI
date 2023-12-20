const axios = require("axios");
module.exports.config = {
  name: "insult",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Generate insults using the Evil Insult Generator API",
  commandCategory: "entertainment",
  usages: "[insult]",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const apiEndpoint = "https://evilinsult.com/generate_insult.php?lang=en&type=json";

  try {
    const response = await axios.get(apiEndpoint);
    const insult = response.data.insult;

    api.sendMessage(`🙉 | 𝗥𝗔𝗡𝗗𝗢𝗠 𝗜𝗡𝗦𝗨𝗟𝗧 𝗥𝗘𝗦𝗨𝗟𝗧\n━━━━━━━━━━━━━━━━━━━\n𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝖺𝗇 𝗂𝗇𝗌𝗎𝗅𝗍 𝖿𝗈𝗋 𝗒𝗈𝗎: ${insult}`, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝖺𝗇 𝗂𝗇𝗌𝗎𝗅𝗍. 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", event.threadID, event.messageID);
    console.error("Evil Insult Generator API Error:", error.message);
  }
};
                                                 