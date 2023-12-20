const axios = require('axios');

module.exports.config = {
  name: "npm",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Réynél",
  description: "Get NPM package information.",
  commandCategory: "admin",
  usage: "[package-name]",
  cooldowns: 5,
  requiredArgs: 1,
};

module.exports.run = async ({ api, event, args }) => {
  const packageName = args[0];

  try {
    const response = await axios.get(`http://npm.august-quinn-api.repl.co/${packageName}`);
    const packageInfo = response.data;

    if (packageInfo.error) {
      api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝖺𝗍: ${packageInfo.error}`, event.threadID, event.messageID);
    } else {
      let message = `📦 | 𝗡𝗣𝗠 𝗣𝗮𝗰𝗸𝗮𝗴𝗲: ${packageInfo.name}\n`;

      if ('version' in packageInfo) {
        message += `𝗩𝗲𝗿𝘀𝗶𝗼𝗻: ${packageInfo.version}\n`;
        message += `𝗟𝗮𝘀𝘁 𝗠𝗼𝗱𝗶𝗳𝗶𝗲𝗱: ${packageInfo.modified || 'N/A'}\n`;
        message += `𝗗𝗲𝗽𝗲𝗻𝗱𝗲𝗻𝗰𝗶𝗲𝘀: ${packageInfo.dependencies ? Object.keys(packageInfo.dependencies).join(', ') : 'N/A'}\n`;
        message += `𝗢𝗽𝘁𝗶𝗼𝗻𝗮𝗹 𝗗𝗲𝗽𝗲𝗻𝗱𝗲𝗻𝗰𝗶𝗲𝘀: ${packageInfo.optionalDependencies ? Object.keys(packageInfo.optionalDependencies).join(', ') : 'N/A'}\n`;
      } else {
          message += `𝗟𝗮𝘁𝗲𝘀𝘁 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: ${packageInfo['dist-tags'].latest}\n`;
          message += `𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${packageInfo.description || 'N/A'}\n`;
          message += `𝗟𝗶𝗰𝗲𝗻𝘀𝗲: ${packageInfo.license || 'N/A'}\n`;
          message += `𝗔𝘂𝘁𝗵𝗼𝗿: ${packageInfo.author ? packageInfo.author.name || 'N/A' : 'N/A'}\n`;
          message += `𝗛𝗼𝗺𝗲𝗽𝗮𝗴𝗲: ${packageInfo.homepage || 'N/A'}\n`;
          message += `𝗞𝗲𝘆𝘄𝗼𝗿𝗱𝘀: ${packageInfo.keywords ? packageInfo.keywords.join(', ') : 'N/A'}\n`;
          message += `𝗠𝗮𝗶𝗻𝘁𝗮𝗶𝗻𝗲𝗿𝘀: ${packageInfo.maintainers ? packageInfo.maintainers.map(m => m.name).join(', ') : 'N/A'}\n`;     
          message += `𝗥𝗲𝗮𝗱𝗺𝗲𝗙𝗶𝗹𝗲𝗻𝗮𝗺𝗲: ${packageInfo.readmeFilename || 'N/A'}\n`;
          message += `𝗥𝗲𝗽𝗼𝘀𝗶𝘁𝗼𝗿𝘆: ${packageInfo.repository ? packageInfo.repository.url || 'N/A' : 'N/A'}\n`;
          message += `𝗕𝘂𝗴𝘀: ${packageInfo.bugs ? packageInfo.bugs.url || 'N/A' : 'N/A'}\n`;
      }

      api.sendMessage(message, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖭𝖯𝖬 𝗉𝖺𝖼𝗄𝖺𝗀𝖾 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.", event.threadID, event.messageID);
  }
};