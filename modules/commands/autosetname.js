module.exports.config = {
    name: "autosetname",
    version: "1.0.1",
    hasPermssion: 1,
    credits: "Réynél",
    description: "Automatic setname for new members",
    commandCategory: "group",
    usages: "[add <name> /remove] ",
    cooldowns: 5
}

module.exports.onLoad = () => {
    const { existsSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
    const pathData = join(__dirname, "cache", "autosetname.json");
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
}

module.exports.run = async function  ({ event, api, args, permssionm, Users })  {
    const { threadID, messageID } = event;
    const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const pathData = join(__dirname, "cache", "autosetname.json");
    const content = (args.slice(1, args.length)).join(" ");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, nameUser: [] };
    switch (args[0]) {
        case "add": {
            if (content.length == 0) return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝖼𝗈𝗇𝖿𝗂𝗀𝗎𝗋𝖺𝗍𝗂𝗈𝗇 𝗈𝖿 𝗍𝗁𝖾 𝗇𝖾𝗐 𝗆𝖾𝗆𝖻𝖾𝗋𝗌 𝗇𝖺𝗆𝖾 𝗆𝗎𝗌𝗍 𝗇𝗈𝗍 𝖻𝖾 𝗏𝖺𝖼𝖺𝗍𝖾𝖽", threadID, messageID);
            if (thisThread.nameUser.length > 0) return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗆𝗈𝗏𝖾 𝗍𝗁𝖾 𝗈𝗅𝖽 𝗇𝖺𝗆𝖾 𝖼𝗈𝗇𝖿𝗂𝗀𝗎𝗋𝖺𝗍𝗂𝗈𝗇 𝖻𝖾𝖿𝗈𝗋𝖾 𝗇𝖺𝗆𝗂𝗇𝗀 𝖺 𝗇𝖾𝗐 𝗇𝖺𝗆𝖾", threadID, messageID); 
            thisThread.nameUser.push(content);
            const name = (await Users.getData(event.senderID)).name
            writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖼𝗈𝗇𝖿𝗂𝗀𝗎𝗋𝖾𝖽 𝖺 𝗇𝖾𝗐 𝗆𝖾𝗆𝖻𝖾𝗋 𝗇𝖺𝗆𝖾\n𝗣𝗿𝗲𝘃𝗶𝗲𝘄: ${content} ${name}`, threadID, messageID);
            break;
        }
        case "rm":
        case "remove":
        case "delete": {
                if (thisThread.nameUser.length == 0) return api.sendMessage("❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎𝗋 𝗀𝗋𝗈𝗎𝗉 𝗁𝖺𝗌𝗇'𝗍 𝖼𝗈𝗇𝖿𝗂𝗀𝗎𝗋𝖾𝖽 𝖺 𝗇𝖾𝗐 𝗆𝖾𝗆𝖻𝖾𝗋𝗌 𝗇𝖺𝗆𝖾", threadID, messageID);
                thisThread.nameUser = [];
                api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝗍𝗁𝖾 𝖼𝗈𝗇𝖿𝗂𝗀𝗎𝗋𝖺𝗍𝗂𝗈𝗇 𝗈𝖿 𝖺 𝗇𝖾𝗐 𝗆𝖾𝗆𝖻𝖾𝗋𝗌 𝗇𝖺𝗆𝖾`, threadID, messageID);
                break;
        }
        default: {
                api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗎𝗌𝖾 𝖺𝗎𝗍𝗈𝗌𝖾𝗍𝗇𝖺𝗆𝖾 𝖺𝖽𝖽 𝗍𝗈 𝖼𝗈𝗇𝖿𝗂𝗀𝗎𝗋𝖾 𝖺 𝗇𝗂𝖼𝗄𝗇𝖺𝗆𝖾 𝖿𝗈𝗋 𝖺 𝗇𝖾𝗐 𝗆𝖾𝗆𝖻𝖾𝗋:\n𝖠𝗎𝗍𝗈𝗌𝖾𝗍𝗇𝖺𝗆𝖾 𝗋𝖾𝗆𝗈𝗏𝖾 𝗍𝗈 𝗋𝖾𝗆𝗈𝗏𝖾 𝗍𝗁𝖾 𝗇𝗂𝖼𝗄𝗇𝖺𝗆𝖾 𝖼𝗈𝗇𝖿𝗂𝗀𝗎𝗋𝖺𝗍𝗂𝗈𝗇 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗇𝖾𝗐 𝗆𝖾𝗆𝖻𝖾𝗋`, threadID, messageID);
        }
    }
    if (!dataJson.some(item => item.threadID == threadID)) dataJson.push(thisThread);
    return writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
}