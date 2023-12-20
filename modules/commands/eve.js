module.exports.config = {
	name: "evening",
  version: "7.3.1",
	hasPermssion: 0,
	credits: "Réynél", 
	description: "no need prefix in this command the bot will automatically respond if you greet good evening",
	commandCategory: "auto-resp",
  usages: "[just say good evening]",
  cooldowns: 5, 
};

module.exports.handleEvent = async function({ api, event, client, Users, __GLOBAL }) {
	var { threadID, messageID } = event;
	var name = await Users.getNameUser(event.senderID);
	if (event.body.indexOf("good eve")==0 || event.body.indexOf("Good eve")==0 || event.body.indexOf("good Eve")==0 || event.body.indexOf("Good Eve")==0 || event.body.indexOf("eve")==0 || event.body.indexOf("Eve")==0 || event.body.indexOf("good evening")==0 || event.body.indexOf("Good evening")==0 || event.body.indexOf("g eve")==0 || event.body.indexOf("G eve")==0 ) { 
		var msg = {
				body: `𝖦𝗈𝗈𝖽 𝖾𝗏𝖾𝗇𝗂𝗇𝗀 𝗌𝖾𝗇𝗌𝖾𝗂 ${name}, 𝗁𝖺𝗏𝖾 𝖺 𝗀𝗋𝖾𝖺𝗍 𝗇𝗂𝗀𝗁𝗍 ❤️`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🌃", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
