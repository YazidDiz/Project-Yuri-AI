const fs = require('fs-extra');
const pathFile = __dirname + '/cache/deku.txt';
if (!fs.existsSync(pathFile))
  fs.writeFileSync(pathFile, 'false');
module.exports.config = {
	name: "echo",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "Réynél",
	description: "Enable/disable echo",
	commandCategory: "system",
	usages: "[on/off]",
	cooldowns: 0
};

module.exports.handleEvent = async ({ api, event, args }) => {
  const isEnable = fs.readFileSync(pathFile, 'utf-8');
  if (isEnable == 'true'){
    api.sendMessage(event.body, event.threadID);
if (event.attachments[0].type == "sticker") api.sendMessage({sticker: event.attachments[0].stickerID}, event.threadID);
}
};

module.exports. run = async ({ api, event, args }) => {
  try {
	if (args[0] == 'on') {
	  fs.writeFileSync(pathFile, 'true');
	  api.sendMessage('✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖾𝖼𝗁𝗈 𝗍𝗎𝗋𝗇𝖾𝖽 𝗈𝗇 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒', event.threadID, event.messageID);
	}
	else if (args[0] == 'off') {
	  fs.writeFileSync(pathFile, 'false');
	  api.sendMessage('✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖾𝖼𝗁𝗈 𝗍𝗎𝗋𝗇𝖾𝖽 𝗈𝖿𝖿 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒', event.threadID, event.messageID);
	}
	else {
	  api.sendMessage('❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖺 𝗐𝗋𝗈𝗇𝗀 𝖿𝗈𝗋𝗆𝖺𝗍 𝗎𝗌𝖾 𝗈𝖿 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽, 𝗎𝗌𝖾 𝖾𝖼𝗁𝗈 𝗈𝗇/𝗈𝖿𝖿', event.threadID, event.messageID);
	}
  }
  catch(e) {
    console.log(e);
  }
};