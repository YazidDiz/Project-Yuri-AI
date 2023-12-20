module.exports.config = {
	name: "keuloto",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Randomize any number in a range",
	commandCategory: "other",
	cooldowns: 5
};

module.exports.languages = {
	"vi": {
		"returnResultDefault": "%1 có lẽ là một con số may mắn :thinking:",
		"invalidMax": "Khoảng giới hạn số quay không hợp lệ",
		"invalidInput": "Khoảng bắt đầu hoặc khoảng kết thúc không phải là một con số hợp lệ!",
		"returnResult": "%1 có lẽ là một con số may mắn trong khoảng từ %2 đến %3 :thinking:"
	},

	"en": {
		"returnResultDefault": "🌟 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨 𝗍𝗁𝗂𝗇𝗄 《%1》 𝗂𝗌 𝗆𝖺𝗒𝖻𝖾 𝖺 𝗅𝗎𝖼𝗄𝗒 𝗇𝗎𝗆𝖻𝖾𝗋 :𝗍𝗁𝗂𝗇𝗄𝗂𝗇𝗀:",
		"invalidMax": "❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖺𝗇 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖽𝗂𝖺𝗅 𝗅𝗂𝗆𝗂𝗍 𝗋𝖺𝗇𝗀𝖾.",
		"invalidInput": "❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗌𝗍𝖺𝗋𝗍𝖾𝖽 𝗋𝖺𝗇𝗀𝖾 𝗈𝗋 𝗍𝗁𝖾 𝖾𝗇𝖽𝖾𝖽 𝗋𝖺𝗇𝗀𝖾 𝗂𝗌 𝗇𝗈𝗍 𝖺𝗇 𝗏𝖺𝗅𝗂𝖽.",
		"returnResult": "🌟 | 𝖲𝖾𝗇𝗌𝖾𝗂, 《%1》 𝗂𝗌 𝗆𝖺𝗒𝖻𝖾 𝖺 𝗅𝗎𝖼𝗄𝗒 𝗇𝗎𝗆𝖻𝖾𝗋 𝗂𝗇 𝗋𝖺𝗇𝗀𝖾 𝖿𝗋𝗈𝗆 《%2》 𝗍𝗈 《%3》 :𝗍𝗁𝗂𝗇𝗄𝗂𝗇𝗀:"
	}
}

module.exports.run = function ({ event, api, args, getText }) {
    const { threadID, messageID } = event;

    if (args.length == 0) return api.sendMessage(getText("returnResultDefault", Math.floor(Math.random() * 99)), threadID, messageID);
    if (args.length != 2) return api.sendMessage(getText("invalidMax"), threadID, messageID);
    if (isNaN(args[0]) || isNaN(args[1]) || args[1] <= args[0] || args[0] < 0 || args[1] < 0) return api.sendMessage(getText("invalidInput"), threadID, messageID);
    return api.sendMessage(getText("returnResult", Math.floor(Math.random() * (args[1] - args[0] + 1) + args[0]), args[0], args[1]), threadID, messageID);
}
