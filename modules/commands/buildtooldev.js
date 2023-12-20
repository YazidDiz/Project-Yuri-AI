module.exports.config = {
  name: "buildtooldev",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Réynél",
  description: "Upload the file to buildtool.dev and apply the code from buildtool.dev",
  commandCategory: "admin",
  cooldowns: 0
};

module.exports.run = async function ({ api, event,args }) {
  const request = require('request')
  const cheerio = require('cheerio');
  const fs = require('fs')
  const { threadID, messageID } = event;
  const content = args.join(' ');
  if(!content) return api.sendMessage('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝖽𝖺𝗍𝖺 𝗂𝗌 𝗆𝗂𝗌𝗌𝗂𝗇𝗀.', threadID, messageID);
  if(content.endsWith(".js") || content.endsWith(".json")) {
    var data = await fs.readFile(
      `${__dirname}/${content}`,
      "utf-8",
      async function (err, data) {
        if (err) return api.sendMessage(`❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝖿𝗂𝗅𝖾 𝗇𝗈𝗍 𝖿𝗈𝗎𝗇𝖽: 《${content}》`, threadID, messageID);
        await builtooldev(data)
      }
    );
  }
  else if(event.type == "message_reply" && (event.messageReply.body.indexOf('https://buildtool.') !== -1 || event.messageReply.body.indexOf('https://tinyurl.com') !== -1)) {
    if(!args[0]) return api.sendMessage('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖾𝗇𝗍𝖾𝗋 𝗍𝗁𝖾 𝖿𝗂𝗅𝖾 𝗇𝖺𝗆𝖾 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖺𝗉𝗉𝗅𝗒 𝗍𝗁𝖾 𝗇𝖾𝗐 𝖼𝗈𝖽𝖾.', threadID, messageID);
    const options = {
      method: 'GET',
      url: event.messageReply.body
    };
    request(options, function (error, response, body) {
      if(error) return api.sendMessage('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗈𝗇𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝖾 𝗅𝗂𝗇𝗄 (𝖼𝗈𝗇𝗍𝖺𝗂𝗇𝗌 𝗇𝗈𝗍𝗁𝗂𝗇𝗀 𝖻𝗎𝗍 𝗅𝗂𝗇𝗄𝗌)', threadID, messageID);
      const load = cheerio.load(body);
      load('.language-js').each((index, el) => {
        if(index !== 0) return;
        var code = el.children[0].data
        fs.writeFile(`${__dirname}/${args[0]}.js`, code, "utf-8",
          function(err) {
            if (err) return api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖺𝗉𝗉𝗅𝗒𝗂𝗇𝗀 𝗍𝗁𝖾 𝗇𝖾𝗐 𝖼𝗈𝖽𝖾 𝗍𝗈 《${args[0]}.𝗃𝗌》`);
            return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖺𝖽𝖽𝖾𝖽 𝗍𝗁𝗂𝗌 𝖼𝗈𝖽𝖾 𝗍𝗈 《${args[0]}.𝗃𝗌》`, threadID, messageID);
          }
        );
      });
    });
  }
  else {
    await builtooldev(content)
  }
  async function builtooldev(content) {
    const options = {
        method: 'POST',
        url: 'https://buildtool.dev/verification',
        headers: {
          'cookie': 'paste_submitted=yes; last_code_class=language-js; last_page_link=code-viewer.php%3Fpaste%3D097ba7.language-js'
        },
        form: {
          'content': content,
          'code_class': 'language-js'
        }
    };
    request(options, function (error, response, body) {
      if(error) return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽', threadID, messageID);
      const $ = cheerio.load(body);
      $('a').each((index, el) => {
      if(index !== 0) return;
        return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖻𝗎𝗂𝗅𝖽𝗍𝗈𝗈𝗅𝖽𝖾𝗏 𝗅𝗂𝗇𝗄: https://buildtool.dev/${el.attribs.href}`, threadID,
            async function(error, info) {
                if(error) return await shortLink(el.attribs.href)
            }, messageID);
      });
    });
  }
  async function shortLink(link) {
    const turl = require('turl');
    turl.shorten('https://buildtool.dev/' + link).then((res) => {
      return api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖽𝗎𝖾 𝗍𝗈 𝗍𝗁𝖾 𝗋𝖾𝗌𝗍𝗋𝗂𝖼𝗍𝗂𝗈𝗇𝗌, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗌𝖾𝗇𝖽 𝗌𝗁𝗈𝗋𝗍𝖾𝗇𝖾𝖽 𝗅𝗂𝗇𝗄: ${res}`, threadID, messageID);
    }).catch((err) => {
      return api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗆𝗈𝗏𝖾 𝗌𝗉𝖺𝖼𝖾𝗌: https://buildtool. dev/${link}`, threadID, messageID);
    });
  }
}