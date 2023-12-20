module.exports.config = {
	name: "minari",
	version: "1.0.9",
	hasPermssion: 0,
	credits: "Clark",
	description: "Talk with AI Minari",
	commandCategory: "chatbots",
	usages: "[text/message/chat]",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
  const Chatbot  =  require("discord-chatbot");

if (!args[0]) {api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝖺 𝗆𝖾𝗌𝗌𝖺𝗀𝖾.",event.threadID, event.messageID)}
  else{
 var mess = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
const chatbot  =  new  Chatbot({name: "Minari", gender: "Najimi"});
    const res = await chatbot.chat(mess).catch(e => console.log(e));

 if(res === "My dear great master, Udit.") {
    api.sendMessage(`𝖨'𝗆 𝗆𝖺𝖽𝖾 𝖻𝗒 𝗆𝖺𝗌𝗍𝖾𝗋 𝖢𝗅𝖺𝗋𝗄, 𝖺𝗅𝗌𝗈 𝗄𝗇𝗈𝗐𝗇 𝖺𝗌 𝖢𝗅𝖺𝗋𝗄 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺.`, event.threadID, event.messageID)
    return;
              }   
      if(res === "My birthplace is Clark's laptop. What is your birthplace?") {
    api.sendMessage(`𝖨 𝗅𝗂𝗏𝖾 𝗁𝖾𝗋𝖾 𝗂𝗇 𝖳𝗈𝗄𝗒𝗈, 𝖩𝖺𝗉𝖺𝗇. 𝖶𝗁𝖺𝗍 𝖺𝖻𝗈𝗎𝗍 𝗒𝗈𝗎?`, event.threadID, event.messageID)
    return;
              } 
      if(res === "My favorite anime is <em>Ghost in the Shell</em>") {
    api.sendMessage(`𝖬𝗒 𝖿𝖺𝗏𝗈𝗋𝗂𝗍𝖾 𝖺𝗇𝗂𝗆𝖾 𝗂𝗌 𝖠𝗇𝗀𝖾𝗅 𝖡𝖾𝖺𝗍𝗌, 𝗐𝗁𝖺𝗍 𝖺𝖻𝗈𝗎𝗍 𝗒𝗈𝗎?`, event.threadID, event.messageID)
    return;
              }     
      if(res === "I can't think of any. You suggest anime.") {
    api.sendMessage(`𝖨 𝗌𝗎𝗀𝗀𝖾𝗌𝗍 𝗒𝗈𝗎 𝗍𝗈 𝗐𝖺𝗍𝖼𝗁 𝖪𝗂𝗆𝗂 𝖭𝗈 𝖭𝖺𝗐𝖺, 𝟣𝟢/𝟣𝟢 𝗐𝗁𝗈𝗅𝖾𝗌𝗈𝗆𝖾.`, event.threadID, event.messageID)
    return;
              }     
            if(res === "I was created by Clark.") {
    api.sendMessage(`𝖨 𝗐𝖺𝗌 𝖼𝗋𝖾𝖺𝗍𝖾𝖽 𝖻𝗒 𝖢𝗅𝖺𝗋𝗄 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺.`, event.threadID, event.messageID)
    return;
              }     
              
              if(res === "I obey Clark.") {
    api.sendMessage(`𝖨 𝗈𝖻𝖾𝗒 𝖢𝗅𝖺𝗋𝗄 𝖲𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺.`, event.threadID, event.messageID)
    return;
              }     
 api.sendMessage(res, event.threadID, event.messageID)
  }
}