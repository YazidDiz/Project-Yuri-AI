module.exports.config = {
  name: "owner3",
  version: "1.0.1", 
  hasPermssion: 0,
  credits: "Réynél", //don't change the credits please
  description: "Admin and Bot info.",
  commandCategory: "information",
  cooldowns: 5,
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
var link =["https://i.imgur.com/9LDVC57.mp4", "https://i.imgur.com/r7IxgiR.mp4",  "https://i.imgur.com/J1jWubu.mp4",
"https://i.imgur.com/DJylTiy.mp4",  "https://i.imgur.com/v4mLGte.mp4",  "https://i.imgur.com/uthREbe.mp4",  "https://i.imgur.com/ee8fHna.mp4",  "https://i.imgur.com/VffzOwS.mp4",
"https://i.imgur.com/ci5nztg.mp4",
"https://i.imgur.com/qHPeKDV.mp4",
"https://i.imgur.com/Rkl5UmH.mp4"];
var callback = () => api.sendMessage({body:`╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n  ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n➢ 𝗔𝗱𝗺𝗶𝗻 𝗮𝗻𝗱 𝗕𝗼𝘁 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻

⁂ 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲: ${global.config.BOTNAME}
✧ 𝗕𝗼𝘁 𝗔𝗱𝗺𝗶𝗻: ${global.config.BOTCREATOR}
♛ 𝗕𝗼𝘁 𝗔𝗱𝗺𝗶𝗻 𝗟𝗶𝗻𝗸: ${global.config.CREATORLINK}
❂ 𝗕𝗼𝘁 𝗣𝗿𝗲𝗳𝗶𝘅: ${global.config.PREFIX}
✫ 𝗕𝗼𝘁 𝗢𝘄𝗻𝗲𝗿: ${global.config.BOTOWNER}
➟ 𝗨𝗣𝗧𝗜𝗠𝗘:
✬ 𝗧𝗼𝗱𝗮𝘆 𝗶𝘀: ${juswa} 

➳ 𝗕𝗼𝘁 𝗶𝘀 𝗥𝘂𝗻𝗻𝗶𝗻𝗴: ${hours}:${minutes}:${seconds}.
✫ 𝗧𝗵𝗮𝗻𝗸𝘀 𝗙𝗼𝗿 𝗨𝘀𝗶𝗻𝗴: ${global.config.BOTNAME}
`,attachment: fs.createReadStream(__dirname + "owner_video.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "owner_video.mp4")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"owner_video.mp4")).on("close",() => callback());
   };