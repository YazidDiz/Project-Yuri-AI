const axios = require('axios');

module.exports.config = {
  name: "messagebin",
  version: "1.0.",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Paste your code",
  commandCategory: "utilities",
  usages: "[your code]",
  cooldowns: 2,
};
module.exports.run = async ({ api, event, args }) => {
    let { threadID, messageID } = event;
    let code= args[0];
  if(!code) {
api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗂𝗇𝗉𝗎𝗍 𝗂𝗌 𝗆𝗂𝗌𝗌𝗂𝗇𝗀.\n𝘂𝘀𝗮𝗴𝗲: ${global.config.PREFIX}𝗉𝖺𝗌𝗍𝖾𝖻𝗂𝗇 [𝗒𝗈𝗎𝗋 𝖼𝗈𝖽𝖾]`, threadID, messageID);
return;
  }
api.sendMessage("⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍 𝗒𝗈𝗎𝗋 𝗅𝗂𝗇𝗄.", threadID, messageID);

    try {
        const b = await axios.get(`https://sensui-useless-apis.codersensui.repl.co/api/tools/pastebin?text=${encodeURI(code)}`);
        const a = b.data.url;

      api.sendMessage(`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗉𝖺𝗌𝗍𝖾𝖻𝗂𝗇 𝗅𝗂𝗇𝗄:\n━━━━━━━━━━━━━━━━━━━\n🔗 | ${a}\n━━━━━━━━━━━━━━━━━━━`, threadID, messageID);

    } catch (b) {
        return api.sendMessage(`${b}`, threadID, messageID);
    };

};