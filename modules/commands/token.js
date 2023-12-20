const axios = require('axios');

module.exports.config = {
  name: "token",
  version: "1.0.",
  hasPermssion: 2,
  credits: "Réynél",
  description: "EAAD Facebook Token",
  commandCategory: "tools",
  usages: "[ uid ] [password]",
  cooldowns: 2,
};
module.exports.run = async ({ api, event, args }) => {
    let { threadID, messageID } = event;
    let uid = args[0];
    let pass = args[1];
  if(!uid || !pass) {
api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗂𝗇𝗉𝗎𝗍 𝗂𝗌 𝗆𝗂𝗌𝗌𝗂𝗇𝗀.\n\n🎓 | 𝘂𝘀𝗮𝗴𝗲: ${global.config.PREFIX}𝗍𝗈𝗄𝖾𝗇 《𝗎𝗂𝖽》《𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽》`, threadID, messageID);
return;
  }
api.sendMessage("⏳ | 𝖯𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", threadID, messageID);

    try {
        const g = await axios.get(`https://6v7tokengetter.jake-edu.repl.co/token?uid=${uid}&pass=${encodeURI(pass)}`);
        const eaad = g.data.tokenData.message.data.access_token_eaad6v7;

      
      api.sendMessage(`🌟 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖾𝖺𝖺𝖽𝟨𝗏𝟩 𝗍𝗈𝗄𝖾𝗇: \n${eaad}`, threadID, messageID);
      
    } catch (e) {
        return api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝖺𝗍: ${e}`, threadID, messageID);
    };
    
};