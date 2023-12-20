module.exports.config = {
	name: "clearcache",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Réynél",
	description: "Delete cache file/folder",
	commandCategory: "system",
	usages: "[file/folder]",
	cooldowns: 2
};

module.exports.run = async function ({ event, api, Currencies, args, Threads }) {
const { writeFileSync, readdirSync, existsSync, unlinkSync } = require('fs-extra');
  /*
  if(args[0] == "spam"){
      const { resolve } = require('path');
for(let i = 0; i < args[1]; i++){
          const path = resolve(__dirname, "cache", i + ".txt");
if (!existsSync(path)) writeFileSync(path, "tdungdeptrai", "utf-8");
  console.log(i)
}
  }
  */
  if(!args[0]){ return api.sendMessage('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗇𝗈𝗍 𝖾𝗇𝗍𝖾𝗋𝖾𝖽 𝗍𝗁𝖾 𝖿𝗂𝗅𝖾 𝖾𝗑𝗍𝖾𝗇𝗌𝗂𝗈𝗇 𝗇𝖾𝖾𝖽𝖾𝖽 𝗍𝗈 𝖻𝖾 𝖽𝖾𝗅𝖾𝗍𝖾𝖽', event.threadID, event.messageID)}
   const listFile = readdirSync(__dirname + '/cache').filter(item => item.endsWith("." + args[0]));
  var msg = "";
  for(i in listFile){
    console.log(listFile[i])
    msg += `${listFile[i]}\n`
  }
  console.log(msg)
  return api.sendMessage(`⏳ | ${msg}\n\n𝖪𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝖾𝗌𝗌 𝖸 𝗍𝗈 𝖽𝖾𝗅𝖾𝗍𝖾 𝗍𝗁𝖾 𝖿𝗈𝗅𝗅𝗈𝗐𝗂𝗇𝗀 𝖿𝗂𝗅𝖾𝗌 𝗆𝖺𝗌𝗍𝖾𝗋`, event.threadID, (error, info) =>{
    if(error) console.log(error)
    global.client.handleReply.push({
        step: 0,
        name: this.config.name,
        file_en: args[0],
        messageID: info.messageID,
        author: event.senderID,
      }),
     event.messageID
  })
}
module.exports.handleReply = async function ({ event, api, Currencies, handleReply, Threads }) {
  if(handleReply.author !== event.senderID) return
  if(event.body == "Y"){
    const { writeFileSync, readdirSync, existsSync, unlinkSync } = require('fs-extra');
   const listFile = readdirSync(__dirname + '/cache').filter(item => item.endsWith("." + handleReply.file_en));
  for(i in listFile){
    unlinkSync(__dirname + '/cache/' + listFile[i])
  }
  return  api.sendMessage(`🚮 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 《${listFile.length}》 𝖿𝗂𝗅𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝖾𝗑𝗍𝖾𝗇𝗌𝗂𝗈𝗇 《${handleReply.file_en}》`,event.threadID)
  }
  else {
    api.sendMessage(``,event.threadID)
  }
}