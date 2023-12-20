module.exports.config = {
  name: "gifanime",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "random gif anime",
  commandCategory: "anime",
  usages: "[gifanime]",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://saikiapi-production.up.railway.app/x/anime?apikey=saiki827').then(res => {
  let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
 // let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `🌸 𝗡𝘂𝗺𝗯𝗲𝗿 𝗼𝗳 𝗽𝗵𝗼𝘁𝗼𝘀 𝗮𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲: 𝟥𝟢 𝖯𝗁𝗈𝗍𝗈𝗌`,
            attachment: fs.createReadStream(__dirname + `/cache/violet.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/violet.${ext}`), event.messageID);
    api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/violet.${ext}`)).on("close", callback);
      })
    .catch(err => {
                     api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝗉𝗁𝗈𝗍𝗈, ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ!", event.threadID, event.messageID);
    api.setMessageReaction("❎", event.messageID, (err) => {}, true);
                  })     
}