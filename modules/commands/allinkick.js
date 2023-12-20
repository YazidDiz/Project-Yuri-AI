module.exports.config = {
  name: "allinkick",
  version: "1.0.0",
  hasPermission: 2,
  credits: "Réynél",
  description: "Kick out all the members, admins, and this bot inside of the group.",
  commandCategory: "group",
  usages: "[allinkick]",
  cooldowns: 3,
};

module.exports.run = async function({ api, event, args }) {
  var threadInfo = await api.getThreadInfo(event.threadID)
  var id = threadInfo.participantIDs
  const user = args.join(" ")
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  for (let user of id) {
    await delay(5000)
    api.removeUserFromGroup(user, event.threadID, user);
  }
};