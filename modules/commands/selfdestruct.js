module.exports.config = {
  name: "selfdestruct",
	version: "1.2.1",
	hasPermssion: 2,
	credits: "Réynél",
	description: "the bot will spam messages until it gets banned, not recommended to use",
	commandCategory: "system",
	usages: "[selfdestruct]",
	cooldowns: 5,
	dependencies: "",
};

module.exports.run = function ({ api, event, Users }) {
	var { threadID, messageID } = event;
	var k = function (k) { api.sendMessage(k, threadID)};

	//*vonglap
	
for (i = 0; i < 200; i++) {
 k("𝖨𝗍'𝗌 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋 𝖿𝖺𝗎𝗅𝗍 😿");
}
	
	}
	