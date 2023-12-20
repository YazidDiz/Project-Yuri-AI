module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "Clark",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "𝖻𝖾𝗂𝗇𝗀 𝗄𝗂𝖼𝗄𝖾𝖽 𝖻𝗒 𝗍𝗁𝖾 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝗍𝗈𝗋";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝗆𝗂𝗇𝖺-𝗌𝖺𝗇, 𝖻𝗎𝗍 𝖨 𝖼𝖺𝗇'𝗍 𝖺𝖽𝖽 𝗌𝖾𝗇𝗌𝖾𝗂 ${name}, 𝖽𝗎𝖾 𝗍𝗈 𝗁𝗂𝗌/𝗁𝖾𝗋 𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝗌𝖾𝗍𝗍𝗂𝗇𝗀𝗌`, event.threadID)
   } else api.sendMessage(`🌟 | 𝖦𝗈𝗆𝖾𝗇 𝗇𝖾, 𝖡𝗎𝗍 𝗒𝗈𝗎 𝖼𝖺𝗇'𝗍 𝖾𝗌𝖼𝖺𝗉𝖾 𝗁𝖾𝗋𝖾 𝗌𝖾𝗇𝗌𝖾𝗂 ${name}, 𝖼𝖺𝗎𝗌𝖾 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝖾𝖽 𝗆𝖾 𝗍𝗈 𝖽𝗈𝗇'𝗍 𝗅𝖾𝗍 𝖺𝗇𝗒𝗈𝗇𝖾 𝗍𝗈 𝗅𝖾𝖺𝗏𝖾 𝗂𝗇 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉 𝖼𝗁𝖺𝗍`, event.threadID);
  })
 }
                            }