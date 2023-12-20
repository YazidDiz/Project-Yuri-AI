const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "calculate",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Clark", 
  description: "love calculator",
  commandCategory: "love",
  usages: "calculate first name | second name",
  cooldowns: 5,
};

const loveCalculator = {
  getRandomPercentage: () => Math.floor(Math.random() * 101),

  getLoveComment: async (percentage) => {
    if (percentage < 10) {
      return {
        comment: "𝖨𝗍'𝗌 𝖻𝖾𝗍𝗍𝖾𝗋 𝗍𝗈 𝖿𝗂𝗇𝖽 𝖺𝗇𝗈𝗍𝗁𝖾𝗋 𝗉𝖺𝗋𝗍𝗇𝖾𝗋 ☺️",
        gifLink: "https://i.imgur.com/l74sepy.gif",
        audioLink: "https://drive.google.com/uc?export=download&id=1CYTTaxQIMIdXXdYFO6UN1ShdQiasaUX9"
      };
    } else if (percentage < 20) {
      return {
        comment: "𝖳𝗁𝖾 𝖼𝗁𝖺𝗇𝖼𝖾 𝗈𝖿 𝗌𝗎𝖼𝖼𝖾𝗌𝗌 𝗂𝗌 𝗏𝖾𝗋𝗒 𝗅𝗈𝗐 💔",
        gifLink: "https://i.imgur.com/GdgW1fm.gif",
        audioLink: "https://drive.google.com/uc?export=download&id=1BN_FCS8hNqrg4vgq7mso9zPlR5RW0JD7"
      };
    } else if (percentage < 30) {
      return {
        comment: "𝖵𝖾𝗋𝗒 𝗅𝗈𝗐 𝖼𝗁𝖺𝗇𝖼𝖾.\n𝖸𝗈𝗎 𝖻𝗈𝗍𝗁 𝗁𝖺𝗏𝖾 𝗍𝗈 𝗐𝗈𝗋𝗄 𝗈𝗇 𝗂𝗍 💐",
        gifLink: "https://i.imgur.com/2oLW6ow.gif",
        audioLink: "https://drive.google.com/uc?export=download&id=1RiIqz4YwL9xbcoGa5svtFsGpmewEaCj0"
      };
    } else if (percentage < 40) {
      return {
        comment: "𝖭𝗈𝗍 𝖻𝖺𝖽, 𝗀𝗂𝗏𝖾 𝗒𝗈𝗎𝗋\n𝖻𝖾𝗌𝗍 𝗍𝗈 𝗆𝖺𝗄𝖾 𝗂𝗍 𝖺 𝗌𝗎𝖼𝖼𝖾𝗌𝗌 💝",
        gifLink: "https://i.imgur.com/rqGLgqm.gif",
        audioLink: "https://drive.google.com/uc?export=download&id=1eycxUA5jDZB_LSheX0kkZU-pwE7o1TbM"
      };
    } else if (percentage < 50) {
      return {
        comment: "𝖸𝗈𝗎 𝗍𝗐𝗈 𝗐𝗂𝗅𝗅 𝖻𝖾 𝖺 𝖿𝗂𝗇𝖾 𝖼𝗈𝗎𝗉𝗅𝖾\n𝖻𝗎𝗍 𝗇𝗈𝗍 𝗉𝖾𝗋𝖿𝖾𝖼𝗍 😔💟",
        gifLink: "https://i.imgur.com/6wAxorq.gif",
        audioLink: "https://drive.google.com/uc?export=download&id=1P83CMEWiZ08eMr6G5kMyBZ7DYlljMWac"
      };
    } else if (percentage < 60) {
      return {
        comment: "𝖸𝗈𝗎 𝗍𝗐𝗈 𝗁𝖺𝗏𝖾 𝗌𝗈𝗆𝖾 𝗉𝗈𝗍𝖾𝗇𝗍𝗂𝖺𝗅.\n𝖪𝖾𝖾𝗉 𝗐𝗈𝗋𝗄𝗂𝗇𝗀 𝗈𝗇 𝗂𝗍! 💏",
        gifLink: "https://i.imgur.com/ceDO779.gif",
        audioLink: "https://drive.google.com/uc?export=download&id=1_RjvyfAbJEQc5M9v-2_9lEuczp5I5nFy"
      };
    } else if (percentage < 70) {
      return {
        comment: "𝖸𝗈𝗎 𝗍𝗐𝗈 𝗐𝗂𝗅𝗅 𝖻𝖾 𝖺 𝗇𝗂𝖼𝖾 𝖼𝗈𝗎𝗉𝗅𝖾 💑",
        gifLink: "https://i.imgur.com/pGuGuC0.gif",
        audioLink: "https://drive.google.com/uc?export=download&id=1AkwiVnY7kpHTwLKi0hZv4jT19UKc5x4C"
      };
    } else if (percentage < 80) {
      return {
        comment: "𝖨𝖿 𝗒𝗈𝗎 𝗍𝗐𝗈 𝗄𝖾𝖾𝗉 𝗅𝗈𝗏𝗂𝗇𝗀 𝖾𝖺𝖼𝗁 𝗈𝗍𝗁𝖾𝗋 𝗈𝗋 𝖼𝗈𝗇𝖿𝖾𝗌𝗌 𝗒𝗈𝗎𝗋 𝖿𝖾𝖾𝗅𝗂𝗇𝗀𝗌,\n𝗂𝗍 𝗆𝗂𝗀𝗁𝗍 𝗆𝖺𝗄𝖾 𝗌𝗈𝗆𝖾 𝗀𝗈𝗈𝖽 𝖼𝗁𝖺𝗇𝗀𝖾𝗌 👩‍❤️‍💋‍👨",
        gifLink: "https://i.imgur.com/bt77RPY.gif",
        audioLink: "https://drive.google.com/uc?export=download&id=1jGiEvE6namRCfMU2IEOU7bFzFX5QrSGu"
      };
    } else if (percentage < 90) {
      return {
        comment: "𝖯𝖾𝗋𝖿𝖾𝖼𝗍 𝗆𝖺𝗍𝖼𝗁!\n𝖸𝗈𝗎𝗋 𝗅𝗈𝗏𝖾 𝗂𝗌 𝗆𝖾𝖺𝗇𝗍 𝗍𝗈 𝖻𝖾! 💑",
        gifLink: "https://i.imgur.com/kXNlsFf.gif",
        audioLink: "https://drive.google.com/uc?export=download&id=1kx4HkDM-SBF2h62Na_gHTmow653zL0nm"
      };
    } else {
      return {
        comment: "𝖠𝗆𝖺𝗓𝗂𝗇𝗀 𝗉𝖾𝗋𝖿𝖾𝖼𝗍𝗅𝗒 𝗆𝖺𝗍𝖼𝗁𝖾𝖽!\n𝖸𝗈𝗎 𝗍𝗐𝗈 𝖺𝗋𝖾 𝗆𝖾𝖺𝗇𝗍 𝗍𝗈 𝖻𝖾 𝖿𝗈𝗋 𝖾𝖺𝖼𝗁 𝗈𝗍𝗁𝖾𝗋.\n𝖡𝖾𝗌𝗍 𝗐𝗂𝗌𝗁𝖾𝗌 𝖿𝗈𝗋 𝗒𝗈𝗎𝗋 𝖿𝗎𝗍𝗎𝗋𝖾! 👩‍❤️‍💋‍👨💐",
        gifLink: "https://i.imgur.com/sY03YzC.gif",
        audioLink: "https://drive.google.com/uc?export=download&id=1NNML3BkFOWuRodg2VBsgQNfV_pgSDa1I"
      };
    }
  },

  downloadGif: async (gifLink, localPath) => {
    const response = await axios.get(gifLink, { responseType: 'arraybuffer' });
    fs.writeFileSync(localPath, Buffer.from(response.data, 'binary'));
  },

  downloadAudio: async (audioLink, localPath) => {
    const response = await axios.get(audioLink, { responseType: 'arraybuffer' });
    fs.writeFileSync(localPath, Buffer.from(response.data, 'binary'));
  },
};

module.exports.run = async function ({ api, event, args }) {
  const tzt = args.join(" ").split("|").map(item => item.trim());

  if (!args[0] || tzt.length !== 2) {
    return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗍𝗐𝗈 𝗇𝖺𝗆𝖾𝗌\n𝗌𝖾𝗉𝖺𝗋𝖺𝗍𝖾𝖽 𝖻𝗒 𝖺 𝗅𝗂𝗇𝖾 | ", event.threadID, event.messageID);
  }

  const [firstName, secondName] = tzt;

  const lovePercentage = loveCalculator.getRandomPercentage();
  const { comment, gifLink, audioLink } = await loveCalculator.getLoveComment(lovePercentage);

  const gifPath = path.join(__dirname, 'cache', 'downloaded.gif');
  const audioPath = path.join(__dirname, 'cache', 'downloaded.mp3');

  await Promise.all([
    loveCalculator.downloadGif(gifLink, gifPath),
    loveCalculator.downloadAudio(audioLink, audioPath)
  ]);

  const message = `💟 | 𝖫𝗈𝗏𝖾 𝖯𝖾𝗋𝖼𝖾𝗇𝗍𝖺𝗀𝖾 𝖿𝗈𝗋 𝗌𝖾𝗇𝗌𝖾𝗂 ${firstName} 𝖺𝗇𝖽 𝗌𝖾𝗇𝗌𝖾𝗂 ${secondName}
━━━━━━━━━━━━━━━━━━━${lovePercentage}%
━━━━━━━━━━━━━━━━━━━${comment}`;
  const gifReadStream = fs.createReadStream(gifPath);
  api.sendMessage({ body: message, attachment: gifReadStream }, event.threadID, async (err, info) => {
    if (!err) {
      await new Promise(resolve => setTimeout(resolve, 0));

      const audioReadStream = fs.createReadStream(audioPath);
      api.sendMessage({ body: "", attachment: audioReadStream }, event.threadID);
    }
  });
};