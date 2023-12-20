const axios = require("axios");
module.exports.config = {
  name: "randomuser",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Get information about a random fake user",
  commandCategory: "utilities",
  usages: "[randomuser]",
  cooldowns: 5
};

const apiEndpoint = "https://randomuser.me/api/";

module.exports.run = async function({ api, event }) {
  try {
    const response = await axios.get(apiEndpoint);
    const user = response.data.results[0];

    const userInfo = `꒷︶꒷꒥꒷‧𝗥𝗔𝗡𝗗𝗢𝗠︶꒷꒥꒷‧˚\n\n
𝗡𝗔𝗠𝗘: ${user.name.title} ${user.name.first} ${user.name.last}
𝗚𝗘𝗡𝗗𝗘𝗥: ${user.gender}
𝗟𝗢𝗖𝗔𝗧𝗜𝗢𝗡: ${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}
𝗘𝗠𝗔𝗜𝗟: ${user.email}
𝗨𝗦𝗘𝗥𝗡𝗔𝗠𝗘: ${user.login.username}
𝗗𝗔𝗧𝗘 𝗢𝗙 𝗕𝗜𝗥𝗧𝗛: ${user.dob.date} (𝗔𝗴𝗲: ${user.dob.age})
𝗣𝗛𝗢𝗡𝗘: ${user.phone}
𝗖𝗘𝗟𝗟: ${user.cell}
𝗡𝗔𝗧𝗜𝗢𝗡𝗔𝗟𝗜𝗧𝗬: ${user.nat}
    `;

    api.sendMessage(userInfo, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗋𝖺𝗇𝖽𝗈𝗆 𝗎𝗌𝖾𝗋 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇. 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", event.threadID, event.messageID);
    console.error("RandomUser API Error:", error.message);
  }
};