module.exports.config = {
    name: "confess",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "Réynél",
    description: "crush maybe",
    commandCategory: "confess",
    usages: "[@mention]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": ""
    }
};

module.exports.onLoad = async() => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/canvas/`;
    const path = resolve(__dirname, 'cache/canvas', 'confess.png');
    if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.imgur.com/P7sBv2p.png", path);
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"]; 
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let confess_img = await jimp.read(__root + "/confess.png");
    let pathImg = __root + `/confess_${one}_${two}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;
    
    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));
    
    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));
    
    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    confess_img.resize(500, 500).composite(circleOne.resize(65, 65), 142, 86).composite(circleTwo.resize(65, 65), 293, 119);
    
    let raw = await confess_img.getBufferAsync("image/png");
    
    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);
    fs.unlinkSync(avatarTwo);
    
    return pathImg;
}
async function circle(image) {
    const jimp = require("jimp");
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api, args }) {
    const fs = global.nodemodule["fs-extra"];
    const { threadID, messageID, senderID } = event;
    const mention = Object.keys(event.mentions);
    if (!mention[0]) return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝖺𝗀 𝟣 𝗉𝖾𝗋𝗌𝗈𝗇\n\n𝖧𝗈𝗐 𝗍𝗈 𝗎𝗌𝖾?\n${global.config.PREFIX}𝖼𝗈𝗇𝖿𝖾𝗌𝗌 <@𝗍𝖺𝗀>\n\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n${global.config.PREFIX}𝖼𝗈𝗇𝖿𝖾𝗌𝗌 @𝗇𝖺𝗆𝖾`, threadID, messageID);
    else {
      let tag = event.mentions[mention].replace("@", "");
        const one = senderID, two = mention[0];
        return makeImage({ one, two }).then(path => api.sendMessage({ body: "𝖨 𝗋𝖾𝖺𝗅𝗅𝗒 𝗅𝗂𝗄𝖾 𝗒𝗈𝗎 " + tag + ' 𝗌𝗂𝗇𝖼𝖾 𝗍𝗁𝖾𝗇 𝗎𝗇𝗍𝗂𝗅 𝗇𝗈𝗐',
            mentions: [{
          tag: tag,
          id: mention
        }],
     attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
    }
      }