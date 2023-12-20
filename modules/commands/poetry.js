const axios = require('axios');
const typewriter = {
  a: '𝚊', b: '𝚋', c: '𝚌', d: '𝚍', e: '𝚎', f: '𝚏', g: '𝚐', h: '𝚑', i: '𝚒', j: '𝚓', k: '𝚔', l: '𝚕', m: '𝚖',
  n: '𝚗', o: '𝚘', p: '𝚙', q: '𝚚', r: '𝚛', s: '𝚜', t: '𝚝', u: '𝚞', v: '𝚟', w: '𝚠', x: '𝚡', y: '𝚢', z: '𝚣',
  A: '𝙰', B: '𝙱', C: '𝙲', D: '𝙳', E: '𝙴', F: '𝙵', G: '𝙶', H: '𝙷', I: '𝙸', J: '𝙹', K: '𝙺', L: '𝙻', M: '𝙼',
  N: '𝙽', O: '𝙾', P: '𝙿', Q: '𝚀', R: '𝚁', S: '𝚂', T: '𝚃', U: '𝚄', V: '𝚅', W: '𝚆', X: '𝚇', Y: '𝚈', Z: '𝚉',
  ' ': ' ',
};

module.exports.config = {
  name: 'poetry',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Réynél',
  description: 'Get random poetry by an author.',
  commandCategory: 'poem',
  usages: '[author]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const author = args.join(' ');

  if (!author) {
    api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝖺𝗎𝗍𝗁𝗈𝗋 𝗇𝖺𝗆𝖾 𝗍𝗈 𝗀𝖾𝗍 𝗉𝗈𝖾𝗍𝗋𝗒.', threadID, messageID);
    return;
  }

  try {
    const response = await axios.get(`https://poetrydb.org/author/${encodeURIComponent(author)}`);

    if (response.status === 200 && response.data && response.data.length > 0) {
      const randomPoetry = response.data[Math.floor(Math.random() * response.data.length)];
      const poem = randomPoetry.lines.join('\n').split('').map(char => typewriter[char] || char).join('');
      const authorFormatted = author.split('').map(char => typewriter[char] || char).join('');
      api.sendMessage(`📜 | 𝗥𝗔𝗡𝗗𝗢𝗠 𝗣𝗢𝗘𝗧𝗥𝗬\n\n  ✏️ | ${authorFormatted}\n━━━━━━━━━━━━━━━━━━━\n${poem}\n━━━━━━━━━━━━━━━━━━━`, threadID, messageID);
    } else {
      api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗉𝗈𝖾𝗍𝗋𝗒 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 𝖺𝗎𝗍𝗁𝗈𝗋: ${author}`, threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗎, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝗉𝗈𝖾𝗍𝗋𝗒 𝖽𝖺𝗍𝖺.', threadID, messageID);
  }
};