module.exports.config = {
	name: "group",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
  description: "Parent group settingst.",
	commandCategory: "group",
	usages: "[name/emoji/admin/image/info]",
	cooldowns: 1,
	dependencies: {
		"request":"",
		"fs-extra":""
}
};

module.exports.run = async({api, event, args}) => {
	const fs = global.nodemodule["fs-extra"];
	const request = global.nodemodule["request"];
	 if (args.length == 0) return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖼𝖺𝗇 𝗎𝗌𝖾:\n${global.config.PREFIX}𝖦𝗋𝗈𝗎𝗉𝖾𝗆𝗈𝗃𝗂 [𝗂𝖼𝗈𝗇]\n\n${global.config.PREFIX}𝖦𝗋𝗈𝗎𝗉𝗇𝖺𝗆𝖾 [𝗀𝗋𝗈𝗎𝗉 𝗇𝖺𝗆𝖾]\n\n${global.config.PREFIX}𝖦𝗋𝗈𝗎𝗉𝗂𝗆𝖺𝗀𝖾 [𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝟣 𝗂𝗆𝖺𝗀𝖾]\n\n${global.config.PREFIX}𝖦𝖼𝖺𝖽𝗆𝗂𝗇 [@mention] => 𝖨𝗍 𝗐𝗂𝗅𝗅 𝗀𝗂𝗏𝖾 𝖰𝖳𝖵 𝗍𝗈 𝗍𝗁𝖾 𝗉𝖾𝗋𝗌𝗈𝗇 𝗆𝖾𝗇𝗍𝗂𝗈𝗇𝖾𝖽\n\n${global.config.PREFIX}𝖦𝗋𝗈𝗎𝗉𝗂𝗇𝖿𝗈 => 𝖺𝗅𝗅 𝗀𝗋𝗈𝗎𝗉 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇!
`, event.threadID, event.messageID);


	if (args[0] == "name") {
var content = args.join(" ");
var c = content.slice(4, 99) || event.messageReply.body;
api.setTitle(`${c } `, event.threadID);
 }
	if (args[0] == "emoji") {
const name = args[1] || event.messageReply.body;
api.changeThreadEmoji(name, event.threadID)

 }
if(args[0] == "me"){
	 if (args[1] == "admin") {
		const threadInfo = await api.getThreadInfo(event.threadID)
		const find = threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID());
		if(!find) api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨 𝗇𝖾𝖾𝖽 𝗍𝗈 𝖻𝖾 𝖺𝖽𝗆𝗂𝗇 𝗍𝗈 𝗎𝗌𝖾, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖺𝖽𝖽 𝖺𝗇𝖽 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇", event.threadID, event.messageID)
	  else if(!global.config.ADMINBOT.includes(event.senderID)) api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗋𝗂𝗀𝗁𝗍 𝖼𝗎𝗇𝗍 𝗉𝗈𝗐𝖾𝗋𝗌", event.threadID, event.messageID)
     else api.changeAdminStatus(event.threadID, event.senderID, true);
     }
} 
if (args[0] == "admin") {

if (args.join().indexOf('@') !== -1){
	 namee = Object.keys(event.mentions)}
else namee = args[1]
if (event.messageReply) {namee = event.messageReply.senderID}

const threadInfo = await api.getThreadInfo(event.threadID)
const findd = threadInfo.adminIDs.find(el => el.id == namee);
const find = threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID());
const finddd = threadInfo.adminIDs.find(el => el.id == event.senderID);

if (!finddd) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖺𝗋𝖾 𝗇𝗈𝗍 𝖺 𝖻𝗈𝗑 𝖺𝖽𝗆𝗂𝗇?", event.threadID, event.messageID);		
if(!find) {api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖽𝗈𝗇'𝗍 𝗍𝗁𝗋𝗈𝗐 𝗍𝗁𝖾 𝖺𝖽𝗆𝗂𝗇 𝗎𝗌𝗂𝗇𝗀 𝗋𝗈𝖼𝗄?", event.threadID, event.messageID)}
if (!findd) {api.changeAdminStatus(event.threadID, namee, true);}
else api.changeAdminStatus(event.threadID, namee, false)
 }

if (args[0] == "image") {

if (event.type !== "message_reply") return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗆𝗎𝗌𝗍 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝖺 𝖼𝖾𝗋𝗍𝖺𝗂𝗇 𝖺𝗎𝖽𝗂𝗈, 𝗏𝗂𝖽𝖾𝗈, 𝗈𝗋 𝗉𝗁𝗈𝗍𝗈", event.threadID, event.messageID);
	if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗆𝗎𝗌𝗍 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝖺 𝖼𝖾𝗋𝗍𝖺𝗂𝗇 𝖺𝗎𝖽𝗂𝗈, 𝗏𝗂𝖽𝖾𝗈, 𝗈𝗋 𝗉𝗁𝗈𝗍𝗈", event.threadID, event.messageID);
	if (event.messageReply.attachments.length > 1) return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗋𝖾𝗉𝗅𝗒 𝗈𝗇𝗅𝗒 𝗈𝗇𝖾 𝖺𝗎𝖽𝗂𝗈, 𝗏𝗂𝖽𝖾𝗈, 𝗈𝗋 𝗉𝗁𝗈𝗍𝗈`, event.threadID, event.messageID);
	 var callback = () => api.changeGroupImage(fs.createReadStream(__dirname + "/cache/1.png"), event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));	
      return request(encodeURI(event.messageReply.attachments[0].url)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
      };
if (args[0] == "info") {
		var threadInfo = await api.getThreadInfo(event.threadID);
		let threadMem = threadInfo.participantIDs.length;
	var gendernam = [];
	var gendernu = [];
	var nope = [];
	for (let z in threadInfo.userInfo) {
		var gioitinhone = threadInfo.userInfo[z].gender;

		var nName = threadInfo.userInfo[z].name;

		if (gioitinhone == 'MALE') {
			gendernam.push(z + gioitinhone);
		} else if (gioitinhone == 'FEMALE') {
			gendernu.push(gioitinhone);
		} else {
			nope.push(nName);
		}
	}
	var nam = gendernam.length;
	var nu = gendernu.length;
	let qtv = threadInfo.adminIDs.length;
	let sl = threadInfo.messageCount;
	let icon = threadInfo.emoji;
	let threadName = threadInfo.threadName;
	let id = threadInfo.threadID;
	var listad = '';
	var qtv2 = threadInfo.adminIDs;
	for (let i = 0; i < qtv2.length; i++) {
const infu = (await api.getUserInfo(qtv2[i].id));
const name = infu[qtv2[i].id].name;
		listad += '•' + name + '\n';
	}
	let sex = threadInfo.approvalMode;
	var pd = sex == false ? 'Turn off' : sex == true ? 'Turn on' : 'Kh';
	var pdd = sex == false ? '❎' : sex == true ? '✅' : '⭕';
	 var callback = () =>
				api.sendMessage(
					{
						body: `╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n  ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n     𝗚𝗿𝗼𝘂𝗽 𝗖𝗵𝗮𝘁 𝗡𝗮𝗺𝗲: ${threadName}\n𝗚𝗿𝗼𝘂𝗽 𝗜𝗗: ${id}\n${pdd} 𝗔𝗽𝗽𝗿𝗼𝘃𝗲: ${pd}\n 𝗘𝗺𝗼𝗷𝗶: ${icon}\n 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻:\n 𝗧𝗼𝘁𝗮𝗹 ${threadMem} 𝗺𝗲𝗺𝗯𝗲𝗿𝘀\n 𝗠𝗮𝗹𝗲 ${nam} 𝗺𝗲𝗺𝗯𝗲𝗿𝘀 \n 𝗙𝗲𝗺𝗮𝗹𝗲: ${nu} 𝗺𝗲𝗺𝗯𝗲𝗿𝘀\n\n 𝗪𝗶𝘁𝗵 ${qtv} 𝗔𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝘁𝗼𝗿𝘀 𝗶𝗻𝗰𝗹𝘂𝗱𝗲:\n${listad}\n 𝗧𝗼𝘁𝗮𝗹 𝗻𝘂𝗺𝗯𝗲𝗿 𝗼𝗳 𝗺𝗲𝘀𝘀𝗮𝗴𝗲𝘀: ${sl} 𝗺𝘀𝗴𝘀.\n\n꙳☪︎●◉✿𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜✿◉●☪︎꙳`,
						attachment: fs.createReadStream(__dirname + '/cache/1.png')
					},
					event.threadID,
					() => fs.unlinkSync(__dirname + '/cache/1.png'),
					event.messageID
				);
			return request(encodeURI(`${threadInfo.imageSrc}`))
				.pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
				.on('close', () => callback());

	}	  
}