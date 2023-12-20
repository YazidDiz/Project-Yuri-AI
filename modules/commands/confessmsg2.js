module.exports.config = {
name: "confessmsg2",
version: "1.0.0",
hasPermssion: 0,
credits: "Réynél",
description: "Confess to someone",
commandCategory: "confess",
usages: "[fb url or uid | message]",
cooldowns: 0
};

module['exports']['run'] = async function({ api, event, args }) {

async function r(m){
api.sendMessage(m, event.threadID, event.messageID)
}


const y = args.join(" ").split("|").map(item => item = item.trim());

var t = y[0]
var t2 = y[1]

if(!args[0] || !t) return r("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗆𝗂𝗌𝗌𝗂𝗇𝗀 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝗎𝗋𝗅 𝗈𝗋 𝗎𝗂𝖽");
if(!t2) return r("❎ | 𝖬𝗂𝗌𝗌𝗂𝗇𝗀 𝗆𝖾𝗌𝗌𝖺𝗀𝖾");
try {
if(t.startsWith("https://facebook.com")){
  const res = await api.getUID(t)
  var k = res
} else {
  var k = t
}
api.sendMessage(`󰟫╭ 𝗬𝗼𝘂'𝘃𝗲 𝗴𝗼𝘁 𝗮 𝗺𝗲𝘀𝘀𝗮𝗴𝗲
 
󰥴 : ${t2}
━━━━━━━━━━━━━━━━━━━
• :𝖽𝗈𝗇'𝗍 𝖻𝗈𝗍𝗁𝖾𝗋 𝗆𝖾 𝗍𝗈 𝖺𝗌𝗄 𝗐𝗁𝗈'𝗌 𝗍𝗁𝖾 𝗌𝖾𝗇𝖽𝖾𝗋‚ 𝗒𝗈𝗎'𝗋𝖾 𝗃𝗎𝗌𝗍 𝗐𝖺𝗌𝗍𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗍𝗂𝗆𝖾 (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)`, k, () => r("✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖼𝗈𝗇𝖿𝖾𝗌𝗌𝗂𝗈𝗇 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗌𝖾𝗇𝗍 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒!"))
} catch (err) {
r("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗒𝗈𝗎𝗋 𝖼𝗈𝗇𝖿𝖾𝗌𝗌𝗂𝗈𝗇 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗌𝖾𝗇𝖽, 𝖨 𝗍𝗁𝗂𝗇𝗄 𝗂𝗍'𝗌 𝗍𝗂𝗆𝖾 𝗍𝗈 𝖼𝗁𝖺𝗍 𝗍𝗁𝖺𝗍 𝗉𝖾𝗋𝗌𝗈𝗇 𝖺𝗇𝖽 𝖼𝗈𝗇𝖿𝖾𝗌𝗌 𝗒𝗈𝗎𝗋 𝖿𝖾𝖾𝗅𝗂𝗇𝗀𝗌 (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)")
   };
  }