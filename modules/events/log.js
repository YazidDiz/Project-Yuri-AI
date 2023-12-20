module.exports.config = {
	name: "log",
	eventType: ["log:unsubscribe","log:subscribe","log:thread-name"],
	version: "1.0.0",
	credits: "Réynél",
	description: "Record notifications of bot activities!",
    envConfig: {
        enable: true
    }
};

module.exports.run = async function({ api, event, Threads }) {
    const logger = require("../../utils/log");
    if (!global.configModule[this.config.name].enable) return;
    var formReport =  "🔔 𝗬𝗨𝗥𝗜 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡 🔔" +
                        "\n\n🆔 | 𝗚𝗿𝗼𝘂𝗽 𝗜𝗗: " + event.threadID +
                        "\n👁‍🗨 | 𝗔𝗰𝘁𝗶𝗼𝗻: {task}" +
                        "\n👤 | 𝗔𝗰𝘁𝗶𝗼𝗻 𝗰𝗿𝗲𝗮𝘁𝗲𝗱 𝗯𝘆: " + event.author +
                        "\n《 " + Date.now() +" 》",
        task = "";
    switch (event.logMessageType) {
        case "log:thread-name": {
            const oldName = (await Threads.getData(event.threadID)).name
            task = "ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗎𝗌𝖾𝗋 𝖼𝗁𝖺𝗇𝗀𝖾𝗌 𝗀𝗋𝗈𝗎𝗉 𝗇𝖺𝗆𝖾 𝖿𝗋𝗈𝗆: '" + oldName + "' 𝗍𝗈 '" + newName + "'";
            await Threads.setData(event.threadID, {name: newName});
            break;
        }
        case "log:subscribe": {
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) task = "ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗎𝗌𝖾𝗋 𝖺𝖽𝖽𝖾𝖽 𝗆𝖾 𝗍𝗈 𝖺 𝗇𝖾𝗐 𝗀𝗋𝗈𝗎𝗉.";
            break;
        }
        case "log:unsubscribe": {
            if (event.logMessageData.leftParticipantFbId== api.getCurrentUserID()) task = "ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗎𝗌𝖾𝗋 𝗄𝗂𝖼𝗄𝖾𝖽 𝗈𝗎𝗍 𝗆𝖾 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉. 😿"
            break;
        }
        default: 
            break;
    }

    if (task.length == 0) return;

    formReport = formReport
    .replace(/\{task}/g, task);

    return api.sendMessage(formReport, global.config.ADMINBOT[0], (error, info) => {
        if (error) return logger(formReport, "[ Logging Event ]");
    });
}