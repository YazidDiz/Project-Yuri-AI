const axios = require('axios');

module.exports.config = {
  name: "nglspam2",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Clark",
  description: "Send a message using user",
  commandCategory: "facebook",
  usages: "[username] [message] [amount]",
};

module.exports.run = async ({ api, event, args }) => {
  const nglusername = args[0];
  const message = args.slice(1, -1).join(' ');
  const amount = args[args.length - 1]; 

  if (!nglusername || !message || !amount) {
    return api.sendMessage("❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖿𝗈𝗋𝗆𝖺𝗍. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗎𝗌𝖾 /𝗇𝗀𝗅 [𝗎𝗌𝖾𝗋𝗇𝖺𝗆𝖾] [𝗆𝖾𝗌𝗌𝖺𝗀𝖾] [𝖺𝗆𝗈𝗎𝗇𝗍]", event.threadID);
  }

  try {
    const headers = {
      'referer': `https://ngl.link/${nglusername}`,
      'accept-language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
    };

    const data = {
      'username': nglusername,
      'question': message,
      'deviceId': 'ea356443-ab18-4a49-b590-bd8f96b994ee',
      'gameSlug': '',
      'referrer': '',
    };

    let value = 0;
    for (let i = 0; i < amount; i++) {
      await axios.post('https://ngl.link/api/submit', data, {
        headers,
      });
      value += 1;
      console.log(`[+] Send => ${value}`);
    }

    api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗌𝖾𝗇𝗍 ${amount} 𝗆𝖾𝗌𝗌𝖺𝗀𝖾(𝗌) 𝗍𝗈 ${nglusername} 𝗍𝗁𝗋𝗈𝗎𝗀𝗁 𝗇𝗀𝗅.𝗅𝗂𝗇𝗄.`, event.threadID);
  } catch (error) {
    console.log(error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗍𝗁𝖾 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗍𝗁𝗋𝗈𝗎𝗀𝗁 𝗇𝗀𝗅.𝗅𝗂𝗇𝗄.", event.threadID);
  }
};