const axios = require("axios");
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "pixel",
  credits: "Réynél", 
  usages: "pixel <query>",
  description: "Search for an image on PixelBay",
  cooldowns: 3,
  commandCategory: "searches",
  version: "1.0.1",
  hasPermission: 0,
};

module.exports.run = async function ({ api, event, args }) {
    const query = args.join(" ");

    async function performImageSearch() {
        try {
            const response = await axios.get(`https://api.easy0.repl.co/v1/pixel?q=${query}&api=ISOYXD`);
            const imgResults = response.data.result;

            if (imgResults.length === 0) {
                api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗂𝗆𝖺𝗀𝖾 𝗋𝖾𝗌𝗎𝗅𝗍𝗌 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 "${query}"`, event.threadID, event.messageID);
                return;
            }

            const randomImages = getRandomElements(imgResults, Math.min(10, imgResults.length));
            const attachments = [];

            for (let i = 0; i < randomImages.length; i++) {
                const { largeImageURL } = randomImages[i];

                try {
                    const imageResponse = await axios.get(largeImageURL, { responseType: "arraybuffer" });

                    // Generate a unique filename for each image
                    const imagePath = path.join(__dirname, 'cache', `pixel_${i}.png`);
                    fs.writeFileSync(imagePath, imageResponse.data);
                    attachments.push(fs.createReadStream(imagePath));
                } catch (error) {
                    console.error(error);
                    api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗂𝗆𝖺𝗀𝖾: ${error.message}`, event.threadID, event.messageID);
                }
            }

            api.sendMessage({
                body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 𝟣𝟢 𝗋𝖺𝗇𝖽𝗈𝗆 𝗂𝗆𝖺𝗀𝖾 𝗋𝖾𝗌𝗎𝗅𝗍𝗌 (𝗈𝗎𝗍 𝗈𝖿 ${imgResults.length}):`,
                attachment: attachments,
            }, event.threadID, event.messageID);

        } catch (error) {
            console.error(error);
            api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝖽𝗎𝗋𝗂𝗇𝗀 𝗂𝗆𝖺𝗀𝖾 𝗌𝖾𝖺𝗋𝖼𝗁', event.threadID, event.messageID);
        }
    }

    if (!query) {
        return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗊𝗎𝖾𝗋𝗒...", event.threadID, event.messageID);
    }

    api.sendMessage("🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖨𝗆𝖺𝗀𝖾, 𝖯𝗅𝖾𝖺𝗌𝖾 𝖶𝖺𝗂𝗍...", event.threadID, event.messageID);
    performImageSearch();
};

function getRandomElements(array, count) {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, count);
}