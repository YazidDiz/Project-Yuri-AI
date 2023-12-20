module.exports.config = {
  name: "unban",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Réynél",
  description: "Remove groups and users in 1 note",
  commandCategory: "admin",
  usages: "[unban]",
  cooldowns: 2,
  denpendencies: {}
};

module.exports.run = async ({ event, api, Users, Threads, args }) => {
  var { threadID, messageID, senderID } = event;
  
  const { commands } = global.client;
  const command = commands.get(("unban").toLowerCase());
  const credit = command.config.credits;
  var Réynél = "Réynél";
  if(credit != Réynél) return api.sendMessage(`ᴄʀᴇᴅɪᴛ ᴛᴏ ʀᴇʏɴᴇʟ`, event.threadID, event.messageID);
  
  const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  switch (args[0]) {
    case 'admin':
    case 'ad':
      {
        const listAdmin = global.config.ADMINBOT;
        for (var idad of listAdmin) {
          const data = (await Users.getData(idad)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(idad, { data });
          global.data.userBanned.delete(idad, 1);
        }
        api.sendMessage("《 𝗠𝗢𝗗𝗘 》\n\n🚫 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖻𝖺𝗇𝗇𝖾𝖽 𝖿𝗈𝗋 𝖺𝗅𝗅 𝖺𝖽𝗆𝗂𝗇 𝖻𝗈𝗍.", threadID, messageID)
        break;
      }

    case 'ndh':
      {
        const listNDH = global.config.NDH;
        for (var idNDH of listNDH) {
          const data = (await Users.getData(idNDH)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(idNDH, { data });
          global.data.userBanned.delete(idNDH, 1);
        }
        api.sendMessage("《 𝗠𝗢𝗗𝗘 》\n\n🚫 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖻𝖺𝗇𝗇𝖾𝖽 𝖿𝗈𝗋 𝖺𝗅𝗅 𝗌𝗎𝗉𝗉𝗈𝗋𝗍𝖾𝗋𝗌", threadID, messageID)
        break;
      }


    case 'allbox':
    case 'allthread':
      {
        const threadBanned = global.data.threadBanned.keys();
        for (const singleThread of threadBanned) {
          const data = (await Threads.getData(singleThread)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Threads.setData(singleThread, { data });
          global.data.userBanned.delete(singleThread, 1);
        }
        api.sendMessage("《 𝗠𝗢𝗗𝗘 》\n\n🚫 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖻𝖺𝗇𝗇𝖾𝖽 𝖿𝗈𝗋 𝗍𝗁𝖾 𝖾𝗇𝗍𝗂𝗋𝖾 𝗀𝗋𝗈𝗎𝗉 𝗈𝗇 𝗍𝗁𝖾 𝗌𝖾𝗋𝗏𝖾𝗋.", threadID, messageID)
        break;
      }

    case 'box':
    case 'thread':
      {
        var idbox = event.threadID;
        var data = (await Threads.getData(idbox)).data || {};
        data.banned = 0;
        data.reason = null;
        data.dateAdded = null;
        await Threads.setData(idbox, { data });
        global.data.userBanned.delete(idbox, 1);
        api.sendMessage("《 𝗠𝗢𝗗𝗘 》\n\n⭕ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝖻𝖺𝗇 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗋𝖾𝗆𝗈𝗏𝖾𝖽 𝖿𝗈𝗋 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉.", threadID, messageID)
        break;
      }

    case 'allmember':
    case 'alluser':
      {
        const userBanned = global.data.userBanned.keys();
        for (const singleUser of userBanned) {
          const data = (await Users.getData(singleUser)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(singleUser, { data });
          global.data.userBanned.delete(singleUser, 1);
        }
        api.sendMessage("《 𝗠𝗢𝗗𝗘 》\n\n🚫 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖻𝖺𝗇𝗇𝖾𝖽 𝖿𝗈𝗋 𝖺𝗅𝗅 𝗎𝗌𝖾𝗋𝗌 𝗈𝗇 𝗍𝗁𝖾 𝗌𝖾𝗋𝗏𝖾𝗋.", threadID, messageID)
        break;
      }

    case 'qtvall':
    case 'Qtvall':
    case 'allqtv':
      {
        var data = [];
        data = await Threads.getAll();

        for (let i = 0; i < data.length; i++) {
          const idAdmins = (data[i].threadInfo).adminIDs;
          for (let i = 0; i < idAdmins.length; i++) {
            const idad = idAdmins[i].id;

            const data = (await Users.getData(idad)).data || {};
            data.banned = 0;
            data.reason = null;
            data.dateAdded = null;
            await Users.setData(idad, { data });
            global.data.userBanned.delete(idad, 1);
          }
        }
        api.sendMessage('《 𝗠𝗢𝗗𝗘 》\n\n🚫 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖻𝖺𝗇𝗇𝖾𝖽 𝖿𝗈𝗋 𝖺𝗅𝗅 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝗍𝗈𝗋𝗌 𝗈𝗇 𝗍𝗁𝖾 𝗌𝖾𝗋𝗏𝖾𝗋.', threadID, messageID);
        break;
      }

    case 'qtv':
    case 'Qtv':
      {
        //var threadInfo = await api.getThreadInfo(event.threadID);
        var threadInfo = (await Threads.getData(event.threadID)).threadInfo;
        var listQTV = threadInfo.adminIDs;
        for (let i = 0; i < listQTV.length; i++) {
          const idQtv = listQTV[i].id;
          const data = (await Users.getData(idQtv)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(idQtv, { data });
          global.data.userBanned.delete(idQtv, 1);
        }
        api.sendMessage("《 𝗠𝗢𝗗𝗘 》\n\n🚫 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖻𝖺𝗇𝗇𝖾𝖽 𝖿𝗈𝗋 𝖺𝗅𝗅 𝖺𝖽𝗆𝗂𝗇𝗌 𝗈𝖿 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉.", threadID, messageID)
        break;
      }

    case 'member':
    case 'mb':
    case 'user':
      {
        if (!args[1]) {
         // var threadInfo = await api.getThreadInfo(event.threadID);
          //var threadInfo = (await Threads.getData(event.threadID)).threadInfo;
          var listMember = event.participantIDs;
          for (let i = 0; i < listMember.length; i++) {
            const idMember = listMember[i];
            const data = (await Users.getData(idMember)).data || {};
            data.banned = 0;
            data.reason = null;
            data.dateAdded = null;
            await Users.setData(idMember, { data });
            global.data.userBanned.delete(idMember, 1);
          }
          return api.sendMessage("《 𝗠𝗢𝗗𝗘 》\n\n🚫 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖻𝖺𝗇𝗇𝖾𝖽 𝖿𝗈𝗋 𝖺𝗅𝗅 𝗆𝖾𝗆𝖻𝖾𝗋𝗌 𝗈𝖿 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉.", threadID, messageID);
        }
        if (args.join().indexOf('@') !== -1) {
          var mentions = Object.keys(event.mentions)
          var userID = (await Users.getData(mentions)).userID;
          var nameUser = (await Users.getData(mentions)).name;
          const data = (await Users.getData(userID)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(userID, { data });
          global.data.userBanned.delete(userID, 1);
          return api.sendMessage(`《 𝗠𝗢𝗗𝗘 》\n\n⭕ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗎𝗌𝖾𝗋 ${nameUser} 𝖻𝖺𝗇 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗋𝖾𝗆𝗈𝗏𝖾𝖽.`, threadID, messageID)
        }
        break;
      }

    default:
      api.sendMessage(`《 𝗨𝗡𝗕𝗔𝗡 𝗖𝗢𝗡𝗙𝗜𝗚 》\n◆━━━━━━━━━━━◆\n\n𝗠𝗢𝗗𝗘 - ᴜɴʙᴀɴ ᴀᴅᴍɪɴ => ʀᴇᴍᴏᴠᴇ ʙᴀɴ ғᴏʀ ᴀʟʟ ᴀᴅᴍɪɴ ʙᴏᴛ\n𝗠𝗢𝗗𝗘 - ᴜɴʙᴀɴ ɴᴅʜ => ᴜɴʙᴀɴ ᴀʟʟ sᴜᴘᴘᴏʀᴛᴇʀs\n𝗠𝗢𝗗𝗘 - ᴜɴʙᴀɴ ᴀʟʟʙᴏx => ᴜɴʙᴀɴ ᴛʜᴇ ᴇɴᴛɪʀᴇ ɢʀᴏᴜᴘ ᴏɴ ᴛʜᴇ sᴇʀᴠᴇʀ\n𝗠𝗢𝗗𝗘 - ᴜɴʙᴀɴ ʙᴏx => ᴜɴʙᴀɴ ᴛʜᴇ ᴄᴜʀʀᴇɴᴛ ɢʀᴏᴜᴘ ( 1 ɢʀᴏᴜᴘ \n𝗠𝗢𝗗𝗘 - ᴜɴʙᴀɴ ᴀʟʟᴜsᴇʀ => ᴜɴʙᴀɴ ᴀʟʟ ᴜsᴇʀs ᴏɴ ᴛʜᴇ sᴇʀᴠᴇʀ\n𝗠𝗢𝗗𝗘 - ᴜɴʙᴀɴ ᴀʟʟǫᴛᴠ => ʀᴇᴍᴏᴠᴇ ʙᴀɴ ғᴏʀ ᴀʟʟ ʙᴏᴀʀᴅs ᴠɪᴀ sᴇʀᴠᴇʀ sᴇʀᴠᴇʀ ᴀᴅᴍɪɴɪsᴛʀᴀᴛᴏʀ\n𝗠𝗢𝗗𝗘 - ᴜɴʙᴀɴ ǫᴛᴠ => ʀᴇᴍᴏᴠᴇ ʙᴀɴ ғᴏʀ ᴀʟʟ ᴀᴅᴍɪɴs ( 1 ɢʀᴏᴜᴘ )\n𝗠𝗢𝗗𝗘 - ᴜɴʙᴀɴ ᴍᴇᴍʙᴇʀ
> ᴛʏᴘᴇ ʙᴀɴ ғᴏʀ ᴀʟʟ ᴛᴇᴀᴍ ᴍᴇᴍʙᴇʀs ( 1 ɢʀᴏᴜᴘ )\n𝗠𝗢𝗗𝗘 - ᴜɴʙᴀɴ ᴍᴇᴍʙᴇʀ ᴛᴀɢ => ʀᴇᴍᴏᴠᴇ ᴛʜᴇ ʙᴀɴ ғᴏʀ ᴛʜᴇ ᴘᴇʀsᴏɴ ᴡɪᴛʜ ᴛʜᴇ ᴛᴀɢ`, threadID, messageID);
      break;
  }
}