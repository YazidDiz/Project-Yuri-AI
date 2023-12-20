module.exports.config = {
	name: "deletechats",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Réynél",
	description: "Delete all messages on ACC Bot",
	commandCategory: "facebook",
	usages: "[thread/all]",
	cooldowns: 0
};

module.exports.run = function({ api, event, args, getText }) {
if (args[0] == "all") {
 return api.getThreadList(1000, null, ["INBOX"], (err, list) => {
 	if (err) throw err;
 	list.forEach(item => (item.threadID != event.threadID) ? api.deleteThread(item.threadID) : "");
 	api.sendMessage("✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝖺𝗅𝗅 𝗈𝖿 𝗆𝗒 𝖼𝗁𝖺𝗍𝗌 𝗂𝗇 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄/𝗆𝖾𝗌𝗌𝖾𝗇𝗀𝖾𝗋", event.threadID)
 })
}
else return api.getThreadList(1000, null, ["INBOX"], (err, list) => {
 	if (err) throw err;
 	list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ? api.deleteThread(item.threadID) : "");
 	api.sendMessage("✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝖺𝗅𝗅 𝗈𝖿 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝖼𝗁𝖺𝗍𝗌 𝗂𝗇 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄/𝗆𝖾𝗌𝗌𝖾𝗇𝗀𝖾𝗋", event.threadID)
 })
}