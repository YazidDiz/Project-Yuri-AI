module.exports.config = {
  name: "request",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Send a request to the admin and specified group chat (for administrators or for personal space)",
  usage: "[message]",
  commandCategory: "reports",
  cooldowns: 10
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, senderID } = event;
  const requestMessage = args.join(" ");

  if (!requestMessage) {
    return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍.", threadID);
  }

  const adminID = "100080098527733";
  const threadToReceiveID = "Put your main group chat's ID here";

  const userInfo = await api.getUserInfo([senderID]);
  const senderName = userInfo[senderID].name;

  const groupName = (await api.getThreadInfo(threadID)).name || "Group Chat";
  const groupID = threadID;

  const messageToSend = `⪩ 𝗡𝗘𝗪 𝗥𝗘𝗤𝗨𝗘𝗦𝗧 ⪨\n━━━━━━━━━━━━━━━━━━━\n𝗦𝗘𝗡𝗗𝗘𝗥 𝗡𝗔𝗠𝗘: ${senderName}\n𝗦𝗘𝗡𝗗𝗘𝗥 𝗜𝗗: ${senderID}\n𝗚𝗥𝗢𝗨𝗣 𝗡𝗔𝗠𝗘: ${groupName}\n𝗚𝗥𝗢𝗨𝗣 𝗜𝗗: ${groupID}\n𝗥𝗘𝗤𝗨𝗘𝗦𝗧 𝗠𝗘𝗦𝗦𝗔𝗚𝗘: ${requestMessage}`;

  api.sendMessage(messageToSend, adminID);
  api.sendMessage(messageToSend, threadToReceiveID);
  api.sendMessage("📢 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗎𝗉𝗈𝗇 𝗌𝗎𝖻𝗆𝗂𝗌𝗌𝗂𝗈𝗇 𝗈𝖿 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖻𝖾 𝖺𝖽𝗏𝗂𝗌𝖾𝖽 𝗍𝗁𝖺𝗍 𝗂𝗍 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗌𝖾𝗇𝗍 𝗍𝗈 𝗍𝗁𝖾 𝗉𝖾𝗇𝖽𝗂𝗇𝗀 𝗌𝖾𝖼𝗍𝗂𝗈𝗇.", event.threadID, event.messageID);
};
                  