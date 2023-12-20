module.exports.config = {
  name: "poli",
  version: "1.0.",
  hasPermssion: 0,
  credits: "Clark",
  description: "generate image from polination",
  commandCategory: "generate",
  usages: "[name of drawing]",
  cooldowns: 2,
};
module.exports.run = async ({api, event, args }) => {
const axios = require('axios');
const fs = require('fs-extra');
 let { threadID, messageID } = event;
  let query = args.join(" ");
  if (!query) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗎𝗍 𝗌𝗈𝗆𝖾 𝗍𝖾𝗑𝗍 𝗈𝗋 𝗊𝗎𝖾𝗋𝗒 𝗈𝖿 𝗍𝗁𝖾 𝗂𝗆𝖺𝗀𝖾 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝖾", threadID, messageID);
let path = __dirname + `/cache/poli.png`;
  const poli = (await axios.get(`https://image.pollinations.ai/prompt/${query}`, {
    responseType: "arraybuffer",
  })).data;
  fs.writeFileSync(path, Buffer.from(poli, "utf-8"));
  api.sendMessage({
    body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝖾𝖽 𝗂𝗆𝖺𝗀𝖾, 𝗍𝗁𝖾 𝗂𝗆𝖺𝗀𝖾 𝗐𝗂𝗅𝗅 𝖻𝖾 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝖺𝖿𝗍𝖾𝗋 𝖺𝗇 𝗁𝗈𝗎𝗋, 𝗒𝗈𝗎 𝖼𝖺𝗇 𝗌𝖺𝗏𝖾 𝗂𝗍 𝗂𝖿 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍",
    attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID);
};