module.exports.config = {
  name: "uidall",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Get all uid and names in Group.",
  commandCategory: "group",
  cooldowns: 2,
};
module.exports.run = async function ({ api, event, args, Users }) {
  
  function reply(d) {
    api.sendMessage(d, event.threadID, event.messageID)
  }
  var ep = event.participantIDs;
  msg = ""
  msgs = ""
  m = 0;
  for (let i of ep) {
    m += 1;
    const name = await Users.getNameUser(i);
    msg += m+". "+name+"\n⪩ 𝗨𝗜𝗗: "+i+"\n⪩ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗹𝗶𝗻𝗸: https://facebook.com/"+i+"\n━━━━━━━━━━━━━━━━━━━\n";
  }
  msgs += "📝 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 𝗅𝗂𝗌𝗍 𝗈𝖿 𝖺𝗅𝗅 𝗀𝗋𝗈𝗎𝗉 𝗆𝖾𝗆𝖻𝖾𝗋𝗌 𝗎𝗂𝖽 𝗂𝗇 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉.\n\n"+msg;
  reply(msgs)
}