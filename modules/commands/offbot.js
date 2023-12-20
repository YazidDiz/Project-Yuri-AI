module.exports.config = {
	name: "off",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Réynél",
	description: "turn off the bot",
	commandCategory: "system",
  usages: "[off]",
	cooldowns: 0
        };
module.exports.run = ({event, api}) =>api.sendMessage(`🌟 | 𝖬𝖺𝗌𝗍𝖾𝗋, ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 ${global.config.BOTNAME} 𝗂𝗌 𝗇𝗈𝗐 𝗍𝗎𝗋𝗇𝗂𝗇𝗀 𝗈𝖿𝖿, 𝗀𝗈𝗈𝖽𝖻𝗒𝖾 𝗆𝖺𝗌𝗍𝖾𝗋...`,event.threadID, () =>process.exit(0))