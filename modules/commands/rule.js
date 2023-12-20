module.exports.config = {
	name: "rule",
	version: "1.0.1",
	hasPermssion: 1,
	credits: "Réynél",
	description: "Customize the law for each group",
	commandCategory: "group",
	usages: "[add/remove/all] [content/ID]",
	cooldowns: 5,
	dependencies: {
    "fs-extra": "",
    "path": ""
    }
}

module.exports.onLoad = () => {
    const { existsSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
    const pathData = join(__dirname, "cache", "rules.json");
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
}

module.exports.run = ({ event, api, args, permssion }) => {
    const { threadID, messageID } = event;
    const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const pathData = join(__dirname, "cache", "rules.json");
    const content = (args.slice(1, args.length)).join(" ");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, listRule: [] };

    switch (args[0]) {
        case "add": {
            if (permssion == 0) return api.sendMessage("⚠️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝗁𝖺𝗏𝖾 𝗍𝗁𝖾 𝗋𝗂𝗀𝗁𝗍𝗌 𝗈𝖿 𝗍𝗁𝖾 𝖺𝖽𝗆𝗂𝗇 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝖾 𝗋𝗎𝗅𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.", threadID, messageID);
            if (content.length == 0) return api.sendMessage("ℹ️ | 𝖠𝖽𝗆𝗂𝗇, 𝖾𝗇𝗍𝖾𝗋𝗂𝗇𝗀 𝗋𝗎𝗅𝖾 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇𝗌 𝖼𝖺𝗇𝗇𝗈𝗍 𝖻𝖾 𝗅𝖾𝖿𝗍 𝖻𝗅𝖺𝗇𝗄.", threadID, messageID);
            if (content.indexOf("\n") != -1) {
                const contentSplit = content.split("\n");
                for (const item of contentSplit) thisThread.listRule.push(item);
            }
            else {
                thisThread.listRule.push(content);
            }
            writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            api.sendMessage('✅ | 𝖠𝖽𝗆𝗂𝗇, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖺𝖽𝖽𝖾𝖽 𝖺 𝗇𝖾𝗐 𝗋𝗎𝗅𝖾 𝗂𝗇 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉.', threadID, messageID);
            break;
        }
        case "list":
        case"all": {
            var msg = "", index = 0;
            for (const item of thisThread.listRule) msg += `${index+=1}/ ${item}\n`;
            if (msg.length == 0) return api.sendMessage("ℹ️ | 𝖠𝖽𝗆𝗂𝗇, 𝖸𝗈𝗎𝗋 𝗀𝗋𝗈𝗎𝗉 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝗁𝖺𝗏𝖾 𝖺𝗇𝗒 𝗋𝗎𝗅𝖾𝗌 𝗅𝗂𝗌𝗍 𝖼𝗋𝖾𝖺𝗍𝖾𝖽 𝗍𝗈 𝗌𝗁𝗈𝗐.", threadID, messageID);
            api.sendMessage(`╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n✿༶•⛧┈♛𝗚𝗿𝗼𝘂𝗽 𝗟𝗮𝘄♛┈⛧•༶✿\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n\n❒━━━━━━━━━━━━━━━━━❒\n${msg}\n❒━━━━━━━━━━━━━━━━━❒\n\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖼𝗈𝗆𝗉𝗅𝗂𝖺𝗇𝖼𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝗋𝗎𝗅𝖾𝗌 𝗐𝗂𝗅𝗅 𝖼𝗈𝗇𝗍𝗋𝗂𝖻𝗎𝗍𝖾 𝗉𝗈𝗌𝗂𝗍𝗂𝗏𝖾𝗅𝗒 𝗍𝗈 𝗒𝗈𝗎𝗋 𝖼𝗈𝗆𝗆𝗎𝗇𝗂𝗍𝗒.`, threadID, messageID);
            break;
        }
        case "rm":
        case "remove":
        case "delete": {
            if (!isNaN(content) && content > 0) {
                if (permssion == 0) return api.sendMessage("⚠️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝗁𝖺𝗏𝖾 𝗍𝗁𝖾 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝗍𝗈𝗋 𝗋𝗂𝗀𝗁𝗍𝗌 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.", threadID, messageID);
                if (thisThread.listRule.length == 0) return api.sendMessage("ℹ️ | 𝖠𝖽𝗆𝗂𝗇, 𝗒𝗈𝗎𝗋 𝗀𝗋𝗈𝗎𝗉 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝗁𝖺𝗏𝖾 𝗋𝗎𝗅𝖾 𝗅𝗂𝗌𝗍 𝗍𝗈 𝖻𝖾 𝖺𝖻𝗅𝖾 𝗍𝗈 𝖽𝖾𝗅𝖾𝗍𝖾.", threadID, messageID);
                thisThread.listRule.splice(content - 1, 1);
                api.sendMessage(`✅ | 𝖠𝖽𝗆𝗂𝗇, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝗋𝗎𝗅𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝖼𝗈𝗇𝗍𝖾𝗇𝗍:\n━━━━━━━━━━━━━━━━━━━\n${content}`, threadID, messageID);
                break;
            }
            else if (content == "all") {
                if (permssion == 0) return api.sendMessage("⚠️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝗁𝖺𝗏𝖾 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝗍𝗈𝗋 𝗋𝗂𝗀𝗁𝗍𝗌 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.", threadID, messageID);
                if (thisThread.listRule.length == 0) return api.sendMessage("ℹ️ | 𝖠𝖽𝗆𝗂𝗇, 𝗒𝗈𝗎𝗋 𝗀𝗋𝗈𝗎𝗉 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝗁𝖺𝗏𝖾 𝖺 𝗀𝗋𝗈𝗎𝗉 𝗋𝗎𝗅𝖾 𝗅𝗂𝗌𝗍 𝗍𝗈 𝖻𝖾 𝖺𝖻𝗅𝖾 𝗍𝗈 𝖽𝖾𝗅𝖾𝗍𝖾.", threadID, messageID);
                thisThread.listRule = [];
                api.sendMessage(`ℹ️ | 𝖠𝖽𝗆𝗂𝗇, 𝗒𝗈𝗎𝗋 𝗀𝗋𝗈𝗎𝗉 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝗁𝖺𝗏𝖾 𝖺 𝗀𝗋𝗈𝗎𝗉 𝗋𝗎𝗅𝖾 𝗅𝗂𝗌𝗍 𝗍𝗈 𝖻𝖾 𝖺𝖻𝗅𝖾 𝗍𝗈 𝖽𝖾𝗅𝖾𝗍𝖾.`, threadID, messageID);
                break;
            }
        }
        default: {
            if (thisThread.listRule.length != 0) {
                var msg = "", index = 0;
                for (const item of thisThread.listRule) msg += `${index+=1}/ ${item}\n`;
                return api.sendMessage(`\n╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n༶•⛧┈♛ 𝗚𝗿𝗼𝘂𝗽 𝗟𝗮𝘄 ♛┈⛧•༶\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n\n❒━━━━━━━━━━━━━━━━━❒\n${msg}\n❒━━━━━━━━━━━━━━━━━❒\n\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖼𝗈𝗆𝗉𝗅𝗂𝖺𝗇𝖼𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝗋𝗎𝗅𝖾𝗌 𝗐𝗂𝗅𝗅 𝖼𝗈𝗇𝗍𝗋𝗂𝖻𝗎𝗍𝖾 𝗉𝗈𝗌𝗂𝗍𝗂𝗏𝖾𝗅𝗒 𝗍𝗈 𝗒𝗈𝗎𝗋 𝖼𝗈𝗆𝗆𝗎𝗇𝗂𝗍𝗒.`, threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
    }

    if (!dataJson.some(item => item.threadID == threadID)) dataJson.push(thisThread);
    return writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
}