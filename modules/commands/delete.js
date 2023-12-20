module.exports.config = {
	name: "delete",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "put in the trash meme",
	commandCategory: "mentions",
	usages: "[blank or mention]",
	cooldowns: 5,
	dependencies: {"fs-extra": "","discord.js": "","discord-image-generation" :"","node-superfetch": ""}
};

module.exports.run = async ({ event, api, args, Users }) => {
  const DIG = global.nodemodule["discord-image-generation"];
  const Discord = global.nodemodule['discord.js'];
  const request = global.nodemodule["node-superfetch"];
  const fs = global.nodemodule["fs-extra"];
  if (this.config.credits != 'Réynél') {
        console.log('\x1b[33m[ 𝗪𝗔𝗥𝗡 ]\x1b[37m » credits to Réynél'+ global.config.BOTNAME + ' change credits modules "' + this.config.name + '"');
        return api.sendMessage('[ 𝗪𝗔𝗥𝗡 ] Detect bot operator ' , event.threadID, event.messageID);
      }
   let { senderID, threadID, messageID } = event;
  var id = Object.keys(event.mentions)[0] || event.senderID;
  
  var avatar = (await request.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).body;
  
  let img = await new DIG.Delete().getImage(avatar);
  let attach = new Discord.MessageAttachment(img);
  var path_delete = __dirname + "/cache/delete.png";
  fs.writeFileSync(path_delete, attach.attachment);
  api.sendMessage({body: "𝖨𝗍𝗌 𝗍𝗂𝗆𝖾 𝗍𝗈 𝖽𝖾𝗅𝖾𝗍𝖾 𝗌𝗈𝗆𝖾 𝗎𝗌𝖾𝗅𝖾𝗌𝗌 𝗍𝗋𝖺𝗌𝗁 🚮", attachment: fs.createReadStream(path_delete)}, event.threadID, () => fs.unlinkSync(path_delete), event.messageID);
}