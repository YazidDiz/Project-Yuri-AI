module.exports.config = {
	name: "morning",
  version: "7.3.1",
	hasPermssion: 0,
	credits: "Réynél", 
	description: "no need prefix the bot will automatically respond to your message",
	commandCategory: "auto-resp",
  cooldowns: 5, 
};

module.exports.handleEvent = async function({ api, event, client, Users, __GLOBAL }) {
	var { threadID, messageID } = event;
	var name = await Users.getNameUser(event.senderID);
	if (event.body.indexOf("good morning")==0 || event.body.indexOf("Good morning")==0 || event.body.indexOf("good Morning")==0 || event.body.indexOf("Good Morning")==0 || event.body.indexOf("morning")==0 || event.body.indexOf("Morning")==0 || event.body.indexOf("Ohayoguzaimashita")==0 || event.body.indexOf("ohayo")==0 || event.body.indexOf("gomorning")==0 || event.body.indexOf("Gomorning")==0 ) { 
		var msg = {
				body: `⛅ | 𝖦𝗈𝗈𝖽 𝖬𝗈𝗋𝗇𝗂𝗇𝗀 𝖲𝖾𝗇𝗌𝖾𝗂 ${name}, 𝗁𝗈𝗉𝖾 𝗒𝗈𝗎'𝗅𝗅 𝗁𝖺𝗏𝖾 𝖺 𝗀𝗋𝖾𝖺𝗍 𝖽𝖺𝗒! ❤️`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("⛅", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
