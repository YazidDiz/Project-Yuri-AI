const request = require("request");
const fs = require("fs")
const axios = require("axios")
module.exports.config = {
  name: "slap",
  version: "3.0.0",
  hasPermssion: 0,
  credits: `Réynél`,
  description: "it's just imitated because the old slap doesn't work",
  commandCategory: "slap",
  usages: "[mention]",
  cooldowns: 5,
};

module.exports.run = async({ api, event, Threads, global }) => {
  var link = [ "https://i.postimg.cc/1tByLBHM/anime-slap.gif", ];
   var mention = Object.keys(event.mentions);
     let tag = event.mentions[mention].replace("@", "");
    if (!mention) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗆𝖾𝗇𝗍𝗂𝗈𝗇 𝟣 𝗉𝖾𝗋𝗌𝗈𝗇 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗌𝗅𝖺𝗉", threadID, messageID);
   var callback = () => api.sendMessage({body:`𝗦𝗟𝗔𝗣𝗣𝗘𝗗! ${tag}` + `\n\n*𝖦𝗈𝗆𝖾𝗇, 𝖨 𝗍𝗁𝗈𝗎𝗀𝗁𝗍 𝗍𝗁𝖾𝗋𝖾'𝗌 𝖺 𝗆𝗈𝗌𝗊𝗎𝗂𝗍𝗈 𝗂𝗇 𝗒𝗈𝗎𝗋 𝗎̀𝗀𝗅𝗒 𝗌𝗍𝗎̀𝗉𝗂̀𝖽 𝖿𝖺𝖼𝖾*`,mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],attachment: fs.createReadStream(__dirname + "/cache/slap.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/slap.gif"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/slap.gif")).on("close",() => callback());
}