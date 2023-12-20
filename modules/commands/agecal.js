module.exports.config = {
  name: "agecal",
  version: "1.0.0",
  credits: "Réynél",
  description: "Calculate your age or someone's age based on birthdate.",
  commandCategory: "calculate",
  usage: "[birthdate]",
  cooldowns: 5
};
 
module.exports.run = async ({ api, event, args }) => {
  const { threadID, senderID } = event;
 
  const getUserInfo = async (api, userID) => {
    try {
      const userInfo = await api.getUserInfo(userID);
      return userInfo[userID].name;
    } catch (error) {
      console.error(`Error fetching user info: ${error}`);
      return "";
    }
  };
 
  const userName = await getUserInfo(api, senderID);
 
  if (!args[0]) {
    api.sendMessage(`👋 | 𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂 ${userName}, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖽𝗈𝗇'𝗍 𝖿𝗈𝗋𝗀𝖾𝗍 𝗍𝗈 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝖻𝗂𝗋𝗍𝗁𝖽𝖺𝗍𝖾 𝗂𝗇 𝗍𝗁𝖾 𝖿𝗈𝗋𝗆𝖺𝗍 《𝖸𝖸𝖸𝖸-𝖬𝖬-𝖣𝖣》`, event.threadID, event.messageID);
    return;
  }
 
  const birthdateString = args[0];
  const birthdate = new Date(birthdateString);
 
  if (isNaN(birthdate.getTime())) {
    api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂 ${userName}, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖺𝗇 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖻𝗂𝗋𝗍𝗁𝖽𝖺𝗍𝖾 𝖿𝗈𝗋𝗆𝖺𝗍. 𝗉𝗅𝖾𝖺𝗌𝖾 𝗎𝗌𝖾 𝗍𝗁𝖾 𝖿𝗈𝗋𝗆𝖺𝗍 《𝖸𝖸𝖸𝖸-𝖬𝖬-𝖣𝖣》`, event.threadID, event.messageID);
    return;
  }
 
  const now = new Date();
  const ageInMilliseconds = now - birthdate;
  const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000);
 
  const formattedAge = ageInYears.toFixed(2);
 
  api.sendMessage(`👋 | 𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂 ${userName}, 𝗍𝗁𝖾 𝖼𝖺𝗅𝖼𝗎𝗅𝗌𝗍𝖾𝖽 𝖺𝗀𝖾 𝖻𝖺𝗌𝖾𝖽 𝗈𝗇 𝗍𝗁𝖾 𝖻𝗂𝗋𝗍𝗁𝖽𝖺𝗍𝖾 ${birthdateString} 𝗂𝗌 𝖺𝗉𝗉𝗋𝗈𝗑𝗂𝗆𝖺𝗍𝖾𝗅𝗒 ${formattedAge} 𝗒𝖾𝖺𝗋𝗌.`, event.threadID, event.messageID);
};