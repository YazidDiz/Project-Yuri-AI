const axios = require('axios');

module.exports.config = {
  name: 'zodiacsigns',
  version: '1.0.1',
  credits: 'Réynél',
  hasPermission: 0,
  description: 'Get information about a zodiac sign.',
  commandCategory: 'horoscope',
  usages: '[sign]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const sign = args[0]?.toLowerCase();

    if (!sign) {
      return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗓𝗈𝖽𝗂𝖺𝖼 𝗌𝗂𝗀𝗇.\n 𝖤𝗑𝖺𝗆𝗉𝗅𝖾: >𝖹𝗈𝖽𝗂𝖺𝖼 𝖺𝗋𝗂𝖾𝗌', event.threadID, event.messageID);
    }

    const jsonLink = 'https://raw.githubusercontent.com/Augustquinn/JSONify/main/ZodiacSigns.json';
    const response = await axios.get(jsonLink);
    const zodiacData = response.data.zodiacSigns;

    const foundSign = zodiacData.find((zodiac) => zodiac.sign.toLowerCase() === sign);

    if (foundSign) {
      const message = `✨ | 𝗭𝗢𝗗𝗜𝗔𝗖 𝗦𝗜𝗚𝗡\n━━━━━━━━━━━━━━━━━━━\n⦿ 𝗡𝗔𝗠𝗘: ${foundSign.sign}\n⦿ 𝗘𝗟𝗘𝗠𝗘𝗡𝗧: ${foundSign.element}\n⦿ 𝗥𝗨𝗟𝗜𝗡𝗚 𝗣𝗟𝗔𝗡𝗘𝗧: ${foundSign.rulingPlanet}\n⦿ 𝗧𝗥𝗔𝗜𝗧𝗦: ${foundSign.traits.join(', ')}\n⦿ 𝗖𝗢𝗠𝗣𝗔𝗧𝗜𝗕𝗜𝗟𝗜𝗧𝗬: ${foundSign.compatibility.join(', ')}\n⦿ 𝗠𝗢𝗧𝗜𝗩𝗔𝗧𝗜𝗢𝗡𝗦: ${getRandomItem(foundSign.motivations)}\n⦿ 𝗟𝗨𝗖𝗞𝗬 𝗡𝗨𝗠𝗕𝗘𝗥: ${foundSign.luckyNumber}\n⦿ 𝗣𝗘𝗥𝗦𝗢𝗡𝗔𝗟𝗜𝗧𝗬: ${foundSign.personality}\n⦿ 𝗟𝗨𝗖𝗞𝗬 𝗖𝗢𝗟𝗢𝗥: ${foundSign.luckyColor}
      `;

      api.sendMessage(message, event.threadID, event.messageID);
    } else {
      api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗓𝗈𝖽𝗂𝖺𝖼 𝗌𝗂𝗀𝗇. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗌𝗂𝗀𝗇.', event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗓𝗈𝖽𝗂𝖺𝖼 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.', event.threadID, event.messageID);
  }
};

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}