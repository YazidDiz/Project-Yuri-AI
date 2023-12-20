module.exports.config = {
  name: "photooxy",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Réynél",
  description: `${global.config.PREFIX}photooxy [ID] [TEXT]`,
  commandCategory: "edit-img",
  cooldowns: 0,
  dependencies: {
    "fs-extra": "",
    "request": ""
    }
};
module.exports.run = async ({ api, event,args }) => {  {
    
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
	 const { threadID, messageID, senderID, body } = event;
	const num = args[0];
  const message = args.slice(1).join(' ');
  if (num > 15) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝟣𝟧 𝗂𝗌 𝗍𝗁𝖾 𝗅𝗂𝗆𝗂𝗍 𝗇𝗎𝗆𝖻𝖾𝗋.", event.threadID, event.messageID);
  if (isNaN(num)) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗇𝗎𝗆𝖻𝖾𝗋 𝗇𝗈𝗍 𝖺 𝗅𝖾𝗍𝗍𝖾𝗋.", event.threadID, event.messageID);
if (!message)
    return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖺𝖽𝖽 𝗍𝖾𝗑𝗍 𝗍𝗈 𝗉𝗋𝗈𝖼𝖾𝖾𝖽.", event.threadID, event.messageID);
    api.sendMessage("⏳ | 𝖯𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", event.threadID, event.messageID);

	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/photooxy.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/photooxy.png"),event.messageID);
	 return request(encodeURI(`https://sakibin.sinha-apiv2.repl.co/api/photooxy/${num}?text=${message}&apikey=SAKIBIN-FREE-SY6B4X`)).pipe(fs.createWriteStream(__dirname+'/cache/photooxy.png')).on('close',() => callback());     
}}