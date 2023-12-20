module.exports.config = {
	name: "github",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Get username's github info",
	commandCategory: "information",
	depndencies: {"fetch": "","node-fetch": "", "moment": ""},
	usages: "github <username>",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
 if (!args[0]) return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗀𝗂𝗍𝗁𝗎𝖻 𝗎𝗌𝖾𝗋𝗇𝖺𝗆𝖾 𝖼𝖺𝗇𝗇𝗈𝗍 𝖻𝖾 𝖾𝗆𝗉𝗍𝗒.`, event.threadID, event.messageID);
 const moment = require("moment");
 const fetch = require("node-fetch");
 const axios = global.nodemodule["axios"];
 const fs = global.nodemodule["fs-extra"];
 
  fetch(`https://api.github.com/users/${encodeURI(args.join(' '))}`)
    .then(res => res.json())
    .then(async body => {
      if(body.message) return api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗎𝗌𝖾𝗋 𝗇𝗈𝗍 𝖿𝗈𝗎𝗇𝖽, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗀𝗂𝗏𝖾 𝗆𝖾 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗎𝗌𝖾𝗋𝗇𝖺𝗆𝖾.`, event.threadID, event.messageID);
    let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;
    const info = 
      `${login} 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻!\n━━━━━━━━━━━━━━━━━━━\n𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${login}\n𝗜𝗗: ${id}\n𝗕𝗶𝗼: ${bio || "𝗡𝗼 𝗕𝗶𝗼"}\n𝗣𝘂𝗯𝗹𝗶𝗰 𝗥𝗲𝗽𝗼𝘀𝗶𝘁𝗼𝗿𝗶𝗲𝘀: ${public_repos || "None"}\n𝗙𝗼𝗹𝗹𝗼𝘄𝗲𝗿𝘀: ${followers}\n𝗙𝗼𝗹𝗹𝗼𝘄𝗶𝗻𝗴: ${following}\n𝗟𝗼𝗰𝗮𝘁𝗶𝗼𝗻: ${location || "No Location"}\n𝗔𝗰𝗰𝗼𝘂𝗻𝘁 𝗖𝗿𝗲𝗮𝘁𝗲𝗱: ${moment.utc(created_at).format("dddd, MMMM, Do YYYY")}\nAvatar:`;
      
    let getimg = (await axios.get(`${avatar_url}`, { responseType: "arraybuffer" })).data;
     fs.writeFileSync(__dirname+"/cache/avatargithub.png", Buffer.from(getimg, "utf-8"));
        
       api.sendMessage({
        attachment: fs.createReadStream(__dirname+"/cache/avatargithub.png"),
        body: info}, event.threadID,() => fs.unlinkSync(__dirname+"/cache/avatargithub.png"), event.messageID);

    });
    
  };