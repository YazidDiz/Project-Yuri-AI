module.exports.config = {
  name: "table",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Displays multiplication, addition, subtraction, or division tables for a range of numbers",
  commandCategory: "math",
  usages: "[operation] [start] - [end]",
  cooldowns: 5,
  dependencies: "",
};

module.exports.run = function ({ api, event, args }) {
  if (args.length !== 4 || !["multiplication", "addition", "subtraction", "division"].includes(args[0])) {
    return api.sendMessage("🎓 | 𝗨𝘀𝗮𝗴𝗲: 𝖳𝖺𝖻𝗅𝖾 [𝗈𝗉𝖾𝗋𝖺𝗍𝗂𝗈𝗇] [𝗌𝗍𝖺𝗋𝗍] - [𝖾𝗇𝖽]", event.threadID, event.messageID);
  }

  const operation = args[0].toLowerCase();
  const start = parseInt(args[1]);
  const end = parseInt(args[3]);
  
  if (isNaN(start) || isNaN(end)) {
    return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗌𝗍𝖺𝗋𝗍 𝖺𝗇𝖽 𝖾𝗇𝖽 𝗇𝗎𝗆𝖻𝖾𝗋𝗌.", event.threadID, event.messageID);
  }

  let table = "";

  switch (operation) {
    case "multiplication":
      for (let i = start; i <= end; i++) {
        for (let j = 1; j <= 10; j++) {
          table += `   ⌲ ${i} × ${j} = ${i * j}\n`;
        }
        table += "\n";
      }
      break;

    case "addition":
      for (let i = start; i <= end; i++) {
        for (let j = 1; j <= 10; j++) {
          table += `   ⌲ ${i} + ${j} = ${i + j}\n`;
        }
        table += "\n";
      }
      break;

    case "subtraction":
      for (let i = start; i <= end; i++) {
        for (let j = 1; j <= 10; j++) {
          table += `   ⌲ ${i} - ${j} = ${i - j}\n`;
        }
        table += "\n";
      }
      break;

    case "division":
      for (let i = start; i <= end; i++) {
        for (let j = 1; j <= 10; j++) {
          table += `   ⌲ ${i} ÷ ${j} = ${(i / j).toFixed(2)}\n`;
        }
        table += "\n";
      }
      break;
  }

  const message = `🧮 | 𝗧𝗔𝗕𝗟𝗘\n\n 𝗧𝗬𝗣𝗘: ${operation}\n❑ | 𝗙𝗿𝗼𝗺 ${start} - ${end}:\n\n${table}`;
  api.sendMessage(message, event.threadID, event.messageID);
};
                                