module.exports.config = {
    name: "resetmoney",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Réynél",
    description: "Reset the amount of the whole group about 0",
    commandCategory: "system",
    usages: "[mention] [cc] [del] [all]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, Currencies }) => {
    const data = await api.getThreadInfo(event.threadID);
    for (const user of data.userInfo) {
        var currenciesData = await Currencies.getData(user.id)
        if (currenciesData != false) {
            var money = currenciesData.money;
            if (typeof money != "undefined") {
                money -= money;
                await Currencies.setData(user.id, { money });
            }
        }
    }
    return api.sendMessage("✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗆𝗈𝗇𝖾𝗒 𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝗀𝗋𝗈𝗎𝗉 𝗆𝖾𝗆𝖻𝖾𝗋𝗌 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇", event.threadID);
}