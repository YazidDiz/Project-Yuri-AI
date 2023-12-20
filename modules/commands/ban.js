module.exports.config = {
	name: "ban",
	version: "2.0.5",
	hasPermssion: 1,
	credits: "Réynél",
	description: "Permanently ban members from the group (Remember to set the qtv bot)\nAuthor: Réynél",
	commandCategory: "group",
	usages: "[mention]",
	cooldowns: 5,
	info: [
		{
			key: '[tag] or [reply message] "reason"',
			prompt: '1 more warning user',
			type: '',
			example: 'ban [tag] "reason for warning"'
  		},

		{
			key: 'listban',
			prompt: 'see the list of users banned from the group',
			type: '',
			example: 'ban listban'
  		},

		{
			key: 'uban',
			prompt: 'remove the user from the list of banned groups',
			type: '',
			example: 'ban unban [id of user to delete]'
  		},
		{
			key: 'view',
			prompt: '"tag" or "blank" or "view all", respectively used to see how many times the person tagged or yourself or a member of the box has been warned ',
			type: '',
			example: 'ban view [@tag] / warns view'
  		},

		{
			key: 'reset',
			prompt: 'Reset all data in your group',
			type: '',
			example: 'ban reset'
  		}

  		]
};

module.exports.run = async function({ api, args, Users, event, Threads, utils, client }) {
	let {messageID, threadID, senderID} = event;
	var info = await api.getThreadInfo(threadID);
	if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨 𝗇𝖾𝖾𝖽 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝖺𝖽𝗆𝗂𝗇𝗌 𝗋𝗂𝗀𝗁𝗍𝗌 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽\n𝗉𝗅𝖾𝖺𝗌𝖾 𝖺𝖽𝖽 𝗆𝖾 𝖺𝗇𝖽 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇', threadID, messageID);
	var fs = require("fs-extra");
	
	if (!fs.existsSync(__dirname + `/cache/bans.json`)) {
			const dataaa = {warns: {}, banned: {}};
			fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(dataaa));
					}
  var bans = JSON.parse(fs.readFileSync(__dirname + `/cache/bans.json`)); //read file contents
  /*
  {warns: {}, banned: {tid: []}};
  */
  if(!bans.warns.hasOwnProperty(threadID)) {
			bans.warns[threadID] = {}; 
			fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
  	
  }

  
  if(args[0] == "view") {
  	if(!args[1]) {
  		var msg = "";
  		var mywarn = bans.warns[threadID][senderID];
  		if(!mywarn) return api.sendMessage('✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝗇𝖾𝗏𝖾𝗋 𝖻𝖾𝖾𝗇 𝗐𝖺𝗋𝗇𝖾𝖽', threadID, messageID);
  		var num = 1;
  		for(let reasonwarn of mywarn) {
  			msg += `reasonwarn\n`;
  		}
  		api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗁𝖺𝗏𝖾 𝖻𝖾𝖾𝗇 𝗐𝖺𝗋𝗇𝖾𝖽 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗋𝖾𝖺𝗌𝗈𝗇:\n\n${msg}`, threadID, messageID);
  	}
  	else if(Object.keys(event.mentions).length != 0) {
  		var message = "";
  		var mentions = Object.keys(event.mentions);
  		for(let id of mentions) {
  			var name = (await api.getUserInfo(id))[id].name;
  			var msg = "";
  			var so = 1;
  			var reasonarr = bans.warns[threadID][id];
  			if(typeof reasonarr != "object") {
  				msg += " 𝗇𝖾𝗏𝖾𝗋 𝖻𝖾𝖾𝗇 𝗐𝖺𝗋𝗇𝖾𝖽\n"
  			} else {
  			for(let reason of reasonarr) {
  				msg += ""+reason+"\n";
  			}
  			}
  			message += "⭐️ | "+name+" :"+msg+"";
  		}
  		api.sendMessage(message, threadID, messageID);
  	}
  	
  	else if(args[1] == "all") {
  		var dtwbox = bans.warns[threadID];
  		var allwarn = "";
  		for(let idtvw in dtwbox) {
  			var name = (await api.getUserInfo(idtvw))[idtvw].name, msg = "", solan = 1;
  			for(let reasonwtv of dtwbox[idtvw]) {
  				msg += `${reasonwtv}`
  			}
  			allwarn += `${name} : ${msg}\n`;
  		}
  		allwarn == "" ? api.sendMessage("✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗇𝗈 𝗈𝗇𝖾 𝗂𝗇 𝗒𝗈𝗎𝗋 𝗀𝗋𝗈𝗎𝗉 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗐𝖺𝗋𝗇𝖾𝖽", threadID, messageID) : api.sendMessage("📋 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗅𝗂𝗌𝗍 𝗈𝖿 𝗆𝖾𝗆𝖻𝖾𝗋𝗌 𝗐𝗁𝗈 𝗁𝖺𝗏𝖾 𝖻𝖾𝖾𝗇 𝗐𝖺𝗋𝗇𝖾𝖽:\n"+allwarn, threadID, messageID);
  	}
  }
  
  else if(args[0] == "unban") {
  	var id = parseInt(args[1]), mybox = bans.banned[threadID];
  	var info = await api.getThreadInfo(threadID);
	if (!info.adminIDs.some(item => item.id == senderID) && !(global.config.ADMINBOT).includes(senderID)) return api.sendMessage('❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗋𝗂𝗀𝗁𝗍 𝖼𝗎𝗇𝗍 𝖻𝗈𝗋𝖽𝖾𝗋', threadID, messageID);
	
  	if(!id) return api.sendMessage("❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎 𝗇𝖾𝖾𝖽 𝗍𝗈 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝖨𝖣 𝗈𝖿 𝗍𝗁𝖾 𝗉𝖾𝗋𝗌𝗈𝗇 𝗍𝗈 𝖻𝖾 𝗋𝖾𝗆𝗈𝗏𝖾𝖽 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝖻𝖺𝗇𝗇𝖾𝖽 𝗅𝗂𝗌𝗍 𝗈𝖿 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉", threadID, messageID);
  	bans.banned;
  	if(!mybox.includes(id)) return api.sendMessage("✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝗂𝗌 𝗉𝖾𝗋𝗌𝗈𝗇 𝗁𝖺𝗌𝗇'𝗍 𝖻𝖾𝖾𝗇 𝖻𝖺𝗇𝗇𝖾𝖽 𝖿𝗋𝗈𝗆 𝗒𝗈𝗎𝗋 𝗀𝗋𝗈𝗎𝗉", threadID, messageID);
			api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗋𝖾𝗆𝗈𝗏𝖾𝖽 𝗍𝗁𝖾 𝗆𝖾𝗆𝖻𝖾𝗋 𝗐𝗂𝗍𝗁 𝖨𝖣 《${id}》 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝖻𝖺𝗇𝗇𝖾𝖽 𝗅𝗂𝗌𝗍`, threadID, messageID);
			mybox.splice(mybox.indexOf(id), 1);
			delete bans.warns[threadID][id]
			fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
  }
  
  else if(args[0] == "listban") {
  	var mybox = bans.banned[threadID];
  	var msg = "";
  	for(let iduser of mybox) {
  		var name = (await api.getUserInfo(iduser))[iduser].name;
  		msg += "╔𝗡𝗮𝗺𝗲: " + name + "\n╚𝗜𝗗: " + iduser + "\n";
  	}
  	msg == "" ? api.sendMessage("✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗇𝗈 𝗈𝗇𝖾 𝗂𝗇 𝗒𝗈𝗎𝗋 𝗀𝗋𝗈𝗎𝗉 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖻𝖺𝗇𝗇𝖾𝖽 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉", threadID, messageID) : api.sendMessage("📋 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗆𝖾𝗆𝖻𝖾𝗋𝗌 𝗐𝗁𝗈 𝗁𝖺𝗏𝖾 𝖻𝖾𝖾𝗇 𝖻𝖺𝗇𝗇𝖾𝖽 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉:\n"+msg, threadID, messageID);
  }
  else if(args[0] == "reset") {
  	var info = await api.getThreadInfo(threadID);
	if (!info.adminIDs.some(item => item.id == senderID) && !(global.config.ADMINBOT).includes(senderID)) return api.sendMessage('❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗋𝗂𝗀𝗁𝗍 𝖼𝗎𝗇𝗍 𝖻𝗈𝗋𝖽𝖾𝗋', threadID, messageID);
  	
  	bans.warns[threadID] = {};
  	bans.banned[threadID] = [];
  	fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
  	api.sendMessage("🚮 | 𝖬𝖺𝗌𝗍𝖾𝗋 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖻𝖾𝖾𝗇 𝗋𝖾𝗌𝖾𝗍 𝖺𝗅𝗅 𝖽𝖺𝗍𝖺 𝗂𝗇 𝗒𝗈𝗎𝗋 𝗀𝗋𝗈𝗎𝗉", threadID, messageID);
  }
  	 //◆━━━━━━━━━◆WARN◆━━━━━━━━━◆\\
  	 else{ 
  	 	   if (event.type != "message_reply" && Object.keys(event.mentions).length == 0)	return utils.throwError(this.config.name, threadID, messageID);
   
       //◆━━━━━━◆get iduser and reason<<<<<<<<\\
       var info = await api.getThreadInfo(threadID);
	if (!info.adminIDs.some(item => item.id == senderID) && !(global.config.ADMINBOT).includes(senderID)) return api.sendMessage('❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗋𝗂𝗀𝗁𝗍 𝖼𝗎𝗇𝗍 𝖻𝗈𝗋𝖽𝖾𝗋', threadID, messageID);
  var reason = "";
		  if (event.type == "message_reply") {
		  	var iduser = [];
		  	iduser.push(event.messageReply.senderID);
		  	reason = (args.join(" ")).trim();
		  }
		  
		  else if (Object.keys(event.mentions).length != 0) {
		  	var iduser = Object.keys(event.mentions);
		  	var stringname = "";
		  	var nametaglength = (Object.values(event.mentions)).length;
		  	var namearr = Object.values(event.mentions);
		  	for(let i = 0; i < nametaglength; i++) {
		  		stringname += (Object.values(event.mentions))[i];
		  	}
		  	var message = args.join(" ");
		  	//var reason = (message.slice(stringname.length + nametaglength -1)).trim();
		  	for(let valuemention of namearr) {
		  		console.log(namearr);
		  		console.log(message);
		  		vitrivalue = message.indexOf(valuemention);
		  		console.log(vitrivalue);
		  		message = message.replace(valuemention,"");
		  	}
		 	var reason = message.replace(/\s+/g, ' ');
		  }
		  var arraytag = [];
		  var arrayname = [];
		  //Check xem đã bị cảnh cáo lần nào chưa
		for(let iid of iduser) {
			var id = parseInt(iid);
			var nametag = (await api.getUserInfo(id))[id].name;
			arraytag.push({id: id, tag: nametag});
			
			if(!reason) reason += "𝖭𝗈 𝗋𝖾𝖺𝗌𝗈𝗇 𝗐𝖺𝗌 𝗀𝗂𝗏𝖾𝗇";
			/*if(!bans.warns.hasOwnProperty(threadID)) {
			bans.warns[threadID] = {}; 
			}*/
			var dtwmybox = bans.warns[threadID];
			if(!dtwmybox.hasOwnProperty(id)) { 
			dtwmybox[id] = [];
			}
			var solan = (bans.warns[threadID][id]).length;
			arrayname.push(nametag);
			var pushreason = bans.warns[threadID][id];
			pushreason.push(reason);
			if(!bans.banned[threadID]) {
				bans.banned[threadID] = [];
			}
			if((bans.warns[threadID][id]).length > 0) {
				
				api.removeUserFromGroup(parseInt(id), threadID)
				var banned = bans.banned[threadID];
				    banned.push(parseInt(id));
				fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
			}
		
		}//for

		api.sendMessage({body: `✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖻𝖺𝗇𝗇𝖾𝖽 𝗆𝖾𝗆𝖻𝖾𝗋𝗌 ${arrayname.join(", ")} 𝗉𝖾𝗋𝗆𝖺𝗇𝖾𝗇𝗍𝗅𝗒 𝗅𝖾𝖺𝗏𝖾 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗋𝖾𝖺𝗌𝗈𝗇: ${reason}`, mentions: arraytag}, threadID, messageID);
		fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
}
  
};
