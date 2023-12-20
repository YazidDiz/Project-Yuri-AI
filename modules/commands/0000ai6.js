const axios = require('axios');

module.exports.config = {
  name: 'ai6',
  version: '1.0.5',
  hasPermssion: 0,
  credits: 'Réynél',
  description: 'An AI powered with Image recognition!',
  commandCategory: 'ai',
  usages: 'Ai [prompt] | Ai [reply_to_an_image]',
  cooldowns: 10,
};

module.exports.run = async function({ api, event, args }) {
  const prompt = args.join(' ');
  const res = await axios.post('https://main.yanmaglinte.repl.co/api');
  const data = res.data;
  const API = data.apis;
  api.setMessageReaction("🔍", event.messageID, () => { }, true);

  let credits = this.config.credits;

  if (!prompt) {
    api.sendMessage('👋 | 𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗁𝗈𝗐 𝗆𝖺𝗒 𝖨 𝗁𝖾𝗅𝗉 𝗒𝗈𝗎 𝗂𝗇 𝗍𝗁𝗂𝗌 𝗍𝗂𝗆𝖾?', event.threadID, event.messageID);
    api.setMessageReaction("👋", event.messageID, () => { }, true);
    return
  }

  if (event.type === 'message_reply' && event.messageReply.attachments) {
    const attachment = event.messageReply.attachments[0];
    if (attachment.type === 'photo') {
      const image_url = attachment.url;

      try {
        const response = await axios.post(API + '/ocr', {
          prompt: prompt,
          image_url: image_url,
          credits: credits
        });

        const data = response.data;
        const output = data.result;
        api.sendMessage(output, event.threadID, event.messageID);
      api.setMessageReaction("✅", event.messageID, () => { }, true);
      } catch (error) {
        api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗌𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀 𝗐𝖾𝗇𝗍 𝗐𝗋𝗈𝗇𝗀!', event.threadID, event.messageID);
        api.setMessageReaction("❎", event.messageID, () => { }, true);
      }
      return;
    }
  }

  try {
    const response = await axios.post(API + '/gpt', {
      prompt: prompt,
      credits: credits
    });

    const data = response.data;
    const output = data.result;
    api.sendMessage(output, event.threadID, event.messageID);
    api.setMessageReaction("✅", event.messageID, () => { }, true);
  } catch (error) {
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗌𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀 𝗐𝖾𝗇𝗍 𝗐𝗋𝗈𝗇𝗀!', event.threadID, event.messageID);
    api.setMessageReaction("❎", event.messageID, () => { }, true);
  }
};