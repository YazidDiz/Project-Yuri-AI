const axios = require('axios');

module.exports.config = {
  name: "token4",
  version: "5.0.1",
  hasPermssion: 0,
  credits: "Réynél",
  description: "GET FB ACCESS_TOKEN, EAAD6V7, COOKIES",
  commandCategory: "tools",
  usages: "[email/uid] [password]",
  cooldowns: 20,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 1500
  }
};

module.exports.run = async ({ api, event, args }) => {

  if ((this.config.credits) != "Réynél") { return api.sendMessage(`[ 𝗔𝗡𝗧𝗜 𝗖𝗛𝗔𝗡𝗚𝗘 𝗖𝗥𝗘𝗗𝗜𝗧𝗦 ]
  𝗔𝗗𝗠𝗜𝗡 𝗠𝗘𝗦𝗦𝗔𝗚𝗘: 
  ᴄʜᴀɴɢᴇ ᴄʀᴇᴅɪᴛs ᴘᴀ ᴀᴋᴏ sᴀʏᴏ ᴍᴀɢ ᴘʀᴀᴄᴛɪᴄᴇ ᴋᴀ😝 
  𝗠𝗘𝗠𝗕𝗘𝗥 𝗠𝗘𝗦𝗦𝗔𝗚𝗘:
  𝚃𝚑𝚒𝚜 𝚋𝚘𝚝 𝚌𝚛𝚎𝚊𝚝𝚘𝚛 https://facebook.com/${global.config.BOTADMIN} 𝚒𝚜 𝚊 𝚌𝚑𝚊𝚗𝚐𝚎 𝚌𝚛𝚎𝚍𝚒𝚝𝚘𝚛 𝚔𝚊𝚢𝚊 𝚋𝚎 𝚊𝚠𝚊𝚛𝚎 𝚗𝚎𝚡𝚝 𝚝𝚒𝚖𝚎.

  𝗢𝗪𝗡𝗘𝗥 𝗢𝗙 𝗧𝗛𝗜𝗦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗: 
  https://facebook.com/100080098527733

  `, event.threadID, event.messageID)}

  const { threadID, messageID } = event;
  const username = args[0];
  const password = args[1];

  if (!username || !password) {
    api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖳𝗁𝖺𝗍 𝖨𝗌 𝖨𝗇𝗏𝖺𝗅𝗂𝖽 𝖨𝗇𝗉𝗎𝗍!\n𝗨𝘀𝗮𝗴𝗲: ${global.config.PREFIX}𝗍𝗈𝗄𝖾𝗇 [𝖾𝗆𝖺𝗂𝗅/𝗎𝗂𝖽] [𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽]`, threadID, messageID);
    return;
  }

  api.sendMessage("⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗀𝖾𝗍𝗍𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝖤𝖠𝖠𝖣𝟨𝖵𝟩 𝗍𝗈𝗄𝖾𝗇/𝖺𝖼𝖼𝖾𝗌𝗌 𝗍𝗈𝗄𝖾𝗇/𝖼𝗈𝗈𝗄𝗂𝖾𝗌 🕜", threadID, messageID);

  try {
    const tokenData = await retrieveToken(username, password);
    if (tokenData) {
      api.sendMessage(`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖺𝖼𝖼𝖾𝗌𝗌 𝗍𝗈𝗄𝖾𝗇🪙:\n${tokenData.data.access_token}`, threadID, messageID);
      api.sendMessage(`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖢𝖮𝖮𝖪𝖨𝖤𝖲:🍪:\n${tokenData.data.cookies}`, threadID, messageID);
      api.sendMessage(`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖤𝖠𝖠𝖣𝟨𝖵𝟩 𝗍𝗈𝗄𝖾𝗇💱:\n${tokenData.data.access_token_eaad6v7}`, threadID, messageID);
    } else {
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗋𝖾𝗍𝗋𝗂𝖾𝗏𝖾 𝗍𝗈𝗄𝖾𝗇.", threadID, messageID);
    }
  } catch (error) {
    api.sendMessage(`❎ | ${error}\n\n𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖽𝗈𝗎𝖻𝗅𝖾-𝖼𝗁𝖾𝖼𝗄 𝗒𝗈𝗎𝗋 𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽. 𝖨𝖿 𝗂𝗍 𝗌𝗍𝗂𝗅𝗅 𝖽𝗈𝖾𝗌𝗇'𝗍 𝗐𝗈𝗋𝗄, 𝗍𝗋𝗒 𝖼𝗁𝖺𝗇𝗀𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽 𝖺𝗇𝖽 𝗎𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖺𝗀𝖺𝗂𝗇.`, threadID, messageID);
  }
};

async function retrieveToken(username, password) {
  const endpoint = `https://hiroshi.hiroshiapi.repl.co/facebook/token?username=${username}&password=${password}`;

  try {
    const response = await axios.get(endpoint);
    const tokenData = response.data;

    return tokenData;
  } catch (error) {
    throw error;
  }
    }