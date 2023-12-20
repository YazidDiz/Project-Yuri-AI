module['exports']['config'] = {
  name: "prodia",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Generate an image.",
  commandCategory: "ai",
  usages: "[prompt | model]",
  cooldowns: 0
};

const fs = require("fs");
const { get } = require("axios");

module['exports']['run'] = async function({ api, event, args }) {
    let path = __dirname + "/cache/image.png";
    const tzt = args.join(" ").split("|").map(item => item.trim());
    let txt = tzt[0];
    let txt2 = tzt[1];

    let tid = event.threadID;
    let mid = event.messageID;

    if (!args[0] || !txt || !txt2) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗉𝗋𝗈𝗆𝗉𝗍 𝖺𝗇𝖽 𝖺 𝗆𝗈𝖽𝖾𝗅.", tid, mid);

    try {
        api.sendMessage("⏳ | 𝖦𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", tid, mid);

        let enctxt = encodeURI(txt);
        let url = `https://arjhil-prodia-api.arjhilbard.repl.co/generate?prompt=${enctxt}&model=${txt2}`;

        let result = (await get(url, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(path, Buffer.from(result, "utf-8"));
        api.sendMessage({ body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗌𝗈𝗆𝖾 𝗋𝖾𝗌𝗎𝗅𝗍𝗌 𝗈𝗇 𝗒𝗈𝗎𝗋 𝗀𝗂𝗏𝖾𝗇 𝗊𝗎𝖾𝗋𝗒:", attachment: fs.createReadStream(path) }, tid, () => fs.unlinkSync(path), mid);
    } catch (e) {
        return api.sendMessage(e.message, tid, mid);
    }
};
