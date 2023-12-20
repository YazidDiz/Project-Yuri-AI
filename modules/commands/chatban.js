 const num = 10
 const timee = 15 // During `timee` spam `num` times will be banned
 module.exports.config = {
  name: "chatban",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: `automatically ban users if spam chats ${num} time/${timee}s`,
  commandCategory: "system",
  cooldowns: 5
};

module.exports. run = async function ({api, event})  {
  return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨 𝗐𝗂𝗅𝗅 𝖺𝗎𝗍𝗈𝗆𝖺𝗍𝗂𝖼𝖺𝗅𝗅𝗒 𝖻𝖺𝗇 𝗎𝗌𝖾𝗋𝗌 𝗂𝖿 𝗍𝗁𝖾𝗒 𝗌𝗉𝖺𝗆 《${num}》 《𝗍𝗂𝗆𝖾/${timee}𝗌》`, event.threadID, event.messageID);
};

module.exports.handleEvent = async function ({ Users, Threads, api, event})  {
  let { senderID, messageID, threadID } = event;
  var datathread = (await Threads.getData(event.threadID)).threadInfo;
  
  if (!global.client.autoban) global.client.autoban = {};
  
  if (!global.client.autoban[senderID]) {
    global.client.autoban[senderID] = {
      timeStart: Date.now(),
      number: 0
    }
  };
  
  const threadSetting = global.data.threadData.get(threadID) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  if (!event.body || event.body != 0) return;
  
  if ((global.client.autoban[senderID].timeStart + (timee*1000)) <= Date.now()) {
    global.client.autoban[senderID] = {
      timeStart: Date.now(),
      number: 0
    }
  }
  else {
    global.client.autoban[senderID].number++;
    if (global.client.autoban[senderID].number >= num) {
      var namethread = datathread.threadName;
      const moment = require("moment-timezone");
      const timeDate = moment.tz("Asia/Manila").format("DD/MM/YYYY HH:mm:ss");
      let dataUser = await Users.getData(senderID) || {};
      let data = dataUser.data || {};
      if (data && data.banned == true) return;
      data.banned = true;
      data.reason = `𝖲𝗉𝖺𝗆𝗆𝗂𝗇𝗀 𝖼𝗁𝖺𝗍 ${num} 𝗍𝗂𝗆𝖾𝗌` || null;
      data.dateAdded = timeDate;
      await Users.setData(senderID, { data });
      global.data.userBanned.set(senderID, { reason: data.reason, dateAdded: data.dateAdded });
      global.client.autoban[senderID] = {
        timeStart: Date.now(),
        number: 0
      };
      api.sendMessage("🚫 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝖻𝖾𝖾𝗇 𝖻𝖺𝗇𝗇𝖾𝖽 𝗎𝗌𝗂𝗇𝗀 𝗆𝖾\n𝗜𝗗: " + senderID + " \n𝗡𝗮𝗺𝗲: " + dataUser.name + `\n𝗥𝗲𝗮𝘀𝗼𝗻: 𝗌𝗉𝖺𝗆 𝖼𝗁𝖺𝗍 ${num} 𝗌𝗂𝗆𝖾 ${timee}𝗌\n\n𝖢𝗈𝗇𝗍𝖺𝖼𝗍 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋 𝗍𝗈 𝗎𝗇𝖻𝖺𝗇 𝗂𝗆𝗆𝖾𝖽𝗂𝖺𝗍𝖾𝗅𝗒`, threadID,
    () => {
    var idad = global.config.ADMINBOT;
    for(let ad of idad) {
        api.sendMessage(`╔ೋღ˙ 𝗖𝗛𝗔𝗧 𝗕𝗔𝗡 ˙ღೋ╗\n             𝗦𝗽𝗮𝗺 𝗢𝗳𝗳𝗲𝗻𝗱𝗲𝗿𝘀:\n${num} \n𝗍𝗂𝗆𝖾/${timee}𝗌\n𝗡𝗮𝗺𝗲:\n${dataUser.name}\n𝗦𝗲𝗻𝗱𝗲𝗿 𝗜𝗗:\n${senderID}\n𝗚𝗿𝗼𝘂𝗽 𝗜𝗗:\n${threadID}\n𝗚𝗿𝗼𝘂𝗽 𝗡𝗮𝗺𝗲:\n${namethread}\n𝗧𝗶𝗺𝗲:\n${timeDate}\n\n꙳☪︎●◉✿𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜✿◉●☪︎꙳\n╚═══ೋღ∘🌺∘ღೋ═══╝`, 
          ad);
    }
    })
    }
  }
};

