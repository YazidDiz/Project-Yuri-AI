module.exports.config = {
	name: "callad",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Clark",
	description: "Report bot's error to admin or comment",
	commandCategory: "reports",
	usages: "[Error encountered or comments]",
	cooldowns: 5
}, module.exports.handleReply = async function({
	api: e,
	args: n,
	event: a,
	Users: s,
	handleReply: o
}) {
	var i = await s.getNameUser(a.senderID);
	switch (o.type) {
		case "reply":
			var t = global.config.ADMINBOT;
			for (let n of t) e.sendMessage({
				body: "📄 | 𝗙𝗲𝗲𝗱𝗯𝗮𝗰𝗸 𝗳𝗿𝗼𝗺 " + i + ":\n" + a.body,
				mentions: [{
					id: a.senderID,
					tag: i
				}]
			}, n, ((e, n) => global.client.handleReply.push({
				name: this.config.name,
				messageID: n.messageID,
				messID: a.messageID,
				author: a.senderID,
				id: a.threadID,
				type: "calladmin"
			})));
			break;
		case "calladmin":
			e.sendMessage({
				body: `━━━━━━━━━━━━━━━━━━━\n❖《《Ｒ.Ｃ.Ｂ. ＹＵＲＩ》》❖\n━━━━━━━━━━━━━━━━━━━\n🗣️ | 𝗠𝗮𝘀𝘁𝗲𝗿:\n${i}\n━━━━━━━━━━━━━━━━━━━\n💭 | 𝗙𝗲𝗲𝗱𝗯𝗮𝗰𝗸:\n${a.body}\n━━━━━━━━━━━━━━━━━━━\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗍𝗈 𝖼𝗈𝗇𝗍𝗂𝗇𝗎𝖾 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗋𝖾𝗉𝗈𝗋𝗍𝗌 𝗍𝗈 𝗆𝖺𝗌𝗍𝖾𝗋\n━━━━━━━━━━━━━━━━━━━`,
				mentions: [{
					tag: i,
					id: a.senderID
				}]
			}, o.id, ((e, n) => global.client.handleReply.push({
				name: this.config.name,
				author: a.senderID,
				messageID: n.messageID,
				type: "reply"
			})), o.messID)
	}
}, module.exports.run = async function({
	api: e,
	event: n,
	args: a,
	Users: s,
	Threads: o
}) {
	if (!a[0]) return e.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗇𝗈𝗍 𝖾𝗇𝗍𝖾𝗋𝖾𝖽 𝗍𝗁𝖾 𝖼𝗈𝗇𝗍𝖾𝗇𝗍 𝗍𝗈 𝗋𝖾𝗉𝗈𝗋𝗍", n.threadID, n.messageID);
	let i = await s.getNameUser(n.senderID);
	var t = n.senderID,
		d = n.threadID;
	let r = (await o.getData(n.threadID)).threadInfo;
	var l = require("moment-timezone").tz("Asia/Manila").format("HH:mm:ss D/MM/YYYY");
	e.sendMessage(`━━━━━━━━━━━━━━━━━━━\n❖《《Ｒ.Ｃ.Ｂ. ＹＵＲＩ》》❖\n━━━━━━━━━━━━━━━━━━━\n🕐 | 𝗧𝗶𝗺𝗲: ${l}\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎𝗋 𝗋𝖾𝗉𝗈𝗋𝗍 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗌𝖾𝗇𝗍 𝗍𝗈 𝗍𝗁𝖾 𝖻𝗈𝗍 𝖺𝖽𝗆𝗂𝗇𝗌`, n.threadID, (() => {
		var s = global.config.ADMINBOT;
		for (let o of s) {
			let s = r.threadName;
			e.sendMessage(`━━━━━━━━━━━━━━━━━━━\n❖《《Ｒ.Ｃ.Ｂ. ＹＵＲＩ》》❖\n━━━━━━━━━━━━━━━━━━━\n\n👤 | 𝗥𝗲𝗽𝗼𝗿𝘁 𝗳𝗿𝗼𝗺:\n${i}\n━━━━━━━━━━━━━━━━━━━\n👨‍👩‍👧‍👧 | 𝗕𝗼𝘅:\n${s}\n━━━━━━━━━━━━━━━━━━━\n🔰 | 𝗜𝗗 𝗕𝗼𝘅:\n${d}\n━━━━━━━━━━━━━━━━━━━\n🔷 | 𝗜𝗗 𝗨𝘀𝗲:\n${t}\n━━━━━━━━━━━━━━━━━━━\n⚠️ | 𝗘𝗿𝗿𝗼𝗿:\n${a.join(" ")}\n━━━━━━━━━━━━━━━━━━━\n🕐 | 𝗧𝗶𝗺𝗲:\n《${l}》\n━━━━━━━━━━━━━━━━━━━`, o, ((e, a) => global.client.handleReply.push({
				name: this.config.name,
				messageID: a.messageID,
				author: n.senderID,
				messID: n.messageID,
				id: d,
				type: "calladmin"
			})))
		}
	}))
};