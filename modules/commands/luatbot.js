const fs = require("fs");
module.exports.config = {
	name: "botrule",
  version: "1.0.1",
	hasPermssion: 0,
	credits: "Réynél", 
	description: "no prefix needed the bot will tell its rules of using",
	commandCategory: "auto-resp",
	usages: "[rule]",
  cooldowns: 1, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("about")==0 || (event.body.indexOf("About")==0 || (event.body.indexOf("rule")==0 || (event.body.indexOf("Rule")==0)))) {
    const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Manila").format("HH:mm:ss || D/MM/YYYY");
		var msg = {
				body: `🌟 | 𝗥.𝗖.𝗕. 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 ${global.config.BOTNAME}
━━━━━━━━━━━━━━━━━━━
𝖳𝖺𝗄𝖾 𝗇𝗈𝗍𝖾 𝗍𝗈 𝖻𝖾𝗀𝗂𝗇𝗇𝖾𝗋 𝗎𝗌𝖾𝗋𝗌 𝗐𝗁𝗈 𝖺𝗋𝖾 𝗇𝖾𝗐 𝗎𝗌𝗂𝗇𝗀 𝗍𝗁𝗂𝗌 𝗥.𝗖.𝗕. 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 ${global.config.BOTNAME}.
❯ 𝖳𝗁𝗂𝗌 𝖻𝗈𝗍 𝗂𝗌 𝖼𝗋𝖾𝖺𝗍𝖾𝖽 𝖻𝗒 𝖢𝗅𝖺𝗋𝗄 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝗌𝗈𝗎𝗋𝖼𝖾 𝗁𝖾𝗅𝗉 𝗈𝖿 𝗆𝗂𝗋𝖺𝗂.
❯ 𝖳𝗁𝖾 𝗋𝗎𝗅𝖾𝗌 𝖿𝗈𝗋 𝗎𝗌𝗂𝗇𝗀 𝗍𝗁𝗂𝗌 𝗥.𝗖.𝗕. 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 ${global.config.BOTNAME}:
━━━━━━━━━━━━━━━━━━━
𝟣. 𝖴𝗌𝖾𝗋𝗌 𝖺𝗏𝗈𝗂𝖽 𝗌𝗉𝖺𝗆𝗆𝗂𝗇𝗀 𝗥.𝗖.𝗕. 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 ${global.config.BOTNAME} 𝗆𝗈𝗋𝖾 𝗍𝗁𝖺𝗇 𝟣𝟢 𝗍𝗂𝗆𝖾𝗌 𝖺 𝗆𝗂𝗇𝗎𝗍𝖾/𝗌𝖾𝖼𝗈𝗇𝖽𝗌 𝗍𝗈 𝖺𝗏𝗈𝗂𝖽 𝖾𝗋𝗋𝗈𝗋𝗌 𝖺𝗇𝖽 𝖻𝗈𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍 𝗌𝗎𝗌𝗉𝖾𝗇𝗌𝗂𝗈𝗇 𝗂𝗇 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄.
❂━━━━━━━━━━━━━━━━━❂
2. 𝖴𝗌𝖾𝗋𝗌 𝗉𝗅𝖾𝖺𝗌𝖾 𝗈𝗇𝗅𝗒 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗈𝗇𝖾 𝖻𝗒 𝗈𝗇𝖾 𝖺𝖿𝗍𝖾𝗋 𝗍𝗁𝖾 𝖿𝗂𝗋𝗌𝗍 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗁𝖺𝗌 𝖽𝗈𝗇𝖾 𝗍𝗈 𝖻𝖾 𝖾𝗑𝖾𝖼𝗎𝗍𝖾𝖽.
❂━━━━━━━━━━━━━━━━━❂
3. 𝖫𝖾𝗍 𝗍𝗁𝖾 𝖻𝗈𝗍 𝖿𝗂𝗇𝗂𝗌𝗁 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝖺𝗇𝖽 𝖾𝗑𝖾𝖼𝗎𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝗒𝗈𝗎 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝖾𝖽 𝗍𝗈 𝗍𝗁𝖾 𝖻𝗈𝗍.
❂━━━━━━━━━━━━━━━━━❂
4. 𝖪𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗈𝗋𝗍 𝗍𝗈 𝗍𝗁𝖾 𝗈𝗐𝗇𝖾𝗋 𝗂𝖿 𝗍𝗁𝖾𝗋𝖾'𝗌 𝗌𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗉𝗉𝖾𝗇𝖾𝖽, 𝗌𝗈 𝗍𝗁𝖾 𝗈𝗐𝗇𝖾𝗋 𝗐𝗂𝗅𝗅 𝖿𝗂𝗑 𝗂𝗍 𝗂𝗆𝗆𝖾𝖽𝗂𝖺𝗍𝖾𝗅𝗒, 𝗒𝗈𝗎 𝖼𝖺𝗇 𝗋𝖾𝗉𝗈𝗋𝗍 𝗂𝗍 𝗏𝗂𝖺 𝗎𝗌𝗂𝗇𝗀 《𝖢𝖺𝗅𝗅𝖺𝖽》 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗍𝗈 𝗋𝖾𝗉𝗈𝗋𝗍 𝗍𝗈 𝗍𝗁𝖾 𝗈𝗐𝗇𝖾𝗋.
❂━━━━━━━━━━━━━━━━━❂
𝟧. 𝖣𝗈𝗇'𝗍 𝖺𝖽𝖽 𝗍𝗁𝖾 𝖻𝗈𝗍 𝗂𝗇 𝖽𝗂𝖿𝖿𝖾𝗋𝖾𝗇𝗍 𝗀𝖼'𝗌 𝗐𝗂𝗍𝗁𝗈𝗎𝗍 𝗍𝗁𝖾 𝗈𝗐𝗇𝖾𝗋 𝗉𝖾𝗋𝗆𝗂𝗌𝗌𝗂𝗈𝗇𝗌 𝗈𝗋 𝗒𝗈𝗎 𝗐𝗂𝗅𝗅 𝖻𝖾 𝗉𝖾𝗋𝗆𝖺𝗇𝖾𝗇𝗍𝗅𝗒 𝖻𝖺𝗇𝗇𝖾𝖽 𝗎𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝖻𝗈𝗍.
❂━━━━━━━━━━━━━━━━━❂
6. 𝖣𝗈 𝗇𝗈𝗍 𝗌𝗉𝖺𝗆 𝖻𝗈𝗍 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌, 𝗌𝗉𝖺𝗆 𝗉𝗋𝖾𝖿𝗂𝗑𝖾𝗌 𝗍𝗈𝗈 𝗆𝗎𝖼𝗁 𝗍𝗈 𝖼𝖺𝗎𝗌𝖾 𝖽𝖾𝖺𝗍𝗁 𝖻𝗈𝗍𝗌, 𝖼𝗉...
❂━━━━━━━━━━━━━━━━━❂
7. 𝖺𝗏𝗈𝗂𝖽 𝗌𝗐𝖾𝖺𝗋𝗂𝗇𝗀 𝖻𝗈𝗍 (𝗆𝗎𝗋𝖺), 𝗍𝗁𝖾 𝖻𝗈𝗍 𝗐𝗂𝗅𝗅 𝖺𝗎𝗍𝗈𝗆𝖺𝗍𝗂𝖼𝖺𝗅𝗅𝗒 𝖻𝖺𝗇 𝗒𝗈𝗎 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗌𝗒𝗌𝗍𝖾𝗆...
❂━━━━━━━━━━━━━━━━━❂
8. 𝖣𝗈 𝗇𝗈𝗍 𝖼𝖺𝗎𝗌𝖾 𝗐𝖺𝗋 𝗐𝗂𝗍𝗁 𝖻𝗈𝗍𝗌 ( 𝗌𝗂𝗆 𝗆𝗈𝖽𝗎𝗅𝖾𝗌... ) 𝖻𝖾𝖼𝖺𝗎𝗌𝖾 𝗍𝗁𝖾𝗌𝖾 𝖺𝗋𝖾 𝗇𝗈𝗍 𝗋𝖾𝖺𝗅 𝗂𝗇𝗍𝖾𝗋𝖺𝖼𝗍𝗂𝗏𝖾 𝗎𝗌𝖾𝗋𝗌!
❂━━━━━━━━━━━━━━━━━❂
9. 𝖣𝗈 𝗇𝗈𝗍 𝖺𝖻𝗎𝗌𝖾 𝖻𝗈𝗍𝗌 𝖿𝗈𝗋 𝗆𝖺𝗅𝗂𝖼𝗂𝗈𝗎𝗌 𝗉𝗎𝗋𝗉𝗈𝗌𝖾𝗌...
❂━━━━━━━━━━━━━━━━━❂
10. 𝖽𝗈𝗇'𝗍 𝗋𝖾𝗌𝖾𝗇𝖽 𝖻𝗈𝗍 𝗆𝖾𝗌𝗌𝖺𝗀𝖾.
❂━━━━━━━━━━━━━━━━━❂

𝗧𝗵𝗮𝘁'𝘀 𝗮𝗹𝗹, 𝗧𝗵𝗮𝗻𝗸 𝘆𝗼𝘂!`
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}