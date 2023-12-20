module.exports.config = {
  name: "shareget",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Retrieve user data from shareget API",
  commandCategory: "system",
  cooldowns: 5
};
 
module.exports.run = async ({ api, event, args }) => {
    const axios = global.nodemodule["axios"];
 
    if (args.length !== 2) {
        return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖻𝗈𝗍𝗁 𝖾𝗆𝖺𝗂𝗅 𝖺𝗇𝖽 𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽 𝗌𝖾𝗉𝖺𝗋𝖺𝗍𝖾𝖽 𝖻𝗒 𝗌𝗉𝖺𝖼𝖾.", event.threadID, event.messageID);
    }
 
    const [email, password] = args.map(arg => arg.trim());
 
    const res = await axios.get(`https://shareget.hayih59124.repl.co/login?email=${email}&password=${password}`);
    const userData = res.data;
 
    return api.sendMessage(JSON.stringify(userData, null, 4), event.threadID, event.messageID);
}
