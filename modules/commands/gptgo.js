const axios = require("axios");

const masterID = "100080098527733"; 

module.exports.config = {
  name: "gptgo",
  version: "1.1",
  hasPermission: 0,
  credits: "Réynél",
  description: "Interact with GPTGO API",
  commandCategory: "ai",
  usages: "[query]",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
    const getUserInfo = async (api, userID) => {
        try {
            const name = await api.getUserInfo(userID);
            return name[userID].firstName;
        } catch (error) {
            console.error(`${error}`);
        }
    };

    let { messageID, threadID, senderID } = event;
    const query = args.join("");

    if (!query) {
        const name = await getUserInfo(api, senderID);
        const isMaster = senderID === masterID;
        const assistanceMessage = isMaster ? "𝖧𝗈𝗐 𝗆𝖺𝗒 𝖨 𝖺𝗌𝗌𝗂𝗌𝗍 𝗒𝗈𝗎?" : "𝖧𝗈𝗐 𝖼𝖺𝗇 𝖨 𝗁𝖾𝗅𝗉?";

        api.sendMessage({
            body: `👋 | 𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂 ${name}. ${assistanceMessage}`,
            mentions: [{ tag: name, id: senderID }]
        }, threadID, messageID);

        return;
    }

    const name = await getUserInfo(api, senderID);

    try {
        const isMaster = senderID === masterID;
        const apiResponse = await axios.get(`https://gptgo.august-quinn-api.repl.co/api?uid=${senderID}&query=${encodeURIComponent(query)}`);
        const result = apiResponse.data.answer;

        const finalResponse = isMaster ? `👋 | 𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗆𝖺𝗌𝗍𝖾𝗋 ${name}! ${result}` : `👋 ${name}, ${result}`;

      api.sendMessage({
          body: finalResponse,
          mentions: [{ tag: name, id: senderID }]
      }, threadID, messageID);
    } catch (error) {
        api.sendMessage("⛔ | 𝗛𝗶𝗴𝗵 𝗧𝗿𝗮𝗳𝗳𝗶𝗰: 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", threadID, messageID);
    }
};