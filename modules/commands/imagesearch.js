module.exports.config = {
	name: "imagesearch",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "Search an Image",
	commandCategory: "searches",
	usages: "[text]",
	cooldowns: 30,
	dependencies: {
		"axios":"",
		"fs-extra":"",
		"googlethis":"",
    "cloudscraper":""
	}
};

module.exports.run = async ({matches, event, api, extra, args}) => {
    
    const axios = global.nodemodule['axios'];
    const google = global.nodemodule["googlethis"];
const cloudscraper = global.nodemodule["cloudscraper"];
const fs = global.nodemodule["fs"];

var query = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
  //let query = args.join(" ");
  api.sendMessage(`🔎 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖿𝗈𝗋 ${query}...`, event.threadID, event.messageID);
  
  let result = await google.image(query, {safe: false});
  if(result.length === 0) {
    api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗒𝗈𝗎𝗋 𝗂𝗆𝖺𝗀𝖾 𝗌𝖾𝖺𝗋𝖼𝗁 𝖽𝗂𝖽 𝗇𝗈𝗍 𝗋𝖾𝗍𝗎𝗋𝗇 𝖺𝗇𝗒 𝗋𝖾𝗌𝗎𝗅𝗍𝗌.`, event.threadID, event.messageID)
    return;
  }
  
  let streams = [];
  let counter = 0;
  
  console.log(result)
  
  for(let image of result) {
    // Only show 12 images
    if(counter >= 12)
      break;
      
    console.log(`${counter}: ${image.url}`);
    
    // Ignore urls that does not ends with .jpg or .png
    let url = image.url;
    if(!url.endsWith(".jpg") && !url.endsWith(".png"))
      continue;
    
   let path = __dirname + `/cache/search-image-${counter}.jpg`;
    let hasError = false;
    await cloudscraper.get({uri: url, encoding: null})
      .then((buffer) => fs.writeFileSync(path, buffer))
      .catch((error) => {
        console.log(error)
        hasError = true;
      });
      
    if(hasError)
      continue;
    
    console.log(`Pushed to streams: ${path}`) ;
    streams.push(fs.createReadStream(path).on("end", async () => {
      if(fs.existsSync(path)) {
        fs.unlink(path, (err) => {
          if(err) return console.log(err);
            
          console.log(`Deleted file: ${path}`);
        });
      }
    }));
    
    counter += 1;
  }
  
  api.sendMessage("⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗍𝗁𝖾 𝗌𝖾𝖺𝗋𝖼𝗁 𝗋𝖾𝗌𝗎𝗅𝗍...", event.threadID, event.messageID)
  
  let msg = {
    body: `𝗜𝗺𝗮𝗴𝗲 𝗦𝗲𝗮𝗿𝗰𝗵 𝗥𝗲𝘀𝘂𝗹𝘁:\n"${query}"\n━━━━━━━━━━━━━━━━━━━\n𝗙𝗼𝘂𝗻𝗱: ${result.length} 𝗜𝗺𝗮𝗴𝗲${result.length > 1 ? 's' : ''}\n𝗢𝗻𝗹𝘆 𝘀𝗵𝗼𝘄𝗶𝗻𝗴: 𝟭𝟮 𝗶𝗺𝗮𝗴𝗲𝘀\n━━━━━━━━━━━━━━━━━━━\n꙳☪︎●◉✿𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜✿◉●☪︎꙳`,
    attachment: streams
  };
  
  api.sendMessage(msg, event.threadID, event.messageID);
};



  