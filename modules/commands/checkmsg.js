module.exports.config = {
	name: "checkmsg",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Clark",
	description: "interactive check",
	commandCategory: "utilities",
	usages: "[checkmsg]",
	cooldowns: 15,
	dependencies: {
		"fs-extra": ""
	}
}

const path = __dirname + '/count-by-thread/';

module.exports.onLoad = () => {
    const fs = require('fs');
    if (!fs.existsSync(path) || !fs.statSync(path).isDirectory()) {
        fs.mkdirSync(path, { recursive: true });
    }
}

module.exports.handleEvent = function ({ event }) {
    const { messageID, threadID, senderID } = event;
    if (!global.data.allThreadID.some(tid => tid == threadID)) return;
    const fs = global.nodemodule['fs'];
    const threadPath = path + threadID + '.json';
    if (!fs.existsSync(threadPath) || fs.statSync(threadPath).isDirectory()) {
        fs.writeFileSync(threadPath, JSON.stringify({}, null, 4));
    }
    const getThreadJSON = JSON.parse(fs.readFileSync(threadPath)) || {};
    if (!getThreadJSON.hasOwnProperty(senderID)) {
        getThreadJSON[senderID] = 0;
    }
    getThreadJSON[senderID]++;
    fs.writeFileSync(threadPath, JSON.stringify(getThreadJSON, null, 4));
}


 const getRankName = count => {
    return count > 10000000 ? '🥇???🥇'
    :count > 500000 ? '🥈𝖴𝗇𝖻𝖾𝖺𝗍𝖺𝖻𝗅𝖾🥈'
        : count > 300000 ? '🥉𝖨𝗆𝗉𝗈𝗌𝗌𝗂𝖻𝗅𝖾🥉'
            : count > 113000 ? '🏆𝖱𝖺𝖽𝗂𝖺𝗇𝗍 𝖨𝖨𝖨🏆'
                : count > 90000? '♟𝖱𝖺𝖽𝗂𝖺𝗇𝗍 𝖨𝖨♟'
                    : count > 75000 ? '♣𝖱𝖺𝖽𝗂𝖺𝗇𝗍 𝖨♣'
                        : count > 60000 ? '♥𝖫𝖾𝗀𝖾𝗇𝖽𝖺𝗋𝗒♥'
                            : count > 50000 ? '♠𝖠𝖽𝗏𝖺𝗇𝖼𝖾𝖽 𝖦𝗋𝖺𝗇𝖽𝖬𝖺𝗌𝗍𝖾𝗋𝖾𝗋  𝖵♠'
                                : count > 40000 ? '🎲𝖠𝖽𝗏𝖺𝗇𝖼𝖾𝖽 𝖦𝗋𝖺𝗇𝖽𝖬𝖺𝗌𝗍𝖾𝗋𝖾𝗋  𝖨𝖵🎲'
                                    : count > 3000 ? '🥊𝖠𝖽𝗏𝖺𝗇𝖼𝖾𝖽 𝖦𝗋𝖺𝗇𝖽𝖬𝖺𝗌𝗍𝖾𝗋𝖾𝗋  𝖨𝖨𝖨🥊'
                                        : count > 24000 ? '🎗𝖠𝖽𝗏𝖺𝗇𝖼𝖾𝖽 𝖦𝗋𝖺𝗇𝖽𝖬𝖺𝗌𝗍𝖾𝗋𝖾𝗋 𝖨𝖨🎗'
                                            : count > 19000 ? '✨𝖠𝖽𝗏𝖺𝗇𝖼𝖾𝖽 𝖦𝗋𝖺𝗇𝖽𝖬𝖺𝗌𝗍𝖾𝗋𝖾𝗋 𝖨✨'
                                                : count > 18000 ? '🎖𝖬𝗒𝗍𝗁𝗂𝖼𝖺𝗅 𝖦𝗅𝗈𝗋𝗒 𝖵🎖'
                                                    : count > 17700 ? '🎀𝖬𝗒𝗍𝗁𝗂𝖼𝖺𝗅 𝖦𝗅𝗈𝗋𝗒 𝖨𝖵🎀'
                                                        : count > 17500 ? '🎈𝖬𝗒𝗍𝗁𝗂𝖼𝖺𝗅 𝖦𝗅𝗈𝗋𝗒 𝖨𝖨𝖨🎈'
                                                            : count > 17300 ? '🎊𝖬𝗒𝗍𝗁𝗂𝖼𝖺𝗅 𝖦𝗅𝗈𝗋𝗒 𝖨𝖨🎊'
                                                                : count > 17000 ? '🪅𝖬𝗒𝗍𝗁𝗂𝖼𝖺𝗅 𝖦𝗅𝗈𝗋𝗒 𝖨🪅'
                                                                    : count > 16700 ? '🪄𝖲𝗎𝗉𝗋𝖾𝗆𝖾 𝖮𝗏𝖾𝗋𝗅𝗈𝗋𝖽 - 𝖴𝗅𝗍𝗂𝗆𝖺𝗍𝖾 𝖦𝗋𝖺𝗇𝖽𝗆𝖺𝗌𝗍𝖾𝗋🪄 '
                                                                        : count > 14900 ? '✴𝖯𝗋𝖾𝗌𝗍𝗂𝗀𝖾 𝖵 - 𝖦𝗈𝖽𝗅𝗂𝗄𝖾✴'
                                                                            : count > 11060 ? '🟢𝖯𝗅𝖺𝗍𝗂𝗇𝗎𝗆 𝖨 - 𝖯𝗋𝖾𝗌𝗍𝗂𝗀𝖾 𝖨𝖵🟢'
                                                                                : count > 5930 ? '🟡𝖦𝗋𝖺𝗇𝖽𝗆𝖺𝗌𝗍𝖾𝗋 𝖨𝖨 - 𝖮𝗆𝖾𝗀𝖺 𝖨𝖨𝖨🟡'
                                                                                    : count > 1540 ? '🟠𝖬𝖺𝗌𝗍𝖾𝗋 𝖨𝖵 - 𝖦𝗋𝖺𝗇𝖽𝗆𝖺𝗌𝗍𝖾𝗋 𝖨𝖨🟠'
                                                                                        : count > 740 ? '🔴𝖬𝖺𝗌𝗍𝖾𝗋 𝖨 - 𝖨𝖨𝖨🔴'
                                                                                            : count > 730 ? '🔵𝖤𝗅𝗂𝗍𝖾 𝖵 - 𝖯𝗋𝗈 𝖵🔵'
                                                                                                : count > 245 ? '⚫𝖱𝗈𝗈𝗄𝗂𝖾 𝖵 - 𝖤𝗅𝗂𝗍𝖾 𝖨𝖵⚫'
                                                                                                    : '🟤𝖱𝗈𝗈𝗄𝗂𝖾 𝖨 - 𝖨𝖵🟤'
}



module.exports.run = async function ({ api, event, args, Users }) {
    const fs = global.nodemodule['fs'];
    const { messageID, threadID, senderID, mentions } = event;
    const threadPath = path + threadID + '.json';
    if (!fs.existsSync(threadPath) || fs.statSync(threadPath).isDirectory()) {
        fs.writeFileSync(threadPath, JSON.stringify({}, null, 4));
    }
    const query = args[0] ? args[0].toLowerCase() : '';
    const getThreadJSON = JSON.parse(fs.readFileSync(threadPath)) || {};
    if (!getThreadJSON.hasOwnProperty(senderID)) {
        getThreadJSON[senderID] = 1;
    }
    var storage = [],
        msg = '';
    if (query == 'all') {
        const allThread = await api.getThreadInfo(threadID) || { participantIDs: [] };
        for (id of allThread.participantIDs) {
            if (!getThreadJSON.hasOwnProperty(id)) {
                getThreadJSON[id] = 0;
            }
        }
    }
    for (const id in getThreadJSON) {
        const name = await Users.getNameUser(id);
        storage.push({ id, name, count: getThreadJSON[id] });
    }
    storage.sort((a, b) => {
        if (a.count > b.count) return -1;
        else if (a.count < b.count) return 1;
        else return a.name.localeCompare(b.name);
    });
    if (query == 'all') {
        let count = 1;
        msg += '❖《《《 ＣＨＥＣＫ 》》》❖';
        for (const user of storage) {
            msg += `\n${count++}. ${user.name} - ${user.count}`;
        }
    } else if (query == 'rank') {
        msg += '𝟢 𝗆𝗌𝗀𝗌)\n𝖦𝗈𝗅𝖽 𝟦 (𝟤𝟧𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖯𝗅𝖺𝗍𝗂𝗇𝗎𝗆 𝟣 (𝟤𝟫𝟢𝟢 𝟪𝟢𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖬𝖺𝗌𝗍𝖾𝗋 (𝟫𝟢𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖶𝖺𝗋 𝖦𝖾𝗇𝖾𝗋𝖺𝗅𝗌 (𝟧𝟢𝟢𝟢𝟢 𝗆𝗌𝗀𝗌)'
    } else if (!query) {
        let userID = senderID;
        if (Object.keys(mentions).length > 0) {
            userID = mentions[0];
        }
        const rankUser = storage.findIndex(e => e.id == userID);
        msg += `${userID == senderID ? '💠 | 𝖥𝗋𝗂𝖾𝗇𝖽' : storage[rankUser].name} 𝗋𝖺𝗇𝗄𝖾𝖽 ${rankUser + 1}\n━━━━━━━━━━━━━━━━━━━\n💌 | 𝖭𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌: ${storage[rankUser].count}\n━━━━━━━━━━━━━━━━━━━\n🔰 | 𝖱𝖺𝗇𝗄:  ${getRankName(storage[rankUser].count)}`;
    }
    api.sendMessage(msg, threadID);
    return;
        }