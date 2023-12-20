const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "microlink",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Retrieve metadata from any URL.",
  commandCategory: "information",
  usages: "[URL]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    const url = args[0];

    if (!url) {
      api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗎𝗋𝗅 𝗍𝗈 𝗋𝖾𝗍𝗋𝗂𝖾𝗏𝖾 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇 𝖿𝗋𝗈𝗆.", event.threadID, event.messageID);
      return;
    }

    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);

    if (response.status === 200) {
      const data = response.data.data;
      const title = data.title || "N/A";
      const description = data.description || "N/A";
      const lang = data.lang || "N/A";
      const publisher = data.publisher || "N/A";
      const imageUrl = data.image?.url || "N/A";
      const imageType = data.image?.type || "N/A";
      const imageSize = data.image?.size_pretty || "N/A";
      const date = data.date || "N/A";
      const siteUrl = data.url || "N/A";
      const logoUrl = data.logo?.url || "N/A";
      const logoType = data.logo?.type || "N/A";
      const logoSize = data.logo?.size_pretty || "N/A";

      let path = __dirname + "/cache/logo.jpg";
      let hasError = false;

      try {
        let imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
        fs.writeFileSync(path, Buffer.from(imageResponse.data, "binary"));
      } catch (error) {
        console.error(error);
        hasError = true;
      }

      const message = `🌐 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖧𝖾𝗋𝖾 𝗂𝗌 𝗍𝗁𝖾 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇 𝖿𝗈𝗋 𝗍𝗁𝖾 𝖴𝖱𝖫 "${url}":\n\n` +
        `📜 | 𝖳𝗂𝗍𝗅𝖾: ${title}\n` +
        `📝 | 𝖣𝖾𝗌𝖼𝗋𝗂𝗉𝗍𝗂𝗈𝗇: ${description}\n` +
        `🗣 | 𝖫𝖺𝗇𝗀𝗎𝖺𝗀𝖾: ${lang}\n` +
        `📢 | 𝖯𝗎𝖻𝗅𝗂𝗌𝗁𝖾𝗋: ${publisher}\n` +
        `🖼️ | 𝖨𝗆𝖺𝗀𝖾 𝖴𝖱𝖫: ${imageUrl}\n` +
        `🖼️ | 𝖨𝗆𝖺𝗀𝖾 𝖳𝗒𝗉𝖾: ${imageType}\n` +
        `📏 | 𝖨𝗆𝖺𝗀𝖾 𝖲𝗂𝗓𝖾: ${imageSize}\n` +
        `📅 | 𝖣𝖺𝗍𝖾: ${date}\n` +
        `🌐 | 𝖲𝗂𝗍𝖾 𝖴𝖱𝖫: ${siteUrl}\n` +
        `🖼️ | 𝖫𝗈𝗀𝗈:\n${logoUrl}\n` +
        `🖼️ | 𝖫𝗈𝗀𝗈 𝖳𝗒𝗉𝖾: ${logoType}\n` +
        `📏 | 𝖫𝗈𝗀𝗈 𝖲𝗂𝗓𝖾: ${logoSize}\n` +
        "\nℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗇𝗈𝗍𝖾 𝗍𝗁𝖺𝗍 𝗍𝗁𝖾 𝗋𝖾𝗍𝗋𝗂𝖾𝗏𝖾𝖽 𝖽𝖺𝗍𝖺 𝗆𝖺𝗒 𝗇𝗈𝗍 𝖻𝖾 𝖺𝖼𝖼𝗎𝗋𝖺𝗍𝖾 𝖽𝗎𝖾 𝗍𝗈 𝗍𝗁𝖾 𝗇𝖺𝗍𝗎𝗋𝖾 𝗈𝖿 𝖾𝗑𝗍𝖾𝗋𝗇𝖺𝗅 𝗌𝗈𝗎𝗋𝖼𝖾𝗌.";

      if (!hasError) {
        api.sendMessage({
          body: message,
          attachment: fs.createReadStream(path),
        }, event.threadID, event.messageID);
      } else {
        api.sendMessage(message, event.threadID, event.messageID);
      }
    } else {
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖨 𝖼𝗈𝗎𝗅𝖽𝗇'𝗍 𝗋𝖾𝗍𝗋𝗂𝖾𝗏𝖾 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾𝖽 𝗎𝗋𝗅. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗆𝖺𝗄𝖾 𝗌𝗎𝗋𝖾 𝗂𝗍'𝗌 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗎𝗋𝗅.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖺𝗇 𝗎𝗇𝖾𝗑𝗉𝖾𝖼𝗍𝖾𝖽 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", event.threadID, event.messageID);
  }
};