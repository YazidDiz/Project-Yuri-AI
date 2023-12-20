const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "nikke",
  version: "0.0.1",
  hasPermssion: 0,
  credits: "Réynél",
  description: "random picture of Nikke, the goddess of victory in a game",
  commandCategory: "anime",
  usages: "[nikke]",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": ""
  }
};

module.exports.run = async ({ api, event, args }) => {
  try {
    const apiKey = 'aHR0cHM6Ly9zaGFkb3cucmVpa29kZXYyNHByb3BsLnJlcGwuY28vcmFuZG9tL25pa2tl';
    const read = Buffer.from(apiKey, 'base64').toString('utf-8');
    const response = await axios.get(read);

    if (response.status === 200 && response.data.imageURL) {
      const randomLink = response.data.imageURL;

      const imageResponse = await axios.get(randomLink, { responseType: "arraybuffer" });
      const fileExtension = randomLink.split(".").pop();
      const fileName = `${Date.now()}.${fileExtension}`;
      await fs.writeFile(__dirname + "/cache/" + fileName, imageResponse.data);
      await api.sendMessage(
        {
          body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗋𝖺𝗇𝖽𝗈𝗆 𝗇𝗂𝗄𝗄𝖾 𝗉𝗁𝗈𝗍𝗈`,
          attachment: fs.createReadStream(__dirname + "/cache/" + fileName),
        },
        event.threadID
      );
      await fs.unlink(__dirname + "/cache/" + fileName);
    } else {
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝖿𝖾𝗍𝖼𝗁 𝖺 𝗋𝖺𝗇𝖽𝗈𝗆 𝖭𝗂𝗄𝗄𝖾 𝗉𝗂𝖼𝗍𝗎𝗋𝖾 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝖠𝖯𝖨.", event.threadID);
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
};





