const getPhone = wx.getStorageSync("phones");   //获取用户手机号
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    // wx.login({
    //     success: function (loginCode) {
    //       var appid = 'wx321791f0b4c25892'; //填写微信小程序appid
    //       var secret ='fb122d11eea87d30c9cc590455c1469f'; //填写微信小程序secret
    //       //调用request请求api转换登录凭证
    //       wx.request({
    //         url: 'https://api.weixin.qq.com/sns/jscode2session?appid=‘+appid+’& secret=‘+secret +’& grant_type=authorization_code & js_code='+loginCode.code,
    //         header: {
    //           'content-type': 'application/json'
    //         },
    //         success: function (res) {
    //           console.log(res.data.openid) //获取openid
    //         }
    //       })
    // }
    // })
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
  onLoad: function (options) {
    checkcrosstime();
    // options 中的scene需要使用decodeURIComponent才能获取到生成二维码时传入的scene
    var scene = decodeURIComponent(options.scene)//参数二维码传递过来的参数
    var query = options.query.dentistId // 参数二维码传递过来的场景参数
    //存一个过期时间
    var timestamp = Date.parse(new Date());
    var expiration = timestamp + 8;//86400秒（一天）
    wx.setStorageSync("index_data_expiration", expiration);

    var expiration = wx.getStorageSync("index_data_expiration");//拿到过期时间
    var timestamp = Date.parse(new Date());//拿到现在时间
    //进行时间比较
    if (expiration < timestamp) {//过期了，清空缓存，跳转到登录
      console.log("缓存已过期");
      wx.clearStorageSync();//清空缓存
      wx.showToast({
        title: '请登录',
        icon: 'none',
        duration: 2000
      });
      // wx.redirectTo({
      //   url: '../login/login',
      // });//跳转到登录
      return;
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
    songlist: [],
    currentIndex: 0,
    tabbar:{
      color: "#000000",
      selectedColor: "#0f87ff",
      backgroundColor: "#ffffff",
      borderStyle: "#c8c8c8",
      list: [
        {
          pagePath: "/pages/index/index",
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