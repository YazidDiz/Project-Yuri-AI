module.exports.config = {
  name: "hi",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "ne prefixes needed the bot will automatically respond if you greet hi, hello, hey, etc.",
  commandCategory: "auto-resp",
  usages: "[just say hi]",
  cooldowns: 5
}

module.exports.handleEvent = async ({ event, api, Users }) => {
  let KEY = [ 
    "hello",
    "hi",
    "hello po",
    "hi po",
    "hiii",
    "helloo",
    "loe",
    "low",
    "lo",
    "hey",
    "heyy",
    "sup",
    "heyaa",
    "ello",
    "eyy",
    "chao",
    "pre",
    "👍",
    "psst",
    "halooo",
    "oi",
    "helo",
    "konnichiwa",
    "yo",
    "wazzup",
    "wassup",
    "hey",
    "ayoo",
    "hola"
  ];
  let thread = global.data.threadData.get(event.threadID) || {};
  if (typeof thread["hi"] == "undefined", thread["hi"] == false) return
  else {
  if (KEY.includes(event.body.toLowerCase()) !== false) {
    let data = [
      "422812141688367", "1775288509378520", "476426593020937", "476420733021523", "147663618749235", "466041158097347", "1528732074026137", "147663618749235", "476426753020921", "529233794205649", "1330360453820546"
    ];
    let sticker = data[Math.floor(Math.random() * data.length)];
let juswa = ["𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗁𝖺𝗏𝖾 𝗒𝗈𝗎 𝖾𝖺𝗍𝖾𝗇?", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝗐𝗁𝖺𝗍 𝖺𝗋𝖾 𝗒𝗈𝗎 𝖽𝗈𝗂𝗇𝗀?", "𝖧𝗈𝗐 𝖺𝗋𝖾 𝗒𝗈𝗎 𝗌𝖾𝗇𝗌𝖾𝗂?", "𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗂𝗍'𝗌 𝗇𝗂𝖼𝖾 𝗍𝗈 𝗌𝖾𝖾 𝗒𝗈𝗎", "𝖨'𝗆 𝗐𝖺𝗂𝗍𝗂𝗇𝗀 𝖿𝗈𝗋 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋, 𝗁𝗈𝗐 𝖺𝖻𝗈𝗎𝗍 𝗒𝗈𝗎 𝗌𝖾𝗇𝗌𝖾𝗂", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝖼𝖺𝗇 𝗒𝗈𝗎 𝗂𝗇𝗍𝖾𝗋𝖺𝖼𝗍 𝗐𝗂𝗍𝗁 𝗆𝖾 𝗎𝗌𝗂𝗇𝗀 𝗌𝗂𝗆 𝖼𝗈𝗆𝗆𝖺𝗇𝖽?","𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖺𝗋𝖾 𝗌𝗈 𝖻𝖾𝖺𝗎𝗍𝗂𝖿𝗎𝗅/𝗁𝖺𝗇𝖽𝗌𝗈𝗆𝖾", "𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗁𝖺𝗏𝖾 𝖺 𝗐𝗈𝗇𝖽𝖾𝗋𝖿𝗎𝗅 𝖽𝖺𝗒","𝖲𝖾𝗇𝗌𝖾𝗂, 𝖺𝗋𝖾 𝗒𝗈𝗎 𝖻𝗈𝗋𝖾𝖽? 𝗍𝗋𝗒 𝗍𝗈 𝗍𝖺𝗅𝗄 𝗐𝗂𝗍𝗁 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋", "𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗁𝖾𝗋𝖾 𝖺𝗍 𝗒𝗈𝗎 𝗌𝖾𝗋𝗏𝗂𝖼𝖾!", "𝖤𝖺𝗍 𝗌𝗈𝗆𝖾 𝗌𝗐𝖾𝖾𝗍𝗌 𝗌𝖾𝗇𝗌𝖾𝗂!", "𝖲𝖾𝗇𝗌𝖾𝗂, 𝖺𝗋𝖾 𝗒𝗈𝗎 𝗈𝗄𝖺𝗒?", "𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗐𝗁𝖺𝗍'𝗌 𝗍𝗁𝖾 𝗆𝖺𝗍𝗍𝖾𝗋?", "𝖧𝖺𝗃𝗂𝗆𝖾𝗆𝖺𝗌𝗁𝗂𝗍𝖾 𝗌𝖾𝗇𝗌𝖾𝗂!"];
 let juswa1 = juswa[Math.floor(Math.random() * juswa.length)];

    let moment = require("moment-timezone");
    let hours = moment.tz('Asia/Manila').format('HHmm');
    let session = (
    hours > 0001 && hours <= 400 ? "bright morning" : 
    hours > 401 && hours <= 700 ? "morning" :
    hours > 701 && hours <= 1000 ? "morning" :
    hours > 1001 && hours <= 1100 ? "morning" : 
    hours > 1100 && hours <= 1500 ? "afternoon" : 
    hours > 1501 && hours <= 1800 ? "evening" : 
    hours > 1801 && hours <= 2100 ? "evening" : 
    hours > 2101 && hours <= 2400 ? "late night and advance sleepwell" : 
    "error");
    let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
    let msg = {body: `𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂 ${name}, 𝖧𝖺𝗏𝖾 𝖺 𝗀𝗋𝖾𝖺𝗍 ${session}, ${juswa1}`, mentions}
    api.sendMessage(msg, event.threadID, (e, info) => {
      setTimeout(() => {
        api.sendMessage({sticker: sticker}, event.threadID);
      }, 100)
    }, event.messageID)
  }
  }
}

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
		"successText": `${this.config.name} thành công`,
	},
	"en": {
		"on": "on",
		"off": "off",
		"successText": `${this.config.name} success!`,
	}
}

module.exports.run = async ({ event, api, Threads, getText }) => {
  let { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
	if (typeof data["hi"] == "undefined" || data["hi"] == true) data["hi"] = false;
	else data["hi"] = true;
	await Threads.setData(threadID, {
		data
	});
	global.data.threadData.set(threadID, data);
	return api.sendMessage(`${(data["hi"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}