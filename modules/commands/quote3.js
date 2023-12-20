const axios = require('axios');

module.exports.config = {
  name: "quote3",
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
      return api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗏𝖺𝗅𝗂𝖽 𝖼𝖺𝗍𝖾𝗀𝗈𝗋𝗒.\n𝖠𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖼𝖺𝗍𝖾𝗀𝗈𝗋𝗂𝖾𝗌:\n━━━━━━━━━━━━━━━━━━━\n${categories.join(', ')}\n━━━━━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
    }

    const url = `${apiUrl}${category}`;

    try {
      const response = await axios.get(url, { headers: { "X-API-KEY": apiKey } });
      const quoteData = response.data[0];

      if (quoteData) {
        const { quote, author } = quoteData;
        return api.sendMessage(`❝${quote}❞\n━━━━━━━━━━━━━━━━━━━\n《${author}》`, event.threadID, event.messageID);
      } else {
        return api.sendMessage(`❎ | 𝗀𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗊𝗎𝗈𝗍𝖾𝗌 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 𝖼𝖺𝗍𝖾𝗀𝗈𝗋𝗒: ${category}`, event.threadID);
      }
    } catch (error) {
      console.error(error);
      return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝗊𝗎𝗈𝗍𝖾. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", event.threadID);
    }
};