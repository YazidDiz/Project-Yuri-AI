module.exports.config = {
	name: "simpleupt",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "Réynél",
	description: "simple bot upt check",
	commandCategory: "uptime",
  usages: "[simpleupt]",
	cooldowns: 1,
  };
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
const moment = require("moment-timezone");
  const res = await api.getUserInfoV2(event.senderID);
var name = res.name; 
  return api.sendMessage(`╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n  ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n\n𝖪𝗈𝗇𝗇𝗈𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂 ${name}, ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 ${global.config.BOTNAME} 𝗂𝗌 𝗋𝗎𝗇𝗇𝗂𝗇𝗀 𝖿𝗈𝗋:\n\n${hours} 𝗁𝗈𝗎𝗋(𝗌) ${minutes} 𝗆𝗂𝗇𝗎𝗍𝖾(𝗌) ${seconds} 𝗌𝖾𝖼𝗈𝗇𝖽(𝗌)`,event.threadID, event.messageID);
}