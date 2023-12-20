module.exports.config = {
    name: "ai2",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Réynél",
    description: "ask questions to gptgo ai",
    commandCategory: "ai",
    usages: "[ask]",
    cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
    mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝗌𝗈𝗆𝖾 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇𝗌", tid, mid);
     try {
            api.setMessageReaction("🔍", event.messageID, (err) => {}, true);
            api.sendMessage("🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖿𝗈𝗋 𝖺𝗇 𝖺𝗇𝗌𝗐𝖾𝗋, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", threadID, messageID);
        const res = await axios.get(`https://api.kenliejugarap.com/gptgo/?text=${content}`);
        const respond = res.data.response;
        if (res.data.error) {
            api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖾𝗋𝗋𝗈𝗋 𝖺𝗍: ${res.data.error}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        } else {
          api.setMessageReaction("✅", event.messageID, (err) => {}, true);
            api.sendMessage('📚 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾’𝗌 𝗍𝗁𝖾 𝖺𝗇𝗌𝗐𝖾𝗋: ' + respond, tid, (error, info) => {
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