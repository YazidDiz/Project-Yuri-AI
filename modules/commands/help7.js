const serif = {
	a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢",
j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫",
s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳",
A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈",
J: "𝐉", K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍", O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑",
S: "𝐒", T: "𝐓", U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐙",
	" ": " "
};

function applySerifFont(text) {
	return [...text].map(char => serif[char] || char).join("");
}

module.exports.config = {
	name: "help7",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Beginner's Guide",
	commandCategory: "guides",
	usages: "[view module]",
	cooldowns: 1,
	envConfig: {
		autoUnsend: true,
		delayUnsend: 30
	}
};

module.exports.languages = {
	"en": {
		"moduleInfo": "「 %1 」\n%2\n\n❯ 𝐔𝐬𝐚𝐠𝐞: %3\n❯ 𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐲: %4\n❯ 𝐖𝐚𝐢𝐭𝐢𝐧𝐠 𝐭𝐢𝐦𝐞: %5 𝐬𝐞𝐜𝐨𝐧𝐝𝐬(𝐬)\n❯ 𝐏𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧: %6\n\n» 𝐌𝐨𝐝𝐮𝐥𝐞 𝐜𝐨𝐝𝐞 𝐛𝐲 %7 «",
		"helpList": '𝐓𝐡𝐞𝐫𝐞 𝐚𝐫𝐞 %1 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐨𝐧 𝐭𝐡𝐢𝐬 𝐛𝐨𝐭, 𝐔𝐬𝐞:  ⟬%2𝐡𝐞𝐥𝐩𝟕 𝐧𝐚𝐦𝐞𝐂𝐨𝐦𝐦𝐚𝐧𝐝⟭ 𝐭𝐨 𝐤𝐧𝐨𝐰 𝐡𝐨𝐰 𝐭𝐨 𝐮𝐬𝐞',
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
	return api.sendMessage(applySerifFont(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits)), threadID, messageID);
}

module.exports.run = function({ api, event, args, getText }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	if (!command) {
		const arrayInfo = [];
		const page = parseInt(args[0]) || 1;
		const numberOfOnePage = 10;
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

		for (let item of returnArray) msg += `[${++i}] ${prefix}${item}\n\n`;

		const siu = `[ ${global.config.BOTNAME} 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 ]`;

		const text = `\n𝐮𝐬𝐞 ⪩${prefix}𝐡𝐞𝐥𝐩⪨ <𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐧𝐚𝐦𝐞> 𝐭𝐨 𝐬𝐡𝐨𝐰 𝐭𝐡𝐞 𝐮𝐬𝐚𝐠𝐞!\n𝐨𝐫 𝐮𝐬𝐞 ⪩${prefix}𝐡𝐞𝐥𝐩𝟕⪨ 𝐭𝐨 𝐬𝐡𝐨𝐰 𝐚𝐥𝐥 𝐜𝐨𝐦𝐦𝐚𝐧𝐝\n\n𝐏𝐚𝐠𝐞 ⪩${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)}⪨`;

		return api.sendMessage(applySerifFont(siu + "\n\n" + msg  + text), threadID, async (error, info) => {
			if (autoUnsend) {
				await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
				return api.unsendMessage(info.messageID);
			} else return;
		}, event.messageID);
	}

	return api.sendMessage(applySerifFont(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits)), threadID, messageID);
};