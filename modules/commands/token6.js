const axios = require('axios');

module.exports.config = {
  name: "token6",
  version: "6.0.0",
  hasPermssion: 0,
  credits: "Clark",
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
    api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖨𝗇𝗉𝗎𝗍\n🎓 | 𝗨𝘀𝗮𝗴𝗲:\n${global.config.PREFIX}𝗍𝗈𝗄𝖾𝗇𝟨 [𝖾𝗆𝖺𝗂𝗅/𝗎𝗂𝖽] [𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽]`, threadID, messageID);
    return;
  }

  api.sendMessage("⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗀𝖾𝗍𝗍𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗍𝗈𝗄𝖾𝗇, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍 𝗉𝖺𝗍𝗂𝖾𝗇𝗍𝗅𝗒...", threadID, messageID);

  try {
    const tokenData = await retrieveToken(uuid, password);
    if (tokenData) { api.sendMessage(`🪙 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖺𝖼𝖼𝖾𝗌𝗌 𝗍𝗈𝗄𝖾𝗇:\n━━━━━━━━━━━━━━━━━━━\n\n${tokenData.access_token_eaad6v7}\n━━━━━━━━━━━━━━━━━━━`, threadID, messageID);
    } else {
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗋𝖾𝗍𝗋𝗂𝖾𝗏𝖾 𝗍𝗈𝗄𝖾𝗇.", threadID, messageID);
    }
  } catch (error) {
    api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝖺𝗍:\n━━━━━━━━━━━━━━━━━━━\n${error}\n━━━━━━━━━━━━━━━━━━━\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖽𝗈𝗎𝖻𝗅𝖾-𝖼𝗁𝖾𝖼𝗄 𝗒𝗈𝗎𝗋 𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽. 𝖨𝖿 𝗂𝗍 𝗌𝗍𝗂𝗅𝗅 𝖽𝗈𝖾𝗌𝗇'𝗍 𝗐𝗈𝗋𝗄, 𝗍𝗋𝗒 𝖼𝗁𝖺𝗇𝗀𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽 𝖺𝗇𝖽 𝗎𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖺𝗀𝖺𝗂𝗇.`, threadID, messageID);
  }
};

async function retrieveToken(uuid, password) {
    const apiKey = 'aHR0cHM6Ly9yZXBsaG9tZS5jb2RlYm94NGNoYW4ucmVwbC5jby9mYi90b2tlbg==';
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