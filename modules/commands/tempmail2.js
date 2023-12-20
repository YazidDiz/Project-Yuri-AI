const axios = require('axios');

module.exports.config = {
  name: "tempmail2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Generate a temporary email address using a provided name and fetch inbox messages using endpoints",
  commandCategory: "utilities",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  if (args.length === 2 && args[0] === "gen") {
    const localPart = args[1];
    
    try {
      const response = await axios.get(`https://official-anjelo-api.anjelopogialways.repl.co/tempmailv3gen?localPart=${localPart}`);
      api.sendMessage(response.data.result, event.threadID);
    } catch (error) {
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝗍𝖾𝗆𝗉𝗈𝗋𝖺𝗋𝗒 𝖾𝗆𝖺𝗂𝗅 𝖺𝖽𝖽𝗋𝖾𝗌𝗌.", event.threadID);
    }
  } else if (args.length === 2 && args[0] === "inbox") {
    const email = args[1];
    
    try {
      const response = await axios.get(`https://official-anjelo-api.anjelopogialways.repl.co/tempmailv3inbox?email=${email}`);
      api.sendMessage(response.data.result, event.senderID);
      api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖬𝖾𝗌𝗌𝖺𝗀𝖾 𝗌𝖾𝗇𝗍 𝗍𝗈 𝗒𝗈𝗎𝗋 𝗂𝗇𝖻𝗈𝗑. 𝖪𝗂𝗇𝖽𝗅𝗒 𝖼𝗁𝖾𝖼𝗄 𝗒𝗈𝗎𝗋 𝗌𝗉𝖺𝗆.", event.threadID);
    } catch (error) {
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗂𝗇𝖻𝗈𝗑 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌.", event.threadID);
    }
  } else {
    api.sendMessage("🎓 | 𝗨𝘀𝗮𝗴𝗲: 𝗍𝖾𝗆𝗉𝗆𝖺𝗂𝗅𝟤 𝗀𝖾𝗇 [𝗅𝗈𝖼𝖺𝗅 𝗉𝖺𝗋𝗍] 𝖿𝗈𝗋 𝗍𝖾𝗆𝗉𝗆𝖺𝗂𝗅 𝖺𝗇𝖽 𝗍𝖾𝗆𝗉𝗆𝖺𝗂𝗅𝟤 𝗂𝗇𝖻𝗈𝗑 [𝖾𝗆𝖺𝗂𝗅 𝗁𝖾𝗋𝖾]", event.threadID);
  }
};
