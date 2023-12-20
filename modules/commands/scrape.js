const axios = require('axios');
const fs = require('fs');
module.exports.config = {
  name: 'scrape',
  version: '1.1.0',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'Scrape data from a URL using AbstractAPI',
  commandCategory: 'tools',
  usages: '[URL]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const apiKey = 'dc3fc7bc7dc540a7b1df7827fe205360';
  const url = args[0];

  if (!url) {
    api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗎𝗋𝗅 𝗍𝗈 𝗌𝖼𝗋𝖺𝗉𝖾.', threadID, messageID);
    return;
  }

  const processingGIF = (
    await axios.get(
      'https://drive.google.com/uc?export=download&id=1Im1nktqQ59ErykI7Rg-01UpKm7E951NJ',
      { responseType: 'stream' }
    )
  ).data;

  const processingMessage = await api.sendMessage(
    {
      body: '⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨’𝗆 𝗌𝖼𝗋𝖺𝗉𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...',
      attachment: processingGIF,
    },
    threadID
  );

  try {
    const response = await axios.get(`https://scrape.abstractapi.com/v1/?api_key=${apiKey}&url=${encodeURIComponent(url)}`);
    const { status, data } = response;
    api.unsendMessage(processingMessage.messageID);

    if (status === 200) {
      const limitedResult = data.substring(0, 19000);

      const filename = 'scraped_data.txt';
      fs.writeFileSync(filename, data);

      api.sendMessage(`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 𝗌𝖼𝗋𝖺𝗉𝖾𝖽 𝖽𝖺𝗍𝖺:\n━━━━━━━━━━━━━━━━━━━\n${limitedResult}...\n━━━━━━━━━━━━━━━━━━━\n𝗡𝗢𝗧𝗘: 𝖳𝗁𝖾 𝗌𝖼𝗋𝖺𝗉𝖾𝖽 𝖽𝖺𝗍𝖺 𝗂𝗌 𝗍𝗈𝗈 𝗅𝗈𝗇𝗀 𝗍𝗈 𝗌𝖾𝗇𝖽 𝗂𝗇 𝖺 𝗌𝗂𝗇𝗀𝗅𝖾 𝗆𝖾𝗌𝗌𝖺𝗀𝖾. 𝖳𝗁𝖾 𝗐𝗈𝗋𝖽 𝖼𝗈𝗎𝗇𝗍 𝗅𝗂𝗆𝗂𝗍 𝖿𝗈𝗋 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌 𝗈𝗇 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄/𝗆𝖾𝗌𝗌𝖾𝗇𝗀𝖾𝗋 𝗂𝗌 𝟤𝟢,𝟢𝟢𝟢 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋𝗌 𝗈𝗇𝗅𝗒.\n━━━━━━━━━━━━━━━━━━━\n𝖳𝗈 𝗏𝗂𝖾𝗐 𝗍𝗁𝖾 𝖿𝗎𝗅𝗅 𝗋𝖾𝗌𝗎𝗅𝗍, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖽𝗈𝗐𝗇𝗅𝗈𝖺𝖽 𝗍𝗁𝖾 𝖺𝗍𝗍𝖺𝖼𝗁𝖾𝖽 𝗍𝗑𝗍 𝖿𝗂𝗅𝖾.`, threadID, (error, info) => {
        if (!error) {
          api.sendMessage({ attachment: fs.createReadStream(filename) }, threadID, () => fs.unlinkSync(filename));
        }
      });
    } else {
      api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗌𝖼𝗋𝖺𝗉𝖾 𝗍𝗁𝖾 𝗎𝗋𝗅 𝗉𝗋𝗈𝗏𝗂𝖽𝖾𝖽. 𝖯𝗅𝖾𝖺𝗌𝖾 𝖼𝗁𝖾𝖼𝗄 𝗍𝗁𝖾 𝗎𝗋𝗅 𝗈𝗋 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗌𝖼𝗋𝖺𝗉𝗂𝗇𝗀 𝗍𝗁𝖾 𝗎𝗋𝗅. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', threadID, messageID);
  }
};