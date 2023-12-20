module.exports.config = {
	name: "daily",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Get 1000 coins every day!",
	commandCategory: "economy",
  cooldowns: 5,
  envConfig: {
        cooldownTime: 43200000,
        rewardCoin: 1000
    }
};

module.exports.languages = {
    
    "en": {
        "cooldown": "🕐 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗋𝖾𝖼𝖾𝗂𝗏𝖾𝖽 𝗍𝗈𝖽𝖺𝗒'𝗌 𝗋𝖾𝗐𝖺𝗋𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖼𝗈𝗆𝖻𝖺𝖼𝗄 𝖺𝖿𝗍𝖾𝗋: %1 𝗁𝗈𝗎𝗋𝗌 %2 𝗆𝗂𝗇𝗎𝗍𝖾𝗌 %3 𝗌𝖾𝖼𝗈𝗇𝖽𝗌.",
        "rewarded": `💰 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗋𝖾𝖼𝖾𝗂𝗏𝖾𝖽 《%1$》 𝗈𝗇𝗅𝗒 𝗍𝗈 𝖺𝗏𝗈𝗂𝖽 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝖺𝖻𝗎𝗌𝗂𝗇𝗀, 𝖺𝗇𝖽 𝗍𝗈 𝖼𝗈𝗇𝗍𝗂𝗇𝗎𝖾 𝗍𝗈 𝗋𝖾𝖼𝖾𝗂𝗏𝖾 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝖺𝖿𝗍𝖾𝗋 《𝟣𝟤 𝗁𝗈𝗎𝗋𝗌》`
    }
}

module.exports.run = async ({ event, api, Currencies, getText }) => {
    const { daily } = global.configModule,
        cooldownTime = daily.cooldownTime,
        rewardCoin = daily.rewardCoin;

    var { senderID, threadID, messageID } = event;

    let data = (await Currencies.getData(senderID)).data || {};
    if (typeof data !== "undefined" && cooldownTime - (Date.now() - (data.dailyCoolDown || 0)) > 0) {
        var time = cooldownTime - (Date.now() - data.dailyCoolDown),
            seconds = Math.floor( (time/1000) % 60 ),
            minutes = Math.floor( (time/1000/60) % 60 ),
            hours = Math.floor( (time/(1000*60*60)) % 24 );

		return api.sendMessage(getText("cooldown", hours, minutes, (seconds < 10 ? "0" : "") + seconds), threadID, messageID);
    }

    else return api.sendMessage(getText("rewarded", rewardCoin), threadID, async () => {
        await Currencies.increaseMoney(senderID, rewardCoin);
        data.dailyCoolDown = Date.now();
        await Currencies.setData(senderID, { data });
        return;
    }, messageID);
}