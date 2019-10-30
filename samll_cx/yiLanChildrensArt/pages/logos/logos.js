import API from '../../api.js';
const app = getApp()
Page({
  data: {
  canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tabbar: {},
    text: '获取验证码', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    phone: '', //获取到的手机栏中的值
    verificationCode:null,//获取到的验证码
    verification:null, //输入的验证码
  },
  //获取手机栏input中的值
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //获取输入的验证码
  verification:function(e){
    this.setData({
    verification:e.detail.value
    })
  },
  //获取验证码按钮
  bindButtonTap: function () {
    var that = this;
    var myDate = new Date();
    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    })

    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值

    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空

    if (phone == '') {
      warn = "号码不能为空";
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      warn = "手机号格式不正确";
    } else {
      var verificationCode={
        appId: '100001',
        token: 'de67f0c0-edea-441f-806a-759673f1e870',
        requestId: myDate.getTime(),
        businessId: '哈哈',
        phone: that.data.phone,
      }
      wx.request({
        url: API.verificationCode,
        method: "get",
        data: API.getParams(verificationCode),
        header: {
          'content-type': 'application/json;charset=utf-8'
        },
        success:function(res){
           console.log(res);
           that.setData({
             verificationCode: res.data.data.verificationCode
           })
        },
        fail: function () {
          console.log("fail");
        }
      })
      //当手机号正确的时候提示用户短信验证码已经发送
      wx.showToast({
        title: '短信验证码已发送',
        icon: 'none',
        duration: 2000
      });

      //设置一分钟的倒计时
      var interval = setInterval(function () {
        currentTime--; //每执行一次让倒计时秒数减一
        that.setData({
          text: currentTime + 's', //按钮文字变成倒计时对应秒数

        })
        //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({
            text: '重新发送',
            currentTime: 61,
            disabled: false,
            color: '#e4a4ae'
          })
        }
      }, 1000);

    };
    //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
    if (warn != null) {
      wx.showModal({
        title: '提示',
        content: warn
      })

      that.setData({
        disabled: false,
        color: '#e4a4ae'
      })
      return;

    };
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //登录按钮
  signIn:function(e){
    var that=this;
    var myDate = new Date();
    var verificationCode = that.data.verificationCode;//获取到的验证码
    var verification = that.data.verification;//输入的验证码
    if (verification==verificationCode){
      // wx.setStorage({
      //   key: "phones",
      //   data: that.data.phone
      // })
      var verificationCode = {
        appId: '100001',
        token: 'de67f0c0-edea-441f-806a-759673f1e870',
        requestId: myDate.getTime(),
        businessId: '哈哈',
        phone: that.data.phone,
        verificationCode: that.data.verification
      }
      wx.request({
        url: API.logos,
        method: "get",
        data: API.getParams(verificationCode),
        header: {
          'content-type': 'application/json;charset=utf-8'
        },
        success: function (res) {
          console.log(res);
          if(res.data.code==0){
            wx.setStorageSync("phones", that.data.phone);
            wx.showToast({
              title: '登录成功',
              icon: 'none',
              duration: 2000
            });
            if(res.data.data.userType==1){
              wx.reLaunch({
                url: '../baby/myBaby/myBaby',
              })
            }else{
              wx.reLaunch({
                url: '../techer/techerIndex/techerIndex',
              })
            }
           
          }
        },
        fail: function () {
          console.log("fail");
        }
      })
     
    }else{
      wx.showToast({
        title: '验证码输入错误',
        icon: 'none',
        duration: 2000
      });
    }
   
  },
  onLoad: function() {
    getApp().editTabBar(); 
    // 查看是否授权
    // wx.getSetting({
    //   success: function (res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res);
    //           console.log(res.userInfo)
    //         }
    //       })
    //     }
    //   }
    // })
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
                  // app.post(app.globalData.ServerURL + "SignIn", { "code": res.code }).then((res) => {
                  //   console.log(res);
                  //   that.setData({
                  //     openIds: res.data.data
                  //   })
                  // }).catch((errMsg) => {
                  //   console.log(errMsg);
                  // })
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
  bindGetUserInfo: function (e) {
    console.log(111)
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
      // wx.navigateTo({
      //   url: '../logos/logos',
      // })
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
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
