module.exports.config = {
    name: "poll",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Clark",
    description: "create a poll inside the group",
    commandCategory: "group",
    usages: "[title][name1|name2|...]",
    cooldowns: 5,
    dependencies: {
        "request": "",
        "fs-extra": ""
    }
};
module.exports.run = function({ api, event, args }) {
    var content = args.join(' ')
    var title = args[0];
    var options = content.substring(content.indexOf(" -> ") + 4)

    var option = options.split(" | ");
    var object = {};
    if (option.length == 1 && option[0].includes(' | ')) option[0] = option[0].replace(' | ', ' ');
    for (var i = 0; i < option.length; i++) object[option[i]] = false;
    return api.createPoll(title, event.threadID, object, (err) => (err) ? api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽', event.threadID, event.messageID) : '');
}
