const axios = require('axios');

module.exports.config = {
  name: "mealsearch",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Search for meal recipes by name!",
  commandCategory: "searches",
  usages: "[meal name]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (!args[0]) {
      api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗍𝗁𝖾 𝗇𝖺𝗆𝖾 𝗈𝖿 𝗍𝗁𝖾 𝗆𝖾𝖺𝗅 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗌𝖾𝖺𝗋𝖼𝗁 𝖿𝗈𝗋.", event.threadID, event.messageID);
      return;
    }

    const mealName = encodeURIComponent(args.join(" "));

    const searchURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;

    const response = await axios.get(searchURL);

    if (response.data.meals && response.data.meals.length > 0) {
      const meal = response.data.meals[0];
      const mealDetails = formatMealDetails(meal);
      api.sendMessage(`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖿𝗈𝗎𝗇𝖽 𝖺 𝗆𝖾𝖺𝗅 𝖿𝗈𝗋 '${mealName}':\n\n${mealDetails}`, event.threadID, event.messageID);
    } else {
      api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝗆𝖾𝖺𝗅 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 '${mealName}'. 𝖳𝗋𝗒 𝖺 𝖽𝗂𝖿𝖿𝖾𝗋𝖾𝗇𝗍 𝗇𝖺𝗆𝖾!`, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error("Error searching for meal:", error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖿𝗈𝗋 𝗆𝖾𝖺𝗅. 𝖳𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗐𝗂𝗍𝗁 𝖺 𝖽𝗂𝖿𝖿𝖾𝗋𝖾𝗇𝗍 𝗇𝖺𝗆𝖾!", event.threadID, event.messageID);
  }
};

function formatMealDetails(meal) {
  let details = `⦿ 𝗡𝗔𝗠𝗘: ${meal.strMeal}\n⦿ 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗬: ${meal.strCategory}\n⦿ 𝗔𝗥𝗘𝗔: ${meal.strArea}\n`;
  details += `⦿ 𝗜𝗡𝗦𝗧𝗥𝗨𝗖𝗧𝗜𝗢𝗡𝗦: ${meal.strInstructions}\n\n⦿ 𝗜𝗡𝗚𝗥𝗘𝗗𝗜𝗘𝗡𝗧𝗦:\n`;

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && measure) {
      details += `    • ${ingredient} - ${measure}\n`;
    } else {
      break;
    }
  }

  return details;
}
