module.exports.config = {
  name: "catchpastebin",
  version: "0.0.1",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Send pastebin links to admins",
  commandCategory: "reports",
  usages: "[cmdname question]",
  cooldowns: 0,
  dependencies: {},
};

module.exports.run = async function ({ api, event, args, Users, Threads }) {
  const destination = "100080098527733"; // change to your uid

  const { senderID, threadID, body } = event;
  const data = await Users.getData(senderID);
  const name = data.name;
  const thread = await Threads.getData(threadID);
  const threadName = thread.threadName;

  if (body.includes(`https://pastebin.com`)) {
    api.sendMessage(`⚠️ | 𝗣𝗮𝘀𝘁𝗲𝗯𝗶𝗻 𝗔𝗹𝗲𝗿𝘁:
    » 𝗙𝗿𝗼𝗺: ${name}
    » 𝗨𝗜𝗗: ${senderID}
    » 𝗧𝗵𝗿𝗲𝗮𝗱: ${threadName}
    » 𝗚𝗖𝗜𝗗: ${threadID}
    🔖 | 𝗖𝗼𝗻𝘁𝗲𝗻𝘁:
    ${body}\n╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n  ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯`, 100080098527733);

    api.sendMessage(`⚠️ | 𝗣𝗮𝘀𝘁𝗲𝗯𝗶𝗻 𝗔𝗹𝗲𝗿𝘁:
    » 𝗙𝗿𝗼𝗺: ${name}
    » 𝗨𝗜𝗗: ${senderID}
    » 𝗧𝗵𝗿𝗲𝗮𝗱: ${threadName}
    » 𝗚𝗖𝗜𝗗: ${threadID}
    🔖 | 𝗖𝗼𝗻𝘁𝗲𝗻𝘁:
    ${body}\n╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n  ⟬𝗥.𝗖.𝗕.⟭ 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯`, destination);
  }
};