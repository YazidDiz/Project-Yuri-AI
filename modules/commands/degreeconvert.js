module.exports.config = {
    name: "degreeconvert",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Réynél",
    description: "Converts between different units of temperature",
    commandCategory: "education",
    usages: "<value> <source unit> to <target unit>",
    cooldowns: 5,
};

const conversions = {
    "rankine": 5/9,
    "degreecelsius": 1,
    "degreereaumur": 5/4,
    "degreefahrenheit": 5/9,
    "kelvin": 1,
};

const shortestAbbreviations = {
    "degreerankine": "°R",
    "degreecelsius": "°C",
    "degreereaumur": "°Re",
    "degreefahrenheit": "°F",
    "kelvin": "K",
};

module.exports.run = function({ api, event, args }) {
    if (args.length !== 4 || args[2].toLowerCase() !== "to") {
        return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖿𝗈𝗋𝗆𝖺𝗍! 𝖴𝗌𝖾: <𝗏𝖺𝗅𝗎𝖾> <𝗌𝗈𝗎𝗋𝖼𝖾 𝗎𝗇𝗂𝗍> 𝗍𝗈 <𝗍𝖺𝗋𝗀𝖾𝗍 𝗎𝗇𝗂𝗍>", event.threadID);
    }

    const value = parseFloat(args[0]);
    if (isNaN(value)) {
        return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗏𝖺𝗅𝗎𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾𝖽", event.threadID);
    }

    const sourceUnit = args[1].toLowerCase();
    const targetUnit = args[3].toLowerCase();

    const sourceUnitFull = Object.keys(shortestAbbreviations).find(key => shortestAbbreviations[key] === sourceUnit);
    const targetUnitFull = Object.keys(shortestAbbreviations).find(key => shortestAbbreviations[key] === targetUnit);

    const useSourceUnit = sourceUnitFull || conversions.hasOwnProperty(sourceUnit);
    const useTargetUnit = targetUnitFull || conversions.hasOwnProperty(targetUnit);

    if (!useSourceUnit || !useTargetUnit) {
        return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗎𝗇𝗂𝗍𝗌 𝗉𝗋𝗈𝗏𝗂𝖽𝖾𝖽", event.threadID);
    }

    const conversionFactor = conversions[targetUnitFull || targetUnit] / conversions[sourceUnitFull || sourceUnit];
    const convertedValue = value * conversionFactor;

    const sourceAbbreviation = shortestAbbreviations[sourceUnitFull || sourceUnit];
    const targetAbbreviation = shortestAbbreviations[targetUnitFull || targetUnit];

    const computationFormula = `${value}${sourceAbbreviation} → ${convertedValue.toFixed(6)}${targetAbbreviation}`;
    const resultMessage = `🌡️ | 𝗗𝗲𝗴𝗿𝗲𝗲 𝗖𝗼𝗻𝘃𝗲𝗿𝘀𝗶𝗼𝗻:\n\n${computationFormula}`;

    api.sendMessage(resultMessage, event.threadID);
};
      