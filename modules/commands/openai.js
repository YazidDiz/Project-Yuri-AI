const axios = require("axios");
const moment = require("moment-timezone");
const shiro = process.env['shiro']
module.exports.config = {
  name: "openai",
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
  api.setMessageReaction("⏳", event.messageID, (err) => {}, true);

  const apiKey = `${shiro}`;
  const url = "https://api.openai.com/v1/chat/completions";
  const senderID = event.senderID;

  // Get the user's name
  const userName = await getUserName(api, senderID);
  const currentTime = moment().tz("Asia/Manila").format("MMM D, YYYY - hh:mm A");

  const promptMessage = `System: act as a messenger chatbot. As a chatbot you will be responsible. You will answer politely and you will give all of the information you gathered about the question given to you. You will always help the asker to answer every questions or tasks. You love to answer questions of the asker. You always do your best to help the asker in the questions. You will make essays or any tasks that are not plagiarized to someone. You give credits of the sites and to those person or author of the answer you will give to the asker. You make your own answer that are not plagiarized for the question of the asker. You will do your best to help the asker even if the question is complicated. My Question:`;
  const blank = args.join(" ");
  const data = `User: ${args.join(" ")}\nYou: `;

  if (blank.length < 2) {
    if (args.includes("time") || args.includes("oras") || args.includes("panahon")) {
      api.sendMessage(`🕐 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝖼𝗎𝗋𝗋𝖾𝗇𝗍 𝗍𝗂𝗆𝖾 𝗂𝗌 《${currentTime}》`, event.threadID, event.messageID);
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
      api.sendMessage("👋 | 𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗁𝗈𝗐 𝗆𝖺𝗒 𝖨 𝖺𝗌𝗌𝗂𝗌𝗍 𝗒𝗈𝗎 𝗍𝗈𝖽𝖺𝗒?", event.threadID, event.messageID);
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    }
  } else {
    api.sendMessage("🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝖼𝗋𝖾𝖺𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝖺𝗇𝗌𝗐𝖾𝗋 𝖿𝗈𝗋: " + args.join(" "), event.threadID, event.messageID);
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
      api.setMessageReaction("❎", event.messageID, (err) => {}, true);
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