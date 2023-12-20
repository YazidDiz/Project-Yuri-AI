module.exports.config = {
    name: "ai3",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Réynél",
    description: "AI powered by Blackbox",
    commandCategory: "ai",
    usages: "[ask]",
    cooldowns: 0
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
    mid = messageID;
    const q = encodeURIComponent(args.join(" "));
    if (!q) return api.sendMessage("ℹ️ | 𝖬𝗂𝗌𝗌𝗂𝗇𝗀 𝗂𝗇𝗉𝗎𝗍 𝖲𝖾𝗇𝗌𝖾𝗂", tid, mid);
    try {
        api.setMessageReaction("🔍", mid, (err) => {}, true);

api.sendMessage("🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖿𝗈𝗋 𝗍𝗁𝖾 𝖺𝗇𝗌𝗐𝖾𝗋 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", tid, mid);
        const url = 'https://useblackbox.io/chat-request-v4';

  const data = {
    textInput: q,
    allMessages: [{ user: q }],
    stream: '',
    clickedContinue: false,
  };

const res = await axios.post(url, data);

    const m = res.data.response[0][0];
return api.sendMessage(m, tid, mid)
   } catch(e){
  return api.sendMessage(e.message, tid, mid)
    }
};