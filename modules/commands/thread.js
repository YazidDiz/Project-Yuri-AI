module.exports.config = {
	name: "thread",
	version: "0.0.3",
	hasPermssion: 2,
	credits: "Réynél",
	description: "Ban or unblock a group",
	commandCategory: "system",
	usages: "[unban/ban/search] [ID or text]",
	cooldowns: 5
};

module.exports.handleReaction = async ({ event, api, Threads, handleReaction }) => {
	if (parseInt(event.userID) !== parseInt(handleReaction.author)) return;
	switch (handleReaction.type) {
		case "ban": {
			const data = (await Threads.getData(handleReaction.target)).data || {};
			data.banned = 1;
			await Threads.setData(handleReaction.target, { data });
			global.data.threadBanned.set(parseInt(handleReaction.target), 1);
			api.sendMessage(`《${handleReaction.target}》\n\n𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗀𝗋𝖺𝗇𝗍𝖾𝖽 𝖻𝖺𝗇 𝗂𝗇 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉.`, event.threadID, () => api.unsendMessage(handleReaction.messageID));
			break;
		}
		case "unban": {
			const data = (await Threads.getData(handleReaction.target)).data || {};
			data.banned = 0;
			await Threads.setData(handleReaction.target, { data });
			global.data.threadBanned.delete(parseInt(handleReaction.target), 1);
			api.sendMessage(`《${handleReaction.target}》\n\n𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗎𝗇𝖻𝖺𝗇𝗇𝖾𝖽 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉.`, event.threadID, () => api.unsendMessage(handleReaction.messageID));
			break;
		}
		default:
			break;
	}
}

module.exports.run = async ({ event, api, args, Threads }) => {
    let content = args.slice(1, args.length);
	switch (args[0]) {
		case "ban": {
			if (content.length == 0) return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎 𝗇𝖾𝖾𝖽 𝗍𝗈 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝖨𝖣 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖻𝖺𝗇.", event.threadID);
			for (let idThread of content) {
				idThread = parseInt(idThread);
				if (isNaN(idThread)) return api.sendMessage(`《${idThread}》\n\n𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗇𝗈𝗍 𝗀𝗋𝗈𝗎𝗉 𝖨𝖣.`, event.threadID);
				let dataThread = (await Threads.getData(idThread.toString()));
				if (!dataThread) return api.sendMessage(`《${idThread}》\n\n𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍 𝗂𝗇 𝗆𝗒 𝖽𝖺𝗍𝖺𝖻𝖺𝗌𝖾.`, event.threadID);
				if (dataThread.banned) return api.sendMessage(`《${idThread}》\n\n𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗀𝗋𝗈𝗎𝗉 𝗂𝗌 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 𝖻𝖺𝗇𝗇𝖾𝖽.`, event.threadID);
				return api.sendMessage(`《${idThread}》\n\n𝖬𝖺𝗌𝗍𝖾𝗋, 𝖽𝗈 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖻𝖺𝗇 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉?\n\nℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝖺𝖼𝗍 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗍𝗈 𝖻𝖺𝗇.`, event.threadID, (error, info) => {
					global.client.handleReaction.push({
						name: this.config.name,
						messageID: info.messageID,
						author: event.senderID,
						type: "ban",
						target: idThread
					});
				})
			}
			break;
		}
		case "unban": {
			if (content.length == 0) return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎 𝗇𝖾𝖾𝖽 𝗍𝗈 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝖨𝖣 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖻𝖺𝗇.", event.threadID);
			for (let idThread of content) {
				idThread = parseInt(idThread);
				if (isNaN(idThread)) return api.sendMessage(`《${idThread}》\n\n𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗇𝗈𝗍 𝖺 𝗀𝗋𝗈𝗎𝗉 𝖨𝖣.`, event.threadID);
				let dataThread = (await Threads.getData(idThread)).data;
				if (!dataThread) return api.sendMessage(`《${idThread}》\n\n𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍 𝗂𝗇 𝗆𝗒 𝖽𝖺𝗍𝖺𝖻𝖺𝗌𝖾.`, event.threadID);
				if (dataThread.banned != 1) return api.sendMessage(`《${idThread}》\n\n𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉 𝗂𝗌 𝗇𝗈𝗍 𝖻𝖺𝗇𝗇𝖾𝖽 𝖻𝖾𝖿𝗈𝗋𝖾.`, event.threadID);
				return api.sendMessage(`《${idThread}》\n\n𝖬𝖺𝗌𝗍𝖾𝗋, 𝖽𝗈 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗎𝗇𝖻𝖺𝗇 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉?\n\nℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝖺𝖼𝗍 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗍𝗈 𝗎𝗇𝖻𝖺𝗇 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉.`, event.threadID, (error, info) => {
					global.client.handleReaction.push({
						name: this.config.name,
						messageID: info.messageID,
						author: event.senderID,
						type: "unban",
						target: idThread
					});
				})
			}
			break;
		}
		case "search": {
			let contentJoin = content.join(" ");
			let getThreads =  (await Threads.getAll(['threadID', 'name'])).filter(item => !!item.name);
			let matchThreads = [], a = '', b = 0;
			getThreads.forEach(i => {
				if (i.name.toLowerCase().includes(contentJoin.toLowerCase())) {
					matchThreads.push({
						name: i.name,
						id: i.threadID
					});
				}
			});
			matchThreads.forEach(i => a += `\n${b += 1}. ${i.name} - ${i.id}`);
			(matchThreads.length > 0) ? api.sendMessage(`🔍 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 𝗋𝖾𝗌𝗎𝗅𝗍 𝗆𝖺𝗍𝖼𝗁𝖾𝖽 𝗂𝗇 𝗒𝗈𝗎𝗋 𝗌𝖾𝖺𝗋𝖼𝗁: \n《${a}》`, event.threadID) : api.sendMessage("❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾 𝗂𝗌 𝗇𝗈 𝗋𝖾𝗌𝗎𝗅𝗍𝗌 𝖿𝗈𝗎𝗇𝖽 𝖻𝖺𝗌𝖾𝖽 𝗈𝗇 𝗒𝗈𝗎𝗋 𝗌𝖾𝖺𝗋𝖼𝗁.", event.threadID);
			break;
		}
		default: {
			return global.utils.throwError(this.config.name, event.threadID, event.messageID)
		}
	}
}
