module.exports.config = {
  name: "listfriend",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Réynél",
  description: "View friends information/Delete friends by replying",
  commandCategory: "facebook",
  usages: "[order number]",
  cooldowns: 5
};

module.exports.handleReply = async function ({ api, args, Users, handleReply, event, Threads }) {
  const { threadID, messageID } = event;
  if (parseInt(event.senderID) !== parseInt(handleReply.author)) return;

  switch (handleReply.type) {
    case "reply":
      {
        var msg ="" , name, urlUser, uidUser;
        var arrnum = event.body.split(" ");
        var nums = arrnum.map(n => parseInt(n));
        for (let num of nums) {
          name = handleReply.nameUser[num - 1];
          urlUser = handleReply.urlUser[num - 1];
          uidUser = handleReply.uidUser[num - 1];

          api.unfriend(uidUser);
          msg += '➣ ' + name + '\n🌐 | 𝗣𝗿𝗼𝗳𝗶𝗹𝗲𝗨𝗥𝗟: ' + urlUser + "\n";
          //console.log(msg);
        }

        api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖽𝖾𝗅𝖾𝗍𝖾 𝖿𝗋𝗂𝖾𝗇𝖽𝗌:\n\n${msg}`, threadID, () =>
          api.unsendMessage(handleReply.messageID));
      }
      break;
  }
};


module.exports.run = async function ({ event, api, args }) {
  const { threadID, messageID, senderID } = event;
  //var unfriend =  await api.unfriend();
  try {
    var listFriend = [];
    var dataFriend = await api.getFriendsList();
    var countFr = dataFriend.length;

    for (var friends of dataFriend) {
      listFriend.push({
        name: friends.fullName || "Unnamed",
        uid: friends.userID,
        gender: friends.gender,
        vanity: friends.vanity,
        profileUrl: friends.profileUrl
      });
    }
    var nameUser = [], urlUser = [], uidUser = [];
    var page = 1;
    page = parseInt(args[0]) || 1;
    page < -1 ? page = 1 : "";
    var limit = 10;
    var msg = `🎭 | 𝗗𝗦 𝗜𝗡𝗖𝗟𝗨𝗗𝗘𝗦 ${countFr} 𝗙𝗥𝗜𝗘𝗡𝗗𝗦\n\n`;
    var numPage = Math.ceil(listFriend.length / limit);

    for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
      if (i >= listFriend.length) break;
      let infoFriend = listFriend[i];
      msg += `${i + 1}. ${infoFriend.name}\n🆔 | 𝗜𝗗: ${infoFriend.uid}\n🧏‍♂️ | 𝗚𝗲𝗻𝗱𝗲𝗿: ${infoFriend.gender}\n❄️ | 𝗩𝗮𝗻𝗶𝘁𝘆: ${infoFriend.vanity}\n🌐 | 𝗣𝗿𝗼𝗳𝗶𝗹𝗲 𝗨𝗿𝗹:\n${infoFriend.profileUrl}\n\n`;
      nameUser.push(infoFriend.name);
      urlUser.push(infoFriend.profileUrl);
      uidUser.push(infoFriend.uid);
    }
    msg += `✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n--⪼ 𝗣𝗮𝗴𝗲 〘${page}/${numPage}〙⪻\n\nℹ️ | 𝗨𝘀𝗲: 𝗅𝗂𝗌𝗍𝖿𝗋𝗂𝖾𝗇𝖽 𝗉𝖺𝗀𝖾 𝗇𝗎𝗆𝖻𝖾𝗋/𝖺𝗅𝗅\n\n`;

    return api.sendMessage(msg + 'ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗇𝗎𝗆𝖻𝖾𝗋 𝗂𝗇 𝗈𝗋𝖽𝖾𝗋 (𝖿𝗋𝗈𝗆 𝟣->𝟣𝟢), 𝖼𝖺𝗇 𝗋𝖾𝗉𝗅𝗒 𝗆𝗎𝗅𝗍𝗂𝗉𝗅𝖾 𝗇𝗎𝗆𝖻𝖾𝗋𝗌, 𝗌𝖾𝗉𝖺𝗋𝖺𝗍𝖾𝖽 𝖻𝗒 𝗐𝖺𝗒 𝗌𝗂𝗀𝗇 𝗍𝗈 𝖽𝖾𝗅𝖾𝗍𝖾 𝗍𝗁𝖺𝗍 𝖿𝗋𝗂𝖾𝗇𝖽 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗅𝗂𝗌𝗍.', event.threadID, (e, data) =>
      global.client.handleReply.push({
        name: this.config.name,
        author: event.senderID,
        messageID: data.messageID,
        nameUser,
        urlUser,
        uidUser,
        type: 'reply'
      })
    )
  }
  catch (e) {
    return console.log(e)
  }
}