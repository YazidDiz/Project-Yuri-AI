 module.exports.config = {
  name: "help13",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Beginner's Guide",
  commandCategory: "guides",
  usages: "[module name]",
  cooldowns: 1,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 300
  }
};

module.exports.languages = {
  //"vi": {
  //	"moduleInfo": "「 %1 」\n%2\n\n❯ Cách sử dụng: %3\n❯ Thuộc nhóm: %4\n❯ Thời gian chờ: %5 giây(s)\n❯ Quyền hạn: %6\n\n» Module code by %7 «",
  //	"helpList": '[ Hiện tại đang có %1 lệnh có thể sử dụng trên bot này, Sử dụng: "%2help nameCommand" để xem chi tiết cách sử dụng! ]"',
  //	"user": "Người dùng",
  //      "adminGroup": "Quản trị viên nhóm",
  //      "adminBot": "Quản trị viên bot"
//	},
  "en": {
    "moduleInfo": "『 %1 』\n%2\n\n❯ 𝗨𝘀𝗮𝗴𝗲: %3\n❯ 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: %4\n❯ 𝗪𝗮𝗶𝘁𝗶𝗻𝗴 𝘁𝗶𝗺𝗲: %5 𝗌𝖾𝖼𝗈𝗇𝖽𝗌(𝗌)\n❯ 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: %6\n\n𝗠𝗼𝗱𝘂𝗹𝗲 𝗰𝗼𝗱𝗲 𝗯𝘆: %7",
    "helpList": '[ There are %1 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝗈𝗇 𝗍𝗁𝗂𝗌 𝖻𝗈𝗍\n\n🎓 | 𝗨𝘀𝗲: "%2𝗁𝖾𝗅𝗉𝟣𝟥 𝗇𝖺𝗆𝖾𝖢𝗈𝗆𝗆𝖺𝗇𝖽" 𝗍𝗈 𝗄𝗇𝗈𝗐 𝗁𝗈𝗐 𝗍𝗈 𝗎𝗌𝖾! ]',
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

module.exports.run = function({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  if (args.join().indexOf('all')== 0) {
    const command = commands.values();
    var group = [], msg = "";
    for (const commandConfig of command) {
      if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
      else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
    }
    group.forEach(commandGroup => msg += `『 ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)} 』\n${commandGroup.cmds.join(', ')}\n\n`);

    const moduleName = this.config.name;
    return api.sendMessage(msg + ``, event.threadID, (err, info) => {
      setTimeout(() => {api.unsendMessage(info.messageID)}, 120000)
    }, event.messageID);
  }

  if (!command) {
    const arrayInfo = [];
    const page = parseInt(args[1]) || 1;
    const numberOfOnePage = 8;
    //*số thứ tự 1 2 3.....cú pháp ${++i}*//
    let i = 0;
    let msg = "";

    for (var [name, value] of (commands)) {
      name += ``;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);

    const startSlice = numberOfOnePage*page - numberOfOnePage;
    i = startSlice;
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);

    for (let item of returnArray) msg += `\n╭┈❏ 【 ${i++} 】• ${item}\n│            𝗨𝘀𝗲𝗽𝗿𝗲𝗳𝗶𝘅: 『${commands.get(item).config.usePrefix}』 \n╰┈➤ 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${commands.get(item).config.description}\n──────────────`;


    const siu = `👑≛ 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧 ≛👑`;

 const text = `\n📖 | 𝗣𝗮𝗴𝗲: 『${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)}』\n──────────────\n🌟 |𝖢𝗎𝗋𝗋𝖾𝗇𝗍𝗅𝗒 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾『${arrayInfo.length}』 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗈𝗇 ${global.config.BOTNAME}\n──────────────\n🖥 | 𝗖𝗿𝗲𝗮𝘁𝗼𝗿: ${global.config.CREATORLINK}`;

    return api.sendMessage(siu + "\n\n" + msg  + text, threadID, async (error, info) => {
      if (autoUnsend) {
        await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
        return api.unsendMessage(info.messageID);
      } else return;
    }, event.messageID);
  }

  return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};
