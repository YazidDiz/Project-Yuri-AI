const axios = require('axios');
const fs = require('fs');

module.exports.config = {
  name: 'giphy',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Réynél',
  description: 'Search for GIFs on Giphy and send them as attachments.',
  commandCategory: 'searches',
  usages: '[query]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  if (args.length === 0) {
    api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗌𝖾𝖺𝗋𝖼𝗁 𝗊𝗎𝖾𝗋𝗒 𝖿𝗈𝗋 𝗀𝗂𝗉𝗁𝗒.', threadID, messageID);
    return;
  }

  const query = args.join(' ');
  const apiKey = 'QHv1qVaxy4LS3AmaNuUYNT9zr40ReFBI';

  try {
    const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
      params: {
        q: query,
        api_key: apiKey,
        limit: 6,
        rating: 'g',
      },
    });

    if (response.data.data && response.data.data.length > 0) {
      const gifResults = response.data.data;

      const gifAttachments = [];
      for (let i = 0; i < gifResults.length; i++) {
        const gifData = gifResults[i];
        const gifURL = gifData.images.original.url;

        const path1 = __dirname + `/cache/giphy${i}.gif`;
        const getContent = (await axios.get(gifURL, { responseType: 'arraybuffer' })).data;
        fs.writeFileSync(path1, Buffer.from(getContent, 'utf-8'));
        gifAttachments.push(fs.createReadStream(path1));
      }

      api.sendMessage(
        {
          attachment: gifAttachments,
        },
        threadID
      );
    } else {
      api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗀𝗂𝖿𝗌 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾𝖽 𝗊𝗎𝖾𝗋𝗒..', threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖿𝗈𝗋 𝗀𝗂𝖿𝗌.', threadID, messageID);
  }
};