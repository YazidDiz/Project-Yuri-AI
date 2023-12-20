module.exports.config = {
    name: "lyrics2",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Réynél",
    description: "Search Lyrics",
    commandCategory: "media",
    usages: "[Name of the song]",
    cooldowns: 1,
};
const axios = require("axios")
const fs = require("fs");
module.exports.run = async function({ api, event, args }) {
const { threadID, messageID } = event;
let t = args.join(" ");
if (!t) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗇𝖺𝗆𝖾 𝗈𝖿 𝗍𝗁𝖾 𝗌𝗈𝗇𝗀 𝗂𝗌 𝗆𝗂𝗌𝗌𝗂𝗇𝗀", threadID, messageID);
try {
    const r = await axios.get('https://lyrist.vercel.app/api/'+t);
const { image, lyrics, artist, title } = r.data;
    let ly = __dirname+"/cache/lyrics.png";
    let ly1 = (await axios.get(image, {
    responseType: "arraybuffer"
  })).data;
  fs.writeFileSync(ly, Buffer.from(ly1, "utf-8"));
    return api.sendMessage({body: `╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n  ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n\n𝗧𝗶𝘁𝗹𝗲: ${title}\n𝗔𝗿𝘁𝗶𝘀𝘁: ${artist}\n\n✿═❆╡𝗦𝗢𝗡𝗚 𝗟𝗬𝗥𝗜𝗖𝗦╞❆═✿\n\n${lyrics}\n\n✿═❆╡ 𝗘𝗡𝗗 𝗟𝗬𝗥𝗜𝗖𝗦 ╞❆═✿`, attachment: fs.createReadStream(ly)}, threadID, () => fs.unlinkSync(ly), messageID)
  } catch (e){
        console.log(e.message);
          return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖨 𝖼𝖺𝗇'𝗍 𝖿𝗂𝗇𝖽 𝗍𝗁𝖾 𝗅𝗒𝗋𝗂𝖼𝗌 𝗒𝗈𝗎 𝖺𝗋𝖾 𝗅𝗈𝗈𝗄𝗂𝗇𝗀 𝖿𝗈𝗋", threadID, messageID)
   }
}