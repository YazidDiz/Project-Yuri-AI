const axios = require('axios');
const { parse } = require('url');

module.exports.config = {
  name: 'haxor',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Réynél',
  description: 'Grab sites from haxor',
  commandCategory: 'tools',
  usages: '[FirstPage - LastPage]',
  cooldowns: 0,
  dependencies: [],
};

module.exports.run = async function({ api, event, args }) {
  const [First, Last] = args.join(' ').split(' - ');

  if (!First || !Last) {
    api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗎𝗌𝖾 𝗍𝗁𝖾 𝖼𝗈𝗋𝗋𝖾𝖼𝗍 𝗎𝗌𝖺𝗀𝖾.\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲: ${global.config.PREFIX}𝗁𝖺𝗑𝗈𝗋 𝟣 - 𝟤`, event.threadID, event.messageID);
    return;
  }

  const start = parseInt(First);
  const end = parseInt(Last);

  if (isNaN(start) || isNaN(end) || start > end) {
    api.sendMessage('❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗇𝗎𝗆𝖻𝖾𝗋 𝟢.', event.threadID, event.messageID);
    return;
  }

  try {
    const apiKey = 'aHR0cHM6Ly9zaGFkb3cucmVpa29kZXYyNHByb3BsLnJlcGwuY28vYXBpL2hheG9y';
    const haxorID = Buffer.from(apiKey, 'base64').toString('utf-8');
    const response = await axios.get(`${haxorID}/${start}/${end}`);
    const message = response.data.message;
    
    api.sendMessage(`${message}`, event.threadID);
  } catch (error) {
    console.error('Something went wrong:', error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝖴𝖱𝖫𝗌. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', event.threadID, event.messageID);
  }
};