const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

module.exports.config = {
  name: 'aestheticquote',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'Generate a customized quote image.',
  commandCategory: 'edit-img',
  usages: ['[text] = [author]'],
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const input = args.join(' ').split('=');

  if (input.length !== 2) {
    api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗎𝗍 𝗌𝗈𝗆𝖾 𝗍𝖾𝗑𝗍 [𝗒𝗈𝗎𝗋 𝗍𝖾𝗑𝗍] = [𝖺𝗎𝗍𝗁𝗈𝗋]\n\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n 𝖲𝗈𝗆𝖾𝗍𝗂𝗆𝖾𝗌 𝗂𝗍 𝗁𝗎𝗋𝗍𝗌 = 𝖢𝗅𝖺𝗋𝗄', threadID, messageID);
    return;
  }

  const [quoteText, authorName] = input.map((item) => item.trim());

  const words = quoteText.split(' ');
  if (words.length > 25) {
    api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗊𝗎𝗈𝗍𝖾 𝗍𝖾𝗑𝗍 𝗆𝗎𝗌𝗍 𝖻𝖾 𝟤𝟧 𝗐𝗈𝗋𝖽𝗌 𝗈𝗋 𝗅𝖾𝗌𝗌 𝗈𝗇𝗅𝗒.', threadID, messageID);
    return;
  }

  try {
    const backgroundLinks = [
      'https://i.postimg.cc/G3WNFpch/7b6eb20bccd6d9d97027e0e0650e350e.jpg',
      'https://i.postimg.cc/kMQNHMQ5/87ee51adca4b4c74b5d97089d67159d0.jpg',
      'https://i.postimg.cc/Kj01yWc0/a974ffafa41e455bcaea2299119dadfc.jpg',
      'https://i.postimg.cc/3Jy8RNt8/8fad3805fb3efb7bcff8548ff4221578.jpg',
      'https://i.postimg.cc/d0QtJBXX/cc96260ae6a0ff546a6dd1bb768cdec8.jpg',
      'https://i.postimg.cc/cCypL1CH/20264bf8afa0f50fa5438a7c54e8ea66.jpg',
      'https://i.postimg.cc/zfH2Hm9R/bdf07420724bebac14e6265d3c7af289.jpg',
      'https://i.postimg.cc/zBcftgxQ/9b54a151021d03ef1f0c66c7990bd932.jpg',
      'https://i.postimg.cc/qMXN0zqN/744f898fa054f4fe858586ae8d75fca1.jpg',
      'https://i.postimg.cc/jdKj8tct/dbe1d5f1fe60b51f693f801da1e0b41a.jpg',
      'https://i.postimg.cc/SsCyrvzn/165a712429c6fd2a87be9ee62a184591.jpg',
      'https://i.postimg.cc/26RYV7Xr/a5777f6a212c2479b7186c3c2587239b.jpg',
      'https://i.postimg.cc/R0f55nC8/0862e19e74bd77275d1742009f3262fd.jpg',
      'https://i.postimg.cc/R0f55nC8/0862e19e74bd77275d1742009f3262fd.jpg',
      'https://i.postimg.cc/ry9d2DKK/423cab6ce6fc5f88a7c87ff1d0c44710.jpg',
      'https://i.postimg.cc/yx688TkW/835c7646bac895ed6f7c962b12198b3c.jpg',
      'https://i.postimg.cc/4dWTBRxN/1e021ed3df7a2bc0a32414a2147ee309.jpg',
      'https://i.postimg.cc/c1zpHmKj/e24bb1e4acc51c932fbc2516afcef1b3.jpg',
      'https://i.postimg.cc/yNQHTzd6/b37aff20822079e780e40fb34b91677b.jpg',
      'https://i.postimg.cc/WbGcHZ3H/1b211280d90596a82922286f4c366627.jpg',
      'https://i.postimg.cc/v8nJ4nWZ/eb4604a0b7be1fdced9dad68768e49b0.jpg',
      'https://i.postimg.cc/NjjCk2rT/d51aaf23c403c750e78a35e82223d231.jpg',
      'https://i.postimg.cc/y6hfqymc/1876eb8d0229790e8622ed0de62b81f3.jpg',
      'https://i.postimg.cc/zvqFD4CW/1bd3f019ea943eddfb5a182eccf3e39c.jpg',
      'https://i.postimg.cc/RVsL9sN6/5987cdfd694568f4969ff7e8ad8c8775.jpg',
      'https://i.postimg.cc/C1gjJ96t/693249283f6705a6b8fd8e8ac27200de.jpg',
      'https://i.postimg.cc/Cxnk0w3X/7a597e7e1d64fcd1b000f6c113eecc44.jpg',
      'https://i.postimg.cc/DZ6b60GJ/be0128c8deb8c4c1247fb3cb297ad711.jpg',
      'https://i.postimg.cc/QxHWgXdC/249a75b4d80692e13e8f7d02e1ae7156.jpg',
      'https://i.postimg.cc/qMMQTgHj/11c38f041c5da1b64ab58525ca00f49c.jpg',
      'https://i.postimg.cc/fRVKVFLd/1836ebe991181c6af5f961f98584527f.jpg',
      'https://i.postimg.cc/4dQbCR8D/a7a385de8e59d1d031c6d0297016bc03.jpg',
      'https://i.postimg.cc/8C8hjzx8/e8ea19d5f3f4f3949402ff854d6b574c.jpg',
      'https://i.postimg.cc/Pr9DRqXL/2fb90fae9160be272365e3faaa475968.jpg',
      'https://i.postimg.cc/Dzdb0dqs/49e024d7d35c6f291b44acc089682976.jpg',
      'https://i.postimg.cc/Qtf9k8Yd/5f33dedbdddb3209ebc6d6429b17fe30.jpg',
      'https://i.postimg.cc/8knf7Cry/46c5b06a29c71e0b60a63bd188dfa10f.jpg',
      'https://i.postimg.cc/tgyYKZLg/6d009cd86d8afc920c78a1c0d019cdb0.jpg',
      'https://i.postimg.cc/xjWHsCTX/a5e241a8aef037a79ff64a031253d0a8.jpg',
      'https://i.postimg.cc/tCW68jY2/169e2ed4e09bbc94f7ac0ba3be2d0ad7.jpg',
      'https://i.postimg.cc/JzQk453X/be21b223a65c71bcd7fea98edb632697.jpg',
    ];
    
    const randomBackground = backgroundLinks[Math.floor(Math.random() * backgroundLinks.length)];

    const background = await loadImage(randomBackground);
      
    const canvas = createCanvas(background.width, background.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = 'bold 29px Serif';
    ctx.fillStyle = '#FFFFFF';
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
    fs.writeFileSync('aesthetic.jpg', imageBuffer);

    api.sendMessage(
      {
        attachment: fs.createReadStream('aesthetic.jpg'),
        body: '✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾 𝗂𝗌 𝗒𝗈𝗎𝗋 𝖼𝗎𝗌𝗍𝗈𝗆𝗂𝗓𝖾𝖽 𝖺𝖾𝗌𝗍𝗁𝖾𝗍𝗂𝖼𝗊𝗎𝗈𝗍𝖾:',
      },
      threadID,
      messageID
    );

    fs.unlinkSync('aesthetic.jpg');
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝗂𝗆𝖺𝗀𝖾.', threadID, messageID);
  }
};