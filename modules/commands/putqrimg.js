const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

module.exports.config = {
  name: "putqrimg",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Overlay a smaller image onto the replied image",
  commandCategory: "tools",
  usages: "[reply to qrv2 image]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    const messageReply = event.messageReply;
    if (!messageReply || args.length === 0) {
        return api.sendMessage("ℹ️ | 𝗨𝘀𝗮𝗴𝗲: 𝖲𝖾𝗇𝖽 𝖺 𝗉𝗁𝗈𝗍𝗈 𝖺𝗇𝖽 𝗋𝖾𝗉𝗅𝗒 𝗐𝗂𝗍𝗁 𝗉𝗎𝗍 [𝗂𝗆𝖺𝗀𝖾 𝖴𝖱𝖫]", event.threadID);
    }

    try {
        const imageAttachments = messageReply.attachments;
        if (!imageAttachments || imageAttachments.length === 0) {
            return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗎𝗇𝖺𝖻𝗅𝖾 𝗍𝗈 𝖿𝖾𝗍𝖼𝗁 𝗍𝗁𝖾 𝗂𝗆𝖺𝗀𝖾 𝗒𝗈𝗎 𝗋𝖾𝗉𝗅𝗂𝖾𝖽 𝗍𝗈.", event.threadID);
        }

        const imageAttachment = imageAttachments[0];
        const imageUrl = imageAttachment.url;
        const overlayImageUrl = args[0];

        const imageBuffer = await loadImage(imageUrl);
        const overlayImageBuffer = await loadImage(overlayImageUrl);

        const canvas = createCanvas(imageBuffer.width, imageBuffer.height);
        const context = canvas.getContext("2d");

        context.drawImage(imageBuffer, 0, 0, imageBuffer.width, imageBuffer.height);

        const scaleFactor = 0.2; // Adjust this to make the overlay image even smaller
        const overlayWidth = overlayImageBuffer.width * scaleFactor;
        const overlayHeight = overlayImageBuffer.height * scaleFactor;
        const offsetX = (imageBuffer.width - overlayWidth) / 2;
        const offsetY = (imageBuffer.height - overlayHeight) / 2;

        context.drawImage(overlayImageBuffer, offsetX, offsetY, overlayWidth, overlayHeight);

        const editedImageBuffer = canvas.toBuffer();

        fs.writeFileSync("editedImage.png", editedImageBuffer);

        return api.sendMessage({
            body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 𝖾𝖽𝗂𝗍𝖾𝖽 𝗂𝗆𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝗈𝗏𝖾𝗋𝗅𝖺𝗒:",
            attachment: fs.createReadStream("editedImage.png"),
        }, event.threadID);

    } catch (error) {
        console.error(error);
        return api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝖾𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝗂𝗆𝖺𝗀𝖾𝗌.", event.threadID);
    }
};
      