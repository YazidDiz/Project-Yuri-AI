const axios = require('axios');

module.exports.config = {
  name: 'stoic',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Réynél',
  description: 'Get quotes about stoicism.',
  commandCategory: 'quotes',
  usages: '[stoic]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;

  try {
    const response = await axios.get('https://api.themotivate365.com/stoic-quote');

    if (response.status === 200 && response.data && response.data.author && response.data.quote) {
      const author = response.data.author;
      const quote = response.data.quote;

      api.sendMessage(`🧘‍♂️ | 𝗥𝗔𝗡𝗗𝗢𝗠 𝗦𝗧𝗢𝗜𝗖𝗜𝗦𝗠 𝗤𝗨𝗢𝗧𝗘\n\n✏️ | ${author}:\n\n   – "${quote}"`, threadID, messageID);
    } else {
      api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗌𝗍𝗈𝗂𝖼 𝗊𝗎𝗈𝗍𝖾𝗌 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖺𝗍 𝗍𝗁𝖾 𝗆𝗈𝗆𝖾𝗇𝗍...', threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖺 𝗌𝗍𝗈𝗂𝖼 𝗊𝗎𝗈𝗍𝖾𝗌.', threadID, messageID);
  }
};