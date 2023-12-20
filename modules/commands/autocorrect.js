module.exports.config = {
  name: "autocorrect",
  version: "2.0.5",
  hasPermssion: 0,
  credits: "Clark",
  description: "fixes grammar of the sentence",
  commandCategory: "grammarfixer",
  usages: "[sentence] or [word]",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  let { messageID, threadID, senderID, body } = event;
  let tid = threadID,
    mid = messageID;
  const content = encodeURIComponent(args.join(" "));

  const correct = `Correct%20the%20spelling%20and%20the%20sentence%20of%20this%20message\n%20${content}`
  if (!args[0]) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗌𝖾𝗇𝗍𝖾𝗇𝖼𝖾.", tid, mid);
  try {
    const res = await axios.get(`https://api.easy0.repl.co/api/blackbox?query=${correct}`);
    const respond = res.data.response;
    if (res.data.error) {
      api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝖺𝗍: ${res.data.error}`, tid, (error, info) => {
        if (error) {
          console.error(error);
        }
      }, mid);
    } else {
      api.sendMessage(respond, tid, (error, info) => {
        if (error) {
          console.error(error);
        }
      }, mid);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝖠𝖯𝖨 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾.", tid, mid);
  }
};