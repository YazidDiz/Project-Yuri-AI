const fs = require("fs");
module.exports.config = {
	name: "lc",
  version: "1.0.1",
	hasPermssion: 0,
	credits: "Réynél", 
	description: "no prefix needed the bot will automatically catch up the last chat message ",
	commandCategory: "auto-resp",
	usages: "[lc/lastchat]",
    cooldowns: 1, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("lc")==0 || (event.body.indexOf("lastchat")==0 || (event.body.indexOf("Last chat")==0 || (event.body.indexOf("last chat")==0)))) {
		var msg = {
				body: "╭────༺♡༻────╮\n    𝐼𝑛 𝐿𝑜𝑣𝑖𝑛𝑔 𝑀𝑒𝑚𝑜𝑟𝑖𝑒𝑠\n       —𝐋𝐀𝐒𝐓 𝐂𝐇𝐀𝐓— ╰────༺♡༻────╯"
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}
