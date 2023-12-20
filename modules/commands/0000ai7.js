module.exports.config = {
  name: "ai7",
  version: "2.0.8",
  hasPermssion: 0,
  credits: "Réynél",
  description: "AI",
  commandCategory: "ai",
  usages: "[question]",
  cooldowns: 5,
  dependencies: {
    "openai": ""
  }
};

const { Configuration, OpenAIApi } = require("openai");

module.exports.run = async function({ api, event, args }) {
  const text = args.join(" ");
    try {
      if (!text) {
        return api.sendMessage(
          `ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗊𝗎𝖾𝗋𝗒`,
          event.threadID,
          event.messageID,
        );
      }
      api.sendMessage('⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨’𝗆 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾...', event.threadID, event.messageID);

      const response = await axios.get(
        `https://api.easy0.repl.co/api/Llama/message?q=hi${text}`,
      );
      const respond = response.data.content;
      api.sendMessage(respond, event.threadID, event.messageID);
    } catch (error) {
      console.error("An error occurred:", error);
      api.sendMessage(
        "❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽",
        event.threadID,
        event.messageID,
      );
    }


}

  
};