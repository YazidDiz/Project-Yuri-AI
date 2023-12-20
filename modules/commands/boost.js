const axios = require('axios');

module.exports.config = {
  name: "boost",
  version: "1.0",
  hasPermission: 2,
  credits: "Réynél",
  description: "Share a post on Facebook",
  commandCategory: "facebook",
  cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args.length !== 3) {
      api.sendMessage('❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝖺𝗋𝗀𝗎𝗆𝖾𝗆𝗍𝗌.\n\n𝗨𝘀𝗮𝗴𝗲: 𝖻𝗈𝗈𝗌𝗍 [𝗍𝗈𝗄𝖾𝗇] [𝗎𝗋𝗅] [𝖺𝗆𝗈𝗎𝗇𝗍]', event.threadID);
      return;
    }

    const accessToken = args[0];
    const shareUrl = args[1];
    const shareAmount = parseInt(args[2]);

    if (isNaN(shareAmount) || shareAmount <= 0) {
      api.sendMessage('❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗌𝗁𝖺𝗋𝖾 𝖺𝗆𝗈𝗎𝗇𝗍. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗉𝗈𝗌𝗂𝗍𝗂𝗏𝖾 𝗇𝗎𝗆𝖻𝖾𝗋.', event.threadID);
      return;
    }

    const timeInterval = 1500;
    const deleteAfter = 60 * 60;

    let sharedCount = 0;
    let timer = null;

    async function sharePost() {
      try {
        const response = await axios.post(
          `https://graph.facebook.com/me/feed?access_token=${accessToken}&fields=id&limit=1&published=0`,
          {
            link: shareUrl,
            privacy: { value: 'SELF' },
            no_story: true,
          },
          {
            muteHttpExceptions: true,
            headers: {
              authority: 'graph.facebook.com',
              'cache-control': 'max-age=0',
              'sec-ch-ua-mobile': '?0',
              'user-agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            },
            method: 'post',
          }
        );

        sharedCount++;
        const postId = response?.data?.id;

        console.log(`Post shared: ${sharedCount}`);
        console.log(`Post ID: ${postId || 'Unknown'}`);

        if (sharedCount === shareAmount) {
          clearInterval(timer);
          console.log('Finished sharing posts.');

          if (postId) {
            setTimeout(() => {
              deletePost(postId);
            }, deleteAfter * 1000);
          }

          api.sendMessage('✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖽𝗈𝗇𝖾 𝗌𝗁𝖺𝗋𝗂𝗇𝗀', event.threadID);
        }
      } catch (error) {
        console.error('Failed to share post:', error.response.data);
      }
    }

    async function deletePost(postId) {
      try {
        await axios.delete(`https://graph.facebook.com/${postId}?access_token=${accessToken}`);
        console.log(`Post deleted: ${postId}`);
      } catch (error) {
        console.error('Failed to delete post:', error.response.data);
      }
    }

    timer = setInterval(sharePost, timeInterval);

    setTimeout(() => {
      clearInterval(timer);
      console.log('Loop stopped.');
    }, shareAmount * timeInterval);
  } catch (error) {
    console.error('Error:', error);
    api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝖺𝗍: ' + error.message, event.threadID);
  }
};