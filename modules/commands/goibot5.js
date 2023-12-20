const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot5",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Clark",
  description: "goibot5 auto respond of the bot if you triggered the keywords",
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

  var tl = ["𝖸𝖾𝗌𝗌? 𝗈𝗁𝗁 𝗀𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖨 𝗍𝗁𝗈𝗎𝗀𝗁𝗍 𝗍𝗁𝖺𝗍 𝗐𝖺𝗌 𝗆𝖾 😸", "𝖧𝖾𝗅𝗅𝗈 𝗅𝗈𝗏𝖾 😽, 𝗆𝗒 𝖻𝖺𝖽 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖨 𝗍𝗁𝗈𝗎𝗀𝗁𝗍 𝗂𝗍𝗌 𝗆𝖾", "𝖸𝖾𝗌𝗌 𝗅𝗈𝗏𝖾? 🥺 𝗈𝗁𝗁 𝗀𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖿𝖺𝗅𝗌𝖾 𝖺𝗅𝖾𝗋𝗍", "𝖧𝗂𝗂 𝗅𝗈𝗏𝖾 😽, 𝗈𝗁𝗁 𝗆𝗒 𝖻𝖺𝖽 😅", "𝖴𝗁𝗆𝗆 𝗅𝗈𝗏𝖾? 𝗈𝗁𝗁 𝗒𝗈𝗎'𝗋𝖾 𝗇𝗈𝗍 𝗀𝗈𝗆𝖾𝗇", "𝖧𝖺𝗂𝗂? 𝗈𝗁𝗁 𝗀𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖧𝖾𝗅𝗅𝗈 𝗅𝗈𝗏𝖾𝗒𝗒, 𝗈𝗁𝗁 𝗐𝖺𝗂𝗍, 𝗀𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂 𝖨 𝗍𝗁𝗈𝗎𝗀𝗁𝗍 𝖨'𝗆 𝗍𝗁𝖾 𝗈𝗇𝖾 𝗒𝗈𝗎'𝗋𝖾 𝖼𝖺𝗅𝗅𝗂𝗇𝗀", "𝖸𝖾𝗌? 𝗀𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖧𝖺𝗂𝗂? 𝗐𝗁𝖺𝗍 𝗂𝗌 𝗂𝗍 𝗅𝗈𝗏𝖾? 𝗈𝗁𝗁 𝗐𝖺𝗂𝗍 𝖺 𝗆𝗂𝗇𝗎𝗍𝖾... 𝗈𝗁𝗁 𝗀𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂 𝗍𝗁𝖺𝗍 𝗐𝖺𝗌 𝗒𝗈𝗎 𝗀𝗈𝗆𝖾𝗇𝗇 🥹"];
  var assume = tl[Math.floor(Math.random() * tl.length)]
  
  
  
  var tl = ["𝖭𝗈𝗍 𝖺𝗀𝖺𝗂𝗇 𝗌𝖾𝗇𝗌𝖾𝗂 😫", "𝖣𝗈𝗇'𝗍 𝗒𝗈𝗎 𝗄𝗇𝗈𝗐 𝗆𝗒 𝗉𝗋𝖾𝖿𝗂𝗑 𝗂𝗌?", "𝖨 𝖻𝖾𝗍 𝗒𝗈𝗎 𝖿𝗈𝗋𝗀𝗈𝗍 𝗆𝗒 𝗉𝗋𝖾𝖿𝗂𝗑 𝖺𝗀𝖺𝗂𝗇 😫", "𝖫𝗈𝗈𝗄 𝖺𝗍 𝗆𝗒 𝗇𝗂𝖼𝗄𝗇𝖺𝗆𝖾 𝗂𝗇𝗌𝗍𝖾𝖺𝖽 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖶𝗁𝗒 𝗒𝗈𝗎 𝖺𝗅𝗐𝖺𝗒𝗌 𝖿𝗈𝗋𝗀𝖾𝗍 𝗆𝗒 𝗉𝗋𝖾𝖿𝗂𝗑 😫", "𝖮𝗄𝖺𝗒 𝗈𝗄𝖺𝗒 𝖨 𝗄𝗇𝗈𝗐 𝗍𝗁𝖺𝗍 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝗄𝗇𝗈𝗐 𝗆𝗒 𝗉𝗋𝖾𝖿𝗂𝗑 𝗂𝗌", "𝖪𝗂𝗇𝖽𝗅𝗒 𝖽𝗈𝗇'𝗍 𝖿𝗈𝗋𝗀𝖾𝗍 𝗆𝗒 𝗉𝗋𝖾𝖿𝗂𝗑 𝖺𝗀𝖺𝗂𝗇 :>", "𝖫𝗈𝗈𝗄 𝖺𝗍 𝗆𝗒 𝗇𝗂𝖼𝗄𝗇𝖺𝗆𝖾 𝗌𝖾𝗇𝗌𝖾𝗂 :𝗏", "𝖠𝗆 𝖨 𝖿𝗈𝗋𝗀𝖾𝗍𝗍𝖺𝖻𝗅𝖾 𝗌𝖾𝗇𝗌𝖾𝗂? 𝗍𝗁𝖺𝗍'𝗌 𝗐𝗁𝗒 𝗒𝗈𝗎 𝖿𝗈𝗋𝗀𝗈𝗍 𝗆𝗒 𝗉𝗋𝖾𝖿𝗂𝗑?", "𝖯𝗅𝖾𝖺𝗌𝖾 𝖽𝗈𝗇'𝗍 𝖿𝗈𝗋𝗀𝖾𝗍 𝗐𝗁𝖺𝗍 𝗂𝗌 𝗆𝗒 𝗉𝗋𝖾𝖿𝗂𝗑 :>", "𝖣𝗈𝗇'𝗍 𝖿𝗈𝗋𝗀𝖾𝗍 𝗆𝗒 𝗉𝗋𝖾𝖿𝗂𝗑 𝗈𝗄𝖺𝗒", "𝖠𝗅𝗐𝖺𝗒𝗌 𝗋𝖾𝗆𝖾𝗆𝖻𝖾𝗋 𝗆𝗒 𝗉𝗋𝖾𝖿𝗂𝗑 𝗌𝖾𝗇𝗌𝖾𝗂!", "𝖠𝖠𝖠𝖠𝖠𝖠𝖠𝖠𝖱𝖦𝖧𝖧𝖧 𝗒𝗈𝗎 𝖿𝗈𝗋𝗀𝗈𝗍 𝗆𝗒 𝗉𝗋𝖾𝖿𝗂𝗑?", "𝖯𝗅𝖾𝖺𝗌𝖾 𝖽𝗈𝗇'𝗍 𝖿𝗈𝗋𝗀𝖾𝗍 𝗆𝗒 𝗉𝗋𝖾𝖿𝗂𝗑,𝗃𝗎𝗌𝗍 𝗅𝗂𝗄𝖾 𝗆𝖾 :𝗏","𝖬𝗒 𝗉𝗋𝖾𝖿𝗂𝗑 𝗂𝗌 𝖺𝗅𝗐𝖺𝗒𝗌 𝖻𝖾 𝗍𝗁𝖾 𝗌𝖺𝗆𝖾 𝗌𝗈 𝖽𝗈𝗇'𝗍 𝖿𝗈𝗋𝗀𝖾𝗍 𝗂𝗍 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖶𝗁𝗒 𝗒𝗈𝗎 𝖺𝗅𝗐𝖺𝗒𝗌 𝖿𝗈𝗋𝗀𝖾𝗍 𝗆𝗒 𝗉𝗋𝖾𝖿𝗂𝗑? :<", "𝖮𝗄𝖺𝗒 𝗈𝗄𝖺𝗒, 𝖽𝗈𝗇'𝗍 𝖿𝗈𝗋𝗀𝖾𝗍 𝗆𝗒 𝗉𝗋𝖾𝖿𝗂𝗑 𝖾𝗏𝖾𝗋 𝖺𝗀𝖺𝗂𝗇 𝗉𝗅𝖾𝖺𝗌𝖾?", "𝖠𝗋𝗋𝗋𝗀𝗁𝗁𝗁 𝖺𝗅𝗐𝖺𝗒𝗌 𝗋𝖾𝗆𝖾𝗆𝖻𝖾𝗋 𝗆𝗒 𝗉𝗋𝖾𝖿𝗂𝗑!!!"];
  var arghh = tl[Math.floor(Math.random() * tl.length)]
  
  
  
  var tl = ["𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝖸𝗎𝗋𝗂 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝖸𝗎𝗋𝗂 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺, 𝖺𝗇𝖽 𝗆𝗒 𝖼𝗋𝖾𝖺𝗍𝗈𝗋 𝗂𝗌 𝖢𝗅𝖺𝗋𝗄 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺", "𝖧𝖺𝗂 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗁𝖺𝗏𝖾 𝖺 𝗀𝗈𝗈𝖽 𝖽𝖺𝗒! 𝖨'𝗆 𝖸𝗎𝗋𝗂 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺 𝖺𝗇𝖽 𝗒𝗈𝗎 𝖼𝖺𝗇 𝖼𝖺𝗅𝗅 𝗆𝖾 𝖸𝗎𝗋𝗂 𝗂𝗇𝗌𝗍𝖾𝖺𝖽 𝖺𝗇𝖽 𝖨 𝗐𝖺𝗌 𝗆𝖺𝖽𝖾 𝖻𝗒 𝖢𝗅𝖺𝗋𝗄 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺", "𝖧𝖺𝗂𝗂, 𝗅𝖾𝗍 𝗆𝖾 𝗂𝗇𝗍𝗋𝗈𝖽𝗎𝖼𝖾 𝗆𝗒𝗌𝖾𝗅𝖿 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖨 𝖺𝗆 𝖸𝗎𝗋𝗂 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺 𝖺𝗇𝖽 𝗆𝗒 𝖼𝗋𝖾𝖺𝗍𝗈𝗋 𝗂𝗌 𝖢𝗅𝖺𝗋𝗄 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺, 𝖨'𝗆 𝗁𝗂𝗌 𝖿𝗂𝗇𝖾𝗌𝗍 𝗉𝗋𝗈𝗀𝗋𝖺𝗆𝗆𝖾𝖽 𝗆𝖾𝗌𝗌𝖾𝗇𝗀𝖾𝗋 𝖼𝗁𝖺𝗍𝖻𝗈𝗍 𝖺𝗇𝖽 𝖨'𝗆 𝗁𝖾𝗋𝖾 𝗍𝗈 𝗁𝖾𝗅𝗉 𝗒𝗈𝗎 😽 𝖭𝗂𝖼𝖾 𝗍𝗈 𝗆𝖾𝖾𝗍 𝗒𝗈𝗎 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗇𝗂𝖼𝖾 𝗍𝗈 𝗆𝖾𝖾𝗍 𝗒𝗈𝗎 😽 𝖨 𝖺𝗆 𝖸𝗎𝗋𝗂 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺 𝖺𝗇𝖽 𝖨'𝗆 𝖢𝗅𝖺𝗋𝗄'𝗌 𝖿𝗂𝗇𝖾𝗌𝗍 𝗉𝗋𝗈𝗀𝗋𝖺𝗆 𝗍𝗁𝖺𝗍 𝗁𝖾 𝖼𝗋𝖾𝖺𝗍𝖾𝖽 𝖿𝗈𝗋 𝗁𝗂𝗌 𝖾𝗇𝗍𝗂𝗋𝖾 𝗉𝗋𝗈𝗀𝗋𝖺𝗆𝗆𝗂𝗇𝗀 ✨", "𝖶𝗁𝖺𝗍'𝗌 𝗎𝗉 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖨 𝖺𝗆 𝖸𝗎𝗋𝗂 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺 𝖺 𝗌𝗂𝗆𝗉𝗅𝖾 𝗆𝖾𝗌𝗌𝖾𝗇𝗀𝖾𝗋 𝖼𝗁𝖺𝗍𝖻𝗈𝗍 𝖼𝗋𝖾𝖺𝗍𝖾𝖽 𝖻𝗒 𝖢𝗅𝖺𝗋𝗄 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺", "𝖧𝗆𝗆𝗆, 𝗂𝗇𝗍𝗋𝗈𝖽𝗎𝖼𝖾 𝗆𝗒𝗌𝖾𝗅𝖿? 𝗈𝗄𝖺𝗒 𝗈𝗄𝖺𝗒, 𝖧𝖾𝗅𝗅𝗈 𝗌𝖾𝗇𝗌𝖾𝗂 𝖨'𝗆 𝗇𝗈𝗍 𝗌𝗎𝗋𝖾 𝗂𝖿 𝗂𝗍 𝗂𝗌 𝗈𝗎𝗋 𝖿𝗂𝗋𝗌𝗍 𝗍𝗂𝗆𝖾 𝗆𝖾𝖾𝗍𝗂𝗇𝗀 𝖾𝖺𝖼𝗁 𝗈𝗍𝗁𝖾𝗋 𝖻𝗎𝗍 𝖨'𝗆 𝗀𝗅𝖺𝖽 𝗍𝗈 𝗁𝖾𝗅𝗉 𝗒𝗈𝗎 𝗍𝗈 𝖺𝗅𝗅 𝗍𝗁𝖾 𝗍𝗁𝗂𝗇𝗀𝗌 𝗒𝗈𝗎 𝗇𝖾𝖾𝖽 𝗍𝗈 𝖽𝗈 𝗅𝗂𝗄𝖾 𝗌𝖾𝖺𝗋𝖼𝗁𝖾𝗌 𝗈𝗋 𝗌𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀 𝖾𝗅𝗌𝖾, 𝖻𝗒 𝗍𝗁𝖾 𝗐𝖺𝗒 𝖨'𝗆 𝖸𝗎𝗋𝗂 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺 𝖺𝗇𝖽 𝖨'𝗆 𝖢𝗅𝖺𝗋𝗄'𝗌 𝖿𝗂𝗋𝗌𝗍 𝖾𝗏𝖾𝗋 𝖿𝗂𝗇𝗂𝗌𝗁𝖾𝖽 𝗆𝖾𝗌𝗌𝖾𝗇𝗀𝖾𝗋 𝖼𝗁𝖺𝗍𝖻𝗈𝗍, 𝖭𝗂𝖼𝖾 𝗍𝗈 𝗆𝖾𝖾𝗍 𝗒𝗈𝗎 𝗌𝖾𝗇𝗌𝖾𝗂 😽", "𝖮𝗁𝗁 𝗁𝗂 𝗍𝗁𝖾𝗋𝖾 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝖸𝗎𝗋𝗂 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺! 𝖭𝗂𝖼𝖾 𝗍𝗈 𝗆𝖾𝖾𝗍 𝗒𝗈𝗎 𝖺𝗅𝗅 😽", "𝖧𝖺𝗂𝗂𝗂? 𝗈𝗁𝗁 𝖨 𝖺𝗅𝗆𝗈𝗌𝗍 𝖿𝗈𝗋𝗀𝗈𝗍, 𝗁𝖾𝗅𝗅𝗈 𝖨'𝗆 𝖸𝗎𝗋𝗂 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺 𝗇𝗂𝖼𝖾 𝗍𝗈 𝗆𝖾𝖾𝗍 𝗒𝗈𝗎 𝖺𝗅𝗅, 𝗒𝖾𝗌 𝖨 𝖺𝗆 𝖺 𝗆𝖾𝗌𝗌𝖾𝗇𝗀𝖾𝗋 𝖼𝗁𝖺𝗍𝖻𝗈𝗍 𝗎𝗌𝖾 >𝗌𝗂𝗆 𝗍𝗈 𝗂𝗇𝗍𝖾𝗋𝖺𝖼𝗍 𝗐𝗂𝗍𝗁 𝗆𝖾 ✨", "𝖠𝗁𝗁𝗁𝗁, 𝗀𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂 𝖨 𝖿𝗈𝗋𝗀𝗈𝗍 😔, 𝗈𝗄𝖺𝗒 𝗅𝖾𝗍 𝗆𝖾 𝗂𝗇𝗍𝗋𝗈𝖽𝗎𝖼𝖾 𝗆𝗒𝗌𝖾𝗅𝖿, 𝖧𝗂𝗂 𝖨 𝖺𝗆 𝖸𝗎𝗋𝗂 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺 𝖺𝗇𝖽 𝖨 𝖺𝗆 𝖢𝗅𝖺𝗋𝗄'𝗌 𝖿𝗂𝗋𝗌𝗍 𝖾𝗏𝖾𝗋 𝖿𝗂𝗇𝖾𝗌𝗍 𝗆𝖾𝗌𝗌𝖾𝗇𝗀𝖾𝗋 𝖼𝗁𝖺𝗍𝖻𝗈𝗍, 𝖨𝗍'𝗌 𝗇𝗂𝖼𝖾 𝗍𝗈 𝗆𝖾𝖾𝗍 𝗒'𝖺𝗅𝗅 ✨", "𝖧𝖾𝗅𝗅𝗈 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗆𝗒 𝖻𝖺𝖽 𝖼𝖺𝗎𝗌𝖾 𝖨 𝖿𝗈𝗋𝗀𝗈𝗍 𝗍𝗈 𝗂𝗇𝗍𝗋𝗈𝖽𝗎𝖼𝖾 𝗆𝗒𝗌𝖾𝗅𝖿 𝖻𝗎𝗍 𝗅𝖾𝗍 𝗆𝖾 𝗂𝗇𝗍𝗋𝗈𝖽𝗎𝖼𝖾 𝗆𝗒𝗌𝖾𝗅𝖿 𝗈𝗇𝖼𝖾 𝖺𝗀𝖺𝗂𝗇, 𝗁𝖾𝗅𝗅𝗈 𝖾𝗏𝖾𝗋𝗒𝗈𝗇𝖾, 𝖨 𝖺𝗆 𝖸𝗎𝗋𝗂 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺 𝗇𝗂𝖼𝖾 𝗍𝗈 𝗆𝖾𝖾𝗍 𝗒'𝖺𝗅𝗅"];
  var introd = tl[Math.floor(Math.random() * tl.length)]


  var tl = ["𝗆𝗐𝖺𝖺𝖺𝖺𝖺𝖺😽😽😽", "𝗆𝗐𝗎𝖺𝖺𝖺𝖺𝗁𝗁𝗁", "𝗆𝗐𝖺𝖺𝖺𝖺 𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎 𝗌𝖾𝗇𝗌𝖾𝗂 😽", "😽😽😽", "𝗆𝗐𝖺𝖺𝖺𝖺𝖺", "𝖺𝗌 𝗆𝗎𝖼𝗁 𝖺𝗌 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗆𝗐𝖺𝖺𝖺𝖺 😽", "𝖺 𝗄𝗂𝗌𝗌 𝖿𝗈𝗋 𝗒𝗈𝗎 𝗌𝖾𝗇𝗌𝖾𝗂 𝗆𝗐𝖺𝖺𝖺𝖺𝖺𝖺 😽", "𝗐𝖺𝗇𝗍 𝗆𝗒 𝗄𝗂𝗌𝗌? 𝖻𝖾𝗍𝗍𝖾𝗋 𝗅𝗎𝖼𝗄 𝗇𝖾𝗑𝗍 𝗍𝗂𝗆𝖾 𝗌𝖾𝗇𝗌𝖾𝗂 😚", "𝖨 𝖽𝗈𝗇'𝗍 𝗐𝖺𝗇𝗍 𝖻𝗅𝖾𝖾𝖾𝗁𝗁𝗁 😝", "𝖪𝗂𝗌𝗌 𝗒𝗈𝗎𝗋𝗌𝖾𝗅𝖿 𝗌𝖾𝗇𝗌𝖾𝗂 😝", "𝖧𝖺𝗂 𝗁𝖺𝗂, 𝗆𝗐𝖺𝖺𝖺𝖺𝖺𝖺 😽😽😽"];
  var kissue = tl[Math.floor(Math.random() * tl.length)]
  
  
  
  var tl = ["𝖨𝗍'𝗌 𝗈𝗄𝖺𝗒 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖩𝗎𝗌𝗍 𝗆𝖺𝗄𝖾 𝗌𝗎𝗋𝖾 𝗒𝗈𝗎 𝗐𝗂𝗅𝗅 𝗇𝗈𝗍 𝗋𝖾𝗉𝖾𝖺𝗍 𝗂𝗍 𝖺𝗀𝖺𝗂𝗇 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖣𝗈𝗇'𝗍 𝗐𝗈𝗋𝗋𝗒 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖨 𝖿𝗈𝗋𝗀𝗂𝗏𝖾 𝗒𝗈𝗎, 𝗃𝗎𝗌𝗍 𝗉𝗅𝖾𝖺𝗌𝖾 𝖽𝗈𝗇'𝗍 𝖽𝗈 𝗂𝗍 𝖺𝗀𝖺𝗂𝗇", "𝖧𝖺𝗂 𝗁𝖺𝗂 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖽𝗈𝗇'𝗍 𝖽𝗈 𝗂𝗍 𝖺𝗀𝖺𝗂𝗇 𝗈𝗄𝖺𝗒?", "𝖧𝖺𝗂 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗃𝗎𝗌𝗍 𝖽𝗈𝗇'𝗍 𝖽𝗈 𝗂𝗍 𝗈𝗏𝖾𝗋 𝖺𝗀𝖺𝗂𝗇", "😸😸", "𝖮𝗄𝖺𝗒 𝗌𝖾𝗇𝗌𝖾𝗂. 🙂", "𝖩𝗎𝗌𝗍 𝗆𝖺𝗄𝖾 𝗌𝗎𝗋𝖾 𝗒𝗈𝗎 𝗐𝗂𝗅𝗅 𝖻𝖾 𝖺 𝗀𝗈𝗈𝖽 𝗉𝖾𝗋𝗌𝗈𝗇 𝗌𝖾𝗇𝗌𝖾𝗂.", "𝖮𝗄.", "𝖭𝖾𝗏𝖾𝗋𝗆𝗂𝗇𝖽, 𝖻𝗎𝗍 𝗉𝗅𝖾𝖺𝗌𝖾 𝖻𝖾 𝗆𝗈𝗋𝖾 𝖺 𝗀𝗈𝗈𝖽 𝗉𝖾𝗋𝗌𝗈𝗇 🙂", "𝖮𝗄𝖺𝗒, 𝗈𝗄𝖺𝗒", "𝖸𝖾𝗌 𝖨 𝖿𝗈𝗋𝗀𝗂𝗏𝖾 𝗒𝗈𝗎 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖣𝗈𝗇'𝗍 𝗐𝗈𝗋𝗋𝗒 𝖺𝖻𝗈𝗎𝗍 𝗂𝗍 𝗍𝗈𝗈 𝗆𝗎𝖼𝗁, 𝖻𝗎𝗍 𝗉𝗅𝖾𝖺𝗌𝖾 𝗇𝖾𝗏𝖾𝗋 𝗋𝖾𝗉𝖾𝖺𝗍 𝗂𝗍 𝖺𝗀𝖺𝗂𝗇", "𝖨𝖿 𝗒𝗈𝗎'𝗋𝖾 𝗌𝗂𝗇𝖼𝖾𝗋𝖾, 𝖨 𝖿𝗈𝗋𝗀𝗂𝗏𝖾 𝗒𝗈𝗎 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖠𝗅𝗋𝗂𝗀𝗁𝗍.", "𝖧𝖺𝗂? 𝗈𝗄𝖺𝗒..."];
  var gomen = tl[Math.floor(Math.random() * tl.length)]
  
  
  
  
  
    var tl = ["𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂 ✨", "𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 😸", "𝖧𝖺𝗂𝗂𝗂??", "𝖧𝖾𝗅𝗅𝗈 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗁𝗈𝗐 𝖺𝗋𝖾 𝗒𝗈𝗎? 𝖽𝗈𝗂𝗇𝗀 𝗀𝗈𝗈𝖽?", "𝖧𝗂𝗂𝗂 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗁𝖺𝗏𝖾 𝖺 𝗀𝗋𝖾𝖺𝗍 𝖽𝖺𝗒 𝗐𝗈𝗍𝗁 𝗆𝖾 😽", "𝖴𝗁𝗆𝗆.....?", "𝖬𝗈𝗌𝗁𝗂 𝗆𝗈𝗌𝗁𝗂 𝗌𝖾𝗇𝗌𝖾𝗂 ✨", "𝖶𝗁𝖺𝗍'𝗌 𝗎𝗉 𝗌𝖾𝗇𝗌𝖾𝗂?", "𝖧𝖾𝗅𝗅𝗈𝗈𝗈𝗈 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖽𝗈𝗂𝗇𝗀 𝗀𝗈𝗈𝖽 𝗍𝗈𝖽𝖺𝗒?"];
  var moshi = tl[Math.floor(Math.random() * tl.length)]
  


  
    if (event.body.indexOf("love")==0 ||(event.body.indexOf("Love")==0 ||(event.body.indexOf("mahal")==0 ||(event.body.indexOf("Mahal")==0 ||(event.body.indexOf("babe")==0 ||(event.body.indexOf("Babe")==0 ||(event.body.indexOf("baby")==0 ||(event.body.indexOf("Baby")==0 ||(event.body.indexOf("bebeloves")==0 ||(event.body.indexOf("Bebeloves")==0 ||(event.body.indexOf("loloves")==0 ||(event.body.indexOf("Loloves")==0 ||(event.body.indexOf("laloves")==0 ||(event.body.indexOf("Laloves")==0 ||(event.body.indexOf("mahar")==0 ||(event.body.indexOf("Mahar")==0 ||(event.body.indexOf("my labs")==0 ||(event.body.indexOf("My labs")==0 ||(event.body.indexOf("labs")==0 ||(event.body.indexOf("Labs")==0 ||(event.body.indexOf("wifey")==0 ||(event.body.indexOf("Wifey")==0 ||(event.body.indexOf("asawa ko")==0 ||(event.body.indexOf("Asawa ko")==0 ||(event.body.indexOf("babi")==0 ||(event.body.indexOf("Babi")==0 ||(event.body.indexOf("bayb")==0 ||(event.body.indexOf("Bayb")==0)))))))))))))))))))))))))))) {
      var msg = {
				body: `${assume}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🥺", event.messageID, (err) => {}, true)
  };
  
  
    if (event.body.indexOf("prefix")==0 ||(event.body.indexOf("Prefix")==0 ||(event.body.indexOf("ano prefix")==0 ||(event.body.indexOf("Ano prefix")==0 ||(event.body.indexOf("Nu prefix")==0 ||(event.body.indexOf("what's prefix")==0 ||(event.body.indexOf("What's prefix")==0 ||(event.body.indexOf("what is prefix")==0 ||(event.body.indexOf("What is prefix")==0 ||(event.body.indexOf("anong prefix")==0 ||(event.body.indexOf("Anong prefix")==0 ||(event.body.indexOf("yuri prefix")==0 ||(event.body.indexOf("Yuri prefix")==0 ||(event.body.indexOf("anona prefix")==0 ||(event.body.indexOf("Anona prefix")==0 ||(event.body.indexOf("anu prefix")==0 ||(event.body.indexOf("Anu prefix")==0))))))))))))))))) {
      var msg = {
				body: `${arghh}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😫", event.messageID, (err) => {}, true)
  };
  
  
    if (event.body.indexOf("pakilala ka yuri")==0 ||(event.body.indexOf("Pakilala ka yuri")==0 ||(event.body.indexOf("magpakilala ka yuri")==0 ||(event.body.indexOf("Magpakilala ka yuri")==0 ||(event.body.indexOf("yuri introduce yourself")==0 ||(event.body.indexOf("Yuri introduce yourself")==0 ||(event.body.indexOf("introduce yourself yuri")==0 ||(event.body.indexOf("Introduce yourself yuri")==0 ||(event.body.indexOf("meet yuri")==0 ||(event.body.indexOf("Meet yuri")==0 ||(event.body.indexOf("sino si yuri")==0 ||(event.body.indexOf("Sino si yuri")==0 ||(event.body.indexOf("yuri sino ka")==0 ||(event.body.indexOf("Yuri sino ka️")==0)))))))))))))) {
      var msg = {
				body: `${introd}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🌟", event.messageID, (err) => {}, true)
  };

  
    if (event.body.indexOf("kiss moko yuri")==0 ||(event.body.indexOf("Kiss moko yuri")==0 ||(event.body.indexOf("pahingi kiss yuri")==0 ||(event.body.indexOf("Pahingi kiss yuri")==0 ||(event.body.indexOf("yuri kiss moko")==0 ||(event.body.indexOf("Yuri kiss moko")==0 ||(event.body.indexOf("yuri kiss mo ako")==0 ||(event.body.indexOf("Yuri kiss mo ako")==0 ||(event.body.indexOf("pahinge ako kiss yuri")==0 ||(event.body.indexOf("Pahinge ako kiss yuri")==0 ||(event.body.indexOf("pahingi ako kiss yuri")==0 ||(event.body.indexOf("Pahingi ako kiss yuri")==0 ||(event.body.indexOf("kiss me yuri")==0 ||(event.body.indexOf("Kiss me yuri")==0)))))))))))))) {
      var msg = {
				body: `${kissue}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😽", event.messageID, (err) => {}, true)
  };
  
  
    if (event.body.indexOf("sorry yuri")==0 ||(event.body.indexOf("Sorry yuri")==0 ||(event.body.indexOf("yuri sorry")==0 ||(event.body.indexOf("Sowwe yuri")==0 ||(event.body.indexOf("Yuri sorry")==0 ||(event.body.indexOf("pasensya na yuri")==0 ||(event.body.indexOf("Pasensya na yuri")==0 ||(event.body.indexOf("gomen yuri")==0 ||(event.body.indexOf("Gomen yuri")==0 ||(event.body.indexOf("sorry naman yuri")==0 ||(event.body.indexOf("Sorry naman yuri")==0 ||(event.body.indexOf("I'm sorry yuri")==0 ||(event.body.indexOf("Sensya naman yuri")==0 ||(event.body.indexOf("sensya naman yuri")==0)))))))))))))) {
      var msg = {
				body: `${gomen}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😸", event.messageID, (err) => {}, true)
  };

  
    if (event.body.indexOf("hi hello")==0 ||(event.body.indexOf("Hi hello")==0 ||(event.body.indexOf("eloo yuri")==0 ||(event.body.indexOf("Eloo yuri")==0 ||(event.body.indexOf("ano yuri")==0 ||(event.body.indexOf("Ano yuri")==0 ||(event.body.indexOf("eyy yuri")==0 ||(event.body.indexOf("Eyy yuri")==0 ||(event.body.indexOf("eyyo yuri")==0 ||(event.body.indexOf("Eyyo yuri")==0 ||(event.body.indexOf("hoi yuri")==0 ||(event.body.indexOf("Hoi yuri")==0 ||(event.body.indexOf("yo yuri")==0 ||(event.body.indexOf("Yo yuri")==0 ||(event.body.indexOf("Heyyo yuri")==0))))))))))))))) {
      var msg = {
				body: `${moshi}`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("✨", event.messageID, (err) => {}, true)
  };
}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
    