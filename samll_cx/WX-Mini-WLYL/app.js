//app.js

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  post: function (url, data) {
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
        success: function (res) {
          resolve(res);
        },
        error: function (e) {
          reject('网络出错');
        }
      })
    });
    return promise;
  },
  get: function (url) {
    var promise = new Promise((resolve, reject) => {
      var that = this;
      wx.request({
        url: url,
        data: "",
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          resolve(res);
        },
        error: function (e) {
          reject('网络出错');
        }
      })
    });
    return promise;
  },
  globalData: {
    userInfo: null,
    ServerURL: "https://www.tcm2018.cn/index/",
    imgUrl: "https://www.tcm2018.cn/",
    global_bac_audio_manager: {
      manage: wx.getBackgroundAudioManager(),
      is_play: false,
      id: '',
      play_time: '',
      article_id: '',
    }
  }
})