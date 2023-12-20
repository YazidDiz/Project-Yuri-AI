module.exports.config = {
	name: "newgroup",	
	version: "1.0.0", 
	hasPermssion: 2,
	credits: "Réynél",
	description: "Create a new chat group with the tag", 
  commandCategory: "admin",
	usages: "[tag] | [New group name] or newbox me [tag] | [New group name]",
	cooldowns: 5, 
	dependencies: "",
};

module.exports.run = async function({ api, Users, args, event }) {
 if (args[0] == "me")
  var id = [event.senderID]
  else id = [];
  var main = event.body; 
  var groupTitle = main.slice(main.indexOf("|") +2)
  for (var i = 0; i < Object.keys(event.mentions).length; i++)
id.push(Object.keys(event.mentions)[i]);
  api.createNewGroup(id, groupTitle,() => {api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖼𝗋𝖾𝖺𝗍𝖾𝖽 𝖺 𝗇𝖾𝗐 𝗀𝗋𝗈𝗎𝗉 𝖼𝗁𝖺𝗍 𝗇𝖺𝗆𝖾𝖽:\n《${groupTitle}》`, event.threadID)})
}