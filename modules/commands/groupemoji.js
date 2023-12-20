module.exports.config = {
	name: "groupemoji",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "Réynél",
	description: "Change your group Emoji",
	commandCategory: "group", 
	usages: "[name]", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args }) {
	var emoji = args.join(" ")
	if (!emoji) api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗇𝗈𝗍 𝖾𝗇𝗍𝖾𝗋𝖾𝖽 𝖾𝗆𝗈𝗃𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝖾𝗆𝗈𝗃𝗂 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖼𝗁𝖺𝗇𝗀𝖾 𝗂𝗇 𝗋𝗁𝖾 𝖼𝗎𝗋𝗋𝖾𝗇𝗍 𝖾𝗆𝗈𝗃𝗂.", event.threadID, event.messageID)
	else api.changeThreadEmoji(emoji, event.threadID, () => api.sendMessage(`🔨 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖼𝗁𝖺𝗇𝗀𝖾𝖽 𝖾𝗆𝗈𝗃𝗂 𝖺𝗌 𝗒𝗈𝗎 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝖾𝖽 𝗍𝗈: ${emoji}`, event.threadID, event.messageID));
}