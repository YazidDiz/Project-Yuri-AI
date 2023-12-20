const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: 'farlight',
  version: '1.0',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'Random Farlight Video',
  commandCategory: 'entertainment',
  cooldowns: 2,
};

module.exports.run = async ({ api, event }) => {
  try {
    api.sendMessage('🌟 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗋𝖺𝗍𝗍𝗅𝖾 𝗒𝗈𝗎𝗋 𝖽𝖺𝗀𝗌, 𝗐𝖾 𝗀𝗈𝗍 𝖺 𝖿𝗂𝗀𝗁𝗍 𝖼𝗈𝗆𝗂𝗇𝗀.', event.threadID);

    const response = await axios.get('https://farlight.yodi-iyods.repl.co/farlight/?apikey=farlight');
    const videoInfo = response.data;

    const videoUrl = videoInfo.url;


    const videoStreamResponse = await axios.get(videoUrl, { responseType: 'stream' });
    const videoData = videoStreamResponse.data;


    const tempFilePath = '84.mp4';
    const writeStream = fs.createWriteStream(tempFilePath);
    videoData.pipe(writeStream);

    writeStream.on('finish', () => {

      const message = {
        body: '✅ | 𝖣𝗈𝗇𝖾 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖼𝗈𝗆𝖾 𝗈𝗇 𝗒𝗈𝗎 𝖾𝗀𝗀𝗌, 𝗅𝖾𝗍𝗌 𝗀𝗈 𝗆𝖺𝗄𝖾 𝖺 𝗆𝖾𝗌𝗌:',
        attachment: fs.createReadStream(tempFilePath),
      };

      api.sendMessage(message, event.threadID, () => {

        fs.unlink(tempFilePath, (err) => {
          if (err) {
            console.error('Error deleting temporary file:', err);
          }
        });
      });
    });
  } catch (error) {
    console.error('Error fetching or sending the video:', error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗍𝗁𝖾 𝗏𝗂𝖽𝖾𝗈.', event.threadID, event.messageID);
  }
};