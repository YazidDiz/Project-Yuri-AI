const fs = require("fs");
module.exports.config = {
	name: "fyt",
  version: "1.0.1",
	hasPermssion: 0,
	credits: "Réynél", 
	description: "automatically bot reponse when you said f*ck you",
	commandCategory: "auto-resp",
	usages: "[just say badwords like f**k you]",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("fuck")==0 || event.body.indexOf("Fuck")==0 || event.body.indexOf("fuck you")==0 || event.body.indexOf("Fuck you")==0 || event.body.indexOf("pakyu")==0 || event.body.indexOf("Pakyu")==0 || event.body.indexOf("pak you")==0 || event.body.indexOf("Pak you")==0 || event.body.indexOf("pak u")==0 || event.body.indexOf("Pak u")==0 || event.body.indexOf("pak yu")==0 || event.body.indexOf("Pak yu")==0) {
		var msg = {
				body: "𝖥𝗎́𝖼𝗄 𝗒𝗈́𝗎 𝗍𝗈𝗈 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗅𝖾𝖺𝗋𝗇 𝗍𝗈 𝗌𝗁𝗎́𝗍 𝗍𝗁𝖾 𝖿𝗎́𝖼𝗄 𝗎𝗉 𝗈𝗄𝖺𝗒 👌",
				attachment: fs.createReadStream(__dirname + `/noprefix/fuck.gif`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }