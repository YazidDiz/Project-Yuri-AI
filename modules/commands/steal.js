module.exports.config = {
	name: "steal",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "steal money to random people",
	commandCategory: "economy",
	usages: "[steal]",
	cooldowns: 5
};

module.exports.run = async function({ api, event, Users, Currencies }) {
	var alluser = global.data.allUserID
    let victim = alluser[Math.floor(Math.random() * alluser.length)];
    let nameVictim = (await Users.getData(victim)).name
    if (victim == api.getCurrentUserID() && event.senderID == victim) return api.sendMessage('👾 | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖼𝖺𝗇𝗇𝗈𝗍 𝗌𝗍𝖾𝖺𝗅 𝖿𝗋𝗈𝗆 𝗍𝗁𝗂𝗌 𝗉𝖾𝗋𝗌𝗈𝗇. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇.', event.threadID, event.messageID);
    var route = Math.floor(Math.random() * 2);
    if (route > 1 || route == 0) {
    const moneydb = (await Currencies.getData(victim)).money;
       var money = Math.floor(Math.random() * 1000) + 1;
        if (moneydb <= 0 || moneydb == undefined) return api.sendMessage(`👾 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗃𝗎𝗌𝗍 𝗌𝗍𝗈𝗅𝖾 ${nameVictim} 𝗂𝗌 𝖺 𝗉𝗈𝗈𝗋 𝗉𝖾𝗋𝗌𝗈𝗇. 𝖲𝗈 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗇𝗈𝗍𝗁𝗂𝗇𝗀 𝗍𝗈 𝗌𝗍𝖾𝖺𝗅.`, event.threadID, event.messageID);
        else if (moneydb >= money) return api.sendMessage(`💰 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗃𝗎𝗌𝗍 𝗌𝗍𝗈𝗅𝖾 ${money}$ ${nameVictim} 𝗂𝗇 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉.`, event.threadID, async () => {
            await Currencies.increaseMoney(victim, parseInt("-"+money))
            await Currencies.increaseMoney(event.senderID, parseInt(money))
        }, event.messageID);
        else if (moneydb < money) return api.sendMessage(`💰 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗃𝗎𝗌𝗍 𝗌𝗍𝗈𝗅𝖾 𝗂𝗍 𝖺𝗅𝗅 ${moneydb} 𝖻𝖺𝗅𝖺𝗇𝖼𝖾 𝗈𝖿 ${nameVictim} 𝗂𝗇 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉.`, event.threadID, async () => {
            await Currencies.increaseMoney(victim, parseInt("-"+money))
            await Currencies.increaseMoney(event.senderID, parseInt(money))
        }, event.messageID);
    }
    else if (route == 1) {
        var name = (await Users.getData(event.senderID)).name
        var moneyuser = (await Currencies.getData(event.senderID)).money
            if (moneyuser <= 0) return api.sendMessage("👾 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝗁𝖺𝗏𝖾 𝗆𝗈𝗇𝖾𝗒? 𝗃𝗎𝗌𝗍 𝗐𝗈𝗋𝗄 𝗍𝗈 𝖾𝖺𝗋𝗇 𝗌𝗈𝗆𝖾 𝗆𝗈𝗇𝖾𝗒...", event.threadID, event.messageID);
            else if (moneyuser > 0) return api.sendMessage(`👮 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝖻𝖾𝖾𝗇 𝖼𝖺𝗉𝗍𝗎𝗋𝖾𝖽 𝖺𝗇𝖽 𝗅𝗈𝗌𝗍 ${moneyuser}$.`, event.threadID, () => api.sendMessage({ body: `🎉 | 𝖢𝗈𝗇𝗀𝗋𝖺𝗍𝗎𝗅𝖺𝗍𝗂𝗈𝗇𝗌 𝗌𝖾𝗇𝗌𝖾𝗂 ${nameVictim}! 𝗒𝗈𝗎 𝖼𝖺𝗎𝗀𝗁𝗍 ${name} 𝖺𝗇𝖽 𝗀𝗈𝗍 ${Math.floor(moneyuser / 2)}$ 𝖺𝗌 𝖺 𝗋𝖾𝗐𝖺𝗋𝖽!`, mentions: [{ tag: nameVictim, id: victim }, { tag: name, id: event.senderID }] }, event.threadID, async () => {
                await Currencies.increaseMoney(event.senderID, parseInt("-"+ moneyuser))
                await Currencies.increaseMoney(victim, parseInt(Math.floor(moneyuser / 2))) 
            }), event.messageID);
        
    }
                                                  }