module.exports.config = {
	name: "reload",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Réynél",
	description: "The bot command will restarts",
	commandCategory: "system",
	usages: "[reload + time]",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
 const permission = global.config.GOD;
  	if (!permission.includes(event.senderID)) return api.sendMessage(`⚠️ | 𝖲𝖾𝗇𝗌𝖾𝗃, 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝗁𝖺𝗏𝖾 𝖺𝗇𝗒 𝗉𝖾𝗋𝗆𝗂𝗌𝗌𝗂𝗈𝗇 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.`, event.threadID, event.messageID);
	const { threadID, messageID } = event;
	var time = args.join(" ");
	var rstime = "68";
	if (!time) rstime = "69";
	else rstime = time;
	api.sendMessage(`𝗣𝗥𝗢𝗝𝗘𝗖𝗧 ${global.config.BOTNAME} 𝗐𝗂𝗅𝗅 𝗋𝖾𝗅𝗈𝖺𝖽 𝗅𝖺𝗍𝖾𝗋 ${rstime} 𝗌𝖾𝖼𝗈𝗇𝖽𝗌 𝗆𝗈𝗋𝖾...`, threadID);
	return setTimeout(() => { api.sendMessage(`𝗣𝗥𝗢𝗝𝗘𝗖𝗧 ${global.config.BOTNAME} 𝗂𝗌 𝗇𝗈𝗐 𝗋𝖾𝗅𝗈𝖺𝖽𝗂𝗇𝗀 𝗌𝗒𝗌𝗍𝖾𝗆, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍 𝗉𝖺𝗍𝗂𝖾𝗇𝗍𝗅𝗒...`,event.threadID,() => process.exit(1) )},	rstime * 1000);
}