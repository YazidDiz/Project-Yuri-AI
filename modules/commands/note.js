module.exports.config = {
	name: "note",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "Réynél",
	description: "Customize notes for each group",
	commandCategory: "group",
	usages: "[add/remove/all] [note]",
	cooldowns: 5,
	dependencies: {
    "fs-extra": "",
    "path": ""
    }
}

module.exports.onLoad = () => {
    const { existsSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
    const pathData = join(__dirname, "cache", "notes.json");
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
}

module.exports.run = ({ event, api, args, permssion }) => {
    const { threadID, messageID } = event;
    const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const pathData = join(__dirname, "cache", "notes.json");
    const content = (args.slice(1, args.length)).join(" ");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, listRule: [] };

    switch (args[0]) {
        case "add": {
            if (permssion == 0) return api.sendMessage("📝 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝗁𝖺𝗏𝖾 𝖾𝗇𝗈𝗎𝗀𝗁 𝗋𝗂𝗀𝗁𝗍𝗌 𝗍𝗈 𝖻𝖾 𝖺𝖻𝗅𝖾 𝗍𝗈 𝗎𝗌𝖾 𝗆𝗈𝗋𝖾 𝗇𝗈𝗍𝖾𝗌 𝗐𝗂𝗍𝗁 𝗈𝗇𝗅𝗒 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋(𝗌) 𝗍𝗈 𝖻𝖾 𝗎𝗌𝖾𝖽!", threadID, messageID);
            if (content.length == 0) return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗂𝗇𝗌𝖾𝗋𝗍 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇 𝖼𝖺𝗇𝗇𝗈𝗍 𝖻𝖾 𝗅𝖾𝖿𝗍 𝖻𝗅𝖺𝗇𝗄!", threadID, messageID);
            if (content.indexOf("\n") != -1) {
                const contentSplit = content.split("\n");
                for (const item of contentSplit) thisThread.listRule.push(item);
            }
            else {
                thisThread.listRule.push(content);
            }
            writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            api.sendMessage('🌟 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖺𝖽𝖽𝖾𝖽 𝗇𝖾𝗐 𝗇𝗈𝗍𝖾𝗌 𝗍𝗈 𝗍𝗁𝖾 𝗍𝖾𝖺𝗆 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒!', threadID, messageID);
            break;
        }
        case "list":
        case"all": {
            var msg = "", index = 0;
            for (const item of thisThread.listRule) msg += `${index+=1}/ ${item}\n`;
            if (msg.length == 0) return api.sendMessage("❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎𝗋 𝗍𝖾𝖺𝗆 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝗁𝖺𝗏𝖾 𝖺 𝗅𝗂𝗌𝗍 𝗈𝖿 𝗇𝗈𝗍𝖾𝗌 𝗍𝗈 𝖽𝗂𝗌𝗉𝗅𝖺𝗒.", threadID, messageID);
            api.sendMessage(`📝 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗇𝗈𝗍𝖾𝗌 𝗈𝖿 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝖺𝗋𝖾:\n╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n\n${msg}\n\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯`, threadID, messageID);
            break;
        }
        case "rm":
        case "remove":
        case "delete": {
            if (!isNaN(content) && content > 0) {
                if (permssion == 0) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝗁𝖺𝗏𝖾 𝖾𝗇𝗈𝗎𝗀𝗁 𝗋𝗂𝗀𝗁𝗍𝗌 𝗍𝗈 𝖻𝖾 𝖺𝖻𝗅𝖾 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝖾 𝗇𝗈𝗍𝖾𝗌 𝗍𝗁𝖺𝗍 𝗈𝗇𝗅𝗒 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝗍𝗈𝗋𝗌 𝖼𝖺𝗇 𝗎𝗌𝖾!", threadID, messageID);
                if (thisThread.listRule.length == 0) return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎 𝗍𝖾𝖺𝗆 𝖽𝗈𝖾𝗌𝗇'𝗍 𝗁𝖺𝗏𝖾 𝖺 𝗅𝗂𝗌𝗍 𝗈𝖿 𝗇𝗈𝗍𝖾𝗌 𝗍𝗈 𝖻𝖾 𝖺𝖻𝗅𝖾 𝗍𝗈 𝖽𝖾𝗅𝖾𝗍𝖾.", threadID, messageID);
                thisThread.listRule.splice(content - 1, 1);
                api.sendMessage(`🚮 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗁𝖺𝗌 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝗍𝗁𝖾 𝗇𝗈𝗍𝖾𝗌 𝗐𝗂𝗍𝗁 𝗌𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀:\n╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n\n${content}\n\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯`, threadID, messageID);
                break;
            }
            else if (content == "all") {
                if (permssion == 0) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝗁𝖺𝗏𝖾 𝖾𝗇𝗈𝗎𝗀𝗁 𝗋𝗂𝗀𝗁𝗍𝗌 𝗍𝗈 𝖻𝖾 𝖺𝖻𝗅𝖾 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝖾 𝗇𝗈𝗍𝖾𝗌 𝗍𝗁𝖺𝗍 𝗈𝗇𝗅𝗒 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝗍𝗈𝗋𝗌 𝖼𝖺𝗇 𝗎𝗌𝖾!", threadID, messageID);
                if (thisThread.listRule.length == 0) return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎 𝗍𝖾𝖺𝗆 𝖽𝗈𝖾𝗌𝗇'𝗍 𝗁𝖺𝗏𝖾 𝖺 𝗅𝗂𝗌𝗍 𝗈𝖿 𝗇𝗈𝗍𝖾𝗌 𝗍𝗈 𝖻𝖾 𝖺𝖻𝗅𝖾 𝗍𝗈 𝖽𝖾𝗅𝖾𝗍𝖾.", threadID, messageID);
                thisThread.listRule = [];
                api.sendMessage(`🚮 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝗍𝗁𝖾 𝖾𝗇𝗍𝗂𝗋𝖾 𝗀𝗋𝗈𝗎𝗉'𝗌 𝗇𝗈𝗍𝖾𝗌.`, threadID, messageID);
                break;
            }
        }
        default: {
            if (thisThread.listRule.length != 0) {
                var msg = "", index = 0;
                for (const item of thisThread.listRule) msg += `${index+=1}/ ${item}\n`;
                return api.sendMessage(`📝 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗇𝗈𝗍𝖾𝗌 𝗈𝖿 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝖺𝗋𝖾:\n╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n\n${msg}\n\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯`, threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
    }

    if (!dataJson.some(item => item.threadID == threadID)) dataJson.push(thisThread);
    return writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
}