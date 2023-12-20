const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "play",
  version: "3.2",
  hasPermssion: 0,
  credits: "Clark",
  description: "( 𝙿𝚕𝚊𝚢𝚐𝚛𝚘𝚞𝚗𝚍 - 𝚟2 )",
  commandCategory: "generate",
  usages: "( 𝙼𝚘𝚍𝚎𝚕 - 𝙿𝚕𝚊𝚢𝚐𝚛𝚘𝚞𝚗𝚍 1024𝚙𝚡 - 𝚊𝚎𝚜𝚝𝚑𝚎𝚝𝚒𝚌 )",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!(event.body.indexOf("play") === 0 || event.body.indexOf("Play") === 0)) return;
  const args = event.body.split(/\s+/);
  args.shift();

  const prompt = args.join(" ");  

  api.setMessageReaction("📸", event.messageID, (err) => {}, true);

  if (!prompt) {
    api.sendMessage("✨ | 𝙷𝚎𝚕𝚕𝚘 𝚝𝚘 𝚞𝚜𝚎 𝙿𝚕𝚊𝚢𝚐𝚛𝚘𝚞𝚗𝚍 𝙰𝙸.\n━━━━━━━━━━━━━━━━━━━\nℹ️ | 𝙿𝚕𝚎𝚊𝚜𝚎 𝚞𝚜𝚎: 𝚙𝚕𝚊𝚢 [ 𝚙𝚛𝚘𝚖𝚙𝚝 ]", event.threadID);
    return;
  }

  api.sendMessage("🕟 | 𝚂𝚎𝚗𝚜𝚎𝚒, 𝙿𝚕𝚊𝚢 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝙿𝚛𝚘𝚖𝚙𝚝, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID);

  try {
    const response = await axios.get('https://codemerge-api.hazeyy0.repl.co/play/api', {
      params: {
        prompt: prompt,  
      },
    });

    console.log('🤖 | 𝙿𝚕𝚊𝚢 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎:', response.data);

    if (response.data.output) {
      const imageData = response.data.output;

      if (imageData && Array.isArray(imageData)) {
        const item = imageData[0];
        const image = await axios.get(item, { responseType: "arraybuffer" });
        const path = __dirname + "/cache/" + Math.floor(Math.random() * 999999) + ".jpg";

        const promptMessage = `🤖 | 𝐏𝐥𝐚𝐲 ( 𝐀𝐈 )\n━━━━━━━━━━━━━━━━━━━\n🖋️ 𝙰𝚜𝚔: '${prompt}'\n━━━━━━━━━━━━━━━━━━━\n✨ 𝙿𝚛𝚘𝚖𝚙𝚝 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚎𝚍:`;

        fs.writeFileSync(path, image.data);

        api.sendMessage({ body: promptMessage, attachment: fs.createReadStream(path) }, event.threadID, () => {
          fs.unlinkSync(path);
        });
      }
    } else {
      api.sendMessage('🚫 | 𝙶𝚘𝚖𝚎𝚗 𝚜𝚎𝚗𝚜𝚎𝚒, 𝚋𝚞𝚝 𝚊𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚍𝚞𝚛𝚒𝚗𝚐 𝚝𝚑𝚎 𝙿𝚒𝚡𝙰𝚛𝚝 𝚙𝚛𝚘𝚌𝚎𝚜𝚜.', event.threadID);
    }
  } catch (error) {
    console.error('🚫 | 𝙴𝚛𝚛𝚘𝚛:', error);
    api.sendMessage('🚫 | 𝙶𝚘𝚖𝚎𝚗 𝚜𝚎𝚗𝚜𝚎𝚒, 𝚋𝚞𝚝 𝚊𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎.', event.threadID);
  }
};

module.exports.run = async function({ api, event }) {};