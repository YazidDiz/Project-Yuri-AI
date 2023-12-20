module.exports.config = {
  name: 'allbox',
  version: '1.0.0',
  credits: 'Réynél',
  hasPermssion: 2,
  description: '[Ban/Unban/Del/Remove] List[Data] thread The bot has joined in.',
  commandCategory: 'admin',
  usages: '[page number/all]',
  cooldowns: 5
};

module.exports.handleReply = async function ({ api, event, args, Threads, handleReply }) {
  const { threadID, messageID } = event;
  if (parseInt(event.senderID) !== parseInt(handleReply.author)) return;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Manila").format("HH:MM:ss L");
  var arg = event.body.split(" ");
  var idgr = handleReply.groupid[arg[1] - 1];
  var groupName = handleReply.groupName[arg[1] - 1];
  switch (handleReply.type) {
    case "reply":
      {
        if (arg[0] == "ban" || arg[0] == "Ban") {
          const data = (await Threads.getData(idgr)).data || {};
          data.banned = 1;
          data.dateAdded = time;
          await Threads.setData(idgr, { data });
          global.data.threadBanned.set(idgr, { dateAdded: data.dateAdded });
          return api.sendMessage(`𝗡𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻𝘀 𝗙𝗿𝗼𝗺 𝗠𝗮𝘀𝘁𝗲𝗿\n━━━━━━━━━━━━━━━━━━━\n 𝖦𝗋𝗈𝗎𝗉 𝗈𝖿 𝖿𝗋𝗂𝖾𝗇𝖽𝗌 𝗁𝖺𝗏𝖾 𝖻𝖾𝖾𝗇 𝖻𝖺𝗇𝗇𝖾𝖽 𝖿𝗋𝗈𝗆 𝗎𝗌𝗂𝗇𝗀 𝗥.𝗖.𝗕. 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 ${global.config.BOTNAME} 𝖻𝗒 𝖻𝖺𝗇.`, idgr, () =>
            api.sendMessage(`${api.getCurrentUserID()}`, () =>
              api.sendMessage(`★★𝗕𝗮𝗻 𝗦𝘂𝗰𝗰𝗲𝘀𝘀★★\n━━━━━━━━━━━━━━━━━━━\n🔷 | ${groupName} \n🔰 | 𝗧𝗜𝗗: ${idgr}`, threadID, () =>
                api.unsendMessage(handleReply.messageID))));
        }

        if (arg[0] == "unban" || arg[0] == "Unban" || arg[0] == "ub" || arg[0] == "Ub") {
          const data = (await Threads.getData(idgr)).data || {};
          data.banned = 0;
          data.dateAdded = null;
          await Threads.setData(idgr, { data });
          global.data.threadBanned.delete(idgr, 1);
          return api.sendMessage(`𝗡𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻𝘀 𝗙𝗿𝗼𝗺 𝗠𝗮𝘀𝘁𝗲𝗿\n━━━━━━━━━━━━━━━━━━━\n 𝖦𝗋𝗈𝗎𝗉 𝗈𝖿 𝖿𝗋𝗂𝖾𝗇𝖽𝗌 𝗍𝗁𝖺𝗍 𝗁𝖺𝗏𝖾 𝖻𝖾𝖾𝗇 𝗋𝖾𝗆𝗈𝗏𝖾𝖽 𝖻𝗈𝖺𝗋𝖽.`, idgr, () =>
            api.sendMessage(`${api.getCurrentUserID()}`, () =>
              api.sendMessage(`★★𝐔𝐧𝐛𝐚𝐧𝐒𝐮𝐜𝐜𝐞𝐬𝐬★★\n━━━━━━━━━━━━━━━━━━━\n🔷 | ${groupName} \n🔰 | 𝐓𝐈𝐃: ${idgr} `, threadID, () =>
                api.unsendMessage(handleReply.messageID))));
        }

        if (arg[0] == "del" || arg[0] == "Del") {
          const data = (await Threads.getData(idgr)).data || {};
          await Threads.delData(idgr, { data });
          console.log(groupName)
          api.sendMessage(`★★𝐃𝐞𝐥𝐒𝐮𝐜𝐜𝐞𝐬𝐬★★\n━━━━━━━━━━━━━━━━━━━\n🔷 | ${groupName} \n🔰 | 𝐓𝐈𝐃: ${idgr} \n━━━━━━━━━━━━━━━━━━━\n𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝗍𝗁𝖾 𝖽𝖺𝗍𝖺.`, event.threadID, event.messageID);
          break;
        }

        if (arg[0] == "out" || arg[0] == "Out") {
          api.sendMessage(`𝗡𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻𝘀 𝗙𝗿𝗼𝗺 𝗠𝗮𝘀𝘁𝗲𝗿\n\n★★𝗗𝗲𝗹𝗲𝘁𝗲𝗱 𝗳𝗿𝗼𝗺 𝗰𝗵𝗮𝘁★★`, idgr, () =>
            api.sendMessage(`${api.getCurrentUserID()}`, () =>
              api.sendMessage(`★★𝐎𝐮𝐭𝐒𝐮𝐜𝐜𝐞𝐬𝐬★★\n━━━━━━━━━━━━━━━━━━━\n🔷 | ${groupName} \n🔰 | 𝐓𝐈𝐃: ${idgr} `, threadID, () =>
                api.unsendMessage(handleReply.messageID, () =>
                  api.removeUserFromGroup(`${api.getCurrentUserID()}`, idgr)))));
          break;
        }
      }
  }
};
module.exports.run = async function ({ api, event, args }) {
  switch (args[0]) {
    case "all":
      {
        var threadList = [];
        var data, msg = "";
        /////////
        try {
          data = await api.getThreadList(100, null, ["INBOX"]);
        } catch (e) {
          console.log(e);
        }
        for (const thread of data) {
          if (thread.isGroup == true) threadList.push({ threadName: thread.name, threadID: thread.threadID, messageCount: thread.messageCount });
        }
        /////////////////////////////////////////////////////
        //===== sắp xếp từ cao đến thấp cho từng nhóm =====//
        threadList.sort((a, b) => {
          if (a.messageCount > b.messageCount) return -1;
          if (a.messageCount < b.messageCount) return 1;
        })

        var groupid = [];
        var groupName = [];
        var page = 1;
        page = parseInt(args[0]) || 1;
        page < -1 ? page = 1 : "";
        var limit = 100;
        var msg = "🎭 | 𝗗𝗦 𝗚𝗥𝗢𝗨𝗣 [𝖣𝖺𝗍𝖺]\n━━━━━━━━━━━━━━━━━━━\n";
        var numPage = Math.ceil(threadList.length / limit);

        for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
          if (i >= threadList.length) break;
          let group = threadList[i];
          msg += `${i + 1}. ${group.threadName}\n🔰 | 𝐓𝐈𝐃: ${group.threadID}\n💌 | 𝐌𝐞𝐬𝐬𝐚𝐠𝐞𝐂𝐨𝐮𝐧𝐭: ${group.messageCount}\n`;
          groupid.push(group.threadID);
          groupName.push(group.threadName);
        }
        msg += `➤𝗣𝗮𝗴𝗲: ⟬${page}/${numPage}⟭\n𝗗𝘆 ${global.config.PREFIX}𝖺𝗅𝗅𝖻𝗈𝗑 𝗉𝖺𝗀𝖾 𝗇𝗎𝗆𝖻𝖾𝗋/𝖺𝗅𝗅\n\n`

        api.sendMessage(msg + 'ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗋𝖾𝗉𝗅𝗒 𝗈𝗎𝗍, 𝖻𝖺𝗇, 𝗎𝗇𝖻𝖺𝗇, 𝖽𝖾𝗅[𝖽𝖺𝗍𝖺] 𝗍𝗁𝖾 𝗈𝗋𝖽𝖾𝗋 𝗇𝗎𝗆𝖻𝖾𝗋 𝗍𝗈 𝗈𝗎𝗍, 𝖻𝖺𝗇, 𝗎𝗇𝖻𝖺𝗇, 𝖽𝖾𝗅[𝖽𝖺𝗍𝖺] 𝗍𝗁𝖺𝗍 𝗀𝗋𝗈𝗎𝗉.', event.threadID, (e, data) =>
          global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: data.messageID,
            groupid,
            groupName,
            type: 'reply'
          })
        )
      }
      break;

    default:
      /*
          var threadList = [];
          var data, msg = "";
          /////////
          try {
              data = await api.getThreadList(1000, null, ["INBOX"]);
          } catch (e) {
              console.log(e);
          }
          for (const thread of data) {
              if (thread.isGroup == true) threadList.push({ threadName: thread.name, threadID: thread.threadID, messageCount: thread.messageCount });
          }
          /////////////////////////////////////////////////////
          //===== sắp xếp từ cao đến thấp cho từng nhóm =====//
          threadList.sort((a, b) => {
              if (a.messageCount > b.messageCount) return -1;
              if (a.messageCount < b.messageCount) return 1;
          })

          var groupid = [];
          var groupName = [];
          var page = 1;
          page = parseInt(args[0]) || 1;
          page < -1 ? page = 1 : "";
          var limit = 10;
          var msg = "🎭𝗗𝗦 𝗚𝗿𝗼𝘂𝗽 [Data]🎭\n\n";
          var numPage = Math.ceil(threadList.length / limit);

          for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
              if (i >= threadList.length) break;
              let group = threadList[i];
              msg += `${i+1}. ${group.threadName}\n🔰𝐓𝐈𝐃: ${group.threadID}\n💌𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐂𝐨𝐮𝐧𝐭: ${group.messageCount}\n\n`;
              groupid.push(group.threadID);
              groupName.push(group.threadName);
          }
          msg += `--Trang ${page}/${numPage}--\nDùng ${global.config.PREFIX}allbox + số trang/all\n\n`

          api.sendMessage(msg + 'Master, please reply Out, Ban, Unban, Del[data] the order number to Out, Ban, Unban, Del[data] that thread!', event.threadID, (e, data) =>
              global.client.handleReply.push({
                  name: this.config.name,
                  author: event.senderID,
                  messageID: data.messageID,
                  groupid,
                  groupName,
                  type: 'reply'
              })
          );
          break;
  }*/

      const { threadID, messageID } = event;
      var threadList = [];
      var data, msg = "";
      i = 1;
      /////////
      try {
		  //var listUserID = event.participantIDs.filter(ID => ID);
        data = global.data.allThreadID;
		
      } catch (e) {
        console.log(e);
      }
      for (const thread of data) {
        var nameThread = await global.data.threadInfo.get(thread).threadName || "The name doesn't exist.";
         threadList.push(`${i++}. ${nameThread} \n🔰 | 𝐓𝐈𝐃: ${thread}`);
		  //console.log(`${nameThread}`);
      }
 
	   return api.sendMessage(threadList.length != 0 ? api.sendMessage(`🍄 | 𝐓𝐡𝐞𝐫𝐞 𝐢𝐬 𝐜𝐮𝐫𝐫𝐞𝐧𝐭𝐥𝐲 ${threadList.length} 𝐠𝐫𝐨𝐮𝐩\n\n${threadList.join("\n")}`,
          threadID,
          messageID
        ) : "❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾 𝗂𝗌 𝗇𝗈 𝖼𝗎𝗋𝗋𝖾𝗇𝗍𝗅𝗒 𝗀𝗋𝗈𝗎𝗉.", threadID, messageID);
      
      }
  };
