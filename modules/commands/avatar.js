module.exports.config = {
    name: "avatar",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Réynél",
    description: "",
    commandCategory: "avatar",
    usages: "{p}{n} <character code or character name> | <background letters> | <signature> | <English color name or background color code (hex color)>\n{p}{n} ",
    cooldowns: 0
  };
  
  module.exports.run = async function({ api, event, args, download }) {

    const fs = require("fs-extra");
    const axios = require("axios");
    if (!args[0]) {api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝗌𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀 𝗈𝗋 𝗎𝗌𝖾 《${global.config.PREFIX}𝗁𝖾𝗅𝗉 𝖺𝗏𝖺𝗍𝖺𝗋》 𝖿𝗈𝗋 𝗆𝗈𝗋𝖾 𝗂𝗇𝖿𝗈`,event.threadID, event.messageID);}
    else {
		  api.sendMessage(`⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗂𝗇𝗂𝗍𝗂𝖺𝗅𝗂𝗓𝗂𝗇𝗀 𝗍𝗁𝖾 𝗂𝗆𝖺𝗀𝖾, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...`,event.threadID, event.messageID)
		  const content = args.join(" ").split("|").map(item => item = item.trim());
		  let idNhanVat, tenNhanvat;
		  const chu_Nen = content[1];
      const chu_Ky  = content[2];
      const colorBg = content[3];
      try {
  		  const dataChracter = (await axios.get("https://goatbot.tk/taoanhdep/listavataranime?apikey=ntkhang")).data.data;
        if (!isNaN(content[0])) {
          idNhanVat = parseInt(content[0]);
          const totalCharacter = dataChracter.length - 1;
          if (idNhanVat > totalCharacter) return api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖼𝗎𝗋𝗋𝖾𝗇𝗍𝗅𝗒 𝗈𝗇𝗅𝗒 ${totalCharacter} 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋 𝗈𝗇 𝗍𝗁𝖾 𝗌𝗒𝗌𝗍𝖾𝗆, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝖺 𝗌𝗆𝖺𝗅𝗅𝖾𝗋 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋 𝖨𝖣`, event.threadID, event.messageID);
          tenNhanvat = dataChracter[idNhanVat].name;
        }
        else {
          findChracter = dataChracter.find(item => item.name.toLowerCase() == content[0].toLowerCase());
          if (findChracter) {
            idNhanVat = findChracter.stt;
            tenNhanvat = content[0];
          }
          else return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋 𝗇𝖺𝗆𝖾𝖽 " + content[0] + " 𝗂𝗌 𝗇𝗈𝗍 𝖿𝗈𝗎𝗇𝖽 𝗂𝗇 𝗍𝗁𝖾 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋 𝗅𝗂𝗌𝗍", event.threadID, event.messageID);
        }
      }
      catch(error) {
        const err = error.response.data;
        return api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗀𝖾𝗍𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋 𝖽𝖺𝗍𝖺:\n${err.name}: ${err.message}`, event.threadID, event.messageID);
      }
      
      const endpoint = `https://goatbot.tk/taoanhdep/avataranime`;
      const params = {
        id: idNhanVat,
        chu_Nen,
        chu_Ky,
        apikey: "ntkhangGoatBot"
      };
      if (colorBg) params.colorBg = colorBg;
      
      try {
        const response = await axios.get(endpoint, {
          params,
          responseType: "stream"
        });
        api.sendMessage({
          body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎𝗋 𝗁𝖾𝗋𝖾 𝗂𝗌 𝗒𝗈𝗎𝗋 𝖺𝗏𝖺𝗍𝖺𝗋:\n\n𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿: ${tenNhanvat}\n𝗖𝗼𝗱𝗲: ${idNhanVat}\n𝗧𝗲𝘅𝘁 𝗕𝗮𝗰𝗸𝗴𝗿𝗼𝘂𝗻𝗱: ${chu_Nen}\n𝗦𝗶𝗴𝗻𝗮𝘁𝘂𝗿𝗲: ${chu_Ky}\n𝗖𝗼𝗹𝗼𝗿: ${colorBg || "default"}`, 
          attachment: response.data
     },event.threadID, event.messageID);
  		}
  		catch(error) {
  		  error.response.data.on("data", function(e) {
          const err = JSON.parse(e);
          api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋`,event.threadID, event.messageID);
        });
		  }
	  }
  }


