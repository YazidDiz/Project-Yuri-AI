const fs = require("fs");
module.exports.config = {
	name: "birthday",
  version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél", 
	description: "no prefix auto bot greet happy birthday",
	commandCategory: "auto-resp",
	usages: "[just say happy birthday]",
    cooldowns: 1, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Happy Birthday")==0 || (event.body.indexOf("happy birthday")==0 || (event.body.indexOf("Happy bday")==0 || (event.body.indexOf("happy bday")==0 || (event.body.indexOf("hbd")==0 || (event.body.indexOf("Hbd")==0)))))) {
		var msg = {
				body: `.   　　　 ∩　 ∩
　　　 (๑＾◡＾๑)
┏♪━･━〇━･〇･━+━☆+━━┓\n🥳 | 𝖧𝖺𝗉𝗉𝗒 𝖻𝗂𝗋𝗍𝗁𝖽𝖺𝗒 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖿𝗋𝗈𝗆 𝗆𝖾 ${global.config.BOTNAME}, 𝖢𝗅𝖺𝗋𝗄 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺 𝖺𝗇𝖽 𝗒𝗈𝗎𝗋 𝖥𝖺𝗆𝗂𝗅𝗒 🎉🎉, 𝗆𝖺𝗒 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗍𝗁𝖾 𝖻𝖾𝗌𝗍 𝖽𝖺𝗒 𝖾𝗏𝖾𝗋, 𝗆𝗈𝗋𝖾 𝖻𝗂𝗋𝗍𝗁𝖽𝖺𝗒𝗌 🎂 𝗍𝗈 𝖼𝗈𝗆𝖾 𝗌𝖾𝗇𝗌𝖾𝗂 🥳🥳\n┗+☆+━･━･━ + ━･━━━♬━┛`,
				attachment: fs.createReadStream(__dirname + `/noprefix/birthday.gif`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}