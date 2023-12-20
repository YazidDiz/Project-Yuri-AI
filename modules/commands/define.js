const axios = require("axios");
const { resolve } = require("path");
const { createReadStream, unlinkSync } = require("fs");
const { downloadFile } = global.utils;

module.exports.config = {
  name: "define",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Clark",
  description: "Defines a word using an online dictionary.",
  commandCategory: "education",
  cooldowns: 5,
  usages: "[word]",
};

module.exports.run = async function ({ api, event, args }) {
  const word = args.join(" ");
  if (!word) {
    api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗐𝗈𝗋𝖽 𝗍𝗈 𝖽𝖾𝖿𝗂𝗇𝖾.", event.threadID);
    return;
  }

  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const definition = response.data[0]?.meanings[0]?.definitions[0]?.definition;
    if (definition) {
      api.sendMessage(`📖 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝖽𝖾𝖿𝗂𝗇𝗂𝗍𝗂𝗈𝗇 𝗈𝖿 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 《${word}》 𝗂𝗌 《${definition}》`, event.threadID);
    } else {
      api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝖽𝖾𝖿𝗂𝗇𝗂𝗍𝗂𝗈𝗇 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 《${word}》`, event.threadID);
    }
    
    const content = `📖 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝖽𝖾𝖿𝗂𝗇𝗂𝗍𝗂𝗈𝗇 𝗈𝖿 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 《${word}》 𝗂𝗌 《${definition}》`;
    const languageToSay = "tl";
    const pathFemale = resolve(__dirname, "cache", `${event.threadID}_female.mp3`);

    downloadFile(
      `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
        content
      )}&tl=${languageToSay}&client=tw-ob&idx=1`,
      pathFemale
    ).then(() => {
      api.sendMessage(
        { attachment: createReadStream(pathFemale) },
        event.threadID,
        () => unlinkSync(pathFemale)
      );
    }).catch(error => {
      console.error("Error sending a message:", error);
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝖽𝖾𝖿𝗂𝗇𝗂𝗍𝗂𝗈𝗇 𝗈𝖿 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽.", event.threadID, event.messageID);
    });
  } catch (error) {
    console.error("Error fetching definition:", error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝖽𝖾𝖿𝗂𝗇𝗂𝗍𝗂𝗈𝗇 𝗈𝖿 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽.", event.threadID);
  }
};