const axios = require('axios');
const fs = require('fs');

module.exports.config = {
  name: 'itunes',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'Search iTunes content and send audio/video as an attachment',
  commandCategory: 'media',
  usages: '[searchTerm]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID } = event;
  const searchTerm = args.join(' ');

  if (!searchTerm) {
    return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗌𝖾𝖺𝗋𝖼𝗁 𝗍𝖾𝗋𝗆 𝗍𝗈 𝖿𝗂𝗇𝖽 𝖼𝗈𝗇𝗍𝖾𝗇𝗍 𝗈𝗇 𝗂𝖳𝗎𝗇𝖾𝗌.', threadID, event.messageID);
  }

  try {
    const response = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}`);
    const data = response.data.results[0];

    if (data) {
      const {
        collectionName,
        artistName,
        collectionPrice,
        collectionExplicitness,
        trackCount,
        copyright,
        country,
        currency,
        releaseDate,
        primaryGenreName,
        previewUrl,
      } = data;

      const audioResponse = await axios.get(previewUrl, { responseType: 'stream' });
      const audioStream = audioResponse.data;

      api.sendMessage(
        {
          body: `╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n  ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n\n𝗧𝗶𝘁𝗹𝗲: ${collectionName}\n𝗔𝗿𝘁𝗶𝘀𝘁: ${artistName}\n𝗣𝗿𝗶𝗰𝗲: ${currency} ${collectionPrice}\n𝗘𝘅𝗽𝗹𝗶𝗰𝗶𝘁: ${collectionExplicitness}\n𝗧𝗿𝗮𝗰𝗸 𝗖𝗼𝘂𝗻𝘁: ${trackCount}\n𝗖𝗼𝗽𝘆𝗿𝗶𝗴𝗵𝘁: ${copyright}\n𝗖𝗼𝘂𝗻𝘁𝗿𝘆: ${country}\n𝗥𝗲𝗹𝗲𝗮𝘀𝗲 𝗗𝗮𝘁𝗲: ${releaseDate}\n𝗚𝗲𝗻𝗿𝗲: ${primaryGenreName}`,
          attachment: audioStream,
        },
        threadID
      );
    } else {
      return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗂𝖳𝗎𝗇𝖾𝗌 𝖼𝗈𝗇𝗍𝖾𝗇𝗍 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗀𝗂𝗏𝖾𝗇 𝗌𝖾𝖺𝗋𝖼𝗁 𝗍𝖾𝗋𝗆.', threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗂𝖳𝗎𝗇𝖾𝗌 𝖼𝗈𝗇𝗍𝖾𝗇𝗍. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', threadID, event.messageID);
  }
};