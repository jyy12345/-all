import API from '../../api.js';
const app = getApp().globalData
const song = require('../../utils/song.js')
const Lyric = require('../../utils/lyric.js')
const util = require('../../utils/util.js')
const SEQUENCE_MODE = 1
const RANDOM_MOD = 2
const SINGLE_CYCLE_MOD = 3

Page({
  data: {
    playurl: '',
    playIcon: 'icon-bofang1',
    cdCls: 'pause',
    currentLyric: null,
    currentLineNum: 0,
    toLineNum: -1,
    currentSong: null,
    dotsArray: new Array(2),
    currentDot: 0,
    playMod: SEQUENCE_MODE,
    mid_id: ''
    // duration:null
  },
  onShow: function () {
    this._init()
  },

  //初始化
  _init: function () {
    // let songslist = (app.songlist.length && app.songlist) || wx.getStorageSync('songlist')
    // let currentSong = app.songlist[app.currentIndex] || (songslist && songslist[app.currentIndex])
    // let duration = currentSong && currentSong.duration
    // this.setData({
    //   currentSong: currentSong,
    //   duration: this._formatTime(duration),
    //   songslist: songslist,
    //   currentIndex: app.currentIndex
    // })
    // this._getPlayUrl(1)
    // this._getLyric(currentSong.data.lyric)
    // wx.stopBackgroundAudio()
    var _this = this;
    // console.log(this.data.mid_id)
    const playUrl = this.data.currentSong[this.data.mid_id].audioUrl;
    const play_lyric = this.data.currentSong[this.data.mid_id].lyric;
    // console.log(play_lyric)
    _this._createAudio(play_lyric)
    _this._getLyric(play_lyric)
  },

  // 获取背景播放音乐的songmidid
  _getBackPlayfileName: function () {
    return new Promise((resolve, reject) => {
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          var dataUrl = res.dataUrl
          let ret = dataUrl && dataUrl.split('?')[0].split('/')[3]
          resolve({ ret, res })
        },
        fail: function (e) {
          let ret = false
          reject(ret)
        }
      })
    })
  },
  onLoad: function (options) {
    var myDate = new Date();
    var that = this;
    const _this = this;
    var masterWorksBf = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      artWorkId: options.artWorkId
    }
     wx.request({
       url: API.masterWorksBf,
       data: API.getParams(masterWorksBf),
       success: function (res) {
         console.log(res)
    //  var res1 = res.data.replace("callback(", "")
    //  var res2 = JSON.parse(res1.substring(0, res1.length - 1))
      }
     })
    var res = {
      data: [
        {
          audioDetail: "光年之外",
          audioImg: "https://y.gtimg.cn/music/photo_new/T002R300x300M000003w92u63Kz75u.jpg?max_age=2592000",
          audioUrl: "https://yiyanmeishu-oss001.oss-cn-beijing.aliyuncs.com/audio/misic.mp3",
          id: 1,
          lyric: "[00:00.00]光年之外 (热爱版) - G.E.M. 邓紫棋 (Gem Tang)/艾热\n[00:03.02]曲：G.E.M.邓紫棋/Lupo Groinig\n[00:06.05]词：G.E.M.邓紫棋/艾热\n[00:09.08]监制：Lupo Groinig\n[00:12.11]Yo 我是艾热 所以热爱\n[00:15.90]我为爱而生 我为爱而活\n[00:20.95]我路过 了落寞\n[00:22.35]被数落 孤独过\n[00:23.62]吐露过\n[00:24.27]不服的抱紧自我印象深刻\n[00:26.26]疏忽过\n[00:26.89]当幸福靠近却没把握住\n[00:28.85]我诉说的更多\n[00:29.86]反而更多困惑更想沉默\n[00:31.60]你用爱 融化掉\n[00:32.91]我浮躁 的心跳\n[00:34.28]因为有\n[00:34.88]善良的心灵伴着美丽样貌\n[00:36.94]因为你\n[00:37.45]独一无二做你自己从不仿照\n[00:39.60]激起我内心浪潮\n[00:40.62]就算开始我真的没想到\n[00:41.88]我没想到为了你我能疯狂到\n[00:46.02]山崩海啸没有你根本不想逃\n[00:51.35]我的大脑为了你已经疯狂到\n[00:56.70]脉搏心跳没有你根本不重要\n[01:03.44]我渴望能够触碰到\n[01:04.95]你最真实的感受\n[01:06.27]哪怕爱对于太多人\n[01:07.58]来说像沙漠山丘\n[01:08.91]别担忧\n[01:09.52]我会用最耐心的姿态拥抱你\n[01:11.50]保护你照顾你\n[01:12.66]到永远不论任何关头\n[01:14.04]Oh\n[01:14.39]多少爱情都\n[01:15.13]根本 抵不过时间的洪流\n[01:16.84]都多么轰烈却\n[01:17.66]根本 只不过曾经的拥有\n[01:19.53]对你我却那么坚定\n[01:20.87]为你奋不顾身前进\n[01:24.89]我想要\n[01:26.33]追随你为了你我愿意放弃\n[01:28.00]我所有的骄傲与浮躁只为让\n[01:29.86]你看到\n[01:31.82]我有多在乎你伴着你会是我\n[01:33.46]最美的憧憬很透明别否定我\n[01:36.05]都关于你和我\n[01:37.37]就算曾避和躲\n[01:38.53]不愿挽彼此胳膊\n[01:39.82]宁愿内心受折磨\n[01:41.24]不愿妥协互相伤害接着后悔\n[01:43.62]就算猜疑徘徊在我们的周围\n[01:46.25]为了你我能疯狂到\n[01:50.00]山崩海啸没有你根本不想逃\n[01:55.40]我的大脑为了你已经疯狂到\n[02:00.69]脉搏心跳没有你根本不重要\n[02:07.54]文字在深思中粉饰跟你的点滴\n[02:09.69]很真实\n[02:10.24]真挚也诚实让\n[02:11.20]你我沉迷于甜言蜜语\n[02:12.83]爱的记号像气泡\n[02:13.91]激荡像心跳加速跳跃\n[02:15.48]星空再耀眼没有你\n[02:16.75]光芒也都千篇一律\n[02:18.27]内心也漆黑过\n[02:19.28]遗忘了我们经历第几回\n[02:20.98]以为很理解痛\n[02:21.93]苦到身心俱疲\n[02:23.07]备忘录里为你积累着希望爱慕\n[02:25.29]只想你别理会\n[02:26.39]愚蠢非议因为你我一直都在相依偎\n[02:29.20]都关于你和我\n[02:30.56]就算曾避和躲\n[02:31.72]不愿挽彼此胳膊\n[02:33.11]宁愿内心受折磨\n[02:34.39]我哭过\n[02:35.62]至少为你用力握住过\n[02:39.94]都关于你和我\n[02:41.28]就算曾避和躲\n[02:42.49]不愿挽彼此胳膊\n[02:43.76]宁愿内心受折磨\n[02:45.04]却不过\n[02:46.26]再累也为你满血复活\n[02:48.76]我没想到为了你我能疯狂到\n[02:54.16]山崩海啸没有你根本不想逃\n[02:59.26]我的大脑为了你已经疯狂到\n[03:04.74]脉搏心跳没有你根本不重要\n[03:11.57]我说我想要霸占\n[03:12.71]你的心因为真的想要\n[03:14.35]他们想打乱我笃定步伐\n[03:15.92]但爱无法仿造\n[03:17.06]如果有起跑线为你\n[03:18.37]我毫不犹豫抢跑\n[03:19.64]你是我内心浪潮\n[03:20.79]就算开始我没想到\n"
        },
        {
          audioDetail: "遥远的你",
          audioImg: "https://y.gtimg.cn/music/photo_new/T002R300x300M000004LCZIq3EU7Eo.jpg?max_age=2592000",
          audioUrl: "http://dl.stream.qqmusic.qq.com/C400003NCS053QVDGa.m4a?vkey=59D2480E95601AA92E39B8ECD9E2A6132B9CB5E141847F5E8E347304589ABF660137A2AA2A431005FBDC3E5539495E9A0E26000A306DFB78&guid=3913883408&uin=0&fromtag=66",
          id: 1,
          lyric: "[00:00.00]遥远的你 (正式版) - 221小伙伴\n[00:03.33]词：王明明/李亚然\n[00:05.01]曲：王明明\n[00:13.62]明明：\n[00:14.78]眼角闪起的泪光\n[00:18.77]无边无际地游荡\n[00:22.33]眉下的一记荒唐\n[00:26.06]庸俗地写在脸上\n[00:28.76]鑫然：\n[00:29.74]犹如一缕阳光\n[00:33.00]但却觉得感伤\n[00:36.61]记忆挥散不去\n[00:40.29]却藏进了 我的诗句\n[00:46.14]合：\n[00:46.97]七月的风 八月的雨\n[00:50.43]卑微的我喜欢遥远的你\n[00:54.12]你还未来 怎敢老去\n[00:57.64]未来的我和你奉陪到底\n[01:01.17]你若同意 我一定去\n[01:04.69]可你并不在意我的出席\n[01:08.30]你的过去 无法参与\n[01:12.12]但我还是 喜欢你\n[01:32.81]尚阳：\n[01:34.22]我有一把钥匙\n[01:37.12]能解开你的故事\n[01:41.15]单纯的像个孩子\n[01:44.76]偏藏进了 我的诗句\n[01:51.18]合：\n[01:51.53]七月的风 八月的雨\n[01:54.91]卑微的我喜欢遥远的你\n[01:58.52]你还未来 怎敢老去\n[02:02.09]未来的我和你奉陪到底\n[02:05.64]你若同意 我一定去\n[02:09.20]可你并不在意我的出席\n[02:12.81]你的过去 无法参与\n[02:16.99]但我还是 喜欢你\n[02:23.75]七月的风 八月的雨\n[02:27.11]卑微的我喜欢遥远的你\n[02:30.73]你还未来 怎敢老去\n[02:34.35]未来的我和你奉陪到底\n[02:37.83]你若同意 我一定去\n[02:41.40]可你并不在意我的出席\n[02:45.02]你的过去 无法参与\n[02:49.18]但我还是 喜欢你\n[02:56.05]七月的风 八月的雨\n[02:59.32]卑微的我喜欢遥远的你\n[03:03.02]你还未来 怎敢老去\n[03:06.46]未来的我和你奉陪到底\n[03:10.08]你若同意 我一定去\n[03:13.69]可你并不在意我的出席\n[03:17.28]你的过去 无法参与\n[03:21.38]但我还是 喜欢你\n"
        },
        {
          audioDetail: "断桥残雪",
          audioImg: "https://y.gtimg.cn/music/photo_new/T002R300x300M000001jmC6x1RMfh0.jpg?max_age=2592000",
          audioUrl: "http://dl.stream.qqmusic.qq.com/C400004ENQPZ0dHaqy.m4a?vkey=55B1BA4900467801175D267F3B9339A455E80FC476D687AE0756E56C0DEFF4EE1EF3516E35CA7AFE8DEF5762D36AC3936AFFBB342517125C&guid=3913883408&uin=0&fromtag=66",
          id: 1,
          lyric: "[00:00.00]断桥残雪 - 许嵩 (Vae Xu)\n[00:06.22]词：许嵩\n[00:12.44]曲：许嵩\n[00:18.66]编曲：许嵩\n[00:24.89]寻不到花的折翼枯叶蝶\n[00:29.97]永远也看不见凋谢\n[00:36.70]江南夜色下的小桥屋檐\n[00:41.78]读不懂塞北的荒野\n[00:48.84]梅开时节因寂寞而缠绵\n[00:53.82]春归后又很快湮灭\n[01:00.56]独留我赏烟花飞满天\n[01:05.97]摇曳后就随风飘远\n[01:12.87]断桥是否下过雪\n[01:15.70]我望着湖面\n[01:19.07]水中寒月如雪\n[01:21.70]指尖轻点融解\n[01:24.54]断桥是否下过雪\n[01:27.61]又想起你的脸\n[01:30.69]若是无缘再见\n[01:33.68]白堤柳帘垂泪好几遍\n[02:03.88]寻不到花的折翼枯叶蝶\n[02:08.99]永远也看不见凋谢\n[02:15.69]江南夜色下的小桥屋檐\n[02:20.97]读不懂塞北的荒野\n[02:27.69]梅开时节因寂寞而缠绵\n[02:33.17]春归后又很快湮灭\n[02:40.52]独留我赏烟花飞满天\n[02:44.90]摇曳后就随风飘远\n[02:51.96]断桥是否下过雪\n[02:54.66]我望着湖面\n[02:57.62]水中寒月如雪\n[03:00.63]指尖轻点融解\n[03:03.65]断桥是否下过雪\n[03:06.59]又想起你的脸\n[03:09.59]若是无缘再见\n[03:12.70]白堤柳帘垂泪好几遍\n"
        },
      ]
    }
    console.log(options.artWorkId)
    that.setData({
      currentSong: res.data,
      mid_id: options.artWorkId,
      audioDetail: res.data[options.artWorkId].audioUrl,
      // singer:res.data[options.artWorkId].singer,
      audioImg: res.data[options.artWorkId].audioImg,
    })
   
    // if(mid_id==''){
    //   mid_id==0
    // }
    //  console.log(this.data.mid_id)
    //  if(this.data.mid_id=''){
    //  this.data.mid_id=0
    //  that.setData({
    //   mid_id:0
    // })
    //  }
    const playUrl = res.data[this.data.mid_id].audioUrl;
    const play_lyric = res.data[this.data.mid_id].lyric;
    // console.log(this.data.mid_id)
    //  console.log(res.data)
    _this._getBackPlayfileName().then((nowPlay) => {
      if (!(res2.data.items[0].filename === nowPlay.ret)) {
        console.log("aaa")
        _this._createAudio(playUrl)
        _this._getLyric(play_lyric)
      }
    }).catch((err) => {
      _this._createAudio(playUrl)
      _this._getLyric(play_lyric)
    })
   
  },
  // 获取播放地址
  _getPlayUrl: function (songmidid) {
    const _this = this;
    var myDate = new Date();
    wx.request({
      url: `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&loginUin=0&platform=yqq&needNewCode=0&cid=205361747&uin=0&filename=C400${songmidid}.m4a&guid=3913883408&songmid=${songmidid}&callback=callback`,
      data: {
        // g_tk: 5381,
        // inCharset: 'utf-8',
        // outCharset: 'utf-8',
        // notice: 0,
        // format: 'jsonp',
        // hostUin: 0,
        // loginUin: 0,
        // platform: 'yqq',
        // needNewCode: 0,
        // cid: 205361747,
        // uin: 0,
        // filename: `C400${songmidid}.m4a`,
        // guid: 3913883408,
        // songmid: songmidid,
        // callback: 'callback',
        appId: '100001',
        token: 'de67f0c0-edea-441f-806a-759673f1e870',
        requestId: myDate.getTime(),
        artWorkId: 1
      },
      success: function (res) {
        var res1 = res.data.replace("callback(", "")
        var res2 = JSON.parse(res1.substring(0, res1.length - 1))
        const playUrl = `http://dl.stream.qqmusic.qq.com/${res2.data.items[0].filename}?vkey=${res2.data.items[0].vkey}&guid=3913883408&uin=0&fromtag=66`
        _this._getBackPlayfileName().then((nowPlay) => {
          if (!(res2.data.items[0].filename === nowPlay.ret)) {
            _this._createAudio(playUrl)
          }
        }).catch((err) => {
          _this._createAudio(playUrl)
        })
      }
    })
  },

  // 创建播放器
  _createAudio: function (playUrl) {
    // console.log(this.data.currentSong[this.data.mid_id].audioDetail)
    wx.playBackgroundAudio({
      dataUrl: playUrl,
      title: this.data.currentSong[this.data.mid_id].audioDetail,
      coverImgUrl: this.data.currentSong[this.data.mid_id].audioImg
    })
    // 监听音乐播放。
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        playIcon: 'icon-bofang2',
        cdCls: 'play'
      })
    })
    // 监听音乐暂停。
    wx.onBackgroundAudioPause(() => {
      this.setData({
        playIcon: 'icon-bofang1',
        cdCls: 'pause'
      })
    })
    // 监听音乐停止。
    wx.onBackgroundAudioStop(() => {
      if (this.data.playMod === SINGLE_CYCLE_MOD) {
        this._init()
        return
      }
      this.next()
    })
    // 监听播放拿取播放进度
    const manage = wx.getBackgroundAudioManager()
    manage.onTimeUpdate(() => {
      const currentTime = manage.currentTime
      const durations = Math.round(manage.duration)
      const numDurations=Math.floor(durations / 60) + ':' + durations % 60;
      const numDurations1 = Math.floor(durations / 60) + '.' + durations % 60;
      this.setData({
        currentTime: this._formatTime(currentTime),
        percent: currentTime / numDurations1/55,
        numDurations: numDurations
      })
      if (this.data.currentLyric) {
        this.handleLyric(currentTime * 1000)
      }
    })
  },
  // 获取歌词
  _getLyric: function (lyric) {
    const _this = this
    // console.log("哈哈哈")
    // console.log(_this)
    // this._getBackPlayfileName().then((res) => {
    // console.log(res)
    // const nowMid = lyric.split('.')[0].replace('C400', '')
    // console.log(nowMid)
    //   if (!(nowMid === currentSong.mid)) {
    //     if (this.data.currentLyric) {
    //       //this.data.currentLyric.stop && this.data.currentLyric.stop()
    //     }
    _this._getLyricAction(lyric)
    //   }
    // }).catch(() => {
    //   _this._getLyricAction(this.data.currentSong.data.lyric)
    // })
  },

  // 获取处理歌词
  _getLyricAction: function (currentSong) {
    // console.log(currentSong)
    song.getLyric(currentSong).then((res) => {
      console.log(res)
      if (res.data.showapi_res_body.ret_code == 0) {
        console.log(res)
        // var songs='[00:00.00]张紫豪 - 可不可以\n[00:02.00]词：刘伟锋\n[00:03.00]曲：刘伟锋\n[00:04.00]编曲：刘伟锋\n[00:05.00]录制混缩：巨人先生\n[00:07.00]出品：西亚斯音频工作室\n[00:16.01]说好带你流浪\n[00:19.59]而我却半路返航\n[00:23.10]坠落自责的海洋。'
        const lyric = this._normalizeLyric(currentSong)
        console.log(lyric)
        const currentLyric = new Lyric(lyric)
        var lins = currentLyric.lrc.split("\n")
        // currentLyric.lines=lins;
        console.log(currentLyric);
        this.setData({
          currentLyric: currentLyric,
          // currentText: currentSong
        })
      } else {
        this.setData({
          currentLyric: null,
          currentText: ''
        })
      }
    })
  },
  // 去掉歌词中的转义字符
  _normalizeLyric: function (lyric) {
    return lyric.replace(/&#58;/g, ':').replace(/&#10;/g, '\n').replace(/&#46;/g, '.').replace(/&#32;/g, ' ').replace(/&#45;/g, '-').replace(/&#40;/g, '(').replace(/&#41;/g, ')')
  },
  // 歌词滚动回调函数
  handleLyric: function (currentTime) {
    let lines = [{ time: 0, txt: '' }], lyric = this.data.currentLyric, lineNum
    lines = lines.concat(lyric.lines)
    for (let i = 0; i < lines.length; i++) {
      if (i < lines.length - 1) {
        let time1 = lines[i].time, time2 = lines[i + 1].time
        if (currentTime > time1 && currentTime < time2) {
          lineNum = i - 1
          break;
        }
      } else {
        lineNum = lines.length - 2
      }
    }
    // console.log(lines[lineNum + 1] && lines[lineNum + 1].txt)
    this.setData({
      currentLineNum: lineNum,
      currentText: lines[lineNum + 1] && lines[lineNum + 1].txt
    })

    let toLineNum = lineNum - 5
    if (lineNum > 5 && toLineNum != this.data.toLineNum) {
      this.setData({
        toLineNum: toLineNum
      })
    }
  },
  _formatTime: function (interval) {
    interval = interval | 0
    const minute = interval / 60 | 0
    const second = this._pad(interval % 60)
    return `${minute}:${second}`
  },
  /*秒前边加0*/
  _pad(num, n = 2) {
    let len = num.toString().length
    while (len < n) {
      num = '0' + num
      len++
    }
    return num
  },
  changeMod: function () {
    let playMod = this.data.playMod + 1
    if (playMod > SINGLE_CYCLE_MOD) {
      playMod = SEQUENCE_MODE
    }
    this.setData({
      playMod: playMod
    })
  },
  prev: function () {
    // app.currentIndex = this.getNextIndex(false)
    this.setData({
      mid_id: this.getNextIndex(false)
    })
    // wx.stopBackgroundAudio()
    // this.next()
    this._init()
  },
  next: function () {
    // app.currentIndex = 
    this.setData({
      mid_id: this.getNextIndex(true)
    })
    // wx.stopBackgroundAudio()
    // this.prev()
    this._init()
  },
  /**
   * 获取不同播放模式下的下一曲索引
   * @param nextFlag: next or prev
   * @returns currentIndex
   */
  getNextIndex: function (nextFlag) {
    let ret,
      currentIndex = this.data.mid_id,
      mod = this.data.playMod,
      len = this.data.currentSong.length
    if (mod === RANDOM_MOD) {
      ret = util.randomNum(len)
    } else {
      if (nextFlag) {
        ret = currentIndex * 1 + 1 == len ? 0 : currentIndex * 1 + 1
      } else {
        ret = currentIndex * 1 - 1 < 0 ? len - 1 : currentIndex * 1 - 1
      }
    }
    return ret
  },
  togglePlaying: function () {
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log(res);
        var status = res.status
        if (status == 1) {
          wx.pauseBackgroundAudio()
        } else {
          wx.playBackgroundAudio()
        }
      }
    })
  },
  // openList: function () {
  //   if (!this.data.songslist.length) {
  //     return
  //   }
  //   this.setData({
  //     translateCls: 'uptranslate'
  //   })
  // },
  close: function () {
    this.setData({
      translateCls: 'downtranslate'
    })
  },
  playthis: function (e) {
    const index = e.currentTarget.dataset.index
    app.currentIndex = index
    this._init()
    this.close()
  },
  changeDot: function (e) {
    this.setData({
      currentDot: e.detail.current
    })
  },
  // 试听
  onScrt: function (event) {
    wx.navigateTo({
      url: '../../auditions/auditions',
    })
  }
})