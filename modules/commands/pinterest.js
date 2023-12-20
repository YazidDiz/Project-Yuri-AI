module.exports.config = {
  name: "pinterest",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Image search in pinterest",
  commandCategory: "searches",
  usages: "[Image name]",
  cooldowns: 0,
};
module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const request = require("request");
    const keySearch = args.join(" ");
    if(keySearch.includes("-") == false) return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖾𝗇𝗍𝖾𝗋 𝗂𝗇 𝗍𝗁𝖾 𝖿𝗈𝗋𝗆𝖺𝗍\n\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n𝖯𝗂𝗇𝗍𝖾𝗋𝖾𝗌𝗍 𝖸𝗎𝗋𝗂 𝖭𝖺𝗄𝖺𝗆𝗎𝗋𝖺 - 𝟣𝟢 (𝖨𝗍 𝖽𝖾𝗉𝖾𝗇𝖽𝗌 𝗈𝗇 𝗒𝗈𝗎 𝗁𝗈𝗐 𝗆𝖺𝗇𝗒 𝗂𝗆𝖺𝗀𝖾𝗌 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖺𝗉𝗉𝖾𝖺𝗋 𝗂𝗇 𝗍𝗁𝖾 𝗋𝖾𝗌𝗎𝗅𝗍)', event.threadID, event.messageID)
    const keySearchs = keySearch.substr(0, keySearch.indexOf('-'))
    const numberSearch = keySearch.split("-").pop() || 6
    const res = await axios.get(`https://api-dien.kira1011.repl.co/pinterest?search=${encodeURIComponent(keySearchs)}`);
    const data = res.data.data;
    var num = 0;
    var imgData = [];
    for (var i = 0; i < parseInt(numberSearch); i++) {
      let path = __dirname + `/cache/${num+=1}.jpg`;
      let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
      imgData.push(fs.createReadStream(__dirname + `/cache/${num}.jpg`));
    }
    api.sendMessage({
        attachment: imgData,
        body: numberSearch + '🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂 𝗁𝖾𝗋𝖾’𝗌 𝗍𝗁𝖾 𝗌𝖾𝖺𝗋𝖼𝗁 𝗋𝖾𝗌𝗎𝗅𝗍𝗌 𝖿𝗈𝗋 𝗄𝖾𝗒𝗐𝗈𝗋𝖽: '+ keySearchs
    }, event.threadID, event.messageID)
    for (let ii = 1; ii < parseInt(numberSearch); ii++) {
        fs.unlinkSync(__dirname + `/cache/${ii}.jpg`)
    }
};