module.exports.config = {
 name: "siesta",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "Réynél",
 description: "Random photo Siesta rhe detective is already dead",
 commandCategory: "anime",
 usages: "[siesta]",
 cooldowns: 3
};

module.exports.run = async ({ api, event }) => {
 const axios = require('axios');
 const request = require('request');
 const fs = require("fs");
 axios.get('https://siesta-api.bhhoang.repl.co').then(res => {
 let ext = res.data.success.substring(res.data.success.lastIndexOf(".") + 1);
 let callback = function () {
     api.sendMessage({body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 𝗋𝖺𝗇𝖽𝗈𝗆 𝗉𝗂𝖼𝗍𝗎𝗋𝖾 𝗈𝖿 𝗌𝗂𝖾𝗌𝗍𝖺:",
      attachment: fs.createReadStream(__dirname + `/cache/siesta.${ext}`)
     }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/siesta.${ext}`), event.messageID);
    };
    request(res.data.success).pipe(fs.createWriteStream(__dirname + `/cache/siesta.${ext}`)).on("close", callback);
   })
}