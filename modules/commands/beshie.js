const axios = require('axios')
module.exports.config = {
     name: "beshie",
     version: "1.0",
     hasPermssion: 0,
     credits: "Réynél Eśquível",  
     description: "add a flipping emoji in your message",
     commandCategory: "tools",
     cooldowns: 0
};
//Credit to Réynél Eśquível
module.exports.run = async function ({ api, event, args }) {
 let text = args.join(" ");
  try {
    const ge = await axios.get(`https://free-api.ainz-sama101.repl.co/others/beshy?text=${text}`);
    const ga = ge.data.result;
    api.sendMessage(`${ga}`, event.threadID, event.messageID);
  } catch(error) {
    console.error(error);
api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋", event.threadID, event.messageID)

    
  }
};