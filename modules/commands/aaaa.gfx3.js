module.exports.config = {
  name: "gfx3",
  version: "1.0.1",
  hasPermssion: 0,
  credits: `Réynél`,
  description: "create a gfx banner version 3",
  commandCategory: "banner",
  usages: "[text]",
  cooldowns: 2,
};
module.exports.run = async function ({ api, event, args, Users }) {
  let { senderID, threadID, messageID } = event;
  const request = require('request');
  const fs = require("fs-extra");
  const axios = require("axios");
  let pathImg = __dirname + `/cache/${event.threadID}_${event.senderID}.png`;
  let text = args.join(" ");
  if (!text) return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖺 𝗐𝗋𝗈𝗇𝗀 𝖿𝗈𝗋𝗆𝖺𝗍 𝗎𝗌𝖾 𝗈𝖿 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽\n𝖪𝗂𝗇𝖽𝗅𝗒 𝗎𝗌𝖾: ${global.config.PREFIX}${this.config.name} 𝗍𝖾𝗑𝗍`, event.threadID, event.messageID);
  let getWanted = (
    await axios.get(`https://tanjiro-api.onrender.com/gfx3?text=${text}&text2=Senpai&api_key=tanjiro`, {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathImg, Buffer.from(getWanted, "utf-8"));
  return api.sendMessage(
    { body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖦𝖥𝖷 𝟥 𝖡𝖺𝗇𝗇𝖾𝗋", attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};