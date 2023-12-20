module.exports.config = {
	name: "coinflip",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "Réynél",
	description: "Flip the coin",
  commandCategory: "utilities",
	usages: "[coinflip]",
	cooldowns: 5,// How long a person can repeat the command
//List external package modules here so that when the command is loaded it will automatically install!
// Info is additional details on how to use the command
// Key: Keyword belongs to usages
// prompt: Details of key input data
// type: Key input data format
// example: Example ¯\_(ツ)_/¯
	envConfig: {
		//This is where you will set up all module envs, such as APIKEY, ...
	}
};
module.exports.run = function({ api, event, args, client, __GLOBAL }) {
	//What to do here is up to you ¯\_(ツ)_/¯
return (Math.random() > 0.5) ? api.sendMessage("🪙 | 𝗙𝗮𝗰𝗲 𝗗𝗼𝘄𝗻", event.threadID, event.messageID) : api.sendMessage("🪙 | 𝗙𝗮𝗰𝗲 𝗨𝗽", event.threadID, event.messageID);

  }