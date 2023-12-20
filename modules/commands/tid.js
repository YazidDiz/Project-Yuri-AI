module.exports.config = {
	name: "tid",	
  version: "1.0.0", 
	hasPermssion: 0,
	credits: "Réynél",
	description: "Get the group id", 
	commandCategory: "group",
	usages: "[tid]",
	cooldowns: 5, 
	dependencies: '',
};

module.exports.run = async function({ api, event }) {
  api.sendMessage("🆔 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝖨𝖣 𝗈𝖿 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉 𝗂𝗌:\n\n"+event.threadID, event.threadID, event.messageID);
};