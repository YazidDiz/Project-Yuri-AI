module.exports.config = {
	name:"randomedit",
	version: "1",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Edit video from tiktok",
	commandCategory: "entertainment",
	cooldowns: 10
};
module.exports.run = async ({ api, event,}) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	
  api.sendMessage(`⏱️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗏𝗂𝖽𝖾𝗈 𝗂𝗌 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...`, event.threadID, event.messageID);
axios.get('https://api-edit-alightmotion.jonellmagallanes400.repl.co/cc/?apikey=editor').then(res => {
	let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
                                                body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗋𝖺𝗇𝖽𝗈𝗆 𝖾𝖽𝗂𝗍 𝖿𝗋𝗈𝗆 𝗍𝗂𝗄𝗍𝗈𝗄:`,
						attachment: fs.createReadStream(__dirname + `/cache/edit.mp4`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/edit.mp4`), event.messageID);
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/edit.mp4`)).on("close", callback);
			}) .catch(err => {
                     api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗌𝗍𝖺𝗍𝗎𝗌: 𝟤𝟢𝟢 𝗂𝗇 𝖺𝗉𝗂\n𝖢𝗈𝗇𝗍𝖺𝖼𝗍 𝗍𝗁𝖾 𝗈𝗐𝗇𝖾𝗋 𝗍𝗈 𝖿𝗂𝗑 𝗂𝗆𝗆𝖾𝖽𝗂𝖺𝗍𝖾𝗅𝗒", event.threadID, event.messageID);
    api.setMessageReaction("❎", event.messageID, (err) => {}, true);
                  })     
}
          