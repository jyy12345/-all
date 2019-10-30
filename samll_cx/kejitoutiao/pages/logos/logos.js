//获取应用实例
const app = getApp()

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: true,
    type: "password",
    names: null,
    passwords: null,
    openIds: null,
    logoT: false,
    phoneCod:'',
    isShowPassword:true
  },

  names: function (e) {
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
    // if (this.data.phoneCod==""){
    //   wx.showToast({
    //     icon: 'loading',
    //     title: '手机号不能为空',
    //   })
    // }else {
      console.log(this.data.openIds)
    app.post(app.globalData.ServerURL + 'login',
      { 'account': this.data.names, 'openid': this.data.openIds, 'password': this.data.passwords }).then((res) => {
        console.log(res);
        if (res.data.code == '200') {
          wx.setStorageSync("userId", res.data.data.id);
          this.setData({
            logoT: false
          })
          wx.showToast({
            title: "登录成功",
          })
          wx.switchTab({
            url: '../index/index',
          })
        } else if (res.data.code == '400'){
          wx.showToast({
            icon: 'none',
            title: res.data.message,
            
          })
        }  
      }).catch((errMsg) => {
        console.log(errMsg);
      })
    // }
  },
  eye: function () {
    // var type = this.data.type == "text" ? "password" : "text"
    // this.setData({
    //   type: type
    // })
    var isShowPassword = !this.data.isShowPassword;
    this.setData({
      isShowPassword: isShowPassword
    });
  },
  // 获取手机号
  getPhoneNumber(e) {
    if (e.detail.encryptedData) {
      var that = this;  
      wx.login({
        success: res => {
          console.log(res.code);
          app.post(app.globalData.ServerURL + 'mobile', {
            'encryptedData': encodeURIComponent(e.detail.encryptedData),
            'iv': e.detail.iv,
            'encrypteddata': e.detail.encryptedData,
            'code': res.code
          }).then((res) => {
            console.log(res)
            if (res.data.code == 200) {
              wx.setStorageSync('phone', res.data.data.phoneNumber);
              that.setData({
                phoneCod: res.data.data.phoneNumber
              })
            }else{
              wx.showToast({
                title: "获取失败",
              })
            }
          }).catch((errMsg) => {
              console.log(errMsg);
          });
        }
      })
    }
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
                  app.post(app.globalData.ServerURL + "SignIn", { "code": res.code }).then((res) => {
                    console.log(res.data.data);
                    that.setData({
                      openIds: res.data.data.openid
                    })
                    wx.setStorage({
                      key: 'openIds',
                      data: res.data.data,
                      success: function (res) {
                        console.log('异步保存成功')
                      }
                    })
                    wx.setStorageSync('openIds', res.data.data);

                  }).catch((errMsg) => {
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
})