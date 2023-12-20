module.exports.config = {
    name: "animescrape",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Réynél",
    description: "scrape anime",
    commandCategory: "anime",
    usages: "[title]",
    cooldowns: 0
  };
  
  module.exports.run = async function({ api, args, message, download, event }) {
    const cheerio = require('cheerio');
    const fs = require('fs');
    const request = require('request');
    const axios = require('axios');
var text = args.join(" ");
 // var text = input;     
//text = text.substring(13)
const url = "https://nyaa.si/?f=0&c=1_2&q="+text;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const arrayList = $(".table-responsive table tbody tr");
    const res = [];
    arrayList.each((idx, el) => {
      const Data = {};
      Data.name = $(el).children("td").children("a").text().replace(/\t/gi,"").replace(/\n/gi,"");
      Data.torrentLink = $(el).children(".text-center").children("a")[1].attribs.href;
      res.push(Data);
    });
  var name1 = res[0].name;
  var link1 = res[0].torrentLink;
  var name2 = res[1].name;
  var link2 = res[1].torrentLink;
  var name3 = res[2].name;
  var link3 = res[2].torrentLink;
  var name4 = res[3].name;
  var link4 = res[3].torrentLink;
  var name5 = res[4].name;
  var link5 = res[4].torrentLink;
fs.writeFile(__dirname + "/cache/torrent-links.txt","🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹\n"+name1+"\n\n"+link1+"\n\n\n🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹\n"+name2+"\n\n"+link2+"\n\n\n🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹\n"+name3+"\n\n"+link3+"\n\n\n🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹\n"+name4+"\n\n"+link4+"\n\n\n🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹🔸🔹\n"+name5+"\n\n"+link5, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
var message = {
          body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗌𝖼𝗋𝖺𝗉𝗂𝗇𝗀 𝗌𝗎𝖼𝖼𝖾𝗌𝗌\n\nℹ️ | 𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 𝖺𝗇𝖽 𝖼𝗁𝖾𝖼𝗄 𝗍𝗁𝖾 𝗍𝖾𝗑𝗍 𝖿𝗂𝗅𝖾 𝖻𝖾𝗅𝗈𝗐\n\n𝗡𝗼𝘁𝗲:\n𝗍𝗁𝖺𝗍 𝗍𝗁𝗂𝗌 𝖠𝖯𝖨 𝖼𝖺𝗇 𝗈𝗇𝗅𝗒 𝗌𝖾𝖺𝗋𝖼𝗁 𝖿𝗈𝗋 𝖺𝗇𝗂𝗆𝖾 𝖲𝖾𝗋𝗂𝖾𝗌/𝖬𝗈𝗏𝗂𝖾𝗌, 𝗂𝗇𝗌𝗂𝖽𝖾 𝗍𝗁𝖾 𝗍𝖾𝗑𝗍 𝖿𝗂𝗅𝖾 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 𝟧 𝗅𝗂𝗇𝗄𝗌 𝗍𝗁𝖺𝗍 𝗍𝗁𝖾 𝖠𝖯𝖨 𝗌𝖼𝗋𝖺𝗉𝖾𝖽.\n\n𝗦𝗼𝘂𝗿𝗰𝗲: https://nyaa.si/",
         attachment: fs.createReadStream(__dirname + "/cache/torrent-links.txt")}
  api.sendMessage(message, event.threadID,event.messageID);
})
}