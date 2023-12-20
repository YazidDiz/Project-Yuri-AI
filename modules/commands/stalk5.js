const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');

module.exports.config = {
    name: "stalk",
    version: "30.0.0",
    hasPermission: 0,
    credits: "Choru TikTokers",
    description: "Retrieve user details from Facebook.",
    usages: "[stalk name]",
    commandCategory: "Information",
    cooldown: 5
};

module.exports.run = async ({ api, event, args }) => {
    try {
        let targetID = `${args.join(" ") || event.senderID}`;
        if (Object.keys(event.mentions).length > 0) {
            targetID = Object.keys(event.mentions)[0];
        }
        

        const userMapping = await api.getUserInfo(targetID);
        const userInfo = userMapping[targetID];

        if (userInfo) {
            const v2 = await api.getUserInfoV2(targetID);
            var obj = Object.keys(userMapping);
            var userName = userMapping[obj].name.replace("@", "");

            const formattedInfo = `
𝗧𝗵𝗿𝗲𝗮𝗱 𝗜𝗗: ${event.threadID}
𝗡𝗮𝗺𝗲: ${userName} 
𝗨𝗶𝗱: ${userInfo.uid}
𝗙𝗶𝗿𝘀𝘁 𝗡𝗮𝗺𝗲: ${userInfo.firstName}
𝗩𝗮𝗻𝗶𝘁𝘆: ${userInfo.vanity === 'Không Xác Định' ? 'Not found' : userInfo.vanity}
𝗣𝗿𝗼𝗳𝗶𝗹𝗲 𝗨𝗥𝗟: ${userInfo.profileUrl === 'Không Xác Định' ? 'Not found' : userInfo.profileUrl}
𝗚𝗲𝗻𝗱𝗲𝗿: ${userInfo.gender === 'Không Xác Định' ? 'Not found' : userInfo.gender}
𝗧𝘆𝗽𝗲: ${userInfo.type === 'Không Xác Định' ? 'Not found' : userInfo.type}
Is Friend: ${userInfo.isFriend ? 'Yes' : 'No'}
𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆 𝗧𝗼𝗱𝗮𝘆: ${v2.birthday ? 'Yes' : 'No'}
𝗙𝗼𝗹𝗹𝗼𝘄𝗲𝗿𝘀: ${v2.follow === 'Không Xác Định' ? 'Not found' : v2.follow}
𝗩𝗲𝗿𝗶𝗳𝗶𝗲𝗱: ${v2.verified === 'Không Xác Định' ? 'Not found' : v2.verified}
𝗔𝗯𝗼𝘂𝘁: ${v2.about === 'Không Xác Định' ? '𝗡𝗼 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻' : v2.about}
𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽 𝗦𝘁𝗮𝘁𝘂𝘀: ${v2.relationship_status === 'Không Xác Định' ? '𝖭𝗈𝗍 𝖥𝗈𝗎𝗇𝖽' : v2.relationship_status}
𝗟𝗼𝗰𝗮𝘁𝗶𝗼𝗻: ${v2.location === 'Không Xác Định' ? '𝖭𝗈𝗍 𝖥𝗈𝗎𝗇𝖽/𝖥𝗋𝗈𝗆 𝖮𝗎𝗍𝖾𝗋𝗌𝗉𝖺𝖼𝖾' : v2.location}
𝗛𝗼𝗺𝗲𝘁𝗼𝘄𝗻: ${v2.hometown === 'Không Xác Định' ? '𝖧𝗈𝗆𝖾𝗅𝖾𝗌𝗌' : v2.hometown}
`;




            const combinedPath = path.join(__dirname, './cache/combined.jpg');

            const sendMsgWithCombinedImage = () => {
                api.sendMessage({
                    body: formattedInfo,
                    attachment: fs.createReadStream(combinedPath)
                }, event.threadID, () => {
                    fs.unlinkSync(combinedPath);
                });
            };

            const [avatarResp, bgResp] = await Promise.all([
                axios.get(userInfo.highResProfilePic, { responseType: 'arraybuffer' }),
                axios.get('https://i.ibb.co/2yt37gd/New-Project-1122-A84-B16-C.png', { responseType: 'arraybuffer' })
            ]);

            const [avatar, bgImage] = await Promise.all([
                loadImage(Buffer.from(avatarResp.data)),
                loadImage(Buffer.from(bgResp.data))
            ]);

            const canvas = createCanvas(bgImage.width, bgImage.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height);
            let x = 279;
            let y = 164;
            let width = 753;
            let height = 755;
            let radius = 50;

            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.arcTo(x + width, y, x + width, y + height, radius);
            ctx.arcTo(x + width, y + height, x, y + height, radius);
            ctx.arcTo(x, y + height, x, y, radius);
            ctx.arcTo(x, y, x + width, y, radius);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(avatar, x, y, width, height);
            const out = fs.createWriteStream(combinedPath);
            const stream = canvas.createJPEGStream();
            stream.pipe(out);
            out.on('finish', sendMsgWithCombinedImage);
        } else {
            api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖨 𝖼𝗈𝗎𝗅𝖽𝗇'𝗍 𝖿𝖾𝗍𝖼𝗁 𝗎𝗌𝖾𝗋 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.", event.threadID);
        }
    } catch (err) {
        console.error(err);
        api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗎𝗌𝖾𝗋 𝗂𝗇𝖿𝗈.", event.threadID);
    }
};
