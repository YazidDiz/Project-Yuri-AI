const axios = require('axios');
module.exports.config = {
  name: "nglspam",
  version: "1.0.",
  hasPermission: 2,
  credits: "Clark",
  description: "Spam NGL messages",
  commandCategory: "facebook",
  cooldowns: 2,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args.length < 3) {
      api.sendMessage('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗌𝗎𝖿𝖿𝗂𝖼𝗂𝖾𝗇𝗍 𝖺𝗋𝗀𝗎𝗆𝖾𝗇𝗍𝗌.\n\n𝗨𝘀𝗲:\n𝖭𝗀𝗅𝗌𝗉𝖺𝗆 [𝗎𝗌𝖾𝗋𝗇𝖺𝗆𝖾] [𝗆𝖾𝗌𝗌𝖺𝗀𝖾] [𝖺𝗆𝗈𝗎𝗇𝗍]', event.threadID);
      return;
    }

    const username = args.shift();
    const message = args.slice(0, -1).join(" "); 
    const spamCount = parseInt(args[args.length - 1]); 

    if (isNaN(spamCount) || spamCount <= 0) {
      api.sendMessage('❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖺𝗆𝗈𝗎𝗇𝗍. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗉𝗈𝗌𝗂𝗍𝗂𝗏𝖾 𝗇𝗎𝗆𝖻𝖾𝗋.', event.threadID);
      return;
    }

    console.log(`[ NGL ] Spamming To : ${username}`);
    for (let i = 0; i < spamCount; i++) {
      const response = await axios.post('https://ngl.link/api/submit', {
        username: username,
        question: message,
        deviceId: 'ea356443-ab18-4a49-b590-bd8f96b994ee',
        gameSlug: '',
        referrer: '',
      });

      console.log(`[ NGL ] Message ${i + 1}: Status - ${response.status}`);
    }

    api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗌𝗉𝖺𝗆𝗆𝖾𝖽 ${spamCount} 𝗍𝗂𝗆𝖾𝗌 𝗍𝗈 ${username}`, event.threadID);
  } catch (error) {
    console.error('[ NGL ] Error:', error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝖺𝗍: ' + error.message, event.threadID);
  }
};

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});