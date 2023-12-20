module.exports.config = {
	name: "mallboard",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Réynél",
	description: "mallboard [text]",
	commandCategory: "board",
	usages: "[text]",
	cooldowns: 5,
  dependencies: { 
    "canvas": "",  
    "axios": ""}
};

module.exports.wrapText = (ctx, text, maxWidth) => {
	return new Promise(resolve => {
		if (ctx.measureText(text).width < maxWidth) return resolve([text]);
		if (ctx.measureText('W').width > maxWidth) return resolve(null);
		const words = text.split(' ');
		const lines = [];
		let line = '';
		while (words.length > 0) {
			let split = false;
			while (ctx.measureText(words[0]).width >= maxWidth) {
				const temp = words[0];
				words[0] = temp.slice(0, -1);
				if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
				else {
					split = true;
					words.splice(1, 0, temp.slice(-1));
				}
			}
			if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
			else {
				lines.push(line.trim());
				line = '';
			}
			if (words.length === 0) lines.push(line.trim());
		}
		return resolve(lines);
	});
} 

module.exports.run = async function({ api, event, args, client, __GLOBAL }) {
	let { senderID, threadID, messageID } = event;
	const { loadImage, createCanvas } = require("canvas");
	const fs = require("fs-extra");
	const axios = require("axios")
	let avatar = __dirname + '/cache/avt.png';
	let pathImg = __dirname + '/cache/porn.png';
	var text = args.join(" ");
	let name = (await api.getUserInfo(senderID))[senderID].name
	var linkAvatar = (await api.getUserInfo(senderID))[senderID].thumbSrc;
	if (!text) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗎𝗍 𝖺 𝗆𝖾𝗌𝗌𝖺𝗀𝖾", threadID, messageID);
	let getAvatar = (await axios.get(linkAvatar, { responseType: 'arraybuffer' })).data;
	let getPorn = (await axios.get(`https://imgur.com/nRoikQP.png`, { responseType: 'arraybuffer' })).data;
	fs.writeFileSync(avatar, Buffer.from(getAvatar, 'utf-8'));
	fs.writeFileSync(pathImg, Buffer.from(getPorn, 'utf-8'));
	let image = await loadImage(avatar);
	let baseImage = await loadImage(pathImg);
	let canvas = createCanvas(baseImage.width, baseImage.height);
	let ctx = canvas.getContext("2d");
	ctx.drawImage(baseImage, 5, 5, canvas.width, canvas.height);
	ctx.drawImage(image, 351, 320, 55, 55);
	ctx.font = "700 17px Arial";
	ctx.fillStyle = "#fffff";
	ctx.textAlign = "start";
	ctx.fillText(name, 407, 340);
	ctx.font = "400 18px Arial";
	ctx.fillStyle = "#fffff";
	ctx.textAlign = "start";
	let fontSize = 10;
	while (ctx.measureText(text).width > 2600) {
		fontSize--;
		ctx.font = `400 ${fontSize}px Arial, sans-serif`;
	}
	const lines = await this.wrapText(ctx, text, 1160);
	ctx.fillText(lines.join('\n'), 352,392);
	ctx.beginPath();
	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(pathImg, imageBuffer);
	fs.removeSync(avatar);
	return api.sendMessage({ body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾’𝗌 𝗒𝗈𝗎𝗋 𝗆𝖺𝗅𝗅𝖻𝗈𝖺𝗋𝖽 𝗆𝖾𝗌𝗌𝖺𝗀𝖾:", attachment: fs.createReadStream(pathImg) }, threadID, () => fs.unlinkSync(pathImg), messageID);        
}