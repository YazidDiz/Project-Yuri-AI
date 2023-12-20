module.exports.config = {
  name: "palindrome",
  version: "1.0.0",
  description: "Réynél",
  description: "Check if a word or phrase is a palindrome.",
  commandCategory: "grammarfixer",
  usage: "[text paragraph]",
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
    api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂 ${userName}, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗍𝖾𝗑𝗍 𝗉𝖺𝗋𝖺𝗀𝗋𝖺𝗉𝗁 𝗍𝗈 𝖼𝗁𝖾𝖼𝗄 𝖿𝗈𝗋 𝗉𝖺𝗅𝗂𝗇𝖽𝗋𝗈𝗆𝖾𝗌.`, event.threadID, event.messageID);
    return;
  }

  const text = args.join(" ").toLowerCase();
  const words = text.split(/\W+/).filter(word => word.length > 1);

  const isPalindrome = word => {
    return word === word.split('').reverse().join('');
  };

  const palindromes = words.filter(isPalindrome);

  let response = `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂 ${userName}, 𝖧𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 𝗋𝖾𝗌𝗎𝗅𝗍:\n\n`;
  response += `𝗡𝗨𝗠𝗕𝗘𝗥 𝗢𝗙 𝗣𝗔𝗟𝗜𝗡𝗗𝗥𝗢𝗠𝗘𝗦: ${palindromes.length}\n\n`;

  if (palindromes.length > 0) {
    response += "𝗟𝗜𝗦𝗧 𝗢𝗙 𝗣𝗔𝗟𝗜𝗡𝗗𝗥𝗢𝗠𝗘𝗦\n";
    for (const palindrome of palindromes) {
      const formattedPalindrome = palindrome.charAt(0).toUpperCase() + palindrome.slice(1);
      response += `   ⌲ ${formattedPalindrome}\n`;
    }
  } else {
    response += "❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗉𝖺𝗅𝗂𝗇𝖽𝗋𝗈𝗆𝖾𝗌 𝖿𝗈𝗎𝗇𝖽 𝗂𝗇 𝗍𝗁𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾𝖽 𝗍𝖾𝗑𝗍";
  }

  api.sendMessage(response, event.threadID, event.messageID);
};
  