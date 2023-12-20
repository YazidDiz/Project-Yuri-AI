const axios = require('axios');

module.exports.config = {
    name: 'japaname',
    version: '1',
    hasPermission: 0,
    credits: 'Réynél',
    description: 'Convert a name into Japanese',
    usages: '[name]',
    commandCategory: 'translator',
    cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
    try {
        const name = args.join(' ');

        if (!name) {
            return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗇𝖺𝗆𝖾 𝗍𝗈 𝖼𝗈𝗇𝗏𝖾𝗋𝗍.', event.threadID, event.messageID);
        }

        const apiUrl = `https://japanese-name-converter.august-api.repl.co/convertName?name=${encodeURIComponent(name)}`;
        const response = await axios.get(apiUrl);

        if (response.data.convertedName) {
            api.sendMessage(`✅ | "${name}" 𝖼𝗈𝗇𝗏𝖾𝗋𝗍𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒:\n\n${response.data.convertedName}`, event.threadID, event.messageID);
        } else {
            api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖼𝗈𝗇𝗏𝖾𝗋𝗍𝗂𝗇𝗀 𝗇𝖺𝗆𝖾. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', event.threadID, event.messageID);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾  𝖼𝗈𝗇𝗏𝖾𝗋𝗍𝗂𝗇𝗀 𝗇𝖺𝗆𝖾. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', event.threadID, event.messageID);
    }
};