module.exports.config = {
  name: "antiout",
  version: "1.0.0",
  credits: "Réynél",
  hasPermssion: 1,
  description: "prevent members to leave in the group",
  usages: "[on/off]",
  commandCategory: "group",
  cooldowns: 0
};

module.exports.run = async({ api, event, Threads}) => {
    let data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["antiout"] == "undefined" || data["antiout"] == false) data["antiout"] = true;
    else data["antiout"] = false;
    
    await Threads.setData(event.threadID, { data });
    global.data.threadData.set(parseInt(event.threadID), data);
    
    return api.sendMessage(`✅ | 𝖣𝗈𝗇𝖾 𝗆𝖺𝗌𝗍𝖾𝗋, ${(data["antiout"] == true) ? "𝗍𝗎𝗋𝗇 𝗈𝗇" : "𝖳𝗎𝗋𝗇 𝗈𝖿𝖿"} 𝖺𝗇𝗍𝗂𝗈𝗎𝗍 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒`, event.threadID);

}