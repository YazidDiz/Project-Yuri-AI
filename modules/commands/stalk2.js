function convert(time){
var date = new Date(`${time}`);
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
var hours = date.getHours();
var minutes = date.getMinutes();
var seconds = date.getSeconds();
var formattedDate = `${ day < 10 ? "0" + day : day}` + "/" +`${ month < 10 ? "0" + month : month}` + "/" + year + "||" + `${ hours < 10 ? "0" + hours : hours}` + ":" + `${ minutes < 10 ? "0" + minutes : minutes}` + ":" + `${ seconds < 10 ? "0" + seconds : seconds}`;
return formattedDate;
};
const yuri = process.env['yuri']
const headers = {
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like) Version/12.0 eWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
          "accept": "application/json, text/plain, /"
}
module.exports.config = {
  name: "stalk2",
  version: "2.0.0",
  hasPermsion: 0,
  credits: "Réynél",
  description: "Get info using uid/mention/reply to a message",
  usages: "[reply/uid/@mention]",
  commandCategory: "stalk",
  cooldowns: 0
};
module.exports.run = async function({ api, event, args }) {
const request = require("request");
const axios = require("axios");
const fs = require("fs");
let path = __dirname + `/cache/info.png`;
let token = `${yuri}`;
  if (args.join().indexOf('@') !== -1){ var id = Object.keys(event.mentions) }
      else var id = args[0] || event.senderID;
      if(event.type == "message_reply") { var id = event.messageReply.senderID }
  try{
const resp = await axios.get(`https://graph.facebook.com/${id}?fields=id,is_verified,cover,created_time,work,hometown,username,link,name,locale,location,about,website,birthday,gender,relationship_status,significant_other,quotes,first_name,subscribers.limit(0)&access_token=${token}`,{ headers: headers })
   var name = resp.data.name;
   var link_profile = resp.data.link;
   var uid = resp.data.id;
   var first_name = resp.data.first_name;
   var username = resp.data.username || "𝖭𝗈 𝖽𝖺𝗍𝖺!";
   var created_time = convert(resp.data.created_time);
   var web = resp.data.website || "𝖭𝗈 𝖽𝖺𝗍𝖺!";
   var gender = resp.data.gender;
   var relationship_status = resp.data.relationship_status || "𝖭𝗈 𝖽𝖺𝗍𝖺!";
   var love = resp.data.significant_other || "𝖭𝗈 𝖽𝖺𝗍𝖺!";
   var bday = resp.data.birthday || "𝖭𝗈 𝖽𝖺𝗍𝖺!";
   var follower = resp.data.subscribers.summary.total_count || "𝖭𝗈 𝖽𝖺𝗍𝖺!";
   var is_verified = resp.data.is_verified;
   var quotes = resp.data.quotes || "𝖭𝗈 𝖽𝖺𝗍𝖺!";
   var about = resp.data.about || "𝖭𝗈 𝖽𝖺𝗍𝖺!";
  var locale = resp.data.locale || "𝖭𝗈 𝖽𝖺𝗍𝖺!";
   var hometown = !!resp.data.hometown?resp.data.hometown.name:"𝖭𝗈 𝖧𝗈𝗆𝖾𝗍𝗈𝗐𝗇";
   var cover = resp.data.source || "𝖭𝗈 𝖢𝗈𝗏𝖾𝗋 𝗉𝗁𝗈𝗍𝗈";
  var avatar = `https://graph.facebook.com/${id}/picture?width=1500&height=1500&access_token=1174099472704185|0722a7d5b5a4ac06b11450f7114eb2e9`;
//callback
let cb = function() {
api.sendMessage({ body: `╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n  ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n❍——𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡——❍
𝗡𝗮𝗺𝗲: ${name}
𝗙𝗶𝗿𝘀𝘁 𝗻𝗮𝗺𝗲: ${first_name}
𝗖𝗿𝗲𝗮𝘁𝗶𝗼𝗻 𝗗𝗮𝘁𝗲: ${created_time}
𝗣𝗿𝗼𝗳𝗶𝗹𝗲 𝗹𝗶𝗻𝗸: ${link_profile}
𝗚𝗲𝗻𝗱𝗲𝗿: ${gender}
𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽 𝗦𝘁𝗮𝘁𝘂𝘀: ${relationship_status}
𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆: ${bday}
𝗙𝗼𝗹𝗹𝗼𝘄𝗲𝗿(𝘀): ${follower}
𝗛𝗼𝗺𝗲𝘁𝗼𝘄𝗻: ${hometown}
𝗟𝗼𝗰𝗮𝗹𝗲: ${locale}
❍۞─────𝗘𝗡𝗗─────۞❍`, attachment: fs.createReadStream(path)
            }, event.threadID, () => fs.unlinkSync(path), event.messageID);
        };
 request(encodeURI(avatar)).pipe(fs.createWriteStream(path)).on("close", cb);
		} catch (err) {
         api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽: ${err.message}`, event.threadID, event.messageID)
    }
}