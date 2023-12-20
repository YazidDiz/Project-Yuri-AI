module.exports.config = {
	name: "reddit",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Clark",
	description: "Get tons of info on a subreddit",
  usages: "[text]",
	commandCategory: "searches",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let juswa = args.join(" ");
const res = await axios.get(`https://api.popcat.xyz/subreddit/${juswa}`);
var name = res.data.name;
var title = res.data.title;
var au = res.data.active_users;
var members = res.data.members;
var description = res.data.description;
var url = res.data.url;
return api.sendMessage(`𝗡𝗮𝗺𝗲: ${name}\n𝗧𝗶𝘁𝗹𝗲: ${title}\n𝗔𝗰𝘁𝗶𝘃𝗲 𝗨𝘀𝗲𝗿𝘀: ${au}\n𝗠𝗲𝗺𝗯𝗲𝗿𝘀: ${members}\n━━━━━━━━━━━━━━━━━━━\n𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${description}\n━━━━━━━━━━━━━━━━━━━\n𝗨𝗿𝗹: ${url}`, event.threadID, event.messageID)
}