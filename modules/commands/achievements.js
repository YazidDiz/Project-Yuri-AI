module.exports.config = {
  name: "achivements",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Clark",
  description: "Create a minecraft achievement banner reply version",
  commandCategory: "banner",
  cooldowns: 0,
  dependencies: {
    "fs-extra": "",
    "request": "",
    "axios": ""
    }
};
module.exports.handleReply = async ({ api, event, handleReply }) => {
  const { threadID, messageID, senderID, body } = event;
  if (handleReply.content.id != senderID) return;
  const input = body.trim();
  const sendC = (msg, step, content) => api.sendMessage(msg, threadID, (err, info) => {
    global.client.handleReply.splice(global.client.handleReply.indexOf(handleReply), 1);
    api.unsendMessage(handleReply.messageID);
    global.client.handleReply.push({
      step: step,
      name: this.config.name,
      messageID: info.messageID,
      content: content
    })
  }, messageID);
  const send = async (msg) => api.sendMessage(msg, threadID, messageID);

  let content = handleReply.content;
  switch (handleReply.step) {
    case 1:
      content.block = input;
      sendC("🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗍𝗈 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝗍𝗂𝗍𝗅𝖾", 2, content);
      break;
    case 2:
      content.title = input;
      sendC("🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗍𝗈 𝖾𝗇𝗍𝖾𝗋 𝗍𝖾𝗑𝗍", 3, content);
      break;

    case 3:
      content.text = input;
      const axios = require("axios");
      const fs = require("fs");
      send("⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗂𝗇𝗂𝗍𝗂𝖺𝗅𝗂𝗓𝗂𝗇𝗀 𝗂𝗆𝖺𝗀𝖾 𝗉𝗋𝗈𝗀𝗋𝖺𝗆!");
      global.client.handleReply.splice(global.client.handleReply.indexOf(handleReply), 1);
      api.unsendMessage(handleReply.messageID);

      let c = content;
      let res = await axios.get(encodeURI(`https://minecraft-api.com/api/achivements/${c.block}/${c.title}/${c.text}`), { responseType: "arraybuffer" })
        .catch(e => { return send("❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽") });
      if (res.status != 200) return send("❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗌𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀 𝗐𝖾𝗇𝗍 𝗐𝗋𝗈𝗇𝗀, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋!");
      let path = __dirname + `/cache/achivements__${senderID}.png`;
      fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
      send({
        body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾 𝗂𝗌 𝗒𝗈𝗎𝗋 𝗉𝗂𝖼𝗍𝗎𝗋𝖾",
        attachment: fs.createReadStream(path)
      }).then(fs.unlinkSync(path));
      break;
    default:
      break;
  }
}

module.exports.run = ({ api, event, args }) => {
  const { threadID, messageID, senderID } = event;
  return api.sendMessage("🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗍𝗈 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝖻𝗅𝗈𝖼𝗄", event.threadID, (err,info) => {
    global.client.handleReply.push({
      step: 1,
      name: this.config.name,
      messageID: info.messageID,
      content: {
        id: senderID,
        block: "",
        title: "",
        text: ""
      }
    })
  }, event.messageID);
}