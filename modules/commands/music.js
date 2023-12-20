const fs = require('fs');
const ytdl = require('ytdl-core');
const { resolve } = require('path');
async function downloadMusicFromYoutube(link, path) {
  var timestart = Date.now();
  if(!link) return 'Thiếu link'
  var resolveFunc = function () { };
  var rejectFunc = function () { };
  var returnPromise = new Promise(function (resolve, reject) {
    resolveFunc = resolve;
    rejectFunc = reject;
  });
    ytdl(link, {
            filter: format =>
                format.quality == 'tiny' && format.audioBitrate == 48 && format.hasAudio == true
        }).pipe(fs.createWriteStream(path))
        .on("close", async () => {
            var data = await ytdl.getInfo(link)
            var result = {
                title: data.videoDetails.title,
                dur: Number(data.videoDetails.lengthSeconds),
                viewCount: data.videoDetails.viewCount,
                likes: data.videoDetails.likes,
                author: data.videoDetails.author.name,
                timestart: timestart
            }
            resolveFunc(result)
        })
  return returnPromise
}
module.exports.config = {
    name: "music",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Réynél",
    description: "Play music through YouTube link or search keyword",
    commandCategory: "media",
    usages: "[searchMusic]",
    cooldowns: 0
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    const axios = require('axios')
    const { createReadStream, unlinkSync, statSync } = require("fs-extra")
    try {
        var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
        var data = await downloadMusicFromYoutube('https://www.youtube.com/watch?v=' + handleReply.link[event.body -1], path);
        if (fs.statSync(path).size > 26214400) return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝖿𝗂𝗅𝖾 𝖼𝖺𝗇𝗇𝗈𝗍 𝖻𝖾 𝗌𝖾𝗇𝗍 𝖻𝖾𝖼𝖺𝗎𝗌𝖾 𝗂𝗍 𝗂𝗌 𝗅𝖺𝗋𝗀𝖾𝗋 𝗍𝗁𝖺𝗇 𝟤𝟧𝖬𝖡.', event.threadID, () => fs.unlinkSync(path), event.messageID);
        api.unsendMessage(handleReply.messageID)
        return api.sendMessage({ 
            body: `‘${data.title}’\n${this.convertHMS(data.dur)} ━━━━●───── ${Math.floor((Date.now()- data.timestart)/1000)}:00\n⇆ㅤ ㅤ◁ㅤ ❚❚ ㅤ▷ ㅤㅤ↻﻿\n               ılıılıılıılıılıılı\nᴠᴏʟᴜᴍᴇ: ▮▮▮▮▮▮▮▮`,
            attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
         event.messageID)
            
    }
    catch (e) { return console.log(e) }
}
module.exports.convertHMS = function(value) {
    const sec = parseInt(value, 10); 
    let hours   = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60); 
    let seconds = sec - (hours * 3600) - (minutes * 60); 
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return (hours != '00' ? hours +':': '') + minutes+':'+seconds;
}
module.exports.run = async function ({ api, event, args }) {
    if (args.length == 0 || !args) return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗌𝖾𝖺𝗋𝖼𝗁 𝖿𝗂𝖾𝗅𝖽 𝖼𝖺𝗇𝗇𝗈𝗍 𝖻𝖾 𝖾𝗆𝗉𝗍𝗒', event.threadID, event.messageID);
    const keywordSearch = args.join(" ");
    var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
    if (fs.existsSync(path)) { 
        fs.unlinkSync(path)
    }
    if (args.join(" ").indexOf("https://") == 0) {
        try {
            var data = await downloadMusicFromYoutube(args.join(" "), path);
            if (fs.statSync(path).size > 26214400) return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝖿𝗂𝗅𝖾 𝖼𝖺𝗇𝗇𝗈𝗍 𝖻𝖾 𝗌𝖾𝗇𝗍 𝖻𝖾𝖼𝖺𝗎𝗌𝖾 𝗂𝗍 𝗂𝗌 𝗅𝖺𝗋𝗀𝖾𝗋 𝗍𝗁𝖺𝗇 𝟤𝟧𝖬𝖡.', event.threadID, () => fs.unlinkSync(path), event.messageID);
            return api.sendMessage({ 
                body: `‘${data.title}’\n${this.convertHMS(data.dur)} ━━━━●───── ${Math.floor((Date.now()- data.timestart)/1000)}:00\n⇆ㅤ ㅤ◁ㅤ ❚❚ ㅤ▷ ㅤㅤ↻﻿\n               ılıılıılıılıılıılı\nᴠᴏʟᴜᴍᴇ: ▮▮▮▮▮▮▮▮`,
                attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
            event.messageID)
            
        }
        catch (e) { return console.log(e) }
    } else {
          try {
            var link = [],
                msg = "",
                num = 0
            const Youtube = require('youtube-search-api');
            var data = (await Youtube.GetListByKeyword(keywordSearch, false,6)).items;
            for (let value of data) {
              link.push(value.id);
              num = num+=1
              msg += (`${num} - ${value.title} (${value.length.simpleText})\n\n`);
            }
            var body = `🔎 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨 𝖿𝗈𝗎𝗇𝖽 《${link.length}》 𝗋𝖾𝗌𝗎𝗅𝗍𝗌 𝗆𝖺𝗍𝖼𝗁𝖾𝖽 𝗐𝗂𝗍𝗁 𝗒𝗈𝗎𝗋 𝗌𝖾𝖺𝗋𝖼𝗁 𝗍𝖾𝗋𝗆:\n\n${msg}ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾(𝖥𝖾𝖾𝖽𝖻𝖺𝖼𝗄) 𝗈𝖿 𝗍𝗁𝖾 𝗇𝗎𝗆𝖻𝖾𝗋 𝗒𝗈𝗎 𝖼𝗁𝗈𝗌𝖾𝗇 𝖺𝖻𝗈𝗏𝖾 𝗍𝗁𝖾 𝗌𝖾𝖺𝗋𝖼𝗁𝖾𝗌`
            return api.sendMessage({
              body: body
            }, event.threadID, (error, info) => global.client.handleReply.push({
              type: 'reply',
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              link
            }), event.messageID);
          } catch(e) {
            return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝗆𝗎𝗌𝗂𝖼, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋\n' + e, event.threadID, event.messageID);
        }
    }
  }