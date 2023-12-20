module.exports.config = {
  name: "pooh",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Pooh cmt",
  commandCategory: "board",
  usages: "[text | text]",
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
  let name = (await api.getUserInfo(senderID))[senderID].name
	let text = args.join(" ");
  const text1 = text.substr(0, text.indexOf(' | ')); 
  const length = parseInt(text1.length)
  const text2 = text.split(" | ").pop()
  const length_2 = parseInt(text2.length)
	 var callback = () => api.sendMessage({body:`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖼𝗎𝗌𝗍𝗈𝗆𝗂𝗓𝖾𝖽 𝗉𝗈𝗈𝗁 𝖻𝗈𝖺𝗋𝖽:`,attachment: fs.createReadStream(__dirname + "/cache/biden.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/biden.png"),event.messageID);
	 return request(encodeURI(`https://api.popcat.xyz/pooh?text1=${text1}&text2=${text2}`)).pipe(fs.createWriteStream(__dirname+'/cache/biden.png')).on('close',() => callback());     
}}
