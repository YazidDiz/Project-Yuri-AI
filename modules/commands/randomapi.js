const axios = require('axios');

module.exports.config = {
  name: "randomapi",
  version: "1.1.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Fetch a random entry from the Public APIs database.",
  commandCategory: "utilities",
  usages: "[RandomAPI]",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  try {
    
    const apiUrl = "https://api.publicapis.org/random";

    const response = await axios.get(apiUrl);

    const randomEntry = response.data.entries[0];

    const message = `🔍 | 𝗥𝗔𝗡𝗗𝗢𝗠 𝗣𝗨𝗕𝗟𝗜𝗖 𝗔𝗣𝗜 𝗘𝗡𝗧𝗥𝗬:\n━━━━━━━━━━━━━━━━━━━\n▣ 𝗧𝗜𝗧𝗟𝗘: ${randomEntry.API}\n▣ 𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: ${randomEntry.Description}\n▣ 𝗨𝗥𝗟: ${randomEntry.Link}\n\n✩⢁✧❖𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜❖✧⡈✩`;

    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error fetching random Public API entry:", error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖾𝗋𝗋𝗈𝗋 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗋𝖺𝗇𝖽𝗈𝗆 𝖯𝗎𝖻𝗅𝗂𝖼 𝖠𝖯𝖨 𝖾𝗇𝗍𝗋𝗒. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", event.threadID, event.messageID);
  }
};