module.exports.config = {
  name: "calculator",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Perform basic scientific calculations and unit conversions",
  commandCategory: "calculate",
  usages: "[operation] [arguments]",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, senderID } = event;

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

  if (args.length < 2) {
    api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂 ${userName}, 𝗍𝗁𝖾 𝖼𝗈𝗋𝗋𝖾𝖼𝗍 𝗎𝗌𝖺𝗀𝖾 𝗂𝗌: ${global.config.PREFIX}𝖢𝖺𝗅𝖼𝗎𝗅𝖺𝗍𝗈𝗋 [𝗈𝗉𝖾𝗋𝖺𝗍𝗂𝗈𝗇] [𝖺𝗋𝗀𝗎𝗆𝖾𝗇𝗍𝗌]`, threadID, messageID);
    return;
  }

  const operation = args[0].toLowerCase();
  const arguments = args.slice(1).map(arg => parseFloat(arg));

  let result = null;

  switch (operation) {
    case "add":
      result = arguments.reduce((acc, val) => acc + val, 0);
      break;
    case "subtract":
      result = arguments.reduce((acc, val) => acc - val);
      break;
    case "multiply":
      result = arguments.reduce((acc, val) => acc * val, 1);
      break;
    case "divide":
      result = arguments.reduce((acc, val) => acc / val);
      break;
    case "power":
      result = Math.pow(arguments[0], arguments[1]);
      break;
    case "mass":
      // ito ay kilograms to pounds
      result = arguments[0] * 2.20462;
      break;
    case "temperature":
      // celsius to fahrenheit
      result = (arguments[0] * 9/5) + 32;
      break;
    case "time":
      // seconds to minutes
      result = arguments[0] / 60;
      break;
    case "speed":
      // meters per second to kilometers per hour
      result = arguments[0] * 3.6;
      break;
    default:
      api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂 ${userName}, 𝗍𝗁𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾𝖽 𝗈𝗉𝖾𝗋𝖺𝗍𝗂𝗈𝗇 𝗂𝗌 𝗇𝗈𝗍 𝗌𝗎𝗉𝗉𝗈𝗋𝗍𝖾𝖽.\n\n𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘 𝗢𝗣𝗘𝗥𝗔𝗧𝗜𝗢𝗡:\n\n⓵ 𝖠𝖽𝖽\n⓶ 𝖲𝗎𝖻𝗍𝗋𝖺𝖼𝗍\n➂ 𝖬𝗎𝗅𝗍𝗂𝗉𝗅𝗒\n➃ 𝖣𝗂𝗏𝗂𝖽𝖾\n➄ 𝖯𝗈𝗐𝖾𝗋\n➅ 𝖬𝖺𝗌𝗌\n➆ 𝖳𝖾𝗆𝗉𝖾𝗋𝖺𝗍𝗎𝗋𝖾\n➇ 𝖳𝗂𝗆𝖾\n➈ 𝖲𝗉𝖾𝖾𝖽\n╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n⟬𝗥.𝗖.𝗕.⟭   𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯`, threadID, messageID);
      return;
  }

  const message = `🧮 | 𝗖𝗔𝗟𝗖𝗨𝗟𝗔𝗧𝗢𝗥\n\n𝖲𝖾𝗇𝗌𝖾𝗂 ${userName}, 𝗍𝗁𝖾 𝗋𝖾𝗌𝗎𝗅𝗍 𝗈𝖿 𝗍𝗁𝖾 ${operation} 𝗈𝗉𝖾𝗋𝖺𝗍𝗂𝗈𝗇 𝗂𝗌: ${result}`;

  api.sendMessage(message, threadID, messageID);
};
