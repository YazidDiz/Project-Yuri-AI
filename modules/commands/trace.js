const axios = require("axios");

module.exports.config = {
  name: "trace",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Check IP information",
  commandCategory: "stalk",
  usages: "[ip_address]",
  cooldowns: 5,
  dependencies: "",
};

const adminName = "Réynél"; // Replace with your admin's name
const adminUID = "100080098527733"; // Replace with your admin's UID
const adminLink = "https://www.facebook.com/profile.php?id=100080098527733"; // Replace with your admin's profile link

module.exports.run = async function ({ api, args, event, __GLOBAL }) {
  const axios = require("axios");

  // Check if an IP address is provided
  if (!args[0]) {
    return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖾𝗇𝗍𝖾𝗋 𝖺𝗇 𝖨𝖯 𝖺𝖽𝖽𝗋𝖾𝗌𝗌 𝗍𝗈 𝖼𝗁𝖾𝖼𝗄.", event.threadID, event.messageID);
  }

  const ipAddress = args[0];

  try {
    const response = await axios.get(`http://ip-api.com/json/${ipAddress}?fields=66846719`);
    const infoip = response.data;

    if (infoip.status === "fail") {
      return api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋: ${infoip.message}`, event.threadID, event.messageID);
    }

    // Get the user's information (await the promise)
    const userInfo = await api.getUserInfo(event.senderID);
    const userObj = userInfo[event.senderID];

    const userName = userObj ? userObj.name || "𝖭𝖺𝗆𝖾 𝗇𝗈𝗍 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾" : "𝖭𝖺𝗆𝖾 𝗇𝗈𝗍 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾";
    const userUID = event.senderID;
    const userGender = userObj ? (userObj.gender === 1 ? "𝖬𝖺𝗅𝖾" : userObj.gender === 2 ? "𝖥𝖾𝗆𝖺𝗅𝖾" : "𝖦𝖾𝗇𝖽𝖾𝗋 𝗇𝗈𝗍 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾") : "𝖦𝖾𝗇𝖽𝖾𝗋 𝗇𝗈𝗍 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾";
    const userBirthday = userObj ? userObj.birthday || "𝖡𝗂𝗋𝗍𝗁𝖽𝖺𝗒 𝗇𝗈𝗍 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾" : "𝖡𝗂𝗋𝗍𝗁𝖽𝖺𝗒 𝗇𝗈𝗍 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾";

    // Determine user status (online, offline, idle)
    const userStatus = userObj ? (userObj.isOnline ? "𝖮𝗇𝗅𝗂𝗇𝖾 🟢" : "𝖮𝖿𝖿𝗅𝗂𝗇𝖾 🔴") : "𝖲𝗍𝖺𝗍𝗎𝗌 𝗇𝗈𝗍 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾";

    // Check friendship status (friends or not)
    const areFriends = userObj ? (userObj.isFriend ? "𝖸𝖾𝗌 ✅" : "𝖭𝗈 ❌") : "𝖥𝗋𝗂𝖾𝗇𝖽𝗌𝗁𝗂𝗉 𝗌𝗍𝖺𝗍𝗎𝗌 𝗇𝗈𝗍 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾";

    // Construct Facebook profile link
    const fbLink = `https://www.facebook.com/profile.php?id=${userUID}`;

    const geolocationInfo = `
🌍 | 𝗟𝗼𝗰𝗮𝘁𝗶𝗼𝗻: ${infoip.city}, ${infoip.regionName}, ${infoip.country}
🌐 |  𝗖𝗼𝗻𝘁𝗶𝗻𝗲𝗻𝘁: ${infoip.continent}
🏁 | 𝗖𝗼𝘂𝗻𝘁𝗿𝘆 𝗖𝗼𝗱𝗲: ${infoip.countryCode}
🌆 | 𝗥𝗲𝗴𝗶𝗼𝗻/𝗦𝘁𝗮𝘁𝗲: ${infoip.regionName}
🏙️ | 𝗖𝗶𝘁𝘆: ${infoip.city}
🌏 | 𝗗𝗶𝘀𝘁𝗿𝗶𝗰𝘁: ${infoip.district}
📮 | 𝗭𝗜𝗣 𝗰𝗼𝗱𝗲: ${infoip.zip}
🌐 | 𝗟𝗮𝘁𝗶𝘁𝘂𝗱𝗲: ${infoip.lat}
🌐 |  𝗟𝗼𝗻𝗴𝗶𝘁𝘂𝗱𝗲: ${infoip.lon}
⏰ | 𝗧𝗶𝗺𝗲𝘇𝗼𝗻𝗲: ${infoip.timezone}
🏢 | 𝗢𝗿𝗴𝗮𝗻𝗶𝘇𝗮𝘁𝗶𝗼𝗻: ${infoip.org}
💰 | 𝗖𝘂𝗿𝗿𝗲𝗻𝗰𝘆: ${infoip.currency}
━━━━━━━━━━━━━━━━━━━
𝗨𝘀𝗲𝗿 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻:
👤 | 𝗨𝘀𝗲𝗿 𝗡𝗮𝗺𝗲: ${userName}
🆔 | 𝗨𝘀𝗲𝗿 𝗨𝗜𝗗: ${userUID}
🧍 | 𝗚𝗲𝗻𝗱𝗲𝗿: ${userGender}
🎂 | 𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆: ${userBirthday}
⏳ | 𝗦𝘁𝗮𝘁𝘂𝘀: ${userStatus}
🤝 | 𝗙𝗿𝗶𝗲𝗻𝗱𝘀: ${areFriends}
🌐 | 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗣𝗿𝗼𝗳𝗶𝗹𝗲: ${fbLink}
━━━━━━━━━━━━━━━━━━━
𝗔𝗱𝗺𝗶𝗻 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻:
👤 | 𝗔𝗱𝗺𝗶𝗻 𝗡𝗮𝗺𝗲: ${adminName}
🆔 | 𝗔𝗱𝗺𝗶𝗻 𝗨𝗜𝗗: ${adminUID}
🔗 | 𝗔𝗱𝗺𝗶𝗻 𝗣𝗿𝗼𝗳𝗶𝗹𝗲: ${adminLink}
━━━━━━━━━━━━━━━━━━━
𝗟𝗼𝗰𝗮𝘁𝗶𝗼𝗻 𝗠𝗮𝗽:
🗺️ | [𝗩𝗶𝗲𝘄 𝗼𝗻 𝗠𝗮𝗽](https://www.google.com/maps?q=${infoip.lat},${infoip.lon})
`;

    return api.sendMessage(geolocationInfo, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝗋𝖾𝗊𝗎𝖾𝗌𝗍.", event.threadID, event.messageID);
  }
};