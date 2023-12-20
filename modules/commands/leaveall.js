module.exports.config = {
	name: "leaveall",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Réynél",
	description: "leave to all threads",
	commandCategory: "admin",
	usages: "[leaveall]",
	cooldowns: 5,
	info: [
		{
			key: "Text",
			prompt: "leave all the thread",
			type: 'Document',
			example: 'ᴏᴜᴛᴀʟʟ'
		}
	]
};

module.exports.run = async ({ api, event, args }) => {
	return api.getThreadList(100, null, ["INBOX"], (err, list) => {
		if (err) throw err;
		list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ? api.removeUserFromGroup(api.getCurrentUserID(), item.threadID) : '');
		api.sendMessage('✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗅𝖾𝖺𝗏𝖾𝖽 𝖺𝗅𝗅 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉𝗌 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒.', event.threadID);
	});
}