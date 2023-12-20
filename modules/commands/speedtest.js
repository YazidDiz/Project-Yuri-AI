module.exports.config = {
  name: "speedtest",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Test network speed of the bot",
  commandCategory: "system",
  usages: "[speedtest]",
  cooldowns: 15,
  dependencies: {
		"fast-speedtest-api": ""
	}
};

module.exports.run = async function({ api, event }) {
	try {
		const fast = global.nodemodule["fast-speedtest-api"];
		const speedTest = new fast({
			token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
			verbose: false,
			timeout: 10000,
			https: true,
			urlCount: 5,
			bufferSize: 8,
			unit: fast.UNITS.Mbps
		});
		const resault = await speedTest.getSpeed();
		return api.sendMessage(
			"╔════✮❁•°♛°•❁✮ ════╗\n⚙︎𝗋𝖾𝗌𝗎𝗅𝗍 𝗌𝗉𝖾𝖾𝖽 𝗍𝖾𝗌𝗍" + 
			"\n❖𝗦𝗽𝗲𝗲𝗱: " + resault + " 𝖬𝖻𝗉𝗌\n╚════✮❁•°❀°•❁✮════╝",
			event.threadID, event.messageID
		);
	}
	catch {
		return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖨 𝖼𝖺𝗇'𝗍 𝗌𝗉𝖾𝖾𝖽 𝗍𝖾𝗌𝗍 𝗋𝗂𝗀𝗁𝗍 𝗇𝗈𝗐, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋", event.threadID, event.messageID);
	}
}