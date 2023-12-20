module.exports.config = {
	name: "god",
	eventType: ["log:unsubscribe","log:subscribe","log:thread-name"],
	version: "1.0.0",
	credits: "Clark",
	description: "Record bot activity notifications!",
    envConfig: {
        enable: true
    }
};

module.exports.run = async function({ api, event, Threads }) {
    const logger = require("../../utils/log");
    if (!global.configModule[this.config.name].enable) return;
    var formReport =  "━━━━━━━━━━━━━━━━━━━\n❖《《Ｒ.Ｃ.Ｂ. ＹＵＲＩ》》❖\n━━━━━━━━━━━━━━━━━━━" +
                        "\n🆔 | 𝗚𝗿𝗼𝘂𝗽 𝗜𝗗: " + event.threadID +
                        "\n👁‍🗨 | 𝗔𝗰𝘁𝗶𝗼𝗻: {task}" +
                        "\n👤 | 𝗔𝗰𝘁𝗶𝗼𝗻 𝗕𝘆 𝗨𝘀𝗲𝗿𝗜𝗗: " + event.author +
                        "\n📆 | 𝗗𝗮𝘁𝗲: " + Date.now() +"\n━━━━━━━━━━━━━━━━━━━",
        task = "";
    switch (event.logMessageType) {
        case "log:thread-name": {
            const oldName = (await Threads.getData(event.threadID)).name || "𝖭𝖺𝗆𝖾 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍",
                    newName = event.logMessageData.name || "𝖭𝖺𝗆𝖾 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍";
            task = "━━━━━━━━━━━━━━━━━━━\n❖《《Ｒ.Ｃ.Ｂ. ＹＵＲＩ》》❖\n━━━━━━━━━━━━━━━━━━━\n👁‍🗨 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗎𝗌𝖾𝗋 𝖼𝗁𝖺𝗇𝗀𝖾𝗌 𝗀𝗋𝗈𝗎𝗉 𝗇𝖺𝗆𝖾 𝖿𝗋𝗈𝗆: '" + oldName + "' 𝗍𝗈 '" + newName + "'";
            await Threads.setData(event.threadID, {name: newName});
            break;
        }
        case "log:subscribe": {
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) task = "━━━━━━━━━━━━━━━━━━━\n❖《《Ｒ.Ｃ.Ｂ. ＹＵＲＩ》》❖\n━━━━━━━━━━━━━━━━━━━\n🌟 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗎𝗌𝖾𝗋 𝖺𝖽𝖽𝖾𝖽 𝗆𝖾 𝗍𝗈 𝖺 𝗇𝖾𝗐 𝗀𝗋𝗈𝗎𝗉!";
            break;
        }
        case "log:unsubscribe": {
            if (event.logMessageData.leftParticipantFbId== api.getCurrentUserID()) task = "━━━━━━━━━━━━━━━━━━━\n❖《《Ｒ.Ｃ.Ｂ. ＹＵＲＩ》》❖\n━━━━━━━━━━━━━━━━━━━\nℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗎𝗌𝖾𝗋 𝗄𝗂𝖼𝗄𝖾𝖽 𝗆𝖾 𝗈𝗎𝗍 𝗈𝖿 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉!"
            break;
        }
        default: 
            break;
    }

    if (task.length == 0) return;

    formReport = formReport
    .replace(/\{task}/g, task);
  var god = "100080098527733";

    return api.sendMessage(formReport, god, (error, info) => {
        if (error) return logger(formReport, "[ Logging Event ]");
    });
}