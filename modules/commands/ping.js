module.exports.config = {
	name: "ping",
	version: "0.0.3",
	hasPermssion: 2,
	credits: "Réynél",
	description: "Tag all members",
	commandCategory: "admin",
	usages: "[Text]",
	cooldowns: 10
};

module.exports.run = async function({ api, event, args, Threads }) {
	try {
		var all = (await Threads.getInfo(event.threadID)).participantIDs;
    all.splice(all.indexOf(api.getCurrentUserID()), 1);
	  all.splice(all.indexOf(event.senderID), 1);
		var body = (args.length != 0) ? args.join(" ") : "👑 | 𝖬𝗂𝗇𝗇𝖺, 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋 𝗂𝗌 𝗅𝗈𝗈𝗄𝗂𝗇𝗀 𝖿𝗈𝗋 𝗒𝗈𝗎 𝖺𝗅𝗅", mentions = [], index = 0;
		
    for (let i = 0; i < all.length; i++) {
		    if (i == body.length) body += body.charAt(body.length - 1);
		    mentions.push({
		  	  tag: body[i],
		  	  id: all[i],
		  	  fromIndex: i - 1
		    });
	    }

		return api.sendMessage({ body: `‎${body}`, mentions }, event.threadID, event.messageID);

	}
	catch (e) { return console.log(e); }
}