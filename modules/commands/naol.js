const fs = require("fs");
module.exports.config = {
	name: "naol",
  version: "1.0.1",
	hasPermssion: 0,
	credits: "Réynél", 
	description: "no prefix needed, the bot will automatically respond to your message if it triggered the word",
	commandCategory: "auto-resp",
	usages: "[naol]",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("naol")==0 || event.body.indexOf("Naol")==0 || event.body.indexOf("sanaol")==0 || event.body.indexOf("Sanaol")==0 || event.body.indexOf("shabaok")==0 || event.body.indexOf("Shabaok")==0 || event.body.indexOf("sana all")==0 || event.body.indexOf("Sana all")==0 || event.body.indexOf("sanaall")==0 || event.body.indexOf("Sanaall")==0 || event.body.indexOf("sabaok")==0 || event.body.indexOf("Sabaok")==0) {
		var msg = {
				body: "█▀█\n░▄▀\n█▄▄",
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }