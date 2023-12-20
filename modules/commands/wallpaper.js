const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "wallpaper",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Get random wallpapers based on a search query",
  usages: "[query]",
  commandCategory: "searches",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  if (args.length === 0) {
    api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗊𝗎𝖾𝗋𝗒 𝗍𝗈 𝗌𝖾𝖺𝗋𝖼𝗁 𝖿𝗈𝗋 𝗂𝗆𝖺𝗀𝖾𝗌.", event.threadID, event.messageID);
    return;
  }

  const apiKey = "39178311-acadeb32d7e369897e41dba06";
  const query = encodeURIComponent(args.join(" "));
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&per_page=200`;

  try {
    const response = await axios.get(apiUrl);
    const wallpapers = response.data.hits.filter(wallpaper => {
      const imageUrl = wallpaper.largeImageURL;
      const imageExtension = path.extname(imageUrl);
      return imageExtension === ".jpg" || imageExtension === ".png";
    });

    if (wallpapers.length === 0) {
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗐𝖺𝗅𝗅𝗉𝖺𝗉𝖾𝗋𝗌 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗀𝗂𝗏𝖾𝗇 𝗊𝗎𝖾𝗋𝗒.", event.threadID, event.messageID);
      return;
    }

    let streams = [];
    let counter = 0;

    for (const wallpaper of wallpapers) {
      if (counter >= 10) {
        break;
      }

      const imageUrl = wallpaper.largeImageURL;
      const imageExtension = path.extname(imageUrl);

      let imagePath = path.join(__dirname, `/cache/wallpaper${counter}${imageExtension}`);
      let hasError = false;

      try {
        const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
        fs.writeFileSync(imagePath, Buffer.from(imageResponse.data, "binary"));
      } catch (error) {
        console.error(error);
        hasError = true;
      }

      if (!hasError) {
        streams.push(fs.createReadStream(imagePath).on("end", () => {
          if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, err => {
              if (err) console.error(err);
            });
          }
        }));

        counter += 1;
      }
    }

    if (streams.length > 0) {
      let msg = {
        body: `📷 | 𝖱𝖺𝗇𝖽𝗈𝗆 𝖶𝖺𝗅𝗅𝗉𝖺𝗉𝖾𝗋 𝖱𝖾𝗌𝗎𝗅𝗍:`,
        attachment: streams
      };

      api.sendMessage(msg, event.threadID, event.messageID);
    } else {
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝗐𝖺𝗅𝗅𝗉𝖺𝗉𝖾𝗋𝗌.", event.threadID, event.messageID);
    }

  } catch (error) {
    console.error(error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝗐𝖺𝗅𝗅𝗉𝖺𝗉𝖾𝗋𝗌.", event.threadID, event.messageID);
  }
};
    