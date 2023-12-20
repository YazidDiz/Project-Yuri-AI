module.exports.config = {
	name: "sendmsg",
	version: "1.0.7",
	hasPermssion: 2,
	credits: "Réynél",
	description: "sendmsg to a person",
	commandCategory: "admin",
	usages: "[ID] [Text]",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
 //if (!args[0]) return api.sendMessage(`${api.getthreadID()}`, event.threadID);
    
	var idbox = args[0];
    var reason = args.slice(1);
	//let threadID = await api.getThreadID();
	if (args.length == 0) api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗎𝗌𝖾 𝗈𝖿 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.\n\n𝗨𝘀𝗲: 𝗌𝖾𝗇𝖽𝗆𝗌𝗀 𝖴𝗂𝖽/𝖨𝖣 𝗀𝗋𝗈𝗎𝗉 [𝗆𝖾𝗌𝗌𝖺𝗀𝖾]", event.threadID, event.messageID);
	
	else if(reason == "")api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗎𝗌𝖾 𝗈𝖿 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.\n\n𝗨𝘀𝗲: 𝗌𝖾𝗇𝖽𝗆𝗌𝗀 𝖴𝗂𝖽/𝖨𝖣 𝗀𝗋𝗈𝗎𝗉 [𝗆𝖾𝗌𝗌𝖺𝗀𝖾]", event.threadID, event.messageID);
	
	else
		api.sendMessage("🌟 | 𝖤𝗑𝖼𝗎𝗌𝖾 𝗆𝖾 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝖿𝗋𝗈𝗆 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋:\n━━━━━━━━━━━━━━━━━━━\n" + reason.join(" "), idbox, () =>
			api.sendMessage(`${api.getCurrentUserID()}`, () =>
				api.sendMessage("✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗌𝖾𝗇𝗍 𝗍𝗁𝖾 𝗆𝖾𝗌𝗌𝖺𝗀𝖾: " + reason.join(" "), event.threadID)));
}
