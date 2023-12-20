const axios = require('axios');

module.exports.config = {
  name: "randomname",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Clark",
  description: "Random Name",
  commandCategory: "other",
  usages: "[randomname]",
  cooldowns: 5,
};

module.exports.run = async function({ api, args, event, Threads }) {
  api.setMessageReaction("✅", event.messageID, (err) => {}, true);

  const t = event.threadID;
  const m = event.messageID;

  const apiUrl = `https://random-name.hjs-rest-endpoints.repl.co/randomname?req=`
  const question = encodeURIComponent(args.join(""));

  if (!question) {
    return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝗇𝖺𝗆𝖾 𝖺𝖿𝗍𝖾𝗋 𝗋𝖺𝗇𝖽𝗈𝗆`, event.threadID, event.messageID);
  } else {
    try {
      const res = await axios.get(`${apiUrl}${question}`);
      const sagot = res.data.Name;
      api.sendMessage(sagot, t, m);
    } catch (e) {
      console.error(e);
      api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝗋𝖺𝗇𝖽𝗈𝗆 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾. 𝖳𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.`, event.threadID, event.messageID);
    }
  }
};