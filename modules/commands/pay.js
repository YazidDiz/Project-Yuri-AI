module.exports.config = {
  name: "pay",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Transfer money to others",
  commandCategory: "economy",
  usages: "[user tag] [Amount to transfer]",
  cooldowns: 5
};

module.exports.languages = {
    "vi": {
        "missingTag": "[ PAY ] Bạn phải tag người cần chuyển tiền",
        "overTagLength": "[ PAY ] Vui lòng chỉ tag một người duy nhất",
        "userNotExist": "[ PAY ] Người dùng bạn cần chuyển không tồn tại trong hệ thống!",
        "invalidInput": "[ PAY ] Số tiền bạn nhập không phù hợp để chuyển",
        "payerNotExist": "[ PAY ] Hiện tại bạn không tồn tại trong hệ thống, vui lòng chờ 5 giây sau đó thử lại",
        "notEnoughMoney": "[ PAY ] Bạn không đủ tiền để thực hiện giao dịch!",
        "paySuccess": "[ PAY ] Đã chuyển thành công %1$ (15% tax) cho người dùng: %2",
        "error": "[ PAY ] Đã xảy ra lỗi không mong muốn trong lúc thực hiện giao dịch"
    },
    "en": {
        "missingTag": "ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾𝗋𝖾 𝗂𝗌 𝗇𝗈 𝗋𝖾𝖼𝗂𝗉𝗂𝖾𝗇𝗍 𝗍𝖺𝗀𝗀𝖾𝖽.",
        "overTagLength": "ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗍𝗈 𝗍𝖺𝗀 𝖺𝗍 𝗇𝗈 𝗆𝗈𝗋𝖾 𝗍𝗁𝖺𝗇 𝟣 𝗋𝖾𝖼𝗂𝗉𝗂𝖾𝗇𝗍.",
        "userNotExist": "❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗋𝖾𝖼𝗂𝗉𝗂𝖾𝗇𝗍.",
        "invalidInput": "❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖺𝗆𝗈𝗎𝗇𝗍.",
        "payerNotExist": "🔄 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍 𝟧 𝗌𝖾𝖼𝗈𝗇𝖽𝗌 𝗍𝗈 𝖻𝖾 𝖿𝗎𝗅𝗅𝗒 𝗋𝖾𝗀𝗂𝗌𝗍𝖾𝗋𝖾𝖽 𝖺𝗌 𝗋𝗂𝗀𝗁𝗍 𝗇𝗈𝗐 𝗒𝗈𝗎 𝖺𝗋𝖾 𝗇𝗈𝗍 𝖺 𝗆𝖾𝗆𝖻𝖾𝗋 𝗒𝖾𝗍.",
        "notEnoughMoney": "❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗂𝗇𝗌𝗎𝖿𝖿𝗂𝖼𝗂𝖾𝗇𝗍 𝖿𝗎𝗇𝖽. 𝖯𝗅𝖾𝖺𝗌𝖾 𝖼𝗁𝖾𝖼𝗄 𝗒𝗈𝗎 𝗆𝗈𝗇𝖾𝗒 𝖺𝗆𝗈𝗎𝗇𝗍.",
        "paySuccess": "🗳 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗍𝗋𝖺𝗇𝗌𝖿𝖾𝗋𝖾𝖽 《%1$》 𝖳𝗈 《%2》 (𝟣𝟧% 𝗍𝖺𝗑 𝗂𝗇𝖼𝗅𝗎𝖽𝖾𝖽)",
        "error": "❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝗎𝗇𝗄𝗇𝗈𝗐𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖼𝗈𝗇𝗍𝖺𝖼𝗍 𝗍𝗁𝖾 𝖻𝗈𝗍 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝗍𝗈𝗋."
    }
}

module.exports.run = async function ({ api, event, Currencies, Users, args, getText }) {
    const { increaseMoney, decreaseMoney, getData } = Currencies;
    const { threadID, messageID, senderID } = event;
	var targetID = String(args[1]);
	var moneyPay = (args.slice(2, args.length)).join(" ") || null;

	if (isNaN(targetID)) {
		const mention = Object.keys(event.mentions);
        if (mention.length == 0) return api.sendMessage(getText("missingTag"), threadID, messageID);
        if (mention.length > 1) return api.sendMessage(getText("overTagLength"), threadID, messageID);
		args = args.join(" ");
		targetID = String(mention[0]);
		moneyPay = (args.slice(args.indexOf(event.mentions[mention[0]]) + (event.mentions[mention[0]] || "").length + 1, args.length)) || null;
	}

    if (!global.data.allCurrenciesID.includes(targetID)) return api.sendMessage(getText("userNotExist"), threadID, messageID);

    if (isNaN(moneyPay) && moneyPay < 1) return api.sendMessage(getText("invalidInput"), threadID, messageID);
    const taxed = (parseInt(moneyPay) * 15) / 100;
    
    try {
        const moneyPayer = (await getData(senderID)).money;
        if (!moneyPayer) return api.sendMessage(getText("payerNotExist"), threadID, messageID);
        if (moneyPayer < moneyPay) return api.sendMessage(getText("notEnoughMoney"), threadID, messageID);
        const nameTarget = global.data.userName.get(targetID) || await Users.getNameUser(targetID);
        await decreaseMoney(senderID, parseInt(moneyPay));
        await increaseMoney(targetID, parseInt(moneyPay) - taxed);
        return api.sendMessage(getText("paySuccess", (parseInt(moneyPay) - taxed), `${targetID} - ${nameTarget}`), threadID, messageID);
    } catch { return api.sendMessage(getText("error"), threadID, messageID) }
}
