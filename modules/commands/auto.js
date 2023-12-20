let axios = require('axios');
let fs = require('fs');

let is_url = url=>/^http(s|):\/\//.test(url);
let stream_url = (url, type)=>axios.get(url, {
     responseType: 'arraybuffer'
}).then(res=> {
     let path = __dirname+'/tiktok/'+Date.now()+'.'+type;

     fs.writeFileSync(path, res.data);
     setTimeout(p=>fs.unlinkSync(p), 1000*60, path);

     return fs.createReadStream(path);
});
let data = {};
let path = __dirname+'/tiktok/status_auto_down.json';
let save = ()=>fs.writeFileSync(path, JSON.stringify(data));

if (!fs.existsSync(path))save(); else data = require(path);

let all_app = [
     '𝑇𝑖𝑘𝑡𝑜𝑘',
     '𝐹𝑎𝑐𝑒𝑏𝑜𝑜𝑘',
     '𝐼𝑛𝑠𝑡𝑎𝑔𝑟𝑎𝑚',
     '𝑌𝑜𝑢𝑇𝑢𝑏𝑒',
     '𝑃𝑖𝑛𝑡𝑒𝑟𝑒𝑠𝑡',
     '𝐼𝑚𝑔𝑢𝑟'
];

exports.config = {
     name: 'auto',
     version: '0.0.1',
     hasPermssion: 0,
     credits: 'Réynél',
     description: 'auto download links',
     commandCategory: 'downloader',
     usages: '[auto]',
     cooldowns: 3
};
exports.run = function(o) {
     let send = (msg, callback)=>o.api.sendMessage(msg, o.event.threadID, callback, o.event.messageID);
     send(`✿╡𝑨𝑼𝑻𝑶 𝑫𝑶𝑾𝑵𝑳𝑶𝑨𝑫 𝑳𝑰𝑵𝑲𝑺╞✿\n\n${all_app.map(($, i)=>`${i+1}. ${$}`).join('\n')}\n\n💭 | 𝖱𝖾𝗉𝗅𝗒 𝖲𝖳𝖳 𝗈𝗇/𝗈𝖿𝖿 (𝖲𝖳𝖳𝗌 𝖼𝖺𝗇 𝖻𝖾 𝗌𝖾𝗉𝖺𝗋𝖺𝗍𝖾𝖽 𝗍𝗈 𝖻𝖾 𝗈𝗇/𝗈𝖿𝖿 𝖺𝗍 𝗍𝗁𝖾 𝗌𝖺𝗆𝖾 𝗍𝗂𝗆𝖾)`, (err, res)=> {
          res.name = exports.config.name,
          res.event = o.event;
          global.client.handleReply.push(res);
     });

};
exports.handleEvent = async function(o) {
     try {
          let status = data[o.event.threadID] || {};
          let a = o.event.args[0];
          let send = (msg, callback)=>o.api.sendMessage(msg, o.event.threadID, callback, o.event.messageID);
          let head = app=>`✿╡${app.toUpperCase()} 𝑨𝑼𝑻𝑶 𝑫𝑶𝑾𝑵╞✿\n\n`;

          if (!is_url(a))return;
          if (!!status.tiktok && /(tiktok\.com|douyin\.com)/.test(a)) {
               let res = await axios.post(`https://www.tikwm.com/api/`, {
                    url: a
               });
               if (res.data.code != 0)throw res;

               let tiktok = res.data.data;
               let attachment = [];

               if (typeof tiktok.images == 'object')for (let image_url of tiktok.images)attachment.push(await stream_url(image_url, 'jpg')); else attachment.push(await stream_url(tiktok.play, 'mp4'));

               send({
                    body: `${head('tiktok')}》𝑻𝒊𝒕𝒍𝒆: ${tiktok.title}\n》𝑳𝒊𝒌𝒆𝒔: ${tiktok.digg_count}\n》𝑻𝒊𝒎𝒆: ${(tiktok.duration)} 𝑠𝑒𝑐𝑜𝑛𝑑𝑠\n》𝑨𝒖𝒕𝒉𝒐𝒓: ${tiktok.author.nickname} ｟${tiktok.author.unique_id}｠`,
                    attachment,
               });
          } else
               if (!!status.facebook && /(facebook\.com|fb\.watch)/.test(a)) {
               let res = await axios.get(`https://fb.toosj888.repl.co/api/fb/info-post?url=${a}`);
               let fb = res.data;
               let fb_vd = fb.attachment.filter($=>$.__typename == 'Video');
               let fb_img = fb.attachment.filter($=>$.__typename == 'Photo');

               if (fb_vd.length > 0) {
                    let form_msg = {};
                    form_msg.body = fb.message;
                    form_msg.attachment = [];
                    for (let vd of fb_vd)form_msg.attachment.push(await stream_url(vd.playable_url_quality_hd, 'mp4'));

                    send(form_msg);
               };
               if (fb_img.length > 0) {
                    let form_msg = {};
                    form_msg.body = fb.message;
                    form_msg.attachment = [];
                    for (let img of fb_img)form_msg.attachment.push(await stream_url((img.photo_image || img.image).uri, 'jpg'));

                    send(form_msg);
               };
          } else
               if (!!status.youtube && /(youtube\.com|youtu\.be)/.test(a)) {
               let ytdl = require('ytdl-core');

               ytdl.getInfo(a).then(async info => {
                    let detail = info.videoDetails;
                    let format = info.formats.find(f => f.qualityLabel && f.qualityLabel.includes('360p') && f.audioBitrate);

                    if (format) {
                         send({
                              body: `${head('youtube')}》𝑻𝒊𝒕𝒍𝒆: ${detail.title}`,
                              attachment: await stream_url(format.url, 'mp4')
                         });
                    } else {
                         console.error('No matching format found!');
                    }
               });
          } else
               if (!!status.instagram && /instagram\.com/.test(a)) {
               const res = await axios.get(`https://api.nguyenlienmanh.com/instagram/videodl?url=${a}`);
               const {
                    video_url = [{}],
                    images
               } = res.data;
               let attachment = [];

               if (video_url[0].url != undefined) {
                    attachment = await stream_url(video_url[0].url, 'mp4');
               } else if (images != undefined) {
                    for (const $ of typeof images == 'string' ? [images]: images) {
                         attachment.push(await stream_url($, 'png'));
                    }
               }

               send({
                    body: `${head('instagram')}》𝑻𝒊𝒕𝒍𝒆: ${res.data.title} \n》𝑭𝒖𝒍𝒍 𝑵𝒂𝒎𝒆: ${res.data.user_full_name} \n》𝑼𝒔𝒆𝒓 𝑵𝒂𝒎𝒆: ${res.data.user.username} \n》𝑳𝒊𝒌𝒆𝒔: ${res.data.like_count} \n》𝑪𝒐𝒎𝒎𝒆𝒏𝒕𝒔: ${res.data.comment_count}`, attachment
               });
          } else
               if (!!status.pinterest && /(pinterest|pinimg)\.com/.test(a)) {
               if (/\.[^/]+$/.test(a)) {
                    send({
                         body: `${head('pinterest')}`,
                         attachment: await stream_url(a, a.split('.').pop())
                    });
               } else {
                    let src = (await axios.get(a)).data.replace(/^[^]+,"image":"/, '').split('"')[0];
                    send({
                         body: `${head('pinterest')}》𝑳𝒊𝒏𝒌: ${src}`,
                         attachment: await stream_url(src, src.split('.').pop()),
                    });
               };

          } else
               if (!!status.imgur && /imgur\.com/.test(a)) {
               send({
                    body: head('imgur'),
                    attachment: await stream_url(a, a.split('.').pop()),
               })
          }

     }catch(e) {
          console.log(e);
     };
};
exports.handleReply = function(o) {
     let _ = o.handleReply;
     let t = o.event.threadID;
     let send = (msg, callback)=>o.api.sendMessage(msg, t, callback, o.event.messageID);

     if (o.event.senderID != _.event.senderID)return;
     if (!data[t])data[t] = {};

     let status_input = o.event.args.pop();

     for (let i of o.event.args)data[t][all_app[i-1]] = status_input == 'on'?true: false;

     save();
     send(`✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗎𝗋𝗇𝖾𝖽 𝗈𝗇 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒`);
};