module.exports.config = {
    name: "horny",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Réynél",
    description: "get a horny licence",
    commandCategory: "mentions",
    cooldowns: 5,
    usages: "[uid/reply/mention]"
};
let p = __dirname+'/cache/patrick.png';
module.exports.run = async ({ api, event, args }) => {  {
    const fs = require("fs");
    const request = require("request");
	 const { threadID, messageID, senderID, body } = event;
if (args.join().indexOf('@') !== -1){ var id = Object.keys(event.mentions) }
      else var id = args[0] || event.senderID;
      if(event.type == "message_reply") { var id = event.messageReply.senderID }
	 var callback = () => api.sendMessage({body: "𝖧𝖾𝗒, 𝗒𝗈𝗎𝗋 𝗁𝗈𝗋𝗇̃𝗒 𝗅𝗂𝖼𝖾𝗇𝗌𝖾...", attachment: fs.createReadStream(p)}, event.threadID, () => fs.unlinkSync(p),event.messageID);
	 request(encodeURI("https://free-api.ainz-sama101.repl.co/canvas/"+"\u0068\u006f\u0072\u006e\u0079"+`?uid=${id}`)).pipe(fs.createWriteStream(p)).on('close',() => callback());     
}}