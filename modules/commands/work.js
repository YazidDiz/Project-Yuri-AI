module.exports.config = {
	name: "work",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Réynél",
	description: "If you work, you can eat!",
	commandCategory: "economy",
  cooldowns: 5,
  envConfig: {
  cooldownTime: 1200000
    }
};

module.exports.languages = {
    "vi": {
        "cooldown": "Bạn đã làm công việc hôm nay, để tránh kiệt sức hãy quay lại sau: %1 phút %2 giây.",
        "rewarded": "Bạn đã làm công việc %1 và kiếm ra được %2$",
        "job1": "bán vé số",
        "job2": "sửa xe",
        "job3": "lập trình",
        "job4": "hack facebook",
        "job5": "đầu bếp",
        "job6": "thợ hồ",
        "job7": "fake taxi",
        "job8": "gangbang người nào đó",
        "job9": "thợ sửa ống nước may mắn  ( ͡° ͜ʖ ͡°)",
        "job10": "streamer",
        "job11": "bán hàng trực tuyến",
        "job12": "nội trợ",
        "job13": 'bán "hoa"',
        "job14": "tìm jav/hentai code cho SpermLord",
        "job15": "chơi Yasuo và gánh đội của bạn"
    },
    "en": {
        "cooldown": "ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗐𝗈𝗋𝗄𝖾𝖽 𝗍𝗈𝖽𝖺𝗒, 𝗍𝗈 𝖺𝗏𝗈𝗂𝖽 𝖾𝗑𝗁𝖺𝗎𝗌𝗍𝗂𝗈𝗇 𝗉𝗅𝖾𝖺𝗌𝖾 𝖼𝗈𝗆𝖾 𝖻𝖺𝖼𝗄 𝖺𝖿𝗍𝖾𝗋: %1 𝗆𝗂𝗇𝗎𝗍𝖾(𝗌) %2 𝗌𝖾𝖼𝗈𝗇𝖽(𝗌).",
        "rewarded": "💰 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖽𝗂𝖽 𝗍𝗁𝖾 𝗃𝗈𝖻 《%1》 𝖺𝗇𝖽 𝗋𝖾𝖼𝖾𝗂𝗏𝖾𝖽 《%2$》",
        "job1": "𝖲𝖾𝗅𝗅 𝗅𝗈𝗍𝗍𝖾𝗋𝗒 𝗍𝗂𝖼𝗄𝖾𝗍𝗌",
        "job2": "𝖱𝖾𝗉𝖺𝗂𝗋 𝖼𝖺𝗋",
        "job3": "𝖯𝗋𝗈𝗀𝗋𝖺𝗆𝗆𝗂𝗇𝗀",
        "job4": "𝖧𝖺𝖼𝗄 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄",
        "job5": "𝖢𝗁𝖾𝖿",
        "job6": "𝖬𝖺𝗌𝗈𝗇",
        "job7": "𝖥𝖺𝗄𝖾 𝗍𝖺𝗑𝗂",
        "job8": "𝖦𝖺𝗇𝗀𝖻𝖺𝗇𝗀 𝗌𝗈𝗆𝖾𝗈𝗇𝖾",
        "job9": "𝖯𝗅𝗎𝗆𝖻𝖾𝗋 ( ͡° ͜ʖ ͡°)",
        "job10": "𝖲𝗍𝗋𝖾𝖺𝗆𝖾𝗋",
        "job11": "𝖮𝗇𝗅𝗂𝗇𝖾 𝗌𝖾𝗅𝗅𝖾𝗋",
        "job12": "𝖧𝗈𝗎𝗌𝖾𝗐𝗂𝖿𝖾",
        "job13": '𝖲𝖾𝗅𝗅 "𝖿𝗅𝗈𝗐𝖾𝗋"',
        "job14": "𝖥𝗂𝗇𝖽 𝖩𝖺𝗏/𝖧𝖾𝗇𝗍𝖺𝗂 𝖼𝗈𝖽𝖾",
        "job15": "𝖯𝗅𝖺𝗒 𝗒𝖺𝗌𝗎𝗈 𝖺𝗇𝖽 𝖼𝖺𝗋𝗋𝗒 𝗒𝗈𝗎𝗋 𝗍𝖾𝖺𝗆"
    }
}

module.exports.run = async ({ event, api, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.workTime) > 0) {
        var time = cooldown - (Date.now() - data.workTime),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 60000) / 1000).toFixed(0);
        
		return api.sendMessage(getText("cooldown", minutes, (seconds < 10 ? "0" + seconds : seconds)), event.threadID, event.messageID);
    }
    else {
        const job = [
            getText("job1"),
            getText("job2"),
            getText("job3"),
            getText("job4"),
            getText("job5"),
            getText("job6"),
            getText("job7"),
            getText("job8"),
            getText("job9"),
            getText("job10"),
            getText("job11"),
            getText("job12"),
            getText("job13"),
            getText("job14"),
            getText("job15")
        ];
        const amount = Math.floor(Math.random() * 600);
        return api.sendMessage(getText("rewarded", job[Math.floor(Math.random() * job.length)], amount), threadID, async () => {
            await Currencies.increaseMoney(senderID, parseInt(amount));
            data.workTime = Date.now();
            await Currencies.setData(event.senderID, { data });
            return;
        }, messageID);
    }     
}