module.exports.config = {
  name: "fbcoverv3",
  version: "1.0.",
  hasPermssion: 0,
  credits: "Réynél",
  description: "facebook cover/banner",
  commandCategory: "cover",
  usages: "[name | birthday | relationship | location | hometown | followers | gender]",
  cooldowns: 2,
};
module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  let { threadID, messageID, senderID } = event;
 let uid = event.senderID;
  let imgPath = __dirname + `/cache/coverfbv2.jpg`;
  const txt = args.join(" ").split("|").map(item => item = item.trim());
  let name = txt[0]
  let birthday = txt[1]
  let love = txt[2]
  let location = txt[3]
  let hometown = txt[4]
  let followers = txt[5]
  let gender = txt[6]
    
  if (!args[0]) { api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗂𝗇𝗉𝗎𝗍 𝗂𝗌 𝗆𝗂𝗌𝗌𝗂𝗇𝗀\n\n🎓 | 𝗨𝘀𝗮𝗴𝗲𝘀: ${global.config.PREFIX}𝖿𝖻𝖼𝗈𝗏𝖾𝗋𝗏𝟥 𝗇𝖺𝗆𝖾 | 𝖻𝗂𝗋𝗍𝗁𝖽𝖺𝗒 | 𝗋𝖾𝗅𝖺𝗍𝗂𝗈𝗇𝗌𝗁𝗂𝗉 | 𝗅𝗈𝖼𝖺𝗍𝗂𝗈𝗇 | 𝗁𝗈𝗆𝖾𝗍𝗈𝗐𝗇 | 𝖿𝗈𝗅𝗅𝗈𝗐𝖾𝗋𝗌 | 𝗀𝖾𝗇𝖽𝖾𝗋`, threadID, messageID);
     return; 
  }
  api.sendMessage(`⏳ | 𝖦𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...\n\n━━━━━━━━━━━━━━━━━━━\n𝙉𝙖𝙢𝙚: ${name}\n𝘽𝙞𝙧𝙩𝙝𝙙𝙖𝙮: ${birthday}\n𝙍𝙚𝙡𝙖𝙩𝙞𝙤𝙣𝙨𝙝𝙞𝙥: ${love}\n𝙇𝙤𝙘𝙖𝙩𝙞𝙤𝙣: ${location}\n𝙃𝙤𝙢𝙚𝙩𝙤𝙬𝙣: ${hometown}\n𝙁𝙤𝙡𝙡𝙤𝙬𝙚𝙧𝙨: ${followers}\n𝙂𝙚𝙣𝙙𝙚𝙧: ${gender}\n𝙐𝙄𝘿: ${uid}\n━━━━━━━━━━━━━━━━━━━`, threadID, messageID);

try {
  const cover = (await axios.get(`https://chards-bot-api.richardretadao1.repl.co/api/canvas/fbcover3?name=${name}&birthday=${birthday}&love=${love}&location=${location}&hometown=${hometown}&follow=${followers}&gender=${gender}&uid=${uid}`, { responseType: "arraybuffer", })).data;
  
  fs.writeFileSync(imgPath, Buffer.from(cover, "utf-8"));

api.sendMessage({
  body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖿𝖻𝖼𝗈𝗏𝖾𝗋𝗏𝟥",
  attachment: fs.createReadStream(imgPath) }, threadID, () => fs.unlinkSync(imgPath), messageID);
    } catch (error) {
console.error("[ FBCOVERV3 ] ERROR!");
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖥𝖻𝖼𝗈𝗏𝖾𝗋𝗏𝟥 𝖠𝖯𝖨.", threadID, messageID);
  };
  };