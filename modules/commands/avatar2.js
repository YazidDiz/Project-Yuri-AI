module.exports.config = {
  name: "avatar2",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Clark",
  description: `${global.config.PREFIX}avatar ID|TEXT|TEXT`,
  commandCategory: "avatar",
  usages: `${global.config.PREFIX}avatar ID|TEXT|TEXT`,
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
	const content = args.join(" ").split("|").map(item => item = item.trim());
let text1= encodeURI(content[2])
let text = encodeURI(content[1])
let num = parseInt(content[0])
if (!text)
    return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖺𝖽𝖽 𝗍𝖾𝗑𝗍 𝗍𝗈 𝗉𝗋𝗈𝖼𝖾𝖾𝖽.\n━━━━━━━━━━━━━━━━━━━\n🎓 | 𝗨𝘀𝗮𝗴𝗲:\n\n𝖭𝗎𝗆𝖻𝖾𝗋 | 𝗍𝖾𝗑𝗍𝟣 | 𝗍𝖾𝗑𝗍𝟤\n━━━━━━━━━━━━━━━━━━━\n🌟 | 𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n\n𝟤𝟢𝟢 | 𝖸𝗎𝗋𝗂 | 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺", event.threadID, event.messageID);
    if (!text1)
    return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖺𝖽𝖽 𝗍𝖾𝗑𝗍 𝗍𝗈 𝗉𝗋𝗈𝖼𝖾𝖾𝖽.\n━━━━━━━━━━━━━━━━━━━\n🎓 | 𝗨𝘀𝗮𝗴𝗲:\n\n𝖭𝗎𝗆𝖻𝖾𝗋 | 𝗍𝖾𝗑𝗍𝟣 | 𝗍𝖾𝗑𝗍𝟤\n━━━━━━━━━━━━━━━━━━━\n🌟 | 𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n\n𝟤𝟢𝟢 | 𝖸𝗎𝗋𝗂 | 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺", event.threadID, event.messageID);
    if (!num)
    return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖺𝖽𝖽 𝖨𝖣 𝗍𝗈 𝗉𝗋𝗈𝖼𝖾𝖾𝖽.", event.threadID, event.messageID);
    if (num > 882) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗆𝖺𝗑𝗂𝗆𝗎𝗆 𝖨𝖣 𝗂𝗌 𝟪𝟪𝟤 𝗈𝗇𝗅𝗒.", event.threadID, event.messageID);
    if (isNaN(num)) {
    return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨𝗇𝗉𝗎𝗍 𝗂𝗇 𝖨𝖣 𝗂𝗌 𝗇𝗈𝗍 𝖺 𝖭𝗎𝗆𝖻𝖾𝗋!!! 𝗉𝗅𝖾𝖺𝗌𝖾𝖾 𝗉𝗎𝗍 𝖺 𝗇𝗎𝗆𝖻𝖾𝗋", event.threadID, event.messageID);
    }
    api.sendMessage("⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍..", event.threadID, event.messageID);
	 var callback = () => api.sendMessage({body:`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾 𝗂𝗌 𝗒𝗈𝗎𝗋 𝖺𝗏𝖺𝗍𝖺𝗋𝟤:`,attachment: fs.createReadStream(__dirname + "/cache/avt1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/avt1.png"),event.messageID);
	 return request(encodeURI(`https://sakibin.sinha-apiv2.repl.co/taoanhdep/avatarwibu?id=${num}&chu_nen=${text1}&chu_ky=${text}`)).pipe(fs.createWriteStream(__dirname+'/cache/avt1.png')).on('close',() => callback());     
}}