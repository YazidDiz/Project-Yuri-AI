 module.exports.config = {
	name: "help4",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Réynél Eśquível",
	description: "Beginner's Guide To All Bot Commands",
  commandCategory: "guides",
	usages: "[command name]",
	cooldowns: 7,
	envConfig: {
		autoUnsend: true,
		delayUnsend: 500
	}
};

module.exports.languages = {
	//"vi": {
	//	"moduleInfo": "「 %1 」\n%2\n\n❯ Cách sử dụng: %3\n❯ Thuộc nhóm: %4\n❯ Thời gian chờ: %5 giây(s)\n❯ Quyền hạn: %6\n\n» Module code by %7 «",
	//	"helpList": '[ Hiện tại đang có %1 lệnh có thể sử dụng trên bot này, Sử dụng: "%2help nameCommand" để xem chi tiết cách sử dụng! ]"',
	//	"user": "Người dùng",
  //      "adminGroup": "Quản trị viên nhóm",
  //      "adminBot": "Quản trị viên bot"
//	},
	"en": {
		"moduleInfo": "「 %1 」\n%2\n\n❯ 𝗨𝘀𝗮𝗴𝗲: %3\n❯ 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: %4\n❯ 𝗖𝗼𝗼𝗹𝗱𝗼𝘄𝗻: %5 sᴇᴄᴏɴᴅ(s)\n❯ 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: %6\n\n» 𝗠𝗼𝗱𝘂𝗹𝗲 𝗰𝗼𝗱𝗲𝗱 𝗯𝘆: %7 ",
		"helpList": 'ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 《%1》 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝗈𝗇 𝗍𝗁𝗂𝗌 𝖻𝗈𝗍, 𝖴𝗌𝖾: 《%2𝗁𝖾𝗅𝗉𝟦 𝖼𝗆𝖽 𝗇𝖺𝗆𝖾》 𝗍𝗈 𝗄𝗇𝗈𝗐 𝗁𝗈𝗐 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽',
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
    const numberOfOnePage = 9999;
    //*số thứ tự 1 2 3.....cú pháp ${++i}*//
    let i = 0;
    let msg = "";
    
    for (var [name, value] of (commands)) {
      name += ``;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);
    
    const startSlice = numberOfOnePage*page - numberOfOnePage;
    i = startSlice;
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);
    
    for (let item of returnArray) msg += `「 ${++i} 」${prefix}${item}\n`;
    
    
    const siu = `❁*°*•̩̩͙✩•̩̩͙*˚˚ ⟬🅡🅒🅑⟭ ˚˚*•̩̩͙✩•̩̩͙*˚*❁\n𒈔♛┈⛧┈┈•༶❁༶•┈┈⛧┈♛𒈔\n⫸＊*•̩̩͙✩•̩̩͙*˚  ˚*•̩̩͙✩•̩̩͙*˚ ˚*•̩̩͙✩•̩̩͙*˚＊⫷\n     𝗟𝗜𝗦𝗧 𝗢𝗙 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦`;
    
 const text = `\n➥ 𝗣𝗔𝗚𝗘 »${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)}«`;
 
    return api.sendMessage(siu + "\n\n" + msg  + text, threadID, async (error, info) => {
			if (autoUnsend) {
				await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
				return api.unsendMessage(info.messageID);
			} else return;
		}, event.messageID);
	}

	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};
