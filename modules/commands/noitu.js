module.exports.config = {
    name: "noitu",
    version: "2.0.7",
    hasPermssion: 0,
    credits: "Réynél",
    description: "Play from with BOT or team members",
    commandCategory: "games",
    usages: "[mention or blank]",
    cooldowns: 5
};
module.exports.onLoad = function () {
    if (typeof global.moduleData == "undefined") global.moduleData = new Object();
    if (typeof global.moduleData.noitu == "undefined") global.moduleData.noitu = new Map();
}
module.exports.handleEvent = async function({ api, event }) {
    if (typeof global.moduleData.noitu == "undefined") return;
    if(event.senderID == api.getCurrentUserID()) return
    const axios = global.nodemodule["axios"];
    const { body: word, threadID, messageID } = event;
    if (global.moduleData.noitu.has(threadID)) {
        if (word && word.split(" ").length != 2) return
            var data = (await axios.get("https://hoangdogianguyenofficial.herokuapp.com/linkword?word=" + encodeURIComponent(word))).data;
            if (data.data.win == true) {
                global.moduleData.noitu.delete(threadID);
                return api.sendMessage(`🎉 | 𝖢𝗈𝗇𝗀𝗋𝖺𝗍𝗎𝗅𝖺𝗍𝗂𝗈𝗇𝗌 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗐𝗈𝗇!`, threadID, messageID);
            }
            if(data.data.success == false) {
                global.moduleData.noitu.delete(threadID);
                return api.sendMessage(`👾 | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗅𝗈𝗌𝖾, 𝖻𝖾𝗍𝗍𝖾𝗋 𝗅𝗎𝖼𝗄 𝗇𝖾𝗑𝗍 𝗍𝗂𝗆𝖾.`, threadID, messageID);
            }
    }
}
module.exports.run = function({ api, event }) {
    const { threadID, messageID } = event;
    if (!global.moduleData.noitu.has(threadID)) {
        global.moduleData.noitu.set(threadID);
        return api.sendMessage("🌟 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗍𝗎𝗋𝗇𝖾𝖽 𝗈𝗇 𝖿𝗋𝗈𝗆.", threadID, messageID);
    } else {
        global.moduleData.noitu.delete(threadID);
        return api.sendMessage("⭐ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖺𝗌 𝗍𝗎𝗋𝗇𝖾𝖽 𝗈𝖿𝖿 𝖿𝗋𝗈𝗆.", threadID, messageID);
    }
}