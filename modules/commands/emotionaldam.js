const fs = require("fs");
module.exports.config = {
	name: "emotionaldamage",
  version: "1.0.1",
	hasPermssion: 0,
	credits: "Réynél", 
	description: "just say emotional damage",
	commandCategory: "auto-resp",
	usages: "[emotional damage]",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("emotional damage")==0 || event.body.indexOf("emotional Damage")==0 || event.body.indexOf("Emotional damage")==0 || event.body.indexOf("Emotional Damage")==0 || event.body.indexOf("EMOTIONAL DAMAGE")==0) {
		var msg = {
				body: "𝗘𝗠𝗢𝗧𝗜𝗢𝗡𝗔𝗟 𝗗𝗔𝗠𝗔𝗚𝗘!!",
				attachment: fs.createReadStream(__dirname + `/noprefix/emotionaldamage.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🍂", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }