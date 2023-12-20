module.exports.config = {
name: "ss",
version: "1.0.0",
hasPermssion: 0,
credits: "Réynél",
description: "screenshot an link",
commandCategory: "tools",
usages: "[link]",
cooldowns: 1,

}; // credit for api: sensui

module.exports.run = async ({ api, event, args }) => {
const axios = require('axios');
const request = require('request');
const fs = require("fs");
const req = args[0];
if (!args[0]) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨 𝗇𝖾𝖾𝖽 𝖺𝗇 𝗅𝗂𝗇𝗄 𝗍𝗈 𝗌𝖼𝗋𝖾𝖾𝗇𝗌𝗁𝗈𝗍.", event.threadID, event.messageID);
axios.get(`https://sensui-useless-apis.codersensui.repl.co/api/tools/ss?url=${encodeURI(req)}`).then(res => {
let callback = function () {
api.sendMessage({
body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗋𝗒 𝗂𝗌: ${req}\n━━━━━━━━━━━━━━━━━━━\n❯ 𝖲𝖾𝗇𝗌𝖾𝗂 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 𝗌𝖼𝗋𝖾𝖾𝗇𝗌𝗁𝗈𝗍 𝗒𝗈𝗎'𝗏𝖾 𝗋𝖾𝗊𝗎𝖾𝗌𝗍𝖾𝖽:`,
attachment: fs.createReadStream(__dirname + `/cache/ss.jpeg`)
}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/ss.jpeg`), event.messageID);
};
request(res.data.image).pipe(fs.createWriteStream(__dirname + `/cache/ss.jpeg`)).on("close", callback);
})
  }