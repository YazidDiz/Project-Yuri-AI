module.exports.config = {
 name: "antijoin",
 eventType: ["log:subscribe"],
 version: "1.0.0",
 credits: "Réynél",
 description: "Ban new members from the group"
};

module.exports.run = async function ({ event, api, Threads, Users }) {
 	let data = (await Threads.getData(event.threadID)).data
 	if (data.newMember == false) return;
 	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) return
    else if(data.newMember == true) {
    var memJoin = event.logMessageData.addedParticipants.map(info => info.userFbId)
			for (let idUser of memJoin) {
					await new Promise(resolve => setTimeout(resolve, 1000));
					api.removeUserFromGroup(idUser, event.threadID, async function (err) {
                        if (err) return data["newMember"] = false;
                            await Threads.setData(event.threadID, { data });
                              global.data.threadData.set(event.threadID, data);
                    })
			}
 	return api.sendMessage(`⚠️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎𝗋 𝗀𝗋𝗈𝗎𝗉 𝗂𝗌 𝗍𝗎𝗋𝗇𝗂𝗇𝗀 𝗈𝗇 𝖺𝗇𝗍𝗂 𝗃𝗈𝗂𝗇, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗎𝗋𝗇 𝗂𝗍 𝗈𝖿𝖿 𝖻𝖾𝖿𝗈𝗋𝖾 𝖺𝖽𝖽𝗂𝗇𝗀 𝖺 𝗇𝖾𝗐 𝗆𝖾𝗆𝖻𝖾𝗋𝗌`, event.threadID);
 }
}
