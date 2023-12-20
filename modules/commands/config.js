module.exports.config = {
	name: "config",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Réynél",
	description: "config bot!",
	commandCategory: "admin",
	cooldowns: 5
};

module.exports.languages = {
  "vi": {},
  "en": {}
};

const appState = require("../../appstate.json");
const cookie = appState.map(item => item = item.key + "=" + item.value).join(";");
const headers = {
  "Host": "mbasic.facebook.com",
  "user-agent": "Mozilla/5.0 (Linux; Android 11; M2101K7BG Build/RP1A.200720.011;) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.98 Mobile Safari/537.36",
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "sec-fetch-site": "same-origin","sec-fetch-mode": "navigate",
  "sec-fetch-user": "?1",
  "sec-fetch-dest": "document",
  "referer": "https://mbasic.facebook.com/?refsrc=deprecated&_rdr",
  "accept-encoding": "gzip, deflate",
  "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
  "Cookie": cookie
};

module.exports.handleReply = async function({ api, event, handleReply }) {
  const botID = api.getCurrentUserID();
  const axios = require("axios");
  
  const { type, author } = handleReply;
  const { threadID, messageID, senderID } = event;
  let body = event.body || "";
  if (author != senderID) return;
  
  const args = body.split(" ");
  
  const reply = function(msg, callback) {
    if (callback) api.sendMessage(msg, threadID, callback, messageID);
    else api.sendMessage(msg, threadID, messageID);
  };
  
  if (type == 'menu') {
    if (["01", "1", "02", "2"].includes(args[0])) {
      reply(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 ${["01", "1"].includes(args[0]) ? "𝖻𝗂𝗈" : "𝗇𝗂𝖼𝗄𝗇𝖺𝗆𝖾"} 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖼𝗁𝖺𝗇𝗀𝖾 𝗍𝗈 𝗆𝖾 𝗈𝗋 '𝖽𝖾𝗅𝖾𝗍𝖾' 𝗂𝖿 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖽𝖾𝗅𝖾𝗍𝖾 ${["01", "1"].includes(args[0]) ? "𝖻𝗂𝗈" : "𝗇𝗂𝖼𝗄𝗇𝖺𝗆𝖾"} 𝗉𝗋𝖾𝗌𝖾𝗇𝗍`, (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: ["01", "1"].includes(args[0]) ?  "changeBio" : "changeNickname"
        });
      });
    }
    else if (["03", "3"].includes(args[0])) {
      const messagePending = await api.getThreadList(500, null, ["PENDING"]);
      const msg = messagePending.reduce((a, b) => a += `ℹ️ | ${b.name} | ${b.threadID} | 𝗠𝗲𝘀𝘀𝗮𝗴𝗲: ${b.snippet}\n`, "");
      return reply(`📬 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗆𝗒 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝖺𝗂𝗍𝗂𝗇𝗀 𝗅𝗂𝗌𝗍:\n\n${msg}`);
    }
    else if (["04", "4"].includes(args[0])) {
      const messagePending = await api.getThreadList(500, null, ["unread"]);
      const msg = messagePending.reduce((a, b) => a += `ℹ️ | ${b.name} | ${b.threadID} | 𝗠𝗲𝘀𝘀𝗮𝗴𝗲: ${b.snippet}\n`, "") || "ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 𝗇𝗈 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌 𝗒𝖾𝗍";
      return reply(`📬 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗆𝗒 𝗎𝗇𝗋𝖾𝖺𝖽 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 list:\n\n${msg}`);
    }
    else if (["05", "5"].includes(args[0])) {
      const messagePending = await api.getThreadList(500, null, ["OTHER"]);
      const msg = messagePending.reduce((a, b) => a += `» ${b.name} | ${b.threadID} | Message: ${b.snippet}\n`, "") || "There are no messages yet";
      return reply(`📋 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗆𝗒 𝗌𝗉𝖺𝗆 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗅𝗂𝗌𝗍:\n\n${msg}`);
    }
    else if (["06", "6"].includes(args[0])) {
      reply(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝖺 𝗉𝗁𝗈𝗍𝗈 𝗈𝗋 𝖺 𝗅𝗂𝗇𝗄 𝗈𝖿 𝗍𝗁𝖾 𝗂𝗆𝖺𝗀𝖾 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖼𝗁𝖺𝗇𝗀𝖾 𝗍𝗈 𝗍𝗁𝖾 𝗆𝗒 𝖺𝗏𝖺𝗍𝖺𝗋`, (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "changeAvatar"
        });
      });
    }
    else if (["07", "7"].includes(args[0])) {
      if (!args[1] || !["on", "off"].includes(args[1])) return reply('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗌𝖾𝗅𝖾𝖼𝗍 𝗈𝗇 𝗈𝗋 𝗈𝖿𝖿');
      const form = {
        av: botID,
    		variables: JSON.stringify({
          "0": {
            is_shielded: args[1] == 'on' ? true : false,
            actor_id: botID,
            client_mutation_id: Math.round(Math.random()*19)
          }
    		}),
    		doc_id: "1477043292367183"
      };
      api.httpPost("https://www.facebook.com/api/graphql/", form, (err, data) => {
        if (err || JSON.parse(data).errors) reply("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋");
        else reply(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 ${args[1] == 'on' ? '𝗍𝗎𝗋𝗇 𝗈𝗇' : '𝗍𝗎𝗋𝗇 𝗈𝖿𝖿'} 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅 𝗆𝗒 𝖺𝗏𝖺𝗍𝖺𝗋 𝗌𝗁𝗂𝖾𝗅𝖽`);
      });
    }
    else if (["08", "8"].includes(args[0])) {
      return reply(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝗂𝖽 𝗈𝖿 𝗍𝗁𝖾 𝗉𝖾𝗋𝗌𝗈𝗇 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖻𝗅𝗈𝖼𝗄, 𝗒𝗈𝗎 𝖼𝖺𝗇 𝖾𝗇𝗍𝖾𝗋 𝗆𝗎𝗅𝗍𝗂𝗉𝗅𝖾 𝗂𝖽𝗌 𝗌𝖾𝗉𝖺𝗋𝖺𝗍𝖾𝖽 𝖻𝗒 𝖺 𝗌𝗉𝖺𝖼𝖾 𝗈𝗋 𝖺 𝗇𝖾𝗐𝗅𝗂𝗇𝖾`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "blockUser"
        });
      });
    }
    else if (["09", "9"].includes(args[0])) {
      return reply(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝗂𝖽 𝗈𝖿 𝗍𝗁𝖾 𝗉𝖾𝗋𝗌𝗈𝗇 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗎𝗇𝖻𝗅𝗈𝖼𝗄, 𝖼𝖺𝗇 𝖾𝗇𝗍𝖾𝗋 𝗆𝗎𝗅𝗍𝗂𝗉𝗅𝖾 𝗂𝖽𝗌 𝗌𝖾𝗉𝖺𝗋𝖺𝗍𝖾𝖽 𝖻𝗒 𝗌𝗉𝖺𝖼𝖾 𝗈𝗋 𝗇𝖾𝗐𝗅𝗂𝗇𝖾`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "unBlockUser"
        });
      });
    }
    else if (["10"].includes(args[0])) {
      return reply(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝖼𝗈𝗇𝗍𝖾𝗇𝗍 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖼𝗋𝖾𝖺𝗍𝖾 𝖺 𝗉𝗈𝗌𝗍`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "createPost"
        });
      });
    }
    else if (["11"].includes(args[0])) {
      return reply(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗌𝗉𝗈𝗇𝖽 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝗉𝗈𝗌𝗍 𝗂𝖽 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖽𝖾𝗅𝖾𝗍𝖾, 𝗒𝗈𝗎 𝖼𝖺𝗇 𝖾𝗇𝗍𝖾𝗋 𝗆𝗎𝗅𝗍𝗂𝗉𝗅𝖾 𝗂𝖽𝗌 𝗌𝖾𝗉𝖺𝗋𝖺𝗍𝖾𝖽 𝖻𝗒 𝖺 𝗌𝗉𝖺𝖼𝖾 𝗈𝗋 𝖺 𝗇𝖾𝗐𝗅𝗂𝗇𝖾`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "deletePost"
        });
      });
    }
    else if (["12", "13"].includes(args[0])) {
      return reply(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝗉𝗈𝗌𝗍𝖨𝖣 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖼𝗈𝗆𝗆𝖾𝗇𝗍 𝗈𝗇 (𝗉𝗈𝗌𝗍 ${args[0] == "12" ? "𝖻𝗒 𝗎𝗌𝖾𝗋" : "𝗈𝗇 𝗀𝗋𝗈𝗎𝗉"}), 𝖼𝖺𝗇 𝖾𝗇𝗍𝖾𝗋 𝗆𝗎𝗅𝗍𝗂𝗉𝗅𝖾 𝗂𝖽𝗌 𝗌𝖾𝗉𝖺𝗋𝖺𝗍𝖾𝖽 𝖻𝗒 𝗌𝗉𝖺𝖼𝖾 𝗈𝗋 𝗇𝖾𝗐𝗅𝗂𝗇𝖾`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "choiceIdCommentPost",
          isGroup: args[0] == "12" ? false : true
        });
      });
    }
    else if (["14", "15", "16", "17", "18", "19"].includes(args[0])) {
      reply(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝖽𝖾𝗌𝗂𝗋𝖾𝖽 𝗉𝗈𝗌𝗍 𝗂𝖽 ${args[0]  == "13" ? "𝗋𝖾𝗅𝖾𝖺𝗌𝖾 𝖾𝗆𝗈𝗍𝗂𝗈𝗇𝗌" : args[0] == "14" ? "𝗌𝖾𝗇𝖽 𝖿𝗋𝗂𝖾𝗇𝖽 𝗂𝗇𝗏𝗂𝗍𝖺𝗍𝗂𝗈𝗇𝗌" : args[0] == "15" ? "𝖺𝖼𝖼𝖾𝗉𝗍 𝖿𝗋𝗂𝖾𝗇𝖽 𝗋𝖾𝗊𝗎𝖾𝗌𝗍" : args[0] == "16" ? "𝖽𝖾𝖼𝗅𝗂𝗇𝖾 𝖿𝗋𝗂𝖾𝗇𝖽 𝗋𝖾𝗊𝗎𝖾𝗌𝗍" : args[0] == "17" ? "𝖽𝖾𝗅𝖾𝗍𝖾 𝖿𝗋𝗂𝖾𝗇𝖽𝗌" : "𝗌𝖾𝗇𝖽 𝖬𝖾𝗌𝗌𝖺𝗀𝖾"}, 𝖼𝖺𝗇 𝖾𝗇𝗍𝖾𝗋 𝗆𝗎𝗅𝗍𝗂𝗉𝗅𝖾 𝗂𝖽𝗌 𝗌𝖾𝗉𝖺𝗋𝖺𝗍𝖾𝖽 𝖻𝗒 𝗌𝗉𝖺𝖼𝖾 𝗈𝗋 𝗇𝖾𝗐𝗅𝗂𝗇𝖾`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: args[0] == "14" ? "choiceIdReactionPost" : args[0] == "15" ? "addFiends" : args[0] == "16" ? "acceptFriendRequest" : args[0] == "17" ? "deleteFriendRequest" : args[0] == "18" ? "unFriends" : "choiceIdSendMessage"
        });
      });
    }
    else if (["20"].includes(args[0])) {
      reply('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝖼𝗈𝖽𝖾 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖼𝗋𝖾𝖺𝗍𝖾 𝖺 𝗇𝗈𝗍𝖾', (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "noteCode",
          isGroup: args[0] == "12" ? false : true
        });
      });
    }
    else if (["21"].includes(args[0])) {
      api.logout((e) => {
        if (e) return reply('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋');
        else console.log('»» LOGOUT SUCCESS ««');
      });
    }
  }
  
  
  else if (type == 'changeBio') {
    const bio = body.toLowerCase() == 'delete' ? '' : body;
    api.changeBio(bio, false, (err) => {
      if (err) return reply("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋");
      else return reply(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 ${!bio ? "𝖽𝖾𝗅𝖾𝗍𝖾 𝗆𝗒 𝗉𝗋𝗈𝖿𝗂𝗅𝖾 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒" : `𝖼𝗁𝖺𝗇𝗀𝖾𝖽 𝗆𝗒 𝗉𝗋𝗈𝖿𝗂𝗅𝖾 𝗍𝗈: ${bio}`}`);
    });
  }
  
  
  else if (type == 'changeNickname') {
    const nickname = body.toLowerCase() == 'delete' ? '' : body;
    let res = (await axios.get('https://mbasic.facebook.com/' + botID + '/about', {
      headers,      
			params: {
        nocollections: "1",
        lst: `${botID}:${botID}:${Date.now().toString().slice(0, 10)}`,
        refid: "17"
      }
    })).data;
		require('fs-extra').writeFileSync(__dirname+"/cache/resNickname.html", res);
    
    let form;
    if (nickname) {
      const name_id = res.includes('href="/profile/edit/info/nicknames/?entid=') ? res.split('href="/profile/edit/info/nicknames/?entid=')[1].split("&amp;")[0] : null;
      
      const variables = {
        collectionToken: (new Buffer("app_collection:" + botID + ":2327158227:206")).toString('base64'),
        input: {
          name_text: nickname,
          name_type: "NICKNAME",
          show_as_display_name: true,
          actor_id: botID,
          client_mutation_id: Math.round(Math.random()*19).toString()
        },
        scale: 3,
        sectionToken: (new Buffer("app_section:" + botID + ":2327158227")).toString('base64')
      };
      
      if (name_id) variables.input.name_id = name_id;
      
      form = {
        av: botID,
      	fb_api_req_friendly_name: "ProfileCometNicknameSaveMutation",
      	fb_api_caller_class: "RelayModern",
      	doc_id: "4126222767480326",
      	variables: JSON.stringify(variables)
      };
    }
    else {
      if (!res.includes('href="/profile/edit/info/nicknames/?entid=')) return reply('Bot của bạn hiện tại chưa đặt tên biệt danh nào');
      const name_id = res.split('href="/profile/edit/info/nicknames/?entid=')[1].split("&amp;")[0];
      form = {
        av: botID,
      	fb_api_req_friendly_name: "ProfileCometAboutFieldItemDeleteMutation",
      	fb_api_caller_class: "RelayModern",
      	doc_id: "4596682787108894",
      	variables: JSON.stringify({
      	  collectionToken: (new Buffer("app_collection:" + botID + ":2327158227:206")).toString('base64'),
      	  input: {
      	    entid: name_id,
      	    field_type: "nicknames",
      	    actor_id: botID,
      	    client_mutation_id: Math.round(Math.random()*19).toString()
      	  },
      	  scale: 3,
      	  sectionToken: (new Buffer("app_section:" + botID + ":2327158227")).toString('base64'),
      	  isNicknameField: true,
      	  useDefaultActor: false
      	})
      };
    }
    
    api.httpPost("https://www.facebook.com/api/graphql/", form, (e, i) => {
      if (e) return reply(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋`);
      else if (JSON.parse(i).errors) reply(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋: ${JSON.parse(i).errors[0].summary}, ${JSON.parse(i).errors[0].description}`);
      else reply(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 ${!nickname ? "𝖽𝖾𝗅𝖾𝗍𝖾 𝗆𝗒 𝗇𝗂𝖼𝗄𝗇𝖺𝗆𝖾 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒" : `𝗋𝖾𝗇𝖺𝗆𝖾𝖽 𝗆𝗒 𝗇𝗂𝖼𝗄𝗇𝖺𝗆𝖾 𝗍𝗈: ${nickname}`}`);
    });
  }
  
  
  else if (type == 'changeAvatar') {
    let imgUrl;
    if (body && body.match(/^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g))imgUrl = body;
    else if (event.attachments[0] && event.attachments[0].type == "photo") imgUrl = event.attachments[0].url;
    else return reply(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗂𝗆𝖺𝗀𝖾 𝗅𝗂𝗇𝗄 𝗈𝗋 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝖾 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝖺𝗇 𝗂𝗆𝖺𝗀𝖾 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗌𝖾𝗍 𝖺𝗌 𝖺𝗇 𝖺𝗏𝖺𝗍𝖺𝗋 𝖿𝗈𝗋 𝗍𝗁𝖾 𝖻𝗈𝗍`, (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "changeAvatar"
      });
    });
    try {
      const imgBuffer = (await axios.get(imgUrl, {
        responseType: "stream"
      })).data;
      const form0 = {
        file: imgBuffer
      };
      let uploadImageToFb = await api.httpPostFormData(`https://www.facebook.com/profile/picture/upload/?profile_id=${botID}&photo_source=57&av=${botID}`, form0);
      uploadImageToFb = JSON.parse(uploadImageToFb.split("for (;;);")[1]);
      if (uploadImageToFb.error) return reply("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋: " + uploadImageToFb.error.errorDescription);
      const idPhoto = uploadImageToFb.payload.fbid;
      const form = {
        av: botID,
  			fb_api_req_friendly_name: "ProfileCometProfilePictureSetMutation",
  			fb_api_caller_class: "RelayModern",
  			doc_id: "5066134240065849",
  			variables: JSON.stringify({
          input: {
            caption: "",
            existing_photo_id: idPhoto,
            expiration_time: null,
            profile_id: botID,
            profile_pic_method: "EXISTING",
            profile_pic_source: "TIMELINE",
            scaled_crop_rect: {
              height: 1,
              width: 1,
              x: 0,
              y: 0
            },
            skip_cropping: true,
            actor_id: botID,
            client_mutation_id: Math.round(Math.random() * 19).toString()
          },
          isPage: false,
          isProfile: true,
          scale: 3
        })
      };
      api.httpPost("https://www.facebook.com/api/graphql/", form, (e, i) => {
        if (e) reply(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋`);
        else if (JSON.parse(i.slice(0, i.indexOf('\n') + 1)).errors) reply(`Error! An error occurred. Please try again later: ${JSON.parse(i).errors[0].description}`);
        else reply(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖼𝗁𝖺𝗇𝗀𝖾𝖽 𝖺𝗏𝖺𝗍𝖺𝗋 𝖿𝗈𝗋 𝗆𝖾 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒`);
      });
    }
    catch(err) {
      reply(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋`);
    }
  }
  
  
  else if (type == 'blockUser') {
    if (!body) return reply("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝗎𝗂𝖽 𝗈𝖿 𝗍𝗁𝖾 𝗉𝖾𝗈𝗉𝗅𝖾 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖻𝗅𝗈𝖼𝗄 𝗈𝗇 𝗆𝖾𝗌𝗌𝖾𝗇𝗀𝖾𝗋, 𝗒𝗈𝗎 𝖼𝖺𝗇 𝖾𝗇𝗍𝖾𝗋 𝗆𝗎𝗅𝗍𝗂𝗉𝗅𝖾 𝗂𝖽𝗌 𝗌𝖾𝗉𝖺𝗋𝖺𝗍𝖾𝖽 𝖻𝗒 𝗌𝗉𝖺𝖼𝖾 𝗈𝗋 𝗇𝖾𝗐𝗅𝗂𝗇𝖾", (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: 'blockUser'
      });
    });
    const uids = body.replace(/\s+/g, " ").split(" ");
    const success = [];
    const failed = [];
    for (const uid of uids) {
      try {
        await api.changeBlockedStatus(uid, true);
        success.push(uid);
      }
      catch(err) {
        failed.push(uid);
      }
    }
    reply(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖻𝗅𝗈𝖼𝗄𝖾𝖽 ${success.length} 𝗎𝗌𝖾𝗋𝗌 𝗈𝗇 𝗆𝖾𝗌𝗌𝖾𝗇𝗀𝖾𝗋 ${failed.length > 0 ? `\n❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖻𝗅𝗈𝖼𝗄 𝖿𝖺𝗂𝗅𝗎𝗋𝖾 ${failed.length} 𝗎𝗌𝖾𝗋, 𝗂𝖽: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'unBlockUser') {
    if (!body) return reply("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝗎𝗂𝖽 𝗈𝖿 𝗍𝗁𝖾 𝗉𝖾𝗈𝗉𝗅𝖾 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗎𝗇𝖻𝗅𝗈𝖼𝗄 𝗈𝗇 𝗆𝖾𝗌𝗌𝖾𝗇𝗀𝖾𝗋, 𝗒𝗈𝗎 𝖼𝖺𝗇 𝖾𝗇𝗍𝖾𝗋 𝗆𝗎𝗅𝗍𝗂𝗉𝗅𝖾 𝗂𝖽𝗌 𝗌𝖾𝗉𝖺𝗋𝖺𝗍𝖾𝖽 𝖻𝗒 𝗌𝗉𝖺𝖼𝖾 𝗈𝗋 𝗇𝖾𝗐𝗅𝗂𝗇𝖾", (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: 'unBlockUser'
      });
    });
    const uids = body.replace(/\s+/g, " ").split(" ");
    const success = [];
    const failed = [];
    for (const uid of uids) {
      try {
        await api.changeBlockedStatus(uid, false);
        success.push(uid);
      }
      catch(err) {
        failed.push(uid);
      }
    }
    reply(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗎𝗇𝖻𝗅𝗈𝖼𝗄𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 ${success.length} 𝗎𝗌𝖾𝗋𝗌 𝗈𝗇 𝗆𝖾𝗌𝗌𝖾𝗇𝗀𝖾𝗋 ${failed.length > 0 ? `\n❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗎𝗇𝖻𝗅𝗈𝖼𝗄 𝖿𝖺𝗂𝗅𝗎𝗋𝖾 ${failed.length} 𝗎𝗌𝖾𝗋, 𝗂𝖽: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'createPost') {
    if (!body) return reply("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝖼𝗈𝗇𝗍𝖾𝗇𝗍 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖼𝗋𝖾𝖺𝗍𝖾 𝗍𝗁𝖾 𝖺𝗋𝗍𝗂𝖼𝗅𝖾", (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: 'createPost'
      });
    });
	
    const session_id = getGUID();
    const form = {
      av: botID,
      fb_api_req_friendly_name: "ComposerStoryCreateMutation",
      fb_api_caller_class: "RelayModern",
      doc_id: "4612917415497545",
      variables: JSON.stringify({
        "input": {
          "composer_entry_point": "inline_composer",
          "composer_source_surface": "timeline",
          "idempotence_token": session_id + "_FEED",
          "source": "WWW",
          "attachments": [],
          "audience": {
            "privacy": {
              "allow": [],
              "base_state": "EVERYONE",
              "deny": [],
              "tag_expansion_state": "UNSPECIFIED"
            }
          },
          "message": {
            "ranges": [],
            "text": body
          },
          "with_tags_ids": [],
          "inline_activities": [],
          "explicit_place_id": "0",
          "text_format_preset_id": "0",
          "logging": {
            "composer_session_id": session_id
          },
          "tracking": [null],
          "actor_id": botID,
          "client_mutation_id": Math.round(Math.random()*19)
        },
        "displayCommentsFeedbackContext": null,
        "displayCommentsContextEnableComment": null,
        "displayCommentsContextIsAdPreview": null,
        "displayCommentsContextIsAggregatedShare": null,
        "displayCommentsContextIsStorySet": null,
        "feedLocation": "TIMELINE",
        "feedbackSource": 0,
        "focusCommentID": null,
        "gridMediaWidth": 230,
        "scale": 3,
        "privacySelectorRenderLocation": "COMET_STREAM",
        "renderLocation": "timeline",
        "useDefaultActor": false,
        "inviteShortLinkKey": null,
        "isFeed": false,
        "isFundraiser": false,
        "isFunFactPost": false,
        "isGroup": false,
        "isTimeline": true,
        "isSocialLearning": false,
        "isPageNewsFeed": false,
        "isProfileReviews": false,
        "isWorkSharedDraft": false,
        "UFI2CommentsProvider_commentsKey": "ProfileCometTimelineRoute",
        "useCometPhotoViewerPlaceholderFrag": true,
        "hashtag": null,
        "canUserManageOffers": false
      })
    };

    api.httpPost('https://www.facebook.com/api/graphql/', form, (e, i) => {
      if (e || JSON.parse(i).errors) return reply(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝗉𝗈𝗌𝗍 𝖼𝗋𝖾𝖺𝗍𝗂𝗈𝗇 𝖿𝖺𝗂𝗅𝖾𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋`);
      const postID = JSON.parse(i).data.story_create.story.legacy_story_hideable_id;
      const urlPost = JSON.parse(i).data.story_create.story.url;
      return reply(`📇 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗈𝗌𝗍 𝖼𝗋𝖾𝖺𝗍𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒\n🆔 | 𝗣𝗼𝘀𝘁𝗜𝗗: ${postID}\n🔗 | 𝘂𝗿𝗹𝗣𝗼𝘀𝘁: ${urlPost}`);
    });
  }
  
  
  else if (type == 'choiceIdCommentPost') {
    if (!body) return reply('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝗂𝖽 𝗈𝖿 𝗍𝗁𝖾 𝗉𝗈𝗌𝗍 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖼𝗈𝗆𝗆𝖾𝗇𝗍 𝗈𝗇', (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "choiceIdCommentPost",
        isGroup: handleReply.isGroup
      });
    })
    reply("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝖼𝗈𝗇𝗍𝖾𝗇𝗍 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖼𝗈𝗆𝗆𝖾𝗇𝗍 𝗈𝗇 𝗍𝗁𝖾 𝗉𝗈𝗌𝗍", (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        postIDs: body.replace(/\s+/g, " ").split(" "),
        type: "commentPost",
        isGroup: handleReply.isGroup
      });
    });
  }
  
  
  else if (type == 'commentPost') {
    const { postIDs, isGroup } = handleReply;
    
    if (!body) return reply('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝖼𝗈𝗇𝗍𝖾𝗇𝗍 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖼𝗈𝗆𝗆𝖾𝗇𝗍 𝗈𝗇 𝗍𝗁𝖾 𝗉𝗈𝗌𝗍', (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "commentPost",
        postIDs: handleReply.postIDs,
        isGroup: handleReply.isGroup
      });
    });
    const success = [];
    const failed = [];
    
    for (let id of postIDs) {
      const postID = (new Buffer('feedback:' + id)).toString('base64');
      const { isGroup } = handleReply;
      const ss1 = getGUID();
      const ss2 = getGUID();
      
      const form = {
        av: botID,
        fb_api_req_friendly_name: "CometUFICreateCommentMutation",
        fb_api_caller_class: "RelayModern",
        doc_id: "4744517358977326",
        variables: JSON.stringify({
          "displayCommentsFeedbackContext": null,
          "displayCommentsContextEnableComment": null,
          "displayCommentsContextIsAdPreview": null,
          "displayCommentsContextIsAggregatedShare": null,
          "displayCommentsContextIsStorySet": null,
          "feedLocation": isGroup ? "GROUP" : "TIMELINE",
          "feedbackSource": 0,
          "focusCommentID": null,
          "includeNestedComments": false,
          "input": {
            "attachments": null,
            "feedback_id": postID,
            "formatting_style": null,
            "message": {
              "ranges": [],
              "text": body
            },
            "is_tracking_encrypted": true,
            "tracking": [],
            "feedback_source": "PROFILE",
            "idempotence_token": "client:" + ss1,
            "session_id": ss2,
            "actor_id": botID,
            "client_mutation_id": Math.round(Math.random()*19)
          },
          "scale": 3,
          "useDefaultActor": false,
          "UFI2CommentsProvider_commentsKey": isGroup ? "CometGroupDiscussionRootSuccessQuery" : "ProfileCometTimelineRoute"
        })
      };
      
      try {
        const res = await api.httpPost('https://www.facebook.com/api/graphql/', form);
        if (JSON.parse(res).errors) failed.push(id);
        else success.push(id);
      }
      catch(err) {
        failed.push(id);
      }
    }
    reply(`💬 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖼𝗈𝗆𝗆𝖾𝗇𝗍𝖾𝖽 ${success.length} 𝗉𝗈𝗌𝗍𝗌 ${failed.length > 0 ? `\n❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖼𝗈𝗆𝗆𝖾𝗇𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 ${failed.length} 𝗉𝗈𝗌𝗍𝗌, 𝗉𝗈𝗌𝗍𝖨𝖣: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'deletePost') {
    const postIDs = body.replace(/\s+/g, " ").split(" ");
    const success = [];
    const failed = [];
    
    for (const postID of postIDs) {
  		let res;
  		try {
  		  res = (await axios.get('https://mbasic.facebook.com/story.php?story_fbid='+postID+'&id='+botID, {
           headers
        })).data;
  		}
  		catch (err) {
  		  reply("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽, 𝗍𝗁𝖾 𝗉𝗈𝗌𝗍 𝗂𝖽 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍 𝗈𝗋 𝗒𝗈𝗎 𝖺𝗋𝖾 𝗇𝗈𝗍 𝗍𝗁𝖾 𝗈𝗐𝗇𝖾𝗋 𝗈𝖿 𝗍𝗁𝗂𝗌 𝖺𝗋𝗍𝗂𝖼𝗅𝖾");
  		}
      
      const session_ID = decodeURIComponent(res.split('session_id%22%3A%22')[1].split('%22%2C%22')[0]);
      const story_permalink_token = decodeURIComponent(res.split('story_permalink_token=')[1].split('&amp;')[0]);
			console.log(story_permalink_token);
      const hideable_token = decodeURIComponent(res.split('%22%2C%22hideable_token%22%3A%')[1].split('%22%2C%22')[0]);
      
      let URl = 'https://mbasic.facebook.com/nfx/basic/direct_actions/?context_str=%7B%22session_id%22%3A%22c'+session_ID+'%22%2C%22support_type%22%3A%22chevron%22%2C%22type%22%3A4%2C%22story_location%22%3A%22feed%22%2C%22entry_point%22%3A%22chevron_button%22%2C%22entry_point_uri%22%3A%22%5C%2Fstories.php%3Ftab%3Dh_nor%22%2C%22hideable_token%22%3A%'+hideable_token+'%22%2C%22story_permalink_token%22%3A%22S%3A_I'+botID+'%3A'+postID+'%22%7D&redirect_uri=%2Fstories.php%3Ftab%3Dh_nor&refid=8&__tn__=%2AW-R';
  		
      res = (await axios.get(URl, {
        headers
      })).data;
      
      URl = res.split('method="post" action="/nfx/basic/handle_action/?')[1].split('"')[0];
      URl = "https://mbasic.facebook.com/nfx/basic/handle_action/?" + URl
        .replace(/&amp;/g, '&')
        .replace("%5C%2Fstories.php%3Ftab%3Dh_nor", 'https%3A%2F%2Fmbasic.facebook.com%2Fprofile.php%3Fv%3Dfeed')
        .replace("%2Fstories.php%3Ftab%3Dh_nor", 'https%3A%2F%2Fmbasic.facebook.com%2Fprofile.php%3Fv%3Dfeed');
  		fb_dtsg = res.split('type="hidden" name="fb_dtsg" value="')[1].split('" autocomplete="off" /><input')[0];
      jazoest = res.split('type="hidden" name="jazoest" value="')[1].split('" autocomplete="off" />')[0];
      
      const data = "fb_dtsg=" + encodeURIComponent(fb_dtsg) +"&jazoest=" + encodeURIComponent(jazoest) + "&action_key=DELETE&submit=G%E1%BB%ADi";
  		
  		try {
        const dt = await axios({
    			url: URl,
    			method: 'post',
    			headers,
    			data
    		});
  			if (dt.data.includes("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽")) throw new Error();
  			success.push(postID);
  		}
  		catch(err) {
  			failed.push(postID);
  		};
    }
    reply(`🚮 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 ${success.length} 𝗉𝗈𝗌𝗍𝗌 ${failed.length > 0 ? `\n❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖽𝖾𝗅𝖾𝗍𝖾 𝖿𝖺𝗂𝗅𝖾𝖽 ${failed.length} 𝗉𝗈𝗌𝗍𝗌, 𝗉𝗈𝗌𝗍𝖨𝖣: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'choiceIdReactionPost') {
    if (!body) return reply(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝗉𝗈𝗌𝗍 𝗂𝖽 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗋𝖾𝖺𝖼𝗍 𝗍𝗈`, (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "choiceIdReactionPost"
      });
    });
    
    const listID = body.replace(/\s+/g, " ").split(" ");
    
    reply(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝖾𝗆𝗈𝗍𝗂𝗈𝗇 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗋𝖾𝖺𝖼𝗍 𝗍𝗈 ${listID.length} 𝗉𝗈𝗌𝗍𝗌 (𝗎𝗇𝗅𝗂𝗄𝖾/𝗅𝗂𝗄𝖾/𝗅𝗈𝗏𝖾/𝗁𝖾𝖺𝗋𝗍/𝗁𝖺𝗁𝖺/𝗐𝗈𝗐/𝗌𝖺𝖽/𝖺𝗇𝗀𝗋𝗒)`, (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        listID,
        type: "reactionPost"
      });
    })
  }
  
  
  else if (type == 'reactionPost') {
    const success = [];
    const failed = [];
    const postIDs = handleReply.listID;
    const feeling = body.toLowerCase();
    if (!'unlike/like/love/heart/haha/wow/sad/angry'.split('/').includes(feeling)) return reply('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖼𝗁𝗈𝗈𝗌𝖾 𝗈𝗇𝖾 𝗈𝖿 𝗍𝗁𝖾 𝖿𝗈𝗅𝗅𝗈𝗐𝗂𝗇𝗀 𝖾𝗆𝗈𝗍𝗂𝗈𝗇𝗌 𝗎𝗇𝗅𝗂𝗄𝖾/𝗅𝗂𝗄𝖾/𝗅𝗈𝗏𝖾/𝗁𝖾𝖺𝗋𝗍/𝗁𝖺𝗁𝖺/𝗐𝗈𝗐/𝗌𝖺𝖽/𝖺𝗇𝗀𝗋𝗒', (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        listID,
        type: "reactionPost"
      })
    });
    for (const postID of postIDs) {
      try {
        await api.setPostReaction(Number(postID), feeling);
        success.push(postID);
      }
      catch(err) {
        failed.push(postID);
      }
    }
    reply(`🌟 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗋𝖾𝗅𝖾𝖺𝗌𝖾𝖽 𝖾𝗆𝗈𝗍𝗂𝗈𝗇𝗌 ${feeling} 𝗀𝗂𝗏𝖾 ${success.length} 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅 𝗉𝗈𝗌𝗍 ${failed.length > 0 ? `❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝗋𝖾𝖺𝖼𝗍𝗂𝗈𝗇 𝖿𝖺𝗂𝗅𝖾𝖽 ${failed.length} 𝗉𝗈𝗌𝗍𝗌, 𝗉𝗈𝗌𝗍𝖨𝖣: ${failed.join(" ")}` : ''}`);
  }
  
  
  else if (type == 'addFiends') {
    const listID = body.replace(/\s+/g, " ").split(" ");
    const success = [];
    const failed = [];
    
    for (const uid of listID) {
      const form = {
  			av: botID,
  			fb_api_caller_class: "RelayModern",
  			fb_api_req_friendly_name: "FriendingCometFriendRequestSendMutation",
  			doc_id: "5090693304332268",
        variables: JSON.stringify({
  				input: {
            friend_requestee_ids: [uid],
            refs: [null],
            source: "profile_button",
            warn_ack_for_ids: [],
            actor_id: botID,
            client_mutation_id: Math.round(Math.random() * 19).toString()
          },
          scale: 3
  			})
      };
      try {
        const sendAdd = await api.httpPost('https://www.facebook.com/api/graphql/', form);
        if (JSON.parse(sendAdd).errors) failed.push(uid);
        else success.push(uid)
      }
      catch(e) {
        failed.push(uid);
      };
    }
    reply(`📧 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝖿𝗋𝗂𝖾𝗇𝖽 𝗋𝖾𝗊𝗎𝖾𝗌𝗍 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗌𝖾𝗇𝗍 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗍𝗈 ${success.length} 𝗂𝖽 ${failed.length > 0 ? `\n❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝖺 𝖿𝗋𝗂𝖾𝗇𝖽 𝗋𝖾𝗊𝗎𝖾𝗌𝗍 𝗍𝗈 ${failed.length} 𝗂𝖽 𝖿𝖺𝗂𝗅𝗎𝗋𝖾: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'choiceIdSendMessage') {
    const listID = body.replace(/\s+/g, " ").split(" ");
    reply(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝗍𝖾𝗑𝗍 𝗈𝖿 𝗍𝗁𝖾 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗌𝖾𝗇𝖽 ${listID.length} 𝗎𝗌𝖾𝗋`, (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        listID,
        type: "sendMessage"
      });
    })
  }
  
  
  else if (type == 'unFriends') {
    const listID = body.replace(/\s+/g, " ").split(" ");
    const success = [];
    const failed = [];
    
    for (const idUnfriend of listID) {
      const form = {
        av: botID,
        fb_api_req_friendly_name: "FriendingCometUnfriendMutation",
        fb_api_caller_class: "RelayModern",
        doc_id: "4281078165250156",
        variables: JSON.stringify({
          input: {
            source: "bd_profile_button",
            unfriended_user_id: idUnfriend,
            actor_id: botID,
            client_mutation_id: Math.round(Math.random()*19)
          },
          scale:3
        })
      };
      try {
        const sendAdd = await api.httpPost('https://www.facebook.com/api/graphql/', form);
        if (JSON.parse(sendAdd).errors) failed.push(`${idUnfriend}: ${JSON.parse(sendAdd).errors[0].summary}`);
        else success.push(idUnfriend)
      }
      catch(e) {
        failed.push(idUnfriend);
      };
    }
    reply(`🚮 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 ${success.length} 𝖿𝗋𝗂𝖾𝗇𝖽 ${failed.length > 0 ? `\n❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖽𝖾𝗅𝖾𝗍𝖾 𝖿𝖺𝗂𝗅𝖾𝖽 ${failed.length} 𝖿𝗋𝗂𝖾𝗇𝖽:\n${failed.join("\n")}` : ""}`);
  }
  
  
  else if (type == 'sendMessage') {
    const listID = handleReply.listID;
    const success = [];
    const failed = [];
    for (const uid of listID) {
      try {
        const sendMsg = await api.sendMessage(body, uid);
        if (!sendMsg.messageID) failed.push(uid);
        else success.push(uid);
      }
      catch(e) {
        failed.push(uid);
      }
    }
    reply(`📨 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗌𝖾𝗇𝗍 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗍𝗈 ${success.length} 𝗎𝗌𝖾𝗋 ${failed.length > 0 ? `\n❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝖺 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗍𝗈 ${failed.length} 𝗎𝗌𝖾𝗋 𝖿𝖺𝗂𝗅𝖾𝖽: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'acceptFriendRequest' || type == 'deleteFriendRequest') {
    const listID = body.replace(/\s+/g, " ").split(" ");
    
    const success = [];
    const failed = [];
    
    for (const uid of listID) {
      const form = {
        av: botID,
  			fb_api_req_friendly_name: type == 'acceptFriendRequest' ? "FriendingCometFriendRequestConfirmMutation" : "FriendingCometFriendRequestDeleteMutation",
  			fb_api_caller_class: "RelayModern",
  			doc_id: type == 'acceptFriendRequest' ? "3147613905362928" : "4108254489275063",
  			variables: JSON.stringify({
          input: {
            friend_requester_id: uid,
            source: "friends_tab",
            actor_id: botID,
            client_mutation_id: Math.round(Math.random() * 19).toString()
          },
          scale: 3,
          refresh_num: 0
  			})
      };
      try {
        const friendRequest = await api.httpPost("https://www.facebook.com/api/graphql/", form);
        if (JSON.parse(friendRequest).errors) failed.push(uid);
        else success.push(uid);
      }
      catch(e) {
        failed.push(uid);
      }
    }
    reply(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 ${type == 'acceptFriendRequest' ? 'accept' : 'erase'} 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅 𝖿𝗋𝗂𝖾𝗇𝖽 𝗋𝖾𝗊𝗎𝖾𝗌𝗍 𝗈𝖿 ${success.length} 𝗂𝖽 ${failed.length > 0 ? `\n❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖿𝖺𝗂𝗅𝖾𝖽 𝗐𝗂𝗍𝗁 ${failed.length} 𝗂𝖽: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'noteCode') {
    axios({
      url: 'https://buildtool.dev/verification',
      method: 'post',
      data: `content=${encodeURIComponent(body)}&code_class=language${encodeURIComponent('-')}javascript`
    })
    .then(response => {
      const href = response.data.split('<a href="code-viewer.php?')[1].split('">Permanent link</a>')[0];
      reply(`Create a successful note, link: ${'https://buildtool.dev/code-viewer.php?' + href}`)
    })
    .catch(err => {
      reply('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋');
    })
  }
};


module.exports.run = async ({ event, api }) => {
  const { threadID, messageID, senderID } = event;
  
  api.sendMessage("⚙️𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗟𝗶𝘀𝘁 ⚙️"
     + "\n《𝟬𝟭》 𝖤𝖽𝗂𝗍 𝖻𝗈𝗍 𝖻𝗂𝗈"
     + "\n《𝟬𝟮》 𝖤𝖽𝗂𝗍 𝖻𝗈𝗍 𝗇𝗂𝖼𝗄𝗇𝖺𝗆𝖾𝗌"
     + "\n《𝟬𝟯》 𝖵𝗂𝖾𝗐 𝗉𝖾𝗇𝖽𝗂𝗇𝗀 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌"
     + "\n《𝟬𝟰》 𝖵𝗂𝖾𝗐 𝗎𝗇𝗋𝖾𝖺𝖽 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌"
     + "\n《𝟬𝟱》 𝖵𝗂𝖾𝗐 𝗌𝗉𝖺𝗆 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌"
     + "\n《𝟬𝟲》 𝖢𝗁𝖺𝗇𝗀𝖾 𝖻𝗈𝗍 𝖺𝗏𝖺𝗍𝖺𝗋"
     + "\n《𝟬𝟳》 𝖳𝗎𝗋𝗇 𝗈𝗇 𝗍𝗁𝖾 𝖻𝗈𝗍 𝖺𝗏𝖺𝗍𝖺𝗋 𝗌𝗁𝗂𝖾𝗅𝖽 <𝗈𝗇/𝗈𝖿𝖿>"
     + "\n《𝟬𝟴》 𝖡𝗅𝗈𝖼𝗄 𝗎𝗌𝖾𝗋𝗌 (𝗆𝖾𝗌𝗌𝖾𝗇𝗀𝖾𝗋)"
     + "\n《𝟬𝟵》 𝖴𝗇𝖻𝗅𝗈𝖼𝗄 𝗎𝗌𝖾𝗋𝗌 (𝗆𝖾𝗌𝗌𝖾𝗇𝗀𝖾𝗋)"
     + "\n《𝟭𝟬》 𝖢𝗋𝖾𝖺𝗍𝖾 𝗉𝗈𝗌𝗍"
     + "\n《𝟭𝟭》 𝖣𝖾𝗅𝖾𝗍𝖾 𝗉𝗈𝗌𝗍"
     + "\n《𝟭𝟮》 𝖣𝖾𝗅𝖾𝗍𝖾 𝗉𝗈𝗌𝗍 (𝗎𝗌𝖾𝗋)"
     + "\n《𝟭𝟯》 𝖢𝗈𝗆𝗆𝖾𝗇𝗍 𝗍𝗁𝖾 𝗉𝗈𝗌𝗍 (𝗀𝗋𝗈𝗎𝗉)"
     + "\n《𝟭𝟰》 𝖣𝗋𝗈𝗉 𝗉𝗈𝗌𝗍 𝖿𝖾𝖾𝗅𝗂𝗇𝗀𝗌"
     + "\n《𝟭𝟱》 𝖬𝖺𝗄𝖾 𝖿𝗋𝗂𝖾𝗇𝖽𝗌 𝖻𝗒 𝗂𝖽"
     + "\n《𝟭𝟲》 𝖠𝖼𝖼𝖾𝗉𝗍 𝖿𝗋𝗂𝖾𝗇𝖽 𝗋𝖾𝗊𝗎𝖾𝗌𝗍 𝖻𝗒 𝗂𝖽"
     + "\n《𝟭𝟳》 𝖣𝖾𝖼𝗅𝗂𝗇𝖾 𝖿𝗋𝗂𝖾𝗇𝖽 𝗋𝖾𝗊𝗎𝖾𝗌𝗍 𝖻𝗒 𝗂𝖽"
     + "\n《𝟭𝟴》 𝖣𝖾𝗅𝖾𝗍𝖾 𝖿𝗋𝗂𝖾𝗇𝖽𝗌 𝖻𝗒 𝗂𝖽"
     + "\n《𝟭𝟵》 𝖲𝖾𝗇𝖽 𝖺 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝖻𝗒 𝗂𝖽"
     + "\n《𝟮𝟬》 𝖬𝖺𝗄𝖾 𝗇𝗈𝗍𝖾𝗌 𝗈𝗇 𝖻𝗎𝗂𝗅𝖽𝗍𝗈𝗈𝗅.𝖽𝖾𝗏"
     + "\n《𝟮𝟭》 𝖫𝗈𝗀 𝗈𝗎𝗍 𝗈𝖿 𝗒𝗈𝗎𝗋 𝖺𝖼𝖼𝗈𝗎𝗇𝗍"
    + "\n````````````````````````````````"
    + `\n👥 | 𝗔𝗱𝗺𝗶𝗻 𝗜𝗗:\n${global.config.ADMINBOT.join("\n")}`
    + `\n🆔 | 𝗕𝗼𝘁 𝗜𝗗: ${api.getCurrentUserID()}`
    + `\nℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝗈𝗋𝖽𝖾𝗋 𝗇𝗎𝗆𝖻𝖾𝗋 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖾𝗑𝖾𝖼𝗎𝗍𝖾`
    + "\n````````````````````````````````", threadID, (err, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      messageID: info.messageID,
      author: senderID,
      type: "menu"
    });
  }, messageID);
};


function getGUID() {
    const key = `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`;
    let timeNow = Date.now(),
        r = key.replace(/[xy]/g, function (info) {
            let a = Math.floor((timeNow + Math.random() * 16) % 16);
            timeNow = Math.floor(timeNow / 16);
            let b = (info == 'x' ? a : a & 7 | 8).toString(16);
            return b;
        });
  console.log(r)
    return r;
}
getGUID()