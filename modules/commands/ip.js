module.exports.config = {
	name: "ip",	
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "Réynél",
	description: "View your ip information or other ip", 
	commandCategory: "information",
	usages: "[mention or blank]",
	cooldowns: 5, 
	dependencies: "",
};

module.exports.run = async function({ api, args, event, __GLOBAL }) {
  const timeStart = Date.now();
  
    const axios = require("axios");
  if (!args[0]) {api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝖠𝖯𝖨 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖼𝗁𝖾𝖼𝗄",event.threadID, event.messageID);}
  else {
var infoip = (await axios.get(`http://ip-api.com/json/${args.join(' ')}?fields=66846719`)).data;
       if (infoip.status == 'fail')
         {api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.: ${infoip.message}`, event.threadID, event.messageID)}
          else {
            /////////////////
          //////////////////
 api.sendMessage({body:`======${(Date.now()) - timeStart}ᴍs=====
 🗺️ | 𝗖𝗼𝗻𝘁𝗶𝗻𝗲𝗻𝘁: ${infoip.continent}
🏳️ | 𝗡𝗮𝘁𝗶𝗼𝗻: ${infoip.country}
🎊 | 𝗖𝗼𝘂𝗻𝘁𝗿𝘆 𝗖𝗼𝗱𝗲: ${infoip.countryCode}
🕋 | 𝗔𝗿𝗲𝗮: ${infoip.region}
⛱️ | 𝗥𝗲𝗴𝗶𝗼𝗻/𝗦𝘁𝗮𝘁𝗲: ${infoip.regionName}
🏙️ | 𝗖𝗶𝘁𝘆: ${infoip.city}
🛣️ | 𝗗𝗶𝘀𝘁𝗿𝗶𝗰𝘁: ${infoip.district}
📮 | 𝗭𝗶𝗽 𝗖𝗼𝗱𝗲: ${infoip.zip}
🧭 | 𝗟𝗮𝘁𝗶𝘁𝘂𝗱𝗲: ${infoip.lat}
🧭 | 𝗟𝗼𝗻𝗴𝗶𝘁𝘂𝗱𝗲: ${infoip.lon}
⏱️ | 𝗧𝗶𝗺𝗲𝘇𝗼𝗻𝗲: ${infoip.timezone}
👨‍✈️ | 𝗢𝗿𝗴𝗮𝗻𝗶𝘇𝗮𝘁𝗶𝗼𝗻 𝗡𝗮𝗺𝗲: ${infoip.org}
💵 | 𝗖𝘂𝗿𝗿𝗲𝗻𝗰𝘆 𝗨𝗻𝗶𝘁: ${infoip.currency}
`,location: {
				latitude: infoip.lat,
				longitude: infoip.lon,
				current: true
			}}
,event.threadID, event.messageID);}
        }
    
                  }

  
  
  
  
  
  
  