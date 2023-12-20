module.exports.config = {
  name: "codbanner",
  version: "1.2.0",
  hasPermssion: 0,
  credits: `Réynél`,
  description: "Generate codm Banner",
  commandCategory: "banner",
  usages: "[text]",
  cooldowns: 2,
};
module.exports.run = async function ({ api, event, args, Users }) {
  let { senderID, threadID, messageID } = event;
  const request = require('request');
  const fs = require("fs-extra");
  const axios = require("axios");
  let pathImg = __dirname + `/cache/${event.threadID}_${event.senderID}.jpg`;
  let text = args.join(" ");
  if (!text) return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖺 𝗐𝗋𝗈𝗇𝗀 𝖿𝗈𝗋𝗆𝖺𝗍 𝗎𝗌𝖾 𝗈𝖿 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽\n𝗨𝘀𝗲: ${this.config.name} 𝗍𝖾𝗑𝗍`, event.threadID, event.messageID);
  let getWanted = (
    await axios.get(`https://canvastest.heckerman06.repl.co/burat?name=${text}`, {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathImg, Buffer.from(getWanted, "utf-8"));
  return api.sendMessage(
    { body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖼𝗈𝖽𝖻𝖺𝗇𝗇𝖾𝗋 𝟣", attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};