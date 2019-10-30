//app.js
const mtjwxsdk = require('./utils/mtj-wx-sdk.js');
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onLoad:function(){
    wx.checkSession({
      success: function (res) {
        console.log("处于登录态");
        wx.navigateTo({
          url: '/pages/index/index',
        })
      },
      fail: function (res) {
        console.log("需要重新登录");
        // wx.navigateTo({
        //   url: '/pages/authorization/authorization',
        // })
         
      }
    })
  },
  post: function(url, data) {
    var promise = new Promise((resolve, reject) => {
      var that = this;
      var postData = data;
      wx.request({
        url: url,
        data: postData,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          resolve(res);
        },
        error: function(e) {
          reject('网络出错');
        }
      })
    });
    return promise;
    
  },
  get: function(url) {
    var promise = new Promise((resolve, reject) => {
      var that = this;
      wx.request({
        url: url,
        data: "",
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          resolve(res);
        },
        error: function(e) {
          reject('网络出错');
        }
      })
    });
    return promise;
  },
  globalData: {
    userInfo: null,
    ServerURL: "https://bkboole.com/Api/index/",
    imgUrl: "https://bkboole.com",
    userId: wx.getStorageSync('userId'),
  }
})
// globalData.ServerURL