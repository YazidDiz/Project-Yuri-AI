const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: 'motivationalvideo',
  version: '1.0.1',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'Get a random motivational video.',
  commandCategory: 'motivate',
  usages: '[motivationalvideo]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  try {
    const processingMessage = await api.sendMessage(
      {
        body: '⏳ | 𝖨𝗇𝗂𝗍𝗂𝖺𝗅𝗂𝗓𝗂𝗇𝗀 𝗍𝗁𝖾 𝗏𝗂𝖽𝖾𝗈 𝗌𝖾𝗇𝗌𝖾𝗂. 𝖯𝗅𝖾𝖺𝗌𝖾 𝖻𝖾 𝗉𝖺𝗍𝗂𝖾𝗇𝗍...',
      },
      event.threadID
    );

    const response = await axios.get('https://motivational.august-api.repl.co/video', { timeout: 90000 });const videoData = response.data;

    if (!videoData.url) {
      return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝗆𝗈𝗍𝗂𝗏𝖺𝗍𝗂𝗈𝗇𝖺𝗅 video. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', event.threadID, event.messageID);
    }

    const mp4Url = videoData.url.replace(/\.([a-z0-9]+)(?:[\?#]|$)/i, '.mp4$1');

    const videoResponse = await axios.get(mp4Url, { responseType: 'arraybuffer', timeout: 90000 }); 

    const videoPath = path.join(__dirname, 'cache', 'video.mp4');
    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

    await api.sendMessage(
      {
        attachment: fs.createReadStream(videoPath),
        body: `🎥 | 𝗠𝗢𝗧𝗜𝗩𝗔𝗧𝗜𝗢𝗡𝗔𝗟 𝗩𝗜𝗗𝗘𝗢\n\n  – “${videoData.title}”`,
      },
      event.threadID
    );

    fs.unlink(videoPath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      } else {
        console.log(`Clear File Successfully for Motivational video: ${videoPath}`);
      }
    });
  } catch (error) {
    console.error('Error processing Motivational Video command:', error);

    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗍𝗁𝖾 𝗋𝖾𝗊𝗎𝖾𝗌𝗍 𝗍𝗂𝗆𝖾𝖽 𝗈𝗎𝗍. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', event.threadID);
    } else {
      api.sendMessage(
        '❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝖬𝗈𝗍𝗂𝗏𝖺𝗍𝗂𝗈𝗇𝖺𝗅 𝖵𝗂𝖽𝖾𝗈. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.',
        event.threadID
      );
    }
  }
};