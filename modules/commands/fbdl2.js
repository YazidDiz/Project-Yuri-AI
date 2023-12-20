const axios = require("axios");

module.exports.config = {
  name: 'fbdl',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'Download and send a Facebook video',
  commandCategory: 'downloader',
  usages: '[video URL]',
  cooldowns: 3,
};

module.exports.run = async function ({ api, args, event }) {
  if (!args[0]) {
    return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝖴𝖱𝖫 𝗂𝗌 𝗆𝗂𝗌𝗌𝗂𝗇𝗀!", event.threadID);
  }

  try {
    const videoUrl = args[0];

    
    const apiUrl = `https://alln1.gay-api.repl.co/api/fbdl?url=${encodeURIComponent(videoUrl)}`;

    
    api.sendMessage('📥 | 𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝗂𝗇𝗀 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...', event.threadID);

    
    const response = await axios.get(apiUrl, { responseType: 'stream' });

    // Check if the response status is OK (200)
    if (response.status === 200) {
      const videoStream = response.data;

      
      api.sendMessage(
        {
          attachment: videoStream,
        },
        event.threadID
      );
    } else {
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖾𝗋𝗋𝗈𝗋 𝖽𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝗂𝗇𝗀 𝗏𝗂𝖽𝖾𝗈.", event.threadID);
    }
  } catch (error) {
    console.error('Error downloading video:', error.message);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖾𝗋𝗋𝗈𝗋 𝖽𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝗂𝗇𝗀 𝗏𝗂𝖽𝖾𝗈.", event.threadID);
  }
};