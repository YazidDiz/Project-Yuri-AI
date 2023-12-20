module.exports.config = {
  name: "worldclock",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Clark",
  description: "View the dates and times of Country",
  commandCategory: "general",
  cooldowns: 2
};
module.exports.run = async ({ api, event }) => {
  const axios = require('axios');
  const fetch = global.nodemodule["node-fetch"];
  const request = require('request');
  const fs = require("fs");
  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
  var gio2 = moment.tz("Europe/Lodon").format("HH:mm:ss || D/MM/YYYY");
  var gio1 = moment.tz("America/Brasília").format("HH:mm:ss || D/MM/YYYY");
  var gio3 = moment.tz("Asia/Seoul").format("HH:mm:ss || D/MM/YYYY");
  var gio4 = moment.tz("Asia/Tokyo").format("HH:mm:ss || D/MM/YYYY");
  var gio5 = moment.tz("America/New_York").format("HH:mm:ss || D/MM/YYYY");
  var gio6 = moment.tz("Asia/Kuala_Lumpur").format("HH:mm:ss || D/MM/YYYY");var gio1 = moment.tz("America/New_York").format("HH:mm:ss || D/MM/YYYY");
  var gio7 = moment.tz("Europe/Paris").format("HH:mm:ss || D/MM/YYYY");
  var gio8 = moment.tz("Asia/Manila").format("HH:mm:ss || D/MM/YYYY");//add pa kayo kung gusto nyo
  axios.get('https://apituandz1407.herokuapp.com/api/gaisexy.php').then(res => {
 let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let callback = function () {
  api.sendMessage({
  body: `𝗩𝗶𝗲𝘄 𝗗𝗮𝘁𝗲𝘀 𝗶𝗻 𝗖𝗼𝘂𝗻𝘁𝗿𝘆:\n━━━━━━━━━━━━━━━━━━━\n🇵🇭𝗣𝗵𝗶𝗹𝗶𝗽𝗽𝗶𝗻𝗲𝘀: ${gio8}\n🇻🇳 𝗩𝗶𝗲𝘁𝗻𝗮𝗺: ${gio}\n🇬🇧 𝗟𝗼𝗻𝗱𝗼𝗻: ${gio2}\n🇺🇸 𝗡𝗲𝘄 𝗬𝗼𝗿𝗸: ${gio5}\n🇰🇷 𝗦𝗲𝗼𝘂𝗹: ${gio3}\n🇯🇵 𝗧𝗼𝗸𝘆𝗼: ${gio4}\n🇧🇷 𝗕𝗿𝗮𝘀𝗶𝗹𝗶𝗮: ${gio1}\n🇲🇾 𝗞𝘂𝗮𝗹𝗮 𝗟𝘂𝗺𝗽𝘂𝗿: ${gio6}\n🇫🇷 𝗣𝗮𝗿𝗶𝘀: ${gio7}`,
  attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
  }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), event.messageID);
   };
  request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
  })
}