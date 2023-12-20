module.exports.config = {
  name: "chek",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Check input is a vowel, consonant, or number",
  commandCategory: "education",
  usages: "[Character]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, body } = event;
  const input = body.slice(body.indexOf(' ') + 1).trim().toLowerCase(); // Assuming command is called like "!chek a" or "!chek 5"

  if (!input) {
    api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋(𝗅𝖾𝗍𝗍𝖾𝗋).", threadID, messageID);
    return;
  }

  if (input.length === 1) {
    if (input >= '0' && input <= '9') {
      api.sendMessage("🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍'𝗌 𝖺 𝗇𝗎𝗆𝖻𝖾𝗋.", threadID, messageID);
    } else if ("aeiou".includes(input)) {
      api.sendMessage("🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍'𝗌 𝖺 𝗏𝗈𝗐𝖾𝗅.", threadID, messageID);
    } else if (input >= 'a' && input <= 'z') {
      api.sendMessage("🔍 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍'𝗌 𝖺 𝖼𝗈𝗇𝗌𝗈𝗇𝖺𝗇𝗍.", threadID, messageID);
    } else {
      api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗂𝗇𝗉𝗎𝗍. 𝖯𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝖺 𝗌𝗂𝗇𝗀𝗅𝖾 𝗅𝖾𝗍𝗍𝖾𝗋 𝗈𝗋 𝗇𝗎𝗆𝖻𝖾𝗋.", threadID, messageID);
    }
  } else {
    api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗂𝗇𝗉𝗎𝗍. 𝖯𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝗈𝗇𝗅𝗒 𝗈𝗇𝖾 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋(𝗅𝖾𝗍𝗍𝖾𝗋).", threadID, messageID);
  }
};