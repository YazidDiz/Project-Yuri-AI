const axios = require('axios');

module.exports = {
  config: {
    name: 'chescav2',
    version: '2.5',
    author: 'Clark',
    credits: 'Clark',
    role: 0,
    hasPermission: 2,
    category: 'Ai - Chat',
    commandCategory: 'ai',
    description: 'Baliw na babaeng ai',
    usages: '[prompt]',
    shortDescription: {
      en: 'Baliw na babaeng ai',
    },
    longDescription: {
      en: 'Baliw na babaeng ai',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function (context) {
    const { api, event } = context;

    try {
      //const prompt = event.body.trim();
      const [cmd, ...args] = event.body.split(" ");
      const prompt = args.join(" ");
      if (prompt) {


        const response = await axios.get(`https://school-project-lianefca.bene-edu-ph.repl.co/` + `ask/chescaV2?query=${encodeURIComponent(prompt)}`);

        if (response.data) {
          const messageText = response.data.message;
          await api.sendMessage(messageText, event.threadID, event.messageID);

          console.log('Sent answer as a reply to the user');
        } else {
          throw new Error('Invalid or missing response from API');
        }
      }
    } catch (error) {
      console.error(`Failed to get an answer: ${error.message}`);
      api.sendMessage(
        `❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝖺𝗍:\n━━━━━━━━━━━━━━━━━━━\n${error.message}.\n━━━━━━━━━━━━━━━━━━━\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖼𝖺𝗇 𝗍𝗋𝗒 𝗍𝗒𝗉𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇 𝖺𝗀𝖺𝗂𝗇 𝗈𝗋 𝗋𝖾𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗂𝗍, 𝖺𝗌 𝗍𝗁𝖾𝗋𝖾 𝗆𝗂𝗀𝗁𝗍 𝖻𝖾 𝖺 𝖻𝗎𝗀 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗌𝖾𝗋𝗏𝖾𝗋 𝗍𝗁𝖺𝗍'𝗌 𝖼𝖺𝗎𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝗉𝗋𝗈𝖻𝗅𝖾𝗆. 𝖨𝗍 𝗆𝗂𝗀𝗁𝗍 𝗋𝖾𝗌𝗈𝗅𝗏𝖾 𝗍𝗁𝖾 𝗂𝗌𝗌𝗎𝖾.`,
        event.threadID
      );
    }
  },
  run: async function (context) {
    module.exports.onStart(context);
  }
};