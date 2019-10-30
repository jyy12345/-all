import API from '../../../api.js';
const app = getApp()
Page({
  data: {
    tabbar: {},
    contentData:{},
    isOpen: false,//播放开关
    starttime: '00:00', //正在播放时长
    duration: '04:05', //总时长 
    src:'https://yiyanmeishu-oss001.oss-cn-beijing.aliyuncs.com/audio/misic.mp3',
    title:'美术史：有关艺术作品的历史发展及其风格的研究',
    releaseDate:'2018-10-26',
    playNums:'100',

bodyImgUrl:'https://yiyanmeishu-oss001.oss-cn-beijing.aliyuncs.com/img/module2/art-circles/art-appreciation/history-of-beauty.png',
    winWidth: 0,
    // winHeight: 0,
    // tab切换  
    currentTab: 0,
    hiddenName: true,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  clickMe: function (e) {
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },
  onGo: function () {
    wx.navigateTo({
      url: '../../myTeam/myTeam',
    })
  },
  
  onLoad: function (options) {
    getApp().editTabBar(); 
    this.audioCtx = wx.createAudioContext('myAudio');
    var myDate = new Date();
    var that = this;
    var appreciationDist = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId:111,
      queryId: options.kind
    }
    console.log(options.kind);
    wx.request({
      url: API.appreciationDist,
      method: "get",
      data: API.getParams(appreciationDist),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        that.setData({
          contentData: res.data.data.data,
          src: res.data.data.data[0].audioUrl,
          title: res.data.data.data[0].title,
          releaseDate: res.data.data.data[0].releaseDate,
          playNums: res.data.data.data[0].playNums,
          bodyImgUrl: res.data.data.data[0].bodyImgUrl
        })
        // that.setData({
          
        // })
        
        console.log(res.data.data.data);
      },
      fail: function () {
        console.log("fail");
      }
    })
  },
  // 播放
  audioPlay: function () {
    this.audioCtx.play()
    this.setData({
      isOpen: true
    })
  },
  //暂停
  audioPause: function () {
    this.audioCtx.pause()
    this.setData({
      isOpen: false
    })
  },
  //拖动进度条
 
  sliderChange(e) {
    console.log(e);
    var offset = parseInt(e.detail.value);
    console.log(offset)
    this.audioCtx.seek(offset);
  },
  //监听播放时长
  updata(e) {
    var thit=this;
    console.log(e)
    var that = this;
    var duration = e.detail.duration; //总时长
    console.log(duration)
    // var offset = parseInt(offset * 100 / duration);
    function formatSeconds(value) {
      var secondTime = parseInt(value) // 秒
      var minuteTime = 0 // 分
      var hourTime = 0 // 小时
      var dayTime = 0 // 天
      var result = ''
      if (value < 60) {
        result = secondTime + '秒'
      } else {
        if (secondTime >= 60) { // 如果秒数大于60，将秒数转换成整数
          // 获取分钟，除以60取整数，得到整数分钟
          minuteTime = parseInt(secondTime / 60)
          // 获取秒数，秒数取佘，得到整数秒数
          secondTime = parseInt(secondTime % 60)
          // 如果分钟大于60，将分钟转换成小时
          if (minuteTime >= 60) {
            // 获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60)
            // 获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60)
            if (hourTime >= 24) {
              // 获取天数， 获取小时除以24，得到整数天
              dayTime = parseInt(hourTime / 24)
              // 获取小时后取余小时，获取分钟除以24取余的分；
              hourTime = parseInt(hourTime % 24)
            }
          }
        }
        if (secondTime > 0) {
          secondTime = parseInt(secondTime) >= 10 ? secondTime : '0' + secondTime
          result = '' + secondTime 
        }
        if (minuteTime > 0) {
          minuteTime = parseInt(minuteTime) >= 10 ? minuteTime : '0' + minuteTime
          result = '' + minuteTime + ':' + result
        }
        // if (hourTime > 0) {
        //   result = '' + parseInt(hourTime) + ':' + result
        // }
        // if (dayTime > 0) {
        //   result = '' + parseInt(dayTime) + '天' + result
        // }
      }
      return result
    }
  
    thit.setData({
      duration: formatSeconds(duration)
    })
    console.log(duration)
    var offset = e.detail.currentTime; //当前播放时长
    var currentTime = parseInt(e.detail.currentTime);
    var min = "0" + parseInt(currentTime / 60);
    var max = parseInt(e.detail.duration);
    var sec = currentTime % 60;
    if (sec < 10) {
      sec = "0" + sec;
    };
    var starttime = min + ':' + sec; /* 00:00 */
    that.setData({
      offset: currentTime,
      starttime: starttime,
      max: max
    })

    //判断音频播放结束
    if (offset >= duration) {
      console.log("播放结束")
      that.setData({
        starttime: '00:00', //正在播放时长
        isOpen: false,
        offset: 0
      })
    }
  },
  /** 
   * 滑动切换tab 
   */
  pustAuto: function (e) {
    console.log(e);
    var that=this;
    that.setData({
      src: e.currentTarget.dataset.audos,
      bodyImgUrl: e.currentTarget.dataset.cuss,
      title: e.currentTarget.dataset.title,
      releaseDate: e.currentTarget.dataset.releasedate,
      playNums: e.currentTarget.dataset.playnums
    })
  },
  bindChange: function (e) {

    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },
  // 试听
  onScrt: function (event) {
    wx.navigateTo({
      url: '../../auditions/auditions',
    })
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
  },
  onReady: function (e) {

  }
})
