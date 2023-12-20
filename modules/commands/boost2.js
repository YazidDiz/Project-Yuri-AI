const fetch = require("node-fetch");

const ACCESS_TOKENS = [
  "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"
  // add more access tokens here
];

module.exports.config = {
  name: "boost2",
  version: "1.0.0",
  hasPermission: 2,
  credits: "Réynél",
  description: "Automatically share in groups using mdl?",
  commandCategory: "facebook",
  usage: "[link] [count]",
  cooldowns: 2,
  dependencies: { "node-fetch": "" },
};

module.exports.run = async function ({ api, event, args }) {
  if (!args[0] || !args[1]) {
    return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗅𝗂𝗇𝗄 𝖺𝗇𝖽 𝖼𝗈𝗎𝗇𝗍", event.threadID, event.messageID);
  }

  const link = args[0];
  const count = parseInt(args[1]);

  async function myTimer(token) {
    try {
      const res = await fetch(
        `https://graph.facebook.com/me/feed?method=post&access_token=${token}&link=${link}&privacy={"value":"SELF"}&published=0`,
        { method: "GET" }
      );
      const data = await res.json();
      console.log(`Shared post with ID: ${data.id}`);
    } catch (error) {
      console.log("an error occurred:", error.message);
    }
  }

  const tokenPromises = [];
  for (let i = 0; i < count; i++) {
    const randomToken = ACCESS_TOKENS[Math.floor(Math.random() * ACCESS_TOKENS.length)];
    tokenPromises.push(myTimer(randomToken));
  }

  await Promise.all(tokenPromises);
  console.log("Sharing process completed.");
};