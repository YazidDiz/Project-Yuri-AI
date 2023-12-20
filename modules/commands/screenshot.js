module.exports.config = {
	name: "screenshot",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Clark",
	description: "Screenshot of a certain website (NOT ALLOW NSFW PAGE)",
	commandCategory: "utilities",
	usages: "[url site]",
	cooldowns: 5,
	dependencies: {
        "fs-extra": "",
        "path": "",
        "url": ""
    }
};

module.exports.onLoad = async () => {
    const { existsSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];

    const path = resolve(__dirname, "cache", "pornlist.txt");

    if (!existsSync(path)) return await global.utils.downloadFile("https://raw.githubusercontent.com/blocklistproject/Lists/master/porn.txt", path);
    else return;
}

module.exports.run = async ({ event, api, args, }) => {
    const { readFileSync, createReadStream, unlinkSync } = global.nodemodule["fs-extra"];
    const url = global.nodemodule["url"];

    if (!global.moduleData.pornList) global.moduleData.pornList = readFileSync(__dirname + "/cache/pornlist.txt", "utf-8").split('\n').filter(site => site && !site.startsWith('#')).map(site => site.replace(/^(0.0.0.0 )/, ''));
    const urlParsed = url.parse(args[0]);

    if (global.moduleData.pornList.some(pornURL => urlParsed.host == pornURL)) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗌𝗂𝗍𝖾 𝗒𝗈𝗎 𝖾𝗇𝗍𝖾𝗋𝖾𝖽 𝗂𝗌 𝗇𝗈𝗍 𝗌𝖾𝖼𝗎𝗋𝖾!!(𝖭𝖲𝖥𝖶 𝖯𝖠𝖦𝖤)", event.threadID, event.messageID);

    try {
        const path = __dirname + `/cache/${event.threadID}-${event.senderID}s.png`;
        await global.utils.downloadFile(`https://image.thum.io/get/width/1920/crop/400/fullpage/noanimate/${args[0]}`, path);
        api.sendMessage({ attachment: createReadStream(path) }, event.threadID, () => unlinkSync(path));
    }
    catch {
        return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝗂𝗌 𝗎𝗋𝗅 𝖼𝗈𝗎𝗅𝖽 𝗇𝗈𝗍 𝖻𝖾 𝖿𝗈𝗎𝗇𝖽, 𝗍𝗁𝖾 𝖿𝗈𝗋𝗆𝖺𝗍 𝗂𝗌 𝗂𝗇𝖼𝗈𝗋𝗋𝖾𝖼𝗍?", event.threadID, event.messageID);
    }
}