const axios = require("axios");
const fs = require('fs');
const path = require('path');
 
module.exports.config = {
    name: "zedge",
    version: "1.0.0",
    hasPermssion: 0, //1 admin default note: you make it 0 
    credits: "Clark",
    description: "",
    commandCategory: "searches",
    cooldowns: 5,
};
 
module.exports.run = async function({ api, event, args, commandModules, prefix }) {
    const query = args.join(" ");
 
    if (!query) {
        api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗊𝗎𝖾𝗋𝗒...", event.threadID, event.messageID);
        return;
    }
 
    api.sendMessage("🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝗂𝗆𝖺𝗀𝖾, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", event.threadID).then(async (messageInfo) => {
        try {
            const res = await axios.get(`https://api.easy0.repl.co/api/zedge?s=${query}`);
            const imgUrls = res.data.data;
            const imgCount = imgUrls.length;
 
            if (imgCount === 0) {
                api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗂𝗆𝖺𝗀𝖾 𝗋𝖾𝗌𝗎𝗅𝗍𝗌 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 《${query}》`, event.threadID, event.messageID);
                return;
            }
 
            const randomIndices = getRandomIndices(imgCount, Math.min(10, imgCount));
            const attachments = [];
 
            for (let i = 0; i < randomIndices.length; i++) {
                const index = randomIndices[i];
                const url = imgUrls[index];
                const imageResponse = await axios.get(url, { responseType: "arraybuffer" });
                const imagePath = path.join(__dirname, 'cache', `zedge_${i}.png`);
                fs.writeFileSync(imagePath, Buffer.from(imageResponse.data));
                attachments.push(fs.createReadStream(imagePath));
            }
 
            api.sendMessage({
                body: `🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝗂𝗌 𝗂𝗌 𝗍𝗁𝖾 𝟣𝟢 𝗋𝖺𝗇𝖽𝗈𝗆 𝖨𝗆𝖺𝗀𝖾 𝖱𝖾𝗌𝗎𝗅𝗍: \nℹ️ | 𝖳𝗈𝗍𝖺𝗅 𝖱𝖾𝗌𝗎𝗅𝗍 𝗈𝖿 《${imgCount}》`,
                attachment: attachments,
            }, event.threadID, (err, msgInfo) => {
                if (!err) {
                    api.unsendMessage(messageInfo.messageID);
                } else {
                    console.error(err);
                }
            });
        } catch (error) {
            console.error(error);
        }
    });
};
function getRandomIndices(max, count) {
    const indices = Array.from({ length: max }, (_, i) => i);
    for (let i = max - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices.slice(0, count);
}