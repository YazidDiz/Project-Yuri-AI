const axios = require("axios");
module.exports.config = {
  name: "randominfo",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Get random info",
  commandCategory: "utilities",
  usages: "[randominfo]",
  cooldowns: 3,
};
module.exports.run = async function({ api, event, args }) {
	var { threadID, messageID } = event;
	try {
		const res = await axios(`https://sensui-useless-apis.codersensui.repl.co/api/tools/random-info`);
		api.sendMessage(`❯❯ 𝗥𝗮𝗻𝗱𝗼𝗺 𝗜𝗻𝗳𝗼\n━━━━━━━━━━━━━━━━━━━\n❯ 𝗡𝗮𝗺𝗲: ${res.data.name}\n❯ 𝗚𝗲𝗻𝗱𝗲𝗿: ${res.data.gender}\n❯ 𝗔𝗴𝗲: ${res.data.age}\n❯ 𝗘𝗺𝗮𝗶𝗹: ${res.data.email}\n❯ 𝗣𝗵𝗼𝗻𝗲 𝗡𝗼.: ${res.data.phone}\n❯ 𝗖𝗲𝗹𝗹 𝗡𝗼.: ${res.data.cell}\n❯ 𝗔𝗱𝗱𝗿𝗲𝘀𝘀:\n» 𝗦𝘁𝗿𝗲𝗲𝘁: ${res.data.address.street}\n» 𝗖𝗶𝘁𝘆: ${res.data.address.city}\n» 𝗦𝘁𝗮𝘁𝗲: ${res.data.address.state}\n» 𝗖𝗼𝘂𝗻𝘁𝗿𝘆: ${res.data.address.country}\n» 𝗣𝗼𝘀𝘁𝗖𝗼𝗱𝗲: ${res.data.address.postcode}\n❯ 𝗡𝗮𝘁𝗶𝗼𝗻𝗮𝗹𝗶𝘁𝘆: ${res.data.nationality}\n❯ 𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${res.data.username}\n❯ 𝗥𝗲𝗴𝗶𝘀𝘁𝗲𝗿𝗲𝗱: ${res.data.registered}\n❯ 𝗗𝗼𝗯: ${res.data.dob}\n❯ 𝗜𝗗: ${res.data.id}\n❯ 𝗧𝗶𝗺𝗲𝘇𝗼𝗻𝗲: ${res.data.timezone}\n❯ 𝗟𝗼𝗴𝗶𝗻:\n» 𝗨𝗨𝗜𝗗: ${res.data.login.uuid}\n» 𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${res.data.login.username}\n» 𝗣𝗮𝘀𝘀𝘄𝗼𝗿𝗱: ${res.data.login.password}\n» 𝗦𝗮𝗹𝘁: ${res.data.login.salt}\n» 𝗠𝗱𝟱: ${res.data.login.md5}\n» 𝗦𝗵𝗮𝟭: ${res.data.sha1}\n» 𝗦𝗵𝗮𝟮𝟱𝟲: ${res.data.login.sha256}\n━━━━━━━━━━━━━━━━━━━`, threadID, messageID);
	} catch (error) {
		api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝖺𝗉𝗂.", threadID, messageID);
	}
}