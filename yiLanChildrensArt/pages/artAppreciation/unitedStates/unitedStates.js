//获取应用实例
const app = getApp()
Page({
  data: {
    tabbar: {},
    isOpen: false,//播放开关
    starttime: '00:00', //正在播放时长
    duration: '06:41', //总时长 
     src:'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    /** 
     * 页面配置 
     */
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
  
  onLoad: function (e) {
    getApp().editTabBar(); 
    this.audioCtx = wx.createAudioContext('myAudio');
    var that = this;
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
    this.audioCtx.seek(offset);
  },
  //监听播放时长
  updata(e) {
    console.log(e)
    var that = this;
    var offset = parseInt(offset * 100 / duration);
    var duration = e.detail.duration; //总时长
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
  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
  onReady: function (e) {

  }
})
