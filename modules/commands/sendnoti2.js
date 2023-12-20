module.exports.config = {
	name: "sendnoti2",
	version: "1.0.1",
	hasPermssion: 2,
	credits: "Réynél",
	description: "Send messages to groups!",
	commandCategory: "announce",
	usages: "[message]",
	cooldowns: 5
};

module.exports.languages = {
	
	"en": {
		"sendSuccess": "✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗌𝖾𝗇𝗍 𝗍𝗁𝖾 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗍𝗈 《%1》 𝗀𝗋𝗈𝗎𝗉(𝗌)",
		"sendFail": "❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖨 𝖼𝖺𝗇'𝗍 𝗌𝖾𝗇𝖽 𝗍𝗁𝖾 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗍𝗈 《%1》 𝗀𝗋𝗈𝗎𝗉(𝗌)"
	}
}

module.exports.run = async ({ api, event, args, getText }) => {
	var allThread = global.data.allThreadID || [];
	var count = 1,
		cantSend = [];
	for (const idThread of allThread) {
		if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
		else {
			api.sendMessage("╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n  ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n𒈔𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗙𝗿𝗼𝗺 𝗠𝗮𝘀𝘁𝗲𝗿𒈔\n\n━━━━━━━━━━━━━━━━━━━\n" + args.join(" ") , idThread, (error, info) => {
				if (error) cantSend.push(idThread);
			});
			count++;
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	}
	return api.sendMessage(getText("sendSuccess", count), event.threadID, () => (cantSend.length > 0 ) ? api.sendMessage(getText("sendFail", cantSend.length), event.threadID, event.messageID) : "", event.messageID);
}
