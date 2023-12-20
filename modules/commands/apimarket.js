const axios = require('axios');

module.exports.config = {
	name: "apimarket",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Réynél",
	description: "Search API endpoints via market command",
	commandCategory: "searches",
	cooldowns: 5,
	dependencies: {
		"axios": ""
	}
};

module.exports.run = async ({ api, event, args }) => {
	const query = args.join(" ");
	if (!query) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗌𝖾𝖺𝗋𝖼𝗁 𝗄𝖾𝗒𝗐𝗈𝗋𝖽𝗌.", event.threadID);

	const apiUrl = `https://api-market-by-jonell-cc.hutchin.repl.co/market/?search=${encodeURIComponent(query)}`;

	try {
		const response = await axios.get(apiUrl);
		const searchResults = response.data;

		if (searchResults.length === 0) {
			return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝗐𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗋𝖾𝗌𝗎𝗅𝗍𝗌 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 𝗒𝗈𝗎𝗋 𝗌𝖾𝖺𝗋𝖼𝗁.", event.threadID);
		}

		let message = '🛒 | 𝗠𝗮𝗿𝗸𝗲𝘁 𝗔𝗽𝗶 𝗦𝗲𝗮𝗿𝗰𝗵 𝗥𝗲𝘀𝘂𝗹𝘁𝘀:\n\n';
		searchResults.forEach((result, index) => {
			message += `${index + 1}. 𝗡𝗮𝗺𝗲:${result.name}\n\n𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻:${result.description}\n\n𝗘𝗻𝗱𝗽𝗼𝗶𝗻𝘁: ${result.link}\n\n𝗔𝗽𝗶𝗢𝘄𝗻𝗲𝗿:${result.ApiOwner}\n\n==============================\n\n`;
		});

		api.sendMessage(message, event.threadID);
	} catch (error) {
		console.error(error);
		api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗍𝗋𝗒𝗂𝗇𝗀 𝗍𝗈 𝗌𝖾𝖺𝗋𝖼𝗁 𝗍𝗁𝖾 𝗆𝖺𝗋𝗄𝖾𝗍.", event.threadID);
	}
};