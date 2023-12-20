const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "movieinfo",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Get information about a movie",
  usages: "[title]",
  commandCategory: "information",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const apiKey = "db4f9cfb";
  const youtubeApiKey = "AIzaSyBkeljYcuoBOHfx523FH2AEENlciKnm3jM";
  const title = args.join(" ");

  if (!title) {
    api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗆𝗈𝗏𝗂𝖾 𝗍𝗂𝗍𝗅𝖾.", event.threadID, event.messageID);
    return;
  }

  const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const movieData = response.data;

    if (movieData.Response === "False") {
      api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝗍𝗁𝖾 𝗆𝗈𝗏𝗂𝖾 𝗇𝗈𝗍 𝖿𝗈𝗎𝗇𝖽 𝗈𝗋 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽.", event.threadID, event.messageID);
      return;
    }

    const title = movieData.Title;
    const year = movieData.Year;
    const cast = movieData.Actors;
    const plot = movieData.Plot;
    const ratings = movieData.Ratings.map(rating => `${rating.Source}: ${rating.Value}`).join("\n");
    const posterUrl = movieData.Poster;

    let path = __dirname + "/cache/movie_poster.jpg";
    let hasError = false;

    try {
      let imageResponse = await axios.get(posterUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(path, Buffer.from(imageResponse.data, "binary"));
    } catch (error) {
      console.log(error);
      hasError = true;
    }

    const trailerUrl = await getMovieTrailer(title, youtubeApiKey);
    const movieInfo = `
🎬 | 𝗠𝗼𝘃𝗶𝗲 𝗜𝗻𝗳𝗼 𝗳𝗼𝗿 "${title}" (${year}):
━━━━━━━━━━━━━━━━━━━
🎭 | 𝗖𝗮𝘀𝘁: ${cast}
📖 | 𝗣𝗹𝗼𝘁: ${plot}
📊 | 𝗥𝗮𝘁𝗶𝗻𝗴𝘀:\n${ratings}
🎥 | 𝗧𝗿𝗮𝗶𝗹𝗲𝗿: ${trailerUrl}
🖼️ | 𝗣𝗼𝘀𝘁𝗲𝗿 𝗜𝗺𝗮𝗴𝗲 𝗨𝗥𝗟: ${posterUrl}
`;

    if (!hasError) {
      api.sendMessage({
        body: movieInfo,
        attachment: fs.createReadStream(path)
      }, event.threadID, async () => {
        fs.unlinkSync(path);
        try {
          const trailerVideoBuffer = await getTrailerVideo(trailerUrl);
          api.sendMessage({
            body: "🎥 | 𝗧𝗿𝗮𝗶𝗹𝗲𝗿 𝗩𝗶𝗱𝗲𝗼:",
            attachment: fs.createReadStream(trailerVideoBuffer.path)
          }, event.threadID, () => {
            fs.unlinkSync(trailerVideoBuffer.path);
          });
        } catch (error) {
          console.error(error);
          api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖿𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝖿𝖾𝗍𝖼𝗁 𝗍𝗋𝖺𝗂𝗅𝖾𝗋 𝗏𝗂𝖽𝖾𝗈.", event.threadID);
        }
      });
    } else {
      api.sendMessage(movieInfo, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗆𝗈𝗏𝗂𝖾 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.", event.threadID, event.messageID);
  }
};

async function getMovieTrailer(movieTitle, apiKey) {
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
    `${movieTitle} official trailer`
  )}&key=${apiKey}&maxResults=1&type=video`;

  try {
    const response = await axios.get(searchUrl);
    const videoId = response.data.items[0].id.videoId;
    const trailerUrl = `https://www.youtube.com/watch?v=${videoId}`;
    return trailerUrl;
  } catch (error) {
    console.error(error);
    return "❎ | 𝗧𝗿𝗮𝗶𝗹𝗲𝗿 𝗻𝗼𝘁 𝗳𝗼𝘂𝗻𝗱.";
  }
}

async function getTrailerVideo(trailerUrl) {
  const path = __dirname + "/cache/trailer_video.mp4";
  const response = await axios.get(trailerUrl, { responseType: "arraybuffer" });
  fs.writeFileSync(path, Buffer.from(response.data, "binary"));
  return { path };
        }
      