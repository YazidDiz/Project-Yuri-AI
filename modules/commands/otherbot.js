module.exports.config = {
  name: "otherbot",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Clark",
  description: "ban otherbot",
  commandCategory: "admin",
  usages: "[otherbot]",
  cooldowns: 0
};
module.exports.handleEvent = async ({
	event: o,
	api: t,
	Users: n
}) => {
	var {
		threadID: e,
		messageID: a,
		body: b,
		senderID: s,
		reason: d
	} = o;
	const i = require("moment-timezone").tz("Asia/Manila").format("HH:MM:ss L");
	if (s == t.getCurrentUserID()) return;
	let c = await n.getNameUser(o.senderID);
	var h = {
		body: `━━━━━━━━━━━━━━━━━━━\n❖《《Ｒ.Ｃ.Ｂ. ＹＵＲＩ》》❖\n━━━━━━━━━━━━━━━━━━━\n🚫 | 𝖲𝖾𝗇𝗌𝖾𝗂 ${c}\n𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝖻𝖾𝖾𝗇 𝖽𝖾𝗍𝖾𝖼𝗍𝖾𝖽 𝖺𝗌 𝖺 𝖻𝗈𝗍 𝗌𝗈 𝗒𝗈𝗎 𝗐𝗂𝗅𝗅 𝖻𝖾 𝖻𝖺𝗇𝗇𝖾𝖽 𝗍𝗈 𝖺𝗏𝗈𝗂𝖽 𝗌𝗉𝖺𝗆𝗆𝗂𝗇𝗀.`
	};
    //Add curse words without capital letters
	["Other Bot"].forEach((a => { 
		
        const s = o.senderID;
    let haha = o.body;
	if (haha.includes("your keyboard level has reached level") || haha.includes("Command not found") || haha.includes("The command you used") || haha.includes("Uy may lumipad") || haha.includes("Unsend this message") || haha.includes("You are unable to use bot") || haha.includes("Uy may lumipad") || haha.includes("just removed 1 Attachments") || haha.includes("message removedcontent") || haha.includes("The current preset is") || haha.includes("Here Is My Prefix") || haha.includes("just removed 1 attachment.") || haha.includes("Unable to re-add members")) {
			modules = "[ BOT BAN ]", console.log(c, modules, a);
			const o = n .getData(s).data || {};
			n.setData(s, {
				data: o
			}), o.banned = 1, o.reason = a || null, o.dateAdded = i, global.data.userBanned.set(s, {
				reason: o.reason,
				dateAdded: o.dateAdded
			}), t.sendMessage(h, e, (() => {
				const o = global.config.ADMINBOT;
				var n = o;
				for (var n of o) t.sendMessage(`╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n             ⚠ 𝗪𝗔𝗥𝗡𝗜𝗡𝗚 ⚠\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n🤖 | 𝗡𝗮𝗺𝗲: ${c}\n🤖 | 𝗕𝗼𝘁 𝗨𝗜𝗗: ${s}\n━━━━━━━━━━━━━━━━━━━\nℹ️ | 𝖳𝗁𝗂𝗌 𝗎𝗌𝖾𝗋 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖽𝖾𝗍𝖾𝖼𝗍𝖾𝖽 𝖺𝗌 𝖺 𝖻𝗈𝗍 𝗌𝗈 𝗂𝗍 𝗐𝗂𝗅𝗅 𝖻𝖾 𝖺𝗎𝗍𝗈𝗆𝖺𝗍𝗂𝖼𝖺𝗅𝗅𝗒 𝖻𝖺𝗇 𝗍𝗈 𝖺𝗏𝗈𝗂𝖽 𝗌𝗉𝖺𝗆𝗆𝗂𝗇𝗀.\n❍━━━━━━━━━━━━━━━━❍\n꙳☪︎●◉✿𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜✿◉●☪︎꙳\n❍━━━━━━━━━━━━━━━━❍`, n)
			}))
		} 
	})) 
}, module.exports.run = async ({
	event: o,
	api: t
}) => t.sendMessage("━━━━━━━━━━━━━━━━━━━\n❖《《Ｒ.Ｃ.Ｂ. ＹＵＲＩ》》❖\n━━━━━━━━━━━━━━━━━━━\nℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗂𝗌 𝗎𝗌𝖾𝖽 𝗍𝗈 𝖽𝖾𝗍𝖾𝖼𝗍 𝗈𝗍𝗁𝖾𝗋 𝖻𝗈𝗍𝗌 𝖺𝗇𝖽 𝖻𝖺𝗇 𝗍𝗁𝖾𝗆 𝗂𝗆𝗆𝖾𝖽𝗂𝖺𝗍𝖾𝗅𝗒 𝗍𝗈 𝖺𝗏𝗈𝗂𝖽 𝗌𝗉𝖺𝗆𝗆𝗂𝗇𝗀.", o.threadID);