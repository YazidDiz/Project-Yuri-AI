const fs = require("fs");
const axios = require("axios")
module.exports.config = {
	name: "groupimage",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "Réynél",
	description: "Change your group image",
	commandCategory: "group", 
	usages: "[reply to image]", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async ({ api, event }) => {
	if (event.type !== "message_reply") return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝟣 𝗉𝗁𝗈𝗍𝗈 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗎𝗌𝖾 𝖺𝗌 𝖺 𝗇𝖾𝗐 𝗀𝗋𝗈𝗎𝗉 𝗂𝗆𝖺𝗀𝖾.", event.threadID, event.messageID);
	if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗎, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗍𝗈 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝖺 𝗉𝗁𝗈𝗍𝗈.", event.threadID, event.messageID);
	if (event.messageReply.attachments.length > 1) return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝖺 𝟣 𝗉𝗁𝗈𝗍𝗈.`, event.threadID, event.messageID);
	var abc = event.messageReply.attachments[0].url
	let pathImg = __dirname + '/cache/loz.png';
    let getdata = (await axios.get(`${abc}`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(pathImg, Buffer.from(getdata, 'utf-8'));
    return api.changeGroupImage(fs.createReadStream(__dirname + '/cache/loz.png'), event.threadID, () => fs.unlinkSync(pathImg), event.messageID);
  }