module.exports.config = {
    name: "leave",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Réynél",
    description: "leave on the current thread",
    commandCategory: "admin",
    usages: "[id] [or command in the current thread]",
    cooldowns: 10,
};

module.exports.run = async function({ api, event, args }) {
        if (!args[0]) return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
        if (!isNaN(args[0])) return api.removeUserFromGroup(api.getCurrentUserID(), args.join(" "));
}