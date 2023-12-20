const axios = require("axios");

module.exports.config = {
  name: "bored",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Get random activity suggestions",
  commandCategory: "entertainment",
  usages: "[bored]",
  cooldowns: 5
};

const apiEndpoint = "https://www.boredapi.com/api/activity";

module.exports.run = async function({ api, event }) {
  try {
    const response = await axios.get(apiEndpoint);
    const activity = response.data.activity;

    api.sendMessage(`💭 | 𝖥𝖾𝖾𝗅𝗂𝗇𝗀 𝖻𝗈𝗋𝖾𝖽 𝗌𝖾𝗇𝗌𝖾𝗂?\n\n𝖧𝗈𝗐 𝖺𝖻𝗈𝗎𝗍:\n\n${activity}.`, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖺𝖼𝗍𝗂𝗏𝗂𝗍𝗒 𝗌𝗎𝗀𝗀𝖾𝗌𝗍𝗂𝗈𝗇𝗌. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", event.threadID, event.messageID);
    console.error("Bored API Error:", error.message);
  }
                                     }