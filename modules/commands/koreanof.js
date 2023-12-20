module.exports.config = {
	name: "koreanof",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "english to korean translator",
	commandCategory: "translator",
	usages: `\nTranslator cannot be left blank\n\nHow to use?\n${global.config.PREFIX}koreanof <text>\nelse\n${global.config.PREFIX}koreanof <msg reply>\n\nExample:\n${global.config.PREFIX}koreanof love you\nelse\n${global.config.PREFIX}koreanof <swipe reply>\n`,
	cooldowns: 5,
	dependencies: {
		"request":  ""
	}
};

module.exports.run = async ({ api, event, args }) => {
	const request = global.nodemodule["request"];
	var content = args.join(" ");
	if (content.length == 0 && event.type != "message_reply") return global.utils.throwError(this.config.name, event.threadID,event.messageID);
	var translateThis = content.slice(0, content.indexOf(" ->"));
	var lang = content.substring(content.indexOf(" -> ") + 4);
	if (event.type == "message_reply") {
		translateThis = event.messageReply.body
		if (content.indexOf("-> ") !== -1) lang = content.substring(content.indexOf("-> ") + 3);
		else lang = 'ko';
	}
	else if (content.indexOf(" -> ") == -1) {
		translateThis = content.slice(0, content.length)
		lang = 'ko';
	}
	return request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${translateThis}`), (err, response, body) => {
		if (err) return api.sendMessage("𝗍𝗋𝖺𝗇𝗌𝗅𝖺𝗍𝖾", event.threadID, event.messageID);
		var retrieve = JSON.parse(body);
		var text = '';
		retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
		var fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0]
		api.sendMessage(`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 𝖪𝗈𝗋𝖾𝖺𝗇 𝗍𝗋𝖺𝗇𝗌𝗅𝖺𝗍𝗂𝗈𝗇:\n\n${text}`, event.threadID, event.messageID);
	});
}