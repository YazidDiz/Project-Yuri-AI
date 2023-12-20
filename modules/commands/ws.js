const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
  name: "ws",
  credits: "Réynél",
  version: "2.0",
  cooldowns: 5,
  hasPermission: 0,
  description: "Search for wallpapers based on a keyword.",
  commandCategory: "searches",
  usage: "{p}ws <𝗄𝖾𝗒𝗐𝗈𝗋𝖽> [𝖺𝗆𝗈𝗎𝗇𝗍]\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲: {p}ws nature 3",
};

module.exports.run = async function ({ api, event, args }) {
  if (args.length < 1) {
    api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗄𝖾𝗒𝗐𝗈𝗋𝖽 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗐𝖺𝗅𝗅𝗉𝖺𝗉𝖾𝗋 𝗌𝖾𝖺𝗋𝖼𝗁.', event.threadID, event.messageID);
    return;
  }

  const keyword = args[0];
  let amount = args[1] || 1;

  amount = parseInt(amount);

  if (isNaN(amount) || amount <= 0) {
    api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗉𝗈𝗌𝗂𝗍𝗂𝗏𝖾 𝗂𝗇𝗍𝖾𝗀𝖾𝗋 𝖿𝗈𝗋 𝗍𝗁𝖾 𝖺𝗆𝗈𝗎𝗇𝗍.', event.threadID, event.messageID);
    return;
  }

  try {
    const response = await axios.get(`https://antr4x.onrender.com/get/searchwallpaper?keyword=${keyword}`);

    if (response.data.status && response.data.img.length > 0) {
      amount = Math.min(amount, response.data.img.length);
      const imgData = [];

      for (let i = 0; i < amount; i++) {
        const image = response.data.img[i];
        const imageName = `wallpaper_${i + 1}.jpg`;
        const imagePath = path.join('cache', imageName);

        try {
          const imageResponse = await axios.get(image, { responseType: 'arraybuffer' });
          await fs.writeFile(imagePath, Buffer.from(imageResponse.data, 'binary'));
          imgData.push(imagePath);
        } catch (error) {
          console.error("Error downloading image:", error);
        }
      }

      api.sendMessage({
        attachment: imgData.map(imgPath => fs.createReadStream(imgPath)),
        body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 𝗐𝖺𝗅𝗅𝗉𝖺𝗉𝖾𝗋𝗌 𝖻𝖺𝗌𝖾𝖽 𝗈𝗇: '${keyword}'`,
      }, event.threadID, (err) => {
        if (err) console.error("Error sending images:", err);

        imgData.forEach(imgPath => {
          fs.unlinkSync(imgPath);
        });
      });
    } else {
      api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗐𝖺𝗅𝗅𝗉𝖺𝗉𝖾𝗋𝗌 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗀𝗂𝗏𝖾𝗇 𝗄𝖾𝗒𝗐𝗈𝗋𝖽.', event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('Error fetching wallpaper images:', error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗐𝖺𝗅𝗅𝗉𝖺𝗉𝖾𝗋 𝗂𝗆𝖺𝗀𝖾𝗌.', event.threadID, event.messageID);
  }
};