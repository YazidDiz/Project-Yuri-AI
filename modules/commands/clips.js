const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "clips",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Get movie clips",
  commandCategory: "media",
  usages: "[text]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const text = args.join(" ");
    const response = await axios.get(`https://for-devs.rishadapis.repl.co/api/movie/clips?apikey=fuck&text=${encodeURIComponent(text)}`);
    const clipUrl = response.data.data[0];

    if (!clipUrl) {
      return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝖼𝗅𝗂𝗉𝗌 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾𝖽 𝗍𝖾𝗑𝗍.', event.threadID);
    }

    const clipResponse = await axios.get(clipUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(__dirname + '/cache/clips.mp4', Buffer.from(clipResponse.data));

    return api.sendMessage({
      body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖼𝗅𝗂𝗉:",
      attachment: fs.createReadStream(__dirname + '/cache/clips.mp4')
    }, event.threadID);
  } catch (error) {
    console.error(error);
    return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝖼𝗅𝗂𝗉.', event.threadID);
  }
};
