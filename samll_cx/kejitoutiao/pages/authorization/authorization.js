//获取应用实例
const app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: true,
    type: "password",
    names:null,
    passwords:null,
    openIds:null,
    logoT:false
  },
  
  names:function(e){
     this.setData({
       names: e.detail.value
     })
  },
  passwords: function (e) {
    this.setData({
      passwords: e.detail.value
    })
  },
  formSubmit: function (e) {
    app.post(app.globalData.ServerURL + 'login', 
      { 'account': this.data.names, 'openid': this.data.openIds, 'password': this.data.passwords}).then((res)=>{
        console.log(res);
        if(res.data.code=='200'){
          wx.setStorageSync("userId",res.data.data.id);
          this.setData({
            logoT: false
          })
          // wx.reLaunch({
          //   url: '../index/index',
          // })
        }
      }).catch((errMsg)=>{
        console.log(errMsg);
      })
  },
  eye: function () {
    var type = this.data.type == "text" ? "password" : "text"
    this.setData({
      type: type
    })
  },

  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // that.setData({
          //   isHide: false
          // });
          // wx.reLaunch({
          //       url: '../index/index',
          //     })
          wx.getUserInfo({
            success: function (res) {
              wx.login({
                success: res => {
                  console.log("用户的code:" + res.code);
                  // wx.request({
                  //   url: app.globalData.ServerURL+'SignIn',
                  //   method: "post",
                  //   header: {
                  //     'content-type': 'application/x-www-form-urlencoded'
                  //     // 'content-type': 'application/json;charset=utf-8'
                  //   },
                  //   data: { "code": res.code },
                  //   success: res => {
                  //     // 获取到用户的 openid
                  //     console.log(res);
                  //   }
                  // });
                  app.post(app.globalData.ServerURL + "SignIn", { "code": res.code}).then((res)=>{
                    console.log(res);
                    that.setData({
                      openIds:res.data.data
                    })
                    wx.setStorage({
                      key: 'openIds',
                      data: res.data.data,
                      success: function (res) {
                        console.log('异步保存成功')
                      }
                    })
                    wx.setStorageSync('openIds', res.data.data);
                   
                  }).catch((errMsg)=>{
                    console.log(errMsg);
                  })
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          // that.setData({
          //   isHide: true
          // });
        }
      }
    });
    
  },
  onShow:function(){
    this.onLoad();
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      wx.setStorageSync('userImg', e.detail.userInfo.avatarUrl);
      wx.setStorageSync('userName', e.detail.userInfo.nickName);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      // that.setData({
      //   isHide: false
      // });
      wx.navigateTo({
        url: '../logos/logos',
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
    // wx.navigateBack({
    //   url: '/pages/index/index'
    // })
  },
  onShow:function(){
    
  },
  onUnload: function () {
    console.log('ttt')
    wx.reLaunch({
      url: '../index/index'
    })
  }
})