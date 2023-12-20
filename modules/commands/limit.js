const fs = require("fs");
module.exports.config = {
	name: "shutup",
  version: "1.0.1",
	hasPermssion: 0,
	credits: "Réynél", 
	description: "just say Shut up",
	commandCategory: "noprefix",
	usages: "[Shut up]",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Shut up")==0 || event.body.indexOf("shut up")==0 || event.body.indexOf("Shut Up")==0 || event.body.indexOf("SHUT UP")==0 || event.body.indexOf("SHUTUP")==0 || event.body.indexOf("shutup")==0 || event.body.indexOf("shut Up")==0 || event.body.indexOf("Manahimik")==0 || event.body.indexOf("manahimik")==0 || event.body.indexOf("MANAHIMIK")==0 || event.body.indexOf("tumahimik")==0 || event.body.indexOf("Tumahimik")==0 || event.body.indexOf("TUMAHIMIK")==0) {
		var msg = {
				body: "𝗟𝗜𝗠𝗜𝗧 𝗥𝗘𝗔𝗖𝗛𝗘𝗗!!!",
				attachment: fs.createReadStream(__dirname + `/noprefix/limit.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("❗", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

      }