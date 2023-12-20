const axios = require('axios');
module.exports.config = {
  name: 'duckgo',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Réynél Eśquível',
  description: 'Searches the DuckDuckGo API for information.',
  commandCategory: 'searches',
  usages: '[query]',
  cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
  let query = args.join(' ');
  if (!query) {
    return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗂𝗇𝗉𝗎𝗍 𝗂𝗌 𝗆𝗂𝗌𝗌𝗂𝗇𝗀...', event.threadID, event.messageID);
  }
  try {
    const response = await axios.get(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&pretty=1`);
    let heading = response.data.Heading;
    let abstract = response.data.Abstract;
    if (!heading) {
      heading = 'Not Found';
    }
    if (!abstract) {
      abstract = 'Not Found';
    }
    const message = `🔎 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗌𝖾𝖺𝗋𝖼𝗁𝖾𝖽 𝖿𝗈𝗋 《${query}》\n━━━━━━━━━━━━━━━━━━━\n𝗧𝗼𝗽𝗶𝗰:\n ${heading}\n\n${abstract}\n━━━━━━━━━━━━━━━━━━━`;

    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗂𝗇 ${error.message}`, event.threadID, event.messageID);
  }
};