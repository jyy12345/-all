//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tabbar: {},
    text: '获取验证码', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    phone: '' //获取到的手机栏中的值
  },
  //获取手机栏input中的值
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //获取验证码按钮
  bindButtonTap: function () {
    var that = this;

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

  onLoad: function() {
    getApp().editTabBar(); 
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  },
   
  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {

    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
