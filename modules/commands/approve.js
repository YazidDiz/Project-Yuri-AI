module.exports.config = {
  name: "approve",
  version: "2.0.0",
  hasPermission: 2,
  credits: "Réynél",
  description: "approve thread using thread id",
  commandCategory: "system",
  usages: "[group/remove] [threadid]",
  cooldowns: 5,
};

module.exports.languages = {
    "vi": {
        "listAdmin": 'Danh sách toàn bộ người điều hành bot: \n\n%1',
        "notHavePermssion": 'Bạn không đủ quyền hạn để có thể sử dụng chức năng "%1"',
        "addedNewAdmin": 'Đã thêm %1 người dùng trở thành người điều hành bot:\n\n%2',
        "removedAdmin": 'Đã gỡ bỏ %1 người điều hành bot:\n\n%2'
    },
    "en": {
        "listAdmin": '📋 | 𝗮𝗽𝗽𝗿𝗼𝘃𝗲𝗱 𝗹𝗶𝘀𝘁: \n\n%1',
        "notHavePermssion": '⚠️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗇𝗈 𝗉𝖾𝗋𝗆𝗂𝗌𝗌𝗂𝗈𝗇 𝗍𝗈 𝗎𝗌𝖾 "%1"',
        "addedNewAdmin": '✅ | 𝖺𝗉𝗉𝗋𝗈𝗏𝖾𝖽 %1 𝗀𝗋𝗈𝗎𝗉:\n\n%2',
        "removedAdmin": '📤 | 𝗋𝖾𝗆𝗈𝗏𝖾𝖽 %1 𝗀𝗋𝗈𝗎𝗉 𝗂𝗇 𝖺𝗉𝗉𝗋𝗈𝗏𝖾 𝗅𝗂𝗌𝗍𝗌:\n\n%2'
    }
}

module.exports.run = async function ({ api, event, args, Threads, permssion, getText }) {
    const content = args.slice(1, args.length);
    const { threadID, messageID, mentions } = event;
    const { configPath } = global.client;
    const { APPROVED } = global.config;
    const { userName } = global.data;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);
    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);
    
       
    switch (args[0]) {
        case "list":
        case "all":
        case "-a": {
            const listAdmin = APPROVED || config.APPROVED || [];
            var msg = [];

            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                  const name =  await global.data.threadInfo.get(idAdmin).threadName || "𝗇𝖺𝗆𝖾 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍";
                  msg.push(`\n👥 | 𝗴𝗿𝗼𝘂𝗽 𝗻𝗮𝗺𝗲: ${name}\n📇 | 𝗴𝗿𝗼𝘂𝗽 𝗶𝗱: ${idAdmin}`);
                }
            };

            return api.sendMessage(`📋 | 𝗮𝗽𝗽𝗿𝗼𝘃𝗲𝗱 𝗴𝗿𝗼𝘂𝗽𝘀:\n${msg.join('\n')}`, threadID, messageID);
        }

        case "group": {
            if (permssion != 3) return api.sendMessage(getText("notHavePermssion", "add"), threadID, messageID);
          

            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    APPROVED.push(id);
                    config.APPROVED.push(id);
                    listAdd.push(`${id} - ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                APPROVED.push(content[0]);
                config.APPROVED.push(content[0]);
                const name = await global.data.threadInfo.get(content[0]).threadName || "𝗇𝖺𝗆𝖾 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍";
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `👥 | 𝗴𝗿𝗼𝘂𝗽 𝗻𝗮𝗺𝗲: ${name}\n📇 | 𝗴𝗿𝗼𝘂𝗽 𝗶𝗱: ${content[0]}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
        
        case "secret": {
            if (permssion != 3) return api.sendMessage(getText("notHavePermssion", "add"), threadID, messageID);
          

            if (mention.length != 0 && isNaN(content[0])) {
                var listGod = [];

                for (const id of mention) {
                    APPROVED;
                    config.APPROVED.push(id);
                    listGod.push(`${id} - ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listGod.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                APPROVED.push(content[0]);
                config.APPROVED.push(content[0]);
                const name = await global.data.threadInfo.get(content[0]).threadName || "𝗇𝖺𝗆𝖾 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍";
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `👥 | 𝗴𝗿𝗼𝘂𝗽 𝗻𝗮𝗺𝗲: ${name}\n📇 | 𝗴𝗿𝗼𝘂𝗽 𝗶𝗱: ${content[0]}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }

        case "remove":
        case "rm":
        case "delete": {
            if (permssion != 3) return api.sendMessage(getText("notHavePermssion", "delete"), threadID, messageID);
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.APPROVED.findIndex(item => item == id);
                    APPROVED.splice(index, 1);
                    config.APPROVED.splice(index, 1);
                    listAdd.push(`${id} - ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.APPROVED.findIndex(item => item.toString() == content[0]);
                APPROVED.splice(index, 1);
                config.APPROVED.splice(index, 1);
                const name = await global.data.threadInfo.get(content[0]).threadName || "𝗇𝖺𝗆𝖾 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍";
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", 1, `👥 | 𝗴𝗿𝗼𝘂𝗽 𝗻𝗮𝗺𝗲: ${name}\n📇 | 𝗴𝗿𝗼𝘂𝗽 𝗶𝗱: ${content[0]}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
        }

        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    };
}
