module.exports.config = {
    name: "animate",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Réynél",
    description: "Anime filter",
    commandCategory: "generate",
    usages: "[reply to image or image url]",
    cooldowns: 1,
};
const axios = require("axios")
const fs = require("fs");
module.exports.run = async function({ api, event, args }) {
const { threadID, messageID } = event;
if (event.type == "message_reply"){
var t = event.messageReply.attachments[0].url
} else {
 var t = args.join(" ");
}
try {
api.sendMessage("⏳ | 𝖦𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", threadID, messageID);
    const r = await axios.get("https://free-api.ainz-sama101.repl.co/canvas/toanime?", {
                params: {
                    url: encodeURI(t)
    }
});
const result = r.data.result.image_data;
    let ly = __dirname+"/cache/anime.png";
    let ly1 = (await axios.get(result, {
    responseType: "arraybuffer"
  })).data;
  fs.writeFileSync(ly, Buffer.from(ly1, "utf-8"));
    return api.sendMessage({body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖺𝗇𝗂𝗆𝖺𝗍𝖾𝖽 𝗉𝗂𝖼𝗍𝗎𝗋𝖾:", attachment: fs.createReadStream(ly)}, threadID, () => fs.unlinkSync(ly), messageID)
  } catch (e){
        console.log(e.message);
          return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗌𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀 𝗐𝖾𝗇𝗍 𝗐𝗋𝗈𝗇𝗀.\n"+e.message, threadID, messageID)
   }
   }