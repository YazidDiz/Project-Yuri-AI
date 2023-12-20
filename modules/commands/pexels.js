const axios = require("axios");
const fs = require("fs");
const stream = require("stream");

module.exports.config = {
  name: "pexels",
  version: "1.0.6",
  hasPermission: 0,
  credits: "Réynél",
  description: "Search for images on Pexels",
  commandCategory: "searches",
  usages: "[query]",
  cooldowns: 5,
};

const createReadStreamFromBuffer = (buffer) => {
  const readable = new stream.Readable();
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  return readable;
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, senderID } = event;

  const getUserInfo = async (api, userID) => {
    try {
      const userInfo = await api.getUserInfo(userID);
      return userInfo[userID].name;
    } catch (error) {
      console.error(`Error fetching user info: ${error}`);
      return "";
    }
  };

  const userName = await getUserInfo(api, senderID);

  try {
    const query = args.join(" ");
    if (!query) {
      return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗌𝖾𝖺𝗋𝖼𝗁 𝗊𝗎𝖾𝗋𝗒.", threadID, event.messageID);
    }

    const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}`;

    api.sendMessage(`⏳ | 𝖲𝖾𝗇𝗌𝖾𝗂 ${userName}, 𝖨 𝖺𝗆 𝖼𝗎𝗋𝗋𝖾𝗇𝗍𝗅𝗒 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...`, threadID, event.messageID);

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: "ZGKeJTcrcUFu5LeHuulKi7uyPqVkBxVp9dqaZtW2mFXUuFKBV1ljRMAL",
      },
    });

    if (response.data.photos && response.data.photos.length > 0) {
      const images = response.data.photos.slice(0, 10);

      const streams = [];

      for (const [index, photo] of images.entries()) {
        const url = photo.src.original;
        if (!url.endsWith(".jpeg")) continue;

        let hasError = false;

        const path = `./cache/search-image-${index}.jpeg`;

        try {
          const response = await axios.get(url, { responseType: "arraybuffer" });
          fs.writeFileSync(path, Buffer.from(response.data, "binary"));
        } catch (error) {
          console.error("Error downloading image:", error);
          hasError = true;
        }

        if (hasError) continue;

        streams.push(
          fs.createReadStream(path).on("end", () => {
            if (fs.existsSync(path)) {
              fs.unlinkSync(path, (err) => {
                if (err) return console.log(err);
                console.log(`Deleted file: ${path}`);
              });
            }
          })
        );
      }

      if (streams.length === 0) {
        api.sendMessage(`❎ | 𝖨 𝖺𝗉𝗈𝗅𝗈𝗀𝗂𝗓𝖾 𝖲𝖾𝗇𝗌𝖾𝗂 ${userName}, 𝖻𝗎𝗍 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 𝗇𝗈 𝗏𝖺𝗅𝗂𝖽 𝗂𝗆𝖺𝗀𝖾𝗌 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗀𝗂𝗏𝖾𝗇 𝗊𝗎𝖾𝗋𝗒.`, threadID, event.messageID);
      } else {
        const message = `🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂 ${userName}, 𝗁𝖾𝗋𝖾'𝗌 𝗐𝗁𝖺𝗍 𝖨 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 "${query}":\n\n${images
          .map(
            (photo, index) =>
              `${index + 1}. 𝖯𝗁𝗈𝗍𝗈 𝖻𝗒 ${photo.photographer}:\n ⌲  [𝖫𝗂𝗇𝗄 𝗍𝗈 𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽](${photo.src.original})`
          )
          .join("\n")}`;

        api.sendMessage({ attachment: streams, body: message }, threadID, event.messageID);
      }
    } else {
      api.sendMessage(`❎ | 𝖨 𝖺𝗉𝗈𝗅𝗈𝗀𝗂𝗓𝖾 𝖲𝖾𝗇𝗌𝖾𝗂 ${userName}, 𝖻𝗎𝗍 𝗇𝗈 𝗂𝗆𝖺𝗀𝖾𝗌 𝗐𝖾𝗋𝖾 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗀𝗂𝗏𝖾𝗇 𝗊𝗎𝖾𝗋𝗒. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇.`, threadID, event.messageID);
    }
  } catch (error) {
    console.error("Error fetching images from Pexels:", error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗂𝗆𝖺𝗀𝖾𝗌.", threadID, event.messageID);
  }
};