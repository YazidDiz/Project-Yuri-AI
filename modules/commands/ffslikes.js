module.exports.config = {
name: "ffslikes",
version: "1.0.0",
hasPermssion: 0,
credits: "Réynél",
description: "Remotely request automatic follows from ffslikes.site.",
commandCategory: "facebook",
cooldowns: 3,
};
module.exports.run = async function ({ api, args, event, permssion, Currencies }) {
	const { threadID, messageID, senderID } = event;
	const axios = require("axios");
	try {
		const id = args[1];
		const token = "𝖸𝗈𝗎𝗋 𝖤𝖠𝖠𝖣𝟨𝗏𝟩 𝗍𝗈𝗄𝖾𝗇 𝗁𝖾𝗋𝖾";
		if (!id) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖺 𝗐𝗋𝗈𝗇𝗀 𝖿𝗈𝗋𝗆𝖺𝗍 𝗈𝖿 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖿𝖿𝗌𝗅𝗂𝗄𝖾𝗌.\n𝗖𝗼𝗺𝗺𝗮𝗻𝗱: "+global.config.PREFIX+this.config.name+" <𝖳𝖠𝖱𝖦𝖤𝖳 𝖨𝖣>", threadID, messageID);
		api.sendMessage("⏳ | 𝖲𝖾𝗇𝖽𝗂𝗇𝗀 𝗋𝖾𝗊𝗎𝖾𝗌𝗍 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", threadID, messageID);
		const res = await axios.get(`https://free.ffslikes.site/api.php?key=${encodeURI(token)}&id=${encodeURI(id)}`);
		const message = res.data.message
		if (!message) {
		api.sendMessage(res.data.error_msg, threadID, messageID);
		} else {
		api.sendMessage(res.data.message, threadID, messageID);
		}
	} catch {
		api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝖺𝗉𝗂.", threadID, messageID);
	}
}