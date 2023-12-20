const axios = require('axios');

module.exports.config = {
  name: 'triviaph',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'Generate random trivia about the Philippines.',
  commandCategory: 'information',
  usages: '[triviaph]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/Augustquinn/JSONify/main/randomPHtrivia.json');
    const triviaList = response.data.trivias;

    if (triviaList.length === 0) {
      return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗍𝗋𝗂𝗏𝗂𝖺 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', event.threadID, event.messageID);
    }

    const randomIndex = Math.floor(Math.random() * triviaList.length);
    const randomTrivia = triviaList[randomIndex];

    const message = `🇵🇭 𝗧𝗥𝗜𝗩𝗜𝗔 𝗔𝗕𝗢𝗨𝗧 𝗧𝗛𝗘 𝗣𝗛𝗜𝗟𝗜𝗣𝗣𝗜𝗡𝗘𝗦\n━━━━━━━━━━━━━━━━━━━\n ▣ 𝗤𝗨𝗘𝗦𝗧𝗜𝗢𝗡: ${randomTrivia.question}\n━━━━━━━━━━━━━━━━━━━\n ▣ 𝗔𝗡𝗦𝗪𝗘𝗥: ${randomTrivia.answer}`;

    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗋𝗂𝗏𝗂𝖺. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', event.threadID, event.messageID);
  }
};
