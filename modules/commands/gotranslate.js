const axios = require("axios");

module.exports.config = {
  name: "gotranslate",
  version: "1.3.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Translate text and get audio pronunciation",
  commandCategory: "translator",
  usages: "Gotranslate [language_from] - [language_to] [text]",
  cooldowns: 5,
  dependencies: {
    "path": "",
    "fs-extra": ""
  }
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { createReadStream, unlinkSync } = global.nodemodule["fs-extra"];
        const { resolve } = global.nodemodule["path"];
        const content = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");

        if (!content || content === "gotranslate") {
            const languageList = [
                "af - Afrikaans",
                "sq - Albanian",
                "ar - Arabic",
                "bn - Bengali",
                "bs - Bosnian",
                "bg - Bulgarian",
                "ca - Catalan",
                "zh - Chinese",
                "hr - Croatian",
                "cs - Czech",
                "da - Danish",
                "nl - Dutch",
                "en - English",
                "et - Estonian",
                "tl - Filipino",
                "fi - Finnish",
                "fr - French",
                "de - German",
                "el - Greek",
                "gu - Gujarati",
                "he - Hebrew",
                "hi - Hindi",
                "hu - Hungarian",
                "is - Icelandic",
                "id - Indonesian",
                "it - Italian",
                "ja - Japanese",
                "jw - Javanese",
                "kn - Kannada",
                "km - Khmer",
                "ko - Korean",
                "la - Latin",
                "lv - Latvian",
                "ms - Malay",
                "ml - Malayalam",
                "mr - Marathi",
                "my - Burmese",
                "ne - Nepali",
                "no - Norwegian",
                "nb - Norwegian Bokmål",
                "pl - Polish",
                "pt - Portuguese",
                "pa - Punjabi",
                "ro - Romanian",
                "ru - Russian",
                "sk - Slovak",
                "sr - Serbian",
                "si - Sinhala",
                "es - Spanish",
                "su - Sundanese",
                "sw - Swahili",
                "sv - Swedish",
                "ta - Tamil",
                "te - Telugu",
                "th - Thai",
                "tr - Turkish",
                "uk - Ukrainian",
                "ur - Urdu",
                "vi - Vietnamese",
            ];
            const languageText = "🌍 | 𝗟𝗜𝗦𝗧 𝗢𝗙 𝗦𝗨𝗣𝗣𝗢𝗥𝗧𝗘𝗗 𝗟𝗔𝗡𝗚𝗨𝗔𝗚𝗘𝗦\n\n" + languageList.join("\n");
            return api.sendMessage(languageText, event.threadID);
        }

        const languageRegex = /^([a-z]{2}) - ([a-z]{2}) (.+)/i;
        const match = content.match(languageRegex);

        if (!match) {
            return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖿𝗈𝗋𝗆𝖺𝗍!\n\n🎓 | 𝗨𝘀𝗮𝗴𝗲𝘀:\n𝗀𝗈𝗍𝗋𝖺𝗇𝗌𝗅𝖺𝗍𝖾 [𝗅𝖺𝗇𝗀𝗎𝖺𝗀𝖾_𝖿𝗋𝗈𝗆] - [𝗅𝖺𝗇𝗀𝗎𝖺𝗀𝖾_𝗍𝗈] [𝗍𝖾𝗑𝗍]", event.threadID);
        }

        const languageFrom = match[1];
        const languageTo = match[2];
        const textToTranslate = match[3];

        const translateAPI = "https://translate.googleapis.com/translate_a/single";
        const params = {
            client: "gtx",
            sl: languageFrom,
            tl: languageTo,
            dt: "t",
            q: textToTranslate,
        };

        const response = await axios.get(translateAPI, { params });
        const translationResult = response.data[0].map(sentence => sentence[0]).join(" ");

        const path = resolve(__dirname, 'cache', `${event.threadID}_${event.senderID}.mp3`);
        await global.utils.downloadFile(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(translationResult)}&tl=${languageTo}&client=tw-ob`, path);

        const translatedText = `🌍 | 𝗚𝗢𝗧𝗥𝗔𝗡𝗦𝗟𝗔𝗧𝗘\n━━━━━━━━━━━━━━━━━━━\n➤ 𝖳𝗋𝖺𝗇𝗌𝗅𝖺𝗍𝖾𝖽 ${languageFrom} 𝗍𝗈 ${languageTo}\n━━━━━━━━━━━━━━━━━━━\n➤  “${translationResult}”`;
        api.sendMessage({ attachment: createReadStream(path) }, event.threadID, () => unlinkSync(path));
        return api.sendMessage(translatedText, event.threadID);
    } catch (e) { return console.log(e) };
};
      