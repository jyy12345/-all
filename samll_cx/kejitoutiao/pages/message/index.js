//main.js
//获取应用实例
var app = getApp()
Page({
  data: {
    windowHeight: "",
    windowWidth: "",
    dataId: 0,
    slider: [],
    currentSwiper: 0,
    autoplay: true,
    imgUrls: app.globalData.imgUrl,
    specialList:[],
    userIs: app.globalData.userId 
  },
  onLoad: function (options) {
    var user_id = wx.getStorageSync('userId');
    console.log(this.data.userIs)
    if (user_id== '') {
      wx.showToast({
        title: '请登录',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      wx.navigateTo({
        url: '../authorization/authorization',
      })
    } else {
    var that = this;
    app.get(app.globalData.ServerURL +'flash1').then((res)=>{
      console.log(res);
      that.setData({
         slider: res.data.data,
     });
    }).catch((errMsg)=>{
      console.log(errMsg);
    })
    app.post(app.globalData.ServerURL + 'special', {'user_id':'1'}).then((res)=>{
      console.log(res);
      that.setData({
        specialList:res.data.data
      })
    }).catch((errMsg)=>{
      console.log(errMsg);
    })
    }
  },
  onShow: function (e) {
    this.onLoad()
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight - 90 / 750 * res.windowWidth,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  check: function (e) {
    this.setData({
      dataId: e.target.dataset.id,
    })
  },
  onReachBottom(){
  }

})
