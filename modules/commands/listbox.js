module.exports.config = {
  name: 'listgroups',
  version: '1.0.0',
  credits: 'Réynél',
  hasPermssion: 2,
  description: 'List thread bot participated',
  commandCategory: 'admin',
  usages: '[out or ban + order number]',
  cooldowns: 15
};


module.exports.handleReply = async function({ api, event, args, Threads, handleReply }) {

  if (parseInt(event.senderID) !== parseInt(handleReply.author)) return;

  var arg = event.body.split(" ");
  var idgr = handleReply.groupid[arg[1] - 1];


  switch (handleReply.type) {

    case "reply":
      {
        if (arg[0] == "ban" || arg[0] == "Ban") {
          const data = (await Threads.getData(idgr)).data || {};
          data.banned = 1;
          await Threads.setData(idgr, { data });
          global.data.threadBanned.set(parseInt(idgr), 1);
          api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖻𝖺𝗇𝗇𝖾𝖽 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 《${idgr}》`, event.threadID, event.messageID);
          break;
        }

        if (arg[0] == "leave" || arg[0] == "Leave") {
          api.removeUserFromGroup(`${api.getCurrentUserID()}`, idgr);
          api.sendMessage("✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗅𝖾𝖿𝗍 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝗐𝗂𝗍𝗁 𝖨𝖣: " + idgr + "\n" + (await Threads.getData(idgr)).name, event.threadID, event.messageID);
          break;
        }

      }
  }
};


module.exports.run = async function({ api, event, client }) {
  var inbox = await api.getThreadList(100, null, ['INBOX']);
  let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);

  var listthread = [];

  //////////


  for (var groupInfo of list) {
    let data = (await api.getThreadInfo(groupInfo.threadID));

    listthread.push({
      id: groupInfo.threadID,
      name: groupInfo.name,
      sotv: data.userInfo.length,
    });

  } //for

  var listbox = listthread.sort((a, b) => {
    if (a.sotv > b.sotv) return -1;
    if (a.sotv < b.sotv) return 1;
  });

  let msg = '',
    i = 1;
  var groupid = [];
  for (var group of listbox) {
    msg += `${i++}. ${group.name}\n🧩 | 𝗧𝗜𝗗: ${group.id}\n🐸 | 𝗠𝗲𝗺𝗯𝗲𝗿𝘀: ${group.sotv}\n\n`;
    groupid.push(group.id);
  }

  api.sendMessage(msg + 'ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 "𝗅𝖾𝖺𝗏𝖾" 𝗈𝗋 "𝖻𝖺𝗇" 𝗍𝗁𝖾 𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝗈𝗋𝖽𝖾𝗋 𝗍𝗈 𝗅𝖾𝖺𝗏𝖾 𝗈𝗋 𝖻𝖺𝗇 𝗍𝗁𝖺𝗍 𝗀𝗋𝗈𝗎𝗉 𝗒𝗈𝗎 𝖼𝗁𝗈𝗌𝖾𝗇.', event.threadID, (e, data) =>
    global.client.handleReply.push({
      name: this.config.name,
      author: event.senderID,
      messageID: data.messageID,
      groupid,
      type: 'reply'
    })
  );
};