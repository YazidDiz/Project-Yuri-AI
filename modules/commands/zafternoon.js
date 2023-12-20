module.exports.config = {
	name: "afternoon",
  version: "7.3.1",
	hasPermssion: 0,
	credits: "Réynél", 
	description: "Just Respond",
	commandCategory: "auto-resp",
  usages: "[greet good aftie]",
  cooldowns: 5, 
};

module.exports.handleEvent = async function({ api, event, client, Users, __GLOBAL }) {
	var { threadID, messageID } = event;
	var name = await Users.getNameUser(event.senderID);
	if (event.body.indexOf("good afternoon")==0 || event.body.indexOf("Good afternoon")==0 || event.body.indexOf("good Afternoon")==0 || event.body.indexOf("Good Afternoon")==0 || event.body.indexOf("afternoon")==0 || event.body.indexOf("Afternoon")==0 || event.body.indexOf("magandang hapon")==0 || event.body.indexOf("Magandang hapon")==0 || event.body.indexOf("G afternoon")==0 || event.body.indexOf("g afternoon")==0 ) { 
		var msg = {
				body: `☀ | 𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂 ${name} 𝗀𝗈𝗈𝖽 𝖺𝖿𝗍𝖾𝗋𝗇𝗈𝗈𝗇 ❤️`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("❤️", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
