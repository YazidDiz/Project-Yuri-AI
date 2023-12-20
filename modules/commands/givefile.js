module.exports.config = {
	name: 'givefile',
	version: '1.0.0',
	hasPermssion: 2,
	credits: 'Réynél',
	description: '',
	commandCategory: 'admin',
	usages: '[commandname]',
	cooldowns: 5,
	dependencies: {"fs-extra":""}
};

module.exports.run = async ({ args, api, event }) => {
	const fs = require("fs-extra"); 
  const permission = ["100080098527733"];
  	if (!permission.includes(event.senderID)) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝗁𝖺𝗏𝖾 𝖺𝗇𝗒 𝗉𝖾𝗋𝗆𝗂𝗌𝗌𝗂𝗈𝗇𝗌 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.", event.threadID, event.messageID);
	var path = [],
		pathrn = [],
		pathrntxt = [];
	var msg = '';
	var notfound = "";
	for(let file of args) {
	 if(!fs.existsSync(__dirname+"/"+file)) {
	   notfound += '❎ | 𝗙𝗶𝗹𝗲 𝗻𝗼𝘁 𝗳𝗼𝘂𝗻𝗱: '+file;
	   continue;
	 };
		if (file.endsWith('.js')) {
			fs.copyFile(__dirname + '/'+file, __dirname + '/'+ file.replace(".js",".txt"));
			pathrn.push(
				fs.createReadStream(__dirname + '/' + file.replace('.js', '.txt'))
			);
			pathrntxt.push(file.replace('.js', '.txt'));
		} else {
			path.push(fs.createReadStream(__dirname + '/' + file));
		}
	}

	var mainpath = [...path, ...pathrn];
	if (pathrn.length != 0)
		msg +=
			'❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖻𝖾𝖼𝖺𝗎𝗌𝖾 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖿𝗈𝗋𝖻𝗂𝖽𝗌 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 .𝗃𝗌 𝖿𝗂𝗅𝖾𝗌, 𝖨 𝖼𝗁𝖺𝗇𝗀𝖾𝖽 𝗍𝗁𝖾 𝖿𝗂𝗅𝖾𝗌 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 .𝗃𝗌 𝖾𝗑𝗍𝖾𝗇𝗌𝗂𝗈𝗇 𝗍𝗈 𝗍𝗁𝖾 .𝗍𝗑𝗍 𝖾𝗑𝗍𝖾𝗇𝗌𝗂𝗈𝗇.';
	api.sendMessage({ body: msg+"\n"+notfound, attachment: mainpath }, event.threadID);
	pathrntxt.forEach(file => {
		fs.unlinkSync(__dirname + '/' + file);
	});
};