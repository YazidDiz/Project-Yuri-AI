module.exports.config = {
	name: "setmoney",
	version: "0.0.1",
	hasPermssion: 2,
	credits: "Réynél",
	description: "change the amount of yourself or the person tagged",
	commandCategory: "system",
	usages: "[mention]",
	cooldowns: 5,
	info: [
		{
			key: 'Tag',
			prompt: 'ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗅𝖾𝖺𝗏𝖾 𝗂𝗍 𝖻𝗅𝖺𝗇𝗄 𝗈𝗋 𝗆𝖾𝗇𝗍𝗂𝗈𝗇 𝗌𝗈𝗆𝖾𝗈𝗇𝖾, 𝗒𝗈𝗎 𝖼𝖺𝗇’𝗍 𝗆𝖾𝗇𝗍𝗂𝗈𝗇 𝗆𝗈𝗋𝖾 𝗍𝗁𝖺𝗇 𝟣 𝗉𝖾𝗋𝗌𝗂𝗇',
			type: 'Document',
			example: '@𝗖𝗹𝗮𝗿𝗸_𝗦𝗵𝗶𝗿𝗼𝘀𝘂𝘇𝘂𝗸𝗮'
		}
	]
};

module.exports.run = async function({ api, event, args, Currencies, utils, Users}) {
var mention = Object.keys(event.mentions)[0];
    var prefix = ";"
    var {body} = event;
    			var content = body.slice(prefix.length + 9, body.length);
			var sender = content.slice(0, content.lastIndexOf(" "));
			var moneySet = content.substring(content.lastIndexOf(" ") + 1);
    			if (args[0]=='me'){
    			 return api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖼𝗁𝖺𝗇𝗀𝖾𝖽 𝗒𝗈𝗎𝗋 𝖻𝖺𝗅𝖺𝗇𝖼𝖾 𝗍𝗈 ${moneySet} 𝖽𝗈𝗅𝗅𝖺𝗋`, event.threadID, () => Currencies.increaseMoney(event.senderID, parseInt(moneySet)), event.messageID)	
			}
			else if(args[0]=="del"){
if (args[1] == 'me'){
			var s = event.senderID;
			const moneyme =(await Currencies.getData(event.senderID)).money;
			api.sendMessage(`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖺𝗅𝗅 𝗈𝖿 𝗒𝗈𝗎𝗋 𝗆𝗈𝗇𝖾𝗒 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖽𝖾𝗅𝖾𝗍𝖾𝖽\n💸 | 𝖳𝗁𝖾 𝖺𝗆𝗈𝗎𝗇𝗍 𝗍𝗈 𝖻𝖾 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝗂𝗌 ${moneyme}.`, event.threadID, async () => await Currencies.decreaseMoney(event.senderID, parseInt(moneyme)));
		}	
		else if (Object.keys(event.mentions).length == 1) {
var mention = Object.keys(event.mentions)[0];
		const moneydel = (await Currencies.getData(mention)).money;
		api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗋𝖾𝗆𝗈𝗏𝖾𝖽 𝗍𝗁𝖾 𝖾𝗇𝗍𝗂𝗋𝖾 𝖺𝗆𝗈𝗎𝗇𝗍 ${event.mentions[mention].replace("@", "")}\n💸 | 𝖳𝗁𝖾 𝖺𝗆𝗈𝗎𝗇𝗍 𝗍𝗈 𝖻𝖾 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝗂𝗌 ${moneydel}.`, event.threadID, async () => await Currencies.decreaseMoney(mention, parseInt(moneydel)));
		}
		
		else return	api.sendMessage("❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖺 𝗐𝗋𝗈𝗇𝗀 𝗌𝗒𝗇𝗍𝖺𝗑 𝗈𝖿 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.", event.threadID, event.messageID);
		}
			else if (Object.keys(event.mentions).length == 1) {
			return api.sendMessage({
				body: (`💰 | 𝖬𝖺𝗌𝗍𝖾𝗋 𝖼𝗁𝖺𝗇𝗀𝖾𝖽 𝗍𝗁𝖾 𝖻𝖺𝗅𝖺𝗇𝖼𝖾 𝗈𝖿 ${event.mentions[mention].replace("@", "")} 𝗍𝗈 ${moneySet}`),
				mentions: [{
					tag: event.mentions[mention].replace("@", ""),
					id: mention
				}]
			}, event.threadID, async () => Currencies.increaseMoney(mention, parseInt(moneySet)), event.messageID)
		}
		else if(args[0]=="UID"){
		var id = args[1];
		var cut = args[2];
		let nameeee = (await Users.getData(id)).name
		   return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖼𝗁𝖺𝗇𝗀𝖾𝖽 𝗍𝗁𝖾 𝖻𝖺𝗅𝖺𝗇𝖼𝖾 𝗈𝖿 ${nameeee} 𝗍𝗈 ${cut}`, event.threadID, () => Currencies.increaseMoney(id, parseInt(cut)), event.messageID)	

		}
else {
	api.sendMessage("❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖺 𝗐𝗋𝗈𝗇𝗀 𝗌𝗒𝗇𝗍𝖺𝗑 𝗈𝖿 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.", event.threadID, event.messageID)
	}
  }