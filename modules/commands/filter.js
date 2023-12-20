module.exports.config = {
    name: "filter",
    version: "2.0.0",
    hasPermssion: 1,
    credits: "Réynél",
    description: "Filter Facebook User",
    commandCategory: "group",
    usages: "[filter]",
    cooldowns: 300
}

module.exports.run = async function({ api, event }) {
    const { userInfo, adminIDs } = await api.getThreadInfo(event.threadID);
    let filteredUsers = 0;
    let usersWithoutGender = 0;
    let usersWithoutFilter = [];

    for (const user of userInfo) {
        if (user.gender === undefined) {
            usersWithoutFilter.push(user.id);
        }
    }

    const isBotAdmin = adminIDs.map((id) => id).some((adminID) => adminID === api.getCurrentUserID());

    if (usersWithoutFilter.length === 0) {
        api.sendMessage("❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗂𝗇 𝗒𝗈𝗎𝗋 𝗀𝗋𝗈𝗎𝗉 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍 '𝖿𝗂𝗅𝗍𝖾𝗋 𝗎𝗌𝖾𝗋'.", event.threadID);
    } else {
        api.sendMessage(`⏳ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖿𝗂𝗅𝗍𝖾𝗋𝗂𝗇𝗀 𝖿𝗋𝗂𝖾𝗇𝖽𝗌 𝗈𝖿 𝖿𝗋𝗂𝖾𝗇𝖽𝗌 𝗐𝗂𝗍𝗁𝗈𝗎𝗍 𝖿𝗂𝗅𝗍𝖾𝗋 ${usersWithoutFilter.length} '𝖿𝗂𝗅𝗍𝖾𝗋 𝗎𝗌𝖾𝗋𝗌'.`, event.threadID, function() {
            if (isBotAdmin) {
                api.sendMessage("⏳ | 𝖲𝗍𝖺𝗋𝗍𝗂𝗇𝗀 𝗍𝗈 𝖿𝗂𝗅𝗍𝖾𝗋 𝗆𝖺𝗌𝗍𝖾𝗋...", event.threadID, async function() {
                    for (const userID of usersWithoutFilter) {
                        try {
                            await new Promise((resolve) => setTimeout(resolve, 1000));
                            await api.removeUserFromGroup(parseInt(userID), event.threadID);
                            filteredUsers++;
                        } catch (error) {
                            usersWithoutGender++;
                        }
                    }
                    api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖿𝗂𝗅𝗍𝖾𝗋𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 ${filteredUsers} 𝗉𝖾𝗈𝗉𝗅𝖾.`, event.threadID, function() {
                        if (usersWithoutGender !== 0) {
                            api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖿𝗂𝗅𝗍𝖾𝗋 𝖿𝖺𝗂𝗅𝖾𝖽 ${usersWithoutGender} 𝗉𝖾𝗈𝗉𝗅𝖾.`, event.threadID);
                        }
                    });
                });
            } else {
                api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖨 𝖺𝗆 𝗇𝗈𝗍 𝖺𝗇 𝖺𝖽𝗆𝗂𝗇 𝗌𝗈 𝖨 𝖼𝖺𝗇'𝗍 𝖿𝗂𝗅𝗍𝖾𝗋 𝗈𝗍𝗁𝖾𝗋 𝗎𝗌𝖾𝗋𝗌.", event.threadID);
            }
        });
    }
};
