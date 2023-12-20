const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot2",
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

  var tl = ["𝖲𝖾𝗇𝗌𝖾𝗂 𝗌𝗍𝗈𝗉 𝗌𝗐𝖾𝖺𝗋𝗂𝗇𝗀", "𝖣𝗈𝗇'𝗍 𝗌𝖺𝗒 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌 𝗌𝖾𝗇𝗌𝖾𝗂 𝗉𝗅𝖾𝖺𝗌𝖾?", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝗌𝗐𝖾𝖺𝗋𝗂𝗇𝗀 𝗂𝗌 𝗇𝗈𝗍 𝖺𝗅𝗅𝗈𝗐𝖾𝖽 𝗁𝖾𝗋𝖾", "𝖲𝖾𝗇𝗌𝖾𝗂 𝗃𝗎𝗌𝗍 𝗌𝖺𝗒 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌 𝗈𝗇𝗅𝗒 𝗂𝗇 𝗒𝗈𝗎𝗋𝗌𝖾𝗅𝖿", "𝖲𝗁𝗎𝗍 𝗍𝗁𝖾 𝗎𝗉, 𝖽𝗈𝗇’𝗍 𝗌𝖺𝗒 𝖻𝖺𝖽 𝗐𝗈𝗋𝖽𝗌!!", "𝖲𝖾𝗇𝗌𝖾𝗂~~ 𝗌𝖺𝗒𝗂𝗇𝗀 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌 𝗂𝗌 𝗉𝗋𝗈𝗁𝗂𝖻𝗂𝗍𝖾𝖽", "𝖲𝖾𝗇𝗌𝖾𝗂 𝖽𝗈𝗇'𝗍 𝗌𝖺𝗒 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌, 𝗀𝗈𝖽 𝖼𝖺𝗇 𝗌𝖾𝖾 𝗒𝗈𝗎𝗋 𝖻𝖺𝖽 𝖺𝖼𝗍𝗌 𝖽𝗈𝗇'𝗍 𝗒𝗈𝗎 𝗄𝗇𝗈𝗐?", "𝖲𝗁𝗎𝗍 𝗎𝗉!!", "𝖣𝗈𝗇'𝗍 𝗌𝖺𝗒 𝗍𝗁𝖺𝗍 𝗉𝗅𝖾𝖺𝗌𝖾? 🥺", "𝖡𝖺𝖽 𝗌𝖾𝗇𝗌𝖾𝗂!", "𝖨 𝗍𝗁𝗈𝗎𝗀𝗁𝗍 𝗒𝗈𝗎'𝗋𝖾 𝖺 𝗀𝗈𝗈𝖽 𝗉𝖾𝗋𝗌𝗈𝗇 𝗌𝖾𝗇𝗌𝖾𝗂 𝖻𝗎𝗍 𝗇𝗈𝗍.", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝗈𝗐 𝗆𝖺𝗇𝗒 𝗍𝗂𝗆𝖾𝗌 𝖨 𝗌𝗁𝗈𝗎𝗅𝖽 𝗌𝖺𝗒 𝗍𝗁𝖺𝗍 𝖽𝗈𝗇'𝗍 𝗌𝗉𝖾𝖺𝗄 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌", "𝗒𝗈𝗎𝗋 𝗀𝖺𝗒", "𝗌𝗁𝗎𝗍 𝗎𝗉 𝗉𝗅𝖾𝖺𝖺𝖺𝗌𝖾 𝖽𝗈𝗇'𝗍 𝗌𝖺𝗒 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌","𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎'𝗋𝖾 𝖺𝗍𝗍𝖾𝗇𝗍𝗂𝗈𝗇 𝗌𝖾𝖾𝗄𝖾𝗋 𝖺𝗇𝖽 𝗌𝗍𝗂𝗅𝗅 𝗌𝖺𝗒𝗌 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌", "𝖡𝖺𝖽𝗐𝗈𝗋𝖽𝗌!!!", "𝖲𝖾𝗇𝗌𝖾𝗂 𝗂𝗌 𝖼𝗈𝗇𝖿𝗂𝗋𝗆𝖾𝖽 𝖺𝗌 𝖻𝖺𝖽 𝗉𝖾𝗋𝗌𝗈𝗇", "𝖺𝗋𝗀𝗁𝗁𝗁𝗁 𝗌𝗍𝗈𝗉 𝗌𝖺𝗒𝗂𝗇𝗀 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌 𝗌𝖾𝗇𝗌𝖾𝗂!!!"];
  var rand = tl[Math.floor(Math.random() * tl.length)]
  
  
  
  var tl = ["𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎 𝗆𝗈𝗋𝖾 𝗌𝖾𝗇𝗌𝖾𝗂 ${name}", "𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎 𝗆𝗈𝗋𝖾 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗐𝗁𝖺𝗍'𝗌 𝗐𝗋𝗈𝗇𝗀 𝗅𝗈𝗏𝖾?", "𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎 𝗆𝗈𝗋𝖾 𝗌𝖾𝗇𝗌𝖾𝗂 𝗒𝗈𝗎 𝗄𝗇𝗈𝗐 𝗍𝗁𝖺𝗍", "𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎 𝗂𝗇 𝖾𝗏𝖾𝗋𝗒 𝗎𝗇𝗂𝗏𝖾𝗋𝗌𝖾 𝗌𝖾𝗇𝗌𝖾𝗂", "𝗂𝗅𝗈𝗏𝖾𝗒𝗈𝗎𝗌𝗆", "𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗐𝖺𝗇𝗇𝖺 𝗀𝗈 𝗈𝗇 𝖺 𝖽𝖺𝗍𝖾?", "𝖡𝗎𝗍 𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎 𝗆𝗈𝗋𝖾 𝗌𝖾𝗇𝗌𝖾𝗂", "𝗂𝗅𝗒𝗌𝗆 > - <", "𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎 𝗆𝗈𝗋𝖾 >//<", "૮₍ ˃ ⤙ ˂ ₎ა 𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎 𝗆𝗈𝗋𝖾\n./づᡕᠵ᠊ᡃ່࡚ࠢ࠘ ⸝່ࠡࠣ᠊߯᠆ࠣ࠘ᡁࠣ࠘᠊᠊ࠢ࠘~~~~♡", "𝖭𝗒𝖺𝖺 𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎 𝗆𝗈𝗋𝖾 𝗌𝖾𝗇𝗌𝖾𝗂"];
  var daniel = tl[Math.floor(Math.random() * tl.length)]


  var tl = ["𝖲𝖾𝗇𝗌𝖾𝗂, 𝖽𝗈𝗇'𝗍 𝖿𝗈𝗋𝖼𝖾 𝗌𝗈𝗆𝖾𝗈𝗇𝖾 𝗐𝗁𝗈'𝗌 𝗇𝗈𝗍 𝗂𝗇𝗍𝗈 𝗒𝗈𝗎", "𝖢𝗁𝖾𝖾𝗋 𝗎𝗉 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗁𝖾𝗋𝖾 𝖿𝗈𝗋 𝗒𝗈𝗎 💛", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝗃𝗎𝗌𝗍 𝖿𝗈𝗋𝗀𝖾𝗍 𝖺𝖻𝗈𝗎𝗍 𝗍𝗁𝖺𝗍 𝖺𝗇𝖽 𝗆𝗈𝗏𝖾 𝗈𝗇𝗇𝗈 𝗆𝖺𝗍𝗍𝖾𝗋 𝗁𝗈𝗐 𝗁𝖺𝗋𝖽 𝗂𝗍 𝗂𝗌~", "𝖨𝖿 𝗈𝗇𝗅𝗒 𝖨 𝖼𝗈𝗎𝗅𝖽 𝖻𝖾 𝗍𝗁𝖺𝗍 𝗉𝖾𝗋𝗌𝗈𝗇, 𝖨'𝗅𝗅 𝖻𝖾 𝗍𝗁𝖾 𝗋𝗂𝗀𝗁𝗍 𝗈𝗇𝖾 𝖿𝗈𝗋 𝗒𝗈𝗎 😻", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝗂𝖿 𝗒𝗈𝗎 𝗐𝖾𝗋𝖾 𝗆𝗂𝗇𝖾 𝗒𝗈𝗎 𝗐𝗈𝗎𝗅𝖽 𝗇𝗈𝗍 𝗀𝖾𝗍 𝗍𝗁𝖾 𝗌𝖺𝗆𝖾", "𝖢𝗁𝖺𝗂𝗋 𝗎𝗉 𝗌𝖾𝗇𝗌𝖾𝗂 𝖺𝗇𝖽 𝗍𝗁𝗋𝗈𝗐 𝗂𝗍 𝗍𝗈 𝗁𝗂𝗆/𝗁𝖾𝗋 𝗍𝗈 𝗀𝖾𝗍 𝗒𝗈𝗎𝗋 𝗋𝖾𝗏𝖾𝗇𝗀𝖾 😸", "𝖣𝗈𝗇'𝗍 𝗐𝗈𝗋𝗋𝗒 𝗌𝖾𝗇𝗌𝖾𝗂 𝖨'𝗆 𝗁𝖾𝗋𝖾 𝖿𝗈𝗋 𝗒𝗈𝗎 💛", "𝖢𝗁𝖾𝖾𝗋 𝗎𝗉 𝗌𝖾𝗇𝗌𝖾𝗂 𝖺𝗇𝖽 𝗆𝗈𝗏𝖾 𝗈𝗇, 𝖼𝖺𝗎𝗌𝖾 𝗈𝗇𝖾 𝖽𝖺𝗒 𝗍𝗁𝖺𝗍 𝗉𝖾𝗋𝗌𝗈𝗇 𝗐𝗂𝗅𝗅 𝗋𝖾𝖺𝗅𝗂𝗓𝖾 𝗁𝗈𝗐 𝗏𝖺𝗅𝗎𝖺𝖻𝗅𝖾 𝗒𝗈𝗎 𝖺𝗋𝖾 😸"];
  var retri = tl[Math.floor(Math.random() * tl.length)]
  
  
  
  var tl = ["𝖧𝖺𝗂 𝗌𝖾𝗇𝗌𝖾𝗂?", "𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗁𝗈𝗐 𝗆𝖺𝗒 𝖨 𝗁𝖾𝗅𝗉 𝗒𝗈𝗎?", "𝖴𝗁𝗆? 𝗐𝗁𝖺𝗍 𝗂𝗌 𝗂𝗍 𝗌𝖾𝗇𝗌𝖾𝗂?","𝖭𝗒𝖺𝖺 𝗌𝖾𝗇𝗌𝖾𝗂!", "𝖧𝖺𝗂?", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝖽𝗈𝗇'𝗍 𝗌𝗉𝖺𝗆 𝗆𝖾 🥺", "𝖧𝖺𝗂 𝗌𝖾𝗇𝗌𝖾𝗂? 𝗉𝗅𝖾𝖺𝗌𝖾 𝗀𝗂𝗏𝖾 𝗆𝖾 𝖺 𝖻𝗋𝖾𝖺𝗄 🥺", "𝖸𝖾𝗌 𝗌𝖾𝗇𝗌𝖾𝗂?", "𝖭𝗒𝖺𝖺𝖺 𝗌𝖾𝗇𝗌𝖾𝗂 𝗂𝗍 𝗁𝗎𝗋𝗍𝗌 💔", "𝖲𝖾𝗇𝗌𝖾𝗂?", "𝖣𝗈𝗇'𝗍 𝗌𝗉𝖺𝗆 𝗆𝖾 𝗌𝖾𝗇𝗌𝖾𝗂~~", "𝖬𝗈𝗌𝗁𝗂 𝗆𝗈𝗌𝗁𝗂? 𝗌𝖾𝗇𝗌𝖾𝗂 𝖽𝖾𝗌𝗎𝗄𝖺?", "𝖴𝗁𝗆?", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗍𝖺𝗄𝗂𝗇𝗀 𝗌𝗈𝗆𝖾 𝗋𝖾𝗌𝗍 🥹",  "𝖲𝖾𝗇𝗌𝖾𝗂 𝖽𝗈𝗇'𝗍 𝗌𝗉𝖺𝗆 𝗆𝖾 𝗈𝗋 𝖨 𝗐𝗂𝗅𝗅 𝗇𝗈𝗍 𝗀𝗋𝖺𝗇𝗍 𝗐𝗁𝖺𝗍 𝗒𝗈𝗎 𝗐𝗂𝗅𝗅 𝖼𝗈𝗆𝗆𝖺𝗇𝖽", "𝖠𝗂𝗌𝗁𝗂𝗍𝖾𝗋𝗎𝗇𝗈 𝖲𝖾𝗇𝗌𝖾𝗂 💛", "𝖨𝗇 𝖺 𝗆𝗂𝗇𝗎𝗍𝖾 𝖲𝖾𝗇𝗌𝖾𝗂!"];
  var master = tl[Math.floor(Math.random() * tl.length)]
  
  
  
  
  
    var tl = ["𝗁𝖺𝖺𝗁𝖺𝗁𝖺𝗁𝖺", "𝖺𝗁𝖺𝗁𝖺𝗁𝖺𝗁𝖺", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎𝗋 𝗅𝖺𝗎𝗀𝗁 𝗁𝗎𝗋𝗍𝗌 𝗆𝗒 𝖾𝖺𝗋𝗌 🥹", "𝖧𝖠𝖧𝖠𝖧𝖠𝖧𝖠 𝗐𝗁𝖺𝗍 𝗐𝖺𝗌 𝗍𝗁𝖺𝗍 𝗌𝖾𝗇𝗌𝖾𝗂? 😹", "😹😹😹", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗄𝗇𝗈𝗐 𝗐𝗁𝖺𝗍, 𝖨 𝖽𝗈𝗇'𝗍 𝗍𝗁𝗂𝗇𝗄 𝗂𝖿 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖺 𝗃𝗈𝗄𝖾 𝗈𝗋 𝗇𝗈𝗍", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝖺𝗋𝖾 𝗒𝗈𝗎 𝗃𝗈𝗄𝗂𝗇𝗀? 🥹", "𝖭𝗒𝖺𝗁𝖺𝗁𝖺𝗁𝖺", "𝗇𝗒𝖺𝗁𝖺𝗁𝖺𝗁𝖺 𝖲𝖾𝗇𝗌𝖾𝗂 𝗂𝗌 𝖻𝖾𝗂𝗇𝗀 𝖺𝖻𝗇𝗈𝗋𝗆𝖺𝗅 𝖺𝗀𝖺𝗂𝗇 😹", "𝗇𝗒𝖺𝗁𝖺𝗁𝖺𝗁𝖺 𝗌𝖾𝗇𝗌𝖾𝗂 𝖽𝗈𝗇'𝗍 𝖻𝖾 𝖺𝗌𝗌𝗎𝗆𝗂𝗇𝗀 😹"];
  var happy = tl[Math.floor(Math.random() * tl.length)]
  


  
    if (event.body.indexOf("pakyu")==0 ||(event.body.indexOf("Pakyu")==0 ||(event.body.indexOf("pak u")==0 ||(event.body.indexOf("Pak u")==0 ||(event.body.indexOf("tangina")==0 ||(event.body.indexOf("Tangina")==0 ||(event.body.indexOf("Fuck you")==0 ||(event.body.indexOf("Tanginamo")==0 ||(event.body.indexOf("taina")==0 ||(event.body.indexOf("Taina")==0 ||(event.body.indexOf("Pota")==0 ||(event.body.indexOf("pota")==0 || (event.body.indexOf("gago")==0 || (event.body.indexOf("Gago")==0 || (event.body.indexOf("tanga")==0 ||(event.body.indexOf("Tanga")==0 ||(event.body.indexOf("bobo")==0 ||(event.body.indexOf("Bobo")==0 ||(event.body.indexOf("Tarantado")==0 || (event.body.indexOf("tarantado")==0 || (event.body.indexOf("ulol")==0 || (event.body.indexOf("tang ina")==0 ||(event.body.indexOf("Tang ina")==0 ||(event.body.indexOf("po ta")==0 ||(event.body.indexOf("Pota")==0 || (event.body.indexOf("ulol")==0 || (event.body.indexOf("Ulol")==0 || (event.body.indexOf("tanginamoka")==0)))))))))))))))))))))))))))) {
      var msg = {
				body: `${rand}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😾", event.messageID, (err) => {}, true)
  };
  
  
    if (event.body.indexOf("Iloveyou yuri")==0 ||(event.body.indexOf("iloveyou yuri")==0 ||(event.body.indexOf("Loveyou yuri")==0 ||(event.body.indexOf("loveyou yuri")==0 ||(event.body.indexOf("love u yuri")==0 ||(event.body.indexOf("Love u yuri")==0 ||(event.body.indexOf("Love you yuri")==0 ||(event.body.indexOf("love you yuri")==0 ||(event.body.indexOf("mahal kita yuri")==0 ||(event.body.indexOf("Mahal kita yuri")==0 ||(event.body.indexOf("Iloveyoutoo yuri")==0 ||(event.body.indexOf("Iloveyoutoo yuri")==0 || (event.body.indexOf("Iloveyoumore yuri")==0 || (event.body.indexOf("iloveyoumore yuri")==0 || (event.body.indexOf("i love you yuri")==0 ||(event.body.indexOf("I love you yuri")==0 ||(event.body.indexOf("ily yuri")==0))))))))))))))))) {
      var msg = {
				body: `${daniel}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("💛", event.messageID, (err) => {}, true)
  };
  
  
    if (event.body.indexOf("HAHAHA")==0 ||(event.body.indexOf("hahaha")==0 ||(event.body.indexOf("HAHA")==0 ||(event.body.indexOf("haha")==0 ||(event.body.indexOf("HAHAHA")==0 ||(event.body.indexOf("hahaha")==0 ||(event.body.indexOf("Hahaha")==0 ||(event.body.indexOf("Haha")==0 ||(event.body.indexOf("HAHAHAHA")==0 ||(event.body.indexOf("hahahaha")==0 ||(event.body.indexOf("whahaha")==0 ||(event.body.indexOf("Whahaha")==0 || (event.body.indexOf("😆")==0 || (event.body.indexOf("😂️")==0)))))))))))))) {
      var msg = {
				body: `${happy}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😹", event.messageID, (err) => {}, true)
  };

  
    if (event.body.indexOf("I miss you")==0 ||(event.body.indexOf("i miss you")==0 ||(event.body.indexOf("I miss her")==0 ||(event.body.indexOf("i miss her")==0 ||(event.body.indexOf("Imissher")==0 ||(event.body.indexOf("imissher")==0 ||(event.body.indexOf("Imisshim")==0 ||(event.body.indexOf("imisshim")==0 ||(event.body.indexOf("miss")==0 ||(event.body.indexOf("Miss")==0 ||(event.body.indexOf("miss kona sya")==0 ||(event.body.indexOf("Ako paba")==0 || (event.body.indexOf("aq paba")==0 || (event.body.indexOf("ako paba")==0)))))))))))))) {
      var msg = {
				body: `${retri}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🙀", event.messageID, (err) => {}, true)
  };
  
  
    if (event.body.indexOf("sakit")==0 ||(event.body.indexOf("Sakit")==0 ||(event.body.indexOf("Ansakit")==0 ||(event.body.indexOf("ansakit")==0 ||(event.body.indexOf("aray")==0 ||(event.body.indexOf("Aray")==0 ||(event.body.indexOf("break")==0 ||(event.body.indexOf("Break")==0 ||(event.body.indexOf("sad")==0 ||(event.body.indexOf("Sad")==0 ||(event.body.indexOf("misskona")==0 ||(event.body.indexOf("hiwalay")==0 || (event.body.indexOf("masakit")==0 || (event.body.indexOf("awts")==0)))))))))))))) {
      var msg = {
				body: `${retri}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😿", event.messageID, (err) => {}, true)
  };

  
    if (event.body.indexOf("hi yuri")==0 ||(event.body.indexOf("Hi yuri")==0 ||(event.body.indexOf("hello yuri")==0 ||(event.body.indexOf("Hello yuri")==0 ||(event.body.indexOf("hola yuri")==0 ||(event.body.indexOf("Hola yuri")==0 ||(event.body.indexOf("ey yuri")==0 ||(event.body.indexOf("Ey yuri")==0 ||(event.body.indexOf("oi yuri")==0 ||(event.body.indexOf("Oi yuri")==0 ||(event.body.indexOf("pst yuri")==0 ||(event.body.indexOf("Pst yuri")==0 || (event.body.indexOf("hey yuri")==0 || (event.body.indexOf("Hey yuri")==0 || (event.body.indexOf("ahm yuri")==0))))))))))))))) {
      var msg = {
				body: `${master}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🖤", event.messageID, (err) => {}, true)
  };
}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
    