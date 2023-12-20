module.exports.config = {
  name: "setdatauser",
  version: "1.0",
  hasPermssion: 2,
  credits: "Réynél",
  description: "Set new data of users into data",
  commandCategory: "admin",
  usages: "[mention] [data]",
  cooldowns: 5,
};


module.exports.run = async function ({ Users, event, args, api, Threads }) { 
    const permission = ["100080098527733"];
  if (!permission.includes(event.senderID)) return api.sendMessage("⚠️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝗁𝖺𝗏𝖾 𝖺 𝗉𝖾𝗋𝗆𝗂𝗌𝗌𝗂𝗈𝗇 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽", event.threadID, event.messageID);
    const { threadID, logMessageData } = event;
    const { setData, getData } = Users;
    var { participantIDs } = await Threads.getInfo(threadID) || await api.getThreadInfo(threadID);
    for (const id of participantIDs) {
    console.log(`data has been updated ID: ${id}`)
    let data = await api.getUserInfo(id);
    data.name
    let userName = data[id].name
    await Users.setData(id, { name: userName, data: {} });
}
    console.log(`Updated data of ${participantIDs.length} user in group`)
    return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗎𝗉𝖽𝖺𝗍𝖾𝖽 𝗍𝗁𝖾 𝖽𝖺𝗍𝖺 𝗈𝖿 𝗍𝗁𝖾 𝗆𝖾𝗆𝖻𝖾𝗋𝗌 𝗂𝗇 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉.`, threadID)
}