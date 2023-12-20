const axios = require('axios');
const fs = require('fs');
const path = require('path');
const shiro = process.env['shiro']
module.exports.config = {
  name: 'dalle',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Réynél',
  description: 'A Text to Image Generator using your own Openai API key',
  commandCategory: 'generate',
  usages: '[images of a duck -3], [a kitten]',
  cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
  const apiUrl = 'http://main.yanmaglinte.repl.co/api/dalle';
  let text = args.join(' ');
  if (!text) {
    return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗉𝗋𝗈𝗆𝗉𝗍 𝗍𝗈 𝗂𝗇𝗂𝗍𝗂𝖺𝗍𝖾 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽', event.threadID, event.messageID);
  }

  api.sendMessage(`⌛ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 ${text}, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...`, event.threadID);
  api.setMessageReaction("⌛", event.messageID, (err) => {}, true);

  const requestData = {
    prompt: text,
    apiKey: `${shiro}`,
  };

  axios
    .post(apiUrl, requestData)
    .then(async (response) => {
      const imageUrls = response.data.data.map((item) => item.url);

      for (const imageUrl of imageUrls) {
        const imagePath = path.join(__dirname, 'cache', 'dalle', '1.jpg');
        const imageDirectory = path.dirname(imagePath);

        if (!fs.existsSync(imageDirectory)) {
          fs.mkdirSync(imageDirectory, { recursive: true });
        }

        try {
          const { data } = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          fs.writeFileSync(imagePath, Buffer.from(data, 'binary'));

          const imageAttachment = fs.createReadStream(imagePath);
          api.sendMessage({ attachment: imageAttachment }, event.threadID);
          api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        } catch (error) {
          console.error('Image Error:', error);
          api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝖾 𝗍𝗁𝖾 𝗂𝗆𝖺𝗀𝖾. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇.', event.threadID, event.messageID);
          api.setMessageReaction("❎", event.messageID, (err) => {}, true);
        }
      }
    })
    .catch((error) => {
      console.error('API Error:', error);
      api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗌𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀 𝗐𝖾𝗇𝗍 𝗐𝗋𝗈𝗇𝗀. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇.', event.threadID, event.messageID);
      api.setMessageReaction("❎", event.messageID, (err) => {}, true);
    });
};
