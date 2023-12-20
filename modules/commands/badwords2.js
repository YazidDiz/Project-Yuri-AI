const path = require('path');
const fs = require('fs');

let badWordsActive = {}, bannedWords = {}, warnings = {};
const saveFile = path.join(__dirname, '../commands/badwords/badwordsActivev2.json');

if (fs.existsSync(saveFile)) {
  const words = JSON.parse(fs.readFileSync(saveFile, "utf8"));
  badWordsActive = words;
}

const saveWarnings = path.join(__dirname, '../commands/badwords/warningsv2.json');

if (fs.existsSync(saveWarnings)) {
  const warningsData = JSON.parse(fs.readFileSync(saveWarnings, "utf8"));
  warnings = warningsData;
}

const saveWarningsCount = path.join(__dirname, '../commands/badwords/warningsCountv2.json');
let warningsCount = {};
if (fs.existsSync(saveWarningsCount)) {
  const warningsCountData = JSON.parse(fs.readFileSync(saveWarningsCount, "utf8"));
  warningsCount = warningsCountData;
}

const loadBannedWords = threadID => {
  const wordFile = path.join(__dirname, `../commands/badwords/badwordthread/${threadID}.json`);
  if (fs.existsSync(wordFile)) {
    const words = JSON.parse(fs.readFileSync(wordFile, "utf8"));
    bannedWords[threadID] = words;
  } else {
    bannedWords[threadID] = [];
  }
}
async function getUserName(api, senderID) {
  try {
    const userInfo = await api.getUserInfo(senderID);
    return userInfo[senderID]?.name || "User";
  } catch (error) {
    console.log(error);
    return "User";
  }
};

module.exports.config = {
  name: "badwordsv2",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "Réynél",
  description: "Manage and enforce banned words",
  commandCategory: "admin",
  usages: "add [word] | remove [word] | list | on | off | unwarn [userID]",
  cooldowns: 5,
}

module.exports.handleEvent = async ({ api, event, isAdmin }) => {
  const { threadID, messageID, senderID, body } = event;
  loadBannedWords(threadID);
  if (!badWordsActive[threadID]) return;
  const adminUserIds = (await api.getThreadInfo(threadID)).adminIDs.map(i => i.id);
  if (adminUserIds.includes(senderID)) return; 
  const messageContent = body.toLowerCase();
  const hasBannedWord = bannedWords[threadID].some(bannedWord => messageContent.includes(bannedWord.toLowerCase()));

  if (hasBannedWord) {
    const threadInfo = await api.getThreadInfo(threadID);
    if (!threadInfo.adminIDs.some(item => item.id === api.getCurrentUserID())) return;

    warningsCount[senderID] = (warningsCount[senderID] || 0) + 1;
    fs.writeFileSync(saveWarningsCount, JSON.stringify(warningsCount), "utf8");
    if (warningsCount[senderID] === 2) {
      api.sendMessage(`⚠️ | ${await getUserName(api, event.senderID)} 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗍𝗐𝗈 𝖺𝗍𝗍𝖾𝗆𝗉𝗍𝗌 𝗍𝗈 𝗏𝗂𝗈𝗅𝖺𝗍𝖾 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌. 𝖸𝗈𝗎 𝖺𝗋𝖾 𝗄𝗂𝖼𝗄𝖾𝖽 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉!`, threadID, messageID);
      api.removeUserFromGroup(senderID, threadID);
    } else {
      api.sendMessage(`⚠️ | 𝗟𝗮𝘀𝘁 𝗪𝗮𝗿𝗻𝗶𝗻𝗴! ${await getUserName(api, event.senderID)} 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎𝗋 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖽𝖾𝗍𝖾𝖼𝗍𝖾𝖽 𝗍𝗈 𝖼𝗈𝗇𝗍𝖺𝗂𝗇 𝗍𝗁𝖾 𝗈𝖿𝖿𝖾𝗇𝗌𝗂𝗏𝖾 𝗐𝗈𝗋𝖽 《${messageContent}》 𝖨𝖿 𝗒𝗈𝗎 𝖼𝗈𝗇𝗍𝗂𝗇𝗎𝖾 𝗍𝗈 𝗎𝗌𝖾 𝗌𝗎𝖼𝗁 𝗅𝖺𝗇𝗀𝗎𝖺𝗀𝖾, 𝗒𝗈𝗎 𝗐𝗂𝗅𝗅 𝖻𝖾 𝖺𝗎𝗍𝗈𝗆𝖺𝗍𝗂𝖼𝖺𝗅𝗅𝗒 𝗄𝗂𝖼𝗄𝖾𝖽`, threadID, messageID);
    }
  }
};

module.exports.run = async function({ api, event, args, message }) {
  const { threadID, messageID, mentions } = event;
  if (!args[0]) return api.sendMessage("📪 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗌𝗉𝖾𝖼𝗂𝖿𝗒 𝖺𝗇 𝖺𝖼𝗍𝗂𝗈𝗇 (𝖺𝖽𝖽, 𝗋𝖾𝗆𝗈𝗏𝖾, 𝗅𝗂𝗌𝗍, 𝗈𝗇, 𝗈𝖿𝖿 𝗈𝗋 𝗎𝗇𝗐𝖺𝗋𝗇)", threadID, messageID);

  const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(idInfo => idInfo.id === api.getCurrentUserID());
  if (!isAdmin) return api.sendMessage("🛡️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨 𝖭𝖾𝖾𝖽 𝖠𝖽𝗆𝗂𝗇 𝖯𝗋𝗂𝗏𝗂𝗅𝖾𝗀𝖾 𝖨𝗇 𝗌𝗁𝗈𝗋𝗍 𝗒𝗈𝗎 𝗇𝖾𝖾𝖽 𝗍𝗈 𝗉𝗋𝗈𝗆𝗈𝗍𝖾𝖽 𝗆𝖾 𝖺𝗌 𝖺 𝖺𝖽𝗆𝗂𝗇 𝗈𝖿 𝗀𝗋𝗈𝗎𝗉 𝖼𝗁𝖺𝗍!", threadID, messageID);

  const action = args[0];
  const word = args.slice(1).join(' ');
  loadBannedWords(threadID);

  switch (action) {
    case 'add':
      bannedWords[threadID].push(word.toLowerCase());
      fs.writeFileSync(path.join(__dirname, `../commands/badwords/badwordthread/${threadID}.json`), JSON.stringify(bannedWords[threadID]), "utf8");
      return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 《${word}》 𝖺𝖽𝖽𝖾𝖽 𝗍𝗈 𝗍𝗁𝖾 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌 𝗅𝗂𝗌𝗍.`, threadID);
    case 'remove':
      const index = bannedWords[threadID].indexOf(word.toLowerCase());
      if (index !== -1) {
        bannedWords[threadID].splice(index, 1);
        fs.writeFileSync(path.join(__dirname, `../commands/badwords/badwordthread/${threadID}.json`), JSON.stringify(bannedWords[threadID]), "utf8");
        return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 《${word}》 𝗋𝖾𝗆𝗈𝗏𝖾𝖽 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌 𝗅𝗂𝗌𝗍.`, threadID);
      } else {
        return api.sendMessage(`❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 《${word}》 𝗇𝗈𝗍 𝖿𝗈𝗎𝗇𝖽.`, threadID);
      }
    case 'list':
      return api.sendMessage(`📝 | 𝗕𝗮𝗱𝘄𝗼𝗿𝗱𝘀 𝗟𝗶𝘀𝘁: \n${bannedWords[threadID].join(', ')}.`, threadID);
    case 'on':
      badWordsActive[threadID] = true;
      fs.writeFileSync(saveFile, JSON.stringify(badWordsActive), "utf8");
      return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝖾𝖽.`, threadID);
    case 'off':
      badWordsActive[threadID] = false;
      fs.writeFileSync(saveFile, JSON.stringify(badWordsActive), "utf8");
      return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖻𝖺𝖽𝗐𝗈𝗋𝖽𝗌 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖽𝖾𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝖾𝖽.`, threadID);
    case 'unwarn':
      let userIdsToUnwarn = [];
      if (args[1]) userIdsToUnwarn.push(args[1]);
      else if (mentions && Object.keys(mentions).length > 0) userIdsToUnwarn = userIdsToUnwarn.concat(Object.keys(mentions)); 
var id = Object.keys(event.mentions)[1] || event.senderID;
      for (const userID of userIdsToUnwarn) {
        warningsCount[userID] = 0;
        fs.writeFileSync(saveWarningsCount, JSON.stringify(warningsCount), "utf8");
        api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 《${id}》 𝗐𝖺𝗋𝗇𝗂𝗇𝗀𝗌 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗎𝗇𝗐𝖺𝗋𝗇𝖾𝖽!`, threadID);
      }
      return;
    default:
      return api.sendMessage("📪 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖼𝗈𝗆𝗆𝖺𝗇𝖽. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗎𝗌𝖾 '𝖺𝖽𝖽', '𝗋𝖾𝗆𝗈𝗏𝖾', '𝗅𝗂𝗌𝗍', '𝗈𝗇', '𝗈𝖿𝖿' 𝗈𝗋 '𝗎𝗇𝗐𝖺𝗋𝗇'.", threadID);
  }
};