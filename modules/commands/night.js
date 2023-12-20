module.exports.config = {
	name: "night",
  version: "7.3.1",
	hasPermssion: 0,
	credits: "Réynél", 
	description: "no prefix needed the bot will automatically respond",
	commandCategory: "auto-resp",
  usages: "[just say good night]",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, Users, __GLOBAL }) {
	var { threadID, messageID } = event;
  var name = await Users.getNameUser(event.senderID);
	if (event.body.indexOf("good night")==0 || event.body.indexOf("Good night")==0 || event.body.indexOf("good Night")==0 || event.body.indexOf("Good Night")==0 || event.body.indexOf("night")==0 || event.body.indexOf("Night")==0 || event.body.indexOf("nyt")==0 || event.body.indexOf("Nyt")==0 || event.body.indexOf("gomornight")==0 || event.body.indexOf("Gomornight")==0 || event.body.indexOf("g night")==0 || event.body.indexOf("G night")==0 ) { 
		var msg = {
				body: `🌃 | 𝖦𝗈𝗈𝖽 𝖭𝗂𝗀𝗁𝗍 𝗌𝖾𝗇𝗌𝖾𝗂 ${name}, 𝖽𝗈𝗇'𝗍 𝖿𝗈𝗋𝗀𝖾𝗍 𝗍𝗈 𝗉𝗋𝖺𝗒 𝖻𝖾𝖿𝗈𝗋𝖾 𝗒𝗈𝗎 𝗌𝗅𝖾𝖾𝗉 𝗈𝗄𝖺𝗒, 𝗌𝗅𝖾𝖾𝗉 𝗐𝖾𝗅𝗅 𝖺𝗇𝖽 𝗌𝗐𝖾𝖾𝗍 𝖽𝗋𝖾𝖺𝗆𝗌, 𝗁𝖺𝗏𝖾 𝖺 𝗀𝗋𝖾𝖺𝗍 𝗇𝗂𝗀𝗁𝗍 𝗌𝖾𝗇𝗌𝖾𝗂 ❤️`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🌃", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
