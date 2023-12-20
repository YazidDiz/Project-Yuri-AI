module.exports.config = {
	name: "crypto",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "daily update about crypto coin",
	commandCategory: "information",
	usages: "[Bitcoin, Ethereum, Tether, Binance, Usd Coin, Hex, Solana, Xrp, Terra, Ada, Ust, Doge]",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
const fs = require('fs-extra');
const request = require('request');

//let song = args.join(" ");

  var type;
  switch(args[0]) {
    case "bitcoin":
    case "Bitcoin":
    case "BTC":
    case "btc":
    type = "btc-bitcoin";
    break;
    case "ethereum":
    case "thereum":
    case "ETH":
    case "eth":
    type = "eth-ethereum";
    break;
    case "tether": 
    case "Tether":
    type = "usdt-tether";
    break;
    case "binance":
    case "Binance":
    case "Bnb":
    case "BNB":
    type = "bnb-binance-coin";
    break;
    case "USD Coin":
    case "usd coin":
    case "USD":
    type = "usdc-usd-coin";
    break;
    case "hex":
    case "HEX":
    type = "hex-hex";
    break;
    case "solana":
    case "Solana":
    case "SOL":
    case "sol":
    type = "sol-solana";
    break;
    case "Xrp":
    case "xrp":
    case "XRP":
    type = "xrp-xrp";
    break;
    case "terra":
    case "Terra":
    case "Luna":
    case "luna":
    type = "luna-terra";
    break;
    case "ada":
    case "ADA":
    case "cardano":
    case "Cardano":
    type = "ada-cardano";
    break;
    case "ust":
    case "UST":
    case "terrausd":
    case "Terrausd":
    type = "ust-terrausd";
    break;
    case "doge":
    case "DOGE":
    case "dogecoin":
    case "Dogecoin":
    type = "doge-dogecoin";
    break;
    default:
    return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗎𝗍 𝗍𝗁𝖾 𝗍𝗒𝗉𝖾 𝗈𝖿 𝖼𝗈𝗂𝗇.\n\n𝗟𝗶𝘀𝘁 𝗼𝗳 𝗰𝗼𝗶𝗻 𝗮𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲:\n𝖡𝗂𝗍𝖼𝗈𝗂𝗇\n𝖤𝗍𝗁𝖾𝗋𝖾𝗎𝗆\n𝖳𝖾𝗍𝗁𝖾𝗋\n𝖡𝗂𝗇𝖺𝗇𝖼𝖾\n𝖴𝗌𝖽 𝖢𝗈𝗂𝗇\n𝖧𝖾𝗑\n𝖲𝗈𝗅𝖺𝗇𝖺\n𝖷𝗋𝗉\n𝖳𝖾𝗋𝗋𝖺\n𝖠𝖽𝖺\n𝖴𝗌𝗍\n𝖣𝗈𝗀𝖾`, event.threadID, event.messageID);
    break;
  }

//const res = await 

axios.get(`https://api.coinpaprika.com/v1/ticker/${type}`).then(res => {

var name = res.data.name;
var symbol = res.data.symbol;
var rank = res.data.rank;
var price_usd = res.data.price_usd;
var price_btc = res.data.price_btc;
var percent_24h = res.data.percent_change_24h;

var callback = function () {
 api.sendMessage({ body:`╔ೋღ 𝗖𝗿𝘆𝗽𝘁𝗼 𝗖𝗼𝗶𝗻 ღೋ╗\n  𝗡𝗮𝗺𝗲: ${name}\n  𝗦𝘆𝗺𝗯𝗼𝗹: ${symbol}\n  𝗥𝗮𝗻𝗸: ${rank}\n  𝗨𝗦𝗗 𝗣𝗿𝗶𝗰𝗲: ${price_usd}\n  𝗕𝗧𝗖 𝗣𝗿𝗶𝗰𝗲: ${price_btc}\n  𝗣𝗲𝗿𝗰𝗲𝗻𝘁: ${percent_24h}\n\n꙳☪︎●◉✿𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜✿◉●☪︎꙳\n╚═══ೋღ∘🌺∘ღೋ═══╝`, attachment: fs.createReadStream(__dirname + '/cache/c.jpg')
					}, event.threadID, () => fs.unlinkSync(__dirname + '/cache/c.jpg'), event.messageID);
				};
				request(`https://static.coinpaprika.com/coin/${type}/logo.png?rev=10557311`).pipe(fs.createWriteStream(__dirname + `/cache/c.jpg`)).on("close", callback);
                 })
  }