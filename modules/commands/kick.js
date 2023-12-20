module.exports.config = {
	name: "kick",
	version: "1.0.1", 
	hasPermssion: 1,
	credits: "Réynél",
	description: "kick out the person you need to remove from the group by mention",
	commandCategory: "admin", 
	usages: "[mention]", 
	cooldowns: 0,
};

module.exports.languages = {
	"vi": {
		"error": "Đã có lỗi xảy ra, vui lòng thử lại sau",
		"needPermssion": "Cần quyền quản trị viên nhóm\nVui lòng thêm và thử lại!",
		"missingTag": "Bạn phải tag người cần kick"
	},
	"en": {
		"error": "❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋",
		"needPermssion": "ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨 𝗇𝖾𝖾𝖽 𝗍𝗈 𝖻𝖾 𝗀𝗋𝗈𝗎𝗉 𝖺𝖽𝗆𝗂𝗇 𝖿𝗂𝗋𝗌𝗍!\n𝖯𝗅𝖾𝖺𝗌𝖾 𝖺𝖽𝖽 𝗆𝖾 𝖺𝗇𝖽 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇.",
		"missingTag": "ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎 𝗇𝖾𝖾𝖽 𝗍𝗈 𝗆𝖾𝗇𝗍𝗂𝗈𝗇 𝗌𝗈𝗆𝖾 𝗉𝖾𝗋𝗌𝗈𝗇 𝗍𝗈 𝗄𝗂𝖼𝗄."
	}
}

module.exports.run = async function({ api, event, getText, Threads }) {
	var mention = Object.keys(event.mentions);
	try {
		let dataThread = (await Threads.getData(event.threadID)).threadInfo;
		if (!dataThread.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage(getText("needPermssion"), event.threadID, event.messageID);
		if(!mention[0]) return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗍𝗈 𝗆𝖾𝗇𝗍𝗂𝗈𝗇 𝗍𝗁𝖾 𝗉𝖾𝗋𝗌𝗈𝗇 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗆𝖾 𝗍𝗈 𝗄𝗂𝖼𝗄.",event.threadID);
		if (dataThread.adminIDs.some(item => item.id == event.senderID)) {
			for (const o in mention) {
				setTimeout(() => {
					api.removeUserFromGroup(mention[o],event.threadID) 
				},3000)
			}
		}
	} catch { return api.sendMessage(getText("error"),event.threadID) }
}