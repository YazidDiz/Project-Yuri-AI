module.exports.config = {
	name: "boxinform",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description:"Count everything in the chat box",
	commandCategory: "group",
	usages: "[message/admin/member/male/female/gei/allgroup/alluser]",
	cooldowns: 5,
	envConfig: {}
};

module.exports.run = async function({ api,Threads,Users, event, args, client, __GLOBAL }) {
	//Làm cái gì ở đây tuỳ thuộc vào bạn ¯\_(ツ)_/¯ 
	var input =args.join();
	    var nameMen = [];
    var gendernam = [];
    var gendernu = [];
    var nope = [];
    		let threadInfo = await api.getThreadInfo(event.threadID);
        for (let z in threadInfo.userInfo) {
     	var gioitinhone = threadInfo.userInfo[z].gender;
        if(gioitinhone == "MALE"){gendernam.push(gioitinhone)
        }else{
        		if (gioitinhone=="FEMALE"){gendernu.push(gioitinhone)
        			}else{nope.push(gioitinhone)}}}

		var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
	var boxget = await Threads.getAll(['threadID'])
var userget = await Users.getAll(['userID'])
		if (input==""){out(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾𝗇'𝗍 𝖾𝗇𝗍𝖾𝗋𝖾𝖽 𝖺 𝗍𝖺𝗀 𝗒𝖾𝗍, 𝗎𝗌𝖾 𝗍𝗁𝖾 𝖿𝗈𝗅𝗅𝗈𝗐𝗂𝗇𝗀 𝗍𝖺𝗀𝗌: 𝗆𝖾𝗌𝗌𝖺𝗀𝖾/𝖺𝖽𝗆𝗂𝗇/𝗆𝖾𝗆𝖻𝖾𝗋/𝗆𝖺𝗅𝖾/𝖿𝖾𝗆𝖺𝗅𝖾/𝗀𝖾𝗂/𝖺𝗅𝗅𝗀𝗋𝗈𝗎𝗉/𝖺𝗅𝗅𝗎𝗌𝖾𝗋`)}
		if (input=="message") {out(`ℹ️ | 𝖳𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉 𝖽𝗈𝖾𝗌 ${threadInfo.messageCount} 𝗆𝖾𝗌𝗌𝖺𝗀𝖾`)}
		if (input=="admin"){out(`ℹ️ | 𝖸𝗈𝗎𝗋 𝗀𝗋𝗈𝗎𝗉 𝗁𝖺𝗌 𝗂𝗍 ${threadInfo.adminIDs.length} 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝗍𝗈𝗋`)}
		if (input=="member"){out(`ℹ️ | 𝖳𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉 𝖽𝗈𝖾𝗌 ${threadInfo.participantIDs.length} 𝗆𝖾𝗆𝖻𝖾𝗋`)}
		if (input=="male"){out(`ℹ️ | 𝖳𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉 𝖽𝗈𝖾𝗌 ${gendernam.length} 𝗆𝖾𝗆𝖻𝖾𝗋𝗌 𝖺𝗋𝖾 𝗆𝖺𝗅𝖾`)}
		if (input=="female"){out(`ℹ️ | 𝖳𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉 𝖽𝗈𝖾𝗌 ${gendernu.length} 𝗆𝖾𝗆𝖻𝖾𝗋𝗌 𝖺𝗋𝖾 𝖿𝖾𝗆𝖺𝗅𝖾`)}
		if (input=="gei"){out(`ℹ️ | 𝖳𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉 𝖽𝗈𝖾𝗌 ${nope.length} 𝗆𝖾𝗆𝖻𝖾𝗋 𝗂𝗌 𝖦𝖾𝗂`)}
		if (input=="allgroup"){out(`ℹ️ | 𝖳𝗈𝗍𝖺𝗅 𝗒𝖾𝗌 ${boxget.length} 𝖢𝗁𝖺𝗍 𝗀𝗋𝗈𝗎𝗉𝗌 𝗎𝗌𝖾 𝖻𝗈𝗍𝗌`)}
		if (input=="alluser"){out(`ℹ️ | 𝖳𝗈𝗍𝖺𝗅 𝗒𝖾𝗌 ${userget.length} 𝗎𝗌𝖾𝗋𝗌 𝗎𝗌𝖾 𝖻𝗈𝗍𝗌`)}
}
