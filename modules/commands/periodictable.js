module.exports.config = {
  name: "element",
  version: "1.0.0",
  hasPermision: 0,
  credit: "Réynél",
  description: "get info of element",
  commandCategory: "education",
  usages: "[element name]",
  cooldowns: 0,
};

module.exports.run = async function({api, event, args, utils, Users, Threads}) {
    try {
        let axios = require('axios');
        let fs = require("fs-extra");
        let request = require("request");
        let {threadID, senderID, messageID} = event;
        let juswa = args.join(" ");
	const res = await axios.get(`https://api.popcat.xyz/periodic-table?element=${juswa}`);
	console.log(res.data);
	var data = res.data;
	let callback = function() {
            return api.sendMessage({
                body:`𝗘𝗹𝗲𝗺𝗲𝗻𝘁 𝗡𝗮𝗺𝗲: ${data.name}\n𝗦𝘆𝗺𝗯𝗼𝗹: ${data.symbol}\n𝗔𝘁𝗼𝗺𝗶𝗰 𝗡𝘂𝗺𝗯𝗲𝗿: ${data.atomic_number}\n𝗔𝘁𝗼𝗺𝗶𝗰 𝗠𝗮𝘀𝘀: ${data.atomic_mass}\n\n𝗦𝘂𝗺𝗺𝗮𝗿𝘆: ${data.summary}`,
                attachment: fs.createReadStream(__dirname + `/cache/image.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/image.png`), event.messageID);
        };
		return request(encodeURI(data.image)).pipe(fs.createWriteStream(__dirname + `/cache/image.png`)).on("close", callback);
		} catch (err) {
        console.log(err)
        return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖽𝗈𝗇'𝗍 𝖿𝗈𝗋𝗀𝖾𝗍 𝗍𝗈 𝖺𝖽𝖽 𝗍𝗁𝖾 𝖾𝗅𝖾𝗆𝖾𝗇𝗍 𝗇𝖺𝗆𝖾.`, event.threadID)
    }
}