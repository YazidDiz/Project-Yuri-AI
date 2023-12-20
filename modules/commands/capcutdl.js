const fs = require('fs-extra');
const axios = require('axios');

module.exports.config = {
  name: "capcutdl",
  version: "1.0.",
  hasPermssion: 0,
  credits: "Réynél",
  description: "CapCut Video Downloader",
  commandCategory: "downloader",
  usages: "[video link]",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args }) {
  let link = args.join(" ");

  if (!args[0]) {
    api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗎𝗍 𝖺 𝗏𝖺𝗅𝗂𝖽 𝖢𝖺𝗉𝖢𝗎𝗍 𝗏𝗂𝖽𝖾𝗈 𝗅𝗂𝗇𝗄", event.threadID, event.messageID);
    return;
  }

  api.sendMessage("📥 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝖽𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝗂𝗇𝗀 𝗍𝗁𝖾 𝗏𝗂𝖽𝖾𝗈, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", event.threadID, event.messageID);

  try {
    let path = __dirname + `/cache/`;

    // don't change credits or I'll of apis
    let res = await axios.get(`https://Capcutdl.hayih59124.repl.co/capcut?url=${link}`);
    await fs.ensureDir(path);

    path += 'capcut_video.mp4';

    const videoUrl = res.data.result.video_ori;

    const vid = (await axios.get(videoUrl, { responseType: "arraybuffer" })).data;

    fs.writeFileSync(path, Buffer.from(vid, 'utf-8'));

    api.sendMessage({
      body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾 𝗂𝗌 𝗒𝗈𝗎𝗋 𝖽𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝖾𝖽 𝖼𝖺𝗉𝖼𝗎𝗍 𝗏𝗂𝖽𝖾𝗈`,
      attachment: fs.createReadStream(path)
    }, event.threadID, () => fs.unlinkSync(path), event.messageID);

  } catch (e) {
    api.sendMessage(`${e}`, event.threadID, event.messageID);
  };
};