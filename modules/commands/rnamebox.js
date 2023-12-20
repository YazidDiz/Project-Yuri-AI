module.exports.config = {
	name: "rnamebox",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Réynél",
	description: "Change the nickname of the entire group",
	commandCategory: "group",
	usages: "[Nickname needs to be placed]",
	cooldowns: 20,
};

module.exports.run = async ({ event, api, args, Threads }) => {
    const custom = args.join(" "),
            allThread = await Threads.getAll(["threadID"]);
    var threadError = [],
        count = 0;
    if (custom.length != 0) {
        for (const idThread of allThread) {
            api.setTitle(custom, idThread.threadID, (err) => (err) ? threadError.push(idThread.threadID) : '');
            count+=1;
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖼𝗁𝖺𝗇𝗀𝖾𝖽 ${count} 𝗀𝗋𝗈𝗎𝗉 𝗇𝖺𝗆𝖾𝗌.`, event.threadID, () => {
            if (threadError != 0) return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖨 𝖼𝖺𝗇'𝗍 𝖼𝗁𝖺𝗇𝗀𝖾 𝗍𝗁𝖾 𝗇𝖺𝗆𝖾 𝖺𝗍 " + threadError.lenght + " 𝗀𝗋𝗈𝗎𝗉.",event.threadID, event.messageID)
        }, event.messageID);
    }
}