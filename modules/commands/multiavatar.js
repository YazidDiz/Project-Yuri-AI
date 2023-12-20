module.exports.config = {
  name: "multiavatar",
  version: "2.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Search for an avatar randomly",
  commandCategory: "generate",
  usages: "[name]",
  cooldowns: 5
};

const axios = global.nodemodule['axios'];
const fs = global.nodemodule['fs-extra'];
const path = require('path');

module.exports.run = async function ({ api, event, args }) {
    const apiKey = 'qQ1f2UeVN0zCuB';
    const name = args.join(" ");

    if (!name) {
        return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗇𝖺𝗆𝖾 𝗍𝗈 𝗌𝖾𝖺𝗋𝖼𝗁 𝖺 𝗋𝖺𝗇𝖽𝗈𝗆 𝖺𝗏𝖺𝗍𝖺𝗋 𝖿𝗈𝗋 𝗒𝗈𝗎.", event.threadID, event.messageID);
    }

    const url = `https://api.multiavatar.com/${encodeURIComponent(name)}.png?apikey=${apiKey}`;
    const pathToAvatar = path.join(__dirname, `/cache/multiavatar.png`);

    try {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        fs.writeFileSync(pathToAvatar, Buffer.from(response.data, "binary"));

        api.sendMessage({
            body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖺𝗏𝖺𝗍𝖺𝗋:",
            attachment: fs.createReadStream(pathToAvatar)
        }, event.threadID, event.messageID);

        fs.unlinkSync(pathToAvatar);
    } catch (error) {
        console.error(error);
        api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝗉𝗂𝗑𝖾𝗅 𝖺𝗏𝖺𝗍𝖺𝗋.", event.threadID, event.messageID);
    }
}