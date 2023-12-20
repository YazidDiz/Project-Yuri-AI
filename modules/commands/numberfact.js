const axios = require('axios');

module.exports.config = {
  name: 'numberfact',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Réynél',
  description: 'Get interesting facts about numbers.',
  commandCategory: 'facts',
  usages: '[number] [type]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  let number = 'random';
  let type = 'trivia';

  if (args.length >= 1) {
    number = args[0];
  }

  if (args.length === 2) {
    type = args[1].toLowerCase();
  }

  const baseUrl = `http://numbersapi.com/${number}/${type}`;

  try {
    const response = await axios.get(baseUrl);

    if (response.data) {
      const fact = response.data;
      api.sendMessage(fact, threadID, messageID);
    } else {
      api.sendMessage('❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗇𝗈 𝖿𝖺𝖼𝗍𝗌 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗀𝗂𝗏𝖾𝗇 𝗂𝗇𝗉𝗎𝗍.', threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝖿𝖺𝖼𝗍𝗌. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', threadID, messageID);
  }
};