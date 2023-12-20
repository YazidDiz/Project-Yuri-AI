module.exports.config = {
  name: "tile",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Réynél",
  description: "See the match ratio between 2 people",
  commandCategory: "love",
  usages: "[mention]",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event}) {
    const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
    var mention = Object.keys(event.mentions)[0];
    if(!mention) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗇𝖾𝖾𝖽 𝗍𝗈 𝗆𝖾𝗇𝗍𝗂𝗈𝗇 𝟣 𝗉𝖾𝗋𝗌𝗈𝗇 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗌𝖾𝖾 𝗆𝖺𝗍𝖼𝗁𝗂𝗇𝗀 𝗋𝖺𝗍𝗂𝗈.", event.threadID);
    var name = (await Users.getData(mention)).name
    var namee = (await Users.getData(event.senderID)).name
    var tle = Math.floor(Math.random() * 101);

    var arraytag = [];
        arraytag.push({id: mention, tag: name});
        arraytag.push({id: event.senderID, tag: namee});
    var mentions = Object.keys(event.mentions)

        let Avatar = (await axios.get( `https://graph.facebook.com/${mentions}/picture?height=720&width=720&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/avt.png", Buffer.from(Avatar, "utf-8") );
        let Avatar2 = (await axios.get( `https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/avt2.png", Buffer.from(Avatar2, "utf-8") );        


       var imglove = [];
              
              imglove.push(fs.createReadStream(__dirname + "/cache/avt2.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/avt.png"));
        var msg = {body: `🌟 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗅𝗈𝗏𝖾 𝗋𝖺𝗍𝗂𝗈 𝖻𝖾𝗍𝗐𝖾𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂 ${namee} 𝖺𝗇𝖽 𝗌𝖾𝗇𝗌𝖾𝗃 ${name} 𝗂𝗌 ${tle}% 💌`, mentions: arraytag, attachment: imglove}
        return api.sendMessage(msg, event.threadID, event.messageID)
      }