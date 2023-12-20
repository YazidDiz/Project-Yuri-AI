const axios = require("axios");

module.exports.config = {
  name: "gpt4",
  version: "1.0.0",
  hasPermission: 0, 
  credits: "Réynél", // Converted and modified to mirai by cyril //dont change credits or I spank your ass
  description: "ChatGPT-4",
  usages: "[ask]",
  commandCategory: "ai",
  cooldowns: 5,
};

module.exports.run = async function ({ api, args, event }) {
  try {
    const prompt = event.body.trim();
    const { threadID, messageID } = event;
    if (!args[0]) {
      api.sendMessage(
        "ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇 𝖿𝗈𝗋 𝖦𝖯𝖳-𝟦 𝗍𝗈 𝖺𝗇𝗌𝗐𝖾𝗋.\n\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n𝗀𝗉𝗍𝟦 𝗐𝗁𝖺𝗍 𝗂𝗌 𝗍𝗁𝖾 𝗌𝖾𝖼𝗈𝗇𝖽 𝗅𝖺𝗐 𝗈𝖿 𝗆𝗈𝗍𝗂𝗈𝗇?",
        threadID, 
        messageID 
      );
      return;
    }

    if (prompt) {
      await api.sendMessage("🔍 | 𝖦𝖯𝖳-𝟦 𝗂𝗌 𝖳𝗒𝗉𝗂𝗇𝗀 𝖸𝗈𝗎𝗋 𝖠𝗇𝗌𝗐𝖾𝗋! 𝖯𝗅𝖾𝖺𝗌𝖾 𝖶𝖺𝗂𝗍...", threadID);
api.sendTypingIndicator(event.threadID, true);
      const response = await axios.get(`https://chatgayfeyti.archashura.repl.co?gpt=${encodeURIComponent(prompt)}`);

      if (response.status === 200 && response.data && response.data.content) {
        const messageText = response.data.content.trim();
        await api.sendMessage(messageText, threadID);
        console.log('Sent answer as a reply to the user');
      } else {
        throw new Error('Invalid or missing response from API');
      }
    }
  } catch (error) {
    console.error(`Failed to get an answer: ${error.message}`);
    api.sendMessage(
      `❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖦𝖯𝖳 𝖠𝖯𝖨, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.`,
      threadID
    );
  }
};