module.exports.config = {
	name: "language",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Réynél",
	description: "Change BOT language",
	commandCategory: "system",
	usages: "[vi] [en]",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const { threadID, messageID } = event;

    switch (args[0]) {
        case "vietnames":
        case "vi":
            {
                return api.sendMessage(`✅ | Ngôn ngữ đã được chuyển sang tiếng Việt`, threadID, () => global.config.language = "vi"); 
            }
            break;
        
        case "english":
        case "en":
            {
                return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗅𝖺𝗇𝗀𝗎𝖺𝗀𝖾 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖼𝗈𝗇𝗏𝖾𝗋𝗍𝖾𝖽 𝗍𝗈 𝖾𝗇𝗀𝗅𝗂𝗌𝗁 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒`, threadID, () => global.config.language = "en"); 
            }
            break;
    
        default:
            {
                return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖺 𝗐𝗋𝗈𝗇𝗀 𝗌𝗒𝗇𝗍𝖺𝗑 𝗈𝖿 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.\n\n𝗨𝘀𝗲: 𝗅𝖺𝗇𝗀𝗎𝖺𝗀𝖾 [𝖵𝗂 / 𝖤𝗇]", threadID, messageID);
            }   
            break; 
            
    }	
}