module.exports.config = {
  name: "idst",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Save sticker id",
  commandCategory: "tools",
  usages: "[reply]",
  cooldowns: 5   
}

module.exports.run = async function ({ api, event, args }) {
  if (event.type == "message_reply") {
    if (event.messageReply.attachments[0].type == "sticker") {
      return api.sendMessage({
        body: `𝗜𝗗𝗦𝗧\n━━━━━━━━━━━━━━━━━━━\n🆔 | 𝗜𝗗: ${event.messageReply.attachments[0].ID}\n━━━━━━━━━━━━━━━━━━━\n🗯 | 𝗖𝗮𝗽𝘁𝗶𝗼𝗻: ${event.messageReply.attachments[0].description}`
      }, event.threadID)
    }
    else return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗋𝖾𝗉𝗅𝗒 𝗈𝗇𝗅𝗒 𝗍𝗈 𝗍𝗁𝖾 𝗌𝗍𝗂𝖼𝗄𝖾𝗋.", event.threadID);
  }
  else if (args[0]) {
    return api.sendMessage({body:`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 𝗌𝗍𝗂𝖼𝗄𝖾𝗋:`, sticker: args[0]}, event.threadID);
  }
  else return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗌𝗍𝗂𝖼𝗄𝖾𝗋 𝗈𝗇𝗅𝗒.", event.threadID);
}