const axios = require('axios');

module.exports.config = {
  name: 'everypixel',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Réynél',
  description: 'Analyze photos using Everypixel API.',
  commandCategory: 'ai',
  usages: ['Everypixel', 'Everypixel [URL]'],
  cooldowns: 5,
};

module.exports.handlePhoto = async function ({ api, event }) {
  if (event.type === 'message_reply' && event.messageReply.attachments) {
    const attachment = event.messageReply.attachments[0];
    if (attachment.type === 'photo') {
      const image_url = attachment.url;
      analyzeMedia(api, event.threadID, event.messageID, image_url);
    }
  }
};

module.exports.run = async function ({ api, event, args }) {
  if (args.length === 0 && event.type !== 'message_reply') {
    api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗉𝗁𝗈𝗍𝗈 𝗍𝗈 𝖺𝗇𝖺𝗅𝗒𝗓𝖾 𝖻𝗒 𝗋𝖾𝗉𝗅𝗒𝗂𝗇𝗀 𝗍𝗈 𝗂𝗍 𝗈𝗋 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗎𝗋𝗅.', event.threadID, event.messageID);
    return;
  }

  if (event.type === 'message_reply' && event.messageReply.attachments) {
    const attachment = event.messageReply.attachments[0];
    if (attachment.type === 'photo') {
      const image_url = attachment.url;
      analyzeMedia(api, event.threadID, event.messageID, image_url);
      return;
    }
  }

  if (args.length === 1) {
    const media_url = args[0];
    analyzeMedia(api, event.threadID, event.messageID, media_url);
  } else {
    api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗉𝗁𝗈𝗍𝗈 𝗍𝗈 𝖺𝗇𝖺𝗅𝗒𝗓𝖾 𝖻𝗒 𝗋𝖾𝗉𝗅𝗒𝗂𝗇𝗀 𝗍𝗈 𝗂𝗍 𝗈𝗋 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗎𝗋𝗅.', event.threadID, event.messageID);
  }
};

async function analyzeMedia(api, threadID, messageID, media_url) {
  const clientId = 'EPAIo2g74tq9tmvwCQQsBspt';
  const clientSecret = 'x3sf61LiYsoyMgxGiuhXraB9iwjon6K6LPLOObjMt6It994I';

  try {
    const keywordsResponse = await axios.get(`https://api.everypixel.com/v1/keywords?url=${encodeURIComponent(media_url)}&num_keywords=10`, {
      auth: {
        username: clientId,
        password: clientSecret,
      },
    });

    const facesResponse = await axios.get(`https://api.everypixel.com/v1/faces?url=${encodeURIComponent(media_url)}`, {
      auth: {
        username: clientId,
        password: clientSecret,
      },
    });

    const qualityResponse = await axios.get(`https://api.everypixel.com/v1/quality?url=${encodeURIComponent(media_url)}`, {
      auth: {
        username: clientId,
        password: clientSecret,
      },
    });

    let resultMessage = '🔍 | 𝗔𝗡𝗔𝗟𝗬𝗦𝗜𝗦 𝗥𝗘𝗦𝗨𝗟𝗧𝗦:\n';

    if (keywordsResponse.data && keywordsResponse.data.keywords) {
      const keywords = keywordsResponse.data.keywords.map(keyword => `⌲ ${keyword.keyword} (${keyword.score.toFixed(2)})`).join('\n');
      resultMessage += `\n𝗞𝗘𝗬𝗪𝗢𝗥𝗗𝗦:\n${keywords}`;
    }

    if (facesResponse.data && facesResponse.data.faces) {
      const faces = facesResponse.data.faces.map(face => `⌲ 𝗔𝗴𝗲: ${face.age.toFixed(2)}, 𝗖𝗹𝗮𝘀𝘀: ${face.class}`).join('\n');
      resultMessage += `\n\n𝗙𝗔𝗖𝗘𝗦 𝗗𝗘𝗧𝗘𝗖𝗧𝗘𝗗:\n${faces}`;
    } else {
      resultMessage += '\n𝗡𝗼 𝗳𝗮𝗰𝗲𝘀 𝗱𝗲𝘁𝗲𝗰𝘁𝗲𝗱.';
    }

    if (qualityResponse.data && qualityResponse.data.quality) {
      resultMessage += `\n\n𝗤𝗨𝗔𝗟𝗜𝗧𝗬 𝗦𝗖𝗢𝗥𝗘: ${qualityResponse.data.quality.score.toFixed(2)}`;
    }

    api.sendMessage(resultMessage, threadID, messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖺𝗇𝖺𝗅𝗒𝗓𝗂𝗇𝗀 𝗍𝗁𝖾 𝗆𝖾𝖽𝗂𝖺.', threadID, messageID);
  }
}