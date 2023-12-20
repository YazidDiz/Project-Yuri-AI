module.exports.config = {
  name: "count",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Counts the number of words, paragraphs, and alphanumeric characters in a given input string.",
  commandCategory: "calculate",
  usages: "[input]",
  cooldowns: 5,
  dependencies: {}
};

module.exports.run = function ({ api, event, args }) {
  const inputStr = args.join(" ");
  const wordCount = inputStr.split(" ").length;
  const paragraphCount = (inputStr.match(/\n\n/g) || []).length + 1;
  const alphanumericCount = (inputStr.match(/[a-zA-Z0-9]/g) || []).length;

  api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾:\n\n𝗪𝗼𝗿𝗱: ${wordCount} 𝗐𝗈𝗋𝖽(𝗌)\n𝗣𝗮𝗿𝗮𝗴𝗿𝗮𝗽𝗵: ${paragraphCount} 𝗉𝖺𝗋𝖺𝗀𝗋𝖺𝗉𝗁(𝗌)\n𝗔𝗹𝗽𝗵𝗮𝗻𝘂𝗺𝗲𝗿𝗶𝗰 𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿: ${alphanumericCount} 𝖺𝗅𝗉𝗁𝖺𝗇𝗎𝗆𝖾𝗋𝗂𝖼 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋(𝗌) 𝗂𝗇 𝗒𝗈𝗎𝗋 𝗂𝗇𝗉𝗎𝗍.`, event.threadID);
};
