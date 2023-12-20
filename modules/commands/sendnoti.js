module.exports.config = {
	name: "sendnoti",
	version: "1.0.2",
	hasPermssion: 2,
	credits: "Réynél",
	description: "announcement from admin",
	commandCategory: "announce",
	usages: "[message]",
	cooldowns: 5
};
 
module.exports.languages = {
	"vi": {
		"sendSuccess": "Đã gửi thánh chỉ tới %1 nhóm",
		"sendFail": "Không thể gửi thánh chỉ tới %1 nhóm"
	},
	"en": {
		"sendSuccess": "✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗌𝖾𝗇𝗍 𝗍𝗁𝖾 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗍𝗈 《%1》 𝗀𝗋𝗈𝗎𝗉(𝗌)",
		"sendFail": "❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖨 𝖼𝖺𝗇'𝗍 𝗌𝖾𝗇𝖽 𝗍𝗁𝖾 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗍𝗈 《%1》 𝗀𝗋𝗈𝗎𝗉(𝗌)"
	}
}
 
module.exports.run = async ({ api, event, args, getText, Users }) => {
  const name = await Users.getNameUser(event.senderID)
const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Manila").format("DD/MM/YYYY || HH:mm:s");  
if (event.type == "message_reply") {
const request = global.nodemodule["request"];
const fs = require('fs')
const axios = require('axios')
			var getURL = await request.get(event.messageReply.attachments[0].url);
 
					var pathname = getURL.uri.pathname;
var ext = pathname.substring(pathname.lastIndexOf(".") + 1);
 
					var path = __dirname + `/cache/snoti`+`.${ext}`;
 
 
var abc = event.messageReply.attachments[0].url;
    let getdata = (await axios.get(`${abc}`, { responseType: 'arraybuffer' })).data;
 
  fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'));
 
 
	var allThread = global.data.allThreadID || [];
	var count = 1,
		cantSend = [];
	for (const idThread of allThread) {
		if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
		else {
			api.sendMessage({body: `` + args.join(` `) + `\n\n𝗙𝗿: ${name}`,attachment: fs.createReadStream(path) }, idThread, (error, info) => {
				if (error) cantSend.push(idThread);
			});
			count++;
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	}
	return api.sendMessage(getText("sendSuccess", count), event.threadID, () => (cantSend.length > 0 ) ? api.sendMessage(getText("sendFail", cantSend.length), event.threadID, event.messageID) : "", event.messageID);
 
}
else {
	var allThread = global.data.allThreadID || [];
	var count = 1,
		cantSend = [];
	for (const idThread of allThread) {
		if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
		else {
			api.sendMessage(`` + args.join(` `) + `\n\n𝗙𝗿𝗼𝗺 𝗺𝗮𝘀𝘁𝗲𝗿: ${name}`, idThread, (error, info) => {
				if (error) cantSend.push(idThread);
			});
			count++;
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	}
	return api.sendMessage(getText("sendSuccess", count), event.threadID, () => (cantSend.length > 0 ) ? api.sendMessage(getText("sendFail", cantSend.length), event.threadID, event.messageID) : "", event.messageID); }
}