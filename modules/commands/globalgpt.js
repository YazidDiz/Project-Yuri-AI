const axios = require("axios");

module.exports.config = {
  name: "globalgpt",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Clark",
  description: "Global GPT",
  commandCategory: "ai",
  usages: "[question]",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args }) {
  let { messageID, threadID } = event;
  let tid = threadID,
    mid = messageID;
  const content = encodeURIComponent(args.join(" "));
  if (!args[0]) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗊𝗎𝖾𝗋𝗒.", tid, mid);
  try {
    api.sendTypingIndicator(event.threadID, true);

    const res = await axios.get(`https://api.easy0.repl.co/v1/globalgpt?q=${content}`);
    const response = res.data.content;

    if (response) {
      const messageText = `📝 | 𝗚𝗹𝗼𝗯𝗮𝗹𝗚𝗣𝗧\n━━━━━━━━━━━━━━━━━━━\n${response}`;
      api.setMessageReaction("✅️", event.messageID, (err) => {}, true);
      api.sendMessage(messageText, tid, mid);
    } else if (res.data.error) {
      api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝖺𝗍: ${res.data.error}`, tid, mid);
    } else {
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝗎𝗇𝖾𝗑𝗉𝖾𝖼𝗍𝖾𝖽 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽.", tid, mid);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝖽𝖺𝗍𝖺.", tid, mid);
  }
};
