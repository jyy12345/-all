//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabbar: {},
    /** 
     * 页面配置 
     */
    winWidth: 0,
    // winHeight: 0,
    // tab切换  
    currentTab: 0,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  history: function () {
    wx.navigateTo({
      url: 'unitedStates/unitedStates',
    })
  },
  macic: function () {
    wx.navigateTo({
      url: '../masterWorks/masterWorks',
    })
  },

  onLoad: function () {
    getApp().editTabBar(); 
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {
    console.log(e);
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
