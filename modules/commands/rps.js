module.exports.config = {
	name: "rps",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "Réynél",
	description: "Rock Paper Scissors Game",
	commandCategory: "games", 
	usages: "[✊, ✋, ✌️] [money]", 
	cooldowns: 0,
};
module.exports.run = async function({ api, event, args, Currencies}) {
    var { threadID, messageID, senderID} = event;
    const { getData, increaseMoney, decreaseMoney } = Currencies;
    const moneyUser = (await getData(senderID)).money;
    const userChoice = args[0];
    const betAmount = parseInt(args[1]);
    if (isNaN(betAmount) || betAmount <= 0) {
    return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖻𝖾𝗍 𝖺 𝗆𝗈𝗇𝖾𝗒 𝖿𝗂𝗋𝗌𝗍.", threadID, messageID);
    }
    if (betAmount > moneyUser) {
    return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗎, 𝖻𝗎𝗍 𝗒𝗈𝗎𝗋 𝗆𝗈𝗇𝖾𝗒 𝗂𝗌 𝗇𝗈𝗍 𝖾𝗇𝗈𝗎𝗀𝗁.", threadID, messageID);
    }
    const choices = ["✊", "✋", "✌️"];
    if (!userChoice || !choices.includes(userChoice)) {
      return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖼𝗁𝗈𝗈𝗌𝖾 𝖾𝗂𝗍𝗁𝖾𝗋 ✊, ✋, 𝗈𝗋 ✌️", threadID, messageID);
    }

    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    api.sendMessage(`⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖼𝗁𝗈𝗌𝖾 ${userChoice}.\n☉━━━━━━━━━━━━━━━━━☉\n𝖨 𝖼𝗁𝗈𝗌𝖾 ${botChoice}.`, threadID, messageID);

    if (userChoice === botChoice) {
      api.sendMessage("⚖️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨𝗍'𝗌 𝖺 𝗍𝗂𝖾!", threadID, messageID);
    } else if (
      (userChoice === "✊" && botChoice === "✌️") ||
      (userChoice === "✋" && botChoice === "✊") ||
      (userChoice === "✌️" && botChoice === "✋")
    ) {
      const winnings = betAmount * 2;
      api.sendMessage("🎉 | 𝖢𝗈𝗇𝗀𝗋𝖺𝗍𝗎𝗅𝖺𝗍𝗂𝗈𝗇𝗌 𝗌𝖾𝗇𝗌𝖾𝗂!\n𝗬𝗼𝘂 𝗪𝗼𝗻: $"+winnings, threadID, messageID);
      await increaseMoney(senderID, winnings);
    } else {
      api.sendMessage("👾 | 𝖨 𝗐𝗂𝗇 𝗌𝖾𝗇𝗌𝖾𝗂! 𝖻𝖾𝗍𝗍𝖾𝗋 𝗅𝗎𝖼𝗄 𝗇𝖾𝗑𝗍 𝗍𝗂𝗆𝖾.\n𝗬𝗼𝘂 𝗟𝗼𝘀𝗲: $"+betAmount, threadID, messageID);
      await decreaseMoney(senderID, betAmount);
    }
};