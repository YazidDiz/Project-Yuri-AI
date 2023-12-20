const axios = require('axios');

module.exports.config = {
  name: "sim4",
  version: "2.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Chat and teach with sim4",
  commandCategory: "chatbots",
  usages: ["{prefix}sim4 <question>: Chat with Sim4", "{prefix}sim4 teach <question> - <response>: Teach Sim4"],
  cooldowns: 0
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const tid = threadID;
  const mid = messageID;

  if (args[0] === 'teach') {
    args.shift();
    const content = args.join(' ').trim();

    if (!content) {
      return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗇𝖾𝖾𝖽 𝗍𝗈 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇 𝖺𝗇𝖽 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾 𝗍𝗈 𝗍𝖾𝖺𝖼𝗁.', tid, mid);
    }

    const [ask, ans] = content.split('-').map(item => item.trim());

    if (!ask || !ans) {
      return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗈𝗍𝗁 𝗍𝗁𝖾 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇 𝖺𝗇𝖽 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾 𝖺𝗋𝖾 𝗋𝖾𝗊𝗎𝗂𝗋𝖾𝖽 𝖺𝗇𝖽 𝗌𝗁𝗈𝗎𝗅𝖽 𝖻𝖾 𝗌𝖾𝗉𝖺𝗋𝖺𝗍𝖾𝖽 𝖻𝗒 "-".', tid, mid);
    }

    try {
      const simmateachResponse = await axios.get(`https://simma.rubish-api.repl.co/teach?query=${encodeURIComponent(ask)}&response=${encodeURIComponent(ans)}`);
      const simmaresponseMessage = simmateachResponse.data.message;
      return api.sendMessage(simmaresponseMessage, tid, mid);
    } catch (error) {
      console.error('Error occurred while teaching', error.message);
      return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗍𝖾𝖺𝖼𝗁𝗂𝗇𝗀. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", tid, mid);
    }
  } else {
    try {
      const botuserQuestion = args.join(' ');
      if (!botuserQuestion) {
        return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗇𝖾𝖾𝖽 𝗍𝗈 𝖺𝗌𝗄 𝖺 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇.', tid, mid);
      }

      const apiUrl = `https://simma.rubish-api.repl.co/chat?query=${encodeURIComponent(botuserQuestion)}`;
      const rubishresponse = await axios.get(apiUrl);
      const simmaresponse = rubishresponse.data.response;
      return api.sendMessage(simmaresponse, tid, mid);
    } catch (error) {
      console.error('Error occurred while communicating with the API', error.message);
      return api.sendMessage("💬 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨 𝖽𝗈𝗇'𝗍 𝗄𝗇𝗈𝗐 𝗐𝗁𝖺𝗍 𝗒𝗈𝗎'𝗋𝖾 𝗌𝖺𝗒𝗂𝗇𝗀. \n\n𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝖾𝖺𝖼𝗁 𝗆𝖾✏️", tid, mid);
    }
  }
};