const moment = require('moment');
const axios = require('axios');

module.exports.config = {
  name: "help10",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Get help about available commands.",
  commandCategory: "guides",
  usages: "[command]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const prefix = global.config.PREFIX;
  const owner = config.DESIGN.Admin;
  const botname = global.config.BOTNAME;
  let msg = `𝖢𝖮𝖬𝖬𝖠𝖭𝖣𝖲 𝖫𝖨𝖲𝖳 𝖮𝖥 ${botname} 𝖳𝖧𝖠𝖳 𝖸𝖮𝖴 𝖢𝖠𝖭 𝖴𝖲𝖤 \n❍──────────❍\n𝖡𝗈𝗍 𝖮𝗐𝗇𝖾𝗋: ${owner}\n𝖯𝗋𝖾𝖿𝗂𝗑: 《 ${prefix} 》\n❍──────────❍\n`;

  if (!args[0]) {
    const commandList = Array.from(commands.values());
    const itemsPerPage = 10;
    const totalPages = Math.ceil(commandList.length / itemsPerPage);

    let currentPage = 1;
    if (args[0]) {
      const parsedPage = parseInt(args[0]);
      if (!isNaN(parsedPage) && parsedPage >= 1 && parsedPage <= totalPages) {
        currentPage = parsedPage;
      } else {
        return api.sendMessage(
          `❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗉𝖺𝗀𝖾 𝗇𝗎𝗆𝖻𝖾𝗋. 𝖯𝗅𝖾𝖺𝗌𝖾 𝖼𝗁𝗈𝗈𝗌𝖾 𝖺 𝗉𝖺𝗀𝖾 𝖻𝖾𝗍𝗐𝖾𝖾𝗇 𝟣 𝖺𝗇𝖽 ${totalPages}`,
          threadID,
          messageID
        );
      }
    }

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const visibleCommands = commandList.slice(startIdx, endIdx);

    for (let i = 0; i < visibleCommands.length; i++) {
      const cmd = visibleCommands[i].config;
      msg += `「 ${i + 1} 」 ⟩ ${prefix}${cmd.name} ⟩ ${cmd.description}\n`;
    }

    msg += `❍──────────❍\n»𝖯𝖺𝗀𝖾 (${currentPage}/${totalPages})«\n𝖳𝗒𝗉𝖾: "${prefix}𝗁𝖾𝗅𝗉 <𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗇𝖺𝗆𝖾>" 𝖿𝗈𝗋 𝗆𝗈𝗋𝖾 𝖽𝖾𝗍𝖺𝗂𝗅𝗌 𝖺𝖻𝗈𝗎𝗍 𝗍𝗁𝖺𝗍 𝖼𝗈𝗆𝗆𝖺𝗇𝖽💞\n›𝖢𝗎𝗋𝗋𝖾𝗇𝗍𝗅𝗒 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 ${commandList.length} 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝗈𝗇 𝗍𝗁𝗂𝗌 𝖻𝗈𝗍‹\n📄 | 𝖴𝗌𝖾 ${prefix}𝗁𝖾𝗅𝗉 <𝖭𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝗉𝖺𝗀𝖾𝗌>`;

    ////////// Fetch random quote////////
    const quoteResponse = await axios.get('https://api.quotable.io/random');
    const quote = quoteResponse.data.content;
    const author = quoteResponse.data.author;
    msg += `\n❍──────────❍\n[𝗤𝗨𝗢𝗧𝗘💕 ]: ${quote} - ${author}`;

    // Fetch random Bible verse//
    const bibleVerseResponse = await axios.get('https://labs.bible.org/api/?passage=random&type=json');
    const bibleVerse = bibleVerseResponse.data[0].text;
    const bibleReference = bibleVerseResponse.data[0].bookname;
    msg += `\n❍──────────❍\n[𝗕𝗶𝗯𝗹𝗲𝗩𝗲𝗿𝘀𝗲 📖]: ${bibleVerse} - ${bibleReference}`;

    // DYK API
    const dykResponse = await axios.get('https://useless-facts.sameerkumar.website/api');
    const dyk = dykResponse.data.data;
    msg += `\n❍──────────❍\n[𝖣𝗈 𝗒𝗈𝗎 𝗄𝗇𝗈𝗐💁]: ${dyk}`;

    const header = `❍──────────❍`;
    const footer = `❍──────────❍`;

    const fullMsg = header + msg + footer;

    api.sendMessage(fullMsg, threadID, messageID);
  } else {
    // Handle specific command details if args[0] is provided //
    const commandName = args[0].toLowerCase();
    if (commands.has(commandName)) {
      const cmd = commands.get(commandName).config;
      msg = `ℹ️ | 𝗡𝗮𝗺𝗲: ${prefix}${cmd.name}\n📄 | 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${cmd.description}\n🎓 | 𝗨𝘀𝗮𝗴𝗲: ${prefix}${cmd.name} ${cmd.usages}\n🎭 | 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: ${cmd.commandCategory}\n⏳ | 𝗖𝗼𝗼𝗹𝗱𝗼𝘄𝗻: ${cmd.cooldowns} 𝗌𝖾𝖼𝗈𝗇𝖽𝗌(𝗌)\n👑 | 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: ${
        cmd.hasPermission === 0
          ? "𝖴𝗌𝖾𝗋"
          : cmd.hasPermission === 1
          ? "𝖠𝖽𝗆𝗂𝗇 𝗀𝗋𝗈𝗎𝗉"
          : "𝖠𝖽𝗆𝗂𝗇 𝖻𝗈𝗍"
      }\n👑 | 𝗖𝗿𝗲𝗱𝗶𝘁𝘀: ${cmd.credits}`;
      api.sendMessage(msg, threadID, messageID);
    } else {
      api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗇𝖺𝗆𝖾. 𝖳𝗒𝗉𝖾 "${prefix}𝗁𝖾𝗅𝗉𝟣𝟢" 𝗍𝗈 𝗌𝖾𝖾 𝗍𝗁𝖾 𝗅𝗂𝗌𝗍 𝗈𝖿 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌.`, threadID, messageID);
    }
  }
};