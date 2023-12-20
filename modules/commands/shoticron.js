const cron = require('node-cron');
const axios = require("axios");
const request = require('request');
const fs = require("fs");

const activeThreads = {};

module.exports.config = {
  name: "shoticron",
  version: "2.0.0",
  hasPermission: 2,
  credits: "Clark",
  description: "Automaticaly send shoti with on and off",
  commandCategory: "cron",
  usages: "[on/off]",
  cooldowns: 5,
};

module.exports.run = async function({api, event, input}) {
const args = event.body.split(" ");
  const threadID = event.threadID;

  if (args[1] === "on") {
if (!activeThreads[threadID]) {
activeThreads[threadID] = true;
api.sendMessage(`🟢 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖺𝗎𝗍𝗈𝗆𝖺𝗍𝗂𝖼 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗈𝖿 𝗏𝗂𝖽𝖾𝗈𝗌 𝗂𝗌 𝗇𝗈𝗐 𝖾𝗇𝖺𝖻𝗅𝖾.`, event.threadID, (err, info) =>
setTimeout(() => {
  api.unsendMessage(info.messageID) } , 20000),event.messageID);

cron.schedule('*/2 * * * *', async () => {
  try {
if (activeThreads[threadID]) { 
let response = await axios.post(
"https://api--v1-shoti.vercel.app/api/v1/get",
{
apikey: "$shoti-1hfdaljvdsfauofg7j",
},
);
var file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
const userInfo = response.data.data.user;
  const username = userInfo.username;
  const nickname = userInfo.nickname;
const tid = event.threadID
var rqs = request(encodeURI(response.data.data.url));
rqs.pipe(file);
file.on('finish', () => {
  api.sendMessage(
{
  body: `𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: @${username}\n𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲: ${nickname}\n𝗧𝗶𝗱: ${tid}`,
attachment: fs.createReadStream(__dirname + '/cache/shoti.mp4')
  }, threadID, (error, info) => {
if (!error) {
fs.unlinkSync(__dirname + '/cache/shoti.mp4');
}
  });
});
}
  } catch (error) {
console.error('Error:', error);
  }
});
} else {
api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖺𝗎𝗍𝗈𝗆𝖺𝗍𝗂𝖼 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗈𝖿 𝗏𝗂𝖽𝖾𝗈𝗌 𝗂𝗌 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 𝖮𝖭 𝗂𝗇 𝗍𝗁𝗂𝗌 𝗍𝗁𝗋𝖾𝖺𝖽.", threadID);
}
  } else if (args[1] === "off") {
if (activeThreads[threadID]) {
activeThreads[threadID] = false;
api.sendMessage(`🔴 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖺𝗎𝗍𝗈𝗆𝖺𝗍𝗂𝖼 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗈𝖿 𝗏𝗂𝖽𝖾𝗈𝗌 𝗂𝗌 𝗇𝗈𝗐 𝖽𝗂𝗌𝖺𝖻𝗅𝖾.`, threadID);
} else {
api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖺𝗎𝗍𝗈𝗆𝖺𝗍𝗂𝖼 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗈𝖿 𝗏𝗂𝖽𝖾𝗈𝗌 𝗂𝗌 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 𝖮𝖥𝖥 𝗂𝗇 𝗍𝗁𝗂𝗌 𝗍𝗁𝗋𝖾𝖺𝖽.", threadID);
}
  }
};