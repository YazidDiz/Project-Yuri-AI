module.exports.config = {
	name: "outgroup",
	version: "1.0.6",
	hasPermssion: 2,
	credits: "Réynél",
	description: "Automatic Outbox after the time period has requested!",
	commandCategory: "system",
  usages: "[ID] [Dur]",
  dependencies: {
        "moment-timezone": ""
    },
	cooldowns: 5
};

module.exports.convertTime = (timestamp, separator) => {
    var pad = function(input) {return input < 10 ? "0" + input : input;};
    var date = timestamp ? new Date(timestamp * 1000) : new Date();
    return [
        pad(date.getHours()),
        pad(date.getMinutes()),
        pad(date.getSeconds())
    ].join(typeof separator !== 'undefined' ?  separator : ':' );
}

module.exports.handleSchedule = async ({ api, schedule }) => {
    try {
        await api.removeUserFromGroup(api.getCurrentUserID(), schedule.target);
        return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗁𝖺𝗌 𝗅𝖾𝖿𝗍 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝖨𝖣: ${schedule.target}`, __GLOBAL.settings.ADMINBOT[0], (error, info) => {
            if (error) return require(process.cwd() + "/utils/log")(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗁𝖺𝗌 𝗅𝖾𝖿𝗍 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝖨𝖣: ${schedule.target}`, "[ OUTBOX ]");
        });
    }
    catch {
        return api.sendMessage(`❎ | 𝖬𝖺𝗌𝖾𝗋, 𝖼𝗈𝗎𝗅𝖽 𝗇𝗈𝗍 𝗅𝖾𝖺𝗏𝖾 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝖨𝖣: ${schedule.target}`, __GLOBAL.settings.ADMINBOT[0], (error, info) => {
            if (error) return require(process.cwd() + "/utils/log")(`❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖼𝗈𝗎𝗅𝖽 𝗇𝗈𝗍 𝗅𝖾𝖺𝗏𝖾 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝖨𝖣: ${schedule.target}`, "error");
        });
    }
} 

module.exports.handleReply = ({ event, api, handleReply }) => {
    const moment = global.nodemodule["moment-timezone"];
    
    if (handleReply.author != event.senderID) return;

    switch (handleReply.type) {
        case "inputThreadID": {
            if (isNaN(event.body)) return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝖨𝖣 𝗒𝗈𝗎 𝖾𝗇𝗍𝖾𝗋 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖿𝗈𝗋𝗆𝖺𝗍", event.threadID, event.messageID);
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗍𝗂𝗆𝖾 𝗒𝗈𝗎 𝗇𝖾𝖾𝖽 𝖺 𝗍𝗂𝗇𝖾𝗋 (𝗇𝗈𝗍𝖾 𝗆𝗎𝗌𝗍 𝖻𝖾 𝗂𝗇 𝗍𝗁𝖾 𝖿𝗈𝗋𝗆𝖺𝗍: 𝖧𝖧:𝖬𝖬):`, event.threadID, (error, info) => {
                global.client.handleReply.push({
                    type: "inputTime",
                    name: this.config.name,
                    author: event.senderID,
                    messageID: info.messageID,
                    target: event.body
                })
            })
        }

        case "inputTime": {
            const time = moment().tz("Asia/Ho_Chi_minh");
            const regex = /([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/;

            if (!regex.test(event.body)) return api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖿𝗈𝗋𝗆𝖺𝗍 𝗍𝗁𝖾 𝗍𝗂𝗆𝖾 𝖼𝗈𝗋𝗋𝖾𝖼𝗍𝗅𝗒.`, event.threadID, event.messageID);
            const timeSplited = event.body.split(":"),
                    hour = timeSplited[0],
                    minute = timeSplited[1];
                
            if (hour > time.hours()) time.add(1, "days");

            time.set({ hour, minute });

            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝗋𝖾𝖺𝗌𝗈𝗇 𝖺𝗎𝗍𝗈𝗆𝖺𝗍𝗂𝖼𝖺𝗅𝗅𝗒 𝗋𝖾𝗆𝗈𝗏𝖾𝖽:`, event.threadID, (error, info) => {
                global.client.handleReply.push({
                    type: "inputReason",
                    name: this.config.name,
                    author: event.senderID,
                    messageID: info.messageID,
                    target: handleReply.target,
                    timeTarget: time.unix()
                })
            })
        }

        case "inputReason": {
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage(
                "══✿══╡°˖𝗢𝘂𝘁𝗯𝗼𝘅˖°╞══✿══" +
                "\n\n» 𝗧𝗵𝗿𝗲𝗮𝗱 𝗻𝗲𝗲𝗱 𝘁𝗼 𝗹𝗲𝗮𝘃𝗲: " + handleReply.target +
                "\n» 𝗟𝗼𝗼𝘀𝗲 𝘁𝗶𝗺𝗲: " + this.convertTime(handleReply.timeTarget) +
                "\n» 𝗥𝗲𝗮𝘀𝗼𝗻𝘀: " + event.body,
                event.threadID, (error, info) => {
                    return api.sendMessage(`ℹ️ | 𝖬𝗂𝗇𝖺-𝗌𝖺𝗇, 𝖨 𝗋𝖾𝖼𝗂𝖾𝗏𝖾𝖽 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗍𝗈 𝗅𝖾𝖺𝗏𝖾 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉 𝖺𝗍 𝗍𝗁𝖾 𝗍𝗂𝗆𝖾 ${this.convertTime(handleReply.timeTarget)} 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝗋𝖾𝖺𝗌𝗈𝗇: ${event.body}`, handleReply.target, (error, info) => {
                        if (error) return api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗍𝗁𝗋𝖾𝖺𝖽 𝗇𝖾𝖾𝖽 𝖺 𝖻𝖺𝗇 𝗐𝗂𝗍𝗁 𝖨𝖣 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍, 𝗆𝖺𝗒 𝗁𝖺𝗏𝖾 𝖻𝖾𝖾𝗇 𝗄𝗂𝖼𝗄𝖾𝖽 𝖻𝖾𝖿𝗈𝗋𝖾.`, event.threadID, event.messaegID);
                        else return global.client.handleSchedule.push({
                            commandName: this.config.name, 
                            timestamp: handleReply.timeTarget, 
                            target: handleReply.target, 
                            reason: event.body,
                            event
                        })
                    })
                }
            )
        }
    }
}

module.exports.run = ({  event, api }) => {
    return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖳𝗁𝖾 𝗍𝗁𝗋𝖾𝖺𝖽 𝖨𝖣 𝗒𝗈𝗎 𝗇𝖾𝖾𝖽 𝗍𝗈 𝗅𝗈𝗈𝗌𝖾 𝖺𝗎𝗍𝗈𝗆𝖺𝗍𝗂𝖼 𝗍𝗂𝗆𝖾𝗋:`, event.threadID, (error, info) => {
        global.client.handleReply.push({
            type: "inputThreadID",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        })
    })
}