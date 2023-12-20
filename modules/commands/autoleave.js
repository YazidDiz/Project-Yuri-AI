const fs = require("fs-extra");
const config = require("../../config.json");
module.exports.config = {
    name: "autoleave",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Réynél",
    description: "Bot will automatically leave if the gc has a member 1-4 only",
    commandCategory: "system",
    usages: "[number of member]",
    cooldowns: 0
};

module.exports.onLoad = () => {
    if(!config["leave"]) config["leave"] = {};
    if(!config["leave"]["status"]) config["leave"]["status"] = false;
    if(!config["leave"]["number"]) config["leave"]["number"] = 0;
    fs.writeFileSync("./config.json", JSON.stringify(config, null, 4));
}

module.exports.run = async ({ api, event, args }) => {
    const { threadID, messageID } = event;
    if(args[0]) number = parseInt(args[0]);
    config.leave = { status: config.leave.status == true ? false : true, number: number || config.leave.number}
    fs.writeFileSync("./config.json", JSON.stringify(config, null, 4));
    return api.sendMessage(`✅ | 𝗌𝖺𝗍𝗂𝗌𝖿𝗂𝖾𝖽 ${config["leave"]["status"] == true ? "turn on" : "turn off"} 𝖿𝗎𝗇𝖼𝗍𝗂𝗈𝗇 𝗍𝗈 𝖺𝗎𝗍𝗈𝗆𝖺𝗍𝗂𝖼𝖺𝗅𝗅𝗒 𝗅𝖾𝖺𝗏𝖾 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝗐𝗁𝖾𝗇 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝗁𝖺𝗌 𝖺 𝗌𝗆𝖺𝗅𝗅𝖾𝗋 𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝗆𝖾𝗆𝖻𝖾𝗋𝗌 ${config["leave"]["number"]} 𝗆𝖾𝗆𝖻𝖾𝗋.`, threadID, messageID);
}

module.exports.handleEvent = async ({ api, event }) => {
    const { threadID, messageID, participantIDs } = event;
    if (config["leave"]["status"] && participantIDs.length <= config["leave"]["number"] && event.isGroup && event.senderID != api.getCurrentUserID() && !config.ADMINBOT.includes(event.senderID)) {
       await api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨 𝗐𝗂𝗅𝗅 𝖺𝗎𝗍𝗈𝗆𝖺𝗍𝗂𝖼𝖺𝗅𝗅𝗒 𝗅𝖾𝖺𝗏𝖾 𝗂𝖿 𝗍𝗁𝖾 𝗀𝖼 𝗁𝖺𝗌 𝖺 𝗆𝖾𝗆𝖻𝖾𝗋 𝟣-𝟦𝟢 𝗈𝗇𝗅𝗒`, threadID);
        return api.removeUserFromGroup(api.getCurrentUserID(), threadID);
    }
  }