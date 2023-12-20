const fs = require("fs");
module.exports.config = {
  name: "dan",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Engage in conversation with Dan! Experience some similarities with Sim",
  commandCategory: "chatbots",
  usages: "[ask]",
  cooldowns: 2,
};

module.exports.run = function ({ api, event, args }) {
  const { messageID, threadID, senderID } = event;
  const content = args.join(" ");
  if (!args[0]) return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗒𝗉𝖾 𝖺 𝗆𝖾𝗌𝗌𝖺𝗀𝖾...", threadID, messageID);

  try {
    const jsonFile = fs.readFileSync(__dirname + "/cache/DAN/dan.json", "utf-8");
    const responses = JSON.parse(jsonFile);
    let respond = responses[content.toLowerCase()];

    if (content.startsWith("add = ")) {
      const switchCase = content.substring(6).toLowerCase();
      if (!global.config.ADMINBOT.includes(senderID)) {
        respond = "⚠️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖺𝗋𝖾 𝗇𝗈𝗍 𝖺𝗎𝗍𝗁𝗈𝗋𝗂𝗓𝖾𝖽 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝖾 𝖺𝖽𝖽 𝖿𝗎𝗇𝖼𝗍𝗂𝗈𝗇.";
      } else {
        if (switchCase === "on") {
          respond = "✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖺𝖽𝖽 𝖿𝗎𝗇𝖼𝗍𝗂𝗈𝗇 𝗂𝗌 𝗇𝗈𝗐 𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝖾𝖽.";
          if (typeof global.config.ADD_FUNCTION !== "undefined")
            global.config.ADD_FUNCTION = true;
          else
            console.log("Having some error on getting JSON");
        } else if (switchCase === "off") {
          respond = "✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖺𝖽𝖽 𝖿𝗎𝗇𝖼𝗍𝗂𝗈𝗇 𝗂𝗌 𝗇𝗈𝗐 𝖽𝖾𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝖾𝖽.";
          if (typeof global.config.ADD_FUNCTION !== "undefined")
            global.config.ADD_FUNCTION = false;
          else
            console.log("Having some error on getting JSON");
        }
      }
    } else if (content.startsWith("del = ")) {
      const switchCase = content.substring(6).toLowerCase();
      if (!global.config.ADMINBOT.includes(senderID)) {
        respond = "⚠️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖺𝗋𝖾 𝗇𝗈𝗍 𝖺𝗎𝗍𝗁𝗈𝗋𝗂𝗓𝖾𝖽 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝖾 𝖽𝖾𝗅𝖾𝗍𝖾 𝖿𝗎𝗇𝖼𝗍𝗂𝗈𝗇.";
      } else {
        if (switchCase === "on") {
          respond = "✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖽𝖾𝗅𝖾𝗍𝖾 𝖿𝗎𝗇𝖼𝗍𝗂𝗈𝗇 𝗂𝗌 𝗇𝗈𝗐 𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝖾𝖽. 𝖸𝗈𝗎 𝖼𝖺𝗇 𝗇𝗈𝗐 𝖽𝖾𝗅𝖾𝗍𝖾 𝗐𝗈𝗋𝖽𝗌 𝖺𝗇𝖽 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾𝗌.";
          if (typeof global.config.DEL_FUNCTION !== "undefined")
            global.config.DEL_FUNCTION = true;
          else
            console.log("Having some error on getting JSON");
        } else if (switchCase === "off") {
          respond = "✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖽𝖾𝗅𝖾𝗍𝖾 𝖿𝗎𝗇𝖼𝗍𝗂𝗈𝗇 𝗂𝗌 𝗇𝗈𝗐 𝖽𝖾𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝖾𝖽.";
          if (typeof global.config.DEL_FUNCTION !== "undefined")
            global.config.DEL_FUNCTION = false;
          else
            console.log("Having some error on getting JSON");
        }
      }
    } else if (content.includes("=!")) {
      const [word, response] = content.split("=!").map((item) => item.trim());
      const lowercaseWord = word.toLowerCase();
      if (!global.config.DEL_FUNCTION) {
        respond = "ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖽𝖾𝗅𝖾𝗍𝖾 𝖿𝗎𝗇𝖼𝗍𝗂𝗈𝗇 𝗂𝗌 𝖼𝗎𝗋𝗋𝖾𝗇𝗍𝗅𝗒 𝖽𝖾𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝖾𝖽.";
      } else {
        if (responses[lowercaseWord]) {
          if (response) {
            const index = responses[lowercaseWord].indexOf(response);
            if (index !== -1) {
              responses[lowercaseWord].splice(index, 1);
              if (responses[lowercaseWord].length === 0) {
                delete responses[lowercaseWord];
              }
              fs.writeFileSync(__dirname + "/cache/DAN/dan.json", JSON.stringify(responses, null, 4), "utf-8");
              respond = `✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝗍𝗁𝖾 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾 《${response}》 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 《${word}》`;
            } else {
              respond = `❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾 《${response}》 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍 𝗂𝗇 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 《${word}》`;
            }
          } else {
            delete responses[lowercaseWord];
            fs.writeFileSync(__dirname + "/cache/DAN/dan.json", JSON.stringify(responses, null, 4), "utf-8");
            respond = `✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝗍𝗁𝖾 𝖾𝗇𝗍𝗂𝗋𝖾 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾𝗌 𝗂𝗇𝗌𝗂𝖽𝖾 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 《${word}》`;
          }
        } else {
          respond = `ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 《${word}》 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍𝗌 𝗂𝗇 𝗍𝗁𝖾 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾𝗌.`;
        }
      }
    } else if (content.includes("=>")) {
      const [word, ...responseArray] = content.split("=>").map((item) => item.trim());

      const response = responseArray.join("=>").trim();
      if (!global.config.ADD_FUNCTION) {
        respond = "✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖺𝖽𝖽 𝖿𝗎𝗇𝖼𝗍𝗂𝗈𝗇 𝗂𝗌 𝗇𝗈𝗐 𝖽𝖾𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝖾𝖽.";
      } else {
        if (word && response) {
          const lowercaseWord = word.toLowerCase();
          if (responses[lowercaseWord]) {
            if (!responses[lowercaseWord].includes(response)) {
              responses[lowercaseWord].push(response);
            }
          } else {
            responses[lowercaseWord] = [response];
          }
          fs.writeFileSync(__dirname + "/cache/DAN/dan.json", JSON.stringify(responses, null, 4), "utf-8");
          respond = `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖺𝖽𝖽𝖾𝖽 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 《${word}》 𝖺𝗌 𝖺 𝗇𝖾𝗐 𝗐𝗈𝗋𝖽 𝗂𝗇 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾: "${response}"`;
        }
      }
    }

    if (Array.isArray(respond)) {
      const randomIndex = Math.floor(Math.random() * respond.length);
      respond = respond[randomIndex];
    } else if (!respond) {
      respond = "❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖨 𝖽𝗈𝗇'𝗍 𝗁𝖺𝗏𝖾 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾 𝖿𝗈𝗋 𝗍𝗁𝖺𝗍 𝗒𝖾𝗍.";
    }

    api.sendMessage(respond, threadID, (error, info) => {
      if (error) {
        console.error(error);
      }
    }, messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝗋𝖾𝗊𝗎𝖾𝗌𝗍.", threadID, messageID);
  }
};
