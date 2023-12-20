const axios = require('axios');
const fs = require('fs');
const path = require('path');
 
module.exports.config = {
  name: 'nasa',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Réynél',
  description: 'Search for NASA images and information.',
  commandCategory: 'information',
  usages: '[query]',
  cooldowns: 5,
};
 
module.exports.run = async function ({ api, event, args }) {
  if (args.length < 2) {
    api.sendMessage('❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖼𝗈𝗆𝗆𝖺𝗇𝖽. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗎𝗌𝖾 𝗈𝗇𝖾 𝗈𝖿 𝗍𝗁𝖾 𝖿𝗈𝗅𝗅𝗈𝗐𝗂𝗇𝗀 𝖿𝗈𝗋𝗆𝖺𝗍𝗌:\n𝖭𝖺𝗌𝖺 𝗂𝗆𝖺𝗀𝖾 [𝗊𝗎𝖾𝗋𝗒]\n𝖭𝖺𝗌𝖺 𝗌𝖾𝖺𝗋𝖼𝗁 [𝗊𝗎𝖾𝗋𝗒]', event.threadID, event.messageID);
    return;
  }
 
  const apiKey = 'PH3BOkVhDPj2TAQKafwWTfECMFQpuQda7itIO8Ah';
  const command = args[0];
  const query = args.slice(1).join(' ');
 
  try {
    if (command === 'image') {
      const response = await axios.get(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });
 
      if (response.data && response.data.collection && response.data.collection.items && response.data.collection.items.length > 0) {
        const items = response.data.collection.items.slice(0, 10);
        const attachments = [];
 
        for (const item of items) {
          const imageUrl = item.links[0].href;
          const imageStream = await axios.get(imageUrl, { responseType: 'stream' });
 
          const imagePath = path.join(__dirname, '/cache', path.basename(imageUrl));
          const writer = fs.createWriteStream(imagePath);
 
          imageStream.data.pipe(writer);
 
          await new Promise((resolve) => {
            writer.on('finish', resolve);
          });
 
          attachments.push(fs.createReadStream(imagePath));
        }
 
        api.sendMessage({ body: '🛰 | 𝗡𝗔𝗦𝗔 𝗜𝗺𝗮𝗴𝗲𝘀:', attachment: attachments }, event.threadID, event.messageID);
      } else {
        api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝖭𝖠𝖲𝖠 𝗂𝗆𝖺𝗀𝖾𝗌 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗌𝗉𝖾𝖼𝗂𝖿𝗂𝖾𝖽 𝗊𝗎𝖾𝗋𝗒.', event.threadID, event.messageID);
      }
    } else if (command === 'search') {
      const response = await axios.get(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });
 
      if (response.data && response.data.collection && response.data.collection.items && response.data.collection.items.length > 0) {
        const items = response.data.collection.items.slice(0, 5);
        const results = [];
 
        for (const item of items) {
          const info = {
            title: item.data[0].title,
            description: item.data[0].description,
            keywords: item.data[0].keywords.join(', '),
          };
          results.push(info);
        }
 
        const resultText = results.map((result, index) => `🛰 | 𝗥𝗲𝘀𝘂𝗹𝘁 ${index + 1}:\n━━━━━━━━━━━━━━━━━━━\n𝗧𝗜𝗧𝗟𝗘: ${result.title}\n𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: ${result.description}\n𝗞𝗘𝗬𝗪𝗢𝗥𝗗𝗦: ${result.keywords}\n`).join('\n');
 
        api.sendMessage(`🔍 | 𝖲𝖾𝖺𝗋𝖼𝗁 𝗋𝖾𝗌𝗎𝗅𝗍𝗌 𝖿𝗈𝗋 "${query}":\n\n${resultText}`, event.threadID, event.messageID);
      } else {
        api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝖭𝖠𝖲𝖠 𝗌𝖾𝖺𝗋𝖼𝗁 𝗋𝖾𝗌𝗎𝗅𝗍𝗌 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗌𝗉𝖾𝖼𝗂𝖿𝗂𝖾𝖽 𝗊𝗎𝖾𝗋𝗒.', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖭𝖠𝖲𝖠 𝖽𝖺𝗍𝖺.', event.threadID, event.messageID);
  }
};