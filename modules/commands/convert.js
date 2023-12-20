const axios = require('axios');
const fs = require('fs');
module.exports.config = {
  name: 'convert',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'Convert media from a link (supports jpeg, jpg, png, mp4, gif, wav)',
  commandCategory: 'tools',
  usages: '[link]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const url = args[0];

  if (!url) {
    return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗅𝗂𝗇𝗄 𝗍𝗈 𝖼𝗈𝗇𝗏𝖾𝗋𝗍 𝗆𝖾𝖽𝗂𝖺 𝖿𝗋𝗈𝗆.', event.threadID, event.messageID);
  }

  const validExtensions = ['.jpeg', '.jpg', '.png', '.mp4', '.mp3', '.pdf', '.raw', '.docx', '.txt', '.gif', '.wav'];
  const extension = url.substring(url.lastIndexOf('.'));

  if (!validExtensions.includes(extension.toLowerCase())) {
    return api.sendMessage('❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗎𝗇𝗌𝗎𝗉𝗉𝗈𝗋𝗍𝖾𝖽 𝖿𝗈𝗋𝗆𝖺𝗍 𝗈𝖿 𝗍𝗁𝖾 𝖿𝗂𝗅𝖾.\n\n𝗦𝘂𝗽𝗽𝗼𝗿𝘁𝗲𝗱 𝗙𝗼𝗿𝗺𝗮𝘁𝘀:\n𝖩𝗉𝖾𝗀, 𝖩𝗉𝗀, 𝖯𝗇𝗀, 𝖬𝗉𝟦, 𝖬𝗉𝟥, 𝖯𝖽𝖿, 𝖱𝖺𝗐, 𝖣𝗈𝖼𝗑, 𝖳𝗑𝗍, 𝖦𝗂𝖿, 𝖶𝖺𝗏.', event.threadID, event.messageID);
  }

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    if (response.status !== 200) {
      return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝖿𝖾𝗍𝖼𝗁 𝗍𝗁𝖾 𝗆𝖾𝖽𝗂𝖺 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾𝖽 𝗅𝗂𝗇𝗄.', event.threadID, event.messageID);
    }

    const filename = `converted${extension}`;
    fs.writeFileSync(filename, Buffer.from(response.data, 'binary'));

    api.sendMessage(
      {
        body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖼𝗈𝗇𝗏𝖾𝗋𝗍𝖾𝖽 𝗆𝖾𝖽𝗂𝖺 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾𝖽 𝗅𝗂𝗇𝗄: ${url}`,
        attachment: fs.createReadStream(filename),
      },
      event.threadID,
      () => fs.unlinkSync(filename)
    );
  } catch (error) {
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖼𝗈𝗇𝗏𝖾𝗋𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝗆𝖾𝖽𝗂𝖺.', event.threadID, event.messageID);
    console.error(error);
  }
};