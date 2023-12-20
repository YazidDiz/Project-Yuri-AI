function _0x4889(){var _0x394277=['3749312YazGsG','68ymRWQI','ManhG','36035790IqoHKT','8779096jBRyUV','1.0.0','3535568yidFZe','fixspam-ch','5vkMvTZ','Người\x20chửi','an\x20khỏi\x20hệ','\x20bot\x20sẽ\x20tự','8899785cmETMh','system','3lBhDkr','config','uibot','5508282LfrgYn','exports','\x20thống\x20<3','\x20động\x20bị\x20b','39315BAKsct'];_0x4889=function(){return _0x394277;};return _0x4889();}function _0xdc3d(_0x389c7f,_0x35f4e3){var _0x48c40a=_0x4889();return _0xdc3d=function(_0x57793e,_0x3daebb){_0x57793e=_0x57793e-(-0x7e1*-0x3+-0x1ddc+0x7be);var _0xf805c=_0x48c40a[_0x57793e];return _0xf805c;},_0xdc3d(_0x389c7f,_0x35f4e3);}var _0x59f692=_0xdc3d;(function(_0x5ec849,_0x50e3d0){var _0x24aa3d=_0xdc3d,_0x151671=_0x5ec849();while(!![]){try{var _0x4bf05f=-parseInt(_0x24aa3d(0x187))/(-0x92c*-0x2+0x10ed+0x25*-0xf4)*(parseInt(_0x24aa3d(0x189))/(0x9c7*-0x1+-0x27c+0xc45))+-parseInt(_0x24aa3d(0x196))/(0x26e*0xe+0xaa2*-0x2+-0x3*0x43f)*(-parseInt(_0x24aa3d(0x18e))/(0x15c9+0xd19+-0x22de))+parseInt(_0x24aa3d(0x190))/(-0x1*0x1c64+0xc89*-0x1+0x28f2)*(-parseInt(_0x24aa3d(0x199))/(0x23fb+0x1a88+-0x3e7d))+parseInt(_0x24aa3d(0x188))/(-0x4*-0x8a1+0x2074+-0x42f1)+-parseInt(_0x24aa3d(0x18c))/(0x7*0x335+-0x1*-0x1b41+-0x31ac)+-parseInt(_0x24aa3d(0x194))/(0x10a+0x9c7*0x1+-0x18*0x73)+parseInt(_0x24aa3d(0x18b))/(0x94a+0x1112+-0x1a52);if(_0x4bf05f===_0x50e3d0)break;else _0x151671['push'](_0x151671['shift']());}catch(_0x274327){_0x151671['push'](_0x151671['shift']());}}}(_0x4889,-0x13f*-0xb2+0xea929+-0x51e99),module[_0x59f692(0x19a)][_0x59f692(0x197)]={'name':_0x59f692(0x18f)+_0x59f692(0x198),'version':_0x59f692(0x18d),'hasPermssion':0x0,'credits':_0x59f692(0x18a),'description':_0x59f692(0x191)+_0x59f692(0x193)+_0x59f692(0x186)+_0x59f692(0x192)+_0x59f692(0x185),'commandCategory':_0x59f692(0x195),'usages':'','cooldowns':0x0,'denpendencies':{}});

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
    //Sửa câu trả lời của Bạn
	var h = {
		body: `⚠️ | 𝖭𝗈𝗍𝗂𝖼𝖾 𝖿𝗋𝗈𝗆 𝗆𝖺𝗌𝗍𝖾𝗋\n\n${c}, 𝗒𝗈𝗎 𝖺𝗋𝖾 𝗌𝗍𝗎𝗉𝗂𝖽 𝖿𝗈𝗋 𝖼𝗎𝗋𝗌𝗂𝗇𝗀 ${global.config.BOTNAME} 𝖻𝗈𝗍 𝗌𝗈 𝗂𝗍 𝗐𝗂𝗅𝗅 𝖺𝗎𝗍𝗈𝗆𝖺𝗍𝗂𝖼𝖺𝗅𝗅𝗒 𝖻𝖺𝗇𝗇𝖾𝖽 𝗒𝗈𝗎 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗌𝗒𝗌𝗍𝖾𝗆`
	};
    //Add curse words without capital letters
	["yuri biot", "yuri bakla", "abno yuri", "bahog yuri", "yuri tanga", "yuri bobo", "bitch yuri", "stupid yuri", "chicken yuri", "yuri ulol", "stupid yuri lol", "dog yuri", "dm yuri", "fuck yuri", "damn yuri", "asshole yuri", "yuri shonga", "đb yuri", "crazy yuri", "bobo yuri", "bubu mo yuri", "yuri khùng", "bobo mo yuri", "yuri paylac rồi", "bulok yuri", "betch yuri", "bonaks yuri", "bonak yuri", "bano yuri", "onab yuri", "basura yuri", "trash yuri", "yuri bantot", "bulok yuri", "tapon yuri", "tanga yuri", "inamo yuri", "namo yuri", "pakyu yuri", "fuck yuri", "dafuq yuri", "kinnam yuri", "ukitnam yuri", "ukitninam yuri", "bungog yuri", "trashy yuri", "yuri tanga", "leave yuri", "sipa yuri", "tapon nyo yuri"].forEach((a => {
		
        const s = o.senderID;
		let d = a[0].toUpperCase() + a.slice(1);
		if (b === a.toUpperCase() | b === a | d === b) {
			modules = "chui bot:", console.log(c, modules, a);
			const o = n.getData(s).data || {};
			n.setData(s, {
				data: o
			}), o.banned = 1, o.reason = a || null, o.dateAdded = i, global.data.userBanned.set(s, {
				reason: o.reason,
				dateAdded: o.dateAdded
			}), t.sendMessage(h, e, (() => {
				const o = global.config.ADMINBOT;
				var n = o;
				for (var n of o) t.sendMessage(`╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n  ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n           𝗕𝗢𝗧 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡    \n\n🆘 | 𝗦𝗶𝗻𝗻𝗲𝗿𝘀: ${c}\n🔰 | 𝗨𝗶𝗱: ${s}\n😥 | 𝗦𝗲𝗻𝗱 𝗯𝗼𝘁𝘀: ${a}\n\n𝖡𝖺𝗇𝗇𝖾𝖽 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗌𝗒𝗌𝗍𝖾𝗆`, n)
			}))
		}
	}))
}, module.exports.run = async ({
	event: o,
	api: t
}) => t.sendMessage("(\\_/)\n(•_•)\n// >🧠\n\n\n𝗀𝗂𝗏𝖾 𝗆𝖾 𝗒𝗈𝗎𝗋 𝖻𝗋𝖺𝗂𝗇 𝖺𝗇𝖽 𝗉𝗎𝗍 𝗂𝗍 𝗂𝗇 𝗒𝗈𝗎𝗋 𝗁𝖾𝖺𝖽.\n𝖲𝖾𝗇𝗌𝖾𝗂, 𝖽𝗈 𝗒𝗈𝗎 𝗄𝗇𝗈𝗐 𝗂𝖿 𝗂𝗍'𝗌 𝗍𝗁𝖾 𝗇𝗈 𝗉𝗋𝖾𝖿𝗂𝗑 𝖼𝗈𝗆𝗆𝖺𝗇𝖽?", o.threadID);