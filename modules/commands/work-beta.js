
module.exports.config = {
  name: "job",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "Réynél", 
  description: "work to get bot money",
  commandCategory: "economy",
  cooldowns: 5,
  envConfig: {
  cooldownTime: 5000
    }
};
module.exports.languages = {
    
    "en": {
        "cooldown": "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎'𝗋𝖾 𝖽𝗈𝗇𝖾, 𝖼𝗈𝗆𝖾 𝖻𝖺𝖼𝗄 𝗅𝖺𝗍𝖾𝗋: %1 𝗆𝗂𝗇𝗎𝗍𝖾(𝗌) %2 𝗌𝖾𝖼𝗈𝗇𝖽(𝗌)."
    }
}
module.exports.handleReply = async ({ event, api, handleReply, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    let data = (await Currencies.getData(senderID)).data || {};
//random coins nhận được khi làm việc ít nhất 200
var coinscn = Math.floor(Math.random() * 401) + 200; //random coins khi làm ở khu công nghiệp
var coinsdv = Math.floor(Math.random() * 801) + 200; //random coins khi làm ở khu dịch vụ
var coinsmd = Math.floor(Math.random() * 401) + 200; //random coins khi làm ở mỏ dầu
var coinsq = Math.floor(Math.random() * 601) + 200; //random coins khi khai thác quặng
var coinsdd = Math.floor(Math.random() * 201) + 200; //random coins khi đào đá
var coinsdd1 = Math.floor(Math.random() * 801) + 200; //random coins khi đào đá

//random things to do
var rdcn = ['hiring staff', 'hotel administrator', 'at the power plant', 'restaurant chef', 'worker']; //random job when working in industrial park
var work1 = rdcn[Math.floor(Math.random() * rdcn.length)];   

var rddv = ['plumber', 'neighbors air conditioner repair', 'multi-level sale', 'flyer distribution', 'shipper', 'computer repair', 'tour guide', 'breastfeeding' ]; //random work when working in the service area
var work2 = rddv[Math.floor(Math.random() * rddv.length)]; 

var rdmd = ['earn 13 barrels of oil', 'earn 8 barrels of oil', 'earn 9 barrels of oil', 'earn 8 barrels of oil', 'steal the oil', 'take water and pour it into oil and sell it']; //random job while working at an oil field
var work3 = rdmd[Math.floor(Math.random() * rdmd.length)]; 

var rdq = ['iron ore', 'gold ore', 'coal ore', 'lead ore', 'copper ore', 'oil ore']; //random job when mining ore
var work4 = rdq[Math.floor(Math.random() * rdq.length)]; 

var rddd = ['diamond', 'gold', 'coal', 'emerald', 'iron', 'ordinary stone', 'lazy', 'bluestone']; //random job when digging rock
var work5 = rddd[Math.floor(Math.random() * rddd.length)]; 

var rddd1 = ['vip guest', 'patent', 'stranger', '23-year-old fool', 'stranger', 'patron', '92-year-old tycoon', '12-year-old boyi']; //random work when digging rock
var work6 = rddd1[Math.floor(Math.random() * rddd1.length)];


var msg = "";
    switch(handleReply.type) {
        case "choosee": {
            
            switch(event.body) {
                case "1": msg = `🏘 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖺𝗋𝖾 𝗐𝗈𝗋𝗄𝗂𝗇𝗀 ${work1} 𝗂𝗇 𝗍𝗁𝖾 𝗂𝗇𝖽𝗎𝗌𝗍𝗋𝗂𝖺𝗅 𝗓𝗈𝗇𝖾 𝖺𝗇𝖽 𝖾𝖺𝗋𝗇𝖾𝖽 ${coinscn}$` ; Currencies.increaseMoney(event.senderID, coinscn); break;             
                case "2": msg = `🛠 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖺𝗋𝖾 𝗐𝗈𝗋𝗄𝗂𝗇𝗀 ${work2} 𝗂𝗇 𝗍𝗁𝖾 𝗌𝖾𝗋𝗏𝗂𝖼𝖾 𝖺𝗋𝖾𝖺 𝖺𝗇𝖽 𝖾𝖺𝗋𝗇𝖾𝖽 ${coinsdv}$`; Currencies.increaseMoney(event.senderID, coinsdv); break;
                case "3": msg = `🛢 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 ${work3} 𝖺𝗍 𝗍𝗁𝖾 𝗈𝗉𝖾𝗇 𝗈𝗂𝗅 𝖺𝗇𝖽 𝗌𝖾𝗅𝗅 ${coinsmd}$`; Currencies.increaseMoney(event.senderID, coinsmd); break;
                case "4": msg = `⛏️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖺𝗋𝖾 𝗆𝗂𝗇𝗂𝗇𝗀 ${work4} 𝖺𝗇𝖽 𝖾𝖺𝗋𝗇𝖾𝖽 ${coinsq}$`; Currencies.increaseMoney(event.senderID, coinsq); break;
                case "5": msg = `🗺 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖼𝖺𝗇 𝖽𝗂𝗀 ${work5} 𝖺𝗇𝖽 𝖾𝖺𝗋𝗇𝖾𝖽 ${coinsdd}$` ; Currencies.increaseMoney(event.senderID, coinsdd); break;
                case "6": msg = `😏 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖼𝗁𝗈𝗈𝗌𝖾 ${work6} 𝖺𝗇𝖽 𝗀𝗂𝗏𝖾𝗇 ${coinsdd1}$ 𝗂𝖿 𝖷𝖷𝖷 𝟣 𝗇𝗂𝗀𝗁𝗍, 𝗍𝗁𝖾𝗇 𝗒𝗈𝗎 𝖺𝗀𝗋𝖾𝖾 𝗋𝗂𝗀𝗁𝗍 𝖺𝗐𝖺𝗒 😏`; Currencies.increaseMoney(event.senderID, coinsdd1); break;
                case "7": msg = "🔜 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖼𝗈𝗆𝗂𝗇𝗀 𝗌𝗈𝗈𝗇..."; break; //add case if you want 
                default: break;
            };
            const choose = parseInt(event.body);
            if (isNaN(event.body)) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝗇𝗎𝗆𝖻𝖾𝗋 𝗒𝗈𝗎 𝗌𝖾𝗅𝖾𝖼𝗍𝖾𝖽.", event.threadID, event.messageID);
            if (choose > 7 || choose < 1) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗈𝗉𝗍𝗂𝗈𝗇 𝗂𝗌 𝗇𝗈𝗍 𝗂𝗇 𝗍𝗁𝖾 𝗐𝗈𝗋𝗄 𝗅𝗂𝗌𝗍.", event.threadID, event.messageID); //thay số case vào số 7
            api.unsendMessage(handleReply.messageID);
            if (msg == "❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗂𝗍'𝗌 𝗇𝗈𝗍 𝗎𝗉𝖽𝖺𝗍𝖾𝖽 𝗒𝖾𝗍...") {
                msg = "🔜 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗂𝗍 𝗐𝗂𝗅𝗅 𝗎𝗉𝖽𝖺𝗍𝖾 𝗌𝗈𝗈𝗇...";
            };
            return api.sendMessage(`${msg}`, threadID, async () => {
            data.work2Time = Date.now();
            await Currencies.setData(senderID, { data });
            
        });

    };
}
}
module.exports.run = async ({  event, api, handleReply, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    //cooldownTime for each receipt 
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.work2Time) > 0) {

        var time = cooldown - (Date.now() - data.work2Time),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 60000) / 1000).toFixed(0); 
        return api.sendMessage(getText("cooldown", minutes, (seconds < 10 ? "0" + seconds : seconds)), event.threadID, event.messageID);
    }
    else {    
    return api.sendMessage("𝗪𝗼𝗿𝗸 𝗘𝗮𝗿𝗻 𝗝𝗼𝗯 𝗖𝗲𝗻𝘁𝗲𝗿:\n━━━━━━━━━━━━━━━━━━━\n" +
  /*công nghiệp*/ "\n\n𝟭. 𝖶𝗈𝗋𝗄𝟣" +
  /*dịch vụ*/  "\n𝟮. 𝖶𝗈𝗋𝗄𝟤" +
  /*Mỏ dầu*/ "\n𝟯. 𝖶𝗈𝗋𝗄𝟥" +
  /*Quặng*/ "\n𝟰. 𝖶𝗈𝗋𝗄𝟦" +
  /*Đào đá*/ "\n𝟱. 𝖶𝗈𝗋𝗄𝟧" +
  /*cave*/    "\n𝟲. 𝖶𝗈𝗋𝗄𝟨" +
                "\n𝟳. 𝖴𝗉𝖽𝖺𝗍𝖾 𝗌𝗈𝗈𝗇..." +
                "\n\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝗇𝗎𝗆𝖻𝖾𝗋 𝗒𝗈𝗎 𝖼𝗁𝗈𝗌𝖾𝗇." //add case display here ||  \n[number]. [Career]" +
            , event.threadID, (error, info) => {
                data.work2Time = Date.now();
        global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
          })  
        })
    }
}
/*
@credit Réynél
@Vui lòng không đổi credit!
*/