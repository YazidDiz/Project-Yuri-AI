module.exports.config = {
  name: `sim2`, 
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: `Chat with Bot`,
  commandCategory: "chatbots",
  usages: `${global.config.PREFIX}sim2 message`,
  cooldowns: 0,
};

module.exports.run = async function ({ api, event, args }) {
	var { threadID, messageID } = event;
	const axios = require("axios");
	try {
		const request = args.join(" ");
		if (!request) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨 𝗇𝖾𝖾𝖽 𝖺𝗇 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗍𝗈 𝗉𝗋𝗈𝖼𝖾𝖾𝖽!", threadID, messageID);
		const res = await axios.get(`https://mainapi.princemc166.repl.co/api/sim?message=${request}`);
		api.sendMessage(res.data.message, threadID, messageID);
	} catch (error) {
		api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝗌𝗂𝗆 𝖺𝗉𝗂", threadID, messageID);
	}
    }