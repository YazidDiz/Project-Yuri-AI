module.exports.config = {
  name: "help",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "Clark",
  description: "commands list",
  commandCategory: "guides",
  usages: "[module name]",
  cooldowns: 1,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 300
  }
};

module.exports.languages = {
  "en": {
    "moduleInfo": "✿━━━━━[ %1 ]━━━━━✿\n━━━━━━━━━━━━━━━━━━━\n🎓 | 𝗨𝘀𝗮𝗴𝗲: %3\n🎭 | 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: %4\n⏳ | 𝗪𝗮𝗶𝘁𝗶𝗻𝗴 𝘁𝗶𝗺𝗲: %5 𝗌𝖾𝖼𝗈𝗇𝖽𝗌(𝗌)\n👑 | 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: %6\n📄 | 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: %2\n\n💻 | 𝗠𝗼𝗱𝘂𝗹𝗲 𝗰𝗼𝗱𝗲𝗱 𝗯𝘆 %7",
    "helpList": 'ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 《%1》 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝗈𝗇 𝗍𝗁𝗂𝗌 𝖻𝗈𝗍\n\n𝗨𝘀𝗲: 《%2𝗁𝖾𝗅𝗉 𝖼𝗆𝖽 𝗇𝖺𝗆𝖾》\n𝖳𝗈 𝗄𝗇𝗈𝗐 𝗁𝗈𝗐 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.',
    "user": "𝖴𝗌𝖾𝗋",
        "adminGroup": "𝖠𝖽𝗆𝗂𝗇 𝗀𝗋𝗈𝗎𝗉",
        "adminBot": "𝖠𝖽𝗆𝗂𝗇 𝖻𝗈𝗍"
  }
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
  const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports. run = function({ api, event, args, getText }) {
  const axios = require("axios");
  const request = require('request');
  const fs = require("fs-extra");
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
if (args[0] == "all") {
    const command = commands.values();
    var group = [], msg = "";
    for (const commandConfig of command) {
      if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
      else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
    }
    group.forEach(commandGroup => msg += `《 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆 》❖『${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)}』 \n${commandGroup.cmds.join(', ')}\n━━━━━━━━━━━━━━━━━━━\n`);

    return axios.get('https://apikanna.maduka9.repl.co').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
      let admID = "100080098527733";

      api.getUserInfo(parseInt(admID), (err, data) => {
      if(err){ return console.log(err)}
     var obj = Object.keys(data);
    var firstname = data[obj].name.replace("@", "");
    let callback = function () {
        api.sendMessage({ body:`━━━━━━━━━━━━━━━━━━━
❖《《Ｒ.Ｃ.Ｂ. ＹＵＲＩ》》❖
━━━━━━━━━━━━━━━━━━━
👑《《 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀  𝗹𝗶𝘀𝘁 》》👑
━━━━━━━━━━━━━━━━━━━\n` + msg + `\n━━━━━━━━━━━━━━━━━━━\n𝖲𝗉𝖺𝗆𝗆𝗂𝗇𝗀 𝖯𝗋𝗈𝗃𝖾𝖼𝗍 ${global.config.BOTNAME} 𝖺𝗋𝖾 𝗌𝗍𝗋𝗂𝖼𝗍𝗅𝗒 𝗉𝗋𝗈𝗁𝗂𝖻𝗂𝗍𝖾𝖽\n━━━━━━━━━━━━━━━━━━━\n📋 | 𝗧𝗼𝘁𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: ${commands.size}\n━━━━━━━━━━━━━━━━━━━\n👑 | 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿: ${firstname}`, mentions: [{
                           tag: firstname,
                           id: admID,
                           fromIndex: 0,
                 }],
            attachment: fs.createReadStream(__dirname + `/cache/472.${ext}`)
        }, event.threadID, (err, info) => {
        fs.unlinkSync(__dirname + `/cache/472.${ext}`);
        if (autoUnsend == false) {
            setTimeout(() => { 
                return api.unsendMessage(info.messageID);
            }, delayUnsend * 1000);
        }
        else return;
    }, event.messageID);
        }
         request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/472.${ext}`)).on("close", callback);
     })
      })
};
  if (!command) {
    const arrayInfo = [];
    const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 10;
    let i = 0;
    let msg = "";

    for (var [name, value] of (commands)) {
      name += ``;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);

const first = numberOfOnePage * page - numberOfOnePage;
    i = first;
    const helpView = arrayInfo.slice(first, first + numberOfOnePage);


    for (let cmds of helpView) msg += `${global.config.PREFIX}${cmds}\n`;

    const siu = `❂━━━━━━━━❁━━━━━━━━❂\n✱:｡✧* 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝗟𝗶𝘀𝘁 *✧｡:✱\n❂━━━━━━━━❁━━━━━━━━❂`;

 const text = `\n❂━━━━━━━━❁━━━━━━━━❂\n${global.config.BOTNAME} | ${global.config.BOTOWNER}\n❈:𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗟𝗲𝗻𝗴𝘁𝗵: ${arrayInfo.length}\n✥:𝗕𝗼𝘁 𝗡𝗮𝗺𝗲: ${global.config.BOTNAME}\n❅:𝗣𝗿𝗲𝗳𝗶𝘅: ${global.config.PREFIX}`;
    var link = [
"https://i.postimg.cc/1zfR3MTD/Kanade.gif",
"https://i.imgur.com/7Ppxc2t.gif",
"https://i.imgur.com/ZfS9tqF.gif",
"https://i.imgur.com/Pxep9AE.gif",
"https://i.imgur.com/ARQUmV8.gif",
"https://i.imgur.com/CjvXkc5.gif",
"https://i.imgur.com/Pxep9AE.gif",
"https://i.imgur.com/ZfS9tqF.gif",
      ]
     var callback = () => api.sendMessage({ body: siu + "\n\n" + msg  + text, attachment: fs.createReadStream(__dirname + "/cache/leiamnashelp.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/leiamnashelp.jpg"), event.messageID);
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/leiamnashelp.jpg")).on("close", () => callback());
  } 
const leiamname = getText("moduleInfo", command.config.name, command.config.description, `${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits);

  var link = [ 
"https://i.imgur.com/B3hXSp7.gif",
"https://i.imgur.com/Pxep9AE.gif",
"https://i.imgur.com/7Ppxc2t.gif",
"https://i.imgur.com/ZfS9tqF.gif",
  ]
    var callback = () => api.sendMessage({ body: leiamname, attachment: fs.createReadStream(__dirname + "/cache/leiamnashelp.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/leiamnashelp.jpg"), event.messageID);
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/leiamnashelp.jpg")).on("close", () => callback());
};