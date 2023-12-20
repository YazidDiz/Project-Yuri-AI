module.exports.config = {
	name: "on",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "Réynél",
	description: "turn on the bot",
	commandCategory: "system",
  usages: "[on]",
	cooldowns: 0
        };
module.exports.run = ({event, api}) =>api.sendMessage(`🌟 | 𝖬𝖺𝗌𝗍𝖾𝗋, ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 ${global.config.BOTNAME} 𝗂𝗌 𝗇𝗈𝗐 𝗍𝗎𝗋𝗇𝗂𝗇𝗀 𝗈𝗇, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍 𝗉𝖺𝗍𝗂𝖾𝗇𝗍𝗅𝗒...`,event.threadID, () =>process.enter(0))
