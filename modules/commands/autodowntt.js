const configCommand = {
    name: 'autodown',
    version: '1.1.1',
    hasPermssion: 2,
    credits: 'Réynél',
    description: 'Auto download tiktok video',
    commandCategory: 'downloader',
    usages: '[send link]',
    cooldowns: 3
},
axios = require('axios'),
reqStreamURL = async url => (await axios.get(url, {
    responseType: 'stream'
})).data,
statusAuto = {};
async function noprefix(arg) {

    if (!statusAuto[arg.event.threadID] || arg.event.senderID == arg.api.getCurrentUserID()) return;
    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Manila").format("HH:mm:ss");
    const out = (a, b, c, d) => arg.api.sendMessage(a, b?b: arg.event.threadID, c?c: null, d?d: arg.event.messageID),
    arr = arg.event.args,
    regEx_tiktok = /https:\/\/((vt)\.)?(tiktok)\.com\//;
    if(arg.event.type == 'message_reply') arr.push(...arg.event.messageReply.args);
    for (const el of arr) {
        /* TỰ ĐỘNG TẢI VIDEO TIKTOK */
        if (regEx_tiktok.test(el)) {
          const data = (await axios.post(`https://www.tikwm.com/api/`, {
                url: el
            })).data.data;

            out({
               body: `==== 𝗧𝗜𝗞𝗧𝗢𝗞 𝗩𝗜𝗗𝗘𝗢 ====\n━━━━━━━━━━━━━━━━━━\n》𝗧𝗶𝗸𝘁𝗼𝗸: ${data.title}.\n》𝗟𝗶𝗸𝗲𝘀: ${data.digg_count}.\n》𝗖𝗼𝗺𝗺𝗲𝗻𝘁𝘀: ${data.comment_count}\n》𝗦𝗵𝗮𝗿𝗲𝘀: ${data.share_count}\n》𝗧𝗶𝗺𝗲: ${data.download_count}\n\n====== ${time} ======` ,attachment: await reqStreamURL(data.play)}); // Video không logo thì sửa "wmplay" -> "play";
        };
        /* END */
    };
};
function runCommand(arg) {
    const out = (a, b, c, d) => arg.api.sendMessage(a, b?b: arg.event.threadID, c?c: null, d?d: arg.event.messageID);
    try {
        s = statusAuto[arg.event.threadID] = !!statusAuto[arg.event.threadID]?false: true;
        out((s?'✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗎𝗋𝗇𝖾𝖽 𝗈𝗇 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗍𝗂𝗄𝗍𝗈𝗄 𝖺𝗎𝗍𝗈𝖽𝗈𝗐𝗇': '✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗎𝗋𝗇𝖾𝖽 𝗈𝖿𝖿 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗍𝗂𝗄𝗍𝗈𝗄 𝖺𝗎𝗍𝗈𝖽𝗈𝗐𝗇')+' '+configCommand.name);
    }catch(e) {
        out(e);
    };
};

module.exports = {
    config: configCommand,
    run: runCommand,
    handleEvent: noprefix
}