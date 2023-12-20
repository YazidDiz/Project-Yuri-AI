module.exports.config = {
	name: "deletethread",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Réynél",
	description: "delete a thread(group)",
	commandCategory: "facebook",
	usages: "[group ID]",
	cooldowns: 5,
	info: [
		{
			key: "Text",
			prompt: "ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝖨𝖣 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖽𝖾𝗅𝖾𝗍𝖾",
			type: 'Document',
			example: '𝖣𝖾𝗅𝖾𝗍𝖾𝗍𝗁𝗋𝖾𝖺𝖽 《𝖦𝗋𝗈𝗎𝗉 𝖨𝖣》'
		}
	]
};

module.exports.run = async ({ api, event, args }) => {
	return api.getThreadList(100, null, ["INBOX"], (err, list) => {
		if (err) throw err;
		list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ? api.deleteThread(item.threadID) : '');
		api.sendMessage('✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝖺𝗅𝗅 𝗈𝖿 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌.', event.threadID);
	});
    }