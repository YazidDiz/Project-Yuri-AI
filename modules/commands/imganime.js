module.exports.config = {
	name: "imganime",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Random anime image",
	commandCategory: "anime",
	usages: "[imganime]",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://anime.ocvat2810.repl.co/').then(res => {
	let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({ body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾’𝗌 𝗋𝖺𝗇𝖽𝗈𝗆 𝖺𝗇𝗂𝗆𝖾 𝗉𝗂𝖼𝗍𝗎𝗋𝖾𝗌:",
						attachment: fs.createReadStream(__dirname + `/cache/shiba.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/shiba.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/shiba.${ext}`)).on("close", callback);
			})
}