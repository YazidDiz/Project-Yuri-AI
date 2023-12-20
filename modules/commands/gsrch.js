const axios = require('axios');

module.exports.config = {
  name: "gsrch",
  version: "1.0.0",
  credits: "Clark",
  description: "Perform a Google search and retrieve results.",
  commandCategory: "searches",
  usage: "[query]",
  cooldowns: 5,
  requiredArgs: 1,
};

module.exports.run = async ({ api, event, args }) => {
  const query = args.join(' ');

  if (!query) {
    api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗌𝖾𝖺𝗋𝖼𝗁 𝗊𝗎𝖾𝗋𝗒.", event.threadID, event.messageID);
    return;
  }

  try {
    const API_BASE_URL = 'http://google.august-api.repl.co/search';
    const response = await axios.get(`${API_BASE_URL}?q=${encodeURIComponent(query)}`);

   const { organic, knowledge, related, people_also_ask } = response.data;

    let message = `🔍 | 𝗦𝗲𝗮𝗿𝗰𝗵 𝗥𝗲𝘀𝘂𝗹𝘁𝘀 𝗳𝗼𝗿: ${query}\n━━━━━━━━━━━━━━━━━━━\n`;

    if (organic && organic.length > 0) {
      message += "\n𝗢𝗥𝗚𝗔𝗡𝗜𝗖 𝗥𝗘𝗦𝗨𝗟𝗧𝗦:\n";
      organic.forEach((result, index) => {
        message += `\n${index + 1}. [${result.title}](${result.link})\n${result.description}\n`;
      });
    }

    if (knowledge) {
      message += `\n𝗞𝗡𝗢𝗪𝗟𝗘𝗗𝗚𝗘:\n${knowledge.description}\n`;
    }

    if (related && related.length > 0) {
      message += "\n𝗥𝗘𝗟𝗔𝗧𝗘𝗗 𝗦𝗘𝗔𝗥𝗖𝗛𝗘𝗦:\n";
      related.forEach((relatedSearch) => {
        message += `[${relatedSearch.text}](${relatedSearch.link})\n`;
      });
    }
    
    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝖾𝗋𝖿𝗈𝗋𝗆𝗂𝗇𝗀 𝗍𝗁𝖾 𝖦𝗈𝗈𝗀𝗅𝖾 𝗌𝖾𝖺𝗋𝖼𝗁.", event.threadID, event.messageID);
  }
};