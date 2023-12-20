module.exports.config = {
	name: "giveaway",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Réynél",
	description: "",
	commandCategory: "other",
	usages: "[create/details/join/roll/end] [IDGiveAway]",
	cooldowns: 5
};

module.exports.handleReaction = async ({ api, event, Users, handleReaction }) => {
	let data = global.data.GiveAway.get(handleReaction.ID);
	if (data.status == "close" || data.status == "ended") return;
	if (event.reaction == undefined) {
		data.joined.splice(data.joined.indexOf(event.userID), 1);
		global.data.GiveAway.set(handleReaction.ID, data);
		var value = await api.getThreadInfo(event.threadID);
		if (!(value.nicknames)[event.userID]) value = (await Users.getInfo(event.userID)).name;
		else value = (value.nicknames)[event.userID];
		return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂 ${value} 𝗅𝖾𝖿𝗍 𝗐𝗂𝗍𝗁 𝖨𝖣: #${handleReaction.ID}`, event.userID);
	}
	data.joined.push(event.userID);
	global.data.GiveAway.set(handleReaction.ID, data);
	var value = await api.getThreadInfo(event.threadID);
	if (!(value.nicknames)[event.userID]) value = (await Users.getInfo(event.userID)).name;
	else value = (value.nicknames)[event.userID];
	return api.sendMessage(`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂 ${value} 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗉𝖺𝗋𝗍𝗂𝖼𝗂𝗉𝖺𝗍𝖾𝖽 𝗂𝗇 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒 𝗐𝗂𝗍𝗁 𝖨𝖣: #${handleReaction.ID}`, event.userID);
}

module.exports.run = async ({ api, event, args, Users }) => {
	if (!global.data.GiveAway) global.data.GiveAway = new Map();
	if (args[0] == "create") {
		let reward = args.slice(1).join(" ");
		let randomNumber = (Math.floor(Math.random() * 100000) + 100000).toString().substring(1);
		var value = await api.getThreadInfo(event.threadID);
		if (!(value.nicknames)[event.senderID]) value = (await Users.getInfo(event.senderID)).name;
		else value = (value.nicknames)[event.senderID];
		api.sendMessage(
			"*✩✧❁ 𝗚𝗶𝘃𝗲 𝗔𝘄𝗮𝘆 ❁✧✩*" +
			"\n𝗖𝗿𝗲𝗮𝘁𝗲𝗱 𝗯𝘆: " + value +
			"\n𝗥𝗲𝘄𝗮𝗿𝗱: " + reward +
			"\n𝗜𝗗 𝗚𝗶𝘃𝗲𝗔𝘄𝗮𝘆: #" + randomNumber +
			"\n𝗥𝗘𝗔𝗖𝗧𝗜𝗢𝗡 𝗧𝗢 𝗧𝗛𝗜𝗦 𝗠𝗘𝗦𝗦𝗔𝗚𝗘 𝗧𝗢 𝗝𝗢𝗜𝗡 𝗚𝗜𝗩𝗘 𝗔𝗪𝗔𝗬"
			, event.threadID, (err, info) => {
				let dataGA = {
					"ID": randomNumber,
					"author": value,
					"authorID": event.senderID,
					"messageID": info.messageID,
					"reward": reward,
					"joined": [],
					"status": "open"
				}
				global.data.GiveAway.set(randomNumber, dataGA);
				client.handleReaction.push({
					name: this.config.name,
					messageID: info.messageID,
					author: event.senderID,
					ID: randomNumber
				})
			}
		)
	}
	else if (args[0] == "details") {
		let ID = args[1].replace("#", "");
		if (!ID) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗆𝗎𝗌𝗍 𝖾𝗇𝗍𝖾𝗋 𝗒𝗈𝗎𝗋 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒 𝖨𝖣 𝗍𝗈 𝖻𝖾 𝖺𝖻𝗅𝖾 𝗍𝗈 𝗏𝗂𝖾𝗐 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.", event.threadID, event.messageID);
		let data = global.data.GiveAway.get(ID);
		if (!data) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒 𝖨𝖣 𝗒𝗈𝗎 𝖾𝗇𝗍𝖾𝗋𝖾𝖽 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍.", event.threadID, event.messageID);
		return api.sendMessage(
			"*✩✧❁ 𝗚𝗶𝘃𝗲 𝗔𝘄𝗮𝘆 ❁✧✩*" +
			"\n𝗖𝗿𝗲𝗮𝘁𝗲𝗱 𝗯𝘆: " + data.author + "(" + data.authorID + ")" +
			"\n𝗥𝗲𝘄𝗮𝗿𝗱: " + data.reward +
			"\n𝗜𝗗 𝗚𝗶𝘃𝗲𝗔𝘄𝗮𝘆: #" + data.ID +
			"\n𝗧𝗼𝘁𝗮𝗹 𝗻𝘂𝗺𝗯𝗲𝗿 𝗼𝗳 𝗺𝗲𝗺𝗯𝗲𝗿𝘀 𝘄𝗵𝗼 𝗽𝗮𝗿𝘁𝗶𝗰𝗶𝗽𝗮𝘁𝗲𝗱 𝗶𝗻 𝘁𝗵𝗲 𝗴𝗶𝘃𝗲𝗮𝘄𝗮𝘆: " + data.joined.length + " 𝗣𝗲𝗼𝗽𝗹𝗲" +
			"\n𝗦𝘁𝗮𝘁𝘂𝘀: " + data.status
			, event.threadID, data.messageID
		);
	}
	else if (args[0] == "join") {
		let ID = args[1].replace("#", "");
		if (!ID) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗆𝗎𝗌𝗍 𝖾𝗇𝗍𝖾𝗋 𝗒𝗈𝗎𝗋 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒 𝖨𝖣 𝗍𝗈 𝗉𝖺𝗋𝗍𝗂𝖼𝗂𝗉𝖺𝗍𝖾 𝗂𝗇 𝗍𝗁𝖾 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒.", event.threadID, event.messageID);
		let data = global.data.GiveAway.get(ID);
		if (!data) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒 𝖨𝖣 𝗒𝗈𝗎 𝖾𝗇𝗍𝖾𝗋𝖾𝖽 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍.", event.threadID, event.messageID);
		if (data.joined.includes(event.senderID)) return api.sendMessage("✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝖾𝗇𝗍𝖾𝗋𝖾𝖽 𝗍𝗁𝗂𝗌 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒.", event.threadID);
		data.joined.push(event.senderID);
		global.data.GiveAway.set(ID, data);
		var value = await api.getThreadInfo(event.threadID);
		if (!(value.nicknames)[event.userID]) value = (await Users.getInfo(event.senderID)).name;
		else value = (value.nicknames)[event.senderID];
		return api.sendMessage(`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂 ${value} 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗉𝖺𝗋𝗍𝗂𝖼𝗂𝗉𝖺𝗍𝖾𝖽 𝗂𝗇 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒 𝗐𝗂𝗍𝗁 𝖨𝖣: #${ID}`, event.senderID);
	}
	else if (args[0] == "roll") {
		let ID = args[1].replace("#", "");
		if (!ID) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗆𝗎𝗌𝗍 𝖾𝗇𝗍𝖾𝗋 𝗒𝗈𝗎𝗋 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒 𝖨𝖣 𝗍𝗈 𝗉𝖺𝗋𝗍𝗂𝖼𝗂𝗉𝖺𝗍𝖾 𝗂𝗇 𝗍𝗁𝖾 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒.", event.threadID, event.messageID);
		let data = global.data.GiveAway.get(ID);
		if (!data) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒 𝖨𝖣 𝗒𝗈𝗎 𝖾𝗇𝗍𝖾𝗋𝖾𝖽 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍.", event.threadID, event.messageID);
		if (data.authorID !== event.senderID) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖺𝗋𝖾 𝗇𝗈𝗍 𝗍𝗁𝖾 𝗁𝗈𝗌𝗍 𝗈𝖿 𝗍𝗁𝗂𝗌 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒 𝖨𝖣", event.threadID, event.messageID);
		let winner = data.joined[Math.floor(Math.random() * data.joined.length)];
		let userInfo = await Users.getInfo(winner);
		var name = userInfo.name;
		return api.sendMessage({
			body: `🎉 | 𝖲𝖾𝗇𝗌𝖾𝗂 ${name}, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗐𝗈𝗇 𝗍𝗁𝖾 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒 𝗐𝗂𝗍𝗁 𝖨𝖣: #${data.ID}\n𝖪𝗂𝗇𝖽𝗅𝗒 𝖼𝗈𝗇𝗍𝖺𝖼𝗍 𝗎𝗌: ${data.author}(https://fb.me/${data.authorID})`,
			mentions: [{
				tag: name,
				id: winner
			}]
		}, event.threadID, event.messageID);
	}
	else if (args[0] == "end") {
		let ID = args[1].replace("#", "");
		if (!ID) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗆𝗎𝗌𝗍 𝖾𝗇𝗍𝖾𝗋 𝗒𝗈𝗎𝗋 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒 𝖨𝖣 𝗍𝗈 𝗉𝖺𝗋𝗍𝗂𝖼𝗂𝗉𝖺𝗍𝖾 𝗂𝗇 𝗍𝗁𝖾 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒.", event.threadID, event.messageID);
		let data = global.data.GiveAway.get(ID);
		if (!data) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒 𝖨𝖣 𝗒𝗈𝗎 𝖾𝗇𝗍𝖾𝗋𝖾𝖽 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍.", event.threadID, event.messageID);
		if (data.authorID !== event.senderID) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖺𝗋𝖾 𝗇𝗈𝗍 𝗍𝗁𝖾 𝗁𝗈𝗌𝗍 𝗈𝖿 𝗍𝗁𝗂𝗌 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒 𝖨𝖣", event.threadID, event.messageID);
		data["status"] = "ended";
		global.data.GiveAway.set(ID, data);
		api.unsendMessage(data.messageID);
		return api.sendMessage(`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒 𝖨𝖣 𝗁𝖺𝗌 𝖺𝗇 𝖨𝖣: #${data.ID} 𝖾𝗇𝖽𝖾𝖽 𝖻𝗒 ${data.author}`, event.threadID, event.messageID);
	}
	else return global.utils.throwError(this.config.name, event.threadID, event.messageID);
                                                     }