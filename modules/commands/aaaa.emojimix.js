module.exports.config = {
    name: "emojimix",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Réynél",
    description: "Mix emoji",
    commandCategory: "tools",
    usages: "[emoji1|emoji2]",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
        "request": ""
    }
};
module.exports.run = async ({ api, event,args }) => {  {
    const fs = require("fs-extra");
    const request = require("request");
	 const { threadID, messageID, senderID, body } = event; 
try {
const content = args.join(" ").split("|").map(item => item = item.trim());
let emoji1 = content[0]
let emoji2 = content [1]
if (!args[0])
    return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖺 𝗐𝗋𝗈𝗇𝗀 𝖿𝗈𝗋𝗆𝖺𝗍 𝗎𝗌𝖾 𝗈𝖿 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽\n𝖪𝗂𝗇𝖽𝗅𝗒 𝗎𝗌𝖾: "+global.config.PREFIX+this.config.name+" "+this.config.usages, event.threadID, event.messageID);

	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/biden.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/biden.png"),event.messageID);
	 return request(encodeURI(`https://sim.ainz-project.repl.co/canvas/emojimix?emoji1=${emoji1}&emoji2=${emoji2}`)).pipe(fs.createWriteStream(__dirname+'/cache/biden.png')).on('close',() => callback()); 
} catch (err){
return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖨 𝖼𝖺𝗇'𝗍 𝗆𝗂𝗑 "+emoji1+" 𝖺𝗇𝖽 "+emoji2, event.threadID, event.messageID)
}   
}}