module.exports.config = {
	name: "vtuberwiki",
	version: "2.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Search VTubers on VTubersWiki Official",
	commandCategory: "anime",
	usages: "[vtuber name]",
	cooldowns: 5,
 /* dependencies: {
    "vtuber-wiki": "",
    "axios": "",
    "fs": "",
    "request": ""               
} */ 
};


module.exports.run = async ({ api, event, args }) => {
	const axios = require("axios");
    const { wiki } = require("vtuber-wiki"); 
	const request = require('request');
	const fs = require("fs");
  if (!args[0]) {api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗌𝖾𝖺𝗋𝖼𝗁 𝖿𝗂𝖾𝗅𝖽 𝖼𝖺𝗇𝗇𝗈𝗍 𝖻𝖾 𝗅𝖾𝖿𝗍 𝖻𝗅𝖺𝗇𝗄.`,event.threadID, event.messageID)}
  else{
var query = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
    let Replaced = query.replace(/ /g, " ");
  api.sendMessage(`🔎 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖿𝗈𝗋 𝗏𝗍𝗎𝖻𝖾𝗋 《${Replaced}》 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...`, event.threadID, event.messageID);

const vtuber = await wiki(Replaced)
 .catch(err => {
                     api.sendMessage("❎" + err, event.threadID, event.messageID);
           }); 
          if(vtuber === null) {
    api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗍𝗁𝖾 𝖵𝖳𝗎𝖻𝖾𝗋 ${Replaced} 𝗂𝗌 𝗇𝗈𝗍 𝖿𝗈𝗎𝗇𝖽.`, event.threadID, event.messageID)
    return;
          }
   console.log(vtuber);                if (vtuber.title){ 
    let getURL = vtuber.image_url;


   if (!vtuber.title || vtuber.title === undefined) vtuber.title = "𝖭𝗈𝗍 𝖥𝗈𝗎𝗇𝖽";
  
    if (!vtuber.gender || vtuber.gender === undefined) vtuber.gender = "𝖭𝗈𝗍 𝖥𝗈𝗎𝗇𝖽";
  
  if (!vtuber.birthday || vtuber.birthday === undefined) vtuber.birthday = "𝖭𝗈𝗍 𝖥𝗈𝗎𝗇𝖽";

  if (!vtuber.height || vtuber.height === undefined) vtuber.height = "𝖭𝗈𝗍 𝖥𝗈𝗎𝗇𝖽";

  if (!vtuber.weight || vtuber.weight === undefined) vtuber.weight = "𝖭𝗈𝗍 𝖥𝗈𝗎𝗇𝖽";



  
var v1 = vtuber.title;
var v2 = vtuber.gender;
var v3 = vtuber.age.replace(/<ref>/g, " ");
var v4 = vtuber.birthday;
var v5 = vtuber.description;
var v6 = vtuber.more;
var v7 = vtuber.height;
var v8 = vtuber.weight;
var v9 = vtuber.channel.replace(/<br>/g, "\n\n");
var v10 = vtuber.social_media.replace(/<br>/g, "\n\n");
var v11 = vtuber.official_website.replace(/<br>/g, "\n\n");
var v12 = vtuber.affiliation

  //var v11 = bb.replace(/<br>/g, "\n\n");


 
        let callback = function () {           
          

   
 api.sendMessage({
     body:`𝗧𝗶𝘁𝗹𝗲: ${v1}\n━━━━━━━━━━━━━━━━━━━\n𝗔𝗳𝗳𝗶𝗹𝗶𝗮𝘁𝗶𝗼𝗻: ${v12}\n𝗚𝗲𝗻𝗱𝗲𝗿: ${v2}\n𝗔𝗴𝗲: ${v3}\n𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆: ${v4}\n𝗛𝗲𝗶𝗴𝗵𝘁: ${v7}\n𝗪𝗲𝗶𝗴𝗵𝘁: ${v8}\n━━━━━━━━━━━━━━━━━━━\n𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${v5}\n━━━━━━━━━━━━━━━━━━━\n𝗖𝗵𝗮𝗻𝗻𝗲𝗹: ${v9}\n━━━━━━━━━━━━━━━━━━━\n𝗦𝗼𝗰𝗶𝗮𝗹 𝗠𝗲𝗱𝗶𝗮: ${v10}\n━━━━━━━━━━━━━━━━━━━\n𝗦𝗼𝘂𝗿𝗰𝗲(𝘀): ${v11}\n━━━━━━━━━━━━━━━━━━━\n𝗠𝗼𝗿𝗲 𝗜𝗻𝗳𝗼: ${v6}`, 
					attachment: fs.createReadStream(__dirname + `/cache/vtuber.png`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/vtuber.png`), event.messageID)
				}
    
 //   }
        request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/vtuber.png`)).on("close", callback)  
  } 
   else if (vtuber.title1){

let getURL = vtuber.image_url;


   if (!vtuber.title1 || vtuber.title1 === undefined) vtuber.title1 = "𝖭/𝖠";
  
    if (!vtuber.gender || vtuber.gender === undefined) vtuber.gender = "𝖭/𝖠";
  
  if (!vtuber.birthday || vtuber.birthday === undefined) vtuber.birthday = "𝖭/𝖠";

  if (!vtuber.height || vtuber.height === undefined) vtuber.height = "𝖭/𝖠";
   
  if (!vtuber.zodiac_sign || vtuber.zodiac_sign === undefined) vtuber.zodiac_sign = "𝖭/𝖠";
        if (!vtuber.official_website || vtuber.official_website === undefined) vtuber.official_website = "𝖭/𝖠";

var v1 = vtuber.title1;
var v2 = vtuber.caption1;
var v3 = vtuber.original_name;
var v4 = vtuber.nick_name.replace(/<br>/g, "\n");
var v5 = vtuber.debut_date;
var v6 = vtuber.character_designer;
var v7 = vtuber.affiliation;
var v8 = vtuber.gender;
var v9 = vtuber.age;
var v10 = vtuber.birthday;
var v11 = vtuber.official_website; 
var v12 = vtuber.height;
var v13 = vtuber.zodiac_sign;
var v14 = vtuber.description;
var v15 = vtuber.channel.replace(/<br>/g, "\n\n");
var v16 = vtuber.social_media.replace(/<br>/g, "\n\n");
var v17 = vtuber.more;

       let callback = function () {           
             
 api.sendMessage({
     body: `𝗡𝗮𝗺𝗲: ${v1}\n𝗢𝗿𝗶𝗴𝗶𝗻𝗮𝗹 𝗡𝗮𝗺𝗲: ${v3}\n𝗡𝗶𝗰𝗸 𝗡𝗮𝗺𝗲: ${v4}\n━━━━━━━━━━━━━━━━━━━\n𝗣𝗼𝗽𝘂𝗹𝗮𝗿 𝗟𝗶𝗻𝗲: ${v2}\n𝗗𝗲𝗯𝘂𝘁 𝗗𝗮𝘁𝗲: ${v5}\n𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿 𝗗𝗲𝘀𝗶𝗴𝗻𝗲𝗿: ${v6}\n𝗔𝗳𝗳𝗶𝗹𝗶𝗮𝘁𝗶𝗼𝗻: ${v7}\n𝗚𝗲𝗻𝗱𝗲𝗿: ${v8}\n𝗔𝗴𝗲: ${v9}\n𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆: ${v10}\n𝗛𝗲𝗶𝗴𝗵𝘁: ${v12}\n𝗭𝗼𝗱𝗶𝗮𝗰 𝗦𝗶𝗴𝗻: ${v13}\n━━━━━━━━━━━━━━━━━━━\n𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${v14}\n━━━━━━━━━━━━━━━━━━━\n𝗖𝗵𝗮𝗻𝗻𝗲𝗹 𝗟𝗶𝗻𝗸(𝘀): ${v15}\n━━━━━━━━━━━━━━━━━━━\n𝗦𝗼𝗰𝗶𝗮𝗹 𝗠𝗲𝗱𝗶𝗮 𝗟𝗶𝗻𝗸(𝘀): ${v16}\n━━━━━━━━━━━━━━━━━━━\n𝗦𝗼𝘂𝗿𝗰𝗲(𝘀): ${v11}\n━━━━━━━━━━━━━━━━━━━\n𝗠𝗼𝗿𝗲: ${v17}`,
					attachment: fs.createReadStream(__dirname + `/cache/vtuber.png`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/vtuber.png`), event.messageID)
				}
    
 //   }
        request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/vtuber.png`)).on("close", callback)  
  } 
   else if (vtuber.nick_name){
      
    let getURL = vtuber.image_url;

 
var v1 = vtuber.nick_name.replace(/\x3c\x62\x72\x20\x2f\x3e/g, "\n");
var v2 = vtuber.debut_date;
var v3 = vtuber.character_designer;
var v4 = vtuber.affiliation.replace(/\x3c\x62\x72\x20\x2f\x3e/g, "\n");
var v5 = vtuber.channel;
var v6 = vtuber.gender;
var v7 = vtuber.age;
var v8 = vtuber.birthday;
var v9 = vtuber.height;
var v10 = vtuber.caption1;
var v11 = vtuber.zodiac_sign;
var v12 = vtuber.description;
var v13 = vtuber.social_media;
var v14 = vtuber.more;

  let callback = function () {           
             
 api.sendMessage({
     body: `𝗡𝗮𝗺𝗲: ${v1}\n━━━━━━━━━━━━━━━━━━━\n𝗗𝗲𝗯𝘂𝘁 𝗗𝗮𝘁𝗲: ${v2}\n𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿 𝗗𝗲𝘀𝗶𝗴𝗻𝗲𝗿: ${v3}\n𝗔𝗳𝗳𝗶𝗹𝗶𝗮𝘁𝗶𝗼𝗻: ${v4}\n𝗚𝗲𝗻𝗱𝗲𝗿: ${v6}\n𝗔𝗴𝗲: ${v7}\n𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆: ${v8}\n𝗛𝗲𝗶𝗴𝗵𝘁: ${v9}\n𝗣𝗼𝗽𝘂𝗹𝗮𝗿 𝗟𝗶𝗻𝗲: ${v10}\n𝗭𝗼𝗱𝗶𝗮𝗰 𝗦𝗶𝗴𝗻: ${v11}\n━━━━━━━━━━━━━━━━━━━\n𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${v12}\n━━━━━━━━━━━━━━━━━━━\n𝗦𝗼𝗰𝗶𝗮𝗹 𝗠𝗲𝗱𝗶𝗮(𝘀): ${v13}\n━━━━━━━━━━━━━━━━━━━\n𝗖𝗵𝗮𝗻𝗻𝗲𝗹: ${v5}\n━━━━━━━━━━━━━━━━━━━\n𝗠𝗼𝗿𝗲 𝗶𝗻𝗳𝗼(𝘀): ${v14}`,
					attachment: fs.createReadStream(__dirname + `/cache/vtuber.png`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/vtuber.png`), event.messageID)
      }

request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/vtuber.png`)).on("close", callback)  
  } 
    
}		
}


