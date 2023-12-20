module.exports.config = {
	name: "multiktok",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Tiktok downloader",
	commandCategory: "downloader",
	usages: "[tiktoklink]",
	cooldowns: 1,
	
	}; // Credits fot the api: Prince sanel

module.exports.run = async ({ api, event, args }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	let link = args[0];
	if (!args[0]) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗇𝖾𝖾𝖽 𝖺 𝗍𝗂𝗄𝗍𝗈𝗄𝗅𝗂𝗇𝗄 𝗍𝗈 𝗉𝗋𝗈𝖼𝖾𝖾𝖽.\n𝗨𝘀𝗲: "+global.config.PREFIX+this.config.name+" [𝗍𝗂𝗄𝗍𝗈𝗄 𝗅𝗂𝗇𝗄]", event.threadID, event.messageID);
	api.sendMessage('📥 | 𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝗂𝗇𝗀 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...', event.threadID, event.messageID);
    axios.get(`https://mainapi.princemc166.repl.co/api/tiktokdown?link=${link}`).then(res => {
		let callback = function () {
					api.sendMessage({
						body: `╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n  ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n\n𝗦𝘀𝘀𝘁𝗶𝗸:\n𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖼𝖺𝗇 𝖽𝗈𝗐𝗇𝗅𝗈𝖺𝖽 𝗂𝗍 𝗂𝗇 𝖼𝗁𝗋𝗈𝗆𝖾:\n 𝗟𝗶𝗻𝗸: ${res.data.ssstik.url}\n 𝗦𝗲𝘀𝘀𝗶𝗼𝗻: ${res.data.ssstik.session}\n\n 𝗩𝗶𝗱𝗲𝗼 𝗶𝗻𝗳𝗼\n𝗔𝘂𝘁𝗵𝗼𝗿: ${res.data.ssstik.authorNickname}\n𝗔𝘂𝘁𝗵𝗼𝗿𝗨𝗻𝗶𝗾𝘂𝗲𝗜𝗗: ${res.data.ssstik.authorUniqueId}\n𝗩𝗶𝗱𝗲𝗼𝗧𝗶𝘁𝗹𝗲: ${res.data.ssstik.videoTitle}\n𝗣𝗹𝗮𝘆𝗲𝗱 𝗯𝘆: ${res.data.ssstik.play}\n𝗟𝗶𝗸𝗲𝗱 𝗯𝘆: ${res.data.ssstik.digg}\n𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${res.data.ssstik.duration}\n\n𝗧𝗶𝗸𝘄𝗻:\n 𝗡𝗼 𝗪𝗮𝘁𝗲𝗿𝗺𝗮𝗿𝗸 𝗟𝗶𝗻𝗸: ${res.data.tikwn.nowm}\n 𝗪𝗶𝘁𝗵 𝘄𝗮𝘁𝗲𝗿𝗺𝗮𝗿𝗸 𝗹𝗶𝗻𝗸: ${res.data.tikwn.wm}\n𝗠𝘂𝘀𝗶𝗰 𝗹𝗶𝗻𝗸: ${res.data.tikwn.music}\n\n𝗩𝗶𝗱𝗲𝗼 𝗜𝗻𝗳𝗼\n𝗦𝗲𝘀𝘀𝗶𝗼𝗻: ${res.data.tikwn.session}\n\n𝗩𝗶𝗱𝗲𝗼 𝗶𝗻𝗳𝗼\n𝗔𝘂𝘁𝗵𝗼𝗿: ${res.data.tikwn.authorNickname}\n𝗔𝘂𝘁𝗵𝗼𝗿𝗨𝗻𝗶𝗾𝘂𝗲𝗜𝗗: ${res.data.tikwn.authorUniqueId}\n𝗩𝗶𝗱𝗲𝗼𝗧𝗶𝘁𝗹𝗲: ${res.data.tikwn.videoTitle}\n𝗣𝗹𝗮𝘆𝗲𝗱 𝗯𝘆: ${res.data.tikwn.play}\n𝗟𝗶𝗸𝗲𝗱 𝗯𝘆: ${res.data.tikwn.digg}\n𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${res.data.tikwn.duration}\n\n> 𝗪𝗶𝘁𝗵𝗼𝘂𝘁 𝗪𝗮𝘁𝗲𝗿𝗺𝗮𝗿𝗸:`,
						attachment: fs.createReadStream(__dirname + `/cache/nowm.mp4`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/nowm.mp4`), event.messageID);
				};
				request(res.data.tikwn.nowm).pipe(fs.createWriteStream(__dirname + `/cache/nowm.mp4`)).on("close", callback);
			})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   }