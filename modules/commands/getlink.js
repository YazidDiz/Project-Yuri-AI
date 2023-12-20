module.exports.config = {
	name: "getlink",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Get the URL Download from Video, Audio is sent from the group",
	commandCategory: "tools",
	usages: "[reply to image, vid, or sound]",
	cooldowns: 5,
};

module.exports.languages = {
	"vi": {
		"invaidFormat": "❌ Tin nhắn bạn phản hồi phải là một audio, video, ảnh nào đó"
	},
	"en": {
		"invaidFormat": "ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗇𝖾𝖾𝖽 𝗍𝗈 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗁𝖺𝗏𝖾 𝖼𝗈𝗇𝗍𝖺𝗂𝗇 𝖺𝗇 𝖺𝗎𝖽𝗂𝗈, 𝗏𝗂𝖽𝖾𝗈 𝗈𝗋 𝗉𝗂𝖼𝗍𝗎𝗋𝖾"
	}
}

module.exports.run = async ({ api, event, getText }) => {
	if (event.type !== "message_reply") return api.sendMessage(getText("invaidFormat"), event.threadID, event.messageID);
	if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage(getText("invaidFormat"), event.threadID, event.messageID);
	if (event.messageReply.attachments.length > 1) return api.sendMessage(getText("invaidFormat"), event.threadID, event.messageID);
	return api.sendMessage(event.messageReply.attachments[0].url, event.threadID, event.messageID);
}