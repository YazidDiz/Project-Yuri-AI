const axios = require('axios');

module.exports.config = {
  name: "moonwall",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Generate moon image based on your information",
  usages: "name | day | month | year",
  commandCategory: "edit-img",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  
  try {
    const input = args.join(" ").split(" | ");

    if (input.length !== 4) {
      return api.sendMessage('❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖿𝗈𝗋𝗆𝖺𝗍.\n\n🎓 | 𝗨𝘀𝗮𝗴𝗲𝘀: 𝗆𝗈𝗈𝗇𝗐𝖺𝗅𝗅 𝗇𝖺𝗆𝖾 | 𝖽𝖺𝗒 | 𝗆𝗈𝗇𝗍𝗁 | 𝗒𝖾𝖺𝗋', event.threadID);
    }

    const [name, day, month, year] = input;

    const API = `https://for-devs.rishadapis.repl.co/api/moon?name=${encodeURIComponent(name)}&day=${encodeURIComponent(day)}&month=${encodeURIComponent(month)}&year=${encodeURIComponent(year)}&apikey=fuck`;

    const response = await axios.get(API, {
      responseType: 'stream',
      headers: {
        'Content-Type': 'image/png'
      }
    });

    const responseBody = `✅ | 𝖨𝗆𝖺𝗀𝖾 𝖦𝖾𝗇𝖾𝗋𝖺𝗍𝖾𝖽\n❂━━━━━━━━━❂\n🔰 | 𝗡𝗮𝗺𝗲: ${name}\n📆 | 𝗗𝗮𝘆: ${day}\n🗓️ | 𝗠𝗼𝗻𝘁𝗵: ${month}\n🎆 | 𝗬𝗲𝗮𝗿: ${year}`;

    api.sendMessage({
      body: responseBody,
      attachment: response.data,
    }, event.threadID);
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝗆𝗈𝗈𝗇𝗐𝖺𝗅𝗅 𝖠𝖯𝖨', event.threadID);
  }
};
