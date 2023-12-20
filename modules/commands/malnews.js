module.exports.config = {
	name: "malnews",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Réynél",
	description: "get latest news of anime from MyAnimeList",
	commandCategory: "anime",
	usages: "[malnews]",
	cooldowns: 5
};
module.exports.run = async function({ api, event }) {

const malScraper = require('mal-scraper');
  const axios = require('axios');
  const nbNews = 5

malScraper.getNewsNoDetails(nbNews)
  .then((n) => api.sendMessage("✿╡𝗠𝘆 𝗔𝗻𝗶𝗺𝗲 𝗟𝗶𝘀𝘁 𝗡𝗲𝘄𝘀╞✿\n𝗧𝗢𝗣 𝟱 𝗟𝗔𝗧𝗘𝗦𝗧 𝗠𝗔𝗟 𝗡𝗘𝗪𝗦\n\n《 𝟭 》"+n[0].title+"\n\n《 𝟮 》"+n[1].title+"\n\n《 𝟯 》"+n[2].title+"\n\n《 𝟰 》"+n[3].title+"\n\n《 𝟱 》"+n[4].title,event.threadID,event.messageID))
  .catch((err) => console.log(err))
}