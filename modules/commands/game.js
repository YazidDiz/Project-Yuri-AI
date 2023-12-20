module.exports.config = {
    name: 'game',
    version: '1.0.0',
    hasPermssion: 0,
    credits: 'Clark',
    description: 'play someone',
    commandCategory: 'games',
    usages: `𝗣𝗹𝗲𝗮𝘀𝗲 𝗥𝗲𝗮𝗱:\n𝖳𝗁𝗂𝗌 𝗀𝖺𝗆𝖾 𝗂𝗌 𝗎𝗇𝖽𝖾𝗋 𝖻𝖾𝗍𝖺 𝗍𝖾𝗌𝗍 𝗌𝗈𝗆𝖾 𝗈𝖿 𝖻𝗎𝗀𝗌 𝖺𝗇𝖽 𝖾𝗋𝗋𝗈𝗋 𝗐𝗂𝗅𝗅 𝗋𝖾𝗆𝖺𝗂𝗇 𝗏𝗂𝗌𝗂𝖻𝗅𝖾 𝗂𝖿 𝗒𝗈𝗎 𝗁𝖺𝗏𝗂𝗇𝗀 𝖺 𝗍𝗋𝗈𝗎𝖻𝗅𝖾 𝗐𝗁𝗂𝗅𝖾 𝗉𝗅𝖺𝗒𝗂𝗇𝗀 𝗉𝗅𝖾𝖺𝗌𝖾 𝖼𝗈𝗇𝗍𝖺𝖼𝗍 𝗍𝗁𝖾 𝖽𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋`,
    cooldowns: 5,
    dependencies: {
      "fs-extra": "",
      "axios": "",
      "canvas": "",
      "jimp": "",
      "node-superfetch": ""
    }
};

module.exports.handleReply = async ({ handleReply, event, api ,Users}) => {

  function delay(ms) {
       return new Promise(resolve => setTimeout(resolve, ms));
  };
  var {x, y, d, d1, sizeboard, sectionSize, boardbuffer} = handleReply;
    var { threadID, senderID, messageID, body } = event;
    const chalk = global.nodemodule["chalk"];
    var args   = body.split(' ');
    if(!args[1]) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗇𝗈𝗍 𝖾𝗇𝗍𝖾𝗋𝖾𝖽 𝗍𝗁𝖾 𝖸 𝖼𝗈𝗈𝗋𝖽𝗂𝗇𝖺𝗍𝖾𝗌", threadID, messageID);
    var toadoX = parseInt(args[0]),
        toadoY = parseInt(args[1]);
          //check error tọa độ
          if(toadoX == NaN || toadoY == NaN) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖷 𝗈𝗋 𝖸 𝖼𝗈𝗈𝗋𝖽𝗂𝗇𝖺𝗍𝖾𝗌", threadID, messageID);
          if(toadoX > sizeboard) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝖷 𝖼𝗈𝗈𝗋𝖽𝗂𝗇𝖺𝗍𝖾 𝖼𝖺𝗇𝗇𝗈𝗍 𝖻𝖾 𝗅𝖺𝗋𝗀𝖾𝗋 𝗍𝗁𝖺𝗇 𝗍𝗁𝖾 𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝗌𝗊𝗎𝖺𝗋𝖾𝗌 𝗈𝗇 𝗍𝗁𝖾 𝖼𝗁𝖾𝗌𝗌𝖻𝗈𝖺𝗋𝖽", threadID, messageID);
          if(toadoY > sizeboard) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝖸 𝖼𝗈𝗈𝗋𝖽𝗂𝗇𝖺𝗍𝖾 𝖼𝖺𝗇𝗇𝗈𝗍 𝖻𝖾 𝗅𝖺𝗋𝗀𝖾𝗋 𝗍𝗁𝖺𝗇 𝗍𝗁𝖾 𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝗌𝗊𝗎𝖺𝗋𝖾𝗌 𝗈𝗇 𝗍𝗁𝖾 𝖼𝗁𝖾𝗌𝗌𝖻𝗈𝖺𝗋𝖽", threadID, messageID);
      //get data game
    var gameint  = global.game[threadID];
    var luot     = gameint.ditruoc;
    var luotuser = gameint.luot[senderID];
    //===========
    if (global.game[threadID].toadogame.includes(toadoX.toString() + toadoY)) return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝗂𝗌 𝗉𝗈𝗌𝗂𝗍𝗂𝗈𝗇 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖻𝗈𝗈𝗄𝖾𝖽 𝖻𝖾𝖿𝗈𝗋𝖾', threadID, messageID);

var _0xb4b2 = ["luot", "keys", "filter", "name", "getData"];
var arrluot = Object[_0xb4b2[1]](gameint[_0xb4b2[0]]);
var iddoithu = parseInt(arrluot[_0xb4b2[2]]((_0xd327x3) => {
    return _0xd327x3 != senderID
}));
var namedoithu = (await Users[_0xb4b2[4]](iddoithu))[_0xb4b2[3]]
    //=============Check lượt===========//
    if (luotuser != luot) {
      return api.sendMessage({body: '❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗂𝗍𝗌 𝗇𝗈𝗍 𝗒𝗈𝗎𝗋 𝗍𝗎𝗋𝗇 𝗒𝖾𝗍 𝗍𝗁𝗂𝗌 𝗍𝗎𝗋𝗇 𝖻𝖾𝗅𝗈𝗇𝗀𝗌 𝗍𝗈:\n'+namedoithu, mentions: [{tag: namedoithu,id: iddoithu}]}, threadID, messageID);
    };
    if (luot == 0) {
        global.game[threadID].ditruoc = 1;
        var quanco = 'X';
        var linkCo = 'https://i.ibb.co/ByyrhMs/Xpng.png';
    };
    if (luot == 1) {
        global.game[threadID].ditruoc = 0;
        var quanco = 'O';
        var linkCo = 'https://i.ibb.co/FgtkNM9/Opng.png';
    };
    
  //d thứ [x+y][x]
  //X = 4, Y = 2;
  //set cờ vào data để check WIN;
  //==============PUSH DATA===========//
  if(toadoY > toadoX) var soptu = toadoY-toadoX;
  else var soptu = toadoX-toadoY;
  var soo = sizeboard - 1;//số ô
    x[toadoY][toadoX]               = quanco;
    y[toadoX][toadoY]               = quanco;
    d[toadoX +toadoY][toadoX]       = quanco;
    d1[soo-soptu][toadoX]           = quanco;
    //===============khai báo==============
    const Canvas = global.nodemodule["canvas"];
    const fs = global.nodemodule["fs-extra"];
    var path1 = __dirname+'/cache/caro1'+threadID+'.png';
    var path2 = __dirname+'/cache/caro2'+threadID+'.png';
    //===========CANVAS============//
    //vẽ lại boardgame trước sau đó vẽ lên background
    const boardgame = await Canvas.loadImage(boardbuffer);//board lấy từ handleReply
    var xboard = boardgame.width,
        yboard = boardgame.height;
    const canvas = Canvas.createCanvas(xboard, yboard);
    let ctx = canvas.getContext('2d');
    ctx.drawImage(boardgame, 0, 0, xboard, yboard);
    var quanCo = await Canvas.loadImage(linkCo);//lấy ảnh quân cờ
    ctx.drawImage(quanCo, toadoX * sectionSize, toadoY * sectionSize, sectionSize, sectionSize);
    var boardbuffer = canvas.toBuffer();//vẽ xong board game
    //=============BACKGROUND================
    const background = await Canvas.loadImage(path2);
    var xbground = background.width,
        ybground = background.height;
    const canvasbg = Canvas.createCanvas(xbground, ybground);
    const ctxx = canvasbg.getContext('2d');
    ctxx.drawImage(background, 0, 0, xbground, ybground);
    const board = await Canvas.loadImage(boardbuffer);
    ctxx.drawImage(board, (xbground-880)/2, 320, 880, 880);
    //==============================
    global.game[threadID].toadogame.push(toadoX.toString() + toadoY);
    //=========FUNCTION CHECK WIN??===========
  function checkWin(x, y, d, d1, toadoX, toadoY, quanco, sizeboard, sectionSize) {
    var dem = 0;
    //============CHECK X=============

    for (let X of x[toadoY]) {
        if(X == quanco) {
          dem++;
        } else {
          dem = 0;

        }
        if (dem == 5) {
          return {
            WIN: true
          }
        }
    };
    dem = 0;
    //============CHECK Y============
    for (let Y of y[toadoX]) {
        if (Y == quanco) {
            dem++;
        } else { 
            dem = 0;
        }
        if (dem == 5) {
          return {
            WIN: true
          }
        }
    }
    //============CHECK D============
    dem = 0;
    for (let D of d[toadoX+toadoY]) {
        if (D == quanco) {
            dem++;
        } else {
            dem = 0;
        }
        if (dem == 5) {
          return {
            WIN: true
          }
        };
    };
  //==============CHECK D1===========
    dem = 0;
    var soo = sizeboard-1;
    if(toadoY > toadoX) {var soptu = toadoY-toadoX;}
    else {var soptu = toadoX-toadoY;};
    for (let D1 of d1[soo-soptu]) {
        if (D1 == quanco) {
            dem++;
        } else {dem = 0;}
        if(dem == 5) {
          return {
            WIN: true
          }
        }
    };
    return {WIN: false};
  };
  
var myname = (await Users.getData(senderID)).name
  //==========CHECK WIN OR NOT==============//
  var CHECKWIN = checkWin(x, y, d, d1, toadoX, toadoY, quanco, sizeboard, sectionSize);
  if(CHECKWIN.WIN == true) {
    fs.writeFileSync(path2, canvasbg.toBuffer());
      api.unsendMessage(handleReply.messageID, () => {
        api.sendMessage({
          body: "𝖢𝗈𝗇𝗀𝗋𝖺𝗍𝗎𝗅𝖺𝗍𝗂𝗈𝗇𝗌 𝗍𝗁𝖾 𝗐𝗂𝗇𝗇𝖾𝗋 𝗈𝖿 𝗍𝗁𝖾 𝗀𝖺𝗆𝖾 𝗂𝗌:\n𝖲𝖾𝗇𝗌𝖾𝗂 "+myname,
          attachment: fs.createReadStream(path2),
          mentions: [{
            tag: myname,
            id: senderID
          }]
          
        }, threadID, messageID);
      });
    return global.game[threadID] = {};
  };
  fs.writeFileSync(path2, canvasbg.toBuffer());
  api.unsendMessage(handleReply.messageID, () => {
    api.sendMessage({body: 'ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝖷 𝖸 𝖼𝗈𝗈𝗋𝖽𝗂𝗇𝖺𝗍𝖾𝗌 𝗍𝗈 𝗉𝗅𝖺𝗒 𝖼𝗁𝖾𝗌𝗌 𝗉𝗂𝖾𝖼𝖾𝗌 𝖿𝗈𝗋 𝖾𝗑𝖺𝗆𝗉𝗅𝖾:\n𝟭 𝟱\n━━━━━━━━━━━━━━━━━━━\n𝖭𝖾𝗑𝗍 𝗍𝗎𝗋𝗇 𝗂𝗌 𝖿𝗈𝗋' +namedoithu, attachment: fs.createReadStream(path2), mentions: [{
      tag: namedoithu,
      id: iddoithu
    }]},threadID, (e, info) => {
            client.handleReply.push({
                name: this.config.name,
                author: senderID,
                messageID: info.messageID,
                x: x,
                y: y,
                d: d,
                d1: d1,
                sizeboard: sizeboard,
                sectionSize: sectionSize,
                boardbuffer: boardbuffer
            });
        },messageID);
  })
};


module.exports.run = async ({ event, api, args }) => {
    var { threadID, senderID, messageID } = event;
    if (!global.game) {
        global.game = {};
    };
    if (!global.game[threadID]) {
        global.game[threadID] = {};
    };
    if(args[0] == "clear"){
      var author = global.game[threadID].author;
      if(!author) return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾𝗋𝖾 𝗂𝗌 𝗇𝗈 𝖼𝗁𝖾𝗌𝗌𝖻𝗈𝖺𝗋𝖽 𝗁𝖺𝗏𝖾 𝖻𝖾𝖾𝗇 𝖼𝗋𝖾𝖺𝗍𝖾𝖽 𝗂𝗇 𝗒𝗈𝗎𝗋 𝗀𝗋𝗈𝗎𝗉 𝗒𝖾𝗍 𝗉𝗅𝖾𝖺𝗌𝖾 𝖼𝗈𝗇𝗍𝖺𝖼𝗍 𝗍𝗁𝖾 𝖽𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝗍𝗈 𝖿𝗂𝗑 𝗍𝗁𝗂𝗌 𝖾𝗋𝗋𝗈𝗋', threadID, messageID);
      if (senderID != author) return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂,𝖻𝗎𝗍 𝗈𝗇𝗅𝗒 𝖺𝗎𝗍𝗁𝗈𝗋 '+author+' 𝖼𝗁𝖾𝗌𝗌𝖻𝗈𝖺𝗋𝖽 𝖼𝖺𝗇 𝖿𝗂𝗇𝗂𝗌𝗁 𝗍𝗁𝗂𝗌 𝖻𝗈𝖺𝗋𝖽', threadID, messageID);
      global.game[threadID] = {};
      return api.sendMessage(`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗋𝖾𝗆𝗈𝗏𝖾\n━━━━━━━━━━━━━━━━━━━\n🌟 | 𝖸𝗈𝗎 𝖼𝖺𝗇 𝗇𝗈𝗐 𝗉𝗅𝖺𝗒 𝖻𝗒 𝗎𝗌𝗂𝗇𝗀:\n\n${global.config.PREFIX}𝗀𝖺𝗆𝖾 <@𝗍𝖺𝗀>\n━━━━━━━━━━━━━━━━━━━\n📚 | 𝗣𝗹𝗲𝗮𝘀𝗲 𝗥𝗲𝗮𝗱:\n𝖳𝗁𝗂𝗌 𝗀𝖺𝗆𝖾 𝗂𝗌 𝗎𝗇𝖽𝖾𝗋 𝖻𝖾𝗍𝖺 𝗍𝖾𝗌𝗍 𝗌𝗈𝗆𝖾 𝗈𝖿 𝖻𝗎𝗀𝗌 𝖺𝗇𝖽 𝖾𝗋𝗋𝗈𝗋 𝗐𝗂𝗅𝗅 𝗋𝖾𝗆𝖺𝗂𝗇 𝗏𝗂𝗌𝗂𝖻𝗅𝖾 𝗂𝖿 𝗒𝗈𝗎 𝗁𝖺𝗏𝗂𝗇𝗀 𝖺 𝗍𝗋𝗈𝗎𝖻𝗅𝖾 𝗐𝗁𝗂𝗅𝖾 𝗉𝗅𝖺𝗒𝗂𝗇𝗀 𝗉𝗅𝖾𝖺𝗌𝖾 𝖼𝗈𝗇𝗍𝖺𝖼𝗍 𝗍𝗁𝖾 𝖽𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋`, threadID, messageID);
      
    }
    
    if (global.game[threadID].author) {
        return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 𝗁𝖺𝗌 𝖺 𝖼𝗁𝖾𝗌𝗌𝖻𝗈𝖺𝗋𝖽 𝖼𝗋𝖾𝖺𝗍𝖾𝖽 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝖽 𝗍𝗁𝖾 𝖻𝗈𝖺𝗋𝖽 𝖻𝗒 𝖼𝗁𝖺𝗍𝗍𝗂𝗇𝗀\n ${global.config.PREFIX}𝗀𝖺𝗆𝖾 𝖼𝗅𝖾𝖺𝗋`, threadID, messageID);
    };
    var player2 = Object.keys(event.mentions)[0];
    if(!player2) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗆𝖾𝗇𝗍𝗂𝗈𝗇 𝟣 𝗉𝖾𝗋𝗌𝗈𝗇 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗉𝗅𝖺𝗒 𝗐𝗂𝗍𝗁\n━━━━━━━━━━━━━━━━━━━\n📚 | 𝗣𝗹𝗲𝗮𝘀𝗲 𝗥𝗲𝗮𝗱:\n𝖳𝗁𝗂𝗌 𝗀𝖺𝗆𝖾 𝗂𝗌 𝗎𝗇𝖽𝖾𝗋 𝖻𝖾𝗍𝖺 𝗍𝖾𝗌𝗍 𝗌𝗈𝗆𝖾 𝗈𝖿 𝖻𝗎𝗀𝗌 𝖺𝗇𝖽 𝖾𝗋𝗋𝗈𝗋 𝗐𝗂𝗅𝗅 𝗋𝖾𝗆𝖺𝗂𝗇 𝗏𝗂𝗌𝗂𝖻𝗅𝖾 𝗂𝖿 𝗒𝗈𝗎 𝗁𝖺𝗏𝗂𝗇𝗀 𝖺 𝗍𝗋𝗈𝗎𝖻𝗅𝖾 𝗐𝗁𝗂𝗅𝖾 𝗉𝗅𝖺𝗒𝗂𝗇𝗀 𝗉𝗅𝖾𝖺𝗌𝖾 𝖼𝗈𝗇𝗍𝖺𝖼𝗍 𝗍𝗁𝖾 𝖽𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋", event.threadID, event.messageID);
    global.game[threadID] = {
        luot: {
            [senderID]: 1,
            [player2]: 0
        },
        toadogame: [],
        ditruoc: 1,
        author: senderID
    };
    /**/
    //CREATE BOARD GAME
    var kytu = "@";
    var x = [], y = [], d = [], d1 = [];
    var size = 16;
    //Create horizon and Column ( X and Y )
    for (let i = 0; i < size; i++) {
        x[i] = [];
        y[i] = [];
        for(let j = 0; j < size; j++) {
          x[i][j] = kytu;
          y[i][j] = kytu;
        }
    }
    //Create diagonal lines
    var auto = '+';
    var so_d = 0;
    var chieudaio = size*2-1;//số đường xiêng của board
    for (var i = 0; i < chieudaio; i++) {
        if(auto == '+') so_d++;
        if(auto == "-") so_d--;
        d[i] = [];
        d1[i] = [];
        for(let j = 0; j < so_d; j++) {
          d[i][j] = "@";
          d1[i][j] = "@";
          if(so_d == size) auto = "-";
        };
    };
    //==============================
    const Canvas = global.nodemodule["canvas"];
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    const spf = global.nodemodule["node-superfetch"];
    var path1 = __dirname+'/cache/caro1'+threadID+'.png';
    var path2 = __dirname+'/cache/caro2'+threadID+'.png';
    
    //==============================
    const imgboard = await Canvas.loadImage(
        'https://vn112.com/wp-content/uploads/2018/01/pxsolidwhiteborderedsvg-15161310048lcp4.png');
    var xboard = imgboard.width,
        yboard = imgboard.height;
    const canvas = Canvas.createCanvas(xboard, yboard);
    let ctx = canvas.getContext('2d');
    ctx.drawImage(imgboard, 0, 0, canvas.width, canvas.height);
    var sizeboard = parseInt(16);//số ô

    // vẽ boardgame và lưu
    var sectionSize = xboard/sizeboard; //size mỗi ô sẽ bằng chiều dài chia số ô??
    //=============kẻ bảng=================
    for (i = 0; i <= sizeboard; i++) {
        for (j = 0; j <= sizeboard; j++) {
            // Đường ngang
            ctx.moveTo(0, sectionSize * j);
            ctx.lineTo(sectionSize * sizeboard, sectionSize * j);
            ctx.stroke();
            // Đường dọc
            ctx.moveTo(sectionSize * i, 0);
            ctx.lineTo(sectionSize * i, sectionSize * sizeboard);
            ctx.stroke();
        }
    };
    
    const boardbuffer = canvas.toBuffer();
    //vẽ background và lấy boardgame ra vẽ lên

    var background = await Canvas.loadImage("https://i.ibb.co/WVgwgtc/0afd2951b10413352a363ea51b4606ac.jpg");
    var xbground = background.width,
        ybground = background.height;
    const canvasbg = Canvas.createCanvas(xbground, ybground);
    let ctxx = canvasbg.getContext('2d');
    ctxx.drawImage(background, 0, 0, xbground, ybground);
    //reg font
    ctxx.fillStyle = "#000000";
    ctxx.textAlign = "center";
    if(!fs.existsSync(__dirname+'/cache/bold-font.ttf')) {
      let getfont = (await axios.get("https://drive.google.com/u/0/uc?id=1Kx2hi9VX5X4KjwO1uFR6048fm4dKAMnp&export=download", { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname+'/cache/bold-font.ttf', Buffer.from(getfont, "utf-8"));
    };
    Canvas.registerFont(__dirname+'/cache/bold-font.ttf', {
        family: "caro",
        weight: "regular",
        style: "normal"
    });
    ctxx.font = "bold 36px caro";
    //vẽ board lên background
    var boardCv = await Canvas.loadImage(boardbuffer);
    ctxx.drawImage(boardCv, (xbground-880)/2, 320, 880, 880);
    console.log((xbground-880)/2);
    //vẽ tọa độ
    //var canchinh = 880/16/2; // =27.5
    for(let i = 0; i < 16; i++) {
      ctxx.fillText(i, (xbground-880)/2+i*(880/16)+27.5, 310);//880 là size board lúc vẽ vài background
      ctxx.fillText(i, (xbground-880)/2-30, 330+i*(880/16)+27.5)
    }
    //
    try{
    var avt1 = (await spf.get(`https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).body;
    var avt2 = (await spf.get(`https://graph.facebook.com/${player2}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).body;
    ctxx.drawImage(await Canvas.loadImage(avt1), xbground/2-100-200, (320-200)/2, 200, 200);
    ctxx.drawImage(await Canvas.loadImage(avt2), xbground/2+100    , (320-200)/2, 200, 200);
    }
    catch(e) {};
    var VS = (await spf.get("https://i.ibb.co/RQjPz7f/1624961650011.png")).body;
    var logoVS = await Canvas.loadImage(VS);
    ctxx.drawImage(logoVS, xbground/2-200/2, (320-200)/2, 200, 200);
    //ctxx.drawImage(logoVS, 10,10,200,200);
    fs.writeFileSync(path2, canvasbg.toBuffer());
    api.sendMessage({body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖼𝗋𝖾𝖺𝗍𝖾𝖽 𝗍𝗁𝖾 𝖼𝗁𝖾𝖼𝗄𝖾𝗋𝖻𝗈𝖺𝗋𝖽\n━━━━━━━━━━━━━━━━━━━\n 𝖸𝗈𝗎 𝗀𝗈 𝖿𝗂𝗋𝗌𝗍\n━━━━━━━━━━━━━━━━━━━\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝖷 𝖸 𝖼𝗈𝗈𝗋𝖽𝗂𝗇𝖺𝗍𝖾𝗌 𝗍𝗈 𝗉𝗅𝖺𝗒 𝗍𝗁𝗂𝗌 𝗀𝖺𝗆𝖾\n━━━━━━━━━━━━━━━━━━━\n📚 | 𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n𝟭 𝟱", attachment: fs.createReadStream(path2)}, threadID, (e, info) => {
            client.handleReply.push({
                name: this.config.name,
                author: senderID,
                messageID: info.messageID,
                x: x,
                y: y,
                d: d,
                d1: d1,
                sizeboard: sizeboard,
                sectionSize: sectionSize,
                boardbuffer: boardbuffer
            });
        }
    );
};