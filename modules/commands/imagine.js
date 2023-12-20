const axios = require('axios');
const fs = require('fs-extra');

const models = [
  "0. Absolute Reality V16",
  "1. Absolute Reality V181",
  "2. Analog Diffusion 1.0",
  "3. Anything V3.0 (Pruned)",
  "4. Anything V4.5 (Pruned)",
  "5. Anything V5 (PrtRE)",
  "6. AOM3A3 Orange Mix",
  "7. Children's Stories V13D",
  "8. Children's Stories V1 Semi-Real",
  "9. Children's Stories V1 Toon Anime",
  "10. Cyberrealistic V33",
  "11. Deliberate V2",
  "12. Dreamlike Anime 1.0",
  "13. Dreamlike Diffusion 1.0",
  "14. Dreamlike Photoreal 2.0",
  "15. Dreamshaper 6 (Baked VAE)",
  "16. Dreamshaper 7",
  "17. Dreamshaper 8",
  "18. Edge of Realism Eor V20",
  "19. Eimis Anime Diffusion V1",
  "20. Elldreth's Vivid Mix",
  "21. Epic Realism Natural Sin RC1VAE",
  "22. I Can't Believe It's Not Photography Seco",
  "23. Juggernaut Aftermath",
  "24. Lyriel V16",
  "25. Mechamix V10",
  "26. Meinamix Meina V9",
  "27. Meinamix Meina V11",
  "28. Open Journey V4",
  "29. Portrait Plus V1.0",
  "30. Realistic Vision V1.4 (Pruned, FP16)",
  "31. Realistic Vision V2.0",
  "32. Realistic Vision V4.0",
  "33. Realistic Vision V5.0",
  "34. Redshift Diffusion V10",
  "35. Rev Animated V122",
  "36. Run DiffusionFX 25D V10",
  "37. Run DiffusionFX V10",
  "38. SD V1.4",
  "39. V1.5 (Pruned, Emaonly)",
  "40. Shonin's Beautiful V10",
  "41. The Ally's Mix II (Churned)",
  "42. Timeless 1.0",
  "43. ToonYou Beta 6"
];

module.exports.config = {
  name: 'imagine',
  version: '3.0',
  hasPermission: 0,
  credits: 'Réynél',
  description: 'Transform text into stunning AI-generated art using stable diffusion models.',
  commandCategory: 'generate',
  usages: '[prompt]:[model number]',
  cooldowns: 0,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const { threadID = "defaultThreadID", messageID = "defaultMessageID" } = event || {};
    let prompt = args.join(' ');
    let model = "0";

    if (prompt.includes(':')) {
      const parts = prompt.split(':');
      prompt = parts[0].trim();

      const parsedModel = parseInt(parts[1].trim());
      if (!isNaN(parsedModel) && parsedModel >= 0 && parsedModel < models.length) {
        model = parsedModel.toString();
      } else {
        return api.sendMessage(
          '❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗆𝗈𝖽𝖾𝗅 𝗇𝗎𝗆𝖻𝖾𝗋. 𝗄𝗂𝗇𝖽𝗅𝗒 𝗌𝗉𝖾𝖼𝗂𝖿𝗒 𝖺 𝗇𝗎𝗆𝖻𝖾𝗋 𝖻𝖾𝗍𝗐𝖾𝖾𝗇 𝟢 𝗈𝗋 𝟦𝟥.',
          threadID,
          messageID
        );
      }
    } else if (!prompt) {
      const modelsList = models.map((model, index) => `${model}`).join('\n');
      return api.sendMessage(
        'ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗉𝗋𝗈𝗆𝗉𝗍 𝖺𝗅𝗈𝗇𝗀 𝗐𝗂𝗍𝗁 𝖺 𝗆𝗈𝖽𝖾𝗅 𝗇𝗎𝗆𝖻𝖾𝗋 𝗂𝖿 𝖽𝖾𝗌𝗂𝗋𝖾𝖽.\n\n𝖨𝗆𝖺𝗀𝗂𝗇𝖾 {prompt}\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲: 𝗂𝗆𝖺𝗀𝗂𝗇𝖾 𝖺 𝖻𝖾𝖺𝗎𝗍𝗂𝖿𝗎𝗅 𝗀𝗂𝗋𝗅\n\n𝖨𝗆𝖺𝗀𝗂𝗇𝖾 {prompt}:{model number}\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲𝟮: 𝗂𝗆𝖺𝗀𝗂𝗇𝖾 𝖺 𝖻𝖾𝖺𝗎𝗍𝗂𝖿𝗎𝗅 𝗀𝗂𝗋𝗅:𝟦𝟥\n\n' +
        modelsList,
        threadID
      );
    }

    const processingMessage = await api.sendMessage(
      '✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨’𝗆 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍. 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...',
      threadID,
      null,
      messageID
    );

    const API = `https://aliestercrowley.com/api/crowgen.php?model=${model}&prompt=${encodeURIComponent(prompt)}`;

    const timeout = 20000;
    const imageStreamPromise = axios.get(API, { responseType: 'arraybuffer' });

    try {
      const imageStream = await Promise.race([
        imageStreamPromise,
        new Promise((_, reject) =>
          setTimeout(() => {
            api.unsendMessage(processingMessage.messageID);
            reject(new Error('API request timed out.'));
          }, timeout)
        ),
      ]);

      if (imageStream) {
        const path = __dirname + `/cache/imagine.png`;
        fs.writeFileSync(path, Buffer.from(imageStream.data, 'utf-8'));

        api.sendMessage(
          {
            attachment: fs.createReadStream(path),
          },
          threadID,
          () => {
            fs.unlinkSync(path);
            api.unsendMessage(processingMessage.messageID);
          },
          messageID
        );
      } else {

        api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗉𝗋𝗈𝗆𝗉𝗍. 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', threadID, messageID);
      }
    } catch (error) {

      console.error(error);
      api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗉𝗋𝗈𝗆𝗉𝗍. 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗉𝗋𝗈𝗆𝗉𝗍. 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', threadID, messageID);
  }
};