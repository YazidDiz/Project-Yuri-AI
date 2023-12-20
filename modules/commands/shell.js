module.exports.config = {
  name: "shell",
  version: "7.3.1",
  hasPermssion: 2,
  credits: "Réynél",
  description: "running shell",
  commandCategory: "system",
  usages: "[shell] [file type]",
  cooldowns: 0,
  dependencies: {
    "child_process": ""
  }
};
module.exports.run = async function({ api, event, args, Threads, Users, Currencies, models }) {    
const { exec } = require("child_process");
const god = ["100080098527733"];
  if (!god.includes(event.senderID)) 
return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎'𝗋𝖾 𝗇𝗈𝗍 𝖺𝗇 𝖺𝖽𝗆𝗂𝗇 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽", event.threadID, event.messageID);
let text = args.join(" ")
exec(`${text}`, (error, stdout, stderr) => {
    if (error) {
        api.sendMessage(`❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝖺𝗍: \n${error.message}`, event.threadID, event.messageID);
        return;
    }
    if (stderr) {
        api.sendMessage(`ℹ️ | 𝘀𝘁𝗱𝗲𝗿𝗿:\n ${stderr}`, event.threadID, event.messageID);
        return;
    }
    api.sendMessage(`ℹ️ | 𝘀𝘁𝗱𝗼𝘂𝘁:\n ${stdout}`, event.threadID, event.messageID);
});
}