module.exports.config = {
	name: "menu",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Menu, just a menu to view the uses of every commands",
	usages: "[all/-a] [number of pages]",
	commandCategory: "guides",
	cooldowns: 5
};

module.exports.handleReply = ({ api, event, handleReply }) => {
	let num = parseInt(event.body.split(" ")[0].trim());
	(handleReply.bonus) ? num -= handleReply.bonus : num;
	let msg = "";
	let data = handleReply.content;
	let check = false;
	if (isNaN(num)) msg = "Not a number";
	else if (num > data.length || num <= 0) msg = "Not available";
	else {
		const { commands } = global.client;
		let dataAfter = data[num-=1];
		if (handleReply.type == "cmd_info") {
			let command_config = commands.get(dataAfter).config;
			msg += `${command_config.commandCategory.toLowerCase()}\n`;
			msg += `\n🏷 | 𝗡𝗮𝗺𝗲: ${dataAfter}`;
			msg += `\n📄 | 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${command_config.description}`;
			msg += `\n🎓 | 𝗛𝗼𝘄 𝘁𝗼 𝘂𝘀𝗲: ${(command_config.usages) ? command_config.usages : ""}`;
			msg += `\n⏳ | 𝗪𝗮𝗶𝘁𝗶𝗻𝗴 𝘁𝗶𝗺𝗲: ${command_config.cooldowns || 5}𝘀`;
			msg += `\n🔰 | 𝗣𝗼𝘄𝗲𝗿: ${(command_config.hasPermssion == 0) ? "𝖴𝗌𝖾𝗋" : (command_config.hasPermssion == 1) ? "𝖦𝗋𝗈𝗎𝗉 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝗍𝗈𝗋" : "𝖡𝗈𝗍 𝖺𝖽𝗆𝗂𝗇"}`;
			msg += `\n\n💻 | 𝗠𝗼𝗱𝘂𝗹𝗲 𝗰𝗼𝗱𝗲𝗱 𝗯𝘆: ${command_config.credits}`;
		} else {
			check = true;
			let count = 0;
			msg += `${dataAfter.group.toLowerCase()}\n`;

			dataAfter.cmds.forEach(item => {
				msg += `\n ${count+=1} ${item}: ${commands.get(item).config.description}`;
			})
			msg += "\n━━━━━━━━━━━━━━━━━━━\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝖻𝗒 𝗇𝗎𝗆𝖻𝖾𝗋 𝗍𝗈 𝗏𝗂𝖾𝗐 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖽𝖾𝗍𝖺𝗂𝗅𝗌.";
		}
	}

	return api.sendMessage(msg, event.threadID, (error, info) => {
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

module.exports.run = function({ api, event, args }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	const command = commands.values();
	//*cmd title
	var group = [], msg = "\n";
	//*
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
		let page_num_total = Math.ceil(all_commands.length / 10);
		if (args[1]) {
			check = false;
			page_num_input = parseInt(args[1]);
			if (isNaN(page_num_input)) msg = "Not a number";
			else if (page_num_input > page_num_total || page_num_input <= 0) msg = "Not available";
			else check = true;
		}
		if (check) {
			index_start = (page_num_input) ? (page_num_input * 10) - 10 : 0;
			bonus = index_start;
			index_end = (index_start + 10 > all_commands.length) ? all_commands.length : index_start + 10;
			all_commands = all_commands.slice(index_start, index_end);
			all_commands.forEach(e => {
				msg += `\n${index_start+=1}. ${e}: ${commands.get(e).config.description}`;
			})
			msg += `\n\n📖 | 𝗣𝗮𝗴𝗲: 〘${page_num_input || 1}/${page_num_total}〙`;
			msg += `\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗈 𝗏𝗂𝖾𝗐 𝗈𝗍𝗁𝖾𝗋 𝗉𝖺𝗀𝖾𝗌 𝗎𝗌𝖾:\n${prefix}𝗆𝖾𝗇𝗎 [𝖺𝗅𝗅/-𝖺] [𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝗉𝖺𝗀𝖾𝗌]`;
			msg += "\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝖻𝗒 𝗇𝗎𝗆𝖻𝖾𝗋 𝗍𝗈 𝗏𝗂𝖾𝗐 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖽𝖾𝗍𝖺𝗂𝗅𝗌.";
		}
		return api.sendMessage(msg, threadID, (error, info) => {
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

	let page_num_total = Math.ceil(group.length / 10);
	if (args[0]) {
		check = false;
		page_num_input = parseInt(args[0]);
		if (isNaN(page_num_input)) msg = "Not a number";
		else if (page_num_input > page_num_total || page_num_input <= 0) msg = "Not available";
		else check = true;
	}
	if (check) {
		index_start = (page_num_input) ? (page_num_input * 10) - 10 : 0;
		bonus = index_start;
		index_end = (index_start + 10 > group.length) ? group.length : index_start + 10;
		console.log(page_num_input)
		console.log(index_start)
		console.log(index_end)
		group = group.slice(index_start, index_end);
		group.forEach(commandGroup => msg += `\n${index_start+=1} » ${commandGroup.group.toLowerCase()}`);
		msg += `\n━━━━━━━━━━━━━━━━━━━\n📖 | 𝗣𝗮𝗴𝗲: 〘${page_num_input || 1}/${page_num_total}〙`;
		msg += `\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗈 𝗏𝗂𝖾𝗐 𝖽𝖾𝗍𝖺𝗂𝗅𝗌 𝗈𝖿 𝗈𝗍𝗁𝖾𝗋 𝗉𝖺𝗀𝖾𝗌, 𝗎𝗌𝖾:\n${prefix}𝗆𝖾𝗇𝗎 [𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝗉𝖺𝗀𝖾𝗌]`;
		msg += `\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗆𝖾𝗌𝗌𝖺𝗀𝗐 𝖻𝗒 𝗇𝗎𝗆𝖻𝖾𝗋 𝗍𝗈 𝗏𝗂𝖾𝗐 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝖻𝗒 𝖼𝖺𝗍𝖾𝗀𝗈𝗋𝗒.`;
	}
	return api.sendMessage(msg, threadID, async (error, info) => {
		global.client.handleReply.push({
			name: this.config.name,
			bonus: bonus,
			messageID: info.messageID,
			content: group
		})
	});
		}