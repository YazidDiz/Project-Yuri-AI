const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "rizz",
  version: "1.0.",
  hasPermission: 0,
  credits: "Réynél",
  description: "GENERATE QUOTES",
  commandCategory: "quotes",
  cooldowns: 2,
};

const SAD_QUOTES_API = 'https://ap-rizz.chatbotmesss.repl.co/api/rizz';

module.exports.run = async ({ api, event }) => {
  try {
    const response = await axios.get(SAD_QUOTES_API);
    const { quote, author } = response.data;

   
    const imageUrl = 'https://i.imgur.com/5IcjJw5.gif'; 
    const imageFileName = 'img.png'; 
    const cacheFolderPath = path.join(__dirname, 'cache');
    const imagePath = path.join(cacheFolderPath, imageFileName);

    if (!fs.existsSync(cacheFolderPath)) {
      fs.mkdirSync(cacheFolderPath);
    }

    try {
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      fs.writeFileSync(imagePath, Buffer.from(imageResponse.data));
    } catch (error) {
      console.error('Error downloading the image:', error);
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗊𝗎𝗈𝗍𝖾𝗌 𝗈𝗋 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗍𝗁𝖾 𝗂𝗆𝖺𝗀𝖾.", event.threadID, event.messageID);
      return;
    }


    const message = {
      body: quote + ' - ' + author,
      attachment: fs.createReadStream(imagePath),
    };


    try {
      await api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error('Error sending message:', error);
    }

  
    fs.unlinkSync(imagePath);
  } catch (error) {
    console.error('Error fetching quotes or sending the image:', error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗊𝗎𝗈𝗍𝖾𝗌 𝗈𝗋 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗍𝗁𝖾 𝗂𝗆𝖺𝗀𝖾.", event.threadID, event.messageID);
  }
};


process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});