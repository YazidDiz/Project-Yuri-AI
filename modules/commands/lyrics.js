const axios = require('axios');
const request = require('request');
const fs = require('fs');
module.exports.config = {
  name: 'lyrics',
  version: '1',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'Lyrics Finder',
  commandCategory: 'media',
  usage: '[song]',
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const song = args.join(' ');

  if (!song) {
    return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖽𝗈𝗇’𝗍 𝖿𝗈𝗋𝗀𝖾𝗍 𝗍𝗈 𝖾𝗇𝗍𝖾𝗋 𝖺 𝗌𝗈𝗇𝗀 𝗇𝖺𝗆𝖾.', event.threadID, event.messageID);
  } else {
    axios.get(`https://api.heckerman06.repl.co/api/other/lyrics2?song=${encodeURIComponent(song)}`)
      .then(res => {
        const { title, artist, lyrics, image } = res.data;

        const callback = () => {
          api.sendMessage({
            body: `𝗧𝗶𝘁𝗹𝗲: ${title}\n\n𝗔𝗿𝘁𝗶𝘀𝘁: ${artist}\n\n𝗟𝘆𝗿𝗶𝗰𝘀: ${lyrics}`,
            attachment: fs.createReadStream(__dirname + '/cache/image.png')
          }, event.threadID, () => fs.unlinkSync(__dirname + '/cache/image.png'), event.messageID);
        };

        request(encodeURI(image))
          .pipe(fs.createWriteStream(__dirname + '/cache/image.png'))
          .on('close', callback);
      })
      .catch(error => {
        console.error('Lyrics API error:', error);
        api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝖿𝖾𝗍𝖼𝗁 𝗍𝗁𝖾 𝗅𝗒𝗋𝗂𝖼𝗌.', event.threadID, event.messageID);
      });
  }
};