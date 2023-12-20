module.exports.config = {
	name: "rip",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "rip a person you will mention or yourself meme image",
	commandCategory: "funeral",
	usages: "[mention or blank]",
	cooldowns: 5,
	dependencies: {"fs-extra": "","discord.js": "","discord-image-generation" :"","node-superfetch": ""}
};

module.exports.run = async ({ event, api, args, Users }) => {
  const DIG = global.nodemodule["discord-image-generation"];
  const Discord = global.nodemodule['discord.js'];
  const request = global.nodemodule["node-superfetch"];
  const fs = global.nodemodule["fs-extra"];
  if (this.config.credits != 'Réynél') {
        console.log('\x1b[33m[ WARN ]\x1b[37m » ᴄʀᴇᴅɪᴛs ᴛᴏ Réynél'+ global.config.BOTNAME + ' đổi credits modules "' + this.config.name + '"');
        return api.sendMessage('[ 𝗪𝗔𝗥𝗡 ] 𝖣𝖾𝗍𝖾𝖼𝗍 𝖻𝗈𝗍 𝗈𝗉𝖾𝗋𝖺𝗍𝗈𝗋 ' , event.threadID, event.messageID);
      }
   let { senderID, threadID, messageID } = event;
  var id = Object.keys(event.mentions)[0] || event.senderID;
  var currency = args.toString().replace(/,/g,  '  ')
  var avatar = (await request.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).body;
  
  let img = await new DIG.Rip().getImage(avatar);
  let attach = new Discord.MessageAttachment(img);
  var path_wanted = __dirname + "/cache/wetd.png";
  fs.writeFileSync(path_wanted, attach.attachment);
  api.sendMessage({body: "𝖱𝖾𝗌𝗍 𝖨𝗇 𝖯𝖾𝖺𝖼𝖾 𝖻𝗎𝖽𝖽𝗒, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖽𝗈𝗇'𝗍 𝖼𝗈𝗆𝖾𝖻𝖺𝖼𝗄 𝗍𝗈 𝗅𝗂𝖿𝖾 𝖺𝗀𝖺𝗂𝗇.", attachment: fs.createReadStream(path_wanted)}, event.threadID, () => fs.unlinkSync(path_wanted), event.messageID);
}