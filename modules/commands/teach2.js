const name = global.config.BOTNAME;
const bot = name.toLowerCase();
module.exports.config = {
  name: "teach", 
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: `Teach ${name} Bot`,
  commandCategory: "chatbots",
  usages: `${global.config.PREFIX}teach message => respond`,
  cooldowns: 0,
};
module.exports.run = async function ({ api, event, args }) {
	var { threadID, messageID } = event;
	const axios = require("axios");
	try {
		const request = args.join(" ").split(" => ");
		if (!request[0] && !request[1]) return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖪𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺𝗇 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗍𝗈 𝗍𝖾𝖺𝖼𝗁.\n\n> ${global.config.PREFIX}${this.config.name} 𝗉𝗈𝗀𝗂 => 𝖺𝗄𝗈`, threadID, messageID);
		const res = await axios.get(`https://mainapi.princemc166.repl.co/api/teach?message=${encodeURI(request[0])}&respond=${encodeURI(request[1])}`);
		api.sendMessage(res.data.message, threadID, messageID);
	} catch (error) {
		api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝗌𝗂𝗆 𝖺𝗉𝗂", threadID, messageID);
	}
             }