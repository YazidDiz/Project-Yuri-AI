const fs = require("fs");
module.exports.config = {
	name: "owishiminecraft",
  version: "1.0.1",
	hasPermssion: 0,
	credits: "Réynél", 
	description: "just say minecraft",
	commandCategory: "noprefix",
	usages: "[minecraft]",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("owishi minecraft")==0 || event.body.indexOf("Owishi minecraft")==0 || event.body.indexOf("minecraft")==0 || event.body.indexOf("Minecraft")==0 || event.body.indexOf("owishiminecraft")==0 || event.body.indexOf("Owishiminecraft")==0) {
		var msg = {
				body: "𝖮𝗐𝗂𝗌𝗁𝗂𝗂𝗂 𝖬𝗂𝗇𝖾𝖼𝗋𝖺𝖿𝗍",
				attachment: fs.createReadStream(__dirname + `/noprefix/minecraft.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("✨", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}