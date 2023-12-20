const path = require('path');
const fs = require('fs');

let badWordsActive = {}, bannedWords = {}, warnings = {};
const saveFile = path.join(__dirname, '../commands/badwords/badwordsActive.json');
if (fs.existsSync(saveFile)) {
  const words = JSON.parse(fs.readFileSync(saveFile, "utf8"));
  badWordsActive = words;
}

const loadBannedWords = threadID => {
  const wordFile = path.join(__dirname, `../commands/badwords/badwordthread2/${threadID}.json`);
  if (fs.existsSync(wordFile)) {
    const words = JSON.parse(fs.readFileSync(wordFile, "utf8"));
    bannedWords[threadID] = words;
  } else {
    bannedWords[threadID] = [];
  }
};

module.exports.config = {
  name: "badwords",
  version: "1.0.0",
  hasPermission: 1,
  credits: "Réynél",
  description: "Manage and enforce banned words",
  commandCategory: "group",
  usages: "add [word] | remove [word] | list | on | off | unwarn [userID]",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ api, event }) => {
  const { threadID, messageID, senderID, body } = event;
  loadBannedWords(threadID);
  if (!badWordsActive[threadID]) return;

  const messageContent = body.toLowerCase();
  const hasBannedWord = bannedWords[threadID].some(bannedWord => messageContent.includes(bannedWord.toLowerCase()));

  if (hasBannedWord) {
    const threadInfo = await api.getThreadInfo(threadID);
    if (!threadInfo.adminIDs.some(item => item.id === api.getCurrentUserID())) return;

    warnings[senderID] = (warnings[senderID] || 0) + 4;
    if (warnings[senderID] === 5) {
      api.sendMessage("🚫 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗋𝖾𝖼𝖾𝗂𝗏𝖾𝖽 5 𝗐𝖺𝗋𝗇𝗂𝗇𝗀𝗌. 𝖸𝗈𝗎 𝖺𝗋𝖾 𝗇𝗈𝗐 𝗄𝗂𝖼𝗄𝖾𝖽 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉", threadID, messageID);
      api.removeUserFromGroup(senderID, threadID);
    } else {
      api.sendMessage(`⚠️ | 𝖫𝖺𝗌𝗍 𝗐𝖺𝗋𝗇𝗂𝗇𝗀 𝗌𝖾𝗇𝗌𝖾𝗂! 𝗒𝗈𝗎𝗋 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖽𝖾𝗍𝖾𝖼𝗍𝖾𝖽 𝗍𝗈 𝖼𝗈𝗇𝗍𝖺𝗂𝗇 𝗍𝗁𝖾 𝗈𝖿𝖿𝖾𝗇𝗌𝗂𝗏𝖾 𝗐𝗈𝗋𝖽 《${messageContent}》 𝖨𝖿 𝗒𝗈𝗎 𝖼𝗈𝗇𝗍𝗂𝗇𝗎𝖾 𝗍𝗈 𝗎𝗌𝖾 𝗌𝗎𝖼𝗁 𝗅𝖺𝗇𝗀𝗎𝖺𝗀𝖾, 𝗒𝗈𝗎 𝗐𝗂𝗅𝗅 𝖻𝖾 𝖺𝗎𝗍𝗈𝗆𝖺𝗍𝗂𝖼𝖺𝗅𝗅𝗒 𝗄𝗂𝖼𝗄𝖾𝖽`, threadID, messageID);
    }
  }
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  if (!args[0]) return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗌𝗉𝖾𝖼𝗂𝖿𝗒 𝖺𝗇 𝖺𝖼𝗍𝗂𝗈𝗇 (𝖺𝖽𝖽, 𝗋𝖾𝗆𝗈𝗏𝖾, 𝗅𝗂𝗌𝗍, 𝗈𝗇, 𝗈𝖿𝖿, 𝗎𝗇𝗐𝖺𝗋𝗇) 𝖺𝗇𝖽 𝗋𝖾𝗅𝖾𝗏𝖺𝗇𝗍 𝖽𝖺𝗍𝖺.", threadID, messageID);

  const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(idInfo => idInfo.id === api.getCurrentUserID());
  if (!isAdmin) return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨 𝗇𝖾𝖾𝖽 𝖺𝖽𝗆𝗂𝗇 𝗉𝗋𝗂𝗏𝗂𝗅𝖾𝗀𝖾 𝗂𝗇 𝗌𝗁𝗈𝗋𝗍 𝗒𝗈𝗎 𝗇𝖾𝖾𝖽 𝗍𝗈 𝖺𝖽𝖽 𝗆𝖾 𝖺𝗌 𝖺𝖽𝗆𝗂𝗇 𝗍𝗈 𝗒𝗈𝗎𝗋 𝗀𝗋𝗈𝗎𝗉 𝖼𝗁𝖺𝗍", threadID, messageID);

  const action = args[0];
  const word = args.slice(1).join(' ');
  loadBannedWords(threadID);

  switch (action) {
    case 'add':
      bannedWords[threadID].push(word);
      fs.writeFileSync(path.join(__dirname, `../commands/badwords/badwordthread2${threadID}.json`), JSON.stringify(bannedWords[threadID]), "utf8");
      return api.sendMessage(`✅ |  𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖺𝖽𝖽𝖾𝖽 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 《${word}》 𝗍𝗈 𝗍𝗁𝖾 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌 𝗅𝗂𝗌𝗍.`, threadID);
    case 'remove':
      const index = bannedWords[threadID].indexOf(word);
      if (index !== -1) {
        bannedWords[threadID].splice(index, 1);
        fs.writeFileSync(path.join(__dirname, `../commands/badwords/badwordthread2${threadID}.json`), JSON.stringify(bannedWords[threadID]), "utf8");
        return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗋𝖾𝗆𝗈𝗏𝖾𝖽 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 《${word}》 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌 𝗅𝗂𝗌𝗍.`, threadID);
      } else {
        return api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 《${word}》 𝗂𝗌 𝗇𝗈𝗍 𝖿𝗈𝗎𝗇𝖽 𝗂𝗇 𝗍𝗁𝖾 𝗅𝗂𝗌𝗍.`, threadID);
      }
    case 'list':
      return api.sendMessage(`📝 | 𝗕𝗮𝗱𝘄𝗼𝗿𝗱𝘀 𝗟𝗶𝘀𝘁:\n\n➥ ${bannedWords[threadID].join(', ')}.`, threadID);
    case 'on':
      badWordsActive[threadID] = true;
      fs.writeFileSync(saveFile, JSON.stringify(badWordsActive), "utf8");
      return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒.`, threadID);
    case 'off':
      badWordsActive[threadID] = false;
      fs.writeFileSync(saveFile, JSON.stringify(badWordsActive), "utf8");
      return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖽𝖾𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒.`, threadID);
    case 'unwarn':
      const userID = args[1];
      if (!userID) return api.sendMessage("❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗆𝗂𝗌𝗌𝗂𝗇𝗀 𝗎𝗌𝖾𝗋 𝖨𝖣 𝖿𝗈𝗋 𝗎𝗇𝗐𝖺𝗋𝗇 𝗍𝗁𝖾 𝗆𝖾𝗆𝖻𝖾𝗋", threadID);

      warnings[userID] = 0;
      return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗎𝗌𝖾𝗋 𝗐𝖺𝗋𝗇𝗂𝗇𝗀𝗌 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗎𝗇𝗐𝖺𝗋𝗇𝖾𝖽 𝖿𝗈𝗋 𝖨𝖽: ${userID}`, threadID);
    default: 
      return api.sendMessage("❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖺𝗇 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖺𝖼𝗍𝗂𝗈𝗇. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗎𝗌𝖾 '𝖺𝖽𝖽', '𝗋𝖾𝗆𝗈𝗏𝖾', '𝗅𝗂𝗌𝗍', '𝗈𝗇', '𝗈𝖿𝖿' 𝗈𝗋 '𝗎𝗇𝗐𝖺𝗋𝗇'.", threadID);
  }
};