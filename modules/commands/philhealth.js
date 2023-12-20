module.exports.config = {
  name: "philheath",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Clark",
  description: "Create your PhilHealth Card",
  commandCategory: "edit-img",
  usages: "[text - signature]",
  cooldowns: 10,
  dependencies: {
    "fs-extra": "",
    "axios": "",
  },
};

}
module.exports.run = async function ({ api, event, args, Users }) {
  let { senderID, threadID, messageID } = event;
  const { loadImage, createCanvas } = require("canvas");
  const request = require('request');
  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  let pathImg = __dirname + `/cache/${senderID}.png`;
  let pathAva = __dirname + `/cache/avtuser.png`;
  let text = args.join(" ")
  if (!text) return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝖼𝗈𝗋𝗋𝖾𝖼𝗍 𝖿𝗈𝗋𝗆𝖺𝗍 [𝗇𝖺𝗆𝖾 - 𝗌𝗂𝗀𝗇𝖺𝗍𝗎𝗋𝖾] ', event.threadID, event.messageID);
  const text1 = text.substr(0, text.indexOf(' - ')); 
  if (!text1) return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝖼𝗈𝗋𝗋𝖾𝖼𝗍 𝖿𝗈𝗋𝗆𝖺𝗍 [𝗇𝖺𝗆𝖾 - 𝗌𝗂𝗀𝗇𝖺𝗍𝗎𝗋𝖾]', event.threadID, event.messageID);
  const text2 = text.split(" - ").pop()
  if (!text2) return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝖼𝗈𝗋𝗋𝖾𝖼𝗍 𝖿𝗈𝗋𝗆𝖺𝗍 [𝗇𝖺𝗆𝖾 - 𝗌𝗂𝗀𝗇𝖺𝗍𝗎𝗋𝖾]', event.threadID, event.messageID);
  let Avatar = (
    await axios.get(
      `https://graph.facebook.com/${id}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
    )
  ).data;
  let getWanted = (
    await axios.get(encodeURI(`https://imgur.com/dfk82LB.png`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathAva, Buffer.from(Avatar, "utf-8"));
  avatar = await this.circle(pathAva);
  fs.writeFileSync(pathImg, Buffer.from(getWanted, "utf-8"));
  let baseImage = await loadImage(pathImg);
  let baseAva = await loadImage(avatar);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, 1920, 1080);
  ctx.drawImage(baseAva, 820, 315, 283, 283);
  ctx.font = "bold 70px Manrope";
  ctx.fillStyle = "#ffff";
  ctx.textAlign = "center";
  fontSize = 40;
  ctx.fillText(text1, 965, 715);
  ctx.font = "55px Manrope";
  ctx.fillStyle = "#ffff";
  ctx.textAlign = "center";
  fontSize = 20;
  ctx.fillText(text2, 965, 800);
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.removeSync(pathAva);
  return api.sendMessage(
    { body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗉𝗁𝗂𝗅𝗁𝖾𝖺𝗅𝗍𝗁 𝖼𝖺𝗋𝖽:", attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};
  