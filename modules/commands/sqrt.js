module.exports.config = {
  name: "sqrt",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Calculates the square root of a number.",
  commandCategory: "math",
  usages: "[number]",
  cooldowns: 5,
  dependencies: '',
};
 
module.exports.run = async function ({ api, event, args }) {
  const uid = event.senderID;
  const userName = (await api.getUserInfo(uid))[uid].name;
  
  const number = parseFloat(args[0]);
 
  if (isNaN(number)) {
    return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗇𝗎𝗆𝖻𝖾𝗋.", event.threadID, event.messageID);
  }
 
  if (number < 0) {
    return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖨 𝖼𝖺𝗇'𝗍 𝖼𝖺𝗅𝖼𝗎𝗅𝖺𝗍𝖾 𝗌𝗊𝗎𝖺𝗋𝖾 𝗋𝗈𝗈𝗍 𝗈𝖿 𝖺 𝗇𝖾𝗀𝖺𝗍𝗂𝗏𝖾 𝗇𝗎𝗆𝖻𝖾𝗋.", event.threadID, event.messageID);
  }
 
  const squareRoot = Math.sqrt(number);
 
  const response = `🌟 | 𝖲𝖾𝗇𝗌𝖾𝗂 ${userName}\n━━━━━━━━━━━━━━━━━━━\n𝖳𝗁𝖾 𝗌𝗊𝗎𝖺𝗋𝖾 𝗋𝗈𝗈𝗍 𝗈𝖿 《${number}》 𝗂𝗌 《${squareRoot.toFixed(2)}》`;
 
  return api.sendMessage(response, event.threadID, event.messageID);
};