const axios = require("axios");
const fs = require('fs');
const path = require('path');
 
module.exports.config = {
    name: "email",
    version: "1.0.0",
    hasPermssion: 0, //1 admin default note: you make it 0 
    credits: "Clark",
    description: "send a email",
    commandCategory: "utilities",
    cooldowns: 5,
};
 
module.exports.run = async function({ api, event, args, commandModules, prefix }) {
    if (args.length < 2) {
        api.sendMessage("🎓 | 𝗨𝘀𝗮𝗴𝗲:\n<𝗋𝖾𝖼𝖾𝗂𝗏𝖾𝗋_𝖾𝗆𝖺𝗂𝗅> <𝖾𝗆𝖺𝗂𝗅_𝗍𝖾𝗑𝗍>", event.threadID, event.messageID);
        return;
    }
 
    const receiverEmail = args[0];
    const emailText = args.slice(1).join(" ");
 
    try {
        const response = await axios.post('https://api.easy0.repl.co/v1/email-send', {
            receiver: receiverEmail,
            text: emailText,
        });
 
        console.log('Email sent:', response.data);
        api.sendMessage('✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖾𝗆𝖺𝗂𝗅 𝗌𝖾𝗇𝗍 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒!', event.threadID, event.messageID);
    } catch (error) {
        console.error('Error sending email:', error.message);
        api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝖾𝗆𝖺𝗂𝗅. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', event.threadID, event.messageID);
    }
};