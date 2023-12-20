module.exports.config = {
	name: "groupname",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "Réynél",
	description: "Rename your group",
	commandCategory: "group", 
	usages: "[name]", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args }) {
	var name = args.join(" ")
	if (!name) api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗇𝗈𝗍 𝖾𝗇𝗍𝖾𝗋𝖾𝖽 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝗇𝖺𝗆𝖾 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖼𝗁𝖺𝗇𝗀𝖾.", event.threadID, event.messageID)
	else api.setTitle(name, event.threadID, () => api.sendMessage(`🔨 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖼𝗁𝖺𝗇𝗀𝖾𝖽 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝗇𝖺𝗆𝖾 𝗍𝗈: ${name}`, event.threadID, event.messageID));
}
