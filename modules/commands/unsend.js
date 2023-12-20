module.exports.config = {
	name: "unsend",
	version: "1.0.0", 
	hasPermssion: 2,
	credits: "Réynél",
	description: "Remove Bot's messages",
	commandCategory: "admin", 
	usages: "[reply to bot message]", 
	cooldowns: 0,
	dependencies: [] 
};
module.exports.languages = { "vi": 
   { "unsendErr1": "Không thể gỡ tin nhắn của người khác.",
 "unsendErr2": "Hãy reply tin nhắn cần gỡ." }, 
"en": { "unsendErr1": "❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖨 𝖼𝖺𝗇'𝗍 𝗎𝗇𝗌𝖾𝗇𝖽 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝖿𝗋𝗈𝗆 𝗈𝗍𝗁𝖾𝗋 𝗎𝗌𝖾𝗋.",
        "unsendErr2": "ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 “𝗎𝗇𝗌𝖾𝗇𝖽” 𝗍𝗈 𝗆𝗒 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗆𝖾 𝗍𝗈 𝗎𝗇𝗌𝖾𝗇𝖽." } }
module.exports.run = async function({ api, event, args, Users }) {
	if (event.messageReply.senderID != api.getCurrentUserID()) return api.sendMessage(getText('unsendErr1'), event.threadID, event.messageID);
			if (event.type != "message_reply") return api.sendMessage(getText('unsendErr2'), event.threadID, event.messageID);
			return api.unsendMessage(event.messageReply.messageID, err => (err) ? api.sendMessage(getText('error'), event.threadID, event.messageID) : '');
    }