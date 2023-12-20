module.exports.config = {
    name: "givename",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Réynél",
    description: "Predict the your gender based in your name.",
    commandCategory: "utilities",
    usages: "[name]",
    cooldowns: 2,
};
module.exports.run = async function({ api, event, args }) {
const axios = require("axios");
let { messageID, threadID, senderID, body } = event;
const response = args.join(" ");
if (!args[0]) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖺 𝗐𝗋𝗈𝗇𝗀 𝖿𝗈𝗋𝗆𝖺𝗍 𝗎𝗌𝖾 𝗈𝖿 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽... \n𝗨𝘀𝗲: "+global.config.PREFIX+this.config.name+" 𝗇𝖺𝗆𝖾", threadID, messageID);
try {
const res = await axios.get(`https://api.genderize.io?name=${response}`);
var respond = res.data.gender;
var respond1 = res.data.name;
var respond2 = res.data.probability;
api.sendMessage("𝗚𝗲𝗻𝗱𝗲𝗿: "+respond+"\n𝗡𝗮𝗺𝗲: "+respond1+"\n𝗣𝗿𝗼𝗯𝗮𝗯𝗶𝗹𝗶𝘁𝘆: "+respond2, threadID , messageID);
} catch (error) {
api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗆𝖺𝗄𝗂𝗇𝗀 𝗍𝗁𝖾 𝖠𝖯𝖨 𝗋𝖾𝗊𝗎𝖾𝗌𝗍.", threadID , messageID);
}
};