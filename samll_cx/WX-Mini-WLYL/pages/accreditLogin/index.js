//获取应用实例
const app = getApp()

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openIds: null,
    type:'',
  },

  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        // console.log(res,'shouquan')
        
        if (res.authSetting['scope.userInfo']) {
          var type = wx.getStorageSync('type')
          if (type == 1) {
            wx.reLaunch({
              url: '/pages/mine/register/register',
            })
          } else {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
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
  onShareAppMessage: function (options) {
    if (options.from === 'button') {
      // 来自页面内转发按钮
      console.log(options.target)
    }
    return {
      //## 此为转发页面所显示的标题
      title: '未来国医',
      //## 此为转发页面的描述性文字
      desc: '',
      //## 此为转发给微信好友或微信群后，对方点击后进入的页面链接，可以根据自己的需求添加参数
      path: 'pages/index/index',
      //## 转发操作成功后的回调函数，用于对发起者的提示语句或其他逻辑处理
      success: function (res) {
        //这是我自定义的函数，可替换自己的操作
        util.showToast(1, '发送成功');
      },
      //## 转发操作失败/取消 后的回调处理，一般是个提示语句即可
      fail: function () {
        util.showToast(0, '转发失败...');
      }
    }
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
          app.post(app.globalData.ServerURL + "user/openid", {
            "code": res.code 
          }).then((res) => {
            console.log(res);
            if(res.data.code==0){
              wx.setStorageSync('openId', res.data.data.openid);
              wx.setStorageSync('type', res.data.data.type);//注册的状态：1是未注册-2已注册
              if (res.data.data.role) {
                wx.setStorageSync('role', res.data.data.role);//会员的状态：1是普通-2专业
              }
              var type = wx.getStorageSync('type')
              that.setData({
                openIds: res.data.data.openid,
                type: res.data.data.type,
              })
              if (res.data.data.type == 1) {
                wx.navigateTo({
                  url: '/pages/mine/register/register',
                })
              } else {
                wx.reLaunch({
                  url: '/pages/index/index',
                })
              }
            }
            
            
            // console.log(that.data.openIds,'openIds')
          }).catch((errMsg) => {
            console.log(errMsg);
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