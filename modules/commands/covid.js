module.exports.config = {
  name: "covid",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "View covid19 information",
  commandCategory: "information",
  usages: "[Name of the country]",
  cooldowns: 5
};

module.exports.run = async (
{
  api,
  event,
  args
}) =>
{
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  var tip = args.join(" ");
  if (!tip) return api.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗄𝗂𝗇𝖽𝗅𝗒 𝖽𝗈𝗇'𝗍 𝖿𝗈𝗋𝗀𝖾𝗍 𝗍𝗈 𝖾𝗇𝗍𝖾𝗋 𝖺 𝖼𝗈𝗎𝗇𝗍𝗋𝗒 🌎 𝗇𝖺𝗆𝖾`, event.threadID, event.messageID);
  else
  {
    axios.get(`https://disease.sh/v3/covid-19/countries/${encodeURIComponent(tip)}`).then(res =>
    {
      let nhiem = res.data.cases,
        chet = res.data.deaths,
        dieutri = res.data.recovered,
        danso = res.data.population,
        chauluc = res.data.continent,
        quocgia = res.data.country
      var flag = res.data.countryInfo.flag;
      let callback = function ()
      {
        api.sendMessage(
        {
          body: `══✿══╡°𝗖𝗼𝘃𝗶𝗱°╞══✿══\n\n🌎 | 𝗖𝗼𝘂𝗻𝘁𝗿𝘆: ${quocgia}\n\n🦠 | 𝗜𝗻𝗳𝗲𝗰𝘁𝗶𝗼𝗻: ${nhiem}\n☠️ 𝗗𝗲𝗮𝘁𝗵: ${chet} \n❤️ | 𝗧𝗿𝗲𝗮𝘁𝗺𝗲𝗻𝘁: ${dieutri}\n📝 | 𝗣𝗼𝗽𝘂𝗹𝗮𝘁𝗶𝗼𝗻: ${danso}\n🔎 | 𝗖𝗼𝗻𝘁𝗶𝗻𝗲𝗻𝘁: ${chauluc}\n\n꙳☪︎●◉✿𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗬𝗨𝗥𝗜✿◉●☪︎꙳\n╚═══ೋღ∘🌺∘ღೋ═══╝`,
          attachment: fs.createReadStream(__dirname + `/cache/covidtk.png`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/covidtk.png`), event.messageID);
      };
      request(encodeURI(flag)).pipe(fs.createWriteStream(__dirname + `/cache/covidtk.png`)).on("close", callback);
    })
  }
}