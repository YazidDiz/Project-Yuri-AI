const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "textpro",
  version: "1.0",
  hasPermssion: 0,
  credits: `Réynél`, 
  description: "Make your own logo using textpro",
  commandCategory: "logo",
  usages: "textpro list or textpro list (page number) or textpro (logo) (text)",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args, Users }) {
  let { messageID, senderID, threadID } = event;

  if (args.length >= 2 && args[0].toLowerCase() === "list") {
    let page = parseInt(args[1]);
    switch (page) {
      case 1:
        return api.sendMessage(
          `📋 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 𝗅𝗈𝗀𝗈 𝗅𝗂𝗌𝗍 - 𝗣𝗮𝗴𝗲 𝟭:\n𝟣. 𝖡𝗅𝗎𝖾\n𝟤. 𝖯𝗂𝗇𝗄 𝖢𝖺𝗇𝖽𝗒\n𝟥. 𝖮𝗋𝖺𝗇𝗀𝖾\n𝟦. 𝖡𝗋𝗈𝗇𝗓𝖾\n𝟧. 𝖲𝗂𝗅𝗏𝖾𝗋\n𝟨. 𝖯𝗎𝗋𝗉𝗅𝖾\n𝟩. 𝖡𝗅𝗎𝖾𝟤\n𝟪. 𝖦𝗈𝗅𝖽𝖾𝗇\n𝟫. 𝖧𝗈𝗍\n𝟣𝟢. 𝖯𝗎𝗋𝗉𝗅𝖾𝟤\n𝟣𝟣. 𝖱𝖺𝗂𝗇𝖻𝗈𝗐\n𝟣𝟤. 𝖫𝗂𝗀𝗁𝗍\n𝟣𝟥. 𝖶𝗈𝗈𝖽\n𝟣𝟦. 𝖱𝖾𝖽\n𝟣𝟧. 𝖡𝗂𝗌𝖼𝗎𝗂𝗍\n𝟣𝟨. 𝖠𝖻𝗌𝗍𝗋𝖺𝗀𝗈𝗅𝖽\n𝟣𝟩. 𝖬𝖾𝗍𝖺𝗅\n𝟣𝟪. 𝖥𝗋𝗎𝗂𝗍\n𝟣𝟫. 𝖥𝗋𝗈𝗓𝖾𝗇\n𝟤𝟢. 𝖬𝖺𝗋𝖻𝗅𝖾\n𝟤𝟣. 𝖡𝗅𝗈𝖽𝗎𝗌\n𝟤𝟤. 𝖲𝗆𝗈𝗄𝖾\n𝟤𝟥. 𝖮𝗋𝖺𝗇𝗀𝖾𝟤\n𝟤𝟦. 𝖢𝗁𝗋𝗂𝗌𝗍𝗆𝖺𝗌\n𝟤𝟧. 𝖡𝗋𝖾𝖺𝗄𝗐𝖺𝗅𝗅\n𝟤𝟨. 𝖱𝖺𝗂𝗇\n𝟤𝟩. 𝖥𝗈𝗇𝗍𝗍𝖾𝗑𝗍\n𝟤𝟪. 𝖦𝗋𝖾𝖾𝗇𝖭𝖾𝗈𝗇\n𝟤𝟫. 𝖢𝗈𝗅𝗈𝗎𝗋𝖡𝗅𝗎𝗋\n𝟥𝟢. 𝖣𝖾𝗆𝖺𝗇𝖽\n\n𝗣𝗔𝗚𝗘 𝟭 - 𝟯`,
          threadID,
          messageID
        );
      case 2:
        return api.sendMessage(
          `📋 | 𝖫𝗈𝗀𝗈 𝗅𝗂𝗌𝗍 - 𝗣𝗮𝗴𝗲 𝟮:\n𝟥𝟣. 𝖱𝗈𝖺𝖽\n𝟥𝟤. 𝖭𝖾𝗈𝗇\n𝟥𝟥. 𝟥𝖣𝖡𝗈𝗑\n𝟥𝟦. 𝖭𝗂𝗀𝗁𝗍𝖬𝗈𝗈𝗇\n𝟥𝟧. 𝖭𝖾𝗈𝗇𝟤\n𝟥𝟨. 𝖡𝗅𝗈𝗈𝖽\n𝟥𝟩. 𝖧𝖺𝖼𝗄\n𝟥𝟪. 𝖡𝗋𝖾𝖺𝖽\n𝟥𝟫. 𝖥𝗂𝗌𝗁\n𝟦𝟢. 𝖢𝗁𝗈𝖼𝗈𝗅𝖺𝗍𝖾\n𝟦𝟣. 𝖢𝗈𝗅𝗈𝗎𝗋𝖦𝗅𝖺𝗌𝗌\n𝟦𝟤. 𝖯𝗎𝗋𝗉𝗅𝖾𝖦𝗅𝖺𝗌𝗌\n𝟦𝟥. 𝖩𝖾𝗐𝖾𝗅𝗋𝗒\n𝟦𝟦. 𝖩𝖾𝗐𝖾𝗅𝗋𝗒𝟤\n𝟦𝟧. 𝖦𝗋𝖾𝖾𝗇𝖩𝖺𝗅\n𝟦𝟨. 𝖱𝖺𝗂𝗇𝖻𝗈𝗐𝟤\n𝟦𝟩. 𝖱𝗈𝖻𝗈𝗍\n𝟦𝟪. 𝖢𝖺𝗉𝗍𝖺𝗂𝗇\n𝟧𝟢. 𝖯𝗎𝗋𝗉𝗅𝖾𝖲𝗁𝗂𝗇𝗒\n𝟧𝟣. 𝖡𝗅𝗎𝖾𝖦𝗅𝖺𝗌𝗌\n𝟧𝟤. 𝖮𝗋𝖺𝗇𝗀𝖾𝖦𝗅𝖺𝗌𝗌\n𝟧𝟥. 𝖸𝖾𝗅𝗅𝗈𝗐𝖦𝗅𝖺𝗌𝗌\n𝟧𝟦. 𝖫𝖺𝗏𝖺\n𝟧𝟧. 𝖱𝗈𝖼𝗄\n𝟧𝟨. 𝖯𝖾𝗋𝗂𝖽𝗈𝗍\n𝟧𝟩. 𝖣𝖾𝖼𝗈𝗋𝖺𝗍𝖾\n𝟧𝟪. 𝖣𝖾𝗇𝗂𝗆\n𝟧𝟫. 𝖲𝗍𝖾𝖾𝗅\n𝟨𝟢. 𝖦𝗈𝗅𝖽𝖡𝖺𝗅𝗅𝗈𝗈𝗇\n𝟨𝟣. 𝖦𝗋𝖾𝖾𝗇𝖡𝖺𝗅𝗅𝗈𝗈𝗇\n\n𝗣𝗔𝗚𝗘 𝟮 - 𝟯`,
          threadID,
          messageID
        );
      case 3:
        return api.sendMessage(
          `📋 | 𝖫𝗈𝗀𝗈 𝗅𝗂𝗌𝗍 - 𝗣𝗮𝗴𝗲 𝟯:\n𝟨𝟤. 𝖯𝗎𝗋𝗉𝗅𝖾𝖡𝖺𝗅𝗅𝗈𝗈𝗇\n𝟨𝟥. 𝖲𝗄𝖾𝗅𝖾𝗍𝗈𝗇\n𝟨𝟦. 𝖥𝗂𝗋𝖾𝗐𝗈𝗋𝗄\n𝟨𝟧. 𝖭𝖺𝗍𝗎𝗋𝖺𝗅\n𝟨𝟨. 𝖶𝗂𝖼𝗄𝖾𝗋\n𝟨𝟩. 𝖩𝗈𝗄𝖾𝗋\n𝟨𝟪. 𝖦𝖺𝗅𝖺𝗑𝗒\n𝟨𝟫. 𝖫𝗂𝗈𝗇\n𝟩𝟢. 𝖬𝖾𝗍𝖺𝗅\n𝟩𝟣. 𝖧𝖺𝗅𝗅𝗈𝗐𝖾𝖾𝗇\n𝟩𝟤. 𝖡𝗅𝗈𝗈𝖽\n𝟩𝟥. 𝖷𝗆𝖺𝗌\n𝟩𝟦. 𝟥𝖣-𝖬𝖾𝗍𝖺𝗅\n𝟩𝟧. 𝖬𝖾𝗍𝖺𝗅𝖦𝗈𝗅𝖽\n𝟩𝟨. 𝖬𝖾𝗍𝖺𝗅𝖱𝗈𝗌𝖾\n𝟩𝟩. 𝖬𝖾𝗍𝖺𝗅𝖲𝗂𝗅𝗏𝖾𝗋\n𝟩𝟪. 𝖭𝖾𝗐𝖸𝖾𝖺𝗋\n𝟩𝟫. 𝖸𝖾𝖺𝗋𝖢𝖺𝗋𝖽𝗌\n𝟪𝟢. 𝖭𝖾𝗈𝗇𝖳𝖾𝗑𝗍\n𝟪𝟣. 𝖣𝖾𝗅𝗎𝗑𝖦𝗈𝗅𝖽\n𝟪𝟤. 𝖦𝗅𝗈𝗌𝗌𝗒-𝖢𝖺𝗋𝖻𝗈𝗇\n𝟪𝟥. 𝖧𝗈𝗅𝗈𝗀𝗋𝖺𝗉𝗁𝗂𝖼\n𝟪𝟦. 𝖬𝗂𝗇𝗂𝗈𝗇\n𝟪𝟧. 𝖲𝗍𝗒𝗅𝖾-𝖳𝖾𝗑𝗍\n𝟪𝟨. 𝖭𝖾𝗈𝗇𝖫𝗂𝗀𝗁𝗍\n𝟪𝟩. 𝖬𝖾𝗍𝖺𝗅-𝖣𝖺𝗋𝗄-𝖦𝗈𝗅𝖽\n𝟪𝟪. 𝟥𝖣-𝖦𝗅𝗎𝖾\n𝟪𝟫. 𝖲𝖺𝗇𝖽𝖶𝗋𝗂𝗍𝗂𝗇𝗀\n𝟫𝟢. 𝖲𝖺𝗇𝖽-𝖤𝗇𝗀𝗋𝖺𝗏𝖾𝖽\n𝟫𝟣. 𝖲𝖺𝗇𝖽𝖶𝗋𝗂𝗍𝗂𝗇𝗀𝟤\n𝟫𝟤. 𝖶𝗋𝗂𝗍𝖾-𝖨𝗇-𝖲𝖺𝗇𝖽\n𝟫𝟥. 𝖢𝗅𝗈𝗎𝖽\n𝟫𝟦. 𝖢𝗁𝗋𝗂𝗌𝗍𝗆𝖺𝗌-𝖧𝗈𝗅𝗂𝖽𝖺𝗒\n𝟫𝟧. 𝖦𝗋𝖺𝖿𝖿𝗂𝗍𝗂\n𝟫𝟨. 𝖴𝗇𝖽𝖾𝗋𝗐𝖺𝗍𝖾𝗋\n𝟫𝟩. 𝖶𝖺𝗍𝖾𝗋𝖼𝗈𝗅𝗈𝗋\n𝟫𝟪. 𝖯𝖺𝗉𝖾𝗋𝖼𝗎𝗍\n𝟫𝟫. 𝟥𝖣-𝖦𝗅𝗈𝗌𝗌𝗒-𝖬𝖾𝗍𝖺𝗅\n𝟣𝟢𝟢. 𝖦𝗋𝖺𝖽𝗂𝖾𝗇𝗍`,
          threadID,
          messageID
        );
      default:
        return api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗉𝖺𝗀𝖾 𝗇𝗎𝗆𝖻𝖾𝗋! 𝖯𝗅𝖾𝖺𝗌𝖾 𝗎𝗌𝖾 "𝗅𝗂𝗌𝗍 𝟣" 𝗈𝗋 "𝗅𝗂𝗌𝗍 𝟤" 𝗈𝗋 "𝗅𝗂𝗌𝗍 𝟥 𝗂𝗇 𝗍𝗁𝖾 𝗍𝗈𝗍𝖺𝗅 𝗈𝖿 𝗅𝗂𝗌𝗍 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 𝟣𝟢𝟢 𝗍𝖾𝗑𝗍𝗉𝗋𝗈 𝗅𝗈𝗀𝗈 𝖿𝗈𝗋 𝗇𝗈𝗐.".`, threadID, messageID);
    }
  }

  if (args.length < 2) {
    return api.sendMessage(
      `❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 invalid𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖿𝗈𝗋𝗆𝖺𝗍!\n\n𝗨𝘀𝗲:\n${global.config.PREFIX}𝗍𝖾𝗑𝗍𝗉𝗋𝗈 𝗅𝗂𝗌𝗍 𝗈𝗋 𝗍𝖾𝗑𝗍𝗉𝗋𝗈 𝗅𝗂𝗌𝗍 (𝗉𝖺𝗀𝖾 𝗇𝗎𝗆𝖻𝖾𝗋) 𝗈𝗋 𝗍𝖾𝗑𝗍𝗉𝗋𝗈 (𝗅𝗈𝗀𝗈) (𝗍𝖾𝗑𝗍)`,
      threadID,
      messageID
    );
  }
  
  let type = args[0].toLowerCase();
  let name = args.slice(1).join(" ");
  let pathImg = __dirname + `/cache/${type}_${name}.png`;
  let apiUrl, message;
  
  switch (type) {
    case "blue":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=1&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗕𝗟𝗨𝗘 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "pinkcandy":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=2&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗣𝗜𝗡𝗞 𝗖𝗔𝗡𝗗𝗬 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "orange":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=3&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗢𝗥𝗔𝗡𝗚𝗘 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "bronze":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=4&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗕𝗥𝗢𝗡𝗭𝗘 ] 𝖫𝗈𝗀𝗈 𝖢𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "silver":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=5&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗦𝗜𝗟𝗩𝗘𝗥 ] - 𝖫𝗈𝗀𝗈 𝖢𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "purple":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=6&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗣𝗨𝗥𝗣𝗟𝗘 ] 𝖫𝗈𝗀𝗈 𝖢𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "blue2":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=7&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗕𝗟𝗨𝗘𝟮 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "golden":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=8&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗚𝗢𝗟𝗗𝗘𝗡 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "hot":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=9&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗛𝗢𝗧 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "purple2":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=10&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗣𝗨𝗥𝗣𝗟𝗘𝟮 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "rainbow":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=11&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗥𝗔𝗜𝗡𝗕𝗢𝗪 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "light":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=12&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗟𝗜𝗚𝗛𝗧 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "wood":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=13&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗪𝗢𝗢𝗗 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "red":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=14&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗥𝗘𝗗 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "biscuit":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=15&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗕𝗜𝗦𝗖𝗨𝗜𝗧 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "abstragold":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=16&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗔𝗕𝗦𝗧𝗥𝗔𝗚𝗢𝗟𝗗 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "metal":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=17&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗠𝗘𝗧𝗔𝗟 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "fruit":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=18&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗙𝗥𝗨𝗜𝗧 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "frozen":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=19&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗙𝗥𝗢𝗭𝗘𝗡 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "marble":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=20&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗠𝗔𝗥𝗕𝗟𝗘 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "blodus":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=21&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗕𝗟𝗢𝗗𝗨𝗦 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "smoke":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=22&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗦𝗠𝗢𝗞𝗘 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "orange2":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=23&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗢𝗥𝗔𝗡𝗚𝗘𝟮 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "christmas":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=24&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗖𝗛𝗥𝗜𝗦𝗧𝗠𝗔𝗦 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "breakwall":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=25&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗕𝗥𝗘𝗔𝗞𝗪𝗔𝗟𝗟 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "rain":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=26&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗥𝗔𝗜𝗡 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "fonttext":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=27&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗙𝗢𝗡𝗧𝗧𝗘𝗫𝗧 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "greenneon":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=28&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗚𝗥𝗘𝗘𝗡𝗡𝗘𝗢𝗡 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "colourblur":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=29&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗖𝗢𝗟𝗢𝗨𝗥𝗕𝗟𝗨𝗥 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "demand":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=30&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗗𝗘𝗠𝗔𝗡𝗗 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "road":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=31&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗥𝗢𝗔𝗗 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "neon":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=32&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗡𝗘𝗢𝗡 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "3dbox":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=33&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝟯𝗗𝗕𝗢𝗫 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "nightmoon":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=34&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗡𝗜𝗚𝗛𝗧𝗠𝗢𝗢𝗡 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "neon2":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=35&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗡𝗘𝗢𝗡𝟮 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "blood":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=36&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗕𝗟𝗢𝗢𝗗 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "hack":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=37&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗛𝗔𝗖𝗞 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "bread":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=38&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗕𝗥𝗘𝗔𝗗 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "fish":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=39&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗙𝗜𝗦𝗛 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "chocolate":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=40&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗖𝗛𝗢𝗖𝗢𝗟𝗔𝗧𝗘 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "colourglass":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=41&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗖𝗢𝗟𝗢𝗨𝗥𝗚𝗟𝗔𝗦𝗦 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "purpleglass":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=42&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗣𝗨𝗥𝗣𝗟𝗘𝗚𝗟𝗔𝗦𝗦 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "jewelry":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=43&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗝𝗘𝗪𝗘𝗟𝗥𝗬 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "jewelry2":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=44&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗝𝗘𝗪𝗘𝗟𝗥𝗬𝟮 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "greenjal":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=45&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗚𝗥𝗘𝗘𝗡𝗝𝗔𝗟 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "rainbow2":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=46&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗥𝗔𝗜𝗡𝗕𝗢𝗪𝟮 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "robot":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=47&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗥𝗢𝗕𝗢𝗧 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "captain":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=48&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗖𝗔𝗣𝗧𝗔𝗜𝗡 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "purpleshiny":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=50&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗣𝗨𝗥𝗣𝗟𝗘𝗦𝗛𝗜𝗡𝗬 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "blueglass":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=51&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗕𝗟𝗨𝗘𝗚𝗟𝗔𝗦𝗦 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "orangeglass":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=52&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗢𝗥𝗔𝗡𝗚𝗘𝗚𝗟𝗔𝗦𝗦 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "yellowglass":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=53&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗬𝗘𝗟𝗟𝗢𝗪𝗚𝗟𝗔𝗦𝗦 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "lava":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=54&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗟𝗔𝗩𝗔 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "rock":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=55&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗥𝗢𝗖𝗞 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "peridot":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=56&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗣𝗘𝗥𝗜𝗗𝗢𝗧 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "decorate":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=57&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗗𝗘𝗖𝗢𝗥𝗔𝗧𝗘 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "denim":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=58&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗗𝗘𝗡𝗜𝗠 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "steel":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=59&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗦𝗧𝗘𝗘𝗟 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "goldballoon":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=60&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗚𝗢𝗟𝗗𝗕𝗔𝗟𝗟𝗢𝗢𝗡 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "greenballoon":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=61&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗚𝗥𝗘𝗘𝗡 𝗕𝗔𝗟𝗟𝗢𝗢𝗡 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "purpleballoon":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=62&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗣𝗨𝗥𝗣𝗟𝗘 𝗕𝗔𝗟𝗟𝗢𝗢𝗡 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "skeleton":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=63&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗦𝗞𝗘𝗟𝗘𝗧𝗢𝗡 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "firework":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=64&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗙𝗜𝗥𝗘𝗪𝗢𝗥𝗞 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "natural":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=65&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗡𝗔𝗧𝗨𝗥𝗔𝗟 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "wicker":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=66&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗪𝗜𝗖𝗞𝗘𝗥 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "joker":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=67&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗝𝗢𝗞𝗘𝗥 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "galaxy":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=68&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗚𝗔𝗟𝗔𝗫𝗬 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "lion":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=69&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗟𝗜𝗢𝗡 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "metal":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=70&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗠𝗘𝗧𝗔𝗟 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "halloween":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=71&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗛𝗔𝗟𝗟𝗢𝗪𝗘𝗘𝗡 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "blood":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=72&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗕𝗟𝗢𝗢𝗗 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "xmas":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=73&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗫𝗠𝗔𝗦 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "3D-metal":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=74&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝟯𝗗-𝗠𝗘𝗧𝗔𝗟 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "metalgold":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=75&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗠𝗘𝗧𝗔𝗟𝗚𝗢𝗟𝗗 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "metalrose":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=76&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗠𝗘𝗧𝗔𝗟𝗥𝗢𝗦𝗘 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "metalsilver":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=77&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗠𝗘𝗧𝗔𝗟𝗦𝗜𝗟𝗩𝗘𝗥 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "newyear":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=78&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗡𝗘𝗪𝗬𝗘𝗔𝗥 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "yearcards":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=79&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗬𝗘𝗔𝗥𝗖𝗔𝗥𝗗𝗦 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "neontext":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=80&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗡𝗘𝗢𝗡 𝗧𝗘𝗫𝗧 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "deluxgold":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=81&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗗𝗘𝗟𝗨𝗫 𝗚𝗢𝗟𝗗 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "glossy-carbon":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=82&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗚𝗟𝗢𝗦𝗦𝗬 𝗖𝗔𝗥𝗕𝗢𝗡 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "holographic":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=83&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗛𝗢𝗟𝗢𝗚𝗥𝗔𝗣𝗛𝗜𝗖 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "minion":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=84&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗠𝗜𝗡𝗜𝗢𝗡 𝗧𝗘𝗫𝗧 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "style-text":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=85&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗦𝗧𝗬𝗟𝗘 𝗧𝗘𝗫𝗧 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "neonlight":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=86&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗡𝗘𝗢𝗡 𝗟𝗜𝗚𝗛𝗧 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "metal-dark-gold":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=87&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗠𝗘𝗧𝗔𝗟 𝗗𝗔𝗥𝗞 𝗚𝗢𝗟𝗗 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "3D-glue":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=88&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝟯𝗗 𝗚𝗟𝗨𝗘 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "sandwriting":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=89&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗦𝗔𝗡𝗗𝗪𝗥𝗜𝗧𝗜𝗡𝗚  ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "sand-engraved":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=90&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗦𝗔𝗡𝗗 𝗘𝗡𝗚𝗥𝗔𝗩𝗘𝗗 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "sandwriting2":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=91&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗦𝗔𝗡𝗗𝗪𝗥𝗜𝗧𝗜𝗡𝗚𝟮 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "write-in-sand":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=92&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗪𝗥𝗜𝗧𝗘 𝗜𝗡 𝗦𝗔𝗡𝗗 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "cloud":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=93&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗖𝗟𝗢𝗨𝗗 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "christmas-holiday":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=94&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗖𝗛𝗥𝗜𝗦𝗧𝗠𝗔𝗦 𝗛𝗢𝗟𝗜𝗗𝗔𝗬 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "graffiti":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=95&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗚𝗥𝗔𝗙𝗙𝗜𝗧𝗜 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "underwater":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=96&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗨𝗡𝗗𝗘𝗥𝗪𝗔𝗧𝗘𝗥 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "watercolor":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=97&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗪𝗔𝗧𝗘𝗥𝗖𝗢𝗟𝗢𝗥 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "papercut":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=98&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗣𝗔𝗣𝗘𝗥𝗖𝗨𝗧 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "3D-glossy-metal":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=99&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝟯𝗗 𝗚𝗟𝗢𝗦𝗦𝗬 𝗠𝗘𝗧𝗔𝗟 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "gradient":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=100&text=${name}`;
      message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [ 𝗚𝗥𝗔𝗗𝗜𝗘𝗡𝗧 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
      default:
      return api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗅𝗈𝗀𝗈 𝗍𝗒𝗉𝖾! 𝖴𝗌𝖾 .𝗍𝖾𝗑𝗍𝗉𝗋𝗈 𝗅𝗂𝗌𝗍 𝟣 𝗍𝗈 𝗌𝖾𝖾 𝗍𝗁𝖾 𝗅𝗂𝗌𝗍 𝗈𝖿 𝗍𝖾𝗑𝗍𝗉𝗋𝗈 𝗅𝗈𝗀𝗈𝗌.`, threadID, messageID);
  }

  api.sendMessage("⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗍𝖾𝗑𝗍𝗉𝗋𝗈 𝗅𝗈𝗀𝗈, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", threadID, messageID);
  let response = await axios.get(apiUrl, { responseType: "arraybuffer" });
  let logo = response.data;
  fs.writeFileSync(pathImg, Buffer.from(logo, "utf-8"));
  return api.sendMessage(
    {
      body: message,
      attachment: fs.createReadStream(pathImg),
    },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};