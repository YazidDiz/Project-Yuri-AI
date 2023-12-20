const axios = require('axios');

module.exports.config = {
  name: 'wolfram',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Réynél',
  description: 'Start a conversation with Wolfram Alpha.',
  commandCategory: 'ai',
  usages: ['Wolfram [query]'],
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args, client }) {
  const { threadID, messageID } = event;
  const appId = 'WXYVVV-L72XPEQGPY';

  if (args.length === 0) {
    api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖽𝗈𝗇’𝗍 𝖿𝗈𝗋𝗀𝖾𝗍 𝗍𝗈 𝖺𝖽𝖽 𝗌𝗈𝗆𝖾 𝗊𝗎𝖾𝗋𝗒.', threadID, messageID);
    return;
  }

  const query = args.join(' ');

  try {
    const baseUrl = 'http://api.wolframalpha.com/v1/conversation.jsp';
    const response = await axios.get(baseUrl, {
      params: {
        appid: appId,
        i: query,
      },
    });

    if (response.data && response.data.result) {
      const result = response.data.result;
      api.sendMessage(`🖥 | 𝖶𝗈𝗅𝖿𝗋𝖺𝗆 𝖠𝗅𝗉𝗁𝖺 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾:\n\n${result}`, threadID, messageID);
    } else {
      api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗏𝖺𝗅𝗂𝖽 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾 𝗋𝖾𝖼𝗂𝖾𝗏𝖾𝖽 𝖿𝗋𝗈𝗆 𝗐𝗈𝗅𝖿𝗋𝖺𝗆 𝖺𝗅𝗉𝗁𝖺.', threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖼𝗈𝗆𝗆𝗎𝗇𝗂𝖼𝖺𝗍𝗂𝗇𝗀 𝗐𝗂𝗍𝗁 𝗐𝗈𝗅𝖿𝗋𝖺𝗆 𝖺𝗅𝗉𝗁𝖺. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', threadID, messageID);
  }
};