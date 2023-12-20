module.exports.config = {
  name: "status",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "check the bot status",
  commandCategory: "system",
  usages: "[status]",
  cooldowns: 3,
  denpendencies: {
  }
};

module.exports.run = async function ({ api, event, Threads, getText }) {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, senderID } = event;
  //if (senderID == global.data.botID) return;

  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data;
  //console.log(data)
  //var prefix = data.PREFIX;
  var rankup = data.rankup;
  var resend = data.resend;
  var log = data.log;
  var tagadmin = data.tagadmin;
  var guard = data.guard;
  var antiout = data.antiout;
  //prefix == null ? rankup = `!` : rankup = `${prefix}`;
  log == null ? log = `𝗍𝗋𝗎𝖾` : log = `${log}`;
  rankup == null ? rankup = `𝖿𝖺𝗅𝗌𝖾` : rankup = `${rankup}`;
  resend == null ? resend = `𝖿𝖺𝗅𝗌𝖾` : resend = `${resend}`;
  tagadmin == null ? tagadmin = `𝗍𝗋𝗎𝖾` : tagadmin = `${tagadmin}`;
  guard == null ? guard = `𝗍𝗋𝗎𝖾` : guard = `${guard}`;
  antiout == null ? antiout = `𝗍𝗋𝗎𝖾` : antiout = `${antiout}`;
return api.sendMessage(`╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n  ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n   ☣️ 𝗧𝗮𝗯𝗹𝗲 ☣️ \n\n❯ 🍉 | 𝗟𝗼𝗴: ${log}\n❯ 🍇 𝗥𝗮𝗻𝗸𝘂𝗽: ${rankup}\n❯ 🍓 | 𝗥𝗲𝘀𝗲𝗻𝗱: ${resend}\n❯ 🥕 | 𝗧𝗮𝗴 𝗮𝗱𝗺𝗶𝗻: ${tagadmin}\n❯ 🍑 | 𝗔𝗻𝘁𝗶𝗿𝗼𝗯𝗯𝗲𝗿𝘆 ${guard}\n❯ 🍒 | 𝗔𝗻𝘁𝗶𝗼𝘂𝘁: ${antiout}`, threadID, messageID);
}
