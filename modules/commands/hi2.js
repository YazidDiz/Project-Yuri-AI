
module.exports.config = {
    name: "hi",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Réynél",
    description: "auto bot send sticker",
    commandCategory: "auto-resp",
    usages: "",
    cooldowns: 0,
    denpendencies: {
        "fs": "",
        "request": ""
    }
};
/*module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "hi.gif")) request("https://i.imgur.com/shIPtZI.gif").pipe(fs.createWriteStream(dirMaterial + "hi.gif"));
} */
module.exports.handleEvent = async ({ event, api, Currencies,Users, args, utils, global, client }) => {
    const fs = require("fs");
    let name = await Users.getNameUser(event.senderID)
    var msg = {
                body: `𝖧𝗂 𝗌𝖾𝗇𝗌𝖾𝗂 ${name}, 𝖧𝖺𝗏𝖾 𝖺 𝗇𝗂𝖼𝖾 𝖽𝖺𝗒 ❤️`,
                attachment: fs.createReadStream(__dirname + `/noprefix/hi.gif`)
            }	
    if (event.body.toLowerCase() == "hi"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "hello"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
   if (event.body.toLowerCase() == "helo"){
        return api.sendMessage(msg,event.threadID,event.messageID);} 
 if (event.body.toLowerCase() == "hallo"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
   if (event.body.toLowerCase() == "halo"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
   if (event.body.toLowerCase() == "hola"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "chào"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "hí"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "lô"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
        };
module.exports.run = async ({ event, api, Currencies, args, utils }) => {
return api.sendMessage("👾 | 𝖴𝗌𝖾 𝗍𝗁𝖾 𝗐𝗋𝗈𝗇𝗀 𝗐𝖺𝗒 𝖺𝗇𝖽 𝗍𝗁𝖾𝗇 𝗅𝗂𝖾",event.threadID)
          }