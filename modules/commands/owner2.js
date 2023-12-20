module.exports.config = {
	name: "owner2",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "Réynél",
	description: "Admin and Bot info.",
	commandCategory: "information",
  usages: "[owner2]",
	cooldowns: 1,
	dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
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
var juswa = moment.tz("Asia/Manila").format("『D/MM/YYYY』 【HH:mm:ss】");
var link = ["https://i.imgur.com/x6zP9Ae.gif", "https://i.imgur.com/fznMK1X.gif", "https://i.imgur.com/D9ygTdW.gif", "https://i.imgur.com/vhDfSJy.gif", "https://i.imgur.com/5TsBiZi.gif", "https://i.imgur.com/4ivIOaI.gif", "https://i.imgur.com/ny4COAo.gif", "https://i.imgur.com/cc7bLvs.gif", "https://i.imgur.com/gP5qX3G.gif", "https://i.imgur.com/PJ3dSmc.gif", "https://i.imgur.com/8xtofhZ.gif"];
var callback = () => api.sendMessage({body:`╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n  ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n➢ 𝗔𝗱𝗺𝗶𝗻 𝗮𝗻𝗱 𝗕𝗼𝘁 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻

⁂ 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲: ${global.config.BOTNAME}

✧ 𝗕𝗼𝘁 𝗔𝗱𝗺𝗶𝗻: ${global.config.BOTCREATOR}

♛ 𝗕𝗼𝘁 𝗔𝗱𝗺𝗶𝗻 𝗟𝗶𝗻𝗸: ${global.config.CREATORLINK}

❂ 𝗕𝗼𝘁 𝗣𝗿𝗲𝗳𝗶𝘅: ${global.config.PREFIX}

✫ 𝗕𝗼𝘁 𝗢𝘄𝗻𝗲𝗿: ${global.config.BOTOWNER}

➟ 𝗨𝗣𝗧𝗜𝗠𝗘

✬ 𝗧𝗼𝗱𝗮𝘆 𝗶𝘀: ${juswa} 

➳ 𝗕𝗼𝘁 𝗶𝘀 𝗿𝘂𝗻𝗻𝗶𝗻𝗴 ${hours}:${minutes}:${seconds}.

✫ 𝗧𝗵𝗮𝗻𝗸𝘀 𝗳𝗼𝗿 𝘂𝘀𝗶𝗻𝗴 ${global.config.BOTNAME} 𝗕𝗼𝘁!`,attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.jpg")).on("close",() => callback());
   };