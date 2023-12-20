module.exports.config = {
	name: "dog2",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Réynél",
	description: "random dog images 2",
	commandCategory: "dogs",
	usages: "[dog2]",
	cooldowns: 1,
	
	};
			
module.exports.run = async ({ api, event }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://random.dog/woof.json').then(res => {
	let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	
	let callback = function () {
					api.sendMessage({body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗋𝖺𝗇𝖽𝗈𝗆 𝖽𝗈𝗀 𝗂𝗆𝖺𝗀𝖾𝗌 𝗏𝟤:", attachment: fs.createReadStream(__dirname + `/cache/dog2.${ext}`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/dog2.${ext}`), event.messageID);
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/dog2.${ext}`)).on("close", callback);
			})
}