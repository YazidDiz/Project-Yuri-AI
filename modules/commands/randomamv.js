module.exports.config = {
	name:"randomamv",
	version: "1",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Random anime video",
	commandCategory: "anime",
	cooldowns: 0
};
module.exports.run = async ({ api, event,}) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
  
axios.get('https://jhunapi.mrbaylon4.repl.co/snauzk/?apikey=Marjhunapi').then(res => {
	let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
                                                body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗋𝖺𝗇𝖽𝗈𝗆 𝖺𝗆𝗏:`,
						attachment: fs.createReadStream(__dirname + `/cache/codm.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/codm.${ext}`), event.messageID);
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/codm.${ext}`)).on("close", callback);
			}) .catch(err => {
                     api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽, 𝗆𝖺𝗒𝖻𝖾 𝗍𝗁𝖾 𝖺𝗉𝗂 𝗂𝗌 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 𝖽𝗈𝗐𝗇", event.threadID, event.messageID);
    api.setMessageReaction("❎", event.messageID, (err) => {}, true);
                  })     
  }