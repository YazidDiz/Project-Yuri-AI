module.exports.config = {
	name: "dictionary",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Clark",
	description: "Check dictionary",
  usage: "[text]",
	commandCategory: "education",
  cooldowns: 5
}

module.exports.run = function({api,event,args}) {
  const { threadID, messageID } = event;
  const fs = require('fs');
  if (args[0]) {
    return require('axios').get(encodeURI(`https://api.dictionaryapi.dev/api/v2/entries/en/${args.join(" ").trim().toLowerCase()}`)).then(res => {
      let data = res.data[0];
      let example = data.meanings[0].definitions.example;
      let phonetics = data.phonetics;
      let meanings = data.meanings
      msg_meanings = "";
      meanings.forEach(items => {
        example = items.definitions[0].example?`\n*example:\n \"${items.definitions[0].example[0].toUpperCase() + items.definitions[0].example.slice(1)}\"`:'';
        msg_meanings += `\n• ${items.partOfSpeech}\n ${items.definitions[0].definition[0].toUpperCase() + items.definitions[0].definition.slice(1) + example}`
      });
      msg_phonetics = '';
      phonetics.forEach(items => {
        text = items.text?`\n    /${items.text}/`:'';
        msg_phonetics += text;
      })
      var msg = `❰ ❝ ${data.word} ❞ ❱` +
                msg_phonetics +
                msg_meanings;
      return api.sendMessage(msg, threadID, messageID);
    }).catch(err => {
      if (err.response.status === 404) {
        return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗇𝗈 𝖽𝖾𝖿𝗂𝗇𝗂𝗍𝗂𝗈𝗇𝗌 𝖿𝗈𝗎𝗇𝖽.', threadID, messageID);
      }
    })
  } else api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗂𝗇𝗉𝗎𝗍 𝗂𝗌 𝗆𝗂𝗌𝗌𝗂𝗇𝗀, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝖺𝗇𝖽 𝗂𝗇𝗈𝗎𝗍 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 𝗒𝗈𝗎 𝖺𝗋𝖾 𝗅𝗈𝗈𝗄𝗂𝗇𝗀 𝖿𝗈𝗋 𝖽𝖾𝖿𝗂𝗇𝗂𝗍𝗂𝗈𝗇.', threadID, messageID);
}