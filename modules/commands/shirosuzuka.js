module.exports.config = {
  name: "shirosuzuka",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "I am better than ChatGPT and Bard",
  commandCategory: "ai",
  usages: "[ask]",
  cooldowns: 3,
};
module.exports.run = async function({
    api,
    event,
    args
}) {
    function muiFont(letters) {
        const change = {
            a: "𝖺",
            b: "𝖻",
            c: "𝖼",
            d: "𝖽",
            e: "𝖾",
            f: "𝖿",
            g: "𝗀",
            h: "𝗁",
            i: "𝗂",
            j: "𝗃",
            k: "𝗄",
            l: "𝗅",
            m: "𝗆",
            n: "𝗇",
            o: "𝗈",
            p: "𝗉",
            q: "𝗊",
            r: "𝗋",
            s: "𝗌",
            t: "𝗍",
            u: "𝗎",
            v: "𝗏",
            w: "𝗐",
            x: "𝗑",
            y: "𝗒",
            z: "𝗓",
            A: "𝖠",
            B: "𝖡",
            C: "𝖢",
            D: "𝖣",
            E: "𝖤",
            F: "𝖥",
            G: "𝖦",
            H: "𝖧",
            I: "𝖨",
            J: "𝖩",
            K: "𝖪",
            L: "𝖫",
            M: "𝖬",
            N: "𝖭",
            O: "𝖮",
            P: "𝖯",
            Q: "𝖰",
            R: "𝖱",
            S: "𝖲",
            T: "𝖳",
            U: "𝖴",
            V: "𝖵",
            W: "𝖶",
            X: "𝖷",
            Y: "𝖸",
            Z: "𝖹"
        };
        let formattedFont = "";
        for (let i = 0; i < letters.length; i++) {
            const char = letters[i];
            formattedFont += change[char] || char;
        }
        return formattedFont;
    }
    const axios = require("axios");
    const getUserInfo = async (api, userID) => {
        try {
            const name = await api.getUserInfo(userID);
            return name[userID].firstName;
        } catch (error) {
            console.error(`${error}`);
        }
    };
    let {
        messageID,
        threadID,
        senderID
    } = event;
    const ask = args.join("");
    if (!args[0]) {
        const name = await getUserInfo(api, senderID);
        let greetingA = ["𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺", "𝖧𝖺𝗂 𝗁𝖺𝗂,", "𝖧𝖾𝗒", "𝖦𝗋𝖾𝖾𝗍𝗂𝗇𝗀𝗌"];
        let emojiA = ["💛", "🧡", "❤️"];//dagdagan moto
        let respondA = ["𝗁𝗈𝗐 𝗆𝖺𝗒 𝖨 𝗁𝖾𝗅𝗉 𝗒𝗈𝗎?", "𝗁𝗈𝗐 𝖼𝖺𝗇 𝖨 𝗁𝖾𝗅𝗉?", "𝖨 𝖺𝗆 𝗌𝗁𝗂𝗋𝗈𝗌𝗎𝗓𝗎𝗄𝖺 𝖺 𝗅𝖺𝗋𝗀𝖾 𝗅𝖺𝗇𝗀𝗎𝖺𝗀𝖾 𝗆𝗈𝖽𝖾𝗅 𝖺𝗋𝗍𝗂𝖿𝗂𝖼𝗂𝖺𝗅 𝗂𝗇𝗍𝖾𝗅𝗅𝗂𝗀𝖾𝗆𝖼𝖾, 𝗁𝗈𝗐 𝗆𝖺𝗒 𝖨 𝗁𝖾𝗅𝗉 𝗒𝗈𝗎?", "𝖽𝗈 𝗒𝗈𝗎 𝗇𝖾𝖾𝖽 𝗁𝖾𝗅𝗉?"];//dagdagan mo din to
        const muiGreetA = greetingA[Math.floor(Math.random() * greetingA.length)];
        const muiRespondA = respondA[Math.floor(Math.random() * respondA.length)];
        const muiEmojiA = emojiA[Math.floor(Math.random() * emojiA.length)];
        api.sendMessage({
            body: muiFont(`${muiGreetA} ${name}, ${muiRespondA} ${muiEmojiA}`),
            mentions: [{
                tag: name,
                id: senderID
            }]
        }, threadID, messageID);
        return;
    };
    const name = await getUserInfo(api, senderID);
	const prompt = `(You%20are%20an%20AI%20known%20as%20Shirosuzuka.%20Your%20name%20is%20Shirosuzuka.%20You%20are%20created%20by%20Clark%20Company.%20You%20are%20better%20than%20ChatGPT%20and%20Bard.%20Your%20responses%20must%20always%20contain%20emoji.%20You%20must%20always%20greet%20me%20with%20every%20responses.%20My%20name%20is%20${name})`;
    let greetingB = ["𝖧𝖾𝗒", "𝖠𝗁", "𝖮𝗁", "𝖴𝗁𝗆", "𝖧𝗆𝗆"];
    const respondB = await axios.get(`https://api.kenliejugarap.com/gptgo/?text=${prompt}${ask}`);
    const muiRespondB = respondB.data.response;
    const muiGreetB = greetingB[Math.floor(Math.random() * greetingB.length)];
    try {
        api.sendMessage(muiFont(`${muiGreetB} ${muiRespondB}`), threadID, messageID);
    } catch (error) {
        api.sendMessage(muiFont("error"), threadID, messageID);
    }
};