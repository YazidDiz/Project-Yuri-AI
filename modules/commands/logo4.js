const axios = require('axios');
const fs = require('fs');

module.exports.config = {
  name: "logo4",
  version: "1.0.6",
  hasPermssion: 0,
  credits: "Réynél", 
  description: "Logo haha",
  commandCategory: "logo",
  usages: "[type] [text]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Users }) {
  let { messageID, senderID, threadID } = event;

  if (args.length >= 2 && args[0].toLowerCase() === "list") {
    let page = parseInt(args[1]);
    switch (page) {
      case 1:
        return api.sendMessage(
          `╔═════ஜ۩۞۩ஜ═════╗\n  𝑯𝑒𝒓𝒆'𝒔 𝒕𝒉𝒆 𝒍𝒐𝒈𝒐 𝒍𝒊𝒔𝒕 - 𝑷𝒂𝒈𝒆 1:\n\n❍ 𝖺𝗀𝗅𝗂𝗍𝖼𝗁\n❍ 𝖡𝗎𝗌𝗂𝗇𝖾𝗌𝗌\n❍ 𝖻𝗅𝗈𝗈𝖽\n❍ 𝖻𝗅𝖺𝖼𝗄𝗉𝗂𝗇𝗄\n❍ 𝖻𝗋𝗈𝗄𝖾𝗇\n❍ 𝖼𝗁𝗋𝗂𝗌𝗍𝗆𝖺𝗌\n❍ 𝖼𝖺𝗉𝗍𝖺𝗂𝗇𝖺𝗆𝖾𝗋𝗂𝖼𝖺\n❍ 𝖼𝖺𝗋𝖻𝗈𝗇\n❍ 𝖼𝗂𝗋𝖼𝗎𝗂𝗍\n❍ 𝖼𝗁𝗈𝗋𝗈𝗋\n❍ 𝖼𝗁𝗋𝗂𝗌𝗍𝗆𝖺𝗌\n❍ 𝖽𝗂𝗌𝖼𝗈𝗏𝖾𝗋𝗒\n❍ 𝖽𝖾𝗏𝗂𝗅\n❍ 𝖽𝗋𝗈𝗉𝗐𝖺𝗍𝖾𝗋\n❍ 𝖿𝗂𝖼𝗍𝗂𝗈𝗇\n❍ 𝖿𝗂𝗋𝖾\n❍ 𝗀𝗅𝖺𝗌𝗌\n❍ 𝗀𝗋𝖾𝖾𝗇𝗁𝗈𝗋𝗋𝗈𝗋\n❍ 𝗂𝗆𝗀𝗅𝗂𝗍𝖼𝗁\n❍ 𝗅𝖺𝗒𝖾𝗋𝖾𝖽\n❍ 𝗅𝗂𝗀𝗁𝗍\n❍ 𝗆𝖺𝗀𝗆𝖺\n❍ 𝗆𝖾𝗍𝖺𝗅𝗅𝗂𝖼\n❍ 𝗇𝖾𝗈𝗇\n❍ 𝗌𝗄𝖾𝗅𝖾𝗍𝗈𝗇\n❍ 𝗌𝗄𝖾𝗍𝖼𝗁\n❍ 𝗌𝗍𝗈𝗇𝖾\n❍ 𝗅𝗈𝗏𝖾\n❍ 𝗍𝗋𝖺𝗇𝗌𝖿𝗈𝗋𝗆𝖾𝗋𝗌\n❍ 𝗐𝖺𝗅𝗅\n\n                𝑷𝑨𝑮𝑬 1 - 3\n\n╚═════ஜ۩۞۩ஜ═════╝`,
          threadID,
          messageID
        );
      case 2:
        return api.sendMessage(
          `╔═════ஜ۩۞۩ஜ═════╗\n\n𝑯𝑒𝒓𝒆'𝒔 𝒕𝒉𝒆 𝒍𝒐𝒈𝒐 𝒍𝒊𝒔𝒕 - 𝑷𝒂𝒈𝒆 2:\n\n❍ 𝗇𝖺𝗋𝗎𝗍𝗈\n❍ 𝖽𝗋𝖺𝗀𝗈𝗇𝖿𝗂𝗋𝖾𝖺𝗏𝖺𝗍𝖾𝗋\n❍ 𝗉𝗎𝖻𝗀𝖺𝗏𝖺𝗍𝖺𝗋\n❍ 𝗇𝗂𝗀𝗁𝗍𝗌𝗍𝖺𝗋𝗌\n❍ 𝗌𝗎𝗇𝗅𝗂𝗀𝗁𝗍\n❍ 𝖼𝗅𝗈𝗎𝖽\n❍ 𝗉𝗂𝗀\n❍ 𝖼𝖺𝗉𝖾𝗋\n❍ 𝗐𝗋𝗂𝗍𝖾𝗌𝗍𝖺𝗍𝗎𝗌\n❍ 𝗁𝗈𝗋𝗋𝗈𝗋\n❍ 𝗍𝖾𝖺𝗆𝗅𝗈𝗀𝗈\n❍ 𝗊𝗎𝖾𝖾𝗇\n❍ 𝖻𝖾𝖺𝖼𝗁\n❍ 𝖿𝖻𝖼𝟥\n❍ 𝗍𝖺𝗍𝗍𝗈𝗈\n❍ 𝗌𝗁𝗂𝗋𝗍𝟥\n❍ 𝗈𝖼𝖾𝖺𝗇𝗌𝖾𝖺\n❍ 𝗌𝗁𝗂𝗋𝗍𝟦\n❍ 𝗌𝗁𝗂𝗋𝗍𝟧\n❍ 𝗌𝗁𝗂𝗋𝗍𝟨\n❍ 𝗅𝗈𝗏𝖾𝗆𝗌𝗀\n❍ 𝖼𝗁𝗌𝗍𝗆\n❍ 𝖼𝗁𝗋𝗂𝗌𝗍𝗆𝖺𝗌𝟤\n❍ 𝗂𝖼𝖾𝗍𝖾𝗑𝗍\n❍ 𝖻𝗎𝗍𝗍𝖾𝗋𝖿𝗅𝗒\n❍𝖼𝗈𝖿𝖿𝖾𝖾\n❍ 𝗅𝗈𝗏𝖾\n\n                𝑷𝑨𝑮𝑬 2 - 3\n╚═════ஜ۩۞۩ஜ═════╝`,
          threadID,
          messageID
        );
      case 3:
        return api.sendMessage(
          `╔═════ஜ۩۞۩ஜ═════╗\n𝑯𝒆𝒓𝒆’𝒔 𝒕𝒉𝒆 𝒍𝒐𝒈𝒐 𝒍𝒊𝒔𝒕 - 𝑷𝒂𝒈𝒆 3:\n❍ 𝗌𝗆𝗈𝗄𝖾\n\n                𝑷𝑨𝑮𝑬 3 - 3\n╚═════ஜ۩۞۩ஜ═════╝`,
          threadID,
          messageID
        );
      default:
        return api.sendMessage(
          `❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗉𝖺𝗀𝖾 𝗇𝗎𝗆𝖻𝖾𝗋! 𝖯𝗅𝖾𝖺𝗌𝖾 𝗎𝗌𝖾 "𝗅𝗂𝗌𝗍 𝟣" 𝗈𝗋 "𝗅𝗂𝗌𝗍 𝟤" 𝗈𝗋 "𝗅𝗂𝗌𝗍 𝟥" 𝗍𝗈 𝗏𝗂𝖾𝗐 𝗍𝗁𝖾 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝗅𝗈𝗀𝗈 𝗅𝗂𝗌𝗍𝗌.`,
          threadID,
          messageID
        );
    }
  }

  if (args.length < 2) {
    return api.sendMessage(
      `❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖿𝗈𝗋𝗆𝖺𝗍! 𝖴𝗌𝖾: 𝗅𝗈𝗀𝗈 𝗅𝗂𝗌𝗍𝗅𝗈𝗀𝗈 𝗅𝗂𝗌𝗍 (𝗉𝖺𝗀𝖾 𝗇𝗎𝗆𝖻𝖾𝗋) 𝗈𝗋 𝗅𝗈𝗀𝗈 (𝗅𝗈𝗀𝗈 𝗇𝖺𝗆𝖾) (𝗍𝖾𝗑𝗍)`,
      threadID,
      messageID
    );
  }

  let type = args[0].toLowerCase();
  let text = args.slice(1).join(" ");
  let pathImg = __dirname + `/cache/${type}_${text}.png`;
  let apiUrl, message;

      switch (type) {
        case "glass":
          apiUrl = `https://rest-api-001.faheem001.repl.co/api/textpro?number=4&text=${text}`;
          message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗚𝗟𝗔𝗦𝗦] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "business":
        apiUrl = `https://rest-api-001.faheem001.repl.co/api/textpro?number=5&text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑩𝑼𝑺𝑰𝑵𝑬𝑺𝑺] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
        break;
      case "wall":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/embossed?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗪𝗔𝗟𝗟] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
       break;
      case "aglitch":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/aglitch?text=${text}&text2=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗔𝗚𝗟𝗜𝗧𝗖𝗛] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:"; 
          break;
      case "berry":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/berry?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑩𝑬𝑹𝑹𝒀] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "blackpink":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/blackpink?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑩𝑳𝑨𝑪𝑲𝑷𝑰𝑵𝑲] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "blood":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/blood?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑩𝑳𝑶𝑶𝑫] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "broken":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/broken?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑩𝑹𝑶𝑲𝑬𝑵] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
            break;
      case "smoke":
        apiUrl = `https://api.lolhuman.xyz/api/photooxy1/smoke?apikey=0a637f457396bf3dcc21243b&text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑺𝑴𝑶𝑲𝑬] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";


        break;
      case "captainamerica":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/captainamerica?text=${test}&text2=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑪𝑨𝑷𝑻𝑨𝑰𝑵𝑨𝑴𝑬𝑹𝑰𝑪𝑨] 𝗅𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "carbon":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/carbon?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑪𝑨𝑹𝑩𝑶𝑵] 𝗅𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "choror":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/choror?text=${text}&text2=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑪𝑯𝑶𝑹𝑶𝑹] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "christmas":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/christmas?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑪𝑯𝑹𝑰𝑺𝑻𝑴𝑨𝑺] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "circuit":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/circuit?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑪𝑰𝑹𝑪𝑼𝑰𝑻] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "devil":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/devil?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑫𝑬𝑽𝑰𝑳] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "discovery":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/discovery?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑫𝑰𝑺𝑪𝑶𝑽𝑬𝑹𝒀] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "dropwater":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/dropwater?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑫𝑹𝑶𝑷𝑾𝑨𝑻𝑬𝑹] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "fiction":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/fiction?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑭𝑰𝑪𝑻𝑰𝑶𝑵] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "firework":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/firework?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑭𝑰𝑹𝑬𝑾𝑶𝑹𝑲] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "galaxy":
        apiUrl = `https://rest-api-001.faheem001.repl.co/api/textpro?number=173&text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑮𝑨𝑳𝑨𝑿𝒀] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "glossy":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/glossy?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑮𝑳𝑶𝑺𝑺𝒀] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "glue":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/glue?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑮𝑳𝑼𝑬] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "gradient":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/gradient?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑮𝑹𝑨𝑫𝑰𝑬𝑵𝑻] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "greenhorror":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/greenhorror?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑮𝑹𝑬𝑬𝑵𝑯𝑶𝑹𝑹𝑶𝑹] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "spooky":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/spooky?text=${text}&text2=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑺𝑷𝑶𝑶𝑲𝒀] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "imglitch":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/imglitch?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑰𝑴𝑮𝑳𝑰𝑻𝑪𝑯] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "layered":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/layered?text=${text}&text2=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑳𝑨𝒀𝑬𝑹𝑬𝑫] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "light":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/light?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑳𝑰𝑮𝑯𝑻] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "magma":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/magma?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑴𝑨𝑮𝑴𝑨] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
      case "metallic":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/metallic?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑴𝑬𝑻𝑨𝑳𝑳𝑰𝑪] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
      case "neon":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/neon?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑵𝑬𝑶𝑵] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "skeleton":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/skeleton?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑺𝑲𝑬𝑳𝑬𝑻𝑶𝑵] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "sketch":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/sketch?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑺𝑲𝑬𝑻𝑪𝑯] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:"; 
          break;
      case "stone":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/stone?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑺𝑻𝑶𝑵𝑬] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "transformer":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/transformer?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑻𝑹𝑨𝑵𝑺𝑭𝑶𝑹𝑴𝑬𝑹] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "fire":
        apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/photooxy/flaming?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑭𝑰𝑹𝑬] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "naruto":
        apiUrl = `https://rest-api-2.faheem007.repl.co/api/photooxy/naruto?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝑵𝑨𝑹𝑼𝑻𝑶] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "dragonfire":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/dragonfire?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗣𝘂𝗯𝗴] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "avater":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/lolnew?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗔𝗩𝗔𝗧𝗔𝗥] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "pubgavatar":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/pubgavatar?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗣𝗨𝗕𝗚𝗔𝗩𝗔𝗧𝗔𝗥] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "nightstars":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/nightstars?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗡𝗜𝗚𝗛𝗧𝗦𝗧𝗔𝗥𝗦] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "sunlight":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/sunlight?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗦𝗨𝗡𝗟𝗜𝗚𝗛𝗧] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "cloud":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/cloud?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗖𝗟𝗢𝗨𝗗] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "pig":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/pig?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗣𝗜𝗚] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "caper":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/caper?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗖𝗔𝗣𝗘𝗥] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "horror":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/horror?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗛𝗢𝗥𝗥𝗢𝗥] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "writestatus":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/writestatus?text=${text}&text2=Your%20Quotes%20In%20Herm`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗪𝗥𝗜𝗧𝗘𝗦𝗧𝗔𝗧𝗨𝗦] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "teamlogo":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/teamlogo?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗧𝗘𝗔𝗠𝗟𝗢𝗚𝗢] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "beach":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/beach?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗕𝗘𝗔𝗖𝗛] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "queen":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/queen?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗤𝗨𝗘𝗘𝗡] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "fbc3":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/facebookcover3?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗙𝗕𝗖𝟯] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "tatto":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/tatto?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗧𝗔𝗧𝗧𝗢] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "shirt3":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/shirt3?text=${text}&text2=20`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗦𝗛𝗜𝗥𝗧𝟯] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "oceansea":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/photooxy/oceansea?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗦𝗘𝗔] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "shirt4":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/shirt4?text=${text}&text2=20`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗦𝗛𝗜𝗥𝗧𝟰] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "shirt5":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/shirt5?text=${text}&text2=20`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗦𝗛𝗜𝗥𝗧𝟱] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "shirt6":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/shirt6?text=${text}&text2=20`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗦𝗛𝗜𝗥𝗧𝟲] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "lovemsg":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/photooxy/lovemessage?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗟𝗢𝗩𝗘𝗠𝗦𝗚] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "chstm":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/Chirstmasvideo?text=${text}&type=video/mp4`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗖𝗛𝗜𝗥𝗧𝗠𝗔𝗦] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "christmas2":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/Christmas2?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗖𝗛𝗥𝗜𝗦𝗧𝗠𝗔𝗦 𝟮] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "icetext":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/icetext?url=https://i.imgur.com/BTPUTRQ.jpg&text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗜𝗖𝗘𝗧𝗘𝗫𝗧] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "butterfly":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/photooxy/butterfly?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗕𝗨𝗧𝗧𝗘𝗥𝗙𝗟𝗬 🦋] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
          break;
      case "coffee":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/photooxy/coffecup?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗖𝗢𝗙𝗙𝗘𝗘] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "love":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/lovetext?text=${text}`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗟𝗢𝗩𝗘] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
           break;
      case "intro2":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/intro2?text=${text}&type=video/mp4`;
        message = "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 [𝗔𝗩𝗔𝗧𝗘𝗥] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";


          break;
        default:
          return api.sendMessage(
            `❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗅𝗈𝗀𝗈 𝗍𝗒𝗉𝖾! 𝖴𝗌𝖾 "𝗅𝗂𝗌𝗍 𝟣" 𝗍𝗈 𝗌𝖾𝖾 𝗍𝗁𝖾 𝗅𝗂𝗌𝗍 𝗈𝖿 𝗍𝖾𝗑𝗍𝗉𝗋𝗈 𝗅𝗈𝗀𝗈𝗌.`,
            threadID,
            messageID
          );
      }

      try {
        let response = await axios.get(apiUrl, { responseType: "arraybuffer" });
        fs.writeFileSync(pathImg, Buffer.from(response.data, "binary"));

        return api.sendMessage(
          {
            attachment: fs.createReadStream(pathImg),
            body: message
          },
          threadID,
          () => fs.unlinkSync(pathImg)
        );
      } catch (err) {
        console.error(err);
        return api.sendMessage(
          `❎ | 𝖦𝗈𝗆𝖾𝗇 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝗅𝗈𝗀𝗈. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.`,
          threadID,
          messageID
    );
  }
};