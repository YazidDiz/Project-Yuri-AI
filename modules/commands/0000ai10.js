const axios = require("axios");

module.exports.config = {
    name: "ai10",
    version: "1.0",
    hasPermssion: 0,
    credits: "Réynél",
    description: "Interact with an AI to get responses to your questions.",
    commandCategory: "ai",
    usages: "[question]",
    cooldowns: 5,
    envConfig: {
        // Đây là nơi bạn sẽ setup toàn bộ env của module, chẳng hạn APIKEY, ...
    }
};

module.exports.run = async function({ api, event, args, models, Users, Threads, Currencies, permssion }) {
    const question = args.join(" ").trim();
    const senderID = event.senderID;

    if (question) {
        try {
            const userName = Users[senderID].name;
            const botName = module.exports.config.name;
            const formattedQuestion = `${userName} asked: ${question} (Bot: ${botName})`;

            api.sendMessage("🤖 " + module.exports.config.description.vi + ", " + userName + "! " + module.exports.config.description.en.replace("%1", senderID), event.threadID);
            const response = await axios.get(`https://hercai.onrender.com/v2/hercai?question=${encodeURIComponent(formattedQuestion)}`);
            const aiResponse = response.data.reply;
            api.sendMessage(`👾 | 𝗔𝗜𝟭𝟬:\n\n${aiResponse}`, event.threadID);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗀𝖾𝗍 𝖠𝖨 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", event.threadID);
        }
    } else {
        api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇 𝖺𝖿𝗍𝖾𝗋 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.", event.threadID);
    }
};