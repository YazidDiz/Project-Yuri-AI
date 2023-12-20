module.exports.config = {
	name: "bday",
	version: "1.0.0",
	hasPermssion: 0,
  credits: "Réynél",
	description: "See admin's birthday",
	commandCategory: "admin",
	cooldowns: 5
}

module.exports.run =  ({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];
    const t = Date.parse("April 8, 2024 00:00:00") - Date.parse(new Date());
    const seconds = Math.floor( (t/1000) % 60 );
    const minutes = Math.floor( (t/1000/60) % 60 );
    const hours = Math.floor( (t/(1000*60*60)) % 24 );
    const days = Math.floor( t/(1000*60*60*24) );
    var callback = () => api.sendMessage(
  {body:`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗍𝗂𝗆𝖾 𝗅𝖾𝖿𝗍 𝗎𝗇𝗍𝗂𝗅 𝗆𝖺𝗌𝗍𝖾𝗋 𝖢𝗅𝖺𝗋𝗄 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺'𝗌 𝖻𝗂𝗋𝗍𝗁𝖽𝖺𝗒:\n━━━━━━━━━━━━━━━━━━━\n𝗗𝗮𝘆𝘀: ${days}\n𝗛𝗼𝘂𝗿𝘀: ${hours}\n𝗠𝗶𝗻𝘂𝘁𝗲𝘀: ${minutes}\n𝗦𝗲𝗰𝗼𝗻𝗱𝘀: ${seconds}\n━━━━━━━━━━━━━━━━━━━`, attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => 
    fs.unlinkSync(__dirname + "/cache/1.png"));  
      return request(encodeURI(`https://graph.facebook.com/100080098527733/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(
fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    
      };