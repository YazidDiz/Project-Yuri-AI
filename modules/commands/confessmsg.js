module.exports.config = {
	name: "confesssmsg",
	version: "1.0.7",
	hasPermssion: 0,
	credits: "Réynél",
	description: "confessmsg [uid] [text]",
  commandCategory: "confess",
	usages: "[Uid] [Text]",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
 //if (!args[0]) return api.sendMessage(`${api.getthreadID()}`, event.threadID);
    
	var idbox = args[0];
    var reason = args.slice(1);
	//let threadID = await api.getThreadID();
	if (args.length == 0) api.sendMessage("❎ | 𝖲𝗒𝗇𝗍𝖺𝗑 𝖾𝗋𝗋𝗈𝗋, 𝗎𝗌𝖾: 𝖼𝗈𝗇𝖿𝖾𝗌𝗌𝗆𝗌𝗀 [𝗎𝗂𝖽] [𝗆𝖾𝗌𝗌𝗌𝖺𝗀𝖾]", event.threadID, event.messageID);
	
	else if(reason == "")api.sendMessage("❎ | 𝖲𝗒𝗇𝗍𝖺𝗑 𝖾𝗋𝗋𝗈𝗋, 𝗎𝗌𝖾: 𝖼𝗈𝗇𝖿𝖾𝗌𝗌𝗆𝗌𝗀 [𝗎𝗂𝖽] [𝗆𝖾𝗌𝗌𝗌𝖺𝗀𝖾]", event.threadID, event.messageID);
	
	else
		api.sendMessage("👁‍🗨 | 𝗙𝗿𝗼𝗺 𝗬𝗼𝘂𝗿 𝗔𝗱𝗺𝗶𝗿𝗲𝗿: \n\n" + reason.join(" "), idbox, () =>
			api.sendMessage(`${api.getCurrentUserID()}`, () =>
				api.sendMessage("✅ | 𝖲𝖾𝗇𝗍 𝗆𝖾𝗌𝗌𝖺𝗀𝖾: " + reason.join(" "), event.threadID)));
  }
  