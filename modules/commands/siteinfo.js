//https://list.ly/api/v4/meta?url=
//var a = res.data.name;
//var b = res.data.description;
//var c = res.data.image;
﻿module.exports.config = {
  name: "siteinf",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "View site info",
  commandCategory: "information",
  usages: "[site]",
  cooldowns: 5
};

module.exports.run = async (
{
  api,
  event,
  args
}) =>
{
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  var juswa = args.join(" ");
  if (!juswa) return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖺𝖽𝖽 𝗎𝗋𝗅 𝗌𝗂𝗍𝖾`, event.threadID, event.messageID);
  else
  {
    axios.get(`https://list.ly/api/v4/meta?url=${encodeURIComponent(juswa)}`).then(res =>
    {
      let a = res.data.name,
        b = res.data.description,
        d = res.data.url
      var c = res.data.image;
      let callback = function ()
      {
        api.sendMessage(
        {
          body: `╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n  ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n\n𝗡𝗮𝗺𝗲: ${a}\n\n𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${b}\n\n𝗥𝗲𝗹𝗲𝗮𝘀𝗲 𝗗𝗮𝘁𝗲: ${date}\n\n𝗨𝗿𝗹: ${d}`,
          attachment: fs.createReadStream(__dirname + `/cache/juswa.png`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/juswa.png`), event.messageID);
      };
      request(encodeURI(c)).pipe(fs.createWriteStream(__dirname + `/cache/juswa.png`)).on("close", callback);
    })
  }
}