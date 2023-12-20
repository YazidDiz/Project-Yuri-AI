module.exports.config = {
    name: "help2",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Réynél",
    description: "beginners guide",
    usages: "[all/-a] [number of pages]",
    commandCategory: "guides",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
    const { commands } = global.client;
    const { threadID } = event;
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    
    const commandGroups = new Map();
    const imgP = [];
    
    for (const command of commands.values()) {
        const category = command.config.commandCategory.toUpperCase();
        if (!commandGroups.has(category)) {
            commandGroups.set(category, []);
        }
        commandGroups.get(category).push(`✪${command.config.name}`);
    }
    
    let message = "";
    for (const [category, commands] of commandGroups.entries()) {
        message += `╭────────────✦\n│  ${category}\n├───✦\n`;
        message += `${commands.join(" │")}\n`;
        message += "├───✦\n";
        message += "╰───────────⧕\n\n";
    }
    
    message += `╭────────────✦\n│ » 𝖸𝗎𝗋𝗂 𝖻𝗈𝗍 𝗁𝖺𝗌 《${commands.size}》 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌\n│ » 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗒𝗉𝖾 《${prefix}𝗁𝖾𝗅𝗉𝟤》\n𝗍𝗈 𝗏𝗂𝖾𝗐 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇𝗌\n╰────────────✦`;
    
    return api.sendMessage(message, threadID, (error, info) => {
        if (error) console.log(error);
    });
  }