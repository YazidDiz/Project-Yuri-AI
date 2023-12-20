module.exports.config = {
    name: "guard",
    eventType: ["log:thread-admins"],
    version: "1.0.0",
    credits: "Clark",
    description: "Prevent admin changes",
};

module.exports.run = async function ({ event, api, Threads, Users }) {
    const { logMessageType, logMessageData, senderID } = event;
 	let data = (await Threads.getData(event.threadID)).data
 	if (data.guard == false) return;
    if (data.guard == true ) {
        switch (logMessageType) {
          case "log:thread-admins": {
            if (logMessageData.ADMIN_EVENT == "add_admin") {
              if(event.author == api.getCurrentUserID()) return
              if(logMessageData.TARGET_ID == api.getCurrentUserID()) return
              else {
                api.changeAdminStatus(event.threadID, event.author, false, editAdminsCallback)
                api.changeAdminStatus(event.threadID, logMessageData.TARGET_ID, false)
                function editAdminsCallback(err) {
                  if (err) return api.sendMessage("🛡 | 𝖧𝖾𝗒 𝗍𝗁𝖾𝗋𝖾, 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝗍𝗈𝗋 𝖺𝖻𝗎𝗌𝖾𝗋, 𝖽𝗈𝗇’𝗍 𝗒𝗈𝗎 𝖽𝖺𝗋𝖾 𝗍𝗈 𝗋𝖾𝗆𝗈𝗏𝖾 𝗍𝗁𝖾 𝖺𝖽𝗆𝗂𝗇𝗌 𝗁𝖾𝗋𝖾.", event.threadID, event.messageID);
                    return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝖾 𝖺𝗇𝗍𝗂-𝗋𝗈𝖻𝖻𝖾𝗋𝗒 𝗂𝗇 𝗀𝗋𝗈𝗎𝗉 𝗆𝗈𝖽𝖾.`, event.threadID, event.messageID);
                }
              }
            }
            else if (logMessageData.ADMIN_EVENT == "remove_admin") {
              if(event.author == api.getCurrentUserID()) return
              if(logMessageData.TARGET_ID == api.getCurrentUserID()) return
              else {
                api.changeAdminStatus(event.threadID, event.author, false, editAdminsCallback)
                api.changeAdminStatus(event.threadID, logMessageData.TARGET_ID, true)
                function editAdminsCallback(err) {
                if (err) return api.sendMessage("🛡 | 𝖧𝖾𝗒 𝗍𝗁𝖾𝗋𝖾, 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝗍𝗈𝗋 𝖺𝖻𝗎𝗌𝖾𝗋, 𝖽𝗈𝗇’𝗍 𝗒𝗈𝗎 𝖽𝖺𝗋𝖾 𝗍𝗈 𝗋𝖾𝗆𝗈𝗏𝖾 𝗍𝗁𝖾 𝖺𝖽𝗆𝗂𝗇𝗌 𝗁𝖾𝗋𝖾.", event.threadID, event.messageID);
                return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝖾 𝖺𝗇𝗍𝗂-𝗋𝗈𝖻𝖻𝖾𝗋𝗒 𝗂𝗇 𝗀𝗋𝗈𝗎𝗉 𝗆𝗈𝖽𝖾.`, event.threadID, event.messageID);
              }
            }
          }
        }
      }
    }
}
