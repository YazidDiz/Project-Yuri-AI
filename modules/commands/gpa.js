const axios = require("axios");
module.exports.config = {
  name: "gradeperav",
  version: "1.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Calculate GPA",
  commandCategory: "education",
  usages: "highschool [grade]", "college [GPA]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    const type = args[0];
    const value = args[1];

    if (!type || !value) {
        return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗎𝗌𝖺𝗀𝖾! 𝖠𝗇 𝖾𝗑𝖺𝗆𝗉𝗅𝖾 𝗐𝗈𝗎𝗅𝖽 𝖻𝖾: '>𝗀𝗉𝖺 𝗁𝗂𝗀𝗁 𝗌𝖼𝗁𝗈𝗈𝗅 𝟫𝟪' 𝗈𝗋 '>𝗀𝗉𝖺 𝖼𝗈𝗅𝗅𝖾𝗀𝖾 𝟣.𝟤𝟢'", event.threadID, event.messageID);
    }

    try {
        let response;
        let result;

        if (type.toLowerCase() === "highschool") {
            response = await axios.get(`http://gpa.august-api.repl.co/calculateHighSchoolGPA?percentage=${value}`);
            result = response.data;

            let message = `🏫 𝗛𝗜𝗚𝗛 𝗦𝗖𝗛𝗢𝗢𝗟 𝗚𝗣𝗔 𝗖𝗔𝗟𝗖𝗨𝗟𝗔𝗧𝗜𝗢𝗡\n\n`;
            message += `𝗣𝗲𝗿𝗰𝗲𝗻𝘁𝗮𝗴𝗲: ${value}%\n`;
            message += `𝗘𝗾𝘂𝗶𝘃𝗮𝗹𝗲𝗻𝘁 𝗚𝗣𝗔: ${result.equivalentGPA}\n`;
            message += `𝗘𝗾𝘂𝗶𝘃𝗮𝗹𝗲𝗻𝘁 𝗥𝗮𝗻𝗴𝗲: ${result.equivalentRange}\n`;
            message += `𝗟𝗲𝘁𝘁𝗲𝗿 𝗘𝗾𝘂𝗶𝘃𝗮𝗹𝗲𝗻𝘁: ${result.letterEquivalent}\n`;
            message += `𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${result.description || "𝖭𝗈 𝖽𝖾𝗌𝖼𝗋𝗂𝗉𝗍𝗂𝗈𝗇 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾."}\n`;

            api.sendMessage(message, event.threadID, event.messageID);
        } else if (type.toLowerCase() === "college") {
            response = await axios.get(`http://gpa.august-api.repl.co/calculateCollegeGPA?grade=${parseFloat(value)}`);
            result = response.data;

            let message = `🎓 𝗖𝗢𝗟𝗟𝗘𝗚𝗘 𝗚𝗣𝗔 𝗖𝗔𝗟𝗖𝗨𝗟𝗔𝗧𝗜𝗢𝗡\n\n`;
            message += `𝗣𝗿𝗼𝘃𝗶𝗱𝗲𝗱 𝗚𝗣𝗔: ${value}\n`;
            message += `𝗔𝘃𝗲𝗿𝗮𝗴𝗲 𝗚𝗣𝗔: ${result.averageGPA}\n`;
            message += `𝗘𝗾𝘂𝗶𝘃𝗮𝗹𝗲𝗻𝘁 𝗥𝗮𝗻𝗴𝗲: ${result.equivalentRange}\n`;
            message += `𝗟𝗲𝘁𝘁𝗲𝗿 𝗘𝗾𝘂𝗶𝘃𝗮𝗹𝗲𝗻𝘁: ${result.letterEquivalent}\n`;
            message += `𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${result.description || "𝖭𝗈 𝖽𝖾𝗌𝖼𝗋𝗂𝗉𝗍𝗂𝗈𝗇 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾."}\n`;

            api.sendMessage(message, event.threadID, event.messageID);
        } else {
            api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖦𝖯𝖠 𝗍𝗒𝗉𝖾! 𝖴𝗌𝖾 '𝗁𝗂𝗀𝗁𝗌𝖼𝗁𝗈𝗈𝗅' 𝗈𝗋 '𝖼𝗈𝗅𝗅𝖾𝗀𝖾'.", event.threadID, event.messageID);
        }
    } catch (error) {
        console.error("Error:", error);
        api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖼𝖺𝗅𝖼𝗎𝗅𝖺𝗍𝗂𝗇𝗀 ${type === "highschool" ? "High School" : "College"} 𝖦𝖯𝖠`, event.threadID, event.messageID);
    }
};
}