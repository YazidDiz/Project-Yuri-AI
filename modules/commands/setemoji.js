module.exports.config = {
	name: "setemoji",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "set the group emoji",
	commandCategory: "group",
	usages: "[emoji]",
	cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
	const emoji = args.join(" ")
	api.changeThreadEmoji(`${args.join(" ")}`, event.threadID, event.messagaID);
}