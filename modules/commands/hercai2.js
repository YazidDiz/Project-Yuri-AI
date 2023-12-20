const { Hercai } = require('hercai');
const herc = new Hercai();

module.exports.config = {
  name: 'hercai2',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Clark',
  description: 'Ask a question to Hercai AI',
  commandCategory: 'ai',
  usages: '[question]',
  cooldowns: 2,
};

module.exports.run = async ({ api, event, args }) => {
  if (args.length < 1) {
    return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇.', event.threadID);
  }

  const question = args.join(' ');

  // Replace 'v2' with your desired model if needed
  herc.question({ model: 'v2', content: question })
    .then((response) => {
      const reply = response.reply;

      api.sendMessage(reply, event.threadID);
    })
    .catch((error) => {
      console.error('❎ | Error while making the Hercai API request:', error);
      api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇.', event.threadID);
    });
};