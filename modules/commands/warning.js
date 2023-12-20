module.exports.config = {
	name: "warning",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Réynél",
	description: "warning the bot users",
	commandCategory: "system",
	usages: "[reason/all]",
	cooldowns: 5,
	dependencies: {
		"fs-extra": "",
		"path": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];

    const path = resolve(__dirname, "cache", "listwarning.json");

	if (!existsSync(path)) writeFileSync(path, JSON.stringify({}), 'utf-8');
	return;
}

module.exports.run = async function ({ event, api, args, permssion, Users }) {
    const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const { threadID, messageID, mentions, senderID } = event;
    const mention = Object.keys(mentions);

    const path = resolve(__dirname, "cache", "listwarning.json");
    const dataFile = readFileSync(path, "utf-8");
    var warningData = JSON.parse(dataFile);

    switch (args[0]) {
        case "all": {
            if (permssion != 2) return api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖽𝗈 𝗇𝗈𝗍 𝗁𝖺𝗏𝖾 𝖾𝗇𝗈𝗎𝗀𝗁 𝗉𝗋𝖾𝗏𝗂𝗅𝖾𝗀𝖾𝗌 ᴛᴏ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ, ᴏɴʟʏ ᴍʏ ᴍᴀsᴛᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!`, threadID, messageID);
            var listUser = "";

            for (const IDUser in warningData) {
                const name = global.data.userName.get(IDUser) || await Users.getNameUser(IDUser);
                listUser += `- ${name}: sᴛɪʟʟ ${warningData[IDUser].warningLeft} ᴡᴀʀɴɪɴɢ ᴛɪᴍᴇs\n`;
            }
            if (listUser.length == 0) listUser = "ᴍᴀsᴛᴇʀ ᴄᴜʀʀᴇɴᴛʟʏ, ɴᴏ ᴜsᴇʀs ʜᴀᴠᴇ ʙᴇᴇɴ ᴡᴀʀɴᴇᴅ";
            return api.sendMessage(listUser, threadID, messageID);
        }
        case "reset": {
            writeFileSync(path, JSON.stringify({}), 'utf-8');
            return api.sendMessage("ᴍᴀsᴛᴇʀ ʀᴇsᴇᴛ ᴛʜᴇ ᴇɴᴛɪʀᴇ ᴡᴀʀɴɪɴɢ ʟɪsᴛ!", threadID, messageID);
        }
        default: {
            if (permssion != 2) {
                const data = warningData[args[0] || mention[0] || senderID];
                console.log(data);
                const name = global.data.userName.get(args[0] || mention[0] || senderID) || await Users.getNameUser(args[0] || mention[0] || senderID);
                if (!data) return api.sendMessage(`ᴍᴀsᴛᴇʀ, ᴘʀᴇsᴇɴᴛ sᴇɴsᴇɪ ${name} ᴡɪᴛʜᴏᴜᴛ ᴀɴʏ ᴡᴀʀɴɪɴɢ!`, threadID, messageID);
                else {
                    var reason = "";
                    for (const n of data.warningReason) reason += `- ${n}\n`;
                    return api.sendMessage(`ᴍᴀsᴛᴇʀ, ᴘʀᴇsᴇɴᴛ sᴇɴsᴇɪ ${name} ʀᴇᴍᴀɪɴɪɴɢ ${data.warningLeft} ᴡᴀʀɴɪɴɢ ᴛɪᴍᴇs:\n\n${reason}`, threadID, messageID);
                }
            }
            else {
                try {
                    if (event.type != "message_reply") return api.sendMessage("ᴍᴀsᴛᴇʀ, ʏᴏᴜ ʜᴀᴠᴇ ɴᴏᴛ ʀᴇᴘʟɪᴇᴅ ᴛᴏ ᴛʜᴇ ᴡᴀʀɴɪɴɢ ᴍᴇssᴀɢᴇ", threadID, messageID);
                    if (event.messageReply.senderID == api.getCurrentUserID()) return api.sendMessage('ᴍᴀsᴛᴇʀ, ᴜɴᴀʙʟᴇ ᴛᴏ ᴀʟᴇʀᴛ ʙᴏᴛ ᴀᴄᴄᴏᴜɴᴛ.', threadID, messageID);
                    if (args.length == 0) return api.sendMessage("ᴍᴀsᴛᴇʀ, ʏᴏᴜ ʜᴀᴠᴇ ɴᴏᴛ ᴇɴᴛᴇʀᴇᴅ ᴀ ᴡᴀʀɴɪɴɢ ʀᴇᴀsᴏɴ!", threadID, messageID);
                    var data = warningData[event.messageReply.senderID] || { "warningLeft": 3, "warningReason": [], "banned": false };
                    if (data.banned) return api.sendMessage("ᴍᴀsᴛᴇʀ, ᴛʜᴇ ᴀʙᴏᴠᴇ ᴀᴄᴄᴏᴜɴᴛ ʜᴀs ʙᴇᴇɴ ʙᴀɴɴᴇᴅ ʙᴇᴄᴀᴜsᴇ ɪᴛ ʜᴀs ʙᴇᴇɴ ᴡᴀʀɴᴇᴅ 3 ᴛɪᴍᴇs!", threadID, messageID);
                    const name = global.data.userName.get(event.messageReply.senderID) || await Users.getNameUser(event.messageReply.senderID);
                    data.warningLeft -= 1;
                    data.warningReason.push(args.join(" "));
                    if (data.warningLeft == 0) data.banned = true;
                    warningData[event.messageReply.senderID] = data;
                    writeFileSync(path, JSON.stringify(warningData, null, 4), "utf-8");
                    if (data.banned) {
                        const data = (await Users.getData(event.messageReply.senderID)).data || {};
                        data.banned = 1;
                        await Users.setData(event.messageReply.senderID, { data });
                        global.data.userBanned.set(parseInt(event.messageReply.senderID), 1);
                    }
                    return api.sendMessage(`ᴍᴀsᴛᴇʀ ᴡᴀʀɴᴇᴅ sᴇɴsᴇɪ ${name} ᴡɪᴛʜ ʀᴇᴀsᴏɴ: ${args.join(" ")}, ${(data.banned) ? `ʙᴇᴄᴀᴜsᴇ ɪ ʜᴀᴠᴇ ʙᴇᴇɴ ᴡᴀʀɴᴇᴅ 3 ᴛɪᴍᴇs, ᴛʜᴇ ᴀʙᴏᴠᴇ ᴀᴄᴄᴏᴜɴᴛ ʜᴀs ʙᴇᴇɴ ʙᴀɴɴᴇᴅ` : `ᴍᴀsᴛᴇʀ, ᴛʜᴇ ᴀʙᴏᴠᴇ ᴀᴄᴄᴏᴜɴᴛ ɪs sᴛɪʟʟ ᴀᴠᴀɪʟᴀʙʟᴇ ${data.warningLeft} ᴡᴀʀɴɪɴɢ ᴛᴜʀɴ!`}`, threadID, messageID);
                } catch (e) { return console.log(e) };
            }
        }
    }
}
