module.exports.config = {
  name: "slot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Gambling in the form of fruit",
  commandCategory: "games",
  usages: "[number of coins to bet]",
  cooldowns: 5,
};

module.exports.languages = {
    "vi": {
        "missingInput": "[ SLOT ] Số tiền đặt cược không được để trống hoặc là số âm",
        "moneyBetNotEnough": "[ SLOT ] Số tiền bạn đặt lớn hơn hoặc bằng số dư của bạn!",
        "limitBet": "[ SLOT ] Số coin đặt không được dưới 50$!",
        "returnWin": "🎰 %1 | %2 | %3 🎰\nBạn đã thắng với %4$",
        "returnLose": "🎰 %1 | %2 | %3 🎰\nBạn đã thua và mất %4$"
    },
    "en": {
        "missingInput": "《 𝗦𝗟𝗢𝗧 》\n\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝖻𝖾𝗍 𝗆𝗈𝗇𝖾𝗒 𝗆𝗎𝗌𝗍 𝗇𝗈𝗍 𝖻𝖾 𝖻𝗅𝖺𝗇𝗄 𝗈𝗋 𝖺 𝗇𝖾𝗀𝖺𝗍𝗂𝗏𝖾 𝗇𝗎𝗆𝖻𝖾𝗋.",
        "moneyBetNotEnough": "《 𝗦𝗟𝗢𝗧 》\n\n❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗆𝗈𝗇𝖾𝗒 𝗒𝗈𝗎 𝖻𝖾𝗍 𝗂𝗌 𝖻𝗂𝗀𝗀𝖾𝗋 𝗍𝗁𝖺𝗇 𝗒𝗈𝗎𝗋 𝖻𝖺𝗅𝖺𝗇𝖼𝖾.",
        "limitBet": "《 𝗦𝗟𝗢𝗧 》\n\n❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎𝗋 𝖻𝖾𝗍 𝗂𝗌 𝗍𝗈𝗈 𝗅𝗈𝗐, 𝗍𝗁𝖾 𝗆𝗂𝗇𝗂𝗆𝗎𝗆 𝗂𝗌 𝟧𝟢$",
        "returnWin": "🎰 %1 | %2 | %3 🎰\n\n🎉 | 𝖢𝗈𝗇𝗀𝗋𝖺𝗍𝗎𝗅𝖺𝗍𝗂𝗈𝗇𝗌 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗐𝗈𝗇 《%4$》",
        "returnLose": "🎰 %1 | %2 | %3 🎰\n\n👾 | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗅𝗈𝗌𝗍 《%4$》 𝖻𝖾𝗍𝗍𝖾𝗋 𝗅𝗎𝖼𝗄 𝗇𝖾𝗑𝗍 𝗍𝗂𝗆𝖾!"
    }
}

module.exports.run = async function({ api, event, args, Currencies, getText }) {
    const { threadID, messageID, senderID } = event;
    const { getData, increaseMoney, decreaseMoney } = Currencies;
    const slotItems = ["🍓", "🍒", "🍎", "🍉", "🍊", "🍑", "🍆", "🍈", "🥝", "🍅", "🍇"];
    const moneyUser = (await getData(senderID)).money;

    var moneyBet = parseInt(args[0]);
    if (isNaN(moneyBet) || moneyBet <= 0) return api.sendMessage(getText("missingInput"), threadID, messageID);
	if (moneyBet > moneyUser) return api.sendMessage(getText("moneyBetNotEnough"), threadID, messageID);
	if (moneyBet < 50) return api.sendMessage(getText("limitBet"), threadID, messageID);
    var number = [], win = false;
    for (i = 0; i < 3; i++) number[i] = Math.floor(Math.random() * slotItems.length);
    if (number[0] == number[1] && number[1] == number[2]) {
        moneyBet *= 9;
        win = true;
    }
    else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
        moneyBet *= 2;
        win = true;
    }
    switch (win) {
        case true: {
            
          api.sendMessage(getText("returnWin", slotItems[number[0]], slotItems[number[1]], slotItems[number[2]], moneyBet), threadID, messageID);
          api.setMessageReaction("✅", event.messageID, (err) => {}, true)
            await increaseMoney(senderID, moneyBet);
            break;
        }
        case false: {
            
          api.sendMessage(getText("returnLose", slotItems[number[0]], slotItems[number[1]], slotItems[number[2]], moneyBet), threadID, messageID);
        api.setMessageReaction("👾", event.messageID, (err) => {}, true)
            await decreaseMoney(senderID, moneyBet);
            break;
        }
    }
  }