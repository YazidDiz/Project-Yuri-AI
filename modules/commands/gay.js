module.exports.config = {
	name: "gay",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "gay image meme (for fun only)",
	commandCategory: "mentions",
	usages: "[blank or tag]",
	cooldowns: 5,
	dependencies: {"fs-extra": "","discord.js": "","discord-image-generation" :"","node-superfetch": ""}
};

module.exports.run = async ({ event, api, args, Users }) => {
  const DIG = global.nodemodule["discord-image-generation"];
  const Discord = global.nodemodule['discord.js'];
  const request = global.nodemodule["node-superfetch"];
  const fs = global.nodemodule["fs-extra"];
  if (this.config.credits != 'Réynél') {
        console.log('\x1b[33m[ WARN ]\x1b[37m » credits to Réynél'+ global.config.BOTNAME + ' đổi credits modules "' + this.config.name + '"');
        return api.sendMessage('[ WARN ] Detect bot operator ' , event.threadID, event.messageID);
      }
   let { senderID, threadID, messageID } = event;
  var id = Object.keys(event.mentions)[0] || event.senderID;
  
  var avatar = (await request.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).body;
  
  let img = await new DIG.Gay().getImage(avatar);
  let attach = new Discord.MessageAttachment(img);
  var path_gay = __dirname + "/cache/gay.png";
  fs.writeFileSync(path_gay, attach.attachment);
  api.sendMessage({body: "𝗢𝗵𝗵, 𝗜 𝘁𝗵𝗼𝘂𝗴𝗵𝘁 𝘆𝗼𝘂’𝗿𝗲 𝘀𝘁𝗿𝗮𝗶𝗴𝗵𝘁 𝗯𝘂𝘁 𝗻𝗼𝘁 𝗿𝗲𝗮𝗹𝗹𝘆", attachment: fs.createReadStream(path_gay)}, event.threadID, () => fs.unlinkSync(path_gay), event.messageID);
}