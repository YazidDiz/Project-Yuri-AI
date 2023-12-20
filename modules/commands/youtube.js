const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const ytdl = require('ytdl-core');

module.exports.config = {
  name: "youtube",
  version: "1.3.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Access YouTube",
  commandCategory: "media",
  usages: "[video name]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    const videoName = args.join(" ");

    if (!videoName) {
        return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗌𝖾𝖺𝗋𝖼𝗁 𝗊𝗎𝖾𝗋𝗒 𝖿𝗈𝗋 𝗍𝗁𝖾 𝖸𝗈𝗎𝖳𝗎𝖻𝖾 𝗏𝗂𝖽𝖾𝗈.", event.threadID, event.messageID);
    }

    try {
        const response = await axios.post('https://youtube.august-api.repl.co/searchVideo', {
            videoName: videoName,
        });

        const { title, description, duration, views, thumbnail, url, error } = response.data;

        if (error) {
            console.error('ERROR', error);
            return api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽: ${error}`, event.threadID);
        }

        api.sendMessage(`⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 "${title}", 𝗉𝗅𝖾𝖺𝗌𝖾 𝖻𝖾 𝗉𝖺𝗍𝗂𝖾𝗇𝗍...`, event.threadID, event.messageID);

        const videoStream = ytdl(url, { quality: 'highest', filter: 'audioandvideo' });

        const fileName = `${Date.now()}_${title}.mp4`;
        const filePath = path.join(__dirname, 'downloads', fileName); 

        const writeStream = fs.createWriteStream(filePath);

        videoStream.pipe(writeStream);

        writeStream.on('finish', () => {
            const message = {
                body: `🎞️ | 𝗛𝗘𝗥𝗘'𝗦 𝗧𝗛𝗘 𝗥𝗘𝗦𝗨𝗟𝗧\n━━━━━━━━━━━━━━━━━━━\n𝗧𝗜𝗧𝗟𝗘: ${title}\n𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: ${description}\n𝗗𝗨𝗥𝗔𝗧𝗜𝗢𝗡: ${duration}\n𝗩𝗜𝗘𝗪𝗦: ${views}\n𝗧𝗛𝗨𝗠𝗕𝗡𝗔𝗜𝗟: ${thumbnail}`,
                attachment: fs.createReadStream(filePath),
            };

            api.sendMessage(message, event.threadID, async () => {
                if (fs.existsSync(filePath)) {
                    await fs.unlink(filePath);
                }
            });
        });
    } catch (error) {
        console.error('ERROR', error);
        api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.', event.threadID);
    }
};