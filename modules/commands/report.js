exports.config = {
  name: "report",
  version: "1.0.9",
  hasPermssion: 2,
  credits: "Réynél",
  description: "burn account",
  commandCategory: "facebook",
  usages: "[just follow the steps]",
  cooldowns: 5
};
module.exports.handleReply = async function({ api, event, handleReply,client }) {
    if (event.senderID != handleReply.author) return;
    switch (handleReply.Case) {
        case 1: {
            return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖱𝖾𝗉𝗅𝗒 𝖳𝗈 𝖳𝗁𝗂𝗌 𝖬𝖾𝗌𝗌𝖺𝗀𝖾 𝖠𝗇𝖽 𝖤𝗇𝗍𝖾𝗋 𝖳𝗁𝖾 𝖱𝖾𝖺𝗅 𝖭𝖺𝗆𝖾 𝖮𝖿 𝖳𝗁𝖾 𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖯𝖾𝗋𝗌𝗈𝗇 𝖸𝗈𝗎 𝖶𝖺𝗇𝗍 𝖳𝗈 𝖱𝖾𝗉𝗈𝗋𝗍!", event.threadID,(error, info) => global.client.handleReply.push({ Link: event.body, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 2 }));
        }
        case 2: {
            return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖯𝗅𝖾𝖺𝗌𝖾 𝖱𝖾𝗉𝗅𝗒 𝖳𝗈 𝖳𝗁𝗂𝗌 𝖬𝖾𝗌𝗌𝖺𝗀𝖾 𝖠𝗇𝖽 𝖤𝗇𝗍𝖾𝗋 𝖸𝗈𝗎𝗋 𝖦𝗆𝖺𝗂𝗅 𝖳𝗈 𝖱𝖾𝖼𝖾𝗂𝗏𝖾 𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖭𝗈𝗍𝗂𝖿𝗂𝖼𝖺𝗍𝗂𝗈𝗇𝗌!", event.threadID,(error, info) => global.client.handleReply.push({ Link: handleReply.Link, RealName: event.body,name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 3 }));
        }
        case 3: {
            return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖯𝗅𝖾𝖺𝗌𝖾 𝖱𝖾𝗉𝗅𝗒 𝖳𝗈 𝖳𝗁𝗂𝗌 𝖬𝖾𝗌𝗌𝖺𝗀𝖾 𝖠𝗇𝖽 𝖤𝗇𝗍𝖾𝗋 𝖶𝗁𝖺𝗍 𝖸𝗈𝗎 𝖶𝖺𝗇𝗍 𝖳𝗈 𝖱𝖾𝗉𝗈𝗋𝗍!", event.threadID,(error, info) => global.client.handleReply.push({ Link: handleReply.Link,RealName: handleReply.RealName,Gmail: event.body,name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 4 }));
        }
        case 4: {
            return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖯𝗅𝖾𝖺𝗌𝖾 𝖱𝖾𝗉𝗅𝗒 𝖳𝗈 𝖳𝗁𝗂𝗌 𝖬𝖾𝗌𝗌𝖺𝗀𝖾 𝖠𝗇𝖽 𝖤𝗇𝗍𝖾𝗋 𝖳𝗁𝖾 𝖭𝗎𝗆𝖻𝖾𝗋 𝖮𝖿 𝖳𝗂𝗆𝖾𝗌 𝖸𝗈𝗎 𝖶𝖺𝗇𝗍 𝖳𝗈 𝖱𝖾𝗉𝗈𝗋𝗍 𝖳𝗈 𝖳𝗁𝖾 𝖵𝗂𝖼𝗍𝗂𝗆!", event.threadID,(error, info) => global.client.handleReply.push({ Link: handleReply.Link,RealName: handleReply.RealName,Gmail: handleReply.Gmail, Content: event.body,name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 5 }));
        }
        case 5: {
            var Time = parseInt(event.body);
            if (isNaN(event.body)) {
                return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖯𝗅𝖾𝖺𝗌𝖾 𝖱𝖾-𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝖵𝗂𝖼𝗍𝗂𝗆 𝖱𝖾𝗉𝗈𝗋𝗍 𝖭𝗎𝗆𝖻𝖾𝗋!", event.threadID,(error, info) => global.client.handleReply.push({ Link: handleReply.Link,RealName: handleReply.RealName,Gmail: handleReply.Gmail, Content: handleReply.Gmail, Time: event.body,name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 5 }));
            }
            if (event.body > 100) {
                return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖯𝗅𝖾𝖺𝗌𝖾 𝖤𝗇𝗍𝖾𝗋 𝖭𝗈 𝖬𝗈𝗋𝖾 𝖳𝗁𝖺𝗇 𝟣𝟢𝟢 𝖳𝗂𝗆𝖾𝗌 𝗍𝗈 𝖱𝖾𝗉𝗈𝗋𝗍 𝗍𝗈 𝖵𝗂𝖼𝗍𝗂𝗆!", event.threadID,(error, info) => global.client.handleReply.push({ Link: handleReply.Link,RealName: handleReply.RealName,Gmail: handleReply.Gmail, Content: handleReply.Content, Time: event.body,name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 5 }));
            }
            if (event.body < 1) {
                return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖯𝗅𝖾𝖺𝗌𝖾 𝖤𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝖵𝗂𝖼𝗍𝗂𝗆 𝖱𝖾𝗉𝗈𝗋𝗍 𝖭𝗎𝗆𝖻𝖾𝗋 𝖭𝗈 𝖫𝖾𝗌𝗌 𝗍𝗁𝖺𝗇 𝟣 𝖳𝗂𝗆𝖾!", event.threadID,(error, info) => global.client.handleReply.push({ Link: handleReply.Link,RealName: handleReply.RealName,Gmail: handleReply.Gmail, Content: handleReply.Content, Time: event.body,name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 5 }));
            }
            return api.sendMessage("🔍 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖸𝗈𝗎 𝖱𝖾𝗊𝗎𝖾𝗌𝗍𝖾𝖽 𝗍𝗈 𝖱𝖾𝗉𝗈𝗋𝗍 𝖵𝗂𝖼𝗍𝗂𝗆 𝖶𝗂𝗍𝗁 𝖳𝗁𝖾 𝖥𝗈𝗅𝗅𝗈𝗐𝗂𝗇𝗀 𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇:\n𝖱𝖾𝖺𝗅 𝖭𝖺𝗆𝖾: " + handleReply.RealName + "\n𝖦𝗆𝖺𝗂𝗅(𝗒𝗈𝗎𝗋𝗌): " + handleReply.Gmail + "\n𝖼𝗈𝗇𝗍𝖾𝗇𝗍: " + handleReply.Content + "\n𝖱𝖾𝗉𝗈𝗋𝗍 𝗇𝗎𝗆𝖻𝖾𝗋: " +  (handleReply.Time || Time), event.threadID,(error, info) => api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖯𝗅𝖾𝖺𝗌𝖾 𝖱𝖾𝗉𝗅𝗒 '𝗈𝗄' 𝖳𝗈 𝖢𝗈𝗇𝖿𝗂𝗋𝗆 𝖱𝗈𝖼𝗄𝖾𝗍 𝖫𝖺𝗎𝗇𝖼𝗁 💀",event.threadID,(err,info) => global.client.handleReply.push({ Link: handleReply.Link,RealName: handleReply.RealName,Gmail: handleReply.Gmail, Content: handleReply.Content, Time: event.body,name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 6 })));
        }
        case 6: {
            if (event.body != "ok") return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖯𝗅𝖾𝖺𝗌𝖾 𝖱𝖾𝗉𝗅𝗒 𝖳𝗈 𝖳𝗁𝗂𝗌 𝖬𝖾𝗌𝗌𝖺𝗀𝖾 𝖠𝗇𝖽 𝖤𝗇𝗍𝖾𝗋'𝗈𝗄' 𝖳𝗈 𝖢𝗈𝗇𝖿𝗂𝗋𝗆 𝖱𝗈𝖼𝗄𝖾𝗍 𝖫𝖺𝗎𝗇𝖼𝗁 💀",event.threadID,(error, info) => global.client.handleReply.push({ Link: handleReply.Link,RealName: handleReply.RealName,Gmail: handleReply.Gmail, Content: handleReply.Content, Time: handleReply.Time,name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 6 }));
            for (let i = 0; i < (handleReply.Time || Time); i++) {
                try {
                    var DataRp = await api.Premium('ReportV1',{ Link: handleReply.Link, RealName: handleReply.RealName, Content: handleReply.Content, Gmail: handleReply.Gmail });
                    console.log(i + "/ Report " + DataRp);
                    await new Promise(resolve => setTimeout(resolve, 1 * 1000));
                }
                catch (e) {
                    console.log(e);
                    return api.sendMessage("❎ | 𝖴𝗇𝖽𝖾𝖿𝗂𝗇𝖾𝖽 𝖤𝗋𝗋𝗈𝗋!\n"+e, event.threadID);
                }
            }
            return api.sendMessage(`✅ | 𝗌𝖾𝗇𝗍: ${ (handleReply.Time || Time)}  𝖱𝖾𝗉𝗈𝗋𝗍 𝖳𝗈  𝗏𝗂𝖼𝗍𝗂𝗆 ${handleReply.RealName}!`,event.threadID);
        }
    }
}
module.exports.run = async function({ api,event,client }) {
    return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝖺𝗇𝖽 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝗅𝗂𝗇𝗄 𝗈𝖿 𝗍𝗁𝖾 𝗉𝖾𝗋𝗌𝗈𝗇 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗋𝖾𝗉𝗈𝗋𝗍!", event.threadID,(error, info) => global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 1 }));
                                           }