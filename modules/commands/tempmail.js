const axios = require('axios');

module.exports.config = {
  name: "tempmail",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Generate temporary email or fetch inbox messages.",
  commandCategory: "utilities",
  cooldowns: 2,
};

const TEMP_MAIL_URL = 'https://tempmail-api.codersensui.repl.co/api/gen';

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args[0] === 'inbox') {
      if (!args[1]) {
        return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺𝗇 𝖾𝗆𝖺𝗂𝗅 𝖺𝖽𝖽𝗋𝖾𝗌𝗌 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗂𝗇𝖻𝗈𝗑.", event.threadID);
      }
      
      const emailAddress = args[1];
      const inboxResponse = await axios.get(`https://tempmail-api.codersensui.repl.co/api/getmessage/${emailAddress}`);
      const messages = inboxResponse.data.messages;

      if (!messages || messages.length === 0) {
        return api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗇𝗈 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 ${emailAddress}.`, event.threadID);
      }

      let messageText = '📬 | 𝗜𝗻𝗯𝗼𝘅 𝗠𝗲𝘀𝘀𝗮𝗴𝗲𝘀: \n\n';
      for (const message of messages) {
        messageText += `📩 | 𝗦𝗲𝗻𝗱𝗲𝗿: ${message.sender}\n`;
        messageText += `👀 | 𝗦𝘂𝗯𝗷𝗲𝗰𝘁: ${message.subject || '❎ | 𝗡𝗢 𝗦𝗨𝗕𝗝𝗘𝗖𝗧'}\n`;
        messageText += `📩 | 𝗠𝗲𝘀𝘀𝗮𝗴𝗲: ${message.message.replace(/<style([\s\S]*?)<\/style>|<script([\s\S]*?)<\/script>|<\/div>|<div>|<[^>]*>/gi, '')}\n\n`;
      }

      api.sendMessage(messageText, event.threadID);
    } else {
      const tempMailResponse = await axios.get(TEMP_MAIL_URL);
      const tempMailData = tempMailResponse.data;

      if (!tempMailData.email) {
        return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝖾 𝗍𝖾𝗆𝗉𝗈𝗋𝖺𝗋𝗒 𝖾𝗆𝖺𝗂𝗅.", event.threadID);
      }

      api.sendMessage(`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖾𝗆𝖺𝗂𝗅: \n\n${tempMailData.email}`, event.threadID);
    }
  } catch (error) {
    console.error('Error:', error);
    api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗇𝗈 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌 𝖿𝗈𝗎𝗇𝖽 𝗂𝗇 𝗍𝗁𝖾 𝖼𝗎𝗋𝗋𝖾𝗇𝗍 𝖾𝗆𝖺𝗂𝗅 (𝖯𝗅𝖾𝖺𝗌𝖾 𝗎𝗌𝖾 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖺𝗀𝖺𝗂𝗇 𝗂𝖽𝗄 𝗁𝗈𝗐 𝗍𝗈 𝖿𝗂𝗑 𝗍𝗁𝗂𝗌 𝗉𝖺𝗋𝗍 𝗂𝗍𝗌 𝗇𝗈𝗋𝗆𝖺𝗅 𝗍𝗈 𝗀𝖾𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝖺𝗇𝖽 𝗒𝗈𝗎 𝗃𝗎𝗌𝗍 𝗁𝖺𝗏𝖾 𝗍𝗁𝖾 𝖼𝗎𝗋𝗋𝖾𝗇𝗍 𝗍𝖾𝗆𝗉 𝗂𝗇𝖻𝗈𝗑, 𝗃𝗎𝗌𝗍 𝗎𝗌𝖾 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖺𝗀𝖺𝗂𝗇 𝖿𝗈𝗅𝗅𝗈𝗐𝖾𝖽 𝖻𝗒 𝗍𝗁𝖾 𝖼𝗎𝗋𝗋𝖾𝗇𝗍 𝗍𝖾𝗆𝗉 𝗆𝖺𝗂𝗅.).", event.threadID);
  }
};