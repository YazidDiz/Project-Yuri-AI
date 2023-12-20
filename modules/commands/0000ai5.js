module.exports.config = {
    name: "ai5",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Réynél",
    description: "AI powered by Blackbox",
    commandCategory: "ai",
    usages: "[ask]",
    cooldowns: 20
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
    mid = messageID;
    const q = encodeURIComponent(args.join(" "));
    if (!q) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇𝗌\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n𝖺𝗂𝟧 𝗐𝗁𝖺𝗍 𝗂𝗌 𝗌𝗈𝗅𝖺𝗋 𝗌𝗒𝗌𝗍𝖾𝗆?", tid, mid);
    try {
        api.setMessageReaction("🔍", mid, (err) => {}, true);

api.sendMessage("🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝖲𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖺𝗇𝖽 𝗍𝗒𝗉𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝖺𝗇𝗌𝗐𝖾𝗋! 𝖯𝗅𝖾𝖺𝗌𝖾 𝖶𝖺𝗂𝗍...", tid, mid);
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