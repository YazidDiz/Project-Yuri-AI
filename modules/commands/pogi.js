const fs = require("fs");
module.exports.config = {
	name: "pogi",
  version: "1.0.1",
	hasPermssion: 0,
	credits: "Réynél", 
	description: "just say pogi sige na",
	commandCategory: "noprefix",
	usages: "[pogi sige na]",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Pogi")==0 || event.body.indexOf("pogi")==0 || event.body.indexOf("Pogi sige na")==0 || event.body.indexOf("pogi sige na")==0) {
		var msg = {
				body: "𝗣𝗼𝗴𝗶 𝘀𝗶𝗴𝗲 𝗻𝗮 💵",
				attachment: fs.createReadStream(__dirname + `/noprefix/pogisige.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("💵", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

      }