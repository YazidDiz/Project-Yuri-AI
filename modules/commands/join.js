const chalk = require('chalk');
module.exports.config = {
    name: "join",
    version: "1.0.1",
    hasPermssion: 2,
    credits: "Clark",
    description: "Join the Bot boxes are in",
    commandCategory: "admin",
    usages: "[select number after the box]",
    cooldowns: 5
};
 module.exports.onLoad = () => {
  console.log(chalk.bold.hex("#00c300").bold("============ SUCCESFULLY LOADED THE JOIN COMMAND ============"));
  }
module.exports.handleReply = async function({ api, event, handleReply, Threads }) {
  var { threadID, messageID, senderID, body } = event;
  var { ID } = handleReply;
  console.log(ID)
  if (!body || !parseInt(body)) return api.sendMessage('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎𝗋 𝗌𝖾𝗅𝖾𝖼𝗍𝗂𝗈𝗇 𝗆𝗎𝗌𝗍 𝖻𝖾 𝖺 𝗇𝗎𝗆𝖻𝖾𝗋.', threadID, messageID);
  if ((parseInt(body) - 1) > ID.length) return api.sendMessage("❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎𝗋 𝗉𝗂𝖼𝗄 𝗂𝗌 𝗇𝗈𝗍 𝗈𝗇 𝗍𝗁𝖾 𝗅𝗂𝗌𝗍.", threadID, messageID);
  try {
    var threadInfo = await Threads.getInfo(ID[body - 1]);
    var { participantIDs, approvalMode, adminIDs } = threadInfo;
    if (participantIDs.includes(senderID)) return api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋,  𝗒𝗈𝗎 𝖺𝗋𝖾 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 𝗂𝗇 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉.`, threadID, messageID);
    api.addUserToGroup(senderID, ID[body - 1]);
    if (approvalMode == true && !adminIDs.some(item => item.id) == api.getCurrentUserID()) return api.sendMessage("✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨 𝖺𝖽𝖽𝖾𝖽 𝗒𝗈𝗎 𝗍𝗈 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉'𝗌 𝖺𝗉𝗉𝗋𝗈𝗏𝖺𝗅 𝗅𝗂𝗌𝗍... 𝖢𝗎𝗌𝗍𝗈𝗆 𝗒𝗈𝗎𝗋𝗌𝖾𝗅𝖿.", threadID, messageID);
    else return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, ⟬𝗥.𝗖.𝗕.⟭ ${global.config.BOTNAME} 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖺𝖽𝖽𝖾𝖽 𝗒𝗈𝗎 𝗍𝗈 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 《${threadInfo.threadName}》 𝖺𝗅𝗋𝖾𝖺𝖽𝗒.\n━━━━━━━━━━━━━━━━━━━\n ℹ️ | 𝖪𝗂𝗇𝖽𝗅𝗒 𝖼𝗁𝖾𝖼𝗄 𝗂𝗇 𝗍𝗁𝖾 𝗐𝖺𝗂𝗍𝗂𝗇𝗀 𝗈𝗋 𝗌𝗉𝖺𝗆 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗌𝖾𝖼𝗍𝗂𝗈𝗇 𝗂𝖿 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝗌𝖾𝖾 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉.`, threadID, messageID);
  } catch (error) {
    return api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖨'𝗆 𝗐𝗋𝗈𝗇𝗀 𝗌𝗈 𝖨 𝖼𝖺𝗇'𝗍 𝖺𝖽𝖽 𝗒𝗈𝗎 𝗍𝗈 𝗍𝗁𝖺𝗍 𝗀𝗋𝗈𝗎𝗉. 🥺\n━━━━━━━━━━━━━━━━━━━\n❎ | 𝖤𝗋𝗋𝗈𝗋 𝖺𝗍:\n${error}`, threadID, messageID);
  }
}

module.exports.run = async function({ api, event, Threads }) {
  var { threadID, messageID, senderID } = event;
  var msg = `━━━━━━━━━━━━━━━━━━━\n❖《《Ｒ.Ｃ.Ｂ. ＹＵＲＩ》》❖\n━━━━━━━━━━━━━━━━━━━\n《《《  𝗚𝗥𝗢𝗨𝗣 𝗟𝗜𝗦𝗧𝗦  》》》 \n━━━━━━━━━━━━━━━━━━━\n`, number = 0, ID = [];
  var allThreads = await Threads.getAll();
  for (var i of allThreads) {
    number++;
    msg += `《《《《《   ${number}   》》》》》\n${i.threadInfo.threadName}\n━━━━━━━━━━━━━━━━━━━\n`;
    ID.push(i.threadID)
  }
  msg += `\nℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝗇𝗎𝗆𝖻𝖾𝗋 𝖼𝗈𝗋𝗋𝖾𝗌𝗉𝗈𝗇𝖽𝗂𝗇𝗀 𝗍𝗈 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖾𝗇𝗍𝖾𝗋.`
  return api.sendMessage(msg, threadID, (error, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      author: senderID,
     messageID: info.messageID,
      ID: ID      
    })
  }, messageID)
}
