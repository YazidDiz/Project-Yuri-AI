module.exports.config = {
    name: "biden",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Réynél",
    description: "comment on the board of biden",
    commandCategory: "board",
    usages: "[text]",
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
	let text = args.toString().replace(/,/g,  '  ');
if (!text)
    return api.sendMessage("[Text]", event.threadID, event.messageID);

	 var callback = () => api.sendMessage({ body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾’𝗌 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖾𝗇𝗍 𝖻𝗈𝖺𝗋𝖽 𝗈𝖿 𝖡𝗂𝖽𝖾𝗇:", attachment: fs.createReadStream(__dirname + "/cache/biden.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/biden.png"),event.messageID);
	 return request(encodeURI(`https://api.popcat.xyz/biden?text=${text}`)).pipe(fs.createWriteStream(__dirname+'/cache/biden.png')).on('close',() => callback());     
}}
