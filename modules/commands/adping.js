module.exports.config = {
    name: "adping",
    version: "1.0.5",
    hasPermssion: 2,
    credits: "Réynél",
    description: "uptime your bot",
    usages: "[url (ex: https://example.repl.co/)]",
    commandCategory: "monitor",
    cooldowns: 2,
};
module.exports.run = async function ({ api, event, args }) {
  const a = require("axios")
let url = args[0]
function r(msg){
  api.sendMessage(msg, event.threadID, event.messageID)
}
if (!url) return r("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗆𝗂𝗌𝗌𝗂𝗇𝗀 𝖴𝖱𝖫\n𝗨𝘀𝗲: "+this.config.name+" "+this.config.usages);
if (!url.startsWith("https://")) return r("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖴𝖱𝖫 𝗂𝗌 𝗋𝖾𝗊𝗎𝗂𝗋𝖾𝖽 𝗍𝗈 𝗌𝗍𝖺𝗋𝗍 𝗐𝗂𝗍𝗁 𝗁𝗍𝗍𝗉𝗌://")
const rrr = await a.get("https://ping.ainz-sama101.repl.co/ping?url="+url);
var re = rr.data.message;
r(re)
  }