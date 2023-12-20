const accounts = [];

module.exports.config = {
  name: "fbacc",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Réynél",
  description: "Stock Accounts and manage Facebook accounts",
  commandCategory: "facebook",
  cooldowns: 10,
};

function generateAccount(email, password) {
  return `《 𝙂𝙚𝙣𝙚𝙧𝙖𝙩𝙚 ✅ 》
𝖤𝗆𝖺𝗂𝗅: ${email}
𝖪𝖾𝗒: ${password}`;
}

module.exports.run = async function({ api, event, args }) {
  const [action] = args;

// Credits kay blue

  if (action === "get") {
    if (accounts.length > 0) {
      const { email, password } = accounts.shift();
      api.sendMessage(generateAccount(email, password), event.threadID);
    } else {
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾.", event.threadID);
    }
  } else if (action === "add") {
    const [, email, password] = args;
    if (email && password) {
      accounts.push({ email, password });
      api.sendMessage("✅ | 𝖠𝖼𝖼𝗈𝗎𝗇𝗍 𝖺𝖽𝖽𝖾𝖽 𝗍𝗈 𝗌𝗍𝗈𝖼𝗄.", event.threadID);
    } else {
      api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗎𝗌𝖺𝗀𝖾. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗏𝖺𝗅𝗂𝖽 𝖾𝗆𝖺𝗂𝗅 𝖺𝗇𝖽 𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽 𝗍𝗈 𝖺𝖽𝖽 𝗍𝗈 𝗍𝗁𝖾 𝗌𝗍𝗈𝖼𝗄.", event.threadID);
    }
  } else if (action === "list") {
    api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝗌𝗍𝗈𝖼𝗄𝖾𝖽 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌: ${accounts.length}`, event.threadID);
  } else {
    api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.\n━━━━━━━━━━━━━━━━━━━\n🎓 | 𝗨𝘀𝗮𝗴𝗲: fbacc get or 𝖿𝖻𝖺𝖼𝖼 𝖺𝖽𝖽 <𝖾𝗆𝖺𝗂𝗅> <𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽> 𝗈𝗋 𝖿𝖻𝖺𝖼𝖼 𝗅𝗂𝗌𝗍.", event.threadID);
  }
};


