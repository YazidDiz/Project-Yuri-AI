module.exports.config = {
	name: 'servergc',
	version: '2.0.0',
	hasPermssion: 2,
	credits: 'Réynél',
	description: 'It will add you in main gc',
	commandCategory: 'admin',
	usages: '[userID] [or No prefix]',
	cooldowns: 0
}; 
module.exports.run = async ({args, api, event, Users}) => {
	try {
		const id  = event.senderID;
		const id1 = args[0];
		const threadID = 6589062147881308;
		let name = await Users.getNameUser(event.senderID);
		let name1 = await Users.getNameUser(id1);
		if (!args[0]) {
			await api.addUserToGroup(id, threadID);
			let msg = {body: `ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎'𝗋𝖾 𝗇𝗈𝗐 𝖺𝖽𝖽𝖾𝖽 𝗍𝗈 𝗍𝗁𝖾 𝗆𝖺𝗂𝗇 𝗀𝖼..\n𝖪𝗂𝗇𝖽𝗅𝗒 𝖼𝗁𝖾𝖼𝗄 𝗒𝗈𝗎𝗋 𝗌𝗉𝖺𝗆 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗈𝗋 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗋𝖾𝗊𝗎𝖾𝗌𝗍.`}
			let msg1 = {body: `👋 | 𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂 ${name}, 𝗐𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝗈𝗎𝗋 𝗆𝖺𝗂𝗇 𝗀𝖼.`}
			let msg2 = {body: `ℹ️ | 𝖠𝗅𝖾𝗋𝗍, 𝗌𝖾𝗇𝗌𝖾𝗂 ${name}\n\n𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂 ${name}, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖼𝗁𝖾𝖼𝗄 𝗒𝗈𝗎𝗋 𝗌𝗉𝖺𝗆/𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗋𝖾𝗊𝗎𝖾𝗌𝗍. 𝖳𝗁𝖺𝗇𝗄 𝗒𝗈𝗎...`}
			api.sendMessage(msg, event.threadID, event.messageID);
			api.sendMessage(msg1, threadID);
			api.sendMessage(msg2, id);
		}
		const permission = [`100080098527733`];
		if (args[0] == id1) {
			if (!permission.includes(event.senderID)) return api.sendMessage("⚠️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝗁𝖺𝗏𝖾 𝗉𝖾𝗋𝗆𝗂𝗌𝗌𝗂𝗈𝗇 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.\n"+global.config.OWNER+" 𝗈𝗇𝗅𝗒 𝖼𝖺𝗇 𝗎𝗌𝖾 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.", event.threadID, event.messageID);
			await api.addUserToGroup(id1, threadID);
			let msg = {body: `⪩ 𝗠𝗮𝘀𝘁𝗲𝗿: ${name}, 𝖺𝖽𝖽𝖾𝖽 𝗌𝖾𝗇𝗌𝖾𝗂 ${name1} 𝗂𝗇 𝗆𝖺𝗂𝗇 𝗀𝖼.`}
			let msg1 ={body: `⚠️ | 𝖠𝗅𝖾𝗋𝗍, 𝗌𝖾𝗇𝗌𝖾𝗂 ${name1}\n⪩ 𝗠𝗮𝘀𝘁𝗲𝗿: ${name}, 𝖺𝖽𝖽𝖾𝖽 𝗒𝗈𝗎 𝗂𝗇 𝗆𝖺𝗂𝗇 𝗀𝖼.`}
			let msg2 = {body: `👋 | 𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂 ${name1}, 𝗐𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝗆𝖺𝗂𝗇 𝗀𝖼...`}
			api.sendMessage(msg, event.threadID, event.messageID);
			api.sendMessage(msg1, id1);
			api.sendMessage(msg2, threadID);
		}
		else return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽.", event.threadID, event.messageID);
		
	} catch (error) {
		api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝖺𝖽𝖽 𝗍𝗁𝖾 𝗎𝗌𝖾𝗋.", event.messageID, event.threadID);
}
	
}