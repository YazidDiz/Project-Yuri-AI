const axios = require('axios');

module.exports.config = {
    name: "grabfav",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Clark",
    description: "Grab Favicon for a domain",
    commandCategory: "tools",
    cooldowns: 3,
};

module.exports.run = async ({ api, event, args }) => {
    if (!args[0]) {
        return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝖽𝗈𝗆𝖺𝗂𝗇 𝗍𝗈 𝗀𝗋𝖺𝖻 𝗍𝗁𝖾 𝖿𝖺𝗏𝗂𝖼𝗈𝗇.", event.threadID, event.messageID);
    }

    const apiUrl = `https://apihunt-favicon-grabber.augustquinn.repl.co/Grab/${args[0]}`;

    try {
        const response = await axios.get(apiUrl);

        if (response.status === 200) {
            const data = response.data;

            if (data.icons.length === 0) {
                return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝖿𝖺𝗏𝗂𝖼𝗈𝗇 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾𝖽 𝖽𝗈𝗆𝖺𝗂𝗇.", event.threadID, event.messageID);
            }

            const formattedIcons = data.icons.map((icon, index) => `${index + 1}. ${icon.src}`).join("\n");

            const resultMessage = `
🌐 | 𝗙𝗮𝘃𝗶𝗰𝗼𝗻 𝗳𝗼𝗿 《${data.domain}》:\n━━━━━━━━━━━━━━━━━━━\n
${formattedIcons}
`;

            api.sendMessage(resultMessage, event.threadID, event.messageID);
        } else {
            api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖿𝖺𝗏𝗂𝖼𝗈𝗇 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.", event.threadID, event.messageID);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖿𝖺𝗏𝗂𝖼𝗈𝗇 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.", event.threadID, event.messageID);
    }
};