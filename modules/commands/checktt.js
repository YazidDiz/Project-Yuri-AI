module.exports.config = {
	name: "checktt",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "interactive check",
	commandCategory: "information",
	usages: "[checktt]",
	cooldowns: 5,
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
    return count > 50000 ? '𝖶𝖺𝗋 𝖦𝖾𝗇𝖾𝗋𝖺𝗅𝗌'
    :count > 9000 ? '𝖬𝖺𝗌𝗍𝖾𝗋'
        : count > 8000 ? '𝖤𝗅𝗂𝗍𝖾 𝖵'
            : count > 6100 ? '𝖤𝗅𝗂𝗍𝖾 𝖨𝖵'
                : count > 5900? '𝖤𝗅𝗂𝗍𝖾 𝖨𝖨𝖨'
                    : count > 5700 ? '𝖤𝗅𝗂𝗍𝖾 𝖨𝖨'
                        : count > 5200 ? '𝖤𝗅𝗂𝗍𝖾 𝖨'
                            : count > 5000 ? '𝖣𝗂𝖺𝗆𝗈𝗇𝖽 𝖵'
                                : count > 4800 ? '𝖣𝗂𝖺𝗆𝗈𝗇𝖽 𝖨𝖵'
                                    : count > 4500 ? '𝖣𝗂𝖺𝗆𝗈𝗇𝖽 𝖨𝖨𝖨'
                                        : count > 4000 ? '𝖣𝗂𝖺𝗆𝗈𝗇𝖽 𝖨𝖨'
                                            : count > 3800 ? '𝖣𝗂𝖺𝗆𝗈𝗇𝖽 𝖨'
                                                : count > 3500 ? '𝖯𝗅𝖺𝗍𝗂𝗇𝗎𝗆 𝖨𝖵'
                                                    : count > 3200 ? '𝖯𝗅𝖺𝗍𝗂𝗇𝗎𝗆 𝖨𝖨𝖨'
                                                        : count > 3000 ? '𝖯𝗅𝖺𝗍𝗂𝗇𝗎𝗆 𝖨𝖨'
                                                            : count > 2900 ? '𝖯𝗅𝖺𝗍𝗂𝗇𝗎𝗆 𝖨'
                                                                : count > 2500 ? '𝖦𝗈𝗅𝖽 𝖨𝖵'
                                                                    : count > 2300 ? '𝖦𝗈𝗅𝖽 𝖨𝖨𝖨'
                                                                        : count > 2000 ? '𝖦𝗈𝗅𝖽 𝖨𝖨'
                                                                            : count > 1500 ? '𝖦𝗈𝗅𝖽 𝖨'
                                                                                : count > 1200 ? '𝖲𝗂𝗅𝗏𝖾𝗋 𝖨𝖨𝖨'
                                                                                    : count > 1000 ? '𝖲𝗂𝗅𝗏𝖾𝗋 𝖨𝖨'
                                                                                        : count > 900 ? '𝖲𝗂𝗅𝗏𝖾𝗋 𝖨'
                                                                                            : count > 500 ? '𝖢𝗈𝗉𝗉𝖾𝗋 𝖨𝖨𝖨'
                                                                                                : count > 100 ? '𝖢𝗈𝗉𝗉𝖾𝗋 𝖨𝖨'
                                                                                                    : '𝖢𝗈𝗉𝗉𝖾𝗋 𝖨'
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
        msg += '❆✿❀❂❁𝗖𝗛𝗘𝗖𝗞𝗧𝗧❁❂❀✿❆';
        for (const user of storage) {
            msg += `\n${count++}. ${user.name} - ${user.count}`;
        }
    } else if (query == 'rank') {
        msg += '𝖢𝗈𝗉𝗉𝖾𝗋 𝟣 (𝟣𝟢𝗆𝗌𝗀𝗌)\n𝖢𝗈𝗉𝗉𝖾𝗋 𝟤 (𝟣𝟢𝟢𝗆𝗌𝗀𝗌)\n𝖢𝗈𝗉𝗉𝖾𝗋 𝟥 (𝟧𝟢𝟢𝗆𝗌𝗀𝗌)\n𝖲𝗂𝗅𝗏𝖾𝗋 𝟣 (𝟫𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖲𝗂𝗅𝗏𝖾𝗋 𝟤 (𝟣𝟢𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖲𝗂𝗅𝗏𝖾𝗋 𝟥 (𝟣𝟤𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖦𝗈𝗅𝖽 𝟣 (𝟣𝟧𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖦𝗈𝗅𝖽𝟤 (𝟤𝟢𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖦𝗈𝗅𝖽𝟥 (𝟤𝟥𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖦𝗈𝗅𝖽 𝟦 (𝟤𝟧𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖯𝗅𝖺𝗍𝗂𝗇𝗎𝗆 𝟣 (𝟤𝟫𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖯𝗅𝖺𝗍𝗂𝗇𝗎𝗆  𝟤 (𝟥𝟢𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖯𝗅𝖺𝗍𝗂𝗇𝗎𝗆 𝟥 (𝟥𝟤𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖯𝗅𝖺𝗍𝗂𝗇𝗎𝗆 𝟦 (𝟥𝟧𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖣𝗂𝖺𝗆𝗈𝗇𝖽 𝟣(𝟥𝟪𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖣𝗂𝖺𝗆𝗈𝗇𝖽 𝟤 (𝟦𝟢𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖣𝗂𝖺𝗆𝗈𝗇𝖽 𝟥 (𝟦𝟧𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖣𝗂𝖺𝗆𝗈𝗇𝖽 𝟦(𝟦𝟪𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖣𝗂𝖺𝗆𝗈𝗇𝖽 𝟧 (𝟧𝟢𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖤𝗅𝗂𝗍𝖾 𝟣 (𝟧𝟤𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖤𝗅𝗂𝗍𝖾 𝟤 (𝟧𝟩𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖤𝗅𝗂𝗍𝖾 𝟥 (𝟧𝟫𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖤𝗅𝗂𝗍𝖾 𝟦 (𝟨𝟣𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖤𝗅𝗂𝗍𝖾 𝟧 (𝟪𝟢𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖬𝖺𝗌𝗍𝖾𝗋 (𝟫𝟢𝟢𝟢 𝗆𝗌𝗀𝗌)\n𝖶𝖺𝗋 𝖦𝖾𝗇𝖾𝗋𝖺𝗅𝗌 (𝟧𝟢𝟢𝟢𝟢 𝗆𝗌𝗀𝗌)'
    } else if (!query) {
        let userID = senderID;
        if (Object.keys(mentions).length > 0) {
            userID = mentions[0];
        }
        const rankUser = storage.findIndex(e => e.id == userID);
        msg += `${userID == senderID ? '💠 | 𝗙𝗿𝗶𝗲𝗻𝗱' : storage[rankUser].name} 𝗿𝗮𝗻𝗸𝗲𝗱 ${rankUser + 1}\n💌 | 𝗡𝘂𝗺𝗯𝗲𝗿 𝗼𝗳 𝗺𝗲𝘀𝘀𝗮𝗴𝗲𝘀: ${storage[rankUser].count}\n🔰 | 𝗥𝗮𝗻𝗸: ${getRankName(storage[rankUser].count)}`;
    }
    api.sendMessage(msg, threadID);
    return;
}
