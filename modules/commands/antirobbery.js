module.exports.config = {
 name: "antirobbery",
 version: "1.0.0",
 credits: "Réynél",
 hasPermssion: 1,
 description: "Prevent changing group administrators",
 usages: "[on/off]",
 commandCategory: "group",
 cooldowns: 0
};

module.exports.run = async({ api, event, Threads}) => {
    const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
      return api.sendMessage('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨 𝗇𝖾𝖾𝖽 𝗀𝗋𝗈𝗎𝗉 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝗍𝗈𝗋 𝗉𝖾𝗋𝗆𝗂𝗌𝗌𝗂𝗈𝗇𝗌, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖺𝖽𝖽 𝗆𝖾 𝖺𝗌 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝗍𝗈𝗋 𝗂𝗇 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉 𝖺𝗇𝖽 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["guard"] == "guard" || data["guard"] == false) data["guard"] = true;
    else data["guard"] = false;
    await Threads.setData(event.threadID, { data });
      global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, ${(data["guard"] == true) ? "𝗍𝗎𝗋𝗇 𝗈𝗇" : "𝖳𝗎𝗋𝗇 𝗈𝖿𝖿"} 𝖺𝗇𝗍𝗂𝗋𝗈𝖻𝖻𝖾𝗋𝗒 𝗂𝗇 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒`, event.threadID, event.messageID);
}