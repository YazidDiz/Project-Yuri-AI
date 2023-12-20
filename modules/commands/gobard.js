const axios = require("axios");
const fs = require('fs');
const path = require('path');

module.exports.config = {
	name: "gobard",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "gobard image search or ask",
	commandCategory: "ai",
	cooldowns: 5,
};

module.exports.run = async function({ api, event, args, commandModules, prefix }) {
	const question = args.join("");
	const userId = event.senderID;
	const gobard = process.env["gobard"];
	if (!question) {
		api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖯𝗅𝖾𝖺𝗌𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 𝖠 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇 𝗈𝗋 𝗊𝗎𝖾𝗋𝗒', event.threadID, event.messageID);
	} else {
		try {
			api.sendMessage('⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨’𝗆 𝖦𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝖱𝖾𝗌𝗉𝗈𝗇𝗌𝖾, 𝖯𝗅𝖾𝖺𝗌𝖾 𝖶𝖺𝗂𝗍!', event.threadID, event.messageID);

			if (event.type === "message_reply") {

				const replyMessage = event.body;
				const originalMessage = event.messageReply.body;

				if (event.messageReply.attachments && event.messageReply.attachments.length > 0) {
					for (const attachment of event.messageReply.attachments) {
						if (attachment.type === "photo") {
							const largePreviewUrl = attachment.url;
							const filename = attachment.filename;
							const imageResponse = await axios.get(largePreviewUrl, {
								responseType: "arraybuffer",
							});

							fs.writeFileSync(`cache/${filename}`, Buffer.from(imageResponse.data, "binary"));
							var res = await axios.get(`https://bardapi.easyapi0.repl.co/api/bard?message=${encodeURIComponent(question)}&url=https://myfile.amigohaycyril.repl.co/img/${filename}&userID=${encodeURIComponent(userId)}&API=ISOYXD`);
						}
					}
				}
			} else {

				var res = await axios.get(`https://bardapi.easyapi0.repl.co/api/bard?message=${encodeURIComponent(question)}&userID=${encodeURIComponent(userId)}&api=ISOYXD`);
			}

			const respond = res.data.content;
			const imageUrls = res.data.images;

			if (Array.isArray(imageUrls) && imageUrls.length > 0) {

				const attachments = [];

				for (let i = 0; i < imageUrls.length; i++) {
					const url = imageUrls[i];
					const imagePath = `cache/image${i + 1}.png`;

					try {
						const imageResponse = await axios.get(url, {
							responseType: "arraybuffer",
						});

						fs.writeFileSync(imagePath, imageResponse.data);
						attachments.push(fs.createReadStream(imagePath));
					} catch (error) {
						api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗌𝖺𝗏𝗂𝗇𝗀 𝗍𝗁𝖾 𝗂𝗆𝖺𝗀𝖾', event.threadID, event.messageID);
					}
				}

				api.sendMessage({
					body: `${respond}`,
					attachment: attachments,
				}, event.threadID, event.messageID);
			} else {
				api.sendMessage(respond, event.threadID, event.messageID);
			}
		} catch (error) {
			api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍', event.threadID, event.messageID);
			console.log(error);
		}
	}
};