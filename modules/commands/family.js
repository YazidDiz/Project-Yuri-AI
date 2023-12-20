module.exports.config = {
    name: "family",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "Réynél",
    description: "Create a photo of all members in the box",
    commandCategory: "utilities",
    usages: "family <size> [#color code] or family <size>\nEnter the appropriate member avatar size and color code for the text (default is black) according to the syntax:\n$family <size> <mã màu> <title>\nin which:\n•size: Size of each member's avatar\n•color code: hex color code\n•title: image title, default is box name\nEg: $family 200 #ffffff Brothers of one house\nIf you choose size = 0 will automatically adjust the size, if you do not enter the title, the title will be the box name",
    cooldowns: 5,
    dependencies: {
      "fs-extra": "", 
      "axios":"", 
      "canvas": "", 
      "jimp": "", 
      "node-superfetch": "",
      "chalk": ""
    }
};


module.exports.run = async ({ event, api, args }) => {
  var TOKEN = "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
  try {
    if(global.client.family == true) return api.sendMessage("⏳ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗌𝗒𝗌𝗍𝖾𝗆 𝗂𝗌 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝖺 𝗋𝖾𝗊𝗎𝖾𝗌𝗍 𝖿𝗋𝗈𝗆 𝖺𝗇𝗈𝗍𝗁𝖾𝗋 𝖻𝗈𝗑, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖼𝗈𝗆𝖾 𝖻𝖺𝖼𝗄 𝗅𝖺𝗍𝖾𝗋", event.threadID, event.messageID);
    global.client.family = true;
    var timestart = Date.now();
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    const { threadID, messageID } = event;
    const request = global.nodemodule["request"];
    const superfetch=global.nodemodule["node-superfetch"];
    if(!fs.existsSync(__dirname+'/cache/VNCORSI.ttf')) {
      let getfont = (await axios.get(`https://drive.google.com/uc?id=1q0FPVuJ-Lq7-tvOYH0ILgbjrX1boW7KW&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/VNCORSI.ttf", Buffer.from(getfont, "utf-8"));
    };
    
    if(!args[0] || isNaN(args[0]) == true || args[0] == "help") {
      if(!fs.existsSync(__dirname+"/cache/color1.png")) {
       let getimg = (await axios.get(`https://i.ibb.co/m9R36Pp/image.png`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/color1.png", Buffer.from(getimg, "utf-8"));
      }
      global.client.family = false;
    return api.sendMessage({body: "ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝖺𝗉𝗉𝗋𝗈𝗉𝗋𝗂𝖺𝗍𝖾 𝗆𝖾𝗆𝖻𝖾𝗋 𝖺𝗏𝖺𝗍𝖺𝗋 𝗌𝗂𝗓𝖾 𝖺𝗇𝖽 𝖼𝗈𝗅𝗈𝗋 𝖼𝗈𝖽𝖾 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗍𝖾𝗑𝗍 (𝖽𝖾𝖺𝗎𝗅𝗍 𝗂𝗌 𝖻𝗅𝖺𝖼𝗄)\n𝖠𝖼𝖼𝗈𝗋𝖽𝗂𝗇𝗀 𝗍𝗈 𝗍𝗁𝖾 𝗌𝗒𝗇𝗍𝖺𝗑:\n𝖥𝖺𝗆𝗂𝗅𝗒 <𝗌𝗂𝗓𝖾> <𝖼𝗈𝗅𝗈𝗋 𝖼𝗈𝖽𝖾> <𝗍𝗂𝗍𝗅𝖾>\n𝖨𝗇 𝗐𝗁𝗂𝖼𝗁:\n•𝗦𝗶𝘇𝗲: 𝖲𝗂𝗓𝖾 𝗈𝖿 𝖾𝖺𝖼𝗁 𝗆𝖾𝗆𝖻𝖾𝗋'𝗌 𝖺𝗏𝖺𝗍𝖺𝗋\n•𝗖𝗼𝗹𝗼𝗿 𝗖𝗼𝗱𝗲: 𝗁𝖾𝗑 𝖼𝗈𝗅𝗈𝗋 𝖼𝗈𝖽𝖾\n•𝗧𝗶𝘁𝗹𝗲: 𝖨𝗆𝖺𝗀𝖾 𝗍𝗂𝗍𝗅𝖾, 𝖽𝖾𝖿𝖺𝗎𝗅𝗍 𝗂𝗌 𝖻𝗈𝗑 𝗇𝖺𝗆𝖾 𝗂𝖿 𝗇𝗈𝗍 𝖿𝗂𝗅𝗅𝖾𝖽 𝗂𝗇\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲: 𝖥𝖺𝗆𝗂𝗅𝗒 𝟤𝟢𝟢 #𝖥𝖥𝖥𝖥𝖥𝖥 𝖻𝗋𝗈𝗍𝗁𝖾𝗋𝗌 𝗈𝖿 𝗈𝗇𝖾 𝗁𝗈𝗎𝗌𝖾\n𝖨𝖿 𝖼𝗁𝗈𝗈𝗌𝖾 𝗌𝗂𝗓𝖾 = 𝟢 𝗍𝗁𝖾𝗇 𝗂𝗍 𝗐𝗂𝗅𝗅 𝖺𝖽𝗃𝗎𝗌𝗍 𝗍𝗁𝖾 𝗌𝗂𝗓𝖾 𝖺𝗎𝗍𝗈𝗆𝖺𝗍𝗂𝖼𝖺𝗅𝗅𝗒, 𝗂𝖿 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝗍𝗂𝗍𝗅𝖾, 𝗍𝗁𝖾 𝗍𝗂𝗍𝗅𝖾 𝗐𝗂𝗅𝗅 𝖻𝖾 𝗍𝗁𝖾 𝖻𝗈𝗑 𝗇𝖺𝗆𝖾",
    attachment: fs.createReadStream(__dirname+"/cache/color1.png")}, threadID, messageID);
    };
    
    
    const jimp = global.nodemodule["jimp"];
    const chalk = global.nodemodule["chalk"];
    const Canvas = global.nodemodule["canvas"];
  

    var threadInfo = await api.getThreadInfo(threadID);
    var arrob = threadInfo.adminIDs;
    var arrad = [];
    for(let qtv of arrob) {
      arrad.push(qtv.id)
    };
    const background = await Canvas.loadImage("https://i.ibb.co/QvG4LTw/image.png");
    
    var idtv = threadInfo.participantIDs;
  
    var xbground = background.width,
        ybground = background.height;


    var dem = 1;
    var tds = 200,
        s = parseInt(args[0]);//size
        //AUTO SIZE
    var mode = "";
    if(s == 0) {
      var dtich = xbground*(ybground-tds);
      var dtichtv = Math.floor(dtich/idtv.length);
      var s = Math.floor(Math.sqrt(dtichtv));
      mode += " (Auto size)"
    };
        //===============================
    var l =     parseInt(s/15),//lines
        x =     parseInt(l),//
        y =     parseInt(tds),//
        xcrop = parseInt(idtv.length*s),
        ycrop = parseInt(tds+s);
        console.log(s);
    s = s-l*2;
    //===============================
    
    var color = args[1];
    if(!color || !color.includes("#")) {
      color = "#FFFFFF";
      autocolor = true;
    };
        if(s > ybground || s > xbground) {
          global.client.family = false;
          return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖺𝗏𝖺𝗍𝖺𝗋 𝗌𝗂𝗓𝖾 𝗆𝗎𝗌𝗍 𝖻𝖾 𝗌𝗆𝖺𝗅𝗅𝖾𝗋 𝗍𝗁𝖺𝗇 𝖻𝖺𝖼𝗄𝗀𝗋𝗈𝗎𝗇𝖽 𝗌𝗂𝗓𝖾\n𝗌𝗂𝗓𝖾 𝖻𝖺𝖼𝗄𝗀𝗋𝗈𝗎𝗇𝖽: 𝖷: ${xbground}, 𝖸: ${ybground}`, threadID, messageID);
        }
        api.sendMessage(`🔢 | 𝖤𝗌𝗍𝗂𝗆𝖺𝗍𝖾𝖽 𝗇𝗎𝗆𝖻𝖾𝗋𝗌 𝗈𝖿 𝗉𝗁𝗈𝗍𝗈: ${idtv.length}\n🆒 | 𝖡𝖺𝖼𝗄𝗀𝗋𝗈𝗎𝗇𝖽 𝗌𝗂𝗓𝖾: ${xbground} 𝖷 ${ybground}\n🆕 | 𝖠𝗏𝖺𝗍𝖺𝗋 𝗌𝗂𝗓𝖾: ${s}${mode}\n#️⃣ | 𝖢𝗈𝗅𝗈𝗋: ${color}\n⏳ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨'𝗆 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍, 𝗂𝗍 𝗆𝖺𝗒 𝗍𝖺𝗄𝖾 𝗎𝗉 𝗍𝗈 𝟣 𝗆𝗂𝗇𝗎𝗍𝖾 𝗍𝗈 𝖼𝗈𝗆𝗉𝗅𝖾𝗍𝖾...`,threadID, messageID);
    var loadkhung = await Canvas.loadImage("https://i.ibb.co/H41cdDM/1624768781720.png");//("https://s1.uphinh.org/2021/06/24/1624551553171.png");
    var title = args.slice(2).join(" ") || threadInfo.name;
    var path_alltv = __dirname+`/cache/alltv${threadID}${Date.now()}.png`;
    function delay(ms) {
       return new Promise(resolve => setTimeout(resolve, ms));
    };
    const canvas = Canvas.createCanvas(xbground, ybground);
    let ctx = canvas.getContext('2d');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    var ngdung = 0;// counting acc die
    //======FOR LOOP DRAW AVATAR=====//
    
    for(let id of idtv) {
      console.log(dem, chalk.green("FAMILY: ")+"drawing id's avt "+id);
        try {
          var avatar = await superfetch.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=${TOKEN}`);
          if(avatar.url.includes(".gif")) {throw Error};
        }
        catch(e) {
            ngdung += 1;
            continue; 
        };

        if(x+s > xbground) {
          xcrop = x;
          x += (-x)+l;
          y += s+l;
          ycrop += s+l;
        };
        
        if(ycrop > ybground) {
          ycrop += (-s);
          break;
        }; 
      
        avatar = avatar.body;
        const img = new Canvas.Image();
        var avatarload = await Canvas.loadImage(avatar);
        img.src = avatarload;

        ctx.drawImage(avatarload, x, y, s, s);

        if(arrad.includes(id)) {
        ctx.drawImage(loadkhung, x, y, s, s);
        };
        console.log(chalk.green("Family: ")+"Đã vẽ avt của id "+id);
        dem++;
        img.onerror = err => { throw err };
        x += parseInt(s+l);
    };
   Canvas.registerFont(__dirname+"/cache/VNCORSI.ttf", {
        family: "Dancing Script"
    });
    ctx.font = "110px Dancing Script";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(title, xcrop/2, 133);
    //ctx.beginPath();
    console.log(chalk.yellow("Convert to buffer..."));
    //const imageBuffer = canvas.toBuffer();

    console.log(chalk.blue(`Sucess X: ${xcrop}, Y: ${ycrop}`));
    try{//ktra auto cắt ảnh có bị lỗi hay ko
      const imagecut = await jimp.read(canvas.toBuffer());
      console.log("Đã đọc image", xcrop, ycrop);
      //=========== CUT IMAGE ===========//
      imagecut.crop(0, 0, xcrop, ycrop+l-30).writeAsync(path_alltv);
      console.log("Finished cropping the image and saved it in the cache");
      await delay(200);
       api.sendMessage({body: `🟦 | 𝖭𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝗉𝗁𝗈𝗍𝗈𝗌: ${dem} (𝖥𝗂𝗅𝗍𝖾𝗋𝖾𝖽 ${ngdung} 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝗎𝗌𝖾𝗋𝗌)\n🆒 | 𝖡𝖺𝖼𝗄𝗀𝗋𝗈𝗎𝗇𝖽 𝗌𝗂𝗓𝖾: ${xbground} 𝖷 ${ybground}\n🆕 | 𝖠𝗏𝖺𝗍𝖺𝗋 𝗌𝗂𝗓𝖾: ${s}${mode}\n⏱️ | 𝖯𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗂𝗆𝖾: ${Math.floor((Date.now()-timestart)/1000)} 𝗌𝖾𝖼𝗈𝗇𝖽`,
          attachment: fs.createReadStream(path_alltv, { 'highWaterMark': 128 * 1024 })
       }, threadID, (e, info) => {
         if(e) {
            api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋", threadID, messageID);
         };
         fs.unlinkSync(path_alltv);
       }, messageID);
       global.client.family = false
    }
    catch(e) {
      console.log(e.stack);
      fs.writeFileSync(path_alltv, canvas.toBuffer());
       api.sendMessage({
        body: `❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖺𝗎𝗍𝗈-𝖼𝗎𝗍 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽\n🟦 | 𝖭𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝗉𝗁𝗈𝗍𝗈𝗌: ${dem}\n(𝖥𝗂𝗅𝗍𝖾𝗋𝖾𝖽 ${ngdung} 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝗎𝗌𝖾𝗋𝗌)\n🆒 | 𝖡𝖺𝖼𝗄𝗀𝗋𝗈𝗎𝗇𝖽 𝗌𝗂𝗓𝖾: ${xbground} 𝖷 ${ybground}\n🆕 | 𝖠𝗏𝖺𝗍𝖺𝗋 𝗌𝗂𝗓𝖾: ${s}${mode}\n⏱️ | 𝖯𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗂𝗆𝖾: ${Math.floor((Date.now()-timestart)/1000)} 𝗌𝖾𝖼𝗈𝗇𝖽`,
            attachment: fs.createReadStream(path_alltv, { 'highWaterMark': 128 * 1024 })
         }, threadID, (e, info) => {
           if(e) {
              api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋", threadID, messageID);
           };
           fs.unlinkSync(path_alltv);
         }, messageID);
         global.client.family = false;
    }
  }
  catch(e) {global.client.family = false};
}
