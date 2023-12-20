module.exports.config = {
  name: "pat",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Clark",
  description: "pat the friend tag",
  commandCategory: "anime",
  usages: "《@mention》",
  cooldowns: 5,
};


module.exports.run = async ({ api, event, args }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
    var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
  if (!args.join("")) return out("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝖺𝗀 𝗌𝗈𝗆𝖾𝗈𝗇𝖾");
  else
  return axios.get('https://api.satou-chan.xyz/api/endpoint/pat').then(res => {
        let getURL = res.data.url;
        let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
        var mention = Object.keys(event.mentions)[0];
                  let tag = event.mentions[mention].replace("@", "");    
        
 let callback = function () {
            api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        api.sendMessage({
						        body: "𝖯𝖺𝗍𝗌, " + tag + ". 𝖸𝗈𝗌𝗁 𝗒𝗈𝗌𝗁!",
                                          mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
						attachment: fs.createReadStream(__dirname + `/cache/pat.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/pat.${ext}`), event.messageID)
				};
 //   }
        request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/pat.${ext}`)).on("close", callback);
			})
    .catch(err => {
                     api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝖾 𝗀𝗂𝖿, 𝖻𝖾 𝗌𝗎𝗋𝖾 𝗍𝗁𝖺𝗍 𝗒𝗈𝗎'𝗏𝖾 𝗍𝖺𝗀 𝗌𝗈𝗆𝖾𝗈𝗇𝖾!", event.threadID, event.messageID);
                  })     
}
