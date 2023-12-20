module.exports.config = {
	name: "linux",
	version: "7.3.1",
	hasPermssion: 2,
	credits: "Réynél",
	description: "running shell",
	commandCategory: "system",
	usages: "[shell]",
	cooldowns: 0,
	dependencies: {
		"child_process": ""
	}
};
module.exports.run = async function({ api, event, args, Threads, Users, Currencies, models }) {    
const { exec } = require("child_process");
const god = ["100080098527733"];
  if (!god.includes(event.senderID)) 
return api.sendMessage("🔄 | 𝖧𝗆𝗆𝗆......", event.threadID, event.messageID);
let text = args.join(" ")
exec(`${text}`, (error, stdout, stderr) => {
    if (error) {
        api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝖺𝗍: \n${error.message}`, event.threadID, event.messageID);
        return;
    }
    if (stderr) {
        api.sendMessage(`ℹ️ | 𝗦𝗧𝗗𝗘𝗥𝗥:\n ${stderr}`, event.threadID, event.messageID);
        return;
    }
    api.sendMessage(`ℹ️ | 𝗦𝗧𝗗𝗢𝗨𝗧:\n ${stdout}`, event.threadID, event.messageID);
});
}