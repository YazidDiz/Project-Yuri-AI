module.exports.config = {
  name: "unsent",
  version: "1.0.0",
  hasPermission: 2,
  credits: "Clark", 
  description: "unsent the message sent by the bot",
  commandCategory: "admin",
  usages: "[amount]",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  var shirosuzuka = args.join(" ");
  if (!shirosuzuka) api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖯𝗅𝖾𝖺𝗌𝖾 𝖤𝗇𝗍𝖾𝗋 𝖭𝗎𝗆𝖻𝖾𝗋 𝖧𝗈𝗐 𝖬𝖺𝗇𝗒 𝖬𝖾𝗌𝗌𝗀𝖾 𝖸𝗈𝗎 𝖶𝖺𝗇𝗍 𝖳𝗈 𝖢𝗅𝖾𝖺𝗋\n━━━━━━━━━━━━━━━━━━━\n📝 | 𝗡𝗼𝘁𝗲: 𝖳𝗁𝖾 𝖴𝗇𝗌𝖾𝗇𝖽𝖾𝖽 𝖬𝖾𝗌𝗌𝖺𝗀𝖾 𝖨𝗌 𝖭𝗈𝗍 𝖢𝗅𝖾𝖺𝗋𝗅𝗒 𝖤𝗊𝗎𝖺𝗅 𝖳𝗈 𝖳𝗁𝖾 𝖭𝗎𝗆𝖻𝖾𝗋 𝖸𝗈𝗎 𝖤𝗇𝗍𝖾𝗋𝖽 𝖳𝗁𝖾𝗒 𝖴𝗇𝗌𝖾𝗇𝖽𝖾𝖽 𝖬𝖾𝗌𝗌𝖺𝗀𝖾 𝖬𝖺𝗒 𝖡𝖾 𝖫𝖾𝗌𝗌", event.threadID, event.messageID);

   // if (!NaN(shirosuzuka) api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝗇𝗅𝗒", event.threadID, event.messageID);
  const unsendBotMessages = async () => {
    const threadID = event.threadID;
api.sendMessage("✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖼𝗅𝖾𝖺𝗋𝖾𝖽 𝖺𝗉𝗉𝗈𝗑𝗂𝗆𝖺𝗍𝖾𝗅𝗒 " + shirosuzuka + " 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌",event.threadID, event.messageID);
    const botMessages = await api.getThreadHistory(threadID, shirosuzuka);
    const botSentMessages = botMessages.filter(message => message.senderID === api.getCurrentUserID());

    for (const message of botSentMessages) {
      await api.unsendMessage(message.messageID);
    }
  };

  await unsendBotMessages();
};