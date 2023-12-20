module.exports.config = {
  name: "stalk",
  version: "1.0.0",
  hasPermision: 0,
  credits: `Réynél`,
  description: "get info using uid/mention/reply to a message",
  usages: "[reply/uid/@mention/url]",
  commandCategory: "stalk",
  cooldowns: 0,
};

module.exports.run = async function({api, event, args, utils, Users, Threads}) {
    try {
        let axios = require('axios');
        let fs = require("fs-extra");
        let request = require("request");
        let {threadID, senderID, messageID} = event;
      if ((this.config.credits) != `Réynél`) { return api.sendMessage(`ulol change credits pa `, event.threadID, event.messageID)}
      if (args.join().indexOf('@') !== -1){ var id = Object.keys(event.mentions) }
      else var id = args[0] || event.senderID;
      if(event.type == "message_reply") { var id = event.messageReply.senderID }
      else if (args.join().indexOf(".com/") !== -1) {
        const res = await axios.get(`https://api.reikomods.repl.co/sus/fuid?link=${args.join(" ")}`);
var id = res.data.result
}
      let name = (await api.getUserInfo(id))[id].name
      let username = (await api.getUserInfo(id))[id].vanity == "Không Xác Định" ? "Not Found" : id;
      let url = (await api.getUserInfo(id))[id].profileUrl
     /* let rs = (await api.getUserInfo(id))[id].relationship_status == "Không Xác Định" ? "Not Found" :  
      let love = (await api.getUserInfo(id))[id].love.name == "Không Xác Định" ? "Not Found" :  (await api.getUserInfo(id))[id].love.name;*/
      
	/*const res = await api.getUserInfoV2(id); 
   var gender = res.gender == 'male' ? "Male" : res.gender == 'female' ? "Female" : "Not found";
    var birthday = res.birthday == 'Không Có Dữ Liệu' ? "Not found" : res.birthday;
    var love = res.relationship_status == 'Không Có Dữ Liệu' ? "Not found" : res.relationship_status;
    var location = res.location == 'Không Có Dữ Liệu' ? "Not Found" : res.location.name;
    var hometown = res.hometown == 'Không Có Dữ Liệu' ? "Not found" : res.hometown.name;
  var follow = res.follow == 'Không Có Dữ Liệu' ? "Not Found" : res.follow;
  var usern = res.username == 'Không Có Dữ Liệu' ? res.id : res.username;
      var usern1 = res.username == 'Không Có Dữ Liệu' ? "Not Found" : res.username;
      var rs = res.love == 'Không Có Dữ Liệu' ? "None" : res.love.name;
*/
	let callback = function() {
            return api.sendMessage({
                body:`╔ೋღ𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡ღೋ╗\n\n𝗡𝗮𝗺𝗲: ${name}\n𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗨𝗥𝗟: https://facebook.com/${username}\n𝗨𝗜𝗗: ${id}\n\n╚ೋღ𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡ღೋ╝\n꙳☪︎●◉✿𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜✿◉●☪︎꙳\n`,
                attachment: fs.createReadStream(__dirname + `/cache/image.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/image.png`), event.messageID);
        };
		return request(encodeURI(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname + `/cache/image.png`)).on("close", callback);
		} catch (err) {
        console.log(err)
        return api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝖽𝖺𝗍𝖺.`, event.threadID)
    }
                                   }