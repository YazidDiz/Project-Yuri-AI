module.exports.config = {
	name: "setprefix",
	version: "1.0.1",
	hasPermssion: 2,
	credits: "Réynél",
	description: "Reset group prefix",
	commandCategory: "admin",
	usages: "[prefix/reset]",
	cooldowns: 5
};

module.exports.languages ={
	"vi": {
		"successChange": "Đã chuyển đổi prefix của nhóm thành: %1",
		"missingInput": "Phần prefix cần đặt không được để trống",
		"resetPrefix": "Đã reset prefix về mặc định: %1",
		"confirmChange": "Bạn có chắc bạn muốn đổi prefix của nhóm thành: %1"
	},
	"en": {
		"successChange": "✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖼𝗁𝖺𝗇𝗀𝖾𝖽 𝗍𝗁𝖾 𝗉𝗋𝖾𝖿𝗂𝗑 𝗂𝗇𝗍𝗈 《%1》",
		"missingInput": "ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗉𝗋𝖾𝖿𝗂𝗑 𝖼𝖺𝗇𝗇𝗈𝗍 𝖻𝖾 𝖻𝗅𝖺𝗇𝗄.",
		"resetPrefix": "✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗋𝖾𝗌𝖾𝗍 𝗍𝗁𝖾 𝗉𝗋𝖾𝖿𝗂𝗑 𝗍𝗈 《%1》",
		"confirmChange": "⏳ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖺𝗋𝖾 𝗒𝗈𝗎 𝗌𝗎𝗋𝖾 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖼𝗁𝖺𝗇𝗀𝖾 𝗆𝗒 𝗉𝗋𝖾𝖿𝗂𝗑 𝗂𝗇𝗍𝗈 《%1》"
	}
}

module.exports.handleReaction = async function({ api, event, Threads, handleReaction, getText }) {
	try {
		if (event.userID != handleReaction.author) return;
		const { threadID, messageID } = event;
		var data = (await Threads.getData(String(threadID))).data || {};
		data["PREFIX"] = handleReaction.PREFIX;
		await Threads.setData(threadID, { data });
		await global.data.threadData.set(String(threadID), data);
		api.unsendMessage(handleReaction.messageID);
		return api.sendMessage(getText("successChange", handleReaction.PREFIX), threadID, messageID);
	} catch (e) { return console.log(e) }
}

module.exports.run = async ({ api, event, args, Threads , getText }) => {
	if (typeof args[0] == "undefined") return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);
	let prefix = args[0].trim();
	if (!prefix) return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);
	if (prefix == "reset") {
		var data = (await Threads.getData(event.threadID)).data || {};
		data["PREFIX"] = global.config.PREFIX;
		await Threads.setData(event.threadID, { data });
		await global.data.threadData.set(String(event.threadID), data);
		return api.sendMessage(getText("resetPrefix", global.config.PREFIX), event.threadID, event.messageID);
	} else return api.sendMessage(getText("confirmChange", prefix), event.threadID, (error, info) => {
		global.client.handleReaction.push({
			name: "setprefix",
			messageID: info.messageID,
			author: event.senderID,
			PREFIX: prefix
		})
	})
}