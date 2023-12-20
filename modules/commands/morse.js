  
module.exports.config = {
  name: "morse",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Encrypt your text to become Morse code",
  commandCategory: "tools",
  usages: "[encode or decode] [Text ASCII to encrypt]",
  cooldowns: 5,
  dependencies: {
    "morse-decoder": ""
  }
};

module.exports.run = function({
  api,
  event,
  args,
  client,
  __GLOBAL
}) {
  const morsify = global.nodemodule['morse-decoder'];
  var content = args.join(" ");
  if (event.type == "message_reply")(content.indexOf('en') == 0) ? api.sendMessage(morsify.encode(event.messageReply.body), event.threadID, event.messageID) : (content.indexOf('de') == 0) ? api.sendMessage(morsify.decode(event.messageReply.body), event.threadID, event.messageID) : api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖺 𝗐𝗋𝗈𝗇𝗀 𝗌𝗒𝗇𝗍𝖺𝗑 𝗈𝖿 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖿𝗂𝗇𝖽 𝗈𝗎𝗍 𝗆𝗈𝗋𝖾 𝖺𝗍 ${prefix}𝗁𝖾𝗅𝗉 ${'morse'}`, event.threadID, event.messageID);
  else(content.indexOf('en') == 0) ? api.sendMessage(morsify.encode(content.slice(3, content.length)), event.threadID, event.messageID) : (content.indexOf('de') == 0) ? api.sendMessage(morsify.decode(content.slice(3, content.length)), event.threadID, event.messageID) : api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖺 𝗐𝗋𝗈𝗇𝗀 𝗌𝗒𝗇𝗍𝖺𝗑 𝗈𝖿 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖿𝗂𝗇𝖽 𝗈𝗎𝗍 𝗆𝗈𝗋𝖾 𝖺𝗍 ${prefix}𝗁𝖾𝗅𝗉 ${'morse'}`, event.threadID, event.messageID);
}