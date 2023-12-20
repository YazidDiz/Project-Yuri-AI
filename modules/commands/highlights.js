module.exports.config = {
  name: "highlights",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Video highlights",
  commandCategory: "entertainment",
  usage: "[gamename]",
  cooldowns: 5,
};

const axios = require("axios");
const fs = require("fs");
const path = require("path");

const categories = {
  farlight: "farlight+highlight",
  codm: "codm+highlight",
  mlbb: "mlbb+highlight",
  roblox: "roblox+edit",
  dota2: "dota+2+highlight",
  lol: "League+of+Legends+highlight",
  breakout: "arena+breakout+highlight",
  worldwar: "world+war+zone+edit"
};

module.exports.run = async function({ api, event, args }) {
  try {
    if (args.length === 0) {
      api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗌𝗉𝖾𝖼𝗂𝖿𝗒 𝖺 𝗀𝖺𝗆𝖾 𝗇𝖺𝗆𝖾 𝗈𝗋 𝗎𝗌𝖾 '${global.config.PREFIX}𝗁𝗂𝗀𝗁𝗅𝗂𝗀𝗁𝗍𝗌 𝗅𝗂𝗌𝗍' 𝗍𝗈 𝗌𝗁𝗈𝗐 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖼𝖺𝗍𝖾𝗀𝗈𝗋𝗂𝖾𝗌.`, event.threadID);
      return;
    }

    const command = args[0].toLowerCase();

    if (command === "list") {
      const availableCategories = Object.keys(categories).join(", ");
      api.sendMessage(`📋 | 𝗟𝗶𝘀𝘁: ${availableCategories}`, event.threadID);
      return;
    }

    const categoryQuery = categories[command];

    if (!categoryQuery) {
      api.sendMessage(`🎓 | 𝗨𝘀𝗮𝗴𝗲: "${global.config.PREFIX}𝗁𝗂𝗀𝗁𝗅𝗂𝗀𝗁𝗍𝗌 𝗅𝗂𝗌𝗍" 𝗍𝗈 𝗌𝗁𝗈𝗐 𝖺𝗅𝗅 𝗀𝖺𝗆𝖾𝗇𝖺𝗆𝖾.`, event.threadID);
      return;
    }

    api.sendMessage(`⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗋𝖺𝗇𝖽𝗈𝗆 ${command} 𝗏𝗂𝖽𝖾𝗈...`, event.threadID);

    const response = await axios.get(`https://hiroshi.hiroshiapi.repl.co/tiktok/searchvideo?keywords=${categoryQuery}`);
    const videoUrl = response.data.data.videos[0].play;

    const filePath = path.join(__dirname, `/cache/${command}_video.mp4`);
    const writer = fs.createWriteStream(filePath);

    const videoResponse = await axios({
      method: 'get',
      url: videoUrl,
      responseType: 'stream'
    });

    videoResponse.data.pipe(writer);

    writer.on('finish', () => {
      const message = `✅ | ${command} 𝗁𝗂𝗀𝗁𝗅𝗂𝗀𝗁𝗍 𝗏𝗂𝖽𝖾𝗈:`;
      api.sendMessage(
        { body: message, attachment: fs.createReadStream(filePath) },
        event.threadID,
        () => fs.unlinkSync(filePath)
      );
    });
  } catch (error) {
    console.error('Error:', error);
  }
};