const axios = require('axios');
const fs = require('fs');

module.exports.config = {
  name: "httpcat",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Get HTTP status cat images",
  commandCategory: "generate",
  usages: "[http status]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (!args[0]) {
      api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺𝗇 𝖧𝖳𝖳𝖯 𝗌𝗍𝖺𝗍𝗎𝗌 𝖼𝗈𝖽𝖾 𝗍𝗈 𝗀𝖾𝗍 𝖺 𝖼𝖺𝗍 𝗂𝗆𝖺𝗀𝖾", event.threadID, event.messageID);
      return;
    }

    const statusCode = args[0];
    const catImageURL = `https://http.cat/${statusCode}.jpg`;

    const catImage = await axios.get(catImageURL, { responseType: 'arraybuffer' });

    fs.writeFileSync('cat.jpg', Buffer.from(catImage.data));
    api.sendMessage(
      {
        attachment: fs.createReadStream('cat.jpg'),
        body: `🐱 | 𝖧𝖳𝖳𝖯 𝖲𝗍𝖺𝗍𝗎𝗌 𝖢𝖺𝗍 𝖿𝗈𝗋 ${statusCode}`
      },
      event.threadID, event.messageID
    );

    fs.unlinkSync('cat.jpg');
  } catch (error) {
    console.error("Error fetching HTTP status cat image:", error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖾𝗋𝗋𝗈𝗋 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖧𝖳𝖳𝖯 𝗌𝗍𝖺𝗍𝗎𝗌 𝖼𝖺𝗍 𝗂𝗆𝖺𝗀𝖾. 𝖢𝗁𝖾𝖼𝗄 𝗍𝗁𝖾 𝗌𝗍𝖺𝗍𝗎𝗌 𝖼𝗈𝖽𝖾 𝖺𝗇𝖽 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇.", event.threadID, event.messageID);
  }
};