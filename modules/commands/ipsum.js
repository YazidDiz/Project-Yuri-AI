const axios = require("axios");
module.exports.config = {
  name: "ipsum",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Generate word by length.",
  commandCategory: "utilities",
  usages: "[Word no.]",
  cooldowns: 3,
};
module.exports.run = async function({ api, event, args }) {
var { threadID, messageID } = event;
try {
const req = args[0];
if (!args[0]) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗂𝗍 𝗋𝖾𝗊𝗎𝗂𝗋𝖾 𝖺 𝗅𝖾𝗇𝗀𝗍𝗁 𝗈𝖿 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽", threadID, messageID);
const res = await axios(`https://sensui-useless-apis.codersensui.repl.co/api/tools/lorem-ipsum?length=${encodeURI(req)}`);
api.sendMessage(`✅ | ${req} 𝗐𝗈𝗋𝖽 𝖨𝗉𝗌𝗎𝗆:\n\n    ${res.data.loremIpsum}`, threadID, messageID);
} catch (error) {
api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗂𝗉𝗌𝗎𝗆 𝖺𝗉𝗂.", threadID, messageID);
}
  }