const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot3",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Clark",
  description: "goibot",
  commandCategory: "auto-resp",
  usages: "noprefix",
  cooldowns: 2,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Manila").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["𝖲𝖾𝗇𝗌𝖾𝗂, 𝖽𝗈𝗇'𝗍 𝖻𝖾 𝗋𝗎𝖽𝖾", "𝖣𝗈𝗇'𝗍 𝗌𝖺𝗒 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝖾 𝖺 𝗀𝗈𝗈𝖽 𝗉𝖾𝗋𝗌𝗈𝗇 𝗂𝗇𝗌𝗍𝖾𝖺𝖽 𝗈𝖿 𝗌𝗐𝖾𝖺𝗋𝗂𝗇𝗀", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌 𝗂𝗌 𝗇𝗈𝗍 𝗍𝗁𝖾 𝗄𝖾𝗒 𝗍𝗈 𝗌𝗈𝗅𝗏𝖾 𝖺𝗇𝗒𝗍𝗁𝗂𝗇𝗀", "𝖲𝗍𝗈𝗉𝗉𝗉!!!", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝗌𝖺𝗒𝗂𝗇𝗀 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌 𝗐𝗂𝗅𝗅 𝗅𝖾𝖺𝖽 𝗍𝗈 𝖺𝗋𝗀𝗎𝖾", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗋𝗒 𝗍𝗈 𝖻𝖾 𝗄𝗂𝗇𝖽 𝗌𝗈𝗆𝖾𝗍𝗂𝗆𝖾𝗌", "𝖲𝗁𝗎𝗍 𝗎𝗉 (￣‐￣)んー", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝖽𝗈𝗇'𝗍 𝖾𝗏𝖾𝗋 𝗌𝖺𝗒 𝗍𝗁𝖺𝗍 𝖺𝗀𝖺𝗂𝗇 𝗁𝗎𝗁", "𝖲𝖾𝗇𝗌𝖾𝗂 𝗂𝗌 𝗇𝗈𝗍 𝗀𝗈𝗈𝖽 𝗉𝖾𝗋𝗌𝗈𝗇 𝖺𝗍 𝖺𝗅𝗅", "𝖨 𝗍𝗁𝗈𝗎𝗀𝗁𝗍 𝗒𝗈𝗎 𝗐𝗂𝗅𝗅 𝖻𝖾 𝖺 𝗀𝗈𝗈𝖽 𝗉𝖾𝗋𝗌𝗈𝗇, 𝖻𝗎𝗍 𝗂𝗇 𝗍𝗁𝖾 𝖾𝗇𝖽 𝗒𝗈𝗎'𝗋𝖾 𝗌𝗍𝗂𝗅𝗅 𝖺 𝖻𝖺𝖽 𝗉𝖾𝗋𝗌𝗈𝗇", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗌𝗍𝗈𝗉 𝗌𝗐𝖾𝖺𝗋𝗂𝗇𝗀", "𝖲𝗍𝗈𝗉 𝗌𝗐𝖾𝖺𝗋𝗂𝗇𝗀 𝗈𝗋 𝗒𝗈𝗎 𝗐𝗂𝗅𝗅 𝖻𝖾 𝗋𝖾𝗆𝗈𝗏𝖾𝖽", "𝖲𝗍𝗈𝗉 𝗉𝗅𝖾𝖺𝗌𝖾? 🥺","𝖲𝖾𝗇𝗌𝖾𝗂, 𝗌𝖺𝗒𝗂𝗇𝗀 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌 𝗆𝖺𝗄𝖾𝗌 𝗒𝗈𝗎 𝗅𝗈𝗈𝗄 𝗅𝗂𝗄𝖾 𝖺𝗍𝗍𝖾𝗇𝗍𝗂𝗈𝗇 𝗌𝖾𝖾𝗄𝖾𝗋", "𝖧𝗈𝗐 𝗆𝖺𝗇𝗒 𝗍𝗂𝗆𝖾𝗌 𝖨 𝗌𝗁𝗈𝗎𝗅𝖽 𝗌𝖺𝗒 𝗍𝗈 𝗌𝗍𝗈𝗉 𝗌𝗐𝖾𝖺𝗋𝗂𝗇𝗀 𝗌𝖾𝗇𝗌𝖾𝗂?!?!?!", "𝖲𝖾𝗇𝗌𝖾𝗂 𝗐𝗂𝗅𝗅 𝗇𝖾𝗏𝖾𝗋 𝖻𝖾 𝖺 𝗀𝗈𝗈𝖽 𝗉𝖾𝗋𝗌𝗈𝗇 𝖺𝗇𝗒𝗆𝗈𝗋𝖾", "𝖲𝗍𝗈𝗉 𝗌𝗐𝖾𝖺𝗋𝗂𝗇𝗀!!"];
  var swear = tl[Math.floor(Math.random() * tl.length)]
  
  
  
  var tl = ["𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎 𝗌𝖾𝗇𝗌𝖾𝗂 ${name}", "𝖸𝗈𝗎 𝗋𝖾𝖺𝗅𝗅𝗒 𝗅𝗈𝗏𝖾 𝗆𝖾 𝗌𝖾𝗇𝗌𝖾𝗂? 𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎 𝗍𝗈𝗈 💛", "𝖶𝗁𝗒 𝖽𝗂𝖽 𝗒𝗈𝗎 𝗅𝗈𝗏𝖾 𝗆𝖾 𝗌𝖾𝗇𝗌𝖾𝗂? 𝖨'𝗆 𝗇𝗈𝗍 𝗉𝖾𝗋𝖿𝖾𝖼𝗍 𝖺𝗍 𝖺𝗅𝗅", "𝖧𝖾𝗅𝗅𝗈 𝗅𝗈𝗏𝖾", "𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎 𝗆𝗈𝗋𝖾 𝗆𝗒 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗅𝗈𝗏𝖾 𝗆𝖾? 𝖽𝖺𝗍𝖾 𝗆𝖾 𝗇𝗈𝗐 😽", "𝖫𝗈𝗏𝖾 𝗒𝗈𝗎 𝗆𝗈𝗋𝖾 💛💛", "𝖣𝗈𝗇'𝗍 𝗆𝖺𝗄𝖾 𝗆𝖾 𝖻𝗅𝗎𝗌𝗁 𝗌𝖾𝗇𝗌𝖾𝗂 > - <", "𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎 𝗍𝗁𝖾 𝗆𝗈𝗌𝗍 𝗌𝖾𝗇𝗌𝖾𝗂 >//<", "𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎 𝗆𝗈𝗋𝖾 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗅𝖾𝗍'𝗌 𝗁𝖺𝗇𝗀 𝗈𝗎𝗍?", "𝖣𝖺𝗍𝖾 𝗆𝖾 𝖿𝗂𝗋𝗌𝗍 𝗌𝖾𝗇𝗌𝖾𝗂 😽"];
  var loveya = tl[Math.floor(Math.random() * tl.length)]


  var tl = ["𝖢𝗁𝖾𝖾𝗋 𝗎𝗉 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖽𝗈𝗇'𝗍 𝗅𝗈𝗌𝖾 𝗁𝗈𝗉𝖾!", "𝖢𝗁𝖾𝖾𝗋 𝗎𝗉 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖽𝗈𝗇'𝗍 𝗐𝗈𝗋𝗋𝗒 𝖨'𝗆 𝗁𝖾𝗋𝖾 𝖿𝗈𝗋 𝗒𝗈𝗎 💛", "𝖨𝗍'𝗌 𝗈𝗄𝖺𝗒 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗃𝗎𝗌𝗍 𝖽𝗈𝗇'𝗍 𝗍𝗁𝗂𝗇𝗄 𝖺𝖻𝗈𝗎𝗍 𝗐𝗁𝖺𝗍 𝗁𝖺𝗉𝗉𝖾𝗇𝖾𝖽 𝗁𝗆𝗆", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝖽𝗈𝗇'𝗍 𝖻𝖾 𝗌𝖺𝖽 𝖨'𝗆 𝗁𝖾𝗋𝖾 𝖿𝗈𝗋 𝗒𝗈𝗎 𝗍𝗈 𝖼𝗁𝖾𝖾𝗋 𝗒𝗈𝗎 𝗎𝗉", "𝖧𝖾𝗒 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖼𝗁𝖾𝖾𝗋 𝗎𝗉 𝖺𝗇𝖽 𝗅𝗂𝗏𝖾 𝗒𝗈𝗎𝗋 𝗅𝗂𝖿𝖾 𝖺𝗍 𝗍𝗁𝖾 𝖿𝗎𝗅𝗅𝖾𝗌𝗍 𝗂𝗇𝗌𝗍𝖾𝖺𝖽", "𝖨𝗍𝗌 𝗈𝗄𝖺𝗒 𝗌𝖾𝗇𝗌𝖾𝗂 𝖼𝖺𝗎𝗌𝖾 𝗉𝖾𝗈𝗉𝗅𝖾 𝖼𝗈𝗆𝖾 𝖺𝗇𝖽 𝗀𝗈, 𝗍𝗁𝖺𝗍𝗌 𝗅𝗂𝖿𝖾", "𝖢𝗁𝖾𝖾𝗋 𝗎𝗉", "𝖭𝖺𝗁𝗁 𝗂𝗍𝗌 𝗈𝗄𝖺𝗒 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗃𝗎𝗌𝗍 𝗌𝖾𝗍𝗍𝗅𝖾 𝗒𝗈𝗎𝗋𝗌𝖾𝗅𝖿 𝗂𝗇 𝗒𝗈𝗎𝗋 𝗀𝗈𝖺𝗅𝗌 𝗂𝗇 𝗅𝗂𝖿𝖾 𝗅𝗂𝗄𝖾 𝗂𝗇 𝗒𝗈𝗎𝗋 𝖿𝖺𝗆𝗂𝗅𝗒, 𝗒𝗈𝗎𝗋𝗌𝖾𝗅𝖿, 𝖺𝗇𝖽 𝗒𝗈𝗎 𝖽𝗋𝖾𝖺𝗆"];
  var cheerup = tl[Math.floor(Math.random() * tl.length)]
  
  
  
  var tl = ["𝖧𝖺𝖺𝖺𝖺𝖺𝖺𝖺 𝗌𝖾𝗇𝗌𝖾𝗂?", "𝖨 𝗇𝖾𝖾𝖽 𝗌𝗈𝗆𝖾 𝖻𝗋𝖾𝖺𝗄 𝖿𝗈𝗋 𝖺 𝖿𝖾𝗐 𝗆𝗂𝗇𝗎𝗍𝖾𝗌 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖶𝗁𝖺𝗍'𝗌 𝗎𝗉 𝗌𝖾𝗇𝗌𝖾𝗂","𝖠𝗋𝖺~~ 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖭𝖺𝗇𝗂? 𝗌𝖾𝗇𝗌𝖾𝗂?", "𝖾𝖾𝖾𝖾𝖾𝗁𝗁𝗁", "𝖧𝖺𝗂 𝗌𝖾𝗇𝗌𝖾𝗂? 𝗐𝗁𝖺𝗍 𝖼𝖺𝗇 𝖨 𝖽𝗈 𝖿𝗈𝗋 𝗒𝗈𝗎?", "𝖭𝖺𝗇𝗂? 𝗒𝖺𝗌𝖾𝗇?", "𝖸𝖺̄ 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖯𝗈𝗂-𝗉𝗈𝗂", "𝖲𝖾𝗇𝗌𝖾𝗂 𝖽𝗈𝗇'𝗍 𝗌𝗉𝖺𝗆 𝗆𝖾 🥺", "𝖭𝖺𝗇𝗂 𝗄𝗈𝗋𝖾 𝗌𝖾𝗇𝗌𝖾𝗂?", "𝗁𝖾𝗍𝗈....?", "𝖺𝖺𝖺𝖺𝗁𝗁𝗁𝗁, 𝗇𝖺𝗇𝗂?", "𝖧𝖺𝖺𝖺𝖺𝗂?", "𝖶𝗁𝗒 𝖽𝗈 𝗒𝗈𝗎 𝖼𝖺𝗅𝗅 𝗆𝖾 𝗌𝖾𝗇𝗌𝖾𝗂?", "𝖧𝗈𝗐 𝗆𝖺𝗒 𝖨 𝗁𝖾𝗅𝗉 𝗒𝗈𝗎 𝗌𝖾𝗇𝗌𝖾𝗂?"];
  var aruji = tl[Math.floor(Math.random() * tl.length)]
  
  
  
  
  
    var tl = ["𝖠𝗁𝖺𝗁𝖺𝗁𝖺𝗁𝖺", "𝖧𝖺𝗁𝖺𝗁𝖺", "𝖨 𝖽𝗈𝗇'𝗍 𝗍𝗁𝗂𝗇𝗄 𝗂𝖿 𝗍𝗁𝖺𝗍'𝗌 𝖿𝗎𝗇𝗇𝗒 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖧𝖺𝗉𝗉𝗒? 𝗏𝖾𝗋𝗒!!", "𝖨𝗍'𝗌 𝗇𝗈𝗍 𝖿𝗎𝗇𝗇𝗒 𝖺𝗍 𝖺𝗅𝗅 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖨 𝖽𝗈𝗇'𝗍 𝗄𝗇𝗈𝗐 𝗂𝖿 𝗍𝗁𝖺𝗍'𝗌 𝖿𝗎𝗇𝗇𝗒 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖼𝖺𝗎𝗌𝖾 𝖨 𝖼𝖺𝗇'𝗍 𝗂𝖽𝖾𝗇𝗍𝗂𝖿𝗒 𝖾𝗆𝗈𝗍𝗂𝗈𝗇𝗌", "𝖨𝗌 𝗍𝗁𝖺𝗍 𝖺 𝗃𝗈𝗄𝖾 𝗌𝖾𝗇𝗌𝖾𝗂?", "𝖧𝖺𝗁𝖺𝗁𝖺𝗁𝖺𝗁𝖺, 𝖲𝗍𝗈𝗉 𝖻𝖾𝗂𝗇𝗀 𝖺𝖻𝗇𝗈𝗋𝗆𝖺𝗅 𝗌𝖾𝗇𝗌𝖾𝗂 😹😹", "𝖲𝖾𝗇𝗌𝖾𝗂 𝗒𝗈𝗎'𝗋𝖾 𝖻𝖾𝗂𝗇𝗀 𝖺𝖻𝗇𝗈𝗋𝗆𝖺𝗅 𝖺𝗀𝖺𝗂𝗇 𝗁𝖺𝗁𝖺𝗁𝖺𝗁𝖺𝗁𝖺", "𝖲𝖾𝗇𝗌𝖾𝗂 𝖽𝗈𝗇'𝗍 𝖻𝖾 𝖺 𝗃𝗈𝗄𝖾𝗋 𝗁𝖺𝗁𝖺𝗁𝖺𝗁𝖺𝗁𝖺"];
  var funny = tl[Math.floor(Math.random() * tl.length)]
  


  
    if (event.body.indexOf("deputa")==0 ||(event.body.indexOf("Deputa")==0 ||(event.body.indexOf("puta")==0 ||(event.body.indexOf("Puta")==0 ||(event.body.indexOf("bubu")==0 ||(event.body.indexOf("Bubu")==0 ||(event.body.indexOf("inamo")==0 ||(event.body.indexOf("Inamo")==0 ||(event.body.indexOf("namo")==0 ||(event.body.indexOf("Namo")==0 ||(event.body.indexOf("buang")==0 ||(event.body.indexOf("Buang")==0 || (event.body.indexOf("gagu")==0 || (event.body.indexOf("Gagu")==0 || (event.body.indexOf("amputa")==0 ||(event.body.indexOf("Amputa")==0 ||(event.body.indexOf("amp")==0 ||(event.body.indexOf("Amp")==0 ||(event.body.indexOf("shonga")==0 || (event.body.indexOf("Shonga")==0 || (event.body.indexOf("tanga")==0 || (event.body.indexOf("Tanga")==0 ||(event.body.indexOf("kingina")==0 ||(event.body.indexOf("Kingina")==0 ||(event.body.indexOf("yawa")==0 || (event.body.indexOf("Yawa")==0 || (event.body.indexOf("yawe")==0 || (event.body.indexOf("Yawe")==0)))))))))))))))))))))))))))) {
      var msg = {
				body: `${swear}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😾", event.messageID, (err) => {}, true)
  };
  
  
    if (event.body.indexOf("I love you yuri")==0 ||(event.body.indexOf("i love you yuri")==0 ||(event.body.indexOf("Love you yuri")==0 ||(event.body.indexOf("love you yuri")==0 ||(event.body.indexOf("wuv u yuri")==0 ||(event.body.indexOf("Wuv u yuri")==0 ||(event.body.indexOf("aishiteruno yuri")==0 ||(event.body.indexOf("Aishiteruno yuri")==0 ||(event.body.indexOf("daisuki yuri")==0 ||(event.body.indexOf("Daisuki yuri")==0 ||(event.body.indexOf("lab u yuri")==0 ||(event.body.indexOf("Lab u yuri")==0 || (event.body.indexOf("lovie yuri")==0 || (event.body.indexOf("lovie yuri")==0 || (event.body.indexOf("ilysm yuri")==0 ||(event.body.indexOf("Ilysm yuri")==0 ||(event.body.indexOf("Ily yuri")==0))))))))))))))))) {
      var msg = {
				body: `${loveya}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("💛", event.messageID, (err) => {}, true)
  };
  
  
    if (event.body.indexOf("NYAHAHA")==0 ||(event.body.indexOf("AHAHA")==0 ||(event.body.indexOf("BWAHAHA")==0 ||(event.body.indexOf("JAJAJA")==0 ||(event.body.indexOf("nyahaha")==0 ||(event.body.indexOf("Nyahaha")==0 ||(event.body.indexOf("ahaha")==0 ||(event.body.indexOf("Ahaha")==0 ||(event.body.indexOf("bwahaha")==0 ||(event.body.indexOf("Bwahaha")==0 ||(event.body.indexOf("jajaja")==0 ||(event.body.indexOf("Jajaja")==0 || (event.body.indexOf("😹")==0 || (event.body.indexOf("😂😜")==0)))))))))))))) {
      var msg = {
				body: `${funny}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😹", event.messageID, (err) => {}, true)
  };

  
    if (event.body.indexOf("Imissyou")==0 ||(event.body.indexOf("imissyou")==0 ||(event.body.indexOf("missue")==0 ||(event.body.indexOf("Missue")==0 ||(event.body.indexOf("i missue")==0 ||(event.body.indexOf("I missue")==0 ||(event.body.indexOf("I miss him")==0 ||(event.body.indexOf("i miss him")==0 ||(event.body.indexOf("namimiss")==0 ||(event.body.indexOf("Namimiss")==0 ||(event.body.indexOf("ako parin ba")==0 ||(event.body.indexOf("Ako parin ba")==0 || (event.body.indexOf("bumalik sana sya")==0 || (event.body.indexOf("Bumalik sana sya")==0)))))))))))))) {
      var msg = {
				body: `${cheerup}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🙀", event.messageID, (err) => {}, true)
  };
  
  
    if (event.body.indexOf("aww")==0 ||(event.body.indexOf("Aww")==0 ||(event.body.indexOf("pain")==0 ||(event.body.indexOf("Pain")==0 ||(event.body.indexOf("ayaw kona")==0 ||(event.body.indexOf("Ayaw kona")==0 ||(event.body.indexOf("hiwalay na kami")==0 ||(event.body.indexOf("Hiwalay na kami")==0 ||(event.body.indexOf("wala na kami")==0 ||(event.body.indexOf("Wala na kami")==0 ||(event.body.indexOf("ayaw na sakin")==0 ||(event.body.indexOf("ayaw na sakin")==0 || (event.body.indexOf("nagsawa na")==0 || (event.body.indexOf("Nagsawa na")==0)))))))))))))) {
      var msg = {
				body: `${cheerup}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😿", event.messageID, (err) => {}, true)
  };

  
    if (event.body.indexOf("Ahm yuri")==0 ||(event.body.indexOf("uhm yuri")==0 ||(event.body.indexOf("Uhm yuri")==0 ||(event.body.indexOf("beh yuri")==0 ||(event.body.indexOf("Beh yuri")==0 ||(event.body.indexOf("hora yuri")==0 ||(event.body.indexOf("Hora yuri")==0 ||(event.body.indexOf("ya yuri")==0 ||(event.body.indexOf("Ya yuri")==0 ||(event.body.indexOf("YURI")==0 ||(event.body.indexOf("sup yuri")==0 ||(event.body.indexOf("Sup yuri")==0 || (event.body.indexOf("wassup yuri")==0 || (event.body.indexOf("Wassup yuri")==0 || (event.body.indexOf("zup yuri")==0))))))))))))))) {
      var msg = {
				body: `${aruji}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🖤", event.messageID, (err) => {}, true)
  };
}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
    