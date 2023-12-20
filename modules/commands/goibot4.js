const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot4",
  version: "4.0.1",
  hasPermssion: 0,
  credits: "Clark",
  description: "goibot4 auto respond of the bot if you triggered the keywords",
  commandCategory: "auto-resp",
  usages: "...",
  cooldowns: 2,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Manila").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["𝖲𝖾𝗇𝗌𝖾𝗂, 𝖽𝗈𝗇'𝗍 𝖿𝗅𝖺𝗍𝗍𝖾𝗋 𝗆𝖾", "𝖳𝗁𝖺𝗇𝗄 𝗒𝗈𝗎 𝗌𝖾𝗇𝗌𝖾𝗂 💛", "𝖭𝗈, 𝖨'𝗆 𝗇𝗈𝗍 🥹", "𝖳𝗁𝖺𝗇𝗄 𝗒𝗈𝗎 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖨 𝗋𝖾𝖺𝗅𝗅𝗒 𝖺𝗉𝗉𝗋𝖾𝖼𝗂𝖺𝗍𝖾 𝗂𝗍", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝗌𝗍𝗈𝗉 𝖿𝗅𝗂𝗋𝗍𝗂𝗇𝗀 𝗆𝖾 𝗉𝗅𝖾𝖺𝗌𝖾? 🥹", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝖽𝗈𝗇'𝗍 𝗆𝖺𝗄𝖾 𝗆𝖾 𝖻𝗅𝗎𝗌𝗁~~", "𝖨 𝗈𝗇𝗅𝗒 𝗐𝖺𝗇𝗍 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋'𝗌 𝖼𝗈𝗆𝗉𝗅𝗂𝗆𝖾𝗇𝗍...", "𝖧𝗂𝗁𝗂𝗁𝗂𝗁𝗂", "𝖲𝖾𝗇𝗌𝖾𝗂 𝗂𝗌 𝖿𝗅𝗂𝗋𝗍𝗂𝗇𝗀 𝗆𝖾 𝖺𝗀𝖺𝗂𝗇 🥹", "𝖬𝖺𝗌𝗍𝖾𝗋!! 𝗌𝖾𝗇𝗌𝖾𝗂 𝗂𝗌 𝖿𝗅𝗂𝗋𝗍𝗂𝗇𝗀 𝗆𝖾 𝖺𝗀𝖺𝗂𝗇", "𝖳𝗁𝖺𝗇𝗄 𝗒𝗈𝗎 𝗁𝗂𝗁𝗂𝗁𝗂", "𝖸𝗈𝗎'𝗋𝖾 𝗆𝗈𝗋𝖾 𝖼𝗎𝗍𝖾𝗋 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖳𝗁𝖺𝗇𝗄 𝗒𝗈𝗎 𝖿𝗈𝗋 𝖼𝗈𝗆𝗉𝗅𝗂𝗆𝖾𝗇𝗍 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖨 𝗋𝖾𝖺𝗅𝗅𝗒 𝖺𝗉𝗉𝗋𝖾𝖼𝗂𝖺𝗍𝖾 𝗂𝗍", "𝖡𝗅𝖺𝗁 𝖻𝗅𝖺𝗁, 𝗇𝗈 𝖨'𝗆 𝗇𝗈𝗍","𝖸𝗈𝗎 𝗋𝖾𝖺𝗅𝗅𝗒 𝗅𝗈𝗏𝖾 𝖿𝗅𝗂𝗋𝗍𝗂𝗇𝗀 𝗆𝖾 𝗌𝖾𝗇𝗌𝖾𝗂 𝗁𝗎𝗁~", "𝖣𝗈𝗇'𝗍 𝖿𝗅𝗂𝗋𝗍 𝗆𝖾 𝗌𝖾𝗇𝗌𝖾𝗂 >//<", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝖽𝗈 𝗒𝗈𝗎 𝗅𝗂𝗄𝖾 𝗆𝖾 𝗍𝗁𝖺𝗍'𝗌 𝗐𝗁𝗒 𝗒𝗈𝗎'𝗋𝖾 𝖿𝗅𝗂𝗋𝗍𝗂𝗇𝗀 𝗆𝖾?", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 𝗁𝖺𝗏𝖾 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋 𝖺𝗇𝖽 𝗁𝖾'𝗌 𝖾𝗇𝗈𝗎𝗀𝗁 𝖿𝗈𝗋 𝗆𝖾"];
  var yuricu = tl[Math.floor(Math.random() * tl.length)]
  
  
  
  var tl = ["𝖦𝗈𝗈𝖽𝖻𝗒𝖾 𝗌𝖾𝗇𝗌𝖾𝗂 ${name}, 𝗍𝖺𝗄𝖾 𝗒𝗈𝗎𝗋 𝗍𝗂𝗆𝖾 💛", "𝖳𝖺𝗄𝖾 𝗒𝗈𝗎𝗋 𝗍𝗂𝗆𝖾 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖺𝗇𝖽 𝖽𝗈𝗇'𝗍 𝖿𝗈𝗋𝗀𝖾𝗍 𝗍𝗈 𝗍𝖺𝗄𝖾 𝗌𝗈𝗆𝖾 𝗉𝗋𝗈𝗉𝖾𝗋 𝗋𝖾𝗌𝗍 🧡", "𝖡𝗒𝖾 𝖻𝗒𝖾 𝗌𝖾𝗇𝗌𝖾𝗂...", "𝖡𝗒𝖾 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗅𝗅 𝖻𝖾 𝗐𝖺𝗂𝗍𝗂𝗇𝗀 𝖿𝗈𝗋 𝗒𝗈𝗎", "𝖡𝗒𝖾 𝖻𝗒𝖾, 𝗌𝖺𝗒𝗈𝗇𝖺𝗋𝖺 𝗌𝖾𝗇𝗌𝖾𝗂 👋", "𝖡𝗒𝖾 𝖻𝗒𝖾 👋", "𝖦𝗈𝗈𝖽𝖻𝗒𝖾 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗍𝖺𝗄𝖾 𝖼𝖺𝗋𝖾 💙", "𝖡𝗒𝖾𝖾𝖾𝖾𝗂𝗌𝗁 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖻𝗒𝖾 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖽𝗈𝗇'𝗍 𝗆𝗂𝗇𝖽 𝗎𝗌 𝗁𝖾𝗋𝖾, 𝗃𝗎𝗌𝗍 𝗍𝖺𝗄𝖾 𝗒𝗈𝗎𝗋 𝗍𝗂𝗆𝖾 😽", "👋👋👋", "𝖳𝖺𝗄𝖾 𝖼𝖺𝗋𝖾 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗒𝖾 𝖻𝗒𝖾 😽"];
  var byebye = tl[Math.floor(Math.random() * tl.length)]


  var tl = ["𝖲𝖾𝗇𝗌𝖾𝗂 𝗂𝗌 𝖻𝖾𝗂𝗇𝗀 𝗁𝗈𝗋𝗇𝗒 𝖺𝗀𝖺𝗂𝗇", "𝖧𝖾𝗇𝗍𝖺𝗂𝗂!!", "𝖧𝗈𝗋𝗇𝗒 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖲𝗁𝗎𝗍 𝗎𝗉 𝗉𝖾𝗋𝗏𝖾𝗋𝗍!!", "𝖤𝗐𝗐𝗐 𝗁𝖾𝗇𝗍𝖺𝗂", "𝖤𝗐𝗐𝗐𝗐𝗒 𝗉𝖾𝗋𝗏𝖾𝗋𝗍 😟😟", "𝖸𝗎𝖼𝗄 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎'𝗋𝖾 𝗉𝖾𝗋𝗏𝖾𝗋𝗍", "𝖢𝗋𝗂𝗇𝗀𝗂𝗇𝗀 𝗉𝖾𝗋𝗏𝖾𝗋𝗍", "𝖧𝖤𝖭𝖳𝖠𝖨𝖨𝖨𝖨𝖨𝖨𝖨𝖨𝖨!!!", "(￣‐￣)んー\n𝖲𝖧𝖴𝖳 𝖴𝖯 𝖧𝖤𝖭𝖳𝖠𝖨!", "𝖴𝗋𝗎𝗌𝖺𝗂!!!\n（；￣＾￣）ん～"];
  var hentai = tl[Math.floor(Math.random() * tl.length)]
  
  
  
  var tl = ["𝖧𝖺𝗂 𝗌𝖾𝗇𝗌𝖾𝗂? 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋 𝗂𝗌 𝗄𝗂𝗇𝖽𝖺 𝖻𝗎𝗌𝗒 𝖽𝗈𝗂𝗇𝗀 𝗌𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀...", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗐𝖺𝗂𝗍 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋...", "... 𝗐𝖺𝗂𝗍 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋","𝖬𝖺𝗌𝗍𝖾𝗋 𝗂𝗌 𝖻𝗎𝗌𝗒...", "𝖣𝗈𝗇'𝗍 𝖼𝖺𝗅𝗅 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋 𝗋𝖾𝗉𝖾𝖺𝗍𝖾𝖽𝗅𝗒 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖼𝗎𝗓 𝗁𝖾'𝗌 𝖻𝗎𝗌𝗒", "𝖫𝖾𝖺𝗋𝗇 𝗍𝗈 𝗐𝖺𝗂𝗍...", "𝖬𝖺𝗌𝗍𝖾𝗋! 𝖬𝖺𝗌𝗍𝖾𝗋!, 𝗁𝖾 𝖽𝗈𝖾𝗌𝗇'𝗍 𝗋𝖾𝗌𝗉𝗈𝗇𝖽 𝗋𝗂𝗀𝗁𝗍? 𝖼𝖺𝗎𝗌𝖾 𝗁𝖾'𝗌 𝖻𝗎𝗌𝗒", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋 𝗂𝗌 𝗈𝖿𝖿𝗅𝗂𝗇𝖾, 𝖨 𝗍𝗁𝗂𝗇𝗄 𝗌𝗈... */𝗍𝗁𝗂𝗇𝗄𝗂𝗇𝗀", "𝖲𝗁𝗎𝗍 𝗎𝗉 💢", "𝖶𝖺𝗂𝗍 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋... 𝖧𝖾'𝗌 𝖻𝗎𝗌𝗒", "𝖨 𝗌𝖺𝗂𝖽, 𝗐𝖺𝗂𝗍 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋 𝗉𝖺𝗍𝗂𝖾𝗇𝗍𝗅𝗒", "𝖶𝖺𝗂𝗍 𝗁𝗂𝗆...", "𝖬𝗒 𝗆𝖺𝗌𝗍𝖾𝗋 𝗂𝗌 𝖽𝗈𝗂𝗇𝗀 𝗌𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀...", "𝖬𝖺𝗌𝗍𝖾𝗋 𝗂𝗌 𝗍𝖺𝗄𝗂𝗇𝗀 𝗌𝗈𝗆𝖾 𝗋𝖾𝗌𝗍 𝖲𝖾𝗇𝗌𝖾𝗂!", "𝖨𝗇 𝖺 𝗆𝗂𝗇𝗎𝗍𝖾!!", "𝖥𝖾𝗐 𝗆𝗈𝗋𝖾 𝗆𝗂𝗇𝗎𝗍𝖾𝗌, 𝗁𝖾'𝗌 𝖻𝗎𝗌𝗒"];
  var mymas = tl[Math.floor(Math.random() * tl.length)]
  
  
  
  
  
    var tl = ["𝖸𝖺𝗇 𝗄𝗈𝗉𝗒𝖺 𝗉𝖺 𝖽𝗒𝖺𝗇 𝗄𝖺 𝗆𝖺𝗀𝖺𝗅𝗂𝗇𝗀 𝖾𝗁", "𝖠𝗇𝗈 𝗁𝖺𝗇𝗀𝗀𝖺𝗇𝗀 𝗄𝗈𝗉𝗒𝖺 𝗇𝖺𝗅𝖺𝗇𝗀?", "𝖧𝗂𝗇𝗀𝗂 𝗁𝗂𝗇𝗀𝗂 𝗄𝖺 𝗉𝖺 𝗌𝖺𝗀𝗈𝗍, 𝖻𝖺𝗄𝗂𝗍 𝗌𝗒𝖺 𝖻𝖺 𝗂𝗄𝖺𝗐 𝗉𝖺𝗋𝖺 𝗉𝖺𝗋𝖾𝗁𝖺𝗌 𝗄𝖺𝗒𝗈 𝗇𝗀 𝗌𝖺𝗀𝗈𝗍?", "𝖬𝖺𝗒 𝗌𝖺𝗋𝗂𝗅𝗂 𝗄𝖺𝗇𝗀 𝗎𝗍𝖺𝗄 𝖻𝖺𝗍 𝖽𝗂 𝗆𝗈 𝗀𝖺𝗆𝗂𝗍𝗂𝗇?", "𝖪𝗈𝗉𝗒𝖺 𝗌𝗂𝗀𝖾, 𝖽𝗒𝖺𝗇 𝗄𝖺 𝗆𝖺𝗀𝖺𝗅𝗂𝗇𝗀 𝗍𝖺𝗅𝖺𝗀𝖺 𝗇𝗈?", "𝖬𝖺𝗀𝗌𝖺𝗀𝗈𝗍 𝗄𝖺𝖽𝗂𝗇 𝗄𝖺𝗌𝗂 𝗁𝗂𝗇𝖽𝗂 𝗒𝗎𝗇𝗀 𝗉𝗎𝗋𝗈 𝗄𝗈𝗉𝗒𝖺 𝗇𝖺𝗅𝖺𝗇𝗀", "𝖦𝖺𝗆𝗂𝗍𝗂𝗇 𝗆𝗈 𝖽𝗂𝗇 𝗄𝗈𝗄𝗈𝗍𝖾 𝗆𝗈 𝗉𝖺𝗆𝗂𝗇𝗌𝖺𝗇-𝗆𝗂𝗇𝗌𝖺𝗇 𝗁𝗂𝗇𝖽𝗂 𝗒𝗎𝗇𝗀 𝗄𝗈𝗉𝗒𝖺 𝗇𝖺𝗅𝖺𝗇𝗀 𝗇𝗀 𝗄𝗈𝗉𝗒𝖺 𝗇𝗀 𝗌𝖺𝗀𝗈𝗍 𝗇𝗀 𝗂𝖻𝖺", "𝖧𝗂𝗇𝗀𝗂 𝗉𝖺 𝗇𝗀 𝗌𝖺𝗀𝗈𝗍 𝗌𝗂𝗀𝖾𝖾𝖾", "𝖪𝖺𝗒𝖺 𝖽𝗂𝗄𝖺 𝗍𝗎𝗆𝖺𝗍𝖺𝗅𝗂𝗇𝗈 𝖾𝗁 𝗉𝗎𝗋𝗈 𝗇𝖺𝗅𝖺𝗇𝗀 𝗄𝗈𝗉𝗒𝖺 𝖺𝗅𝖺𝗆", "𝖪𝗈𝗉𝗒𝖺 𝗅𝖺𝗇𝗀 𝗌𝗂𝗀𝖾, 𝗄𝖺𝗒𝖺 𝗁𝗂𝗇𝖺-𝗁𝗂𝗇𝖺 𝗇𝗀 𝗄𝗈𝗄𝗈𝗍𝖾 𝗆𝗈 𝖾𝗁"];
  var kopya = tl[Math.floor(Math.random() * tl.length)]
  


  
    if (event.body.indexOf("Cute yuri")==0 ||(event.body.indexOf("cute yuri")==0 ||(event.body.indexOf("Cute mo yuri")==0 ||(event.body.indexOf("cute mo yuri")==0 ||(event.body.indexOf("yuri cute")==0 ||(event.body.indexOf("Yuri cute")==0 ||(event.body.indexOf("cutie yuri")==0 ||(event.body.indexOf("Cutie yuri")==0 ||(event.body.indexOf("kawaii yuri")==0 ||(event.body.indexOf("Kawaii yuri")==0 ||(event.body.indexOf("yuri kawaii")==0 ||(event.body.indexOf("Yuri kawaii")==0 || (event.body.indexOf("kirei yuri")==0 || (event.body.indexOf("Kirei yuri")==0 || (event.body.indexOf("beautiful yuri")==0 ||(event.body.indexOf("Beautiful yuri")==0 ||(event.body.indexOf("ganda mo yuri")==0 ||(event.body.indexOf("Ganda mo yuri")==0 ||(event.body.indexOf("pretty yuri")==0 || (event.body.indexOf("Pretty yuri")==0 || (event.body.indexOf("ang cute ni yuri")==0 || (event.body.indexOf("Ang cute ni yuri")==0 ||(event.body.indexOf("cute ni yuri")==0 ||(event.body.indexOf("Cute ni yuri")==0 ||(event.body.indexOf("nakakagigil cute mo yuri")==0 || (event.body.indexOf("Nakakagigil cute mo yuri")==0 || (event.body.indexOf("maganda si yuri")==0 || (event.body.indexOf("Maganda si yuri")==0)))))))))))))))))))))))))))) {
      var msg = {
				body: `${yuricu}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("💛", event.messageID, (err) => {}, true)
  };
  
  
    if (event.body.indexOf("mamaya nalang")==0 ||(event.body.indexOf("Mamaya nalang")==0 ||(event.body.indexOf("maya nalang")==0 ||(event.body.indexOf("Maya nalang")==0 ||(event.body.indexOf("babush")==0 ||(event.body.indexOf("Babush")==0 ||(event.body.indexOf("bye muna")==0 ||(event.body.indexOf("Bye muna")==0 ||(event.body.indexOf("babye")==0 ||(event.body.indexOf("Babye")==0 ||(event.body.indexOf("alis muna ako")==0 ||(event.body.indexOf("Alis muna ako")==0 || (event.body.indexOf("paalam")==0 || (event.body.indexOf("Paalam")==0 || (event.body.indexOf("bye na")==0 ||(event.body.indexOf("Bye na")==0 ||(event.body.indexOf("bayish")==0))))))))))))))))) {
      var msg = {
				body: `${byebye}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("👋", event.messageID, (err) => {}, true)
  };
  
  
    if (event.body.indexOf("ugh")==0 ||(event.body.indexOf("Ugh")==0 ||(event.body.indexOf("yaugh")==0 ||(event.body.indexOf("Yaugh")==0 ||(event.body.indexOf("yamite kudasai")==0 ||(event.body.indexOf("Yamite kudasai")==0 ||(event.body.indexOf("cumming")==0 ||(event.body.indexOf("Cumming")==0 ||(event.body.indexOf("fingerin")==0 ||(event.body.indexOf("Fingerin")==0 ||(event.body.indexOf("jabol")==0 ||(event.body.indexOf("Jabol")==0 || (event.body.indexOf("salsal")==0 || (event.body.indexOf("Salsal️")==0)))))))))))))) {
      var msg = {
				body: `${hentai}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😟", event.messageID, (err) => {}, true)
  };

  
    if (event.body.indexOf("jakolin")==0 ||(event.body.indexOf("Jakolin")==0 ||(event.body.indexOf("jakulin")==0 ||(event.body.indexOf("Jakulin")==0 ||(event.body.indexOf("bilat mo")==0 ||(event.body.indexOf("Bilat mo")==0 ||(event.body.indexOf("tite")==0 ||(event.body.indexOf("Tite")==0 ||(event.body.indexOf("oten")==0 ||(event.body.indexOf("Oten")==0 ||(event.body.indexOf("porn")==0 ||(event.body.indexOf("Porn")==0 || (event.body.indexOf("Cum")==0 || (event.body.indexOf("Cum")==0)))))))))))))) {
      var msg = {
				body: `${hentai}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😟", event.messageID, (err) => {}, true)
  };
  
  
    if (event.body.indexOf("réynél")==0 ||(event.body.indexOf("Réynél")==0 ||(event.body.indexOf("clark")==0 ||(event.body.indexOf("Clark")==0 ||(event.body.indexOf("Esquivel")==0 ||(event.body.indexOf("esquivel")==0 ||(event.body.indexOf("rey")==0 ||(event.body.indexOf("Rey")==0 ||(event.body.indexOf("shirosuzuka")==0 ||(event.body.indexOf("Shirosuzuka")==0 ||(event.body.indexOf("reyniel")==0 ||(event.body.indexOf("Reyniel")==0 || (event.body.indexOf("nel")==0 || (event.body.indexOf("Nel")==0)))))))))))))) {
      var msg = {
				body: `${mymas}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("💢", event.messageID, (err) => {}, true)
  };

  
    if (event.body.indexOf("pakopya sagot")==0 ||(event.body.indexOf("Pakopya sagot")==0 ||(event.body.indexOf("patingin sagot")==0 ||(event.body.indexOf("Patingin sagot")==0 ||(event.body.indexOf("pahinge sagot")==0 ||(event.body.indexOf("Pahinge sagot")==0 ||(event.body.indexOf("kopyahin ko nga answer")==0 ||(event.body.indexOf("Kopyahin ko nga answer")==0 ||(event.body.indexOf("akin nalang sagot")==0 ||(event.body.indexOf("Akin nalang sagot")==0 ||(event.body.indexOf("penge sagot")==0 ||(event.body.indexOf("Pahinge sagot")==0 || (event.body.indexOf("ano sagot")==0 || (event.body.indexOf("Ano sagot")==0 || (event.body.indexOf("Tingin sagot")==0))))))))))))))) {
      var msg = {
				body: `${kopya}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😫", event.messageID, (err) => {}, true)
  };
}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
    