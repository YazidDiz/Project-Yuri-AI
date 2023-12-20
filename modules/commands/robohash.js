const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: 'robohash',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'Generate a robot avatar image',
  commandCategory: 'generate',
  usages: '[text]',
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const text = args.join(' ');
    const apiUrl = `https://robohash.org/${encodeURIComponent(text)}.png`;

    api.sendMessage('⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨’𝗆 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝖺 𝗋𝗈𝖻𝗈𝗍 𝖺𝗏𝖺𝗍𝖺𝗋 𝗂𝗆𝖺𝗀𝖾. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...', event.threadID, event.messageID);

    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

    if (response.status === 200 && response.data) {
      const pathToAvatar = path.join(__dirname, 'cache', 'robohash.png');
      fs.writeFileSync(pathToAvatar, Buffer.from(response.data, 'binary'));

      api.sendMessage({
        body: '✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖧𝖾𝗋𝖾 𝗂𝗌 𝗍𝗁𝖾 𝗋𝖾𝗌𝗎𝗅𝗍:',
        attachment: fs.createReadStream(pathToAvatar),
      }, event.threadID, () => fs.unlinkSync(pathToAvatar));
    } else {
      api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝖾 𝗍𝗁𝖾 𝗋𝗈𝖻𝗈𝗍 𝖺𝗏𝖺𝗍𝖺𝗋 𝗂𝗆𝖺𝗀𝖾.', event.threadID, eventMessageID);
    }
  } catch (error) {
    console.error('Error:', error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝗋𝗈𝖻𝗈𝗍 𝖺𝗏𝖺𝗍𝖺𝗋 𝗂𝗆𝖺𝗀𝖾.', event.threadID, eventMessageID);
  }
};