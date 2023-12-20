const axios = require("axios");
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const moment = require("moment-timezone");
const { PasteClient } = require("pastebin-api");
const { join, resolve } = require("path");

const axiosClient = axios.create();
axiosClient.defaults.timeout = 10000;

module.exports.config = {
  name: "sharecmd",
  version: "1.0.0",
  hasPermission: 2,
  credits: "Réynél",
  description: "Share a certain module with a member in the group",
  commandCategory: "admin",
  usages: "[reply or tag or leave blank] + name of the module to share",
  cooldowns: 0,
  dependencies: {
    "pastebin-api": "",
    cheerio: "",
    request: ""
  }
};

module.exports.run = async function ({ api, event, args }) {
  const permission = ["100080098527733"];
  if (!permission.includes(event.senderID)) {
    return api.sendMessage(
      "⚠️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝗁𝖺𝗏𝖾 𝗉𝖾𝗋𝗆𝗂𝗌𝗌𝗂𝗈𝗇𝗌 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.",
      event.threadID,
      event.messageID
    );
  }

  const picture = (
    await axios.get(
      "https://drive.google.com/uc?export=download&id=1rKtZI_KT-vT_DvDRDhhdtZ-nCEGWbx2U",
      { responseType: "stream" }
    )
  ).data;

  const hmm = moment.tz("Asia/Manila").format("DD/MM/YYYY || HH:mm:ss");
  const { senderID, threadID, messageID, messageReply, type } = event;
  var name = args[0];

  var uid, text;

  if (type == "message_reply") {
    text = messageReply.body;
    uid = event.messageReply.senderID;
  } else {
    uid = event.senderID;
  }

  if (!text && !name) {
    return api.sendMessage(
      { body: `⪩ 𝗖𝗨𝗥𝗥𝗘𝗡𝗧 𝗧𝗜𝗠𝗘: ${hmm}\n\n⪩ 𝗡𝗢𝗧𝗘: 𝖲𝖾𝗇𝗌𝖾𝗃, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗆𝖾𝗇𝗍𝗂𝗈𝗇 𝗍𝗁𝖾 𝗋𝖾𝖼𝗂𝗉𝗂𝖾𝗆𝗍 𝗈𝗋 𝗅𝖾𝖺𝗏𝖾 𝖺 𝗇𝗈𝗍𝖾 𝗂𝖿 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗌𝖾𝗇𝖽 𝖺 𝗌𝗉𝖾𝖼𝗂𝖿𝗂𝖼 𝖿𝗂𝗅𝖾𝗌.`, attachment: picture },
      threadID,
      messageID
    );
  }

  var data = fs.readFile(
    `./modules/commands/${args[0]}.js`,
    "utf-8",
    async (err, data) => {
      if (err) {
        return api.sendMessage(
          { body: `⪩ 𝗖𝗨𝗥𝗥𝗘𝗡𝗧 𝗧𝗜𝗠𝗘: ${hmm}\n\n❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗍𝗁𝖾 𝖿𝗂𝗅𝖾 《${args[0]}》 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍 𝗈𝗋 𝗍𝗁𝖾𝗋𝖾 𝗐𝖺𝗌 𝖺𝗇 𝗂𝗌𝗌𝗎𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗂𝗍.`, attachment: picture },
          threadID,
          messageID
        );
      }

      const client = new PasteClient("R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb");

      async function createPaste(name) {
        const url = await client.createPaste({
          code: data,
          expireDate: "N",
          format: "javascript",
          name: name,
          publicity: 1
        });

        var id = url.split("/")[3];
        return "https://pastebin.com/raw/" + id;
      }

      var link = await createPaste(args[1] || "noname");

      const threadInfo = await api.getThreadInfo(event.threadID);
      const groupName = threadInfo.name;
      const senderName = global.data.userName.get(event.senderID);

      api.sendMessage(
        `⪩ 𝗙𝗜𝗟𝗘 𝗦𝗛𝗔𝗥𝗜𝗡𝗚\n\n⪩ 𝗚𝗥𝗢𝗨𝗣 𝗡𝗔𝗠𝗘: ${groupName}\n⪩ 𝗖𝗨𝗥𝗥𝗘𝗡𝗧 𝗧𝗜𝗠𝗘: ${hmm}\n⪩ 𝗙𝗜𝗟𝗘 𝗡𝗔𝗠𝗘: ${args.join(
          " "
        )}\n⪩ 𝗦𝗘𝗡𝗧 𝗕𝗬: ${senderName} 𝗍𝗈 𝗌𝗁𝖺𝗋𝖾 𝖿𝗂𝗅𝖾.`,
        threadID,
        messageID
      );

      api.sendMessage(
        {
          body: `⪩ 𝗙𝗜𝗟𝗘 𝗦𝗛𝗔𝗥𝗜𝗡𝗚\n\n⪩ 𝗖𝗨𝗥𝗥𝗘𝗡𝗧 𝗧𝗜𝗠𝗘: ${hmm}\n⪩ 𝗙𝗜𝗟𝗘 𝗟𝗜𝗡𝗞: ${link}\n⪩ 𝗙𝗜𝗟𝗘 𝗡𝗔𝗠𝗘: ${args[0]}\n⪩ 𝗚𝗥𝗢𝗨𝗣 𝗡𝗔𝗠𝗘: ${groupName}\n⪩ 𝗦𝗛𝗔𝗥𝗘𝗗 𝗕𝗬: ${senderName}`,
          attachment: picture
        },
        uid
      );
    }
  );
};
