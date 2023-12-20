const fs = require("fs");
const request = require("request");
module.exports.config = {
	name: "groupinfo1",
	version: "1.0.0", 
	hasPermssion: 1,
	credits: "Réynél",
	description: "View your box information",
	commandCategory: "group", 
	usages: "[groupinfo1]", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args }) {
	let threadInfo = await api.getThreadInfo(event.threadID);
	var memLength = threadInfo.participantIDs.length;
	let threadMem = threadInfo.participantIDs.length;
	var nameMen = [];
    var gendernam = [];
    var gendernu = [];
    var nope = [];
     for (let z in threadInfo.userInfo) {
     	var gioitinhone = threadInfo.userInfo[z].gender;
     	var nName = threadInfo.userInfo[z].name;
        if(gioitinhone == "MALE"){gendernam.push(z+gioitinhone)}
        else if(gioitinhone == "FEMALE"){gendernu.push(gioitinhone)}
            else{nope.push(nName)}
    };
	var nam = gendernam.length;
    var nu = gendernu.length;
	let qtv = threadInfo.adminIDs.length;
	let sl = threadInfo.messageCount;
	let u = threadInfo.nicknames;
	let icon = threadInfo.emoji;
	let threadName = threadInfo.threadName;
	let id = threadInfo.threadID;
	let sex = threadInfo.approvalMode;
			var pd = sex == false ? 'Turned off' : sex == true ? 'Turned on' : 'Kh';
			var callback = () =>
				api.sendMessage(
					{
						body: `🔧 | 𝗚𝗖 𝗡𝗮𝗺𝗲: ${threadName}\n🔧 | 𝗚𝗿𝗼𝘂𝗽 𝗜𝗗: ${id}\n🔧 | 𝗔𝗽𝗽𝗿𝗼𝘃𝗮𝗹: ${pd}\n🔧 | 𝗘𝗺𝗼𝗷𝗶: ${icon}\n🔧 | 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻: 𝗂𝗇𝖼𝗅𝗎𝖽𝗂𝗇𝗀 ${threadMem} 𝗆𝖾𝗆𝖻𝖾𝗋𝗌\n🔧 | 𝗡𝘂𝗺𝗯𝗲𝗿 𝗼𝗳 𝗺𝗮𝗹𝗲𝘀: ${nam} 𝗆𝖾𝗆𝖻𝖾𝗋𝗌\n🔧 | 𝗡𝘂𝗺𝗯𝗲𝗿 𝗼𝗳 𝗳𝗲𝗺𝗮𝗹𝗲𝘀: ${nu} 𝗆𝖾𝗆𝖻𝖾𝗋𝗌\n🔧 | 𝗪𝗶𝘁𝗵 ${qtv} 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝗍𝗈𝗋𝗌\n🔧 | 𝗧𝗼𝘁𝗮𝗹 𝗻𝘂𝗺𝗯𝗲𝗿 𝗼𝗳 𝗺𝗲𝘀𝘀𝗮𝗴𝗲𝘀: ${sl} 𝗆𝗌𝗀𝗌.`,
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