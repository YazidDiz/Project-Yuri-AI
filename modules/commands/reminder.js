module.exports.config = {
	name: "reminder",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Réynél",
	description: "notification",
	commandCategory: "tools",
	usages: "[Time] [Text] ",
	cooldowns: 5
};

module.exports.run = async function({ api, event, args, Users }) {
  
	const time = args[0];
	const text = args.join(" ").replace(time, "");
	if (isNaN(time)) return api.sendMessage(`📒 | 𝗨𝘀𝗮𝗴𝗲:\n${global.config.PREFIX}𝗋𝖾𝗆𝗂𝗇𝖽𝖾𝗋 <𝗍𝗂𝗆𝖾> <𝗍𝗑𝗍>\n\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n${global.config.PREFIX}𝗋𝖾𝗆𝗂𝗇𝖽𝖾𝗋 𝟨𝟢 𝖺𝗌𝗌𝗂𝗀𝗇𝗆𝖾𝗇𝗍 𝗆𝖺𝗄𝖾 𝖺 𝗉𝗈𝗐𝖾𝗋𝖿𝗎𝗅 𝖻𝖺𝖼𝗄𝖾𝗇𝖽 𝗎𝗌𝗂𝗇𝗀 𝗇𝗈𝖽𝖾.𝗃𝗌\n\n𝗧𝗮𝗸𝗲 𝗻𝗼𝘁𝗲:\n𝟧𝟫 𝗂𝗌 𝖾𝗊𝗎𝖺𝗅 𝗍𝗈 𝗌𝖾𝖼𝗈𝗇𝖽\n𝟨𝟢 𝗂𝗌 𝖾𝗊𝗎𝖺𝗅 𝗍𝗈 𝗆𝗂𝗇𝗎𝗍𝖾 𝗍𝗈 𝗆𝖺𝗄𝖾 𝖺 𝗆𝗂𝗇𝗎𝗍𝖾 𝗋𝖾𝗆𝗂𝗇𝖽 𝗉𝗅𝖾𝖺𝗌𝖾 𝗎𝗌𝖾 𝗅𝗈𝗇𝗀 𝗇𝗎𝗆𝖻𝖾𝗋𝗌\n\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲 𝗳𝗼𝗿 𝗺𝗶𝗻𝘂𝘁𝗲𝘀:\n${global.config.PREFIX}𝗋𝖾𝗆𝗂𝗇𝖽𝖾𝗋 𝟫𝟫𝟫𝟫𝟫 <𝗍𝗑𝗍>𓊉\n𝟫𝟫𝟫𝟫𝟫 𝗂𝗌 𝖾𝗊𝗎𝖺𝗅 𝗍𝗈 𝟣𝟨 𝗆𝗂𝗇𝗎𝗍𝖾𝗌.`, event.threadID, event.messageID);
	const display = time > 59 ? `${time / 60} 𝗆𝗂𝗇𝗎𝗍𝖾` : `${time} 𝗌𝖾𝖼𝗈𝗇𝖽`;
	api.sendMessage(`🕔 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨 𝗐𝗂𝗅𝗅 𝗋𝖾𝗆𝗂𝗇𝖽 𝗒𝗈𝗎 𝗅𝖺𝗍𝖾𝗋\n ${display}`, event.threadID, event.messageID);
	await new Promise(resolve => setTimeout(resolve, time * 1000));
	var value = await api.getThreadInfo(event.threadID);
	if (!(value.nicknames)[event.userID]) value = (await Users.getInfo(event.senderID)).name;
	else value = (value.nicknames)[event.senderID];
	return api.sendMessage({
	body: `${(text) ? value + ", \n\n🔔 | 𝗥𝗘𝗠𝗜𝗡𝗗𝗘𝗥:\n" + text : value + "𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨 𝗍𝗁𝗂𝗇𝗄 𝗒𝗈𝗎 𝖺𝗌𝗄𝖾𝖽 𝗆𝖾 𝗍𝗈 𝗋𝖾𝗆𝗂𝗇𝖽 𝗒𝗈𝗎 𝗍𝗈 𝖽𝗈 𝗌𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀, 𝗋𝗂𝗀𝗁𝗍?"}`,
		mentions: [{
			tag: value,
			id: event.senderID
		}]
	}, event.threadID, event.messageID);
}