const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports.config = {
  name: "quote2",
  version: "1.0.0",
  credits: "Clark",
  hasPermission: 0,
  description: "Get a quote based on category or see available categories.",
  commandCategory: "quotes",
  usages: "[category]",
  cooldowns: 3,
};
module.exports.run =  async function ({ api, event, args }) {
    const apiKey = "0Hr3RnpBTgQvQ9np4ibDrQ==CkYJq9yAT5yk6vIn";
    const apiUrl = "https://api.api-ninjas.com/v1/quotes?category=";

    const categories = [
      "age", "alone", "amazing", "anger", "architecture",
      "art", "attitude", "beauty", "best", "birthday",
      "business", "car", "change", "communications", "computers",
      "cool", "courage", "dad", "dating", "death",
      "design", "dreams", "education", "environmental", "equality",
      "experience", "failure", "faith", "family", "famous",
      "fear", "fitness", "food", "forgiveness", "freedom",
      "friendship", "funny", "future", "god", "good",
      "government", "graduation", "great", "happiness", "health",
      "history", "home", "hope", "humor", "imagination",
      "inspirational", "intelligence", "jealousy", "knowledge", "leadership",
      "learning", "legal", "life", "love", "marriage",
      "medical", "men", "mom", "money", "morning",
      "movies", "success"
    ];

    if (args.length === 0) {
      
      const categoryList = categories.join(', ');
      return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖼𝖺𝗍𝖾𝗀𝗈𝗋𝗂𝖾𝗌:\n━━━━━━━━━━━━━━━━━━━\n${categoryList}\n━━━━━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
    }

    const category = args[0].toLowerCase();

    if (!categories.includes(category)) {
      return api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖼𝖺𝗍𝖾𝗀𝗈𝗋𝗒.\n𝖠𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖼𝖺𝗍𝖾𝗀𝗈𝗋𝗂𝖾𝗌:\n━━━━━━━━━━━━━━━━━━━\n${categories.join(', ')}\n━━━━━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
    }

    const url = `${apiUrl}${category}`;

    try {
      const response = await axios.get(url, { headers: { "X-API-KEY": apiKey } });
      const quoteData = response.data[0];

      if (quoteData) {
        const { quote, author } = quoteData;

        
        const backgroundLinks = [
          'https://i.imgur.com/D6GVV0f.jpg',
            'https://i.imgur.com/jU8JbnC.jpg',
            'https://i.imgur.com/K0efomc.jpg',
            'https://i.imgur.com/PNgp2ky.jpg',
            'https://i.imgur.com/wNyF1Y5.jpg',
            'https://i.imgur.com/CGFSvAF.jpg',
            'https://i.imgur.com/IBAkTZ3.jpg',
            'https://i.imgur.com/baXponl.jpg',
            'https://i.imgur.com/ofS2U8T.jpg',
            'https://i.imgur.com/954gmww.jpg',
            'https://i.imgur.com/2aZUeQg.jpg',
            'https://i.imgur.com/t7hlTsh.jpg',
            'https://i.imgur.com/rs0Ykql.jpg',
            'https://i.imgur.com/hpiPBpl.jpg',
            'https://i.imgur.com/2Ao61Zd.jpg',
            'https://i.imgur.com/lz1G2Ap.jpg',
            'https://i.imgur.com/ARjFpon.jpg',
            'https://i.imgur.com/tcTDxMw.jpg',
            'https://i.imgur.com/XMEZs2V.jpg',
            'https://i.imgur.com/yKU2dIY.jpg',
        ];
        const randomBackground = backgroundLinks[Math.floor(Math.random() * backgroundLinks.length)];

        const background = await loadImage(randomBackground);
        const canvas = createCanvas(background.width, background.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.font = 'bold 29px Serif';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const maxLineWidth = 300;
        const lineHeight = 35;
        const lines = [];
        let line = '';

        const words = quote.split(' ');

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const testLineWidth = ctx.measureText(testLine).width;

          if (testLineWidth > maxLineWidth) {
            lines.push(line.trim());
            line = words[i] + ' ';
          } else {
            line = testLine;
          }
        }
        lines.push(line.trim());

        const textY = canvas.height / 2 - (lines.length - 1) * lineHeight / 2;
        lines.forEach((line, index) => {
          ctx.fillText(line, canvas.width / 2, textY + index * lineHeight);
        });

        const imageBuffer = canvas.toBuffer();
        const tempImageFilePath = path.join(os.tmpdir(), 'temp_quote.jpg');  

        fs.writeFileSync(tempImageFilePath, imageBuffer);

        api.sendMessage(
          {
            body: '✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾 𝗂𝗌 𝗒𝗈𝗎𝗋 𝗊𝗎𝗈𝗍𝖾:',
            attachment: fs.createReadStream(tempImageFilePath),
          },
          event.threadID,
          (err, messageInfo) => {
           
            fs.unlinkSync(tempImageFilePath);

            if (err) {
              console.error('Error sending message:', err);
              api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗍𝗁𝖾 𝗂𝗆𝖺𝗀𝖾.', event.threadID, event.messageID);
            }
          }
        );
      } else {
        return api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗊𝗎𝗈𝗍𝖾𝗌 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 𝖼𝖺𝗍𝖾𝗀𝗈𝗋𝗒: ${category}`, event.threadID, event.messageID);
      }
    } catch (error) {
      console.error(error);
      return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝗊𝗎𝗈𝗍𝖾. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", event.threadID, event.messageID);
  }
};