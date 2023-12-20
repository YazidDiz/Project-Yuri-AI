// Module exports configuration
module.exports.config = {
    name: "fixspam",
    version: "2.0.1",
    hasPermission: 1,
    credits: "Réynél",
    description: "Filter ornamental fish in the group",
    commandCategory: "group",
    usages: "[num]",
    cooldowns: 30
};

// Define an array of strings
const strings = [
    'getData', 'command here', 'exp', /* ... (truncated for brevity) */ 'adminIDs'
];

// Define a function for decoding strings
function decode(index) {
    return strings[index];
}

// Define a function to run the bot
module.exports.run = async function ({ api, event, args, Currencies }) {
    // Get the current thread information
    const threadInfo = await api.getThreadInfo(event.threadID);

    // Initialize variables
    let filteredUsers = [];
    let numToFilter = 0;

    // Check if a valid number of users to filter is provided
    if (!isNaN(args[0])) {
        numToFilter = args[0];
    } else {
        numToFilter = -1; // Default value if no valid number is provided
    }

    // Check if the bot is an admin in the group
    if (!threadInfo.userInfo.map(user => user.id).some(id => id === api.getCurrentUserID())) {
        // Send a message if the bot is not an admin
        return api.sendMessage('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨 𝗇𝖾𝖾𝖽 𝗍𝗈 𝖻𝖾 𝖺𝗇 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝗍𝗈𝗋 𝗍𝗈 𝖿𝗂𝗅𝗍𝖾𝗋 𝗆𝖾𝗆𝖻𝖾𝗋𝗌 𝖺𝗇𝖽 𝗌𝖾𝗇𝖽 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌.', event.threadID, event.messageID);
    }

    // Loop through the group members
    for (const member of threadInfo.userInfo) {
        // Get the user's balance
        const userBalance = await Currencies.getData(member.id);

        // Check if the user has a balance or if their balance is below the specified limit
        if (typeof userBalance.exp === 'undefined' || userBalance.exp <= numToFilter) {
            filteredUsers.push(member.id);
        }
    }

    // Remove filtered users from the group
    filteredUsers = filteredUsers.filter(userId => !threadInfo.userInfo.map(user => user.id).includes(userId));
    for (const userId of filteredUsers) {
        try {
            // Delay for a short period before removing each user
            await new Promise(resolve => setTimeout(resolve, 100));

            // Remove the user from the group
            await api.removeUserFromGroup(parseInt(userId), event.threadID);
            numToFilter++;
        } catch (error) {
            console.log(error.name + ': ' + error.message);
            // Handle any errors that occur during user removal (optional)
        }
    }

    // Send a message indicating the number of users removed
    if (numToFilter === 0) {
        return api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 𝗇𝗈 𝗈𝗋𝗇𝖺𝗆𝖾𝗇𝗍𝖺𝗅 𝖿𝗂𝗌𝗁 𝗐𝗂𝗍𝗁 𝖺 𝗅𝗂𝗆𝗂𝗍 𝗈𝖿 𝗅𝖾𝗌𝗌 𝗍𝗁𝖺𝗇 ${numToFilter} 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌.`, event.threadID);
    } else {
        return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖿𝗂𝗅𝗍𝖾𝗋𝖾𝖽 ${numToFilter} 𝗈𝗋𝗇𝖺𝗆𝖾𝗇𝗍𝖺𝗅 𝖿𝗂𝗌𝗁 𝗐𝗂𝗍𝗁 𝖺 𝗅𝗂𝗆𝗂𝗍 𝗈𝖿 𝗅𝖾𝗌𝗌 𝗍𝗁𝖺𝗇 ${numToFilter} 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌.`, event.threadID);
    }
};
