const axios = require('axios');

module.exports.config = {
  name: "token5",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Token Getter",
  commandCategory: "tools",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const [un, password] = args.join(" ").split("|");
  if (!un || !password) {
    return api.sendMessage("🎓 | 𝗨𝘀𝗮𝗴𝗲: 𝖿𝖻𝗍𝗈𝗄𝖾𝗇 <𝖾𝗆𝖺𝗂𝗅/𝗎𝗌𝖾𝗋/𝗎𝗂𝖽>|<𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽>", event.threadID);
  }

  try {
    api.sendMessage("⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗀𝖾𝗍𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝗍𝗈𝗄𝖾𝗇 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", event.threadID);

    const response = await axios.get(`https://test-getter-fb.hiroshiapi.repl.co/fb?un=${encodeURIComponent(un)}&password=${encodeURIComponent(password)}`);

    if (response.data.error) {
      return api.sendMessage(response.data.error, event.threadID);
    }

    const { token1, token2, token3 } = response.data;

    const successMessage = `✅ | 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹:\n\n𝖳𝗈𝗄𝖾𝗇𝟣:\n${token1}\n𝖳𝗈𝗄𝖾𝗇𝟤:\n${token2}\n𝖳𝗈𝗄𝖾𝗇𝟥:\n${token3}`;
    return api.sendMessage(successMessage, event.threadID);
  } catch (error) {
    console.error('Error:', error);
    return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍.', event.threadID);
  }
};