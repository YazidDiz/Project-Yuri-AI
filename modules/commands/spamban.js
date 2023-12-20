 const num = 10 //number of times spam gets banned -1, for example 5 times 6 times will get banned
 const timee = 50 // During `timee` spam `num` times will be banned
 module.exports.config = {
  name: "spamban",
  version: "2.0.0",
  hasPermssion: 2,
  credits: "Réynél",
  description: `automatically ban users if spambot ${num} times/${timee}s`,
  commandCategory: "system",
  usages: "[spamban]",
  cooldowns: 5
};

module.exports.run = async function ({api, event})  {
  return api.sendMessage(`⚠️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨 𝗐𝗂𝗅𝗅 𝖺𝗎𝗍𝗈𝗆𝖺𝗍𝗂𝖼𝖺𝗅𝗅𝗒 𝖻𝖺𝗇 𝗎𝗌𝖾𝗋𝗌 𝗂𝖿 𝗌𝗉𝖺𝗆𝗆𝖾𝖽 𝗆𝖾 𝖿𝗈𝗋 ${num} 𝗍𝗂𝗆𝖾𝗌/${timee}𝗌`, event.threadID, event.messageID);
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
  if (!event.body || event.body.indexOf(prefix) != 0) return;
  
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
      data.reason = `𝗌𝗉𝖺𝗆 𝖻𝗈𝗍 ${num} 𝗍𝗂𝗆𝖾𝗌/${timee}𝗌` || null;
      data.dateAdded = timeDate;
      await Users.setData(senderID, { data });
      global.data.userBanned.set(senderID, { reason: data.reason, dateAdded: data.dateAdded });
      global.client.autoban[senderID] = {
        timeStart: Date.now(),
        number: 0
      };
      api.sendMessage(senderID + " \n𝗡𝗮𝗺𝗲: " + dataUser.name + `\n━━━━━━━━━━━━━━━━━━━\n𝗥𝗲𝗮𝘀𝗼𝗻: 𝗌𝗉𝖺𝗆𝗆𝖾𝖽 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 ${global.config.BOTNAME} 𝖿𝗈𝗋 ${num} 𝗍𝗂𝗆𝖾𝗌/${timee}\n━━━━━━━━━━━━━━━━━━━\n📢 | 𝖸𝗈𝗎 𝗁𝖺𝗏𝖾 𝖻𝖾𝖾𝗇 𝗋𝖾𝗉𝗈𝗋𝗍𝖾𝖽 𝗍𝗈 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋.`, threadID,
    () => {
    var idad = global.config.ADMINBOT;
    for(let ad of idad) {
        api.sendMessage(`📢 | 𝖲𝗉𝖺𝗆 𝗈𝖿𝖿𝖾𝗇𝖽𝖾𝗋𝗌: ${num} 𝗍𝗂𝗆𝖾𝗌/${timee}𝗌\n━━━━━━━━━━━━━━━━━━━\n𝗡𝗮𝗺𝗲:\n${dataUser.name}\n━━━━━━━━━━━━━━━━━━━\n𝗜𝗗:\n${senderID}\n━━━━━━━━━━━━━━━━━━━\n𝗜𝗗 𝗕𝗼𝘅:\n${threadID} \n━━━━━━━━━━━━━━━━━━━\n𝗡𝗮𝗺𝗲 𝗕𝗼𝘅:\n${namethread} \n━━━━━━━━━━━━━━━━━━━\n𝗧𝗶𝗺𝗲:\n${timeDate}`, 
          ad);
    }
    })
    }
  }
};
