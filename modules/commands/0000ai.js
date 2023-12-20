const shiro = process.env['shiro']

module.exports.config = {
    name: "ai",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "Réynél",
    description: "Ask AI [best for answering school subjects]",
    commandCategory: "ai",
    usages: "[Ask Anything]",
    cooldowns: 5,
    dependencies: {
        "openai": ""
    }
};

module.exports.run = async function({ api, event, args }) {
    const { Configuration, OpenAIApi } = require("openai");
    
    if (this.config.credits !== 'Réynél') {
        return api.sendMessage("⚠️ | 𝗪𝗔𝗥𝗡𝗜𝗡𝗚!!! 𝗖𝗛𝗔𝗡𝗚𝗜𝗡𝗚 𝗖𝗥𝗘𝗗𝗜𝗧𝗦 𝗜𝗦 𝗣𝗥𝗢𝗛𝗜𝗕𝗜𝗧𝗘𝗗⚠️⚠️⚠️⚠️", event.threadID, event.messageID);
    }

    const configuration = new Configuration({
        apiKey: `${shiro}`, // Make you own secret API key named shiro
    });

    const openai = new OpenAIApi(configuration);

    let data = args.join(" ");

    if (data.length < 2) {
        api.sendMessage("👋 | 𝖪𝗈𝗇𝗇𝗂𝖼𝗁𝗂𝗐𝖺 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖼𝖺𝗇 𝖺𝗌𝗄 𝗆𝖾 𝖺𝗇𝗒𝗍𝗁𝗂𝗇𝗀. 𝖨 𝖼𝖺𝗇 𝗁𝖾𝗅𝗉 𝗒𝗈𝗎 𝗐𝗂𝗍𝗁 𝖺𝗅𝗅 𝗈𝖿 𝗒𝗈𝗎𝗋 𝗌𝗎𝖻𝗃𝖾𝖼𝗍𝗌, 𝗆𝖺𝗄𝖾 𝖺𝗇 𝖾𝗌𝗌𝖺𝗒 𝖿𝗈𝗋 𝗒𝗈𝗎, 𝖺𝗇𝖽 𝗆𝗈𝗋𝖾...", event.threadID);
    } else {
        try {
            const completion = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: args.join(" "),
                temperature: 0.5,
                max_tokens: 2000,
                top_p: 0.3,
                frequency_penalty: 0.5,
                presence_penalty: 0.0,
            });

            api.sendMessage(completion.data.choices[0].text, event.threadID, event.messageID);
        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            } else {
                console.log(error.message);
                api.sendMessage(error.message, event.threadID);
            }
        }
    }
};
