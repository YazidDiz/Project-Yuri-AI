const axios = require('axios');
const fs = require('fs');

module.exports.config = {
  name: 'wikipedia',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'Get Wikipedia information.',
  commandCategory: 'searches',
  usages: '[page_title]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const pageTitle = encodeURIComponent(args.join(' '));

    if (!pageTitle) {
      return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗉𝖺𝗀𝖾 𝗍𝗂𝗍𝗅𝖾.', event.threadID, event.messageID);
    }

    const processingMessage = await api.sendMessage('⏳ | 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...', event.threadID);

    const response = await axios.get(`https://wikipedia2.august-api.repl.co/wiki/${pageTitle}`);
    const { title, extract, imageUrl, url, pageId, lastRevision, lastRevisionId } = response.data;

    await api.unsendMessage(processingMessage.messageID);

    if (!extract) {
      return api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 "${args.join(' ')}".`, event.threadID, event.messageID);
    }

    let path = __dirname + "/cache/wikipedia_image.jpg";
    let hasError = false;

    try {
      let imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(path, Buffer.from(imageResponse.data, "binary"));
    } catch (error) {
      console.error('Error fetching Wikipedia image:', error);
      hasError = true;
    }

    const message = `📖 | 𝗪𝗶𝗸𝗶𝗽𝗲𝗱𝗶𝗮 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻 𝗳𝗼𝗿 "${title}"\n━━━━━━━━━━━━━━━━━━━\n𝗧𝗜𝗧𝗟𝗘: ${title}\n𝗖𝗢𝗡𝗧𝗘𝗡𝗧: ${extract || '𝖭/𝖠'}\n\n𝗜𝗠𝗔𝗚𝗘 𝗨𝗥𝗟: ${imageUrl || '𝖭/𝖠'}\n𝗨𝗥𝗟: ${url || '𝖭/𝖠'}\n𝗣𝗔𝗚𝗘 𝗜𝗗: ${pageId || '𝖭/𝖠'}\n𝗟𝗔𝗦𝗧 𝗥𝗘𝗩𝗜𝗦𝗜𝗢𝗡: ${lastRevision || '𝖭/𝖠'}\n𝗟𝗔𝗦𝗧 𝗥𝗘𝗩𝗜𝗦𝗜𝗢𝗡 𝗜𝗗: ${lastRevisionId || '𝖭/𝖠'}`;

    if (!hasError) {
      return api.sendMessage(
        { body: message, attachment: fs.createReadStream(path) },
        event.threadID,
        event.messageID
      );
    } else {
      return api.sendMessage(
        { body: message },
        event.threadID,
        event.messageID
      );
    }
  } catch (error) {
    console.error('Error fetching Wikipedia information:', error);
    return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖶𝗂𝗄𝗂𝗉𝖾𝖽𝗂𝖺 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.', event.threadID);
  }
};