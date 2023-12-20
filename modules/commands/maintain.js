const fs = require("fs");

module.exports.config = {
  name: "maintinance",
  version: "1.0.0",
  hasPermission: 2,
  credits: "Clark",
  description: "Toggle maintenance mode",
  commandCategory: "admin",
  usage: "[on/off]",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body } = event;
  const command = body.toLowerCase().split(" ")[0];

  if (command === ">maintain") {
    const status = body.toLowerCase().split(" ")[1];

    if (status === "on" || status === "off") {
      setMaintenance(status === "on", api, threadID, messageID);
    }
  }
};

function setMaintenance(value, api, threadID, messageID) {
  const path = "./config.json";

  try {
    const configData = JSON.parse(fs.readFileSync(path, "utf8"));
    configData.adminOnly = value;
    fs.writeFileSync(path, JSON.stringify(configData, null, 2));

    const responseMessage = `🚧 | 𝗠𝗔𝗜𝗡𝗧𝗔𝗜𝗡𝗔𝗡𝗖𝗘 | 🚧\n━━━━━━━━━━━━━━━━━━━\n𝖨𝖲 ${
      value ? "TRUE" : "FALSE"
    } 𝖮𝖭𝖫𝖸 𝖸𝖮𝖴 𝖢𝖠𝖭 𝖴𝖲𝖤 𝖳𝖧𝖤 𝖡𝖮𝖳 𝖬𝖠𝖲𝖳𝖤𝖱\n━━━━━━━━━━━━━━━━━━━`;

    api.sendMessage(responseMessage, threadID, messageID);

    restartBot(api, threadID);
  } catch (error) {
    console.error("Error updating maintenance mode:", error);
    api.sendMessage("❎ | 𝖤𝗋𝗋𝗈𝗋 𝗎𝗉𝖽𝖺𝗍𝗂𝗇𝗀 𝗆𝖺𝗂𝗇𝗍𝖾𝗇𝖺𝗇𝖼𝖾 𝗆𝗈𝖽𝖾.", threadID, messageID);
  }
}

function restartBot(api, threadID) {
  api.sendMessage(`🔄 | 𝖱𝖾𝗌𝗍𝖺𝗋𝗍𝗂𝗇𝗀 𝗆𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...`, threadID, () => process.exit(1));
}

module.exports.run = async function ({ api, event }) {};