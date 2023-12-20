const fs = require("fs");
module.exports.config = {
	name: "nightdancer",
  version: "1.0.1",
	hasPermssion: 0,
	credits: "Réynél", 
	description: "just say Imase or nightdancer",
	commandCategory: "noprefix",
	usages: "[Nightdancer]",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Imase")==0 || event.body.indexOf("night dancer")==0 || event.body.indexOf("Night Dancer")==0 || event.body.indexOf("nightdancer")==0 || event.body.indexOf("Nightdancer")==0) {
		var msg = {
				body: "𝗜𝗺𝗮𝘀𝗲 '𝗡𝗶𝗴𝗵𝘁 𝗗𝗮𝗻𝗰𝗲𝗿' 𝗠𝗩\n01:23 ━━━━●───── 03:31\n⇆ㅤ ㅤ◁ㅤ ❚❚ ㅤ▷ ㅤㅤ↻﻿\n               ılıılıılıılıılıılı\nᴠᴏʟᴜᴍᴇ: ▮▮▮▮▮▮▮▮",
				attachment: fs.createReadStream(__dirname + `/noprefix/nightdancer.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🎧", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}