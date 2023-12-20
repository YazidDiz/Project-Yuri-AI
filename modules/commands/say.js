module.exports.config = {
	name: "say",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Make the bot return google's audio file via text",
	commandCategory: "translator",
	usages: "1. English: en\n2. Spanish: es\n3. French: fr\n4. German: de\n5. Italian: it\n6. Portuguese: pt\n7. Japanese: ja\n8. Chinese: zh\n9. Russian: ru\n10. Arabic: ar\n11. Hindi: hi\n12. Bengali: bn\n13. Punjabi: pa\n14. Tamil: ta\n15. Korean: ko\n16. Turkish: tr\n17. Polish: pl\n18. Dutch: nl\n19. Swedish: sv\n20. Danish: da\n21. Czech: cs\n22. Finnish: fi\n23. Geek: el\n24. Thai: th [Text]",
	cooldowns: 5,
	dependencies: {
		"path": "",
		"fs-extra": ""
	}
};

module.exports.run = async function({ api, event, args }) {
	try {
		const { createReadStream, unlinkSync } = global.nodemodule["fs-extra"];
		const { resolve } = global.nodemodule["path"];
		var content = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
		var languageToSay = (["en","es","de","fr","it","ja","zh","ko","ru","pt","ar","nl","sv","pl","tr","th","hi","el","fi","cs","da"," tl","pa","ta","bn","pt"].some(item => content.indexOf(item) == 0)) ? content.slice(0, content.indexOf(" ")) : global.config.language;
		var msg = (languageToSay != global.config.language) ? content.slice(3, content.length) : content;
		const path = resolve(__dirname, 'cache', `${event.threadID}_${event.senderID}.mp3`);
		await global.utils.downloadFile(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=${languageToSay}&client=tw-ob`, path);
		return api.sendMessage({ attachment: createReadStream(path)}, event.threadID, () => unlinkSync(path), event.messageID);
	} catch (e) { return console.log(e) };
}
