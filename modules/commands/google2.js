module.exports.config = {
	name: "google2",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Clark",
	description: "web search",
  usages: `Search cannot be left blank\n\nHow to use?\n${global.config.PREFIX}google <text>\n\nExample:\n${global.config.PREFIX}google animepahe\n`,
	commandCategory: "searches",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
const google = require('googlethis');
let ZiaRein = args.join(" ");
  if (!ZiaRein) return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗌𝖾𝖺𝗋𝖼𝗁 𝖼𝖺𝗇𝗇𝗈𝗍 𝖻𝖾 𝗅𝖾𝖿𝗍 𝖻𝗅𝖺𝗇𝗄\n━━━━━━━━━━━━━━━━━━━\nℹ️ | 𝖧𝗈𝗐 𝗍𝗈 𝗎𝗌𝖾?\n${global.config.PREFIX}𝗀𝗈𝗈𝗀𝗅𝖾 <𝗍𝖾𝗑𝗍>\n━━━━━━━━━━━━━━━━━━━\n📚 | 𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n${global.config.PREFIX}𝗀𝗈𝗈𝗀𝗅𝖾 𝖺𝗇𝗂𝗆𝖾.`, event.threadID, event.messageID);
const ZiaReinn = await google.search(`${ZiaRein}`, {
  page: 0, 
  safe: false,
  parse_ads: false,
  additional_params: { 
    hl: 'en' 
  }
});
  console.log(ZiaReinn);
  var ZiaRein = ZiaReinn.results[0];
  var ZiaRein 2 = ZiaRein1.description;
  var ZiaRein3 = ZiaRein1.url;
  var ZiaRein4 = (`${ZiaRein2}\n━━━━━━━━━━━━━━━━━━━\n𝘀𝗼𝘂𝗿𝗰𝗲:\n${ZiaRein3}`);
api.sendMessage(ZiaRein4, event.threadID, event.messageID);
  }