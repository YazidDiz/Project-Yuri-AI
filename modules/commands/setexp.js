module.exports.config = {
	name: "setexp",
	version: "0.0.1",
	hasPermssion: 2,
	credits: "Réynél",
	description: "change the expien of yourself or the person being tagged",
	commandCategory: "system",
	usages: "[mention]",
	cooldowns: 5,
	info: [
		{
			key: 'Tag',
			prompt: 'ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗅𝖾𝖺𝗏𝖾 𝖻𝗅𝖺𝗇𝗄 𝗈𝗋 𝗆𝖾𝗇𝗍𝗂𝗈𝗇 𝗌𝗈𝗆𝖾𝗈𝗇𝖾, 𝗒𝗈𝗎 𝖼𝖺𝗇’𝗍 𝗆𝖾𝗇𝗍𝗂𝗈𝗇 𝗆𝗈𝗋𝖾 𝗍𝗁𝖺𝗇 𝗈𝗇𝖾 𝗉𝖾𝗋𝗌𝗈𝗇.',
			type: 'Document',
			example: '@Clark_Shirosuzuka'
		}
	]
};

module.exports.run = async function({ api, event, args, Currencies, utils, Users}) {
var mention = Object.keys(event.mentions)[0];
    var prefix = ";"
    var {body} = event;
    var kong = 0;
    			var content = body.slice(prefix.length + 9, body.length);
			var sender = content.slice(0, content.lastIndexOf(" "));
			var expSet = content.substring(content.lastIndexOf(" ") + 1);
    			if (args[0]=='me'){
    			 return api.sendMessage(`♻️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖼𝗎𝗋𝗏𝖾𝖽 𝖻𝖺𝗋 𝖼𝗁𝖺𝗇𝗀𝖾𝗌 𝗒𝗈𝗎𝗋 𝖾𝗑𝗉 𝗍𝗈 ${expSet}`, event.threadID, async() => {await Currencies.setData(event.senderID, {exp: parseInt(expSet)})}, event.messageID);
			}
			else if(args[0]=="del"){
if (args[1] == 'me'){
			var s = event.senderID;
			const expme =(await Currencies.getData(event.senderID)).exp;
			api.sendMessage(`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋 𝗋𝖾𝗆𝗈𝗏𝖾𝖽 𝖺𝗅𝗅 𝗈𝖿 𝗒𝗈𝗎𝗋 𝖾𝗑𝗉\n𝖳𝗁𝖾 𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝖾𝗑𝗉 𝗍𝗈 𝗋𝖾𝗆𝗂𝗏𝖾 𝗂𝗌 ${expme}.`, event.threadID, async() => {await Currencies.setData(event.senderID, {exp: parseInt(kong)})});
		}	
		else if (Object.keys(event.mentions).length == 1) {
var mention = Object.keys(event.mentions);
		const expdel = (await Currencies.getData(mention)).exp;
		api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗋𝖾𝗆𝗈𝗏𝖾𝖽 𝖺𝗅𝗅 𝖾𝗑𝗉 𝗈𝖿 ${event.mentions[mention].replace("@", "")}\n𝖳𝗁𝖾 𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝖾𝗑𝗉 𝗋𝖾𝗆𝗈𝗏𝖾𝖽 𝗂𝗌 ${expdel}.`, event.threadID, async() => {await Currencies.setData(mention, {exp: parseInt(kong)})});
		}
		
		else return	api.sendMessage("❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗎𝗌𝖾 𝗈𝖿 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽", event.threadID, event.messageID);
		}
			else if (Object.keys(event.mentions).length == 1) {
			return api.sendMessage({
				body: (`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖼𝗁𝖺𝗇𝗀𝖾𝖽 𝖾𝗑𝗉’𝗌 ${event.mentions[mention].replace("@", "")} 𝗍𝗈 ${expSet}`),
				mentions: [{
					tag: event.mentions[mention].replace("@", ""),
					id: parseInt(mention)
				}]
			}, event.threadID, async () => {await Currencies.setData(mention, {exp: parseInt(expSet)})});
		}
		else if(args[0]=="UID"){
		var id = args[1];
		var cut = args[2];
		let nameeee = (await Users.getData(id)).name
		   return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖼𝗁𝖺𝗇𝗀𝖾𝖽 𝖾𝗑𝗉 𝗈𝖿 ${nameeee} 𝗍𝗈 ${cut}`, event.threadID, async() => {await Currencies.setData(id, {exp: parseInt(cut)})}, event.messageID);

		}
else {
	api.sendMessage("❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗎𝗌𝖾 𝗈𝖿 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.", event.threadID, event.messageID)
	}
}