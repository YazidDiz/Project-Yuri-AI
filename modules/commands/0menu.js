module.exports.config = {
	name: "menu",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Beginner's Guide",
	usages: "[all/-a] [number of pages]",
	commandCategory: "guide",
	cooldowns: 5
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
	let num = parseInt(event.body.split(" ")[0].trim());
	(handleReply.bonus) ? num -= handleReply.bonus : num;
	let msg = "";
	let data = handleReply.content;
	let check = false;
	if (isNaN(num)) msg = "ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝖺 𝗇𝗎𝗆𝖻𝖾𝗋 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍";
	else if (num > data.length || num <= 0) msg = "❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗇𝗎𝗆𝖻𝖾𝗋 𝗒𝗈𝗎 𝗌𝖾𝗅𝖾𝖼𝗍𝖾𝖽 𝗂𝗌 𝗇𝗈𝗍 𝗂𝗇 𝗍𝗁𝖾 𝗅𝗂𝗌𝗍, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇";
	else {
		const { commands } = global.client;
		let dataAfter = data[num-=1];
		if (handleReply.type == "cmd_info") {
			let command_config = commands.get(dataAfter).config;
			msg += ` 『  ${command_config.commandCategory.toUpperCase()}   』   \n`;
			msg += `\n𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗡𝗮𝗺𝗲: ${dataAfter}`;
			msg += `\n𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${command_config.description}`;
			msg += `\n𝗨𝘀𝗮𝗴𝗲𝘀: ${(command_config.usages) ? command_config.usages : ""}`;
			msg += `\n𝗖𝗼𝗼𝗹𝗱𝗼𝘄𝗻: ${command_config.cooldowns || 5}s`;
			msg += `\n𝗛𝗮𝘀 𝗣𝗿𝗲𝗺𝗶𝘀𝘀𝗶𝗼𝗻: ${(command_config.hasPermssion == 0) ? "𝖴𝗌𝖾𝗋" : (command_config.hasPermssion == 1) ? "𝖦𝗋𝗈𝗎𝗉 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝗍𝗈𝗋" : "𝖡𝗈𝗍 𝖺𝖽𝗆𝗂𝗇"}`;
      msg += `\n꙳☪︎●◉✿𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜✿◉●☪︎꙳`
			msg += `\n\n𝗠𝗼𝗱𝘂𝗹𝗲 𝗖𝗼𝗱𝗲𝗱 𝗕𝘆: ${command_config.credits}`;
		} else {
			check = true;
			let count = 0;
			msg += `» ${dataAfter.group.toUpperCase()} «\n`;

			dataAfter.cmds.forEach(item => {
				msg += `\n ${count+=1}. » ${item}: ${commands.get(item).config.description}`;
			})
			msg += "\n\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝖻𝗒 𝗇𝗎𝗆𝖻𝖾𝗋 𝗍𝗈 𝗌𝖾𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖽𝖾𝗍𝖺𝗂𝗅𝗌 𝖺𝗇𝖽 𝗁𝗈𝗐 𝗍𝗈 𝗎𝗌𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽";
		}
	}
	const axios = require('axios');
	const fs = require('fs-extra');
	const img = ["https://i.imgur.com/PfioSJP.gif","https://i.imgur.com/6PArjh2.gif", "https://i.imgur.com/sclek83.gif", "https://i.imgur.com/c7jER2a.gif", "https://i.imgur.com/PAvBbgQ.gif", "https://i.imgur.com/YgMRrJW.gif", "https://i.imgur.com/IpuGKQ9.gif", "https://i.imgur.com/oHDlwaL.gif", "https://i.imgur.com/JlRBMeS.gif", "https://i.imgur.com/zQqhgM4.gif", "https://i.imgur.com/hrJJLu3.gif"]
	var path = __dirname + "/cache/menu.gif"
	var rdimg = img[Math.floor(Math.random() * img.length)]; 
	const imgP = []
	let dowloadIMG = (await axios.get(rdimg, { responseType: "arraybuffer" } )).data; 
	fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8") );
	imgP.push(fs.createReadStream(path))
	var msgg = {body: msg, attachment: imgP}
	api.unsendMessage(handleReply.messageID);
	return api.sendMessage(msgg, event.threadID, (error, info) => {
		if (error) console.log(error);
		if (check) {
			global.client.handleReply.push({
				type: "cmd_info",
				name: this.config.name,
				messageID: info.messageID,
				content: data[num].cmds
			})
		}
	}, event.messageID);
}

module.exports.run = async function({ api, event, args }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	const axios = require('axios');
	const fs = require('fs-extra');
	const imgP = []
	const img = ["https://i.imgur.com/PfioSJP.gif","https://i.imgur.com/6PArjh2.gif", "https://i.imgur.com/sclek83.gif", "https://i.imgur.com/c7jER2a.gif", "https://i.imgur.com/PAvBbgQ.gif", "https://i.imgur.com/YgMRrJW.gif", "https://i.imgur.com/IpuGKQ9.gif", "https://i.imgur.com/oHDlwaL.gif", "https://i.imgur.com/JlRBMeS.gif", "https://i.imgur.com/zQqhgM4.gif", "https://i.imgur.com/hrJJLu3.gif"]
	var path = __dirname + "/cache/menu.gif"
	var rdimg = img[Math.floor(Math.random() * img.length)]; 

   	let dowloadIMG = (await axios.get(rdimg, { responseType: "arraybuffer" } )).data; 
        fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8") );
        imgP.push(fs.createReadStream(path))
	const command = commands.values();
	var group = [], msg = "❀⟩𝗟𝗜𝗦𝗧 𝗢𝗙 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘⟨❀\n";
	let check = true, page_num_input = "";
	let bonus = 0;

	for (const commandConfig of command) {
		if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
		else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
	}

	if (args[0] && ["all", "-a"].includes(args[0].trim())) {
		let all_commands = [];
		group.forEach(commandGroup => {
			commandGroup.cmds.forEach(item => all_commands.push(item));
		});
		let page_num_total = Math.ceil(all_commands.length / 2222222222);
		if (args[1]) {
			check = false;
			page_num_input = parseInt(args[1]);
			if (isNaN(page_num_input)) msg = "ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖼𝗁𝗈𝗈𝗌𝖾 𝖺 𝗇𝗎𝗆𝖻𝖾𝗋";
			else if (page_num_input > page_num_total || page_num_input <= 0) msg = "❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗇𝗎𝗆𝖻𝖾𝗋 𝗒𝗈𝗎 𝗌𝖾𝗅𝖾𝖼𝗍𝖾𝖽 𝗂𝗌 𝗇𝗈𝗍 𝗂𝗇 𝗍𝗁𝖾 𝗅𝗂𝗌𝗍, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇";
			else check = true;
		}
		if (check) {
		index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
			bonus = index_start;
			index_end = (index_start + 2222222222 > all_commands.length) ? all_commands.length : index_start + 2222222222;
			all_commands = all_commands.slice(index_start, index_end);
			all_commands.forEach(e => {
				msg += `\n${index_start+=1}. » ${e}: ${commands.get(e).config.description}`;
			})
			msg += `\n\n➥ 𝗣𝗮𝗴𝗲: 𓊈${page_num_input || 1}/${page_num_total}𓊉`;
			msg += `\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗈 𝗏𝗂𝖾𝗐 𝗈𝗍𝗁𝖾𝗋 𝗉𝖺𝗀𝖾𝗌:\n𝗨𝘀𝗲:\n${prefix}𝗆𝖾𝗇𝗎 [𝖺𝗅𝗅/-𝖺] [𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝗉𝖺𝗀𝖾𝗌]`;
      msg += `\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖼𝖺𝗇 𝗎𝗌𝖾 《${prefix}𝗁𝖾𝗅𝗉𝟦》 𝖺𝗅𝗅 𝗍𝗈 𝗌𝖾𝖾 𝖺𝗅𝗅 𝗈𝖿 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽`
			msg += "ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝖻𝗒 𝗇𝗎𝗆𝖻𝖾𝗋 𝗍𝗈 𝗌𝖾𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖽𝖾𝗍𝖺𝗂𝗅𝗌 𝖺𝗇𝖽 𝗁𝗈𝗐 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽";
		}
		var msgg = {body: msg, attachment: imgP}
		return api.sendMessage(msgg, threadID, (error, info) => {
			if (check) {
				global.client.handleReply.push({
					type: "cmd_info",
					bonus: bonus,
					name: this.config.name,
					messageID: info.messageID,
					content: all_commands
				})
			}
		}, messageID)
	}

	let page_num_total = Math.ceil(group.length / 2222222222);
	if (args[0]) {
		check = false;
		page_num_input = parseInt(args[0]);
		if (isNaN(page_num_input)) msg = "ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗃, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗌𝖾𝗅𝖾𝖼𝗍 𝖺 𝗇𝗎𝗆𝖻𝖾𝗋 𝗒𝗈𝗎 𝖼𝗁𝗈𝗌𝖾𝗇";
		else if (page_num_input > page_num_total || page_num_input <= 0) msg = "❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗇𝗎𝗆𝖻𝖾𝗋 𝗒𝗈𝗎 𝗌𝖾𝗅𝖾𝖼𝗍𝖾𝖽 𝗂𝗌 𝗇𝗈𝗍 𝗂𝗇 𝗍𝗁𝖾 𝗅𝗂𝗌𝗍, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇";
		else check = true;
	}
	if (check) {
		index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
		bonus = index_start;
		index_end = (index_start + 2222222222 > group.length) ? group.length : index_start + 2222222222;
		group = group.slice(index_start, index_end);
		group.forEach(commandGroup => msg += `\n${index_start+=1}. » ${commandGroup.group.toUpperCase()} `);
		msg += `\n\n➥ 𝗣𝗮𝗴𝗲: 【${page_num_input || 1}/${page_num_total}】`;
		msg += `\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗈 𝗏𝗂𝖾𝗐 𝗈𝗍𝗁𝖾𝗋 𝗉𝖺𝗀𝖾𝗌:\n𝗨𝘀𝗲:\n${prefix}𝗆𝖾𝗇𝗎 [𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝗉𝖺𝗀𝖾𝗌]`;
    msg += `\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖼𝖺𝗇 𝗎𝗌𝖾 《${prefix}𝗁𝖾𝗅𝗉𝟦》 𝗍𝗈 𝗌𝖾𝖾 𝖺𝗅𝗅 𝗈𝖿 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌`
		msg += `\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝖻𝗒 𝗇𝗎𝗆𝖻𝖾𝗋 𝗍𝗈 𝗏𝗂𝖾𝗐 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝖻𝗒 𝖼𝖺𝗍𝖾𝗀𝗈𝗋𝗒`;
	}
	var msgg = {body: msg, attachment: imgP}
	return api.sendMessage(msgg, threadID, async (error, info) => {
		global.client.handleReply.push({
			name: this.config.name,
			bonus: bonus,
			messageID: info.messageID,
			content: group
		})
	});
  }