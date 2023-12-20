module.exports.config = {
  name: "accept",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Clark",
  description: "Make friends via Facebook ID",
  commandCategory: "admin",
  usages: "[uid]",
  cooldowns: 0
};  


module.exports.handleReply = async ({ handleReply, event, api }) => {
  const { author, listRequest } = handleReply;
  if (author != event.senderID) return;
  const args = event.body.replace(/ +/g, " ").toLowerCase().split(" ");
  
  const form = {
    av: api.getCurrentUserID(),
		fb_api_caller_class: "RelayModern",
		variables: {
      input: {
        source: "friends_tab",
        actor_id: api.getCurrentUserID(),
        client_mutation_id: Math.round(Math.random() * 19).toString()
      },
      scale: 3,
      refresh_num: 0
		}
  };
  
  const success = [];
  const failed = [];
  
  if (args[0] == "add") {
    form.fb_api_req_friendly_name = "FriendingCometFriendRequestConfirmMutation";
    form.doc_id = "3147613905362928";
  }
  else if (args[0] == "del") {
    form.fb_api_req_friendly_name = "FriendingCometFriendRequestDeleteMutation";
    form.doc_id = "4108254489275063";
  }
  else return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗌𝖾𝗅𝖾𝖼𝗍 <𝖺𝖽𝖽 | 𝖽𝖾𝗅> <𝖾𝗇𝖽 | 𝗈𝗋𝖽𝖾𝗋 \"𝖺𝗅𝗅\">", event.threadID, event.messageID);
  let targetIDs = args.slice(1);
  
  if (args[1] == "all") {
    targetIDs = [];
    const lengthList = listRequest.length;
    for (let i = 1; i <= lengthList; i++) targetIDs.push(i);
  }
  
  const newTargetIDs = [];
  const promiseFriends = [];
  
  for (const stt of targetIDs) {
    const u = listRequest[parseInt(stt) - 1];
    if (!u) {
      failed.push(`Stt ${stt} was not found in the list`);
      continue;
    }
    form.variables.input.friend_requester_id = u.node.id;
    form.variables = JSON.stringify(form.variables);
    newTargetIDs.push(u);
    promiseFriends.push(api.httpPost("https://www.facebook.com/api/graphql/", form));
		form.variables = JSON.parse(form.variables);
  }
  
  const lengthTarget = newTargetIDs.length;
  for (let i = 0; i < lengthTarget; i++) {
    try {
      const friendRequest = await promiseFriends[i];
      if (JSON.parse(friendRequest).errors) failed.push(newTargetIDs[i].node.name);
      else success.push(newTargetIDs[i].node.name);
    }
    catch(e) {
      failed.push(newTargetIDs[i].node.name);
    }
  }
  
  api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 ${args[0] == '𝖺𝖽𝖽' ?'𝖺𝖼𝖼𝖾𝗉𝗍𝖾𝖽': '𝖽𝖾𝗅𝖾𝗍𝖾'}𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅 𝖿𝗋𝗂𝖾𝗇𝖽𝗅𝗒 𝗂𝗇𝗏𝗂𝗍𝖺𝗍𝗂𝗈𝗇 𝗈𝖿 ${success.length} 𝗣𝗲𝗿𝘀𝗼𝗻:\n${success.join("\n")}${failed.length > 0?'\n❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗐𝗂𝗍𝗁 ${failed.length} 𝗣𝗲𝗿𝘀𝗼𝗻: ${failed.join("\n")}' : ""}`, event.threadID, event.messageID);
};


module.exports.run = async ({ event, api }) => {
  const moment = require("moment-timezone");
  const form = {
    av: api.getCurrentUserID(),
  	fb_api_req_friendly_name: "FriendingCometFriendRequestsRootQueryRelayPreloader",
  	fb_api_caller_class: "RelayModern",
  	doc_id: "4499164963466303",
  	variables: JSON.stringify({input: {scale: 3}})
  };
  const listRequest = JSON.parse(await api.httpPost("https://www.facebook.com/api/graphql/", form)).data.viewer.friending_possibilities.edges;
  let msg = "";
  let i = 0;
  for (const user of listRequest) {
    i++;
    msg += (`\n${i}. 𝐍𝐚𝐦𝐞: ${user.node.name}`
         + `\n𝐈𝐃: ${user.node.id}`
         + `\n𝐔𝐫𝐥: ${user.node.url.replace("www.facebook", "fb")}`
         + `\n𝐓𝐢𝐦𝐞: ${moment(user.time*1009).tz("Asia/Manila").format("DD/MM/YYYY HH:mm:ss")}\n━━━━━━━━━━━━━━━━━━━\𝗇`);
  }
  api.sendMessage(`🔍 | 𝗙𝗿𝗶𝗲𝗻𝗱 𝗥𝗲𝗾𝘂𝗲𝘀𝘁𝘀 𝗹𝗶𝘀𝘁:\n━━━━━━━━━━━━━━━━━━━\n${msg}\n━━━━━━━━━━━━━━━━━━━\nℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗋𝖾𝖺𝖽𝗌: <𝖺𝖽𝖽 | 𝖽𝖾𝗅> <𝗍𝗁𝖾 𝗈𝗋𝖽𝖾𝗋 𝗈𝖿 | 𝗈𝗋 \"𝖺𝗅𝗅\"> 𝗍𝗈 𝗍𝖺𝗄𝖾 𝖺𝖼𝗍𝗂𝗈𝗇.`, event.threadID, (e, info) => {
      global.client.handleReply.push({
        name: this. config. name,
        messageID: info.messageID,
        listRequest,
        author: event.senderID
      });
    }, event.messageID);
};
