module.exports.config = {
  name: 'spam',
  version: '1.0',
  hasPermssion: 2,
  credits: 'Réynél',
  description: 'spam a message multiple times',
  commandCategory: "admin",
  usages: "[amount] [message]",
  cooldowns: 2 
};
  
module.exports.run = async function ({ api, event, args }) {
     
      const amount = parseInt(args[0]);
      const message = args.slice(1).join(" ");
  
      if (isNaN(amount) || !message) {
          return api.sendMessage(`❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗎𝗌𝖺𝗀𝖾.\n🎓 | 𝗨𝘀𝗮𝗴𝗲: ${global.config.PREFIX}𝗌𝗉𝖺𝗆 [𝖺𝗆𝗈𝗎𝗇𝗍] [𝗆𝖾𝗌𝗌𝖺𝗀𝖾]`, event.threadID);
      }
  
      for (let i = 0; i < amount; i++) {
          api.sendMessage(message, event.threadID);
      }
};