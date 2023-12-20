module.exports.config = {
	name:"codm",
	version: "1",
	hasPermssion: 0,
	credits: "Réynél", 
	description: "Call of duty highlights video",
	commandCategory: "entertainment",
	usage: "[codm]",
	cooldowns: 6,
};
module.exports.run = async ({ api, event,}) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");

  api.sendMessage(`⏱️ | 𝙎𝙚𝙣𝙨𝙚𝙞, 𝙩𝙝𝙚 𝙫𝙞𝙙𝙚𝙤 𝙞𝙨 𝙨𝙚𝙣𝙙𝙞𝙣𝙜 𝙥𝙡𝙚𝙖𝙨𝙚 𝙬𝙖𝙞𝙩...`, event.threadID, event.messageID);
axios.get('https://codm-api.diciper09.repl.co/codm?apikey=umaru852').then(res => {
	let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
																body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖧𝖾𝗋𝖾'𝗌 𝖸𝗈𝗎𝗋 𝖢𝖺𝗅𝗅 𝖮𝖿 𝖣𝗎𝗍𝗒 𝖬𝗈𝖻𝗂𝗅𝖾:`,
						attachment: fs.createReadStream(__dirname + `/cache/codm.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/codm.${ext}`), event.messageID);
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/codm.${ext}`)).on("close", callback);
			}) .catch(err => {
							api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽", event.threadID, event.messageID);
	 api.setMessageReaction("❎", event.messageID, (err) => {}, true);
						})     
}