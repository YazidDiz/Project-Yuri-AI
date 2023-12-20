module.exports.config = {
	name: "owner",
	version: "1.0.0",
	hasPermssion: 0,
  credits: "Réynél",
	description: "view owner of the bot",
	commandCategory: "information",
  usages: "[owner]",
	cooldowns: 5
}

module.exports.run =  ({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];
    var callback = () => api.sendMessage(
  {body:`╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n  ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n𝗢𝘄𝗻𝗲𝗿 𝗼𝗳 ${global.config.BOTNAME} 𝗕𝗼𝘁 \n➟ 𝗠𝗮𝘀𝘁𝗲𝗿 ${global.config.BOTOWNER}\n❂ 𝗔𝗱𝗺𝗶𝗻 𝗨𝗜𝗗: ${global.config.OWNERID}\n♛ 𝗔𝗱𝗺𝗶𝗻 𝗙𝗕 𝗟𝗶𝗻𝗸:\n${global.config.OWNERLINK}`, attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => 
    fs.unlinkSync(__dirname + "/cache/1.png"));  
      return request(encodeURI(`https://graph.facebook.com/${global.config.OWNERID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(
fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    
      };