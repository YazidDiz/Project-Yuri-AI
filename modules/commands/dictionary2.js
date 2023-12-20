const axios = require('axios');

module.exports.config = {
  name: "dictionary2",
  version: "1.4",
  permission: 0,
  credits: "Réynél",
  description: "( 𝘿𝙞𝙘𝙩𝙞𝙤𝙣𝙖𝙧𝙮 )",
  commandCategory: "noprefix",
  usage: "( Dictionary with Images )",
  cooldown: 3,
};

module.exports.handleEvent = async function ({ api, event }) {
  try {
    if (!(event.body.indexOf("dictionary2") === 0 || event.body.indexOf("Dictionary2") === 0)) return;
    const args = event.body.split(/\s+/);
    args.shift();

    const word = args.join(" ");

    try {
      const response = await axios.get("https://hazeyy-apis-combine.kyrinwu.repl.co");
      if (Object.prototype.hasOwnProperty.call(response.data, "error")) {
        return api.sendMessage(response.data.error, event.threadID, event.messageID);
      }
    } catch (error) {
      console.error("🔴 | 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍:", error);
      api.sendMessage("🔴 | 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍." + error.data, event.threadID);
      return;
    }

    if (!word) {
      return api.sendMessage("🖋️ | 𝚂𝚎𝚗𝚜𝚎𝚒, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚚𝚞𝚎𝚛𝚢 𝚝𝚘 𝚜𝚎𝚊𝚛𝚌𝚑 𝚘𝚗 𝚍𝚒𝚌𝚝𝚒𝚘𝚗𝚊𝚛𝚢.\n\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎: 𝚍𝚒𝚌𝚝 [ 𝚌𝚊𝚝 ]", event.threadID);
    }

    api.sendMessage("🔍 | 𝚂𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐 𝚏𝚘𝚛 𝚍𝚎𝚏𝚒𝚗𝚒𝚝𝚒𝚘𝚗...", event.threadID);

    const response = await axios.get(`https://hazeyy-apis-combine.kyrinwu.repl.co/api/try/dictionary?word=${word}`);
    console.log('📖 | 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎:', response.data);

    const { phonetic, definition, example, image } = response.data;

    setTimeout(() => {
      api.sendMessage({
        body: `𝚆𝚘𝚛𝚍: ${word}\n𝙿𝚑𝚘𝚗𝚎𝚝𝚒𝚌: ${phonetic}\n𝙳𝚎𝚏𝚒𝚗𝚒𝚝𝚒𝚘𝚗: ${definition}\n𝙸𝚖𝚊𝚐𝚎: ${image}`,
        threadID: event.threadID,
      });

      api.sendMessage(`🎓 | 𝗗𝗶𝗰𝘁𝗶𝗼𝗻𝗮𝗿𝘆\n\n𝚆𝚘𝚛𝚍: '${word}'\n\n𝙿𝚑𝚘𝚗𝚎𝚝𝚒𝚌: '${phonetic}'\n\n𝙳𝚎𝚏𝚒𝚗𝚒𝚝𝚒𝚘𝚗: '${definition}'\n\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎: '${example}'\n\n𝙸𝚖𝚊𝚐𝚎: '${image}'`, event.threadID);
    }, 6000); 
  } catch (error) {
    console.error('🔴 𝙴𝚛𝚛𝚘𝚛:', error.message);

    if (error.response && error.response.status === 404) {
      api.sendMessage({
        body: '🔴 | 𝚂𝚎𝚗𝚜𝚎𝚒, 𝙽𝚘 𝚍𝚎𝚏𝚒𝚗𝚒𝚝𝚒𝚘𝚗 𝚏𝚘𝚞𝚗𝚍 𝚏𝚘𝚛 𝚝𝚑𝚎 𝚠𝚘𝚛𝚍. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚌𝚑𝚎𝚌𝚔 𝚝𝚑𝚎 𝚜𝚙𝚎𝚕𝚕𝚒𝚗𝚐 𝚊𝚗𝚍 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗.',
        threadID: event.threadID,
      });
    } else {
      api.sendMessage({
        body: '🔴 | 𝚂𝚎𝚗𝚜𝚎𝚒, 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚝𝚑𝚎 𝚍𝚒𝚌𝚝𝚒𝚘𝚗𝚊𝚛𝚢 𝚍𝚊𝚝𝚊. 𝚙𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗.',
        threadID: event.threadID,
      });
    }
  }
};

module.exports.run = async function ({ api, event }) {};