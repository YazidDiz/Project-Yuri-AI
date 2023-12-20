module.exports.config = {
	name: "picsum",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "randompic from picsum",
	commandCategory: "entertainment",
	usages: "[picsum]",
	cooldowns: 1,
	
	}; // credit for api: Réynél
			
module.exports.run = async ({ api, event, args }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get(`https://sensui-useless-apis.codersensui.repl.co/api/tools/lorem-picsum`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗋𝖺𝗇𝖽𝗈𝗆 𝗉𝗂𝖼𝗌𝗎𝗆:`,
						attachment: fs.createReadStream(__dirname + `/cache/picsum.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/picsum.jpg`), event.messageID);
				};
				request(res.data.imageUrl).pipe(fs.createWriteStream(__dirname + `/cache/picsum.jpg`)).on("close", callback);
			})
  }