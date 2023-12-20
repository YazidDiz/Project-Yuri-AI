const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: 'tikdl',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'Download tiktok video without watermark',
  commandCategory: 'downloader',
  usages: '[TikTok Video URL]',
  cooldowns: 10,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args.length !== 1) {
      return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝖳𝗂𝗄𝖳𝗈𝗄 𝗏𝗂𝖽𝖾𝗈 𝖴𝖱𝖫.', event.threadID);
    }

    const tikTokUrl = args[0];
    const apiUrl = `https://sensui-useless-apis.codersensui.repl.co/api/tools/tiktokdl?url=${encodeURIComponent(tikTokUrl)}`;

    const response = await axios.get(apiUrl);
    const videoUrl = response.data.noWatermarkHd;

    if (!videoUrl) {
      return api.sendMessage('📥 | 𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝗂𝗇𝗀 𝗍𝗁𝖾 𝗏𝗂𝖽𝖾𝗈 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍', event.threadID);
    }

    const videoResponse = await axios.get(videoUrl, { responseType: 'stream' });

    const tempFolderPath = path.join(__dirname, '..', '..', 'temp');
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath);
    }

    const videoFilePath = path.join(tempFolderPath, 'tiktok_video.mp4');
    const writer = fs.createWriteStream(videoFilePath);

    videoResponse.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    const message = {
      body: '✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾’𝗌 𝗒𝗈𝗎𝗋 𝖳𝗂𝗄𝖳𝗈𝗄 𝗏𝗂𝖽𝖾𝗈:',
      attachment: fs.createReadStream(videoFilePath),
    };


    await api.sendMessage(message, event.threadID);


    fs.unlinkSync(videoFilePath);
  } catch (error) {
    console.error('Error in tiktokdl command:', error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.', event.threadID);
  }
};