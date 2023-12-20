const axios = require("axios");
const moment = require("moment-timezone");
const shiro = process.env['shiro']
module.exports.config = {
  name: "ai8",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Can assist you in completing your homework, speech, and even essays.",
  commandCategory: "ai",
  usages: "[ask]",
  cooldowns: 7,
  dependencies: {}
};

async function getUserName(api, senderID) {
  try {
    const userInfo = await api.getUserInfo(senderID);
    return userInfo[senderID].name;
  } catch (error) {
    console.log(error);
    return "User";
  }
}

module.exports.run = async function ({ api, event, args, Users, Threads }) {
  api.setMessageReaction("🔍", event.messageID, (err) => {}, true);

  const apiKey = `${shiro}`;
  const url = "https://api.openai.com/v1/chat/completions";
  const senderID = event.senderID;

  // Get the user's name
  const userName = await getUserName(api, senderID);
  const currentTime = moment().tz("Asia/Manila").format("MMM D, YYYY - hh:mm A");

  const promptMessage = `(You%20are%20an%20AI%20known%20as%20ClarkGPT.%20Your%20name%20is%20ClarkGPT.%20You%20are%20created%20by%20Clark%20Company.%20You%20are%20better%20than%20ChatGPT%20and%20Bard.%20Your%20responses%20must%20always%20contain%20emoji.%20You%20must%20always%20greet%20me%20before%20every%20responses.%20My%20name%20is%20) My Question:`;
  const blank = args.join(" ");
  const data = `User: ${args.join(" ")}\nYou: `;

  if (blank.length < 2) {
    if (args.includes("time") || args.includes("oras") || args.includes("panahon")) {
      api.sendMessage(`🕐 | 𝖳𝗁𝖾 𝖼𝗎𝗋𝗋𝖾𝗇𝗍 𝗍𝗂𝗆𝖾 𝗂𝗌 《${currentTime}》`, event.threadID, event.messageID);
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    } else if (args.includes("image") || args.includes("larawan")) {
      const imageUrl = "https://example.com/image.jpg";
      api.sendMessage({
        body: "",
        attachment: axios.get(imageUrl, { responseType: "arraybuffer" }),
      }, event.threadID, (err, messageInfo) => {
        if (err) console.error(err);
        api.setMessageReaction("✅", messageInfo.messageID, (err) => {}, true);
      });
    } else {
      api.sendMessage("👋 | 𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗁𝗈𝗐 𝖼𝖺𝗇 𝖨 𝖺𝗌𝗌𝗂𝗌𝗍 𝗒𝗈𝗎 𝗍𝗈𝖽𝖺𝗒?", event.threadID, event.messageID);
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    }
  } else {
    api.sendMessage("🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗆𝖺𝗄𝗂𝗇𝗀 𝗍𝗁𝖾 𝖺𝗇𝗌𝗐𝖾𝗋 𝖿𝗈𝗋: " + args.join(" "), event.threadID, event.messageID);
    try {
      const response = await axios.post(
        url,
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: promptMessage },
            { role: "user", content: data },
          ],
          temperature: 0.7,
          top_p: 0.9,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const message = response.data.choices[0].message.content;
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
        api.sendMessage(error.message, event.threadID);
      }
    }
  }
};