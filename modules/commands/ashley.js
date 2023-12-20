const axios = require('axios');

module.exports.config = {
  name: 'ashley',
  version: '1.0',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'Interact with the cai for chat responses.',
  commandCategory: 'ai',
  usages: '[message]',
  cooldowns: 0,
};

module.exports.run = async function ({ api, event }) {
  try {
    const { messageID, threadID, senderID, body } = event;

    const userFullName = (await api.getUserInfo(senderID))[senderID].name;
    const userFirstName = userFullName.split(" ")[0];

    let message = body;

    if (event.messageReply) {
      message = `⏳ |  𝖲𝖾𝗇𝗌𝖾𝗂 ${userFirstName}, 𝗋𝖾𝗀𝖺𝗋𝖽𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 《${event.messageReply.body}》, ${message}`;
    }

    if (!message) {
      return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗆𝖾𝗌𝗌𝖺𝗀𝖾/𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇.\n\n🎓 | 𝗨𝘀𝗮𝗴𝗲: 𝖺𝗌𝗁𝗅𝖾𝗒 [𝗆𝖾𝗌𝗌𝖺𝗀𝖾]', threadID);
    }

    const API_ENDPOINT = `https://cai.aliestercrowleymv.repl.co/api?char=zG7RNkQutpO9-uo8Q0A7CQKt_BHiDsJGBVu7Y3gmZGc&prompt=${userFirstName} to you: ${encodeURIComponent(message)}`;

    const response = await axios.get(API_ENDPOINT);

    if (response.data && response.data.text) {
      let caiResponse = response.data.text;
      caiResponse = caiResponse.replace(/Character\.AI/g, 'CrowAI');
      caiResponse = caiResponse.replace(/www.character.ai/g, 'aliestercrowley.com');

      caiResponse = `${caiResponse}`;

      api.sendMessage({ body: caiResponse, attachment: null }, threadID, messageID);
    } else {
      api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', threadID, messageID);
  }
};