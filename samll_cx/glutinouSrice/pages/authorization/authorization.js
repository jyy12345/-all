//获取应用实例
const app = getApp()

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openIds: null,
  },

  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          wx.getUserInfo({
            success: function (res) {
              wx.login({
                success: res => {
                  console.log("用户的code:" + res.code);
                }
              });
            }
          });
        } else {
        }
      }
    });

  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      wx.setStorageSync('userImg', e.detail.userInfo.avatarUrl);
      // wx.setStorageSync('userName', e.detail.userInfo.nickName);
      wx.login({
        success: res => {
          console.log("用户的code:" + res.code);
          app.globalData.common.post({
            url:'/login/code',
            data:{
              code: res.code
            }
          })
          .then(res=>{
            console.log(res);
            if(res.data.status=='200'){
              wx.setStorageSync('openid', res.data.data);
              wx.reLaunch({
                url: '/pages/index/index',
              })
            }
          })
         
        }
      });

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
})