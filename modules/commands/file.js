module.exports.config = {
    name: "file",
    version: "1.0.1",
    hasPermssion: 2,
    credits: "Réynél",
    description: "Delete the file or folder in the commands folder",
    commandCategory: "system",
    usages: "\ncommands start <text>\ncommands ext <text>\ncommands <text>\ncommands [leave blank]\ncommands help\nNOTE: <text> is the character you want to enter",
    cooldowns: 5
};

module.exports.handleReply = ({ api, event, args, handleReply }) => {
    if(event.senderID != handleReply.author) return; 
    const fs = require("fs-extra");
  var arrnum = event.body.split(" ");
  var msg = "";
  var nums = arrnum.map(n => parseInt(n));

  for(let num of nums) {
    var target = handleReply.files[num-1];
    var fileOrdir = fs.statSync(__dirname+'/'+target);
        if(fileOrdir.isDirectory() == true) {
          var typef = "《 𝗙𝗼𝗹𝗱𝗲𝗿 🗂️ 》";
          fs.rmdirSync(__dirname+'/'+target, {recursive: true});
        }
        else if(fileOrdir.isFile() == true) {
          var typef = "《 𝗙𝗶𝗹𝗲 📄 》";
          fs.unlinkSync(__dirname+"/"+target);
        }
        msg += typef+' '+handleReply.files[num-1]+"\n";
  }
  api.sendMessage("✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝗍𝗁𝖾 𝖿𝗈𝗅𝗅𝗈𝗐𝗂𝗇𝗀 𝖿𝗂𝗅𝖾𝗌 𝗂𝗇 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝖿𝗈𝗅𝖽𝖾𝗋:\n\n"+msg, event.threadID, event.messageID);
}


module.exports.run = async function({ api, event, args, Threads }) {
  
  const fs = require("fs-extra");
  var files = fs.readdirSync(__dirname+"/") || [];
  var msg = "", i = 1;
  
//

  if(args[0] == 'help') {
    var msg = `
𝗛𝗼𝘄 𝘁𝗼 𝘂𝘀𝗲 𝘁𝗵𝗲 𝗰𝗼𝗺𝗺𝗮𝗻𝗱:
•𝗞𝗲𝘆: 𝗌𝗍𝖺𝗋𝗍 <𝗍𝖾𝗑𝗍>
•𝗘𝗳𝗳𝗲𝗰𝘁: 𝖿𝗂𝗅𝗍𝖾𝗋 𝗈𝗎𝗍 𝖿𝗂𝗅𝖾𝗌 𝗍𝗈 𝖻𝖾 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝗐𝗂𝗍𝗁 𝖺𝗇 𝗈𝗉𝗍𝗂𝗈𝗇𝖺𝗅 𝗌𝗍𝖺𝗋𝗍𝗂𝗇𝗀 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋
•𝗘𝘅𝗮𝗺𝗽𝗹𝗲: 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝗋𝖺𝗇𝗄
•𝗞𝗲𝘆: 𝖾𝗑𝗍 <𝗍𝖾𝗑𝗍>
•𝗘𝗳𝗳𝗲𝗰𝘁: 𝖿𝗂𝗅𝗍𝖾𝗋 𝗈𝗎𝗍 𝖿𝗂𝗅𝖾𝗌 𝗍𝗈 𝖻𝖾 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝗐𝗂𝗍𝗁 𝗈𝗉𝗍𝗂𝗈𝗇𝖺𝗅 𝖾𝗑𝗍𝖾𝗇𝗌𝗂𝗈𝗇
•𝗘𝗳𝗳𝗲𝗰𝘁: 𝖿𝗂𝗅𝗍𝖾𝗋 𝗈𝗎𝗍 𝖿𝗂𝗅𝖾 𝗂𝗇 𝗍𝗁𝖾 𝗇𝖺𝗆𝖾 𝗐𝗂𝗍𝗁 𝖼𝗎𝗌𝗍𝗈𝗆 𝗍𝖾𝗑𝗍
•𝗘𝘅𝗮𝗺𝗽𝗹𝗲: 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝖠
•𝗞𝗲𝘆: 𝗅𝖾𝖺𝗏𝖾 𝖻𝗅𝖺𝗇𝗄
•𝗘𝗳𝗳𝗲𝗰𝘁: 𝖿𝗂𝗅𝗍𝖾𝗋 𝗈𝗎𝗍 𝖺𝗅𝗅 𝖿𝗂𝗅𝖾𝗌 𝗂𝗇 𝗍𝗁𝖾 𝖼𝖺𝖼𝗁𝖾
•𝗘𝘅𝗮𝗺𝗽𝗹𝗲: 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌
•𝗞𝗲𝘆: 𝗁𝖾𝗅𝗉
•𝗘𝗳𝗳𝗲𝗰𝘁: 𝗌𝖾𝖾 𝗁𝗈𝗐 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽
•𝗘𝘅𝗮𝗺𝗽𝗹𝗲: 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝗁𝖾𝗅𝗉`;
    
    return api.sendMessage(msg, event.threadID, event.messageID);
  }
  else if(args[0] == "start" && args[1]) {
    var word = args.slice(1).join(" ");
    var files = files.filter(file => file.startsWith(word));
    
    if(files.length == 0) return api.sendMessage(`❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 𝗇𝗈 𝖿𝗂𝗅𝖾𝗌 𝗂𝗇 𝗍𝗁𝖾 𝖼𝖺𝖼𝗁𝖾 𝗍𝗁𝖺𝗍 𝖻𝖾𝗀𝗂𝗇 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 《${word}》`, event.threadID ,event. messageID);
    var key = `✅ | 𝖧𝖺𝗂 《${files.length}》 𝖳𝗁𝖾 𝖿𝗂𝗅𝖾 𝗁𝖺𝗌 𝖺 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋 𝗍𝗁𝖺𝗍 𝗌𝗍𝖺𝗋𝗍𝗌 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 《${word}》`;
  }
  
  //đuôi file là..... 
  else if(args[0] == "ext" && args[1]) {
    var ext = args[1];
    var files = files.filter(file => file.endsWith(ext));
    
    if(files.length == 0) return api.sendMessage(`❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 𝗇𝗈 𝖿𝗂𝗅𝖾𝗌 𝗂𝗇 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝗍𝗁𝖺𝗍 𝖾𝗇𝖽 𝗐𝗂𝗍𝗁 《${ext}》`, event.threadID ,event. messageID);
    var key = `✅ | 𝖧𝖺𝗂 《${files.length}》 𝖿𝗂𝗅𝖾 𝗁𝖺𝗌 𝗍𝗁𝖾 𝖾𝗑𝗍𝖾𝗇𝗌𝗂𝗈𝗇 《${ext}》`;
  }
  //all file
  else if (!args[0]) {
  if(files.length == 0) return api.sendMessage("❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗆𝗒 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝗁𝖺𝗏𝖾 𝗇𝗈 𝖿𝗂𝗅𝖾𝗌 𝗈𝗋 𝖿𝗈𝗅𝖽𝖾𝗋𝗌", event.threadID ,event. messageID);
  var key = "ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖺𝗅𝗅 𝖿𝗂𝗅𝖾𝗌 𝗂𝗇 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝖿𝗈𝗅𝖽𝖾𝗋:";
  }
  //trong tên có ký tự.....
  else {
    var word = args.slice(0).join(" ");
    var files = files.filter(file => file.includes(word));
    if(files.length == 0) return api.sendMessage(`❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 𝗇𝗈 𝖿𝗂𝗅𝖾𝗌 𝗂𝗇 𝗍𝗁𝖾 𝗇𝖺𝗆𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋 《${word}》`, event.threadID ,event. messageID);
    var key = `✅ | 𝖧𝖺𝗂 《${files.length}》 𝖿𝗂𝗅𝖾 𝗂𝗇 𝗍𝗁𝖾 𝗇𝖺𝗆𝖾 𝗁𝖺𝗌 𝗍𝗁𝖾 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋 《${word}》`;
  }
  
    files.forEach(file => {
        var fileOrdir = fs.statSync(__dirname+'/'+file);
        if(fileOrdir.isDirectory() == true) var typef = "《 𝗙𝗼𝗹𝗱𝗲𝗿 🗂️ 》";
        if(fileOrdir.isFile() == true) var typef = "《 𝗙𝗶𝗹𝗲 📄 》";
        msg += (i++)+'. '+typef+' '+file+'\n';
    });
    
     api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝖻𝗒 𝗇𝗎𝗆𝖻𝖾𝗋 𝗍𝗈 𝖽𝖾𝗅𝖾𝗍𝖾 𝗍𝗁𝖾 𝖼𝗈𝗋𝗋𝖾𝗌𝗉𝗈𝗇𝖽𝗂𝗇𝗀 𝖿𝗂𝗅𝖾, 𝗒𝗈𝗎 𝖼𝖺𝗇 𝗋𝖾𝗉𝗅𝗒 𝗆𝗎𝗅𝗍𝗂𝗉𝗅𝖾 𝗇𝗎𝗆𝖻𝖾𝗋𝗌, 𝗌𝖾𝗉𝖺𝗋𝖺𝗍𝖾𝖽 𝖻𝗒 𝗌𝗉𝖺𝖼𝖾.\n${key}\n\n`+msg, event.threadID, (e, info) => global.client.handleReply.push({
    name: this.config.name,
    messageID: info.messageID,
    author: event.senderID,
    files
  }))
 
  }