const axios = require('axios');
const fs = require('fs');
module.exports.config = {
  name: "memegenerator",
  version: "2.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Generate memes with various templates and custom text",
  commandCategory: "meme",
  usages: "[type] [toptext] [bottomtext] or [list]",
  cooldowns: 5
};

const memeTemplates = {
  "harrypotter": "Harry-Potter-Ok",
  "10guy": "10-Guy",
  "1950s": "1950s-Middle-Finger",
  "1990s": "1990s-First-World-Problems",
  "2ndtermobama": "2nd-Term-Obama",
  "afraidtoaskandy": "Afraid-To-Ask-Andy",
  "alienmeeting": "Alien-Meeting-Suggestion",
  "amitheonlyone": "Am-I-The-Only-One-Around-Here",
  "anristares": "Anri-Stares",
  "babycry": "Baby-Cry",
  "blackgirlwat": "Black-Girl-Wat",
  "bitchplease": "Bitch-Please",
  "buddychrist": "Buddy-Christ",
  "computerguy": "Computer-Guy",
  "clown": "Clown-Applying-Makeup",
  "confusedgranddad": "Confused-Granddad",
  "cutecat": "Cute-Cat",
  "dadjoke": "Dad-Joke",
  "disastergirl": "Disaster-Girl",
  "doge": "Doge-2",
  "epicuristkid": "Epicurist-Kid",
  "evilcown": "Evil-Cows",
  "expandingbrain": "Expanding-Brain",
  "woman&cat": "Woman-Yelling-At-Cat",
  "batman&robin": "Batman-Slapping-Robin",
  "changemymind": "Change-My-Mind",
  "burnkitty": "Burn-Kitty",
  "chubbybubbles": "Chubby-Bubbles-Girl",
  "distractedboyfriend": "Distracted-Boyfriend",
  "drake": "Drake-Bad-Good",
  "god": "God",
  "gollum": "Gollum",
  "goodfellas": "Good-Fellas-Hilarious",
  "otherwomen": "I-Bet-Hes-Thinking-About-Other-Women",
  "kevinhart": "Kevin-Hart",
  "leonardodicaprio": "Leonardo-Dicaprio-Cheers",
  "metaljesus": "Metal-Jesus",
  "monkeypuppet": "Monkey-Puppet",
  "omgcat": "OMG-Cat",
  "rollsafe": "Roll-Safe-Think-About-It",
  "sadpablo": "Sad-Pablo-Escobar",
  "smilingjesus": "Smiling-Jesus",
  "zuckerberg": "Zuckerberg",
  "askandy": "Afraid-To-Ask-Andy",
  // Add more templates as needed, paki-visit lang nitong website "https://apimeme.com"
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (!args[0]) {
      api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗆𝖾𝗆𝖾 𝗍𝗒𝗉𝖾 𝗈𝗋 𝗎𝗌𝖾 '𝖬𝖾𝗆𝖾𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗈𝗋 𝗅𝗂𝗌𝗍' 𝗍𝗈 𝗌𝖾𝖾 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝗍𝖾𝗆𝗉𝗅𝖺𝗍𝖾𝗌!", event.threadID, event.messageID);
      return;
    }

    const memeType = args[0].toLowerCase();

    if (memeType === "list") {
      const templateList = Object.keys(memeTemplates).map((template) => `- ${template}`).join("\n");
      api.sendMessage(`📜 | 𝖠𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝗆𝖾𝗆𝖾 𝗍𝖾𝗆𝗉𝗅𝖺𝗍𝖾:\n\n${templateList}`, event.threadID, event.messageID);
      return;
    }

    if (!memeTemplates[memeType]) {
      api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗆𝖾𝗆𝖾 𝗍𝗒𝗉𝖾.\n𝗨𝘀𝗲: '𝖬𝖾𝗆𝖾𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗈𝗋 𝗅𝗂𝗌𝗍' 𝗍𝗈 𝗌𝖾𝖾 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝗍𝖾𝗆𝗉𝗅𝖺𝗍𝖾𝗌.", event.threadID, event.messageID);
      return;
    }

    const topText = encodeURIComponent(args[1] || "");
    const bottomText = encodeURIComponent(args[2] || "");

    const memeURL = `https://apimeme.com/meme?meme=${memeTemplates[memeType]}&top=${topText}&bottom=${bottomText}`;

    const memeImage = await axios.get(memeURL, { responseType: 'arraybuffer' });

    fs.writeFileSync('meme.jpg', Buffer.from(memeImage.data));

    api.sendMessage(
      {
        attachment: fs.createReadStream('meme.jpg'),
        body: `🎉 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖼𝗎𝗌𝗍𝗈𝗆 ${memeType} 𝗆𝖾𝗆𝖾:`
      },
      event.threadID, event.messageID
    );

    fs.unlinkSync('meme.jpg');
  } catch (error) {
    console.error("Error generating meme:", error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝗆𝖾𝗆𝖾. 𝖳𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗐𝗂𝗍𝗁 𝖽𝗂𝖿𝖿𝖾𝗋𝖾𝗇𝗍 𝗍𝖾𝗑𝗍 𝗈𝗋 𝗍𝗒𝗉𝖾.", event.threadID, event.messageID);
  }
};