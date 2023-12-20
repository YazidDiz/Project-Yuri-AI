module.exports.config = {
	name: "baucuaca",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Games",
	commandCategory: "games",
	usages: "[bet amount]",
	cooldowns: 5,
};

module.exports.run = async function({ api, event, args, Currencies }) {
            let { threadID, messageID, senderID } = event;
            const slotItems = ["Vote","Crab","Fish"];
			let money = (await Currencies.getData(event.senderID)).money;
			var coin = args.join(" ");
			if (!coin) return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗇𝗈𝗍 𝖾𝗇𝗍𝖾𝗋𝖾𝖽 𝗍𝗁𝖾 𝖻𝖾𝗍 𝖺𝗆𝗈𝗎𝗇𝗍`, threadID, messageID);
			let win = false;
			if (isNaN(coin)|| coin.indexOf("-") !== -1) return api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎𝗋 𝖻𝖾𝗍 𝖺𝗆𝗈𝗎𝗇𝗍 𝗂𝗌 𝗇𝗈𝗍 𝖺 𝗇𝗎𝗆𝖻𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗋𝖾𝗏𝗂𝖾𝗐 𝗎𝗌𝖺𝗀𝖾 𝖺𝗍 𓊈${prefix}𝗁𝖾𝗅𝗉 𝖻𝖺𝗎𝖼𝗎𝖺𝖼𝖺𓊉`, threadID, messageID);
			if (!coin) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝖻𝖾𝗍 𝖺𝗆𝗈𝗎𝗇𝗍 𝗁𝖺𝗌 𝗇𝗈𝗍 𝖻𝖾𝖾𝗇 𝖾𝗇𝗍𝖾𝗋𝖾𝖽", threadID, messageID);
			if (coin > money) return api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎𝗋 𝖺𝗆𝗈𝗎𝗇𝗍 𝗂𝗌 𝗇𝗈𝗍 𝖾𝗇𝗈𝗎𝗀𝗁`, threadID, messageID);
			if (coin < 50) return api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎𝗋 𝖻𝖾𝗍 𝗂𝗌 𝗍𝗈𝗈 𝗌𝗆𝖺𝗅𝗅, 𝗍𝗁𝖾 𝗆𝗂𝗇𝗂𝗆𝗎𝗆 𝗂𝗌 《$𝟧𝟢》`, threadID, messageID);
			let number = [];
			for (i = 0; i < 3; i++) number[i] = Math.floor(Math.random() * slotItems.length);
			if (number[0] == number[1] && number[1] == number[2]) {
				money *= 9;
				win = true;
			}
				else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
					money *= 2;
					win = true;
				}
				(win) ? api.sendMessage(`🎉 | 𝖢𝗈𝗇𝗀𝗋𝖺𝗍𝗎𝗅𝖺𝗍𝗂𝗈𝗇𝗌 𝗌𝖾𝗇𝗌𝖾𝗂\n     《${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}》\n𝖸𝗈𝗎 𝗁𝖺𝗏𝖾 𝗐𝗈𝗇 𝖺𝗇𝖽 𝗋𝖾𝖼𝗂𝖾𝗏𝖾𝖽 《$${coin}》`, threadID, () => Currencies.increaseMoney(senderID, parseInt(coin)), messageID) : api.sendMessage(`🍃 | 𝖳𝗈𝗈 𝖻𝖺𝖽 𝗌𝖾𝗇𝗌𝖾𝗂 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗅𝗈𝗌𝗌\n\n      《${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}》\n\n𝖳𝗁𝖾 𝖺𝗆𝗈𝗎𝗇𝗍 𝗒𝗈𝗎 𝖻𝖾𝗍 𝖻𝖾𝗅𝗈𝗇𝗀𝗌 𝗍𝗈 𝗍𝗁𝖾 𝗁𝗈𝗎𝗌𝖾`, threadID, () => Currencies.decreaseMoney(senderID, parseInt(coin)), messageID);
}
