const fs = require('fs');
const request = require('request');

module.exports.config = {
  name: "sendnoti3",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Réynél",
  description: "Send notification messages to group chats",
  commandCategory: "announce",
  usages: "[message]",
  cooldowns: 5,
}

let atmDir = [];

const getAtm = (atm, body) => new Promise(async (resolve) => {
    let msg = {}, attachment = [];
    msg.body = body;
    for(let eachAtm of atm) {
        await new Promise(async (resolve) => {
            try {
                let response =  await request.get(eachAtm.url),
                    pathName = response.uri.pathname,
                    ext = pathName.substring(pathName.lastIndexOf(".") + 1),
                    path = __dirname + `/cache/${eachAtm.filename}.${ext}`
                response
                    .pipe(fs.createWriteStream(path))
                    .on("close", () => {
                        attachment.push(fs.createReadStream(path));
                        atmDir.push(path);
                        resolve();
                    })
            } catch(e) { console.log(e); }
        })
    }
    msg.attachment = attachment;
    resolve(msg);
})

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Manila").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, body } = event;
    let name = await Users.getNameUser(senderID);
    switch (handleReply.type) {
        case "sendnoti3": {
            let text = `╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n༶•⛧┈♛ 𝗨𝗦𝗘𝗥 𝗥𝗘𝗣𝗟𝗬 ♛┈⛧•༶\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n🕐 | 𝗧𝗶𝗺𝗲:\n${gio}\n━━━━━━━━━━━━━━━━━━━\n💬 | 𝗥𝗲𝗽𝗹𝘆:\n${body}\n━━━━━━━━━━━━━━━━━━━\n👤 | 𝗡𝗮𝗺𝗲:\n${name}\n━━━━━━━━━━━━━━━━━━━\n👥 | 𝗚𝗿𝗼𝘂𝗽:\n${(await Threads.getInfo(threadID)).threadName || "Unknow"}\n━━━━━━━━━━━━━━━━━━━\n☪︎●◉✿𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜✿◉●☪︎`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n༶•⛧┈♛ 𝗨𝗦𝗘𝗥 𝗥𝗘𝗣𝗟𝗬 ♛┈⛧•༶\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n🕐 | 𝗧𝗶𝗺𝗲:\n${gio}\n━━━━━━━━━━━━━━━━━━━\n💬 | 𝗥𝗲𝗽𝗹𝘆:\n${body}\n━━━━━━━━━━━━━━━━━━━\n👤 | 𝗡𝗮𝗺𝗲:\n${name}\n━━━━━━━━━━━━━━━━━━━\n👥 | 𝗚𝗿𝗼𝘂𝗽:\n${(await Threads.getInfo(threadID)).threadName || "Unknow"}\n━━━━━━━━━━━━━━━━━━━\n☪︎●◉✿𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜✿◉●☪︎`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "reply",
                    messageID: info.messageID,
                    messID: messageID,
                    threadID
                })
            });
            break;
        }
        case "reply": {
            let text = `╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n𒈔𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗙𝗿𝗼𝗺 𝗠𝗮𝘀𝘁𝗲𝗿𒈔\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n🕐 | 𝗧𝗶𝗺𝗲:\n${gio}\n━━━━━━━━━━━━━━━━━━━\n💬 | 𝗠𝗲𝘀𝘀𝗮𝗴𝗲:\n${body}\n━━━━━━━━━━━━━━━━━━━\n👑 | 𝗠𝗮𝘀𝘁𝗲𝗿 𝗡𝗮𝗺𝗲:\n${name}\n━━━━━━━━━━━━━━━━━━━\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗂𝖿 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗋𝖾𝗌𝗉𝗈𝗇𝖽 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾.`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n𒈔𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗙𝗿𝗼𝗺 𝗠𝗮𝘀𝘁𝗲𝗿𒈔\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n🕐 | 𝗧𝗶𝗺𝗲:\n${gio}\n━━━━━━━━━━━━━━━━━━━\n💬 | 𝗠𝗲𝘀𝘀𝗮𝗴𝗲:\n${body}\n━━━━━━━━━━━━━━━━━━━\n👑 | 𝗠𝗮𝘀𝘁𝗲𝗿 𝗡𝗮𝗺𝗲:\n${name}\n━━━━━━━━━━━━━━━━━━━\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗂𝖿 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗋𝖾𝗌𝗉𝗈𝗇𝖽 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾.`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "sendnoti3",
                    messageID: info.messageID,
                    threadID
                })
            }, handleReply.messID);
            break;
        }
    }
}

module.exports.run = async function ({ api, event, args, Users }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Manila").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, messageReply } = event;
    if (!args[0]) return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗂𝗇𝗉𝗎𝗍 𝖺 𝗆𝖾𝗌𝗌𝖺𝗀𝖾.", threadID);
    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n𒈔𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗙𝗿𝗼𝗺 𝗠𝗮𝘀𝘁𝗲𝗿𒈔\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n🕐 | 𝗧𝗶𝗺𝗲:\n${gio}\n━━━━━━━━━━━━━━━━━━━\n💬 | 𝗠𝗲𝘀𝘀𝗮𝗴𝗲:\n${args.join(" ")}\n━━━━━━━━━━━━━━━━━━━\n👑 | 𝗠𝗮𝘀𝘁𝗲𝗿 𝗡𝗮𝗺𝗲:\n${await Users.getNameUser(senderID)} \n━━━━━━━━━━━━━━━━━━━\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗋𝖾𝗉𝗅𝗒 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗂𝖿 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗋𝖾𝗌𝗉𝗈𝗇𝖽 𝗍𝗈 𝗍𝗁𝗂𝗌 𝖺𝗇𝗇𝗈𝗎𝗇𝖼𝖾𝗆𝖾𝗇𝗍.`;
    if(event.type == "message_reply") text = await getAtm(messageReply.attachments, `╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n𒈔𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗙𝗿𝗼𝗺 𝗠𝗮𝘀𝘁𝗲𝗿𒈔\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n🕐 | 𝗧𝗶𝗺𝗲:\n${gio}\n━━━━━━━━━━━━━━━━━━━\n💬 | 𝗠𝗲𝘀𝘀𝗮𝗴𝗲:\n${args.join(" ")}\n━━━━━━━━━━━━━━━━━━━\n👑 | 𝗠𝗮𝘀𝘁𝗲𝗿 𝗡𝗮𝗺𝗲:\n${await Users.getNameUser(senderID)} \n━━━━━━━━━━━━━━━━━━━\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗋𝖾𝗉𝗅𝗒 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗂𝖿 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗋𝖾𝗌𝗉𝗈𝗇𝖽 𝗍𝗈 𝗍𝗁𝗂𝗌 𝖺𝗇𝗇𝗈𝗎𝗇𝖼𝖾𝗆𝖾𝗇𝗍.`);
    await new Promise(resolve => {
        allThread.forEach((each) => {
            try {
                api.sendMessage(text, each, (err, info) => {
                    if(err) { canNot++; }
                    else {
                        can++;
                        atmDir.forEach(each => fs.unlinkSync(each))
                        atmDir = [];
                        global.client.handleReply.push({
                            name: this.config.name,
                            type: "sendnoti3",
                            messageID: info.messageID,
                            messID: messageID,
                            threadID
                        })
                        resolve();
                    }
                })
            } catch(e) { console.log(e) }
        })
    })
    api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗌𝖾𝗇𝗍 𝗍𝗈 《${can}》 𝗀𝗋𝗈𝗎𝗉(𝗌)\n\n❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝗇𝗈𝗍 𝗌𝖾𝗇𝗍 𝗍𝗈 《${canNot}》 𝗀𝗋𝗈𝗎𝗉(𝗌)`, threadID);
      }