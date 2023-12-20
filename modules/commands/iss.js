const request = require('request');

module.exports.config = {
  name: "iss",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "See the coordinates that the spacecraft is in Lac",
  commandCategory: "information",
  usages: "[iss]",
  cooldowns: 5,
  dependencies: {
    "request": ""
  }
};

module.exports.run = function({
  api,
  event,
  args,
  client,
  __GLOBAL
}) {
  return request(`http://api.open-notify.org/iss-now.json`, (err, response, body) => {
    if (err) throw err;
    var jsonData = JSON.parse(body);
    api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝖼𝗎𝗋𝗋𝖾𝗇𝗍 𝗅𝗈𝖼𝖺𝗍𝗂𝗈𝗇 𝗈𝖿 𝗂𝗇𝗍𝖾𝗋𝗇𝖺𝗍𝗂𝗈𝗇𝖺𝗅 𝗌𝗉𝖺𝖼𝖾  🌌🌠🌃 \n-𝖫𝖺𝗍𝗂𝗍𝗂𝖽𝖾: ${jsonData.iss_position.latitude}\n- 𝖫𝗈𝗇𝗀𝗂𝗍𝗎𝖽𝖾: ${jsonData.iss_position.longitude}`, event.threadID, event.messageID);
  });
}