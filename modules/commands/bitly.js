const axios = require('axios');

const bitlyToken = 'ee891aaa3d51db956a8e1c0bdc116cf2e7df839d';

module.exports.config = {
  name: "bitly",
  version: "1.0.0",
  credits: "Réynél",
  description: "Shorten a link using Bitly",
  commandCategory: "tools",
  usages: "[link]",
  cooldowns: 10,
  hasPermission: 0,
};

module.exports.run = async function({ api, event, args }) {
  if (args.length < 1) {
    return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖪𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗅𝗂𝗇𝗄 𝗍𝗈 𝗌𝗁𝗈𝗋𝗍𝖾𝗇.", event.threadID, event.messageID);
  }

  const originalLink = args[0];

  
  api.sendMessage("⌛| 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍... 𝖸𝗈𝗎𝗋 𝗅𝗂𝗇𝗄 𝗐𝗂𝗅𝗅 𝖻𝖾 𝗌𝗁𝗈𝗋𝗍𝖾𝗇𝖾𝖽 𝗂𝗇 𝖺 𝖿𝖾𝗐 𝗌𝖾𝖼𝗈𝗇𝖽𝗌. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", event.threadID);

  // Simulate a delay (10 seconds).
  await new Promise((resolve) => setTimeout(resolve, 10000));

  try {
    const response = await axios.post('https://api-ssl.bitly.com/v4/shorten', {
      long_url: originalLink,
    }, {
      headers: {
        'Authorization': `Bearer ${bitlyToken}`,
        'Content-Type': 'application/json',
      },
    });

    const shortenedLink = response.data.link;
    api.sendMessage(`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗌𝗁𝗈𝗋𝗍𝖾𝗇𝖾𝖽 𝖫𝗂𝗇𝗄: \n\n ${shortenedLink}`, event.threadID);
  } catch (error) {
    console.error(error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗌𝗁𝗈𝗋𝗍𝖾𝗇𝗂𝗇𝗀 𝗍𝗁𝖾 𝗅𝗂𝗇𝗄. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", event.threadID);
  }
};