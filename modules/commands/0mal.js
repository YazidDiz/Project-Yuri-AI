module.exports.config = {
	name: "mal",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Clark",
	description: "Search Anime from Myanimelist",
	commandCategory: "anime",
	usages: "[name of anime]",
	cooldowns: 5
};


module.exports.run = async ({ api, event }) => {
	const axios = require("axios");
    const Scraper = require('mal-scraper');
	const request = require('request');
	const fs = require("fs");

let input = event.body;

  var query = input;     query = input.substring(5)
let data = input.split(" ");
  
    let Replaced = query.replace(/ /g, " ");
  api.sendMessage(`🔎 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖿𝗈𝗋 《${Replaced}》...`, event.threadID, event.messageID);

const Anime = await Scraper.getInfoFromName(Replaced)
 .catch(err => {
                     api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽" + err, event.threadID, event.messageID);
           }); 
    
   console.log(Anime)                
    let getURL = Anime.picture;

    let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
    
       if (!Anime.genres[0] || Anime.genres[0] === null) Anime.genres[0] = "None";

    var title = Anime.title;
var japTitle = Anime.japaneseTitle
var type = Anime.type;
var status = Anime.status;
var premiered = Anime.premiered;
var broadcast = Anime.broadcast;
var aired = Anime.aired;
var producers = Anime.producers;
var studios = Anime.studios;
var source = Anime.source;
var episodes = Anime.episodes;
var duration = Anime.duration;
var genres = Anime.genres.join(", ");    
var popularity = Anime.popularity;
var ranked = Anime.ranked;
var score = Anime.score;    
var rating = Anime.rating;
var synopsis = Anime.synopsis;
var url = Anime.url;  
var endD = Anime.end_date;

    
        let callback = function () {           
 api.sendMessage({
     body:`══✿╡꙳𝗠𝘆 𝗔𝗻𝗶𝗺𝗲 𝗟𝗶𝘀𝘁꙳╞✿══\n\n𝗧𝗶𝘁𝗹𝗲: ${title}\n𝗝𝗮𝗽𝗮𝗻𝗲𝘀𝗲: ${japTitle}\n𝗧𝘆𝗽𝗲: ${type}\n𝗦𝘁𝗮𝘁𝘂𝘀: ${status}\n𝗣𝗿𝗲𝗺𝗶𝗲𝗿𝗲𝗱: ${premiered}\n𝗕𝗿𝗼𝗮𝗱𝗰𝗮𝘀𝘁: ${broadcast}\n𝗔𝗶𝗿𝗲𝗱: ${aired}\n𝗣𝗿𝗼𝗱𝘂𝗰𝗲𝗿𝘀: ${producers}\n𝗦𝘁𝘂𝗱𝗶𝗼𝘀: ${studios}\n𝗦𝗼𝘂𝗿𝗰𝗲: ${source}\n𝗘𝗽𝗶𝘀𝗼𝗱𝗲𝘀: ${episodes}\n𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${duration}\n𝗚𝗲𝗻𝗿𝗲𝘀: ${genres}\n𝗣𝗼𝗽𝘂𝗹𝗮𝗿𝗶𝘁𝘆: ${popularity}\n𝗥𝗮𝗻𝗸𝗲𝗱: ${ranked}\n𝗦𝗰𝗼𝗿𝗲: ${score}\n𝗥𝗮𝘁𝗶𝗻𝗴𝘀: ${rating}\n\n𝗦𝘆𝗻𝗼𝗽𝘀𝗶𝘀: \n${synopsis}\n𝗟𝗶𝗻𝗸: ${url}\n\n╚═══ ೋღ∘🌺∘ღೋ ═══╝`, 
					attachment: fs.createReadStream(__dirname + `/cache/mal.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/mal.${ext}`), event.messageID)
				}
    
 //   }
        request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/mal.${ext}`)).on("close", callback)           
}		


