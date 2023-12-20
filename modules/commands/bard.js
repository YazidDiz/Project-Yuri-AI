const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "bard",
  version: "1.0.2",
  hasPermission: 0,
  credits: "Réynél",
  description: "Bard ai",
  commandCategory: "ai",
  usages: "[ask/query]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, type, messageReply, body } = event;

  let question = "";

  if (type === "message_reply" && messageReply.attachments[0]?.type === "photo") {
    const attachment = messageReply.attachments[0];
    const imageURL = attachment.url;
    question = await convertImageToText(imageURL);

    if (!question) {
      api.sendMessage(
        "❎ | 𝖦𝗈𝗆𝖾𝗇 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝖼𝗈𝗇𝗏𝖾𝗋𝗍 𝗍𝗁𝖾 𝗉𝗁𝗈𝗍𝗈 𝗍𝗈 𝗍𝖾𝗑𝗍. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗐𝗂𝗍𝗁 𝖺 𝖼𝗅𝖾𝖺𝗋𝖾𝗋 𝗉𝗁𝗈𝗍𝗈.",
        threadID,
        messageID
      );
      return;
    }
  } else {
    question = body.slice(5).trim();

    if (!question) {
      api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇 𝗈𝗋 𝗊𝗎𝖾𝗋𝗒", threadID, messageID);
      return;
    }
  }

  api.sendMessage("🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖿𝗈𝗋 𝖺𝗇 𝖺𝗇𝗌𝗐𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", threadID, messageID);

  try {
    const res = await axios.get(
      `https://bard-ai.arjhilbard.repl.co/bard?ask=${encodeURIComponent(question)}`
    );

    const respond = res.data.message;
    const imageUrls = res.data.imageUrls;

    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      const attachments = [];

      if (!fs.existsSync("cache")) {
        fs.mkdirSync("cache");
      }

      for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const imagePath = `cache/image${i + 1}.png`;

        try {
          const imageResponse = await axios.get(url, { responseType: "arraybuffer" });
          fs.writeFileSync(imagePath, imageResponse.data);

          attachments.push(fs.createReadStream(imagePath));
        } catch (error) {
          console.error("Error occurred while downloading and saving the image:", error);
        }
      }

      api.sendMessage(
        {
          attachment: attachments,
          body: respond,
        },
        threadID,
        messageID
      );
    } else {
      api.sendMessage(respond, threadID, messageID);
    }
  } catch (error) {
    console.error("Error occurred while fetching data from the Bard API:", error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖽𝖺𝗍𝖺. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", threadID, messageID);
  }
};

async function convertImageToText(imageURL) {
  const response = await axios.get(
    `https://bard-ai.arjhilbard.repl.co/api/other/img2text?input=${encodeURIComponent(imageURL)}`
  );
  return response.data.extractedText;
  }