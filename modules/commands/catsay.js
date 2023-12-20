module.exports.config = {
    name: "catsay",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Réynél",
    description: "generatgenerate a image of cat with the message you want to enter",
    commandCategory: "edit-img",
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
    return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖽𝗈𝗇'𝗍 𝖿𝗈𝗋𝗀𝖾𝗍 𝗍𝗈 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝖼𝗈𝗇𝗍𝖾𝗇𝗍 𝗈𝖿 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖾𝗇𝗍 𝗈𝖿 𝗍𝗁𝖾 𝖻𝗈𝖺𝗋𝖽 𝗈𝖿 𝖢𝖺𝗍𝗌𝖺𝗒", event.threadID, event.messageID);

	 var callback = () => api.sendMessage({body:`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖼𝗎𝗌𝗍𝗈𝗆𝗂𝗓𝖾𝖽 𝖢𝖺𝗍𝗌𝖺𝗒 𝖻𝗈𝖺𝗋𝖽:`,attachment: fs.createReadStream(__dirname + "/cache/cat.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/cat.png"),event.messageID);
	 return request(encodeURI(`https://cataas.com/cat/cute/says/${text}`)).pipe(fs.createWriteStream(__dirname+'/cache/cat.png')).on('close',() => callback());     
}}
