var clark = "Clark Shirosuzuka";
const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "logo3",
  version: "1.0",
  hasPermssion: 0,
  credits: `${clark}`, 
  description: "Logo maker Api credit: richard",
  commandCategory: "logo",
  usages: "[type] [name]",
  cooldowns: 2,
};
module.exports.run = async function ({ api, event, args, Users }) {
  let { messageID, senderID, threadID } = event;
  if (args.length < 2) {
    return api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖿𝗈𝗋𝗆𝖺𝗍.\n\n𝗨𝘀𝗲: 𝗅𝗈𝗀𝗈 <𝗍𝗒𝗉𝖾> <𝗇𝖺𝗆𝖾>\n\n𝗟𝗼𝗴𝗼 𝗧𝘆𝗽𝗲:\n\n𝗍𝗋𝖺𝗇𝗌𝖿𝗈𝗋𝗆𝖾𝗋\n\n𝖿𝗅𝗈𝗐𝖾𝗋𝗅𝗈𝗀𝗈\n\n𝗁𝖺𝗋𝗋𝗒\n\n𝗀𝗋𝖺𝖿𝖿𝗂𝗍𝗂`, threadID, messageID);
  }
  let type = args[0].toLowerCase();
  let name = args.slice(1).join(" ");
  let pathImg = __dirname + `/cache/${type}_${name}.png`;
  let apiUrl, message;
  
  switch (type) {
    case "transformer":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/textpro/transformer?text=${name}`;
      message = "[ 𝗧𝗥𝗔𝗡𝗦𝗙𝗢𝗥𝗠𝗘𝗥 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "flowerlogo":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/photooxy/flower-typography?text=${name}`;
      message = "[ 𝗙𝗟𝗢𝗪𝗘𝗥𝗟𝗢𝗚𝗢 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "harry":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/photooxy/harry-potter?text=${name}`;
      message = "[ 𝗛𝗔𝗥𝗥𝗬 𝗣𝗢𝗧𝗧𝗘𝗥 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    case "graffiti":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/textpro/graffiti1?text=${name}`;
      message = "[ 𝗚𝗥𝗔𝗙𝗙𝗜𝗧𝗜 ] 𝖫𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:";
      break;
    default:
      return api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗅𝗈𝗀𝗈 𝗍𝗒𝗉𝖾!`, threadID, messageID);
  }

  api.sendMessage("⏳ | 𝖯𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", threadID, messageID);
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