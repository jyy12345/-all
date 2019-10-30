//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  editTabBar: function(){
    var tabbar = this.globalData.tabbar,
        currentPages = getCurrentPages(),
        _this = currentPages[currentPages.length - 1],
        pagePath = _this.__route__;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for(var i in tabbar.list){
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  globalData:{
    userInfo:null,
    tabbar:{
      color: "#000000",
      selectedColor: "#0f87ff",
      backgroundColor: "#ffffff",
      borderStyle: "#c8c8c8",
      list: [
        {
          pagePath: "/pages/homeIndex/homeIndex",
          iconPath: "/images/tab/home_normal.png",
          selectedIconPath: "/images/tab/home_pressed.png",
          selected: true
        },
        {
          pagePath: "/pages/baby/myBaby/myBaby",
          iconPath: "/images/tab/user_normal.png",
          selectedIconPath: "/images/tab/user_pressded.png",
          selected: false
        }
      ],
      position: "bottom"
    }
  }
})