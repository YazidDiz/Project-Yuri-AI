module.exports.config = {
  name: "setrankup",
  version: "1.0.5",
  hasPermssion: 2,
  credits: "Réynél",
  description: "Edit text/animation when new members level up",
  commandCategory: "system",
  usages: "[gif/text] [Text or URL Download GIF image]",
  cooldowns: 10,
  dependencies: {
    "fs-extra": "",
    "path": ""
    }
}

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const path = join(__dirname, "cache", "rankup");
    if (!existsSync(path)) mkdirSync(path, { recursive: true });

    return;
}

module.exports.languages = {
    "vi": {
        "savedConfig": "Đã lưu tùy chỉnh của bạn thành công! dưới đây sẽ là phần preview:",
        "tagMember": "[Tên thành viên]",
        "tagLevel": "[Level của thành viên]",
        "gifPathNotExist": "Nhóm của bạn chưa từng cài đặt gif rankup",
        "removeGifSuccess": "Đã gỡ bỏ thành công file gif của nhóm bạn!",
        "invaildURL": "Url bạn nhập không phù hợp!",
        "internetError": "Không thể tải file vì url không tồn tại hoặc bot đã xảy ra vấn đề về mạng!",
        "saveGifSuccess": "Đã lưu file gif của nhóm bạn thành công, bên dưới đây là preview:"
    },
    "en": {
        "savedConfig": "✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗌𝖺𝗏𝖾𝖽 𝗒𝗈𝗎𝗋 𝖼𝗈𝗇𝖿𝗂𝗀, 𝗁𝖾𝗋𝖾 𝗂𝗌 𝗍𝗁𝖾 𝗉𝗋𝖾𝗏𝗂𝖾𝗐:\n",
        "tagMember": "《 𝗠𝗲𝗺𝗯𝗲𝗿'𝘀 𝗻𝗮𝗺𝗲 》",
        "tagLevel": "《 𝗠𝗲𝗺𝗯𝗲𝗿 𝗹𝗲𝘃𝗲𝗹 》",
        "gifPathNotExist":"ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎𝗋 𝗀𝗋𝗈𝗎𝗉 𝖽𝗂𝖽𝗇'𝗍 𝗌𝖾𝗍 𝗃𝗈𝗂𝗇 𝗀𝗂𝖿.",
        "removeGifSuccess": "✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗋𝖾𝗆𝗈𝗏𝖾𝖽 𝗀𝗋𝗈𝗎𝗉 𝗃𝗈𝗂𝗇 𝗀𝗂𝖿.",
        "invaildURL": "❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖴𝖱𝖫.",
        "internetError": "❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖨 𝖼𝖺𝗇'𝗍 𝗅𝗈𝖺𝖽 𝖿𝗂𝗅𝖾 𝖻𝖾𝖼𝖺𝗎𝗌𝖾 𝖴𝖱𝖫 𝖽𝗈𝖾𝗌𝗇'𝗍 𝖾𝗑𝗂𝗌𝗍 𝗈𝗇 𝗂𝗇𝗍𝖾𝗋𝗇𝖾𝗍 𝗈𝗋 𝗁𝖺𝗏𝖾 𝗌𝗈𝗆𝖾 𝗉𝗋𝗈𝖻𝗅𝖾𝗆.",
        "saveGifSuccess": "✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗌𝖺𝗏𝖾𝖽 𝖿𝗂𝗅𝖾 𝗀𝗂𝖿, 𝗁𝖾𝗋𝖾 𝗂𝗌 𝗍𝗁𝖾 𝗉𝗋𝖾𝗏𝗂𝖾𝗐:\n"
    }
}

module.exports.run = async function ({ args, event, api, Threads, getText }) {
    try {
        const { existsSync, createReadStream } = global.nodemodule["fs-extra"];
        const { join } = global.nodemodule["path"];
        const { threadID, messageID } = event;
        const msg = args.slice(1, args.length).join(" ");
        var data = (await Threads.getData(threadID)).data;

        switch (args[0]) {
            case "text": {
                data["customRankup"] = msg;
                global.data.threadData.set(parseInt(threadID), data);
                await Threads.setData(threadID, { data });
                return api.sendMessage(getText("savedConfig"), threadID, function () {
                    const body = msg
                    .replace(/\{name}/g, getText("tagMember"))
                    .replace(/\{level}/g, getText("tagLevel"));
                    return api.sendMessage(body, threadID);
                });
            }
            case "gif": {
                const path = join(__dirname, "cache", "rankup");
                const pathGif = join(path, `${threadID}.gif`);
                if (msg == "remove") {
                    if (!existsSync(pathGif)) return api.sendMessage(getText("gifPathNotExist"), threadID, messageID);
                    unlinkSync(pathGif);
                    return api.sendMessage(getText("removeGifSuccess"), threadID, messageID);
                }
                else {
                    if (!msg.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:gif|GIF)/g)) return api.sendMessage(getText("invaildURL"), threadID, messageID);
                    try {
                        await global.utils.downloadFile(msg, pathGif);
                    } catch (e) { return api.sendMessage(getText("internetError"), threadID, messageID) }
                    return api.sendMessage({ body: getText("saveGifSuccess"), attachment: createReadStream(pathGif) }, threadID, messageID);
                }
            }
            default: {
                return global.utils.throwError(this.config.name, threadID, messageID);
            }
        }
    } catch (e) { return console.log(e) };
}