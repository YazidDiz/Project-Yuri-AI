// Please note that this command has not been declared as functional; this is only a test.

const axios = require('axios');
const { performance } = require('perf_hooks');

module.exports.config = {
  name: 'monitor',
  version: '1.0.0',
  hasPermssion: 2,
  credits: 'Réynél',
  description: 'Monitor the uptime of a URL',
  commandCategory: 'monitor',
  usages: '[URL]',
  cooldowns: 5,
};

const monitoringData = {};

function startMonitoring(api, url, threadID, eventID) {
  const monitoringInterval = 5 * 60 * 1000;
  const monitoringTimeout = 24 * 60 * 60 * 1000;

  const startTimestamp = performance.now();
  let lastNotificationTimestamp = startTimestamp;

  const monitorURL = async () => {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const endTimestamp = performance.now();
        const uptimeInSeconds = (endTimestamp - startTimestamp) / 1000;
        api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗎𝗋𝗅 ${url} 𝗂𝗌 𝗎𝗉 𝖺𝗇𝖽 𝗋𝗎𝗇𝗇𝗂𝗇𝗀.\n\n📈 | 𝗨𝗽𝘁𝗶𝗺𝗲: ${uptimeInSeconds.toFixed(2)} 𝗌𝖾𝖼𝗈𝗇𝖽𝗌.`, threadID, eventID);
        lastNotificationTimestamp = endTimestamp;
        console.log(`\x1b[32m[${new Date().toISOString()}] URL ${url} is up.\x1b[0m`);
      }
    } catch (error) {
      const currentTimestamp = performance.now();
      const downtimeInSeconds = (currentTimestamp - lastNotificationTimestamp) / 1000;
      api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗎𝗋𝗅 ${url} 𝗂𝗌 𝖼𝗎𝗋𝗋𝖾𝗇𝗍𝗅𝗒 𝖽𝗈𝗐𝗇.\n\n📉 | 𝗗𝗼𝘄𝗻𝘁𝗶𝗺𝗲: ${downtimeInSeconds.toFixed(2)} 𝗌𝖾𝖼𝗈𝗇𝖽𝗌.`, threadID, eventID);
      lastNotificationTimestamp = currentTimestamp;
      console.log(`\x1b[32m[${new Date().toISOString()}] URL ${url} is down.\x1b[0m`);
    }
  };

  const monitoringIntervalId = setInterval(monitorURL, monitoringInterval);

  setTimeout(() => {
    clearInterval(monitoringIntervalId);
    api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗆𝗈𝗇𝗂𝗍𝗈𝗋𝗂𝗇𝗀 𝗈𝖿 ${url} 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗌𝗍𝗈𝗉𝗉𝖾𝖽.`, threadID, eventID);
    console.log(`\x1b[32m[${new Date().toISOString()}] Monitoring of ${url} has been stopped.\x1b[0m`);

    setTimeout(() => {
      startMonitoring(api, url, threadID, eventID);
    }, monitoringTimeout);
  }, monitoringTimeout);

  api.sendMessage(`🖥 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗆𝗈𝗇𝗂𝗍𝗈𝗋𝗂𝗇𝗁 ${url} 𝖿𝗈𝗋 𝗎𝗉𝗍𝗂𝗆𝖾.`, threadID, eventID);
  console.log(`\x1b[32m[${new Date().toISOString()}] Started monitoring ${url}.\x1b[0m`);

  monitoringData[url] = {
    intervalId: monitoringIntervalId,
    startTimestamp: startTimestamp,
  };
}

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const url = args[0];

  if (!url) {
    api.sendMessage('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗎𝗋𝗅 𝗍𝗈 𝗆𝗈𝗇𝗂𝗍𝗈𝗋.', threadID, messageID);
    return;
  }

  if (!url.startsWith('https://')) {
    api.sendMessage('❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗎𝗋𝗅. 𝗉𝗅𝖾𝖺𝗌𝖾 𝗆𝖺𝗄𝖾 𝗌𝗎𝗋𝖾 𝗍𝗁𝖾 𝗎𝗋𝗅 𝗌𝗍𝖺𝗋𝗍𝗌 𝗐𝗂𝗍𝗁 "𝗁𝗍𝗍𝗉𝗌://".', threadID, messageID);
    return;
  }

  if (monitoringData[url]) {
    api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗆𝗈𝗇𝗂𝗍𝗈𝗋𝗂𝗇𝗀 𝗈𝖿 ${url} 𝗂𝗌 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 𝖺𝖼𝗍𝗂𝗏𝖾.`, threadID, messageID);
    return;
  }

  startMonitoring(api, url, threadID, messageID);
  console.log(`\x1b[32m[${new Date().toISOString()}] Monitoring ${url} for uptime.\x1b[0m`);
};

for (const url in monitoringData) {
  if (monitoringData.hasOwnProperty(url)) {
    startMonitoring(api, url, threadID, messageID);
  }
}