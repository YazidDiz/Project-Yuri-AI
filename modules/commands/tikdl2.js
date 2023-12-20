const fs = require('fs-extra');
const axios = require('axios');

module.exports.config = {
  name: "tikdl2",
  version: "1.0.",
  hasPermission: 0,
  credits: "Réynél",
  description: "TikTok Video Downloader",
  commandCategory: "downloader",
  usages: "[video link]",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args }) {
  let link = args.join(" ");

  if (!link) {
    api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗎𝗍 𝖺 𝗏𝖺𝗅𝗂𝖽 𝖳𝗂𝗄𝖳𝗈𝗄 𝗏𝗂𝖽𝖾𝗈 𝗅𝗂𝗇𝗄", event.threadID, event.messageID);
    return;
  }

  api.sendMessage("📥 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝖽𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝗂𝗇𝗀 𝗍𝗁𝖾 𝗏𝗂𝖽𝖾𝗈, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", event.threadID, event.messageID);

  try {
    let path = __dirname + `/cache/`;

    let res = await axios.get(`https://tiktokdl.hayih59124.repl.co/TikTokdl?url=${encodeURIComponent(link)}`);
    await fs.ensureDir(path);

    path += 'tiktok_video.mp4';

    const data = res.data.result.data;

    const vid = (await axios.get(data.play, { responseType: "arraybuffer" })).data;

    fs.writeFileSync(path, Buffer.from(vid, 'utf-8'));
//dont change credits or I'll of apis
    api.sendMessage({
      body: `==== 𝖽𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝖾𝖽 ====\n━━━━━━━━━━━━━━━━━━\n→ 𝗧𝗶𝘁𝗹𝗲: ${data.title}.\n→ 𝗣𝗹𝗮𝘆 𝗖𝗼𝘂𝗻𝘁: ${data.play_count}.\n→ 𝗗𝗶𝗴𝗴 𝗖𝗼𝘂𝗻𝘁: ${data.digg_count}.\n→ 𝗖𝗼𝗺𝗺𝗲𝗻𝘁 𝗖𝗼𝘂𝗻𝘁: ${data.comment_count}.\n→ 𝗦𝗵𝗮𝗿𝗲 𝗖𝗼𝘂𝗻𝘁: ${data.share_count}.\n→ 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗖𝗼𝘂𝗻𝘁: ${data.download_count}\n\n`, attachment: fs.createReadStream(path)
    }, event.threadID, () => fs.unlinkSync(path), event.messageID);

  } catch (e) {
    api.sendMessage(`${e}`, event.threadID, event.messageID);
  };
};