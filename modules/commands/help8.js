module.exports.config = {
	name: "help8",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Beginner's Guide",
	commandCategory: "guides",
	usages: "[Name module]",
	cooldowns: 5,
	envConfig: {
		autoUnsend: false,
		delayUnsend: 20
	}
};

module.exports.languages = {
	"vi": {
		"moduleInfo": "「 %1 」\n%2\n\n❯ Cách sử dụng: %3\n❯ Thuộc nhóm: %4\n❯ Thời gian chờ: %5 giây(s)\n❯ Quyền hạn: %6\n\n» Module code by %7 «",
		"helpList": '[ Hiện tại đang có %1 lệnh có thể sử dụng trên bot này, Sử dụng: "%2help nameCommand" để xem chi tiết cách sử dụng! ]"',
		"user": "Người dùng",
        "adminGroup": "Quản trị viên nhóm",
        "adminBot": "Quản trị viên bot"
	},
	"en": {
		"moduleInfo": "「 %1 」\n%2\n\n❯ 𝗨𝘀𝗮𝗴𝗲: %3\n❯ 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: %4\n❯ 𝗪𝗮𝗶𝘁𝗶𝗻𝗴 𝘁𝗶𝗺𝗲: %5 𝘀𝗲𝗰𝗼𝗻𝗱𝘀(𝘀)\n❯ 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: %6\n\n» 𝗠𝗼𝗱𝘂𝗹𝗲 𝗰𝗼𝗱𝗲 𝗯𝘆 %7 «",
		"helpList": 'ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 《%1》 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝗈𝗇 𝗍𝗁𝗂𝗌 𝖻𝗈𝗍, 𝗎𝗌𝖾: 《%2𝗁𝖾𝗅𝗉𝟪 𝖼𝗆𝖽 𝗇𝖺𝗆𝖾》 𝗍𝗈 𝗄𝗇𝗈𝗐 𝗁𝗈𝗐 𝗍𝗈 𝗎𝗌𝖾',
		"user": "𝖴𝗌𝖾𝗋",
        "adminGroup": "𝖠𝖽𝗆𝗂𝗇 𝗀𝗋𝗈𝗎𝗉",
        "adminBot": "𝖠𝖽𝗆𝗂𝗇 𝖻𝗈𝗍"
	}
};

module.exports.handleEvent = function ({ api, event, getText }) {
	const { commands } = global.client;
	const { threadID, messageID, body } = event;

	if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
	const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports. run = function({ api, event, args, getText }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	if (!command) {
		const arrayInfo = [];
		const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 20;
    let i = 0;
    let msg = "❁*°*•̩̩͙✩•̩̩͙*˚˚ ⟬🅡🅒🅑⟭ ˚˚*•̩̩͙✩•̩̩͙*˚*❁\n𒈔♛┈⛧┈┈•༶❁༶•┈┈⛧┈♛𒈔⫸＊*•̩̩͙✩•̩̩͙*˚  ˚*•̩̩͙✩•̩̩͙*˚ ˚*•̩̩͙✩•̩̩͙*˚＊⫷\n         𝗟𝗶𝘀𝘁 𝗼𝗳 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀\n";
    
    for (var [name, value] of (commands)) {
      name += ` » ${value.config.usages}`;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);
    
    const startSlice = numberOfOnePage*page - numberOfOnePage;
    i = startSlice;
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);
    
    for (let item of returnArray) msg += ` \n╰┈➢ ${item}\n`;
    
    const randomText = [ "",];
    
    const text = `➮ 𝗣𝗮𝗴𝗲: 〘${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)}〙\n➥ 𝗧𝘆𝗽𝗲: 𓊈${prefix}𝗁𝖾𝗅𝗉𝟪𓊉 𝖿𝗈𝗋 𝗆𝗈𝗋𝖾 𝖽𝖾𝗍𝖺𝗂𝗅𝗌 𝖺𝖻𝗈𝗎𝗍 𝗆𝗒 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌.\n\n➟ 𝗡𝘂𝗺𝗯𝗲𝗿 𝗼𝗳 𝗽𝗮𝗴𝗲𝘀: ${Math.ceil(arrayInfo.length/numberOfOnePage)}${randomText[Math.floor(Math.random()*randomText.length)]}\n꙳☪︎●◉✿𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜✿◉●☪︎꙳\n∘‧̍̊·̊‧̥°̩̥˚̩̩̥͙°̩̥‧̥·̊‧̍̊ ♡ °̩̥˚̩̩̥͙°̩̥ ·͙*̩̩͙˚̩̥̩̥*̩̩̥͙·̩̩̥͙*̩̩̥͙˚̩̥̩̥*̩̩͙‧͙ °̩̥˚̩̩̥͙°̩̥ ♡ ‧̍̊·̊‧̥°̩̥˚̩̩̥͙°̩̥‧̥·̊‧̍̊∘`;
return api.sendMessage(msg + "\n" + text, threadID, async (error, info) => {
			if (autoUnsend) {
				await new Promise(resolve => setTimeout(resolve, delayUnsend * 10000));
				return api.unsendMessage(info.messageID);
			} else return;
		});
	}
	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};