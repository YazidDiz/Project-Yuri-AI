const fs = require("fs");
module.exports.config = {
  name: "autoreactv3",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "no prefix needed the bot will automatically react to your messages",
  commandCategory: "noprefix",
  usages: "autoreact in your message",
  cooldowns: 0,
};
 
module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
 let haha = event.body.toLowerCase();
  if (this.config.credits != 'Réynél') {
        console.log('\x1b[33m[ WARN ]\x1b[37m » \u0043\u0072\u0065\u0064\u0069\u0074\u0073 \u0068\u0061\u0073 \u0062\u0065\u0065\u006e \u0063\u0068\u0061\u006e\u0067\u0065\u0064\u0021 \u0053\u0074\u006f\u0070 \u004e\u006f\u0077\u0021'+ global.config.BOTNAME + ' đổi credits modules "' + this.config.name + '"');
        return api.sendMessage('[ WARN ] Detected that the credits was changed!!!' , event.threadID, event.messageID);
      }
  if (haha.includes("lol") || haha.includes("lmao") || haha.includes("haha") || haha.includes("xd") || haha.includes("puta") || haha.includes("gagu") || haha.includes("tanga") || haha.includes("tanginamo") || haha.includes("hayup") || haha.includes("bobo") || haha.includes("iyot") || haha.includes("eut") || haha.includes("kantot") || haha.includes("gago")){
                 return api.setMessageReaction("😹", event.messageID, (err) => {}, true)
    api.markAsSeen(1, (err) => {});
  }
    if (haha.includes("aray") || haha.includes("hays") || haha.includes("sakit") || haha.includes("ouch") || haha.includes("hurt") || haha.includes("please") || haha.includes("😢") || haha.includes("😔") || haha.includes("🥺") || haha.includes("sad")){
      return  api.setMessageReaction("😿", event.messageID, (err) => {}, true);
}
  if (haha.includes("wow") || haha.includes("luh") || haha.includes("sheesh") || haha.includes("damn") || haha.includes("yes") || haha.includes("weh") || haha.includes("loh") || haha.includes("hala") || haha.includes("lah") || haha.includes("what") || haha.includes("omg")){
    return api.setMessageReaction("🙀", event.messageID, (err) => {}, true)
        }
  if (haha.includes("nigga") || haha.includes("nigg")){
    api.setMessageReaction("⚠️", event.messageID, (err) => {}, true)
    api.sendMessage("𝖲𝖾𝗇𝗌𝖾𝗂, 𝖽𝗈𝗇'𝗍 𝖻𝖾 𝖺 𝗋𝖺𝖼𝗂𝗌𝗍!!!", event.threadID,event.messageID);
  }
 /* if (haha.includes("Yuri") || haha.includes("yuri")){
    api.sendMessage("👋 | 𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝖺𝗅𝗐𝖺𝗒𝗌 𝗁𝖾𝗋𝖾", event.threadID, (e, info) => {
      setTimeout(() => {
        api.sendMessage({sticker: 687329774735135}, event.threadID);
      }, 100)
    }, event.messageID)
} */
  if (haha.includes("Réynél") || haha.includes("réynél")){
    api.sendMessage("𝖲𝖾𝗇𝗌𝖾𝗂, 𝗆𝖺𝗌𝗍𝖾𝗋 𝗋𝖾𝗒𝗇𝖾𝗅 𝗂𝗌 𝗄𝗂𝗇𝖽𝖺 𝖻𝗎𝗌𝗒, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍 𝗁𝗂𝗆 𝗉𝖺𝗍𝗂𝖾𝗇𝗍𝗅𝗒", event.threadID, event.messageID)
  }
  if (haha.includes("Clark") || haha.includes("clark")){
    api.sendMessage("𝖤𝗑𝖼𝗎𝗌𝖾 𝗆𝖾 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗐𝗁𝖺𝗍 𝖽𝗈 𝗒𝗈𝗎 𝗇𝖾𝖾𝖽 𝖿𝗋𝗈𝗆 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋?\n𝗎𝗌𝖾 𝖼𝖺𝗅𝗅𝖺𝖽 𝗂𝗇𝗌𝗍𝖾𝖺𝖽", event.threadID, event.messageID)
  }
if (haha.includes("Rey") || haha.includes("rey")){
    api.sendMessage("𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗐𝖺𝗂𝗍 𝗁𝗂𝗆...", event.threadID, event.messageID)
}
if (haha.includes("hoy") || haha.includes("Hoy")){
    api.sendMessage("𝖴𝗁𝗆? 𝗂𝗌 𝗂𝗍 𝗆𝖾 𝗌𝖾𝗇𝗌𝖾𝗂?", event.threadID, event.messageID)
}
  if (haha.includes("sino") || haha.includes("Sino")){
    api.sendMessage("𝖨 𝖽𝗈𝗇'𝗍 𝗄𝗇𝗈𝗐 𝖾𝗂𝗍𝗁𝖾𝗋 𝗌𝖾𝗇𝗌𝖾𝗂", event.threadID, event.messageID)
      }
if (haha.includes("Cute mo") || haha.includes("cute mo")){
    api.sendMessage("𝖸𝗈𝗎'𝗋𝖾 𝖾𝗏𝖾𝗇 𝖼𝗎𝗍𝖾𝗋 𝗌𝖾𝗇𝗌𝖾𝗂 🧡", event.threadID, event.messageID)
      }
if (haha.includes("everyone") || haha.includes("Everyone")){
    api.sendMessage("𝖧𝖺𝗂? 𝗐𝗁𝖺𝗍 𝖽𝗈 𝗒𝗈𝗎 𝗇𝖾𝖾𝖽 𝗌𝖾𝗇𝗌𝖾𝗂?", event.threadID, (e, info) => {
      setTimeout(() => {
        api.sendMessage({sticker: 687329774735135}, event.threadID);
      }, 100)
    }, event.messageID)
      }
}
        module.exports.run = function({ api, event, client, __GLOBAL }) {
                                                                                                                                                                                                 }