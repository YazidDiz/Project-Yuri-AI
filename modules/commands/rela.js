module.exports.config = {
name: "rela",
version: "1.0.0",
hasPermssion: 0,
credits: "Réynél",
description: "1: Use command + tag\n2: Use command + info or fake\n\nInfo used to view information such as credits\nFake used to create fake information banners",
commandCategory: "love",
usages: "[mention] | [info] | [fake]"
};

module.exports.languages = {"en": {}}

//Read Package
const fs = require("fs-extra");
const { loadImage, createCanvas, registerFont, Canvas} = require("canvas");

//Quick Installation
var D = __dirname + "/cache/rela/"; //fila xuất
var expole = D + "rela.png", //Xuất ảnh ra file
    bg     = D + "bg.png", // đọc file ảnh background
    dicon  = D + "icon.png", // đọc file ảnh icon trái tim
    font   = D + "AmaticSC.ttf"; // đọc file font

//Link file
var token = "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", // Token fb
    bglink = "https://blogger.googleusercontent.com/img/a/AVvXsEgiT494Po7Onhcft4jFS2cTSb2-7wbRYaoCCGFH09X53RtuI3YABGgYfMJsCAmsDs8hfpMU2k28PKwImiP6Go9LiOquM0CYR4bEgzH8yXIfsJ8CJHdnRcogIOef0tgdzIjTBsGROv-12T60AI2njz0p_N9ipS5T4_KMatV8Erl6GYJ6PLou2HeIRWrA=s1278",
    iconlink = "https://blogger.googleusercontent.com/img/a/AVvXsEgQpVe6Q9RLyMZolNU3K7PqmAyKbIz53aIcAux5P9X7gbXydjEbkbZSKHxiwTLrY_XmgSeJJgrTi8-jh6g8RuWvq8h4mfQOA470attJaNuHWI9AP28SVUiTF8gaggPUeeQ4zq7OT5kgO4qvQsloqIVxJue7cFZmDwaxHNI8UVHqxrCsA_BXwvEYskq9=s45",
    fontlink = "https://drive.google.com/u/0/uc?id=1ZzgC7nyGaBw-zP3V2GKK0azoFgF5aXup&export=download";

//onload ( aesn's leak )
module.exports.onLoad = async() => {
  const { resolve } = global.nodemodule["path"];
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { downloadFile } = global.utils;
  if (!existsSync(D)) mkdirSync(D, { recursive: true });
  if (!existsSync(bg)) await downloadFile(bglink, resolve(bg));
  if (!existsSync(dicon)) await downloadFile(iconlink, resolve(dicon));
  if (!existsSync(font)) await downloadFile(fontlink, resolve(font));
}

//Mảng data
var data = [
  "Unfortunate responsibility...",
  "a bit low but that's ok. Try!",
  "3 parts of predestined, 7 parts of effort",
  "The odds that this relationship can be predestined is also quite small! Must try harder",
  "Date together. For this relationship to go further",
  "Be proactive in starting a conversation. You two are quite a match",
  "Believe in fate, because it's real!",
  "It's a couple. Take care of this relationship more!",
  "Save each other's numbers, when we get married, we'll call each other up the aisle!",
  "Get married and wait!"
];


//Start modules
module.exports.run = async function({ api, event, args, Threads, Users, permssion}) {

//Get mentions (Tag person's name)
var mentions1 = event.mentions[Object.keys(event.mentions)];
if(!mentions1) { 
  // check args (Check input)
  if(args[0] == "info"){return api.sendMessage(`💻 | 𝖬𝗈𝖽𝗂𝖿𝗂𝖾𝖽 𝖻𝗒 𝖢𝗅𝖺𝗋𝗄 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺\n𝖨𝖿 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝖺 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇𝗌 𝗃𝗎𝗌𝗍 𝗉𝗆 𝖢𝗅𝖺𝗋𝗄 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺.`,event.threadID,event.messageID)}
  else{return api.sendMessage(`ℹ️ | 𝗨𝘀𝗲:\n𝟣. 𝗋𝖾𝗅𝖺 + 𝗆𝖾𝗇𝗍𝗂𝗈𝗇\n𝟤. 𝗋𝖾𝗅𝖺 + 𝗂𝗇𝖿𝗈 𝗌𝖾𝗇𝗌𝖾𝗂 𝗈𝗋 𝖿𝖺𝗄𝖾\n\n𝖨𝗇𝖿𝗈 𝗎𝗌𝖾 𝗍𝗈 𝗏𝗂𝖾𝗐 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇 𝗌𝗎𝖼𝗁 𝖺𝗌 𝖼𝗋𝖾𝖽𝗂𝗍𝗌.\n𝖥𝖺𝗄𝖾 𝗎𝗌𝖾𝖽 𝗍𝗈 𝖼𝗋𝖾𝖺𝗍𝖾 𝖿𝖺𝗄𝖾 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇 𝖻𝖺𝗇𝗇𝖾𝗋𝗌.`,event.threadID,event.messageID)};
};

//Pick name
name1 = await Users.getNameUser(event.senderID);
name2 = await mentions1.replace("@", "");

//Function to load input image
background = await loadImage(bg);
icon = await loadImage(dicon);

// Get uid2 ( uid of the person tagged )
uid2 = Object.keys(event.mentions)[0];

// check args (Check input)
if(args[0] == "fake"){
 
//Run handle reply
return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖾𝗇𝗍𝖾𝗋 𝗒𝗈𝗎𝗋 𝖳𝖸𝖬 𝗇𝗎𝗆𝖻𝖾𝗋 𝖿𝗈𝗋 𝖾𝗑𝖺𝗆𝗉𝗅𝖾: 𝟪|𝟪|𝟪|𝟪|𝟪`, event.threadID, (error, info) => {
      global.client.handleReply.push({
      type: "create",
      name: this.config.name,
      author: event.senderID,
      messageID: info.messageID
    });
  }, event.messageID);
};

//Random array constructor
MissionC = Array.from({length: 5}, () => Math.floor(Math.random() * 8));

//Sum function
var allmath = (MissionC[0]+MissionC[1]+MissionC[2]+MissionC[3]+MissionC[4]) * 2.5;

//Enable compare function to get text
var message = sosanh(allmath);
 
//Download and Activate the function to get avt
var getboyavt = await loadImage(await getavt(event.senderID)),
    getgirlavt = await loadImage(await getavt(uid2));

//Enable render function (Create image)
var render = await irender(allmath, message, name1, name2, getboyavt, getgirlavt);

//save image after render render (Cache)
fs.writeFileSync(expole, Buffer.from(render,'utf8'));

//Outgoing messages - customization allowed
var send = {
  body: "𝖢𝗈𝗇𝗀𝗋𝖺𝗍𝗎𝗅𝖺𝗍𝗂𝗈𝗇𝗌 𝗌𝖾𝗇𝗌𝖾𝗂 "+name1+" & "+name2+`\n`+ message,
  attachment: fs.createReadStream(expole)
};

//Function to send messages to fca
api.sendMessage(send,event.threadID,event.messageID);
 
};

module.exports.handleReply = async function({ api, event, args, handleReply, client, __GLOBAL, Threads, Users, Currencies }) {
    var info = await api.getUserInfo(event.senderID);
    var nameSender = info[event.senderID].name;
    var arraytag = [];
        arraytag.push({id: event.senderID, tag: nameSender});
    if (handleReply.author != event.senderID) return;
    const {threadID, messageID, senderID } = event;
    switch (handleReply.type) {
    case "create": {
    var tym = event.body;
    MissionC = tym.split("|");
     
    //Function to get avt
    var getboyavt = await loadImage(await getavt(senderID)),
        getgirlavt = await loadImage(await getavt(uid2));
    try{
     
    //Array control function
    if(!MissionC.length == "5"){return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗆𝗂𝗌𝗌𝗂𝗇𝗀 𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝗋 𝗐𝗋𝗈𝗇𝗀 𝖿𝗈𝗋𝗆𝖺𝗍 𝗎𝗌𝖾.`, threadID, messageID)}
     
    //Sum function
    var allmath = (parseInt(MissionC[0])+parseInt(MissionC[1])+parseInt(MissionC[2])+parseInt(MissionC[3])+parseInt(MissionC[4])) * 2.5;
    }catch(e){
      api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗆𝗂𝗌𝗌𝗂𝗇𝗀 𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝗋 𝗐𝗋𝗈𝗇𝗀 𝖿𝗈𝗋𝗆𝖺𝗍 𝗎𝗌𝖾: ${e}`, threadID, messageID);
    };
   
    //Enable compare function to get text
    var message = sosanh(allmath);
     
    //Enable render function (Create image)
    var render = await irender(allmath, message, name1, name2, getboyavt, getgirlavt);
   
    //save image after render render (Cache)
    fs.writeFileSync(expole, Buffer.from(render,'utf8'));
   
    //Outgoing messages - customization allowed
    var send = {
    body: "𝖢𝗈𝗇𝗀𝗋𝖺𝗍𝗎𝗅𝖺𝗍𝗂𝗈𝗇𝗌 "+name1+" & "+name2+`\n`+ message +`\n ${MissionC}`,
    attachment: fs.createReadStream(expole)
    }
     
    //Function to send messages to fca
    api.sendMessage(send, threadID, messageID);

    // Secret =))
    if ((this.config.credits) != "Réynél") { return api.sendMessage(`𝗖𝗿𝗲𝗱𝗶𝘁𝘀 𝘁𝗼 𝗥𝗘́𝗬𝗡𝗘́𝗟, 𝗬𝗢𝗨 𝗙𝗨𝗖𝗞𝗜𝗡 𝗖𝗛𝗔𝗡𝗚𝗘 𝗧𝗛𝗘 𝗖𝗥𝗘𝗗𝗜𝗧 𝗬𝗢𝗨 𝗕𝗜𝗧𝗖𝗛!!!`, event.threadID, event.messageID)}
}
}
};

////////////////////////////
/// Function (Sunshine function) ///
////////////////////////////

//Text output comparison function
function sosanh(rd) {
  let ss;
  if(rd < 10) {
    ss = data[0];
  }else if(rd < 20){
    ss = data[1];
  }else if(rd < 30){
    ss = data[2];
  }else if(rd < 40){
    ss = data[3];
  }else if(rd < 50){
    ss = data[4];
  }else if(rd < 60){
    ss = data[5];
  }else if(rd < 70){
    ss = data[6];
  }else if(rd < 80){
    ss = data[7];
  }else if(rd < 90){
    ss = data[8];
  }else {
    ss = data[9];
  }
  return ss;
};

//Function get avt
async function getavt(uid) {
  var axios = require("axios");
  var { data } = await axios.get(`https://graph.facebook.com/v12.0/${uid}/picture?height=240&width=240&access_token=${token}`,{ responseType:"arraybuffer" });
  return data;
};

//Image rendering function (Export image)
function irender( tile, msg, boyname, girlname, getboyavt, getgirlavt) {
  registerFont(font, {family: "AmaticSCbold"});
  var canvas = createCanvas(background.width, background.height);
  var ctx = canvas.getContext("2d");

  //Draw 2 avt
  ctx.drawImage(getboyavt, 114, 581, 98 , 98);
  ctx.drawImage(getgirlavt, 509, 581, 98 , 98);
  ctx.restore();
  ctx.save();

  //Draw background (background)
  ctx.drawImage(background, 0, 0);
  ctx.font = "150px AmaticSCbold";
  ctx.textAlign = "center";
  ctx.fillStyle = "#FFFFFE";
  ctx.fillText(tile+"%", 360, 340);
  ctx.restore();
  ctx.save();

  //Draw and calculate hearts
  var math = 806;
  math -= 50;
  for(var i = 0; i < 5; i+=1) {
    var leftmath = 170;
    math += 50;
    for(var ii = 0; ii < MissionC[i]; ii+=1) {
      leftmath += 55;
      ctx.drawImage(icon, leftmath , math);
    }
  }
  ctx.restore();
  ctx.save();

  //Draw letters
  ctx.font = "50px AmaticSCbold";
  ctx.textAlign = "center";
  ctx.fillStyle = "#000000";
  ctx.fillText(boyname, 163, 746);
  ctx.fillText(girlname, 557, 746);
  ctx.restore();
  ctx.save();
 
  //Draw letters
  ctx.font = "45px AmaticSCbold";
  ctx.textAlign = "start";
  ctx.fillStyle = "#000000";
  //Enable text alignment
  const xuongdong = wrapText(ctx, msg, 640);
  ctx.fillText(xuongdong.join("\n"), 60, 1145);
  ctx.restore();
  ctx.save();

  //Export photos
  return canvas.toBuffer("image/png");
};

//Text correction & alignment function
function wrapText(ctx, text, max){
  const lines = [];
  if (ctx.measureText(text).width > max){
    const words = text.split(" ");
    let line = "";
    while (words.length > 0) {
      let split = false;
      while (ctx.measureText(words[0]).width >= max) {
        const temp = words[0];
        words[0] = temp.slice(0, -1);
        if (split) words[1] = temp.slice(-1) + words[1];
        else {
          split = true;
          words.splice(1, 0, temp.slice(-1));
        }
      }
      if (ctx.measureText(line+words[0]).width < max)
        line += words.shift()+" ";
      else {
        lines.push(line.trim());
        line = "";
      }
      if (words.length === 0) lines.push(line.trim());
    }
    }else{
      lines.push(text);
    }
    return lines;
};