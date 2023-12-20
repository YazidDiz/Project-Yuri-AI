const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

module.exports.config = {
  name: 'myquote',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'Generate a customized quote image.',
  commandCategory: 'edit-img',
  usages: '[text] = [author]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const input = args.join(' ').split('=');

  if (input.length !== 2) {
    api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗈 𝗁𝗌𝖾 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽, 𝗌𝗂𝗆𝗉𝗅𝗒 𝗍𝗒𝗉𝖾 “𝗆𝗒𝗊𝗎𝗈𝗍𝖾 [𝗍𝖾𝗑𝗍] = [𝖺𝗎𝗍𝗁𝗈𝗋]”, 𝗐𝗁𝖾𝗋𝖾 [𝗍𝖾𝗑𝗍] 𝗂𝗌 𝗍𝗁𝖾 𝗊𝗎𝗈𝗍𝖾 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗌𝖺𝗏𝖾 𝖺𝗇𝖽 [𝖺𝗎𝗍𝗁𝗈𝗋] 𝗂𝗌 𝗍𝗁𝖾 𝗇𝖺𝗆𝖾 𝗈𝖿 𝗍𝗁𝖾 𝗉𝖾𝗋𝗌𝗈𝗇 𝗐𝗁𝗈 𝗌𝖺𝗂𝖽 𝗂𝗍. 𝖥𝗈𝗋 𝖾𝗑𝖺𝗆𝗉𝗅𝖾, 𝗍𝗈 𝗌𝖺𝗏𝖾 𝗍𝗁𝖾 𝗊𝗎𝗈𝗍𝖾 "𝖳𝗁𝖾 𝖻𝖾𝗌𝗍 𝖺𝗇𝖽 𝗆𝗈𝗌𝗍 𝖻𝖾𝖺𝗎𝗍𝗂𝖿𝗎𝗅 𝗍𝗁𝗂𝗇𝗀𝗌 𝗂𝗇 𝗍𝗁𝖾 𝗐𝗈𝗋𝗅𝖽 𝖼𝖺𝗇𝗇𝗈𝗍 𝖻𝖾 𝗌𝖾𝖾𝗇 𝗈𝗋 𝖾𝗏𝖾𝗇 𝗍𝗈𝗎𝖼𝗁𝖾𝖽 - 𝖳𝗁𝖾𝗒 𝗆𝗎𝗌𝗍 𝖻𝖾 𝖿𝖾𝗅𝗍 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝗁𝖾𝖺𝗋𝗍" ʙʏ ʜᴇʟᴇɴ ᴋᴇʟʟᴇʀ, ʏᴏᴜ ᴡᴏᴜʟᴅ ᴛʏᴘᴇ “ᴍʏǫᴜᴏᴛᴇ ᴛʜᴇ ʙᴇsᴛ ᴀɴᴅ ᴍᴏsᴛ ʙᴇᴀᴜᴛɪғᴜʟ ᴛʜɪɴɢs ɪɴ ᴛʜᴇ ᴡᴏʀʟᴅ ᴄᴀɴɴᴏᴛ ʙᴇ sᴇᴇɴ ᴏʀ ᴇᴠᴇɴ ᴛᴏᴜᴄʜᴇᴅ - ᴛʜᴇʏ ᴍᴜsᴛ ʙᴇ ғᴇʟᴛ ᴡɪᴛʜ ᴛʜᴇ ʜᴇᴀʀᴛ = ʜᴇʟᴇɴ ᴋᴇʟʟᴇʀ.”', threadID, messageID);
    return;
  }

  const [quoteText, authorName] = input.map((item) => item.trim());

  const words = quoteText.split(' ');
  if (words.length > 25) {
    api.sendMessage('sᴇɴsᴇɪ, ᴛʜᴇ ǫᴜᴏᴛᴇ ᴛᴇxᴛ ᴍᴜsᴛ ʙᴇ 25 ᴡᴏʀᴅs ᴏʀ ʟᴇss ᴏɴʟʏ.', threadID, messageID);
    return;
  }

  try {
    const backgroundLinks = [
      'https://i.ibb.co/7k5G4Cn/20230924-203546-0000.png',
      'https://i.ibb.co/Q6Vg9k3/20230924-203433-0000.png',
      'https://i.ibb.co/cQwTTzb/20230924-203343-0000.png',
      'https://i.ibb.co/PYXBNvM/20230924-203234-0000.png',
      'https://i.ibb.co/Ch1v2s1/20230924-203042-0000.png',
      'https://i.ibb.co/WzbVG31/20230924-202920-0000.png',
      'https://i.ibb.co/ZG6XLws/20230924-202753-0000.png',
      'https://i.ibb.co/BKVKBS3/20230924-202608-0000.png',
      'https://i.ibb.co/PZyMpj2/20230924-202445-0000.png',
      'https://i.ibb.co/7GpLnzP/Reminder-Aesthetic-Pastel-Brown-Instagram-Post-20230924-202211-0000.png',
      'https://i.ibb.co/BZPmKz1/Reminder-Aesthetic-Pastel-Brown-Instagram-Post-20230924-201857-0000.png',
      'https://i.ibb.co/bshdcZW/Reminder-Aesthetic-Pastel-Brown-Instagram-Post-20230924-201645-0000.png',
      'https://i.ibb.co/G2WZdDD/20230924-201551-0000.png',
      'https://i.ibb.co/dbQML7Z/20230924-201412-0000.png',
      'https://i.ibb.co/kxKwdzW/20230924-201310-0000.png',
      'https://i.ibb.co/WDk0cTQ/20230924-201208-0000.png',
      'https://i.ibb.co/7WZ4xmf/20230924-201001-0000.png',
      'https://i.ibb.co/zSFszcV/20230924-200909-0000.png',
      'https://i.ibb.co/bbRbH45/20230924-200801-0000.png',
      'https://i.ibb.co/2WxRgVZ/Reminder-Aesthetic-Pastel-Brown-Instagram-Post-20230924-200715-0000.png',
      'https://i.ibb.co/C9cwyLb/20230924-200236-0000.png',
      'https://i.ibb.co/jZ1B4D3/20230924-195825-0000.png',
      'https://i.ibb.co/1q8FD15/20230924-195728-0000.png',
      'https://i.ibb.co/FxJ2HhZ/20230924-195432-0000.png',
      'https://i.ibb.co/5GTbxpC/Blue-White-Simple-Quotes-of-the-Day-Instagram-Post-20230924-195305-0000.png',
      'https://i.ibb.co/xMCj0qP/Blue-White-Simple-Quotes-of-the-Day-Instagram-Post-20230924-195220-0000.png',
      'https://i.ibb.co/80XMR2V/20230924-194848-0000.png',
      'https://i.ibb.co/wMFrJXW/Blue-White-Simple-Quotes-of-the-Day-Instagram-Post-20230924-194728-0000.png',
      'https://i.ibb.co/xF4TYyQ/20230924-194403-0000.png',
      'https://i.ibb.co/6yJKBqr/20230924-193826-0000.png',
      'https://i.ibb.co/RbKrnmr/20230924-192944-0000.png',
      'https://i.ibb.co/w6phW2j/20230924-192825-0000.png',
      'https://i.ibb.co/WxshKFG/20230924-192339-0000.png',
      'https://i.ibb.co/XL09Rhx/20230924-192151-0000.png',
      'https://i.ibb.co/Prfw0YK/Blue-White-Simple-Quotes-of-the-Day-Instagram-Post-20230924-163002-0000.png',
      'https://i.ibb.co/t8jyKZJ/20230924-203919-0000.png',
      'https://i.ibb.co/nCHMwhw/20230924-162719-0000.png',
      'https://i.ibb.co/RHMDL80/20230924-160916-0000.png',
      'https://i.ibb.co/tsthDKL/Blue-White-Simple-Quotes-of-the-Day-Instagram-Post-20230924-160837-0000.png',
      'https://i.ibb.co/3TccD77/Blue-White-Simple-Quotes-of-the-Day-Instagram-Post-20230924-160405-0000.png',
      'https://i.ibb.co/XycJKHy/20230924-154106-0000.png',
    ];
    
    const randomBackground = backgroundLinks[Math.floor(Math.random() * backgroundLinks.length)];

    const background = await loadImage(randomBackground);
      
    const canvas = createCanvas(background.width, background.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = 'bold 29px Serif';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const maxLineWidth = 300;
    const lineHeight = 35;
    const lines = [];
    let line = '';

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

    ctx.font = '25px Times New Roman';
    ctx.fillText(`${authorName}`, canvas.width / 2, canvas.height - 49);

    const imageBuffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync('quote.jpg', imageBuffer);

    api.sendMessage(
      {
        attachment: fs.createReadStream('quote.jpg'),
        body: 'sᴇɴsᴇɪ, ʜᴇʀᴇ ɪs ʏᴏᴜʀ ᴄᴜsᴛᴏᴍɪᴢᴇᴅ ǫᴜᴏᴛᴇ:',
      },
      threadID,
      messageID
    );

    fs.unlinkSync('quote.jpg');
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | ɢᴏᴍᴇɴɴᴀsᴀɪ sᴇɴsᴇɪ, ʙᴜᴛ ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ɢᴇɴᴇʀᴀᴛɪɴɢ ᴛʜᴇ ɪᴍᴀɢᴇ.', threadID, messageID);
  }
};