module.exports.config = {
	name: "logo",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Logo Maker",
	commandCategory: "logo",
	usages: "[logostyle] [Text]",
	cooldowns: 1,
	
	}; // Credits fot the api:Sensui
			
module.exports.run = async ({ api, event, args }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	const req = args[1];
	if (!args[0]) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, I 𝗇𝖾𝖾𝖽 𝖺 𝗅𝗈𝗀𝗈 𝗌𝗍𝗒𝗅𝖾 𝗍𝗈 𝗉𝗋𝗈𝖼𝖾𝖾𝖽.", event.threadID, event.messageID);
	if (args[0] == "metal") {
	axios.get(`https://logo-maker-api.codersensui.repl.co/create?theme=https://textpro.me/create-3d-liquid-metal-text-effect-1112.html&text=${encodeURI(req)}`).then(res => {
		let callback = function () {
					api.sendMessage({
						body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗅𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:`,
						attachment: fs.createReadStream(__dirname + `/cache/logo.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/logo.jpg`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/logo.jpg`)).on("close", callback);
			})
	return;
	};
	if (args[0] == "naruto") {
    axios.get(`https://logo-maker-api.codersensui.repl.co/create?theme=https://textpro.me/create-naruto-logo-style-text-effect-online-1125.html&text=${encodeURI(req)}`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗅𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:`,
						attachment: fs.createReadStream(__dirname + `/cache/logo.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/logo.jpg`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/logo.jpg`)).on("close", callback);
			})
	return;
	};
	if (args[0] == "cloud") {
    axios.get(`https://logo-maker-api.codersensui.repl.co/create?theme=https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html&text=${encodeURI(req)}`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗅𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:`,
						attachment: fs.createReadStream(__dirname + `/cache/logo.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/logo.jpg`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/logo.jpg`)).on("close", callback);
			})
	return;
	};
	if (args[0] == "blackpink") {
    axios.get(`https://logo-maker-api.codersensui.repl.co/create?theme=https://textpro.me/create-blackpink-logo-style-online-1001.html&text=${encodeURI(req)}`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗅𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:`,
						attachment: fs.createReadStream(__dirname + `/cache/logo.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/logo.jpg`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/logo.jpg`)).on("close", callback);
			})
	return;
	};
	if (args[0] == "artpaper") {
    axios.get(`https://logo-maker-api.codersensui.repl.co/create?theme=https://textpro.me/create-art-paper-cut-text-effect-online-1022.html&text=${encodeURI(req)}`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗅𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:`,
						attachment: fs.createReadStream(__dirname + `/cache/logo.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/logo.jpg`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/logo.jpg`)).on("close", callback);
			})
	return;
	};
	if (args[0] == "glass1") {
    axios.get(`https://logo-maker-api.codersensui.repl.co/create?theme=https://textpro.me/blue-glass-text-effect-908.html&text=${encodeURI(req)}`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗅𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:`,
						attachment: fs.createReadStream(__dirname + `/cache/logo.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/logo.jpg`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/logo.jpg`)).on("close", callback);
			})
	return;
	};
	if (args[0] == "glass2") {
    axios.get(`https://logo-maker-api.codersensui.repl.co/create?theme=https://textpro.me/orange-glass-text-effect-911.html&text=${encodeURI(req)}`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗅𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:`,
						attachment: fs.createReadStream(__dirname + `/cache/logo.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/logo.jpg`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/logo.jpg`)).on("close", callback);
			})
	return;
	};
	if (args[0] == "greenhorror") {
    axios.get(`https://logo-maker-api.codersensui.repl.co/create?theme=https://textpro.me/create-green-horror-style-text-effect-online-1036.html&text=${encodeURI(req)}`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗅𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:`,
						attachment: fs.createReadStream(__dirname + `/cache/logo.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/logo.jpg`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/logo.jpg`)).on("close", callback);
			})
	return;
	};
	if (args[0] == "greenneon") {
    axios.get(`https://logo-maker-api.codersensui.repl.co/create?theme=https://textpro.me/green-neon-text-effect-874.html&text=${encodeURI(req)}`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗅𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:`,
						attachment: fs.createReadStream(__dirname + `/cache/logo.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/logo.jpg`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/logo.jpg`)).on("close", callback);
			})
	return;
	};
	if (args[0] == "lightneon") {
    axios.get(`https://logo-maker-api.codersensui.repl.co/create?theme=https://textpro.me/neon-light-text-effect-online-882.html&text=${encodeURI(req)}`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗅𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:`,
						attachment: fs.createReadStream(__dirname + `/cache/logo.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/logo.jpg`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/logo.jpg`)).on("close", callback);
			})
	return;
	};
	if (args[0] == "matrix") {
    axios.get(`https://logo-maker-api.codersensui.repl.co/create?theme=https://textpro.me/matrix-style-text-effect-online-884.html&text=${encodeURI(req)}`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗅𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:`,
						attachment: fs.createReadStream(__dirname + `/cache/logo.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/logo.jpg`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/logo.jpg`)).on("close", callback);
			})
	return;
	};
	if (args[0] == "neon") {
    axios.get(`https://logo-maker-api.codersensui.repl.co/create?theme=https://textpro.me/neon-text-effect-online-879.html&text=${encodeURI(req)}`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗅𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:`,
						attachment: fs.createReadStream(__dirname + `/cache/logo.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/logo.jpg`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/logo.jpg`)).on("close", callback);
			})
	return;
	};
	if (args[0] == "futureneon") {
    axios.get(`https://logo-maker-api.codersensui.repl.co/create?theme=https://textpro.me/create-a-futuristic-technology-neon-light-text-effect-1006.html&text=${encodeURI(req)}`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗅𝗈𝗀𝗈 𝖼𝗋𝖾𝖺𝗍𝖾𝖽:`,
						attachment: fs.createReadStream(__dirname + `/cache/logo.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/logo.jpg`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/logo.jpg`)).on("close", callback);
			})
	return;
	};
	if (args[0] == "help") return api.sendMessage(`➢ 𝖠𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖫𝗈𝗀𝗈\n➢ ${global.config.PREFIX}𝗅𝗈𝗀𝗈 𝗆𝖾𝗍𝖺𝗅 {text}\n➢ ${global.config.PREFIX}𝗅𝗈𝗀𝗈 𝗇𝖺𝗋𝗎𝗍𝗈 {text}\n➢ ${global.config.PREFIX}𝗅𝗈𝗀𝗈 𝖼𝗅𝗈𝗎𝖽 {text}\n➢ ${global.config.PREFIX}𝗅𝗈𝗀𝗈 𝖻𝗅𝖺𝖼𝗄𝗉𝗂𝗇𝗄 {text}\n➢ ${global.config.PREFIX}𝗅𝗈𝗀𝗈 𝖺𝗋𝗍𝗉𝖺𝗉𝖾𝗋 {text}\n➢ ${global.config.PREFIX}𝗅𝗈𝗀𝗈 𝗀𝗅𝖺𝗌𝗌𝟣 {text}\n➢ ${global.config.PREFIX}𝗅𝗈𝗀𝗈 𝗀𝗅𝖺𝗌𝗌𝟤 {text}\n➢ ${global.config.PREFIX}𝗅𝗈𝗀𝗈 𝗀𝗋𝖾𝖾𝗇𝗁𝗈𝗋𝗋𝗈𝗋 {text}\n➢ ${global.config.PREFIX}𝗅𝗈𝗀𝗈 𝗅𝗂𝗀𝗁𝗍𝗇𝖾𝗈𝗇 {text}\n➢ ${global.config.PREFIX}𝗅𝗈𝗀𝗈 𝗆𝖺𝗍𝗋𝗂𝗑 {text}\n➢ ${global.config.PREFIX}𝗅𝗈𝗀𝗈 𝗇𝖾𝗈𝗇 {text}\n➢ ${global.config.PREFIX}𝗅𝗈𝗀𝗈 𝖿𝗎𝗍𝗎𝗋𝖾𝗇𝖾𝗈𝗇 {text}\n\n𝖢𝗈𝗆𝗆𝖺𝗇𝖽 𝖢𝗋𝖾𝖺𝗍𝖾𝖽 𝖡𝗒 𝖢𝗅𝖺𝗋𝗄 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺`, event.threadID, event.messageID);
                                                                                                                                              }