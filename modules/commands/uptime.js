module.exports.config = {
	name: "uptime",
	version: "1.0.2",
	hasPermssion: 1,
	credits: "Réynél",
	description: "check bot uptime",
	commandCategory: "uptime",
  usages: "[uptime]",
	cooldowns: 5,
	dependencies: {
		"pidusage": ""
	}
};

function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}
module.exports.languages = {
	"en": {
		"returnResult": `❁*°*•̩̩͙✩•̩̩͙*˚˚ ⟬🅡🅒🅑⟭ ˚˚*•̩̩͙✩•̩̩͙*˚*❁\n∘‧̍̊·̊‧̥°̩̥˚̩̩̥͙°̩̥‧̥·̊‧̍̊ ♡ °̩̥˚̩̩̥͙°̩̥ ·͙*̩̩͙˚̩̥̩̥*̩̩̥͙·̩̩̥͙*̩̩̥͙˚̩̥̩̥*̩̩͙‧͙ °̩̥˚̩̩̥͙°̩̥ ♡ ‧̍̊·̊‧̥°̩̥˚̩̩̥͙°̩̥‧̥·̊‧̍̊∘\n\n⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 ${global.config.BOTNAME} 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗐𝗈𝗋𝗄𝗂𝗇𝗀 𝖿𝗈𝗋 %1 𝗁𝗈𝗎𝗋(𝗌) %2 𝗆𝗂𝗇𝗎𝗍𝖾(𝗌) %3 𝗌𝖾𝖼𝗈𝗇𝖽(𝗌).\n\n❖ 𝗧𝗼𝘁𝗮𝗹 𝘂𝘀𝗲𝗿𝘀: %4\n❖ 𝗧𝗼𝘁𝗮𝗹 𝗧𝗵𝗿𝗲𝗮𝗱𝘀: %5\n❖ 𝗖𝗽𝘂 𝘂𝘀𝗮𝗴𝗲: %6%\n❖ 𝗥𝗔𝗠 𝘂𝘀𝗮𝗴𝗲: %7\n❖ 𝗣𝗶𝗻𝗴: %8ms\n▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▯▯▯▯▯▯\n╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n☪︎●◉✿𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜✿◉●☪︎\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯`
	}
}

module.exports.run = async ({ api, event, getText }) => {
	const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);

	const pidusage = await global.nodemodule["pidusage"](process.pid);

	const timeStart = Date.now();
	return api.sendMessage("", event.threadID, () => api.sendMessage(getText("returnResult", hours, minutes, seconds, global.data.allUserID.length, global.data.allThreadID.length, pidusage.cpu.toFixed(1), byte2mb(pidusage.memory), Date.now() - timeStart), event.threadID, event.messageID));
}