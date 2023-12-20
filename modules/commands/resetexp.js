module.exports.config = {
    name: "resetexp",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Réynél",
    description: "reset the exp of all members in group cc del all",
    commandCategory: "system",
    usages: "[mention] [cc] [del] [all]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, Currencies }) => {
    const data = await api.getThreadInfo(event.threadID);
    for (const user of data.userInfo) {
        var currenciesData = await Currencies.getData(user.id)
        if (currenciesData != false) {
            var exp = currenciesData.exp;
            if (typeof exp != "undefined") {
                exp -= exp;
                await Currencies.setData(user.id, { exp });
            }
        }
    }
    return api.sendMessage("✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗋𝖾𝗌𝖾𝗍 𝗍𝗁𝖾 𝗆𝖾𝗆𝖻𝖾𝗋𝗌 𝖾𝗑𝗉 𝗂𝗇 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉.", event.threadID);
}