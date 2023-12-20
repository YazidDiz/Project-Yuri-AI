module.exports.config = {
  name: 'escalate',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Réynél',
  description: 'Escalate the given text.',
  commandCategory: 'tools',
  usages: '[text] - [number of times]',
  cooldowns: 5,
};

module.exports.run = function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const input = args.join(' ');

  const match = input.match(/^(.*)\s-\s(\d+)$/);
  if (!match) {
    api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗂𝗇𝗉𝗎𝗍. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗎𝗌𝖾 𝗍𝗁𝖾 𝖿𝗈𝗋𝗆𝖺𝗍: 𝖤𝗌𝖼𝖺𝗅𝖺𝗍𝖾 [𝗍𝖾𝗑𝗍] - [𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝗍𝗂𝗆𝖾𝗌]', threadID, messageID);
    return;
  }

  const [, text, repeatCount] = match;
  const count = parseInt(repeatCount);

  if (isNaN(count) || count < 1) {
    api.sendMessage('❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍𝗌 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝗍𝗂𝗆𝖾𝗌. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗉𝗈𝗌𝗂𝗍𝗂𝗏𝖾 𝗇𝗎𝗆𝖻𝖾𝗋.', threadID, messageID);
    return;
  }

 const escalatedText = Array.from({ length: count }, () => text).join('\n');

  api.sendMessage(escalatedText, threadID, (error) => {
    if (error) {
      console.error(error);
      api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽. 𝖳𝗁𝗂𝗌 𝗆𝖺𝗒 𝖻𝖾 𝖽𝗎𝖾 𝗍𝗈 𝖬𝖾𝗌𝗌𝖾𝗇𝗀𝖾𝗋\'𝗌 𝗅𝗂𝗆𝗂𝗍𝖺𝗍𝗂𝗈𝗇 𝗈𝗇 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗅𝖾𝗇𝗀𝗍𝗁. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝗐𝗂𝗍𝗁 𝖺 𝗌𝗆𝖺𝗅𝗅𝖾𝗋 𝗍𝖾𝗑𝗍 𝗈𝗋 𝖿𝖾𝗐𝖾𝗋 𝗋𝖾𝗉𝖾𝗍𝗂𝗍𝗂𝗈𝗇𝗌.', threadID, messageID);
    }
  });
};