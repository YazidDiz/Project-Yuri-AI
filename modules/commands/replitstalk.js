const axios = require('axios');
module.exports.config = {
  name: 'replitstalk',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Réynél',
  description: 'Retrieve user information from Replit',
  commandCategory: 'stalk',
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const username = args[0];

  if (!username) {
    return api.sendMessage('ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝖱𝖾𝗉𝗅𝗂𝗍 𝗎𝗌𝖾𝗋𝗇𝖺𝗆𝖾.', event.threadID, event.messageID);
  }

  try {
    const response = await axios.post('https://replit.com/graphql', {
      query: `
        query userByUsername($username: String!) {
          userByUsername(username: $username) {
            displayName
            bio
            location
            image
            username
            firstName
            lastName
            isVerified
            fullName
            url
            timeCreated
            followerCount
            followCount
            isHacker
            locale
            socials {
              id
              url
              type
            }
            roles {
              id
              key
              name
              tagline
            }
            pinnedRepls {
              slug
            }
            languages(limit: 5) {
              displayName
            }
            coverImage {
              url
            }
          }
        }
      `,
      variables: { username },
    }, {
      headers: {
        'X-Requested-With': 'ReplitApi',
        'referer': 'https://replit.com/',
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const userData = response.data.data.userByUsername;

    if (!userData) {
      return api.sendMessage('❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝗂𝗌 𝗎𝗌𝖾𝗋 𝖽𝗈𝖾𝗌 𝗇𝗈𝗍 𝖾𝗑𝗂𝗌𝗍!', event.threadID, event.messageID);
    }

    const {
      displayName,
      bio,
      location,
      image: avatar,
      username: userUsername,
      firstName,
      lastName,
      isVerified,
      fullName,
      url,
      timeCreated,
      followerCount,
      followCount,
      isHacker,
      locale,
      socials,
      roles,
      pinnedRepls,
      languages,
      coverImage: { url: banner },
    } = userData;

    const message = `
      𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${userUsername}
      𝗙𝗶𝗿𝘀𝘁 𝗡𝗮𝗺𝗲: ${firstName}
      𝗟𝗮𝘀𝘁 𝗡𝗮𝗺𝗲: ${lastName}
      𝗗𝗶𝘀𝗽𝗹𝗮𝘆 𝗡𝗮𝗺𝗲: ${displayName}
      𝗕𝗶𝗼: ${bio}
      𝗔𝘃𝗮𝘁𝗮𝗿: ${avatar}
      𝗟𝗼𝗰𝗮𝘁𝗶𝗼𝗻: ${location}
      𝗩𝗲𝗿𝗶𝗳𝗶𝗲𝗱: ${isVerified}
      𝗔𝗰𝗰𝗼𝘂𝗻𝘁 𝗖𝗿𝗲𝗮𝘁𝗲𝗱: ${timeCreated}
      𝗣𝗿𝗼𝗳𝗶𝗹𝗲 𝗨𝗥𝗟: https://replit.com${url}
      𝗙𝗼𝗹𝗹𝗼𝘄𝗲𝗿 𝗖𝗼𝘂𝗻𝘁: ${followerCount}
      𝗙𝗼𝗹𝗹𝗼𝘄 𝗖𝗼𝘂𝗻𝘁: ${followCount}
      𝗜𝘀 𝗛𝗮𝗰𝗸𝗲𝗿: ${isHacker}
      𝗟𝗼𝗰𝗮𝗹𝗲: ${locale}
      𝗖𝗼𝘃𝗲𝗿 𝗜𝗺𝗮𝗴𝗲: ${banner}
      𝗠𝗼𝘀𝘁 𝗨𝘀𝗲𝗱 𝗟𝗮𝗻𝗴𝘂𝗮𝗴𝗲𝘀: ${languages.map(lang => lang.displayName).join(' ; ')}
      
      𝗦𝗼𝗰𝗶𝗮𝗹𝘀:
      ${socials.map(social => `${social.type}: ${social.url}`).join('\n')}
      
      𝗥𝗼𝗹𝗲𝘀:
      ${roles.map(role => role.tagline ? `${role.name}: ${role.tagline}` : role.name).join('\n')}
      
      𝗣𝗶𝗻𝗻𝗲𝗱 𝗥𝗲𝗽𝗹𝘀:
      ${pinnedRepls.map(repl => `${repl.slug}: https://replit.com${url}/${repl.slug}`).join('\n')}
    `;

    await api.sendMessage(message, event.threadID, async (error, messageInfo) => {
      if (error) {
        console.error('Error sending message:', error);
        return;
      }

      const photoBuffer = await getAvatarAsBuffer(avatar);
      if (photoBuffer) {
        api.sendMessage({
          body: '𝗣𝗿𝗼𝗳𝗶𝗹𝗲 𝗣𝗶𝗰𝘁𝘂𝗿𝗲:',
          attachment: photoBuffer,
        }, event.threadID, messageInfo.messageID);
      }
    });
  } catch (error) {
    console.error('Error retrieving user information:', error);
    return api.sendMessage('❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗋𝖾𝗍𝗋𝗂𝖾𝗏𝗂𝗇𝗀 𝗎𝗌𝖾𝗋 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.', event.threadID, event.messageID);
  }
};

async function getAvatarAsBuffer(avatarUrl) {
  try {
    const response = await axios.get(avatarUrl, {
      responseType: 'arraybuffer',
    });
    const buffer = Buffer.from(response.data);
    return buffer;
  } catch (error) {
    console.error('Error getting avatar:', error);
    return null;
  }
        }