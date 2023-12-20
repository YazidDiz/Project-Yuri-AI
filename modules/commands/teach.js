module.exports.config = {
  name: "teach",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Teach to sim",
  commandCategory: "chatbots",
  usages: "[ask] | [answer]",
  cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
    mid = messageID;
    const input = args.join(" ").split("|");

    if (input.length < 2) {
        if(args.length == 0){
            return api.sendMessage("ℹ️ | 𝗨𝘀𝗮𝗴𝗲: 𝗍𝖾𝖺𝖼𝗁 [𝖺𝗌𝗄] | [𝖺𝗇𝗌𝗐𝖾𝗋]", tid, mid);
        } else if(args.join(" ").includes("|")) {
            return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖻𝗈𝗍𝗁 𝖺 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇 𝖺𝗇𝖽 𝖺𝗇 𝖺𝗇𝗌𝗐𝖾𝗋.", tid, mid);
        } else {
            return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗎𝗌𝖾 '|' 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋 𝗍𝗈 𝗌𝖾𝗉𝖺𝗋𝖺𝗍𝖾 𝗍𝗁𝖾 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇 𝖺𝗇𝖽 𝖺𝗇𝗌𝗐𝖾𝗋.", tid, mid);
        }
    }

    const ask = encodeURIComponent(input[0].trim());
    const answer = encodeURIComponent(input[1].trim());

    try {
        const res = await axios.get(`https://simsimi.fun/api/v2/?mode=teach&lang=en&message=${ask}&answer=${answer}`);
        const respond = res.data.success;
        if (res.data.error) {
            api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽: ${res.data.error}`, tid, (error, info) => {
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
        api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝖽𝖺𝗍𝖺.", tid, mid);
    }
};