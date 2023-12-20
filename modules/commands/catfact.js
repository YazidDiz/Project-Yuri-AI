module.exports.config = {
    name: "catfact",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Réynél",
    description: "Random Cat Fact",
    commandCategory: "facts",
    usages: "[catfact]",
    cooldowns: 2,
};
module.exports.run = async function({ api, event, args }) {
const axios = require("axios");
let { messageID, threadID, senderID, body } = event;
const response = args.join(" ");
try {
const res = await axios.get(`https://catfact.ninja/fact`);
var respond = res.data.fact;
api.sendMessage("🌟 | 𝗖𝗮𝘁 𝗙𝗮𝗰𝘁𝘀:\n "+respond, threadID , messageID);
} catch (error) {
api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗆𝖺𝗄𝗂𝗇𝗀 𝗍𝗁𝖾 𝖠𝖯𝖨 𝗋𝖾𝗊𝗎𝖾𝗌𝗍.", threadID , messageID);
}
};