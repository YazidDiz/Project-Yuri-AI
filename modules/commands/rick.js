const fs = require("fs");
module.exports.config = {
	name: "rick",
  version: "1.0.1",
	hasPermssion: 0,
	credits: "Réynél", 
	description: "just say rick",
	commandCategory: "noprefix",
	usages: "[rick]",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("rickroll")==0 || event.body.indexOf("Rickroll")==0 || event.body.indexOf("rick")==0 || event.body.indexOf("Rick")==0 || event.body.indexOf("RICK")==0) {
		var msg = {
				body: "𝗬𝗢𝗨 𝗚𝗢𝗧 𝗥𝗜𝗖𝗞𝗥𝗢𝗟𝗟𝗘𝗗!",
				attachment: fs.createReadStream(__dirname + `/noprefix/rick.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😼", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

      }