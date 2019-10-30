// pages/a/a.js
Page({

  /**
   * 页面的初始数据
   */
  data: {



    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',

    isOpen: false,//播放开关

    starttime: '00:00', //正在播放时长

    duration: '06:41' //总时长

  },



  onLoad: function (e) {

    //使用wx.createAudioContext 获取 audio

    this.audioCtx = wx.createAudioContext('myAudio')

    var that = this;

    console.log(e)

  },

  //开始播放

  audioPlay: function () {

    this.audioCtx.play()

    this.setData({

      isOpen: true

    })

  },

  //暂停播放

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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})