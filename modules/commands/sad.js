const fs = require("fs");
module.exports.config = {
	name: "sad",
  version: "1.1.1",
	hasPermssion: 0,
	credits: "Réynél", 
	description: "no need prefix the bot will auto respond like cheer up",
	commandCategory: "auto-resp",
  usages: "[auto cheer up]",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("sakit") || react.includes("Sakit") || react.includes("saket") || react.includes("Saket") || react.includes("peyn") || react.includes("Peyn") || react.includes("Pain") || react.includes("mamatay") || react.includes("Mamatay") || react.includes("ayaw ko na") || react.includes("Ayaw ko na") || react.includes("saktan") || react.includes("Saktan") || react.includes("Sasaktan") || react.includes("sasaktan") || react.includes("sad") || react.includes("Sad") || react.includes("malungkot") || react.includes("Malungkot") || react.includes("😥") || react.includes("😰") || react.includes("😨") || react.includes("😢") || react.includes(":(") || react.includes("😔") || react.includes("😞") || react.includes("depress") || react.includes("stress") || react.includes("Stress") || react.includes("Depress") || react.includes("depression") || react.includes("Depression") || react.includes("kalungkutan") || react.includes("Kalungkutan") || react.includes("😭")) {
		var msg = {
				body: "𝖮𝗁𝗁, 𝗁𝖾𝗒 𝗍𝗁𝖾𝗋𝖾 𝗌𝖾𝗇𝗌𝖾𝗂! 𝖽𝗈𝗇'𝗍 𝖻𝖾 𝗌𝖺𝖽 𝗈𝗄𝖺𝗒, 𝗇𝗈 𝗆𝖺𝗍𝗍𝖾𝗋 𝗂𝗍 𝗁𝗎𝗋𝗍𝗌 𝗃𝗎𝗌𝗍 𝖺𝖼𝖼𝖾𝗉𝗍 𝗂𝗍, 𝖨'𝗆 𝖺𝗅𝗐𝖺𝗒𝗌 𝗁𝖾𝗋𝖾 𝖿𝗈𝗋 𝗒𝗈𝗎 𝗌𝖾𝗇𝗌𝖾𝗂 𝗌𝗈 𝖽𝗈𝗇'𝗍 𝖻𝖾 𝗌𝖺𝖽 𝗈𝗄𝖺𝗒, 𝖼𝗁𝖾𝖾𝗋 𝗎𝗉! 𝖺𝗇𝖽 𝗍𝗁𝗂𝗇𝗄 𝗉𝗈𝗌𝗂𝗍𝗂𝗏𝖾 𝗂𝗇𝗌𝗍𝖾𝖺𝖽 💛💛"
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😿", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }