const axios = require("axios");
const fs = require("fs");
const gtts = require("gtts");

module.exports.config = {
  name: "bardv2",
  version: "1.1.1",
  hasPermission: 0,
  credits: "Réynél",
  description: "Bard ai version 2",
  commandCategory: "ai",
  usages: "[ask]",
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
        "❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝖼𝗈𝗇𝗏𝖾𝗋𝗍 𝗍𝗁𝖾 𝗉𝗁𝗈𝗍𝗈 𝗍𝗈 𝗍𝖾𝗑𝗍. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗐𝗂𝗍𝗁 𝖺 𝖼𝗅𝖾𝖺𝗋𝖾𝗋 𝗉𝗁𝗈𝗍𝗈.",
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
    const formattedAnswer = `📝 |  (𝗜𝗡𝗩𝗢𝗜𝗖𝗘) ${respond}`;

    const gttsPath = 'voice.mp3';
    const gttsInstance = new gtts(formattedAnswer, 'en');
    gttsInstance.save(gttsPath, function (error, result) {
      if (error) {
        console.error("Error saving gTTS:", error);
        api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝗏𝗈𝗂𝖼𝖾 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾.", threadID, messageID);
      } else {
        const textAnswer = `📝 |  (𝗔𝗜)\n\n📝: ${respond} `;
        const voiceAnswer = `𝗩𝗼𝗶𝗰𝗲 𝗮𝗻𝘀𝘄𝗲𝗿: ${respond}`;

        api.sendMessage(textAnswer, threadID, (error, messageInfo) => {
          if (!error) {
            api.sendMessage({
              body: voiceAnswer,
              attachment: fs.createReadStream(gttsPath)
            }, threadID);
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖽𝖺𝗍𝖺.", threadID, messageID);
  }
};

async function convertImageToText(imageURL) {
  const response = await axios.get(
    `https://bard-ai.arjhilbard.repl.co/api/other/img2text?input=${encodeURIComponent(imageURL)}`
  );
  return response.data.extractedText;
}
