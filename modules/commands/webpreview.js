const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs-extra");

module.exports.config = {
  name: "webpreview",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Generate a detailed preview of a website's content",
  usages: "[url]",
  commandCategory: "utilities",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const url = args[0];

  if (!url) {
    api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝖴𝖱𝖫.", event.threadID, event.messageID);
    return;
  }

  api.sendMessage(`🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗉𝗋𝖾𝗏𝗂𝖾𝗐 𝖿𝗈𝗋 "${url}"...`, event.threadID, event.messageID);

  try {
    const preview = await generateWebPreview(url);
    if (preview) {
      api.sendMessage({
        body: preview.text,
        attachment: fs.createReadStream(__dirname + "/cache/web_preview_image.jpg")
      }, event.threadID);
      
      if (preview.alternativeResults) {
        api.sendMessage(preview.alternativeResults, event.threadID);
      }
    } else {
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖿𝗈𝗋 𝗍𝗁𝗂𝗌 𝖴𝖱𝖫.", event.threadID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝗉𝗋𝖾𝗏𝗂𝖾𝗐.", event.threadID, event.messageID);
  }
};

async function generateWebPreview(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title = $("head title").text();
    const description = $("meta[name='description']").attr("content") || "";
    const imageUrl = $("meta[property='og:image']").attr("content") || "";

    const previewText = `
🌐 | 𝗣𝗿𝗲𝘃𝗶𝗲𝘄 𝗳𝗼𝗿: "${title}":

📜 | 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${description}
🔗 | 𝗨𝗥𝗟: ${url}
🖼️ | 𝗜𝗺𝗮𝗴𝗲 𝗨𝗥𝗟: ${imageUrl}
`;

    const apiResponse = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(title)}`);
    const pages = apiResponse.data.query.pages;
    const pageId = Object.keys(pages)[0];
    const pageData = pages[pageId];
    const extract = pageData.extract || "";

    let alternativeResults = "";

    if (extract) {
      const paragraphs = extract.split("\n\n").filter(para => para.length > 0);
      for (const paragraph of paragraphs) {
        alternativeResults += `\n\n${paragraph}\n\n`;
      }
    }

    let path = __dirname + "/cache/web_preview_image.jpg";
    let hasError = false;

    try {
      let imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(path, Buffer.from(imageResponse.data, "binary"));
    } catch (error) {
      console.log(error);
      hasError = true;
    }

    if (!hasError) {
      return {
        text: previewText,
        alternativeResults: alternativeResults
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
    }
                             