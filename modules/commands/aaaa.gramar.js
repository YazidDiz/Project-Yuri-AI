module.exports.config = {
  name: "fixgrammar",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "is a command that helps improve grammar by suggesting corrections and providing recommendations.",
  commandCategory: "grammarfixer",
  usages: "[Senteces/Paragraph]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  const { execSync } = require('child_process');
  let { threadID, messageID } = event;
  const mahiro = args.join(" ");
  if (!mahiro) return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖺 𝗐𝗋𝗈𝗇𝗀 𝖿𝗈𝗋𝗆𝖺𝗍 𝗎𝗌𝖾 𝗈𝖿 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽\n𝖪𝗂𝗇𝖽𝗅𝗒 𝗎𝗌𝖾: ${global.config.PREFIX}${this.config.name} ${this.config.usages}`, threadID, messageID);

  try {
    const res = await axios.get(`https://grammarcorrection.mahirochan1.repl.co/grammar?text=${mahiro}`);
    const { message } = res.data;
    api.sendMessage(`📜 | 𝖢𝗈𝗋𝗋𝖾𝖼𝗍 𝗉𝖺𝗋𝖺𝗀𝗋𝖺𝗉𝗁:\n${message}`, threadID, messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗆𝖺𝗄𝗂𝗇𝗀 𝗍𝗁𝖾 𝖺𝗉𝗂 𝗋𝖾𝗊𝗎𝖾𝗌𝗍.", threadID, messageID);
  }
};
