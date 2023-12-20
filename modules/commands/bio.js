module.exports.config = {
	name: "bio",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Réynél",
	description: "Change bot's bio",
	commandCategory: "facebook",
	usages: "[text]",
  cooldowns: 5
  
}
  
  module.exports.run = async ({ api, event, global, args, permssion, utils, client, Users }) => {
    api.changeBio(args.join(" "), (e) => {
      if(e) api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽" + e, event.threadID); return api.sendMessage("✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖼𝗁𝖺𝗇𝗀𝖾𝖽 𝗆𝗒 𝖻𝗂𝗈𝗀𝗋𝖺𝗉𝗁𝗒 𝗂𝗇𝗍𝗈: \n"+args.join(" "), event.threadID, event.messgaeID)
    }
    )
    }