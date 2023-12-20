module.exports.config = {
    name: "code",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Réynél",
    description: "read/write/cre/edit/del/rename",
    commandCategory: "system",
    usages: "read/write/cre/edit/del/rename",
    cooldowns: 5,
    dependencies: {
    }
};

module.exports.run = async({ api, event, args }) => {
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];
    const cheerio = global.nodemodule["cheerio"];
  const permission = ["100080098527733", "61551874618105"];
	if (!permission.includes(event.senderID)) return api.sendMessage("⚠️ | 𝖼𝖺𝗅𝗅𝖺𝖽 𝖲𝗈𝗆𝖾𝗈𝗇𝖾'𝗌 𝖳𝗋𝗒𝗂𝗇𝗀 𝗍𝗈 𝖡𝗋𝖾𝖺𝗄 𝖳𝗁𝗂𝗌 𝖢𝗈𝖽𝖾 𝖡𝗈𝗌𝗌", event.threadID, event.messageID);

    if (args.length == 0) return api.sendMessage("❎ | 𝖲𝗒𝗇𝗍𝖺𝗑 𝖾𝗋𝗋𝗈𝗋", event.threadID);
    var path = __dirname + '/';
    if (args[0] == "edit") {
        var newCode = event.body.slice(
            8 + args[1].length + args[0].length,
            event.body.length
        );
        console.log(newCode);
        fs.writeFile(
            `${__dirname}/${args[1]}.js`,
            newCode,
            "utf-8",
            function(err) {
                if (err)
                    return api.sendMessage(
                        `❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖺𝗉𝗉𝗅𝗒𝗂𝗇𝗀 𝗍𝗁𝖾 𝗇𝖾𝗐 𝖼𝗈𝖽𝖾 𝗍𝗈 "${args[1]}.𝗃𝗌".`
                    );
                api.sendMessage(
                    `✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗇𝖾𝗐 𝖼𝗈𝖽𝖾 𝖺𝗉𝗉𝗅𝗂𝖾𝖽 𝖿𝗈𝗋 "${args[1]}.𝗃𝗌".`,
                    event.threadID,
                    event.messageID
                );
            }
        );
    } else if (args[0] == "read") {
        var data = await fs.readFile(
            `${__dirname}/${args[1]}.js`,
            "utf-8",
            (err, data) => {
                if (err)
                    return api.sendMessage(
                        `❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗋𝖾𝖺𝖽𝗂𝗇𝗀 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 "${args[1]}.𝗃𝗌".`,
                        event.threadID,
                        event.messageID
                    );
                api.sendMessage(data, event.threadID, event.messageID);
            }
        );
    }
    else if (args[0] == "-r") {
        var data = await fs.readFile(
            `${__dirname}/${args[1]}.js`,
            "utf-8",
            (err, data) => {
                if (err)
                    return api.sendMessage(
                        `❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗋𝖾𝖺𝖽𝗂𝗇𝗀 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 "${args[1]}.𝗃𝗌".`,
                        event.threadID,
                        event.messageID
                    );
                api.sendMessage(data, event.threadID, event.messageID);
            }
        );
    } else if (args[0] == "cre") {
        if (args[1].length == 0) return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝖾𝗋, 𝗍𝗁𝖾 𝗆𝗈𝖽𝗎𝗅𝖾𝗌 𝗁𝖺𝗏𝖾 𝗇𝗈𝗍 𝖻𝖾𝖾𝗇 𝗇𝖺𝗆𝖾𝖽 𝗒𝖾𝗍", event.threadID);
        if (fs.existsSync(`${__dirname}/${args[1]}.js`))
            return api.sendMessage(
                `ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, ${args[1]}.𝗃𝗌 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 𝖾𝗑𝗂𝗌𝗍.`,
                event.threadID,
                event.messageID
            );
        fs.copySync(__dirname + "/example.js", __dirname + "/" + args[1] + ".js");
        return api.sendMessage(
            `✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝖿𝗂𝗅𝖾 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖼𝗋𝖾𝖺𝗍𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 "${args[1]}.𝗃𝗌".`,
            event.threadID,
            event.messageID
        );
    }
     else if (args[0] == "del") {
        fs.unlink(`${__dirname}/${args[1]}.js`);
        return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝖿𝗂𝗅𝖾 𝗇𝖺𝗆𝖾𝖽 "${args[1]}.𝗃𝗌".`, event.threadID, event.messageID)
    } 
    else if (args[0] == "rename") {
        fs.rename(`${__dirname}/${args[1]}.js`, `${__dirname}/${args[2]}.js`, function(err) {
            if (err) throw err;
            return api.sendMessage(
                `✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝖿𝗂𝗅𝖾 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗋𝖾𝗇𝖺𝗆𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 "${args[1]}.𝗃𝗌" 𝗌𝗎𝖼𝖼𝖾𝗌𝗌 "${args[2]}.𝗃𝗌".`,
                event.threadID,
                event.messageID)
        });
    }
                               }