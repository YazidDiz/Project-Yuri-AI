module.exports.config = {
  name: "stalk4",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Get User Information.",
  commandCategory: "stalk",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  let { threadID, senderID, messageID } = event;

  const getUserInfo = async (targetID) => {
    try {
      const threadInfo = await api.getThreadInfo(threadID);
      const userInfo = await api.getUserInfo(targetID);

      const userName = userInfo[targetID].name || "𝖭𝖺𝗆𝖾 𝗇𝗈𝗍 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾";
      const uid = targetID;
      const gender = userInfo[targetID].gender || "𝖦𝖾𝗇𝖽𝖾𝗋 𝗇𝗈𝗍 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾";
      const birthday = userInfo[targetID].birthday || "𝖡𝗂𝗋𝗍𝗁𝖽𝖺𝗒 𝗇𝗈𝗍 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾";

      // Get user creation timestamp and format as date & time
      const creationTimestamp = userInfo[targetID].creationTimestamp || 0;
      const creationDate = new Date(creationTimestamp * 1000);
      const formattedCreationDate = creationDate.toLocaleString();

      // Construct Facebook profile link
      const fbLink = `https://www.facebook.com/profile.php?id=${uid}`;

      const userInfoMessage = `╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n  ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n
𝗨𝘀𝗲𝗿 𝗡𝗮𝗺𝗲: ${userName}
𝗨𝗜𝗗: ${uid}
𝗚𝗲𝗻𝗱𝗲𝗿: ${gender}
𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆: ${birthday}
𝗔𝗰𝗰𝗼𝘂𝗻𝘁 𝗖𝗿𝗲𝗮𝘁𝗲𝗱 𝗗𝗮𝘁𝗲 & 𝗧𝗶𝗺𝗲: ${formattedCreationDate}
𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗟𝗶𝗻𝗸: ${fbLink}`;

      api.sendMessage(userInfoMessage, threadID, messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗎𝗌𝖾𝗋 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.", threadID, messageID);
    }
  };

  if (!args[0]) {
    // If no UID is provided, use the sender's UID
    getUserInfo(senderID);
  } else if (args[0].indexOf("@") !== -1) {
    // If the message mentions a user, extract UID from mentions
    const mentionedUID = Object.keys(event.mentions)[0];
    if (mentionedUID) {
      getUserInfo(mentionedUID);
    }
  } else {
    api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗎𝗌𝖺𝗀𝖾. 𝖴𝗌𝖾 `𝖲𝗍𝖺𝗅𝗄` 𝗈𝗋 `𝗌𝗍𝖺𝗅𝗄 @𝗆𝖾𝗇𝗍𝗂𝗈𝗇`.", threadID, messageID);
  }
};