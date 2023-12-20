const fs = require('fs').promises;
const path = require('path');

module.exports.config = {
  name: "changemodules",
  version: "1.0.3",
  hasPermission: 2,
  credits: "Réynél",
  description: "Change module properties cmd please follow this in order to use this command or you'll get an error and need mo check yong replit file,  no double quotations proterties  [hasPermission, cooldowns, usePrefix] and the other's have double quotations.",
  commandCategory: "system",
  cooldowns: 0,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args.length < 3) {
      return api.sendMessage("ℹ️ | 𝗨𝘀𝗮𝗴𝗲: 𝖼𝗁𝖺𝗇𝗀𝖾𝗆𝗈𝖽𝗎𝗅𝖾𝗌 <𝖼𝗈𝗆𝗆𝖺𝗇𝖽_𝖿𝗂𝗅𝖾_𝗇𝖺𝗆𝖾> <𝗉𝗋𝗈𝗉𝖾𝗋𝗍𝗒> <𝗇𝖾𝗐_𝗏𝖺𝗅𝗎𝖾>", event.threadID);
    }

    const [commandName, property, ...newPropertyValue] = args;

    
    const commandPath = path.join(__dirname, '..', 'commands', `${commandName}.js`);

   
    const commandContent = await fs.readFile(commandPath, 'utf-8');

 
    const propertyPattern = new RegExp(`${property}:\\s*([\\s\\S]*?),`, 'i');
    const updatedContent = commandContent.replace(
      propertyPattern,
      `${property}: ${newPropertyValue.join(' ')},`
    );

    
    await fs.writeFile(commandPath, updatedContent, 'utf-8');

    api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 "${commandName}" ${property} 𝗎𝗉𝖽𝖺𝗍𝖾𝖽 𝗍𝗈 ${newPropertyValue.join(' ')}.`, event.threadID);
  } catch (error) {
    console.error('Error updating property:', error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗎𝗉𝖽𝖺𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝗉𝗋𝗈𝗉𝖾𝗋𝗍𝗒.", event.threadID);
  }
};