const axios = require('axios');

module.exports.config = {
  name: "codex",
  version: "1.0.0",
  credits: "Réynél",
  description: "Generate code using Google.",
  commandCategory: "ai",
  usage: "[instruction]",
  cooldowns: 5,
  requiredArgs: 1,
};

module.exports.run = async ({ api, event, args }) => {
  const instruction = args.join(' ');

  if (!instruction) {
    api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗂𝗇𝗌𝗍𝗋𝗎𝖼𝗍𝗂𝗈𝗇𝗌 𝗍𝗈 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝖾 𝖼𝗈𝖽𝖾.", event.threadID, event.messageID);
    return;
  }

  try {
    const response = await axios.post('http://codex.august-quinn-api.repl.co/code-generation', { instruction });
    const result = response.data;

    if (result.google && result.google.status === "success") {
      api.sendMessage(`⚙️ | 𝗖𝗢𝗗𝗘𝗫'𝗦 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘:\n\n\`\`\`${result.google.generated_text}\`\`\``, event.threadID, event.messageID);
    } else {
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝖼𝗈𝖽𝖾.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝖼𝗈𝖽𝖾.", event.threadID, event.messageID);
  }
};