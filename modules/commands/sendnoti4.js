const fs = require('fs');
const axios = require('axios');
const moment = require('moment-timezone');
const { createReadStream, unlinkSync } = global.nodemodule['fs-extra'];
const { resolve } = global.nodemodule['path'];

module.exports.config = {
  name: 'sendnoti4',
  version: '1.0.0',
  hasPermission: 2,
  credits: 'Réynél',
  description: 'message with optional audio to all groups',
  commandCategory: 'announce',
  usage: '[Text]',
  cooldowns: 5,
};

module.exports.languages = {
  en: {
    sendSuccess: '✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗌𝖾𝗇𝗍 𝗍𝗁𝖾 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗍𝗈 《%1》 𝗀𝗋𝗈𝗎𝗉(𝗌)',
    sendFail: '❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖨 𝖼𝖺𝗇’𝗍 𝗌𝖾𝗇𝖽 𝗍𝗁𝖾 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗍𝗈 《%1》 𝗀𝗋𝗈𝗎𝗉(𝗌)',
  },
};

module.exports.run = async ({ api, event, args, getText, Users }) => {
  const name = await Users.getNameUser(event.senderID);
  const currentTime = moment.tz('Asia/Manila').format('DD/MM/YYYY || HH:mm:ss');

  let content = args.join(' ');
  let languageToSay = global.config.language;

  if (content.startsWith('[en] ')) {
    languageToSay = 'en';
    content = content.substring('[en] '.length);
  }

  const header = '❰❰ 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡𝗦 ❱❱\n━━━━━━━━━━━━━━━━━━━\n'; // Bold header text

  try {
    const allThread = global.data.allThreadID || [];
    const cantSend = [];

    for (const idThread of allThread) {
      if (isNaN(parseInt(idThread)) || idThread == event.threadID) continue;

      const audioPath = await generateAudio(content, languageToSay, idThread, event.senderID);

      const messageOptions = {
        body: `${header}${content}\n━━━━━━━━━━━━━━━━━━━\n❰❰ 𝐅𝐑𝐎𝐌 𝐌𝐀𝐒𝐓𝐄𝐑 ❱❱:\n${name.toUpperCase()}`, // Uppercase name
        attachment: createReadStream(audioPath),
      };

      api.sendMessage(messageOptions, idThread, (error) => {
        if (error) cantSend.push(idThread);
      });

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return api.sendMessage(
      getText('sendSuccess', allThread.length - 1), // Exclude the current thread
      event.threadID,
      () => (cantSend.length > 0)
        ? api.sendMessage(getText('sendFail', cantSend.length), event.threadID, event.messageID)
        : '',
      event.messageID
    );
  } catch (error) {
    console.error('Error sending announcement:', error);
    return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍.', event.threadID, event.messageID);
  }
};

// Function to generate audio and return the path
async function generateAudio(text, language, threadID, senderID) {
  const msg = text.trim();
  const path = resolve(__dirname, 'cache', `${threadID}_${senderID}.mp3`);
  await global.utils.downloadFile(
    `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      msg
    )}&tl=${language}&client=tw-ob`,
    path
  );
  return path;
  }