const axios = require('axios');

module.exports = {
  config: {
  name: 'professor',
  version: '3.0',
  author: 'Réynél', // do not change
  credits: 'Réynél', // do not change
  role: 0,
  category: 'ai',
  commandCategory: 'ai',
  descrption: 'Professor Ai, willing to teach you as he can.',
  usages: '[prompt]',
  shortDescription: {
  en: 'Professor Ai, willing to teach you as he can.',
},
  longDescription: {
  en: 'Ask anything educational content to professor Ai',
},
  guide: {
  en: '{pn} [prompt]',
    },
  },
  onStart: async function (context) {
    const { api, event } = context;
    
    try {
      const prompt = event.body.trim();

      if (prompt) {
        const loadingMessage = await api.sendMessage("💭 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗋𝗈𝖿𝖾𝗌𝗌𝗈𝗋 𝖠𝗂 𝗂𝗌 𝗍𝗁𝗂𝗇𝗄𝗂𝗇𝗀. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍 𝖺 𝗆𝗈𝗆𝖾𝗇𝗍...", event.threadID);
api.setMessageReaction("⏱️", event.messageID, () => {}, true);
        api.setMessageReaction("🤔", loadingMessage.messageID, () => {}, true);


        const response = await axios.get(`https://gptproffessor.miraixyxy.repl.co/professor?prompt=${encodeURIComponent(prompt)}`);

        if (response.data) {
          const messageText = `🧑‍🏫 | 𝖯𝗋𝗈𝖿𝖾𝗌𝗌𝗈𝗋: 
          
          ${response.data.content}`;
          const answer = await api.sendMessage(messageText, event.threadID);
          api.setMessageReaction("✅", event.messageID, () => {}, true);api.setMessageReaction("😻", answer.messageID, () => {}, true);


          
          console.log('Sent answer as a reply to the user');
        } else {
          throw new Error('Invalid or missing response from API');
        }
        api.unsendMessage(loadingMessage.messageID);
      }

    } catch (error) {
      console.error(`Failed to get an answer: ${error.content}`);
      api.sendMessage(
        `❎ | ${error.content}.\n\n𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖼𝖺𝗇 𝗍𝗋𝗒 𝗍𝗒𝗉𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇 𝖺𝗀𝖺𝗂𝗇 𝗈𝗋 𝗋𝖾𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗂𝗍, 𝖺𝗌 𝗍𝗁𝖾𝗋𝖾 𝗆𝗂𝗀𝗁𝗍 𝖻𝖾 𝖺 𝖻𝗎𝗀 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗌𝖾𝗋𝗏𝖾𝗋 𝗍𝗁𝖺𝗍'𝗌 𝖼𝖺𝗎𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝗉𝗋𝗈𝖻𝗅𝖾𝗆. 𝖨𝗍 𝗆𝗂𝗀𝗁𝗍 𝗋𝖾𝗌𝗈𝗅𝗏𝖾 𝗍𝗁𝖾 𝗂𝗌𝗌𝗎𝖾.`,
        event.threadID
      );
    }
  },
  run: async function (context) {
    module.exports.onStart(context);
  }
};