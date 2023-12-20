module.exports.config = {
	name: "wiki",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Find everything you need to know through Wikipedia",
	commandCategory: "searches",
	usages: "[en] [information to look for]",
	cooldowns: 1,
	dependencies: {
        "wikijs": ""
    }
}

module.exports.languages = {
    "vi": {
        "missingInput": "Nội dung cần tìm kiếm không được để trống!",
        "returnNotFound": "Không tìm thấy nội dung %1"
    },
    "en": {
        "missingInput": "ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖽𝗈𝗇'𝗍 𝖿𝗈𝗋𝗀𝖾𝗍 𝗍𝗈 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝗌𝖾𝖺𝗋𝖼𝗁 𝗊𝗎𝖾𝗋𝗒 𝗒𝗈𝗎 𝖺𝗋𝖾 𝗅𝗈𝗈𝗄𝗂𝗇𝗀 𝖿𝗈𝗋 𝗂𝗇 𝗐𝗂𝗄𝗂𝗉𝖾𝖽𝗂𝖺.",
        "returnNotFound": "❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖨 𝖼𝖺𝗇'𝗍 𝖿𝗂𝗇𝖽 《%1》 𝗂𝗇 𝗍𝗁𝖾 𝗐𝗂𝗄𝗂𝗉𝖾𝖽𝗂𝖺"
    }
}

module.exports.run = ({ event, args, api, getText }) => {
    const wiki = (global.nodemodule["wikijs"]).default;
    let content = args.join(" ");
    let url = 'https://en.wikipedia.org/w/api.php';
    if (args[0] == "en") {
        url = 'https://en.wikipedia.org/w/api.php'; 
        content = args.slice(1, args.length);
    }
    if (!content) return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);
    return wiki({ apiUrl: url }).page(content).catch(() => api.sendMessage(getText("returnNotFound", content), event.threadID, event.messageID)).then(page => (typeof page != 'undefined') ? Promise.resolve(page.summary()).then(val => api.sendMessage(val, event.threadID, event.messageID)) : '');

}