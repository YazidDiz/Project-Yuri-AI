module.exports.config = {
  name: "dice",
  version: "1.0.2",
  hasPermission: 0,
  credits: "Réynél",
  description: "Dice rolling",
  commandCategory: "games",
  usages: `How to use?\n${global.config.PREFIX}dice <bet>\n\nExample:\n${global.config.PREFIX}dice 100\n`,
  cooldowns: 5,
};

module.exports.languages = {
  "en": {
    "missingInput": `ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇 𝗈𝗇 𝗁𝗈𝗐 𝗍𝗈 𝗎𝗌𝖾:\n${global.config.PREFIX}𝖽𝗂𝖼𝖾 <𝖻𝖾𝗍>\n\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n${global.config.PREFIX}𝖽𝗂𝖼𝖾 𝟧𝟢`,
    "moneyBetNotEnough": `❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝗁𝖺𝗏𝖾 𝖾𝗇𝗈𝗎𝗀𝗁 𝗆𝗈𝗇𝖾𝗒 𝗍𝗈 𝖼𝗁𝖾𝖼𝗄 𝗒𝗈𝗎𝗋 𝖻𝖺𝗅𝖺𝗇𝖼𝖾. 𝗒𝗈𝗎 𝖼𝖺𝗇 𝗎𝗌𝖾 ${global.config.PREFIX}𝗆𝗈𝗇𝖾𝗒`,
    "limitBet": `❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎𝗋 𝖻𝖾𝗍 𝗂𝗌 𝗍𝗈𝗈 𝗅𝗈𝗐. 𝗍𝗁𝖾 𝗆𝗂𝗇𝗂𝗆𝗎𝗆 𝗂𝗌 𝟧𝟢$. ᴇxᴀᴍᴘʟᴇ:\n${global.config.PREFIX}𝖽𝗂𝖼𝖾 𝟧𝟢`,
    "returnWin": "🎉 | 𝖢𝗈𝗇𝗀𝗋𝖺𝗍𝗎𝗅𝖺𝗍𝗂𝗈𝗇𝗌 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗐𝗈𝗇 《%2$》 𝗋𝖾𝗌𝗎𝗅𝗍 𝗈𝖿 《%1》",
    "returnLose": "👾 | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗅𝗈𝗌𝖾 《%2$》 𝗋𝖾𝗌𝗎𝗅𝗍 𝗈𝖿 《%1》"
  }
}

module.exports.run = async function({ api, event, args, Currencies, getText }) {
  const { threadID, messageID, senderID } = event;
  const { getData, increaseMoney, decreaseMoney } = Currencies;
  const diceFaces = ["1", "2", "3", "4", "5", "6"];
  const moneyUser = (await getData(senderID)).money;

  const betAmount = parseInt(args[0]);
  if (isNaN(betAmount) || betAmount <= 0) {
    return api.sendMessage(getText("missingInput"), threadID, messageID);
  }

  if (betAmount > moneyUser) {
    return api.sendMessage(getText("moneyBetNotEnough"), threadID, messageID);
  }

  if (betAmount < 50) {
    return api.sendMessage(getText("limitBet"), threadID, messageID);
  }

  api.sendMessage('🎲 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨’𝗆 𝗋𝗈𝗅𝗅𝗂𝗇𝗀 𝗍𝗁𝖾 𝖽𝗂𝖼𝖾...', threadID, messageID);

  const diceResult = Math.floor(Math.random() * 6);
  const win = diceResult === 5;

  if (win) {
    const winnings = betAmount * 2;
    api.sendMessage(getText("returnWin", diceFaces[diceResult], winnings), threadID, messageID);
    await increaseMoney(senderID, winnings);
  } else {
    api.sendMessage(getText("returnLose", diceFaces[diceResult], betAmount), threadID, messageID);
    await decreaseMoney(senderID, betAmount);
  }
                            }