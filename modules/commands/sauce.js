module.exports.config = {
	name: "sauce",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Clark",
	description: "Search image information through images (anime and hentai only)",
	commandCategory: "anime",
	cooldowns: 5,
	dependencies: {
		"sagiri": "",
		"axios": ""
	},
	envConfig: {
		"SAUCENAO_API": "a2430f4a078a4782540142bfad2551f3384bd20f"
	}
};

module.exports.languages = {
	"vi": {
		"missingReply": "Vui lòng bạn reply bức ảnh cần phải tìm!",
		"donthave": "Không có",
		"dontknow": "Không biết",
		"returnResult": "Đây là kết quả tìm kiếm được\n-------------------------\n- Độ tương tự: %1%\n- Material: %2\n- Nhân vật: %3\n- Tác giả: %4\n- Trang web phát hành: %5 - %6",
		"returnNull": "Không thấy kết quả nào trùng với ảnh bạn đang tìm kiếm :'("
	},
	"en": {
		"missingReply": "ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗋𝖾𝗉𝗅𝗒 𝗍𝗁𝖾 𝗉𝗂𝖼𝗍𝗎𝗋𝖾 𝗍𝗁𝖺𝗍 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖿𝗂𝗇𝖽!",
		"donthave": "𝖣𝗈𝗇'𝗍 𝗁𝖺𝗏𝖾",
		"dontknow": "𝖴𝗇𝗄𝗇𝗈𝗐𝗇",
		"returnResult": "𝖳𝗁𝗂𝗌 𝗂𝗌 𝗋𝖾𝗌𝗎𝗅𝗍 \n-------------------------\n- 𝗦𝗶𝗺𝗶𝗹𝗮𝗿 𝗽𝗲𝗿𝗰𝗲𝗻𝘁𝗮𝗴𝗲: %1%\n- 𝗠𝗮𝘁𝗲𝗿𝗶𝗮𝗹: %2\n- 𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿𝘀: %3\n- 𝗔𝘂𝘁𝗵𝗼𝗿: %4\n- 𝗥𝗲𝗹𝗲𝗮𝘀𝗲 𝘄𝗲𝗯: %5 - %6",
		"returnNull": "❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗍𝗁𝖾𝗋𝖾 𝗂𝗌 𝗇𝗈 𝗋𝖾𝗌𝗎𝗅𝗍 𝗆𝖺𝗍𝖼𝗁 𝗒𝗈𝗎𝗋 𝗉𝗂𝖼𝗍𝗎𝗋𝖾."
	}
}

module.exports.run = async ({ api, event, getText }) => {
	const sagiri = global.nodemodule["sagiri"], search = sagiri(global.configModule[this.config.name].SAUCENAO_API);
	const { threadID, messageID, type, messageReply } = event;
	if (type != "message_reply") return api.sendMessage(getText("missingReply"), threadID, messageID);
	if (messageReply.attachments.length > 1) return api.sendMessage(getText("missingReply"), threadID, messageID);
	if (messageReply.attachments[0].type == 'photo') {
		return search(messageReply.attachments[0].url).then(response => {
			const data = response[0],
				results = {
					similarity: data.similarity,
					material: data.raw.data.material || getText("donthave"),
					characters: data.raw.data.characters || 'Original',
					creator: data.raw.data.creator || getText("dontknow"),
					site: data.site,
					url: data.url
				},
				minSimilarity = 50;
			if (minSimilarity <= ~~results.similarity) return api.sendMessage(getText("returnResult", results.similarity, results.material, results.characters, results.creator, results.site, results.url), threadID, messageID);
			else return api.sendMessage(getText("returnNull"), threadID, messageID);
		});
	}
}