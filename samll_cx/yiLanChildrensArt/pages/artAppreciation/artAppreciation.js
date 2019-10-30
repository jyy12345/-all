import API from '../../api.js';
const app = getApp()

Page({
  data: {
    tabbar: {},
    contentData: {},
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
  history: function (e) {
    var kind = e.currentTarget.id
    if (kind == '1' || kind == '2' || kind == '4'){
      wx.navigateTo({
        url: 'unitedStates/unitedStates?kind=' + kind,
      })
    } else if (kind == '3' ){
      wx.navigateTo({
        url: '../masterWorks/masterWorks?kind=' + kind,
      })
    }
   
  },
  macic: function () {
    wx.navigateTo({
      url: '../masterWorks/masterWorks',
    })
  },

  onLoad: function () {
    getApp().editTabBar(); 
    var myDate = new Date();
    var that = this;
    var appreciation = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId:111
    }
    wx.request({
      url: API.appreciation,
      method: "get",
      data: API.getParams(appreciation),
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: function (res) {
        that.setData({
          contentData: res.data.data.artAppreciationDetailList
        })
        console.log(res.data.data.artAppreciationDetailList);
      },
      fail: function () {
        console.log("fail");
      }
    })
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
