module.exports.config = {
	name: "fish",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Sell own capital",
	commandCategory: "economy",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 1000000
    }
};

module.exports.languages = {
    
        
    "en": {
        "cooldown": "ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗐𝗈𝗋𝗄𝖾𝖽 𝗍𝗈𝖽𝖺𝗒, 𝗍𝗈 𝖺𝗏𝗈𝗂𝖽 𝖾𝗑𝗁𝖺𝗎𝗌𝗍𝗂𝗈𝗇 𝗉𝗅𝖾𝖺𝗌𝖾 𝖼𝗈𝗆𝖾𝖻𝖺𝖼𝗄 𝖺𝖿𝗍𝖾𝗋 %1 𝗆𝗂𝗇𝗎𝗍𝖾(𝗌) %2 𝗌𝖾𝖼𝗈𝗇𝖽(𝗌).",
        "rewarded": "🐟 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎'𝗏𝖾 𝗀𝖾𝗍 𝖻𝗂𝗀 𝖿𝗂𝗌𝗁 𝖺𝗀𝖺𝗂𝗇 𝗍𝗈𝖽𝖺𝗒, 𝖺𝗇𝖽 𝖻𝖾𝖾𝗇 𝗌𝗈𝗅𝖽 𝖿𝗈𝗋: %2$",
        "job1": "Fishing",
    }
}

module.exports.run = async ({ event, api, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.workTime) > 0) {
        var time = cooldown - (Date.now() - data.workTime),
            minutes = Math.floor(time / 20000),
            seconds = ((time % 20000) / 500).toFixed(0);
        
		return api.sendMessage(getText("cooldown", minutes, (seconds < 10 ? "0" + seconds : seconds)), event.threadID, event.messageID);
    }
    else {
        const job = [
            getText("Fishing"),
        ];
        const amount = Math.floor(Math.random() * 1000000);
        return api.sendMessage(getText("rewarded", job[Math.floor(Math.random() * job.length)], amount), threadID, async () => {
            await Currencies.increaseMoney(senderID, parseInt(amount));
            data.workTime = Date.now();
            await Currencies.setData(event.senderID, { data });
            return;
        }, messageID);
    }     
}