const axios = require('axios');

module.exports.config = {
  name: "buddy",
  version: "2.1.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "An AI Chat Buddy, your ultimate companion.",
  commandCategory: "ai",
  usages: "[prompt]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, senderID } = event;
    const prompt = args.join(" ");

    if (!prompt) {
        api.sendMessage("👋 | 𝖪𝖺𝗆𝗎𝗌𝗍𝖺, 𝖺𝗇𝗈 𝖺𝗇𝗀 𝗆𝖺𝗂𝗍𝗎𝗍𝗎𝗅𝗈𝗇𝗀 𝗄𝗈 𝗌𝖺'𝗒𝗈 𝗇𝗀𝖺𝗒𝗈𝗇?", threadID, event.messageID);
        return;
    }

    try {
        const userName = await getUserName(api, senderID);
        const buddyAPI = "https://ai-buddy.august-quinn-api.repl.co/prompt";
        const response = await axios.post(buddyAPI, { prompt, userName });

        if (response.data && response.data.openai && response.data.openai.generated_text) {
            const generatedText = response.data.openai.generated_text;
            api.sendMessage(generatedText, threadID, event.messageID);
        } else {
            api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖾𝗋𝗋𝗈𝗋 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝗉𝗋𝗈𝗆𝗉𝗍. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", threadID, event.messageID);
        }
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖾𝗋𝗋𝗈𝗋 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝗉𝗋𝗈𝗆𝗉𝗍. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", threadID, event.messageID);
    }
};

async function getUserName(api, userID) {
    try {
        const name = await api.getUserInfo(userID);
        return name[userID]?.firstName || "Friend";
    } catch (error) {
        console.error("Error getting user name:", error);
        return "Friend";
    }
      }