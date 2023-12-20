const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
  name: "fbmeta",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Clark",
  description: "fbmeta AI Image Generator.",
  commandCategory: "ai",
  cooldowns: 5
};

module.exports.run = async function ({ args, event, api }) {
  try {
    const prompt = args.join(" ");

    const waitingMessage = await api.sendMessage("⏳ | 𝖠𝗇𝗌𝗐𝖾𝗋𝗂𝗇𝗀 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", event.threadID);

    const url = `https://project-meta.onrender.com/meta?prompt=${encodeURIComponent(prompt)}`;

    const response = await axios.get(url);
    const data = response.data;

    if (!data || data.length === 0) {
      throw new Error("❎ | 𝖤𝗆𝗉𝗍𝗒 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾 𝗈𝗋 𝗇𝗈 𝗂𝗆𝖺𝗀𝖾𝗌 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝖾𝖽.");
    }

    const imgData = [];

    for (let i = 0; i < data.length; i++) {
      const imgUrl = data[i];
      const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
      const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
      await fs.outputFile(imgPath, imgResponse.data);
      imgData.push(fs.createReadStream(imgPath));
    }

    await api.sendMessage({
      body: `✅ | 𝖦𝖾𝗇𝖾𝗋𝖺𝗍𝖾𝖽`,
      attachment: imgData
    }, event.threadID);

  } catch (error) {
    console.error(error);
    await api.sendMessage(`❎ | 𝖦𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗈𝗇 𝖿𝖺𝗂𝗅𝖾𝖽!\n𝖤𝗋𝗋𝗈𝗋: ${error.message}`, event.threadID);
  }
};