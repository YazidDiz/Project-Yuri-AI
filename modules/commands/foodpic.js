module.exports.config = {
	name: "foodpic",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Search an food",
	commandCategory: "searches",
	usages: "[Food]",
	cooldowns: 1,
	
	}; // credit for api: Réynél
			
module.exports.run = async ({ api, event, args }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	const req = args[0];
	if (!args[0]) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗇𝖾𝖾𝖽 𝖺𝗇 𝖿𝗈𝗈𝖽 𝗍𝗈 𝗌𝖾𝖺𝗋𝖼𝗁.", event.threadID, event.messageID);
	axios.get(`https://sensui-useless-apis.codersensui.repl.co/api/tools/foodpic?query=${encodeURI(req)}`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `❯ 𝗤𝘂𝗲𝗿𝘆: ${req}\n❯ 𝗥𝗲𝘀𝘂𝗹𝘁: ${res.data.title}`,
						attachment: fs.createReadStream(__dirname + `/cache/food1.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/food1.jpg`), event.messageID);
				};
				request(res.data.image).pipe(fs.createWriteStream(__dirname + `/cache/food1.jpg`)).on("close", callback);
			})
}