module.exports.config = {
	name: "reactpost",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "React posts by id",
	commandCategory: "facebook",
	usages: "[postID] [reaction type]: (unlike/like/love/heart/haha/wow/sad/angry)",
	cooldowns: 1
};


module.exports.run = async ({ api, event, args }) => {
  const allType = "unlike/like/love/heart/haha/wow/sad/angry".split("/");
  const postID = args[0];
  const type = args[1];
  if (!postID || !type) return global.utils.throwError(this.config.name, event.threadID, event.messageID);
  if (!allType.includes(type)) return api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗋𝖾𝖺𝖼𝗍𝗂𝗈𝗇 𝗍𝗒𝗉𝖾 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖼𝗁𝗈𝗈𝗌𝖾 𝗈𝗇𝖾 𝗈𝖿 𝗍𝗁𝖾 𝖿𝗈𝗅𝗅𝗈𝗐𝗂𝗇𝗀 𝗌𝗍𝗒𝗅𝖾𝗌: ${allType.join("/")}`, event.threadID, event.messageID);
  api.setPostReaction(Number(postID), type, (err, data) => {
    if (err) return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗌𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀 𝗐𝖾𝗇𝗍 𝖾𝗋𝗋𝗈𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖼𝗁𝖾𝖼𝗄 𝗒𝗈𝗎𝗋 𝗉𝗈𝗌𝗍 𝖨𝖣 𝖺𝗇𝖽 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋", event.threadID, event.messageID);
    api.sendMessage(`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖽𝗋𝗈𝗉𝗉𝖾𝖽 𝗋𝖾𝖺𝖼𝗍𝗂𝗈𝗇 ${type} 𝖿𝗈𝗋 𝗉𝗈𝗌𝗍𝗌 𝗐𝗂𝗍𝗁 𝖨𝖣: ${postID}`, event.threadID, event.messageID);
  });
};