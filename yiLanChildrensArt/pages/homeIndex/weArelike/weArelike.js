
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
  // 试听
  onScrt: function (event) {
    wx.navigateTo({
      url: '../../auditions/auditions',
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onGo:function(){
    wx.navigateTo({
      url: '../../myTeam/myTeam',
    })
  },
  onLoad: function () {
    var myDate=new Date();
    console.log(myDate.getTime());
    getApp().editTabBar(); 
    wx.request({
      url: 'http://crs.local.yl.com:8080/api/xiaochengxu/home/query_module_1.ajax',
      method:"post",
      data: {
        appId: '100001',
        token: 'de67f0c0-edea-441f-806a-759673f1e870',
        requestId: myDate.getTime()
      },
      header: {
        // 'content-type': 'application/json' 
        "Content-Type": "application/ x - www - form - urlencoded"
      },
      success(res) {
        console.log(res.data)
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
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    
    if (e.detail.current==3){
      wx.navigateTo({
        url: '../../myTeam/myTeam',
      })
    }
  },
  bindChange1: function (e) {
    var that = this;
    that.setData({
      currentTab1: e.detail.current
    });
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
