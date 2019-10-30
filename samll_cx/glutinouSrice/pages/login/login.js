var interval = null //倒计时函数
const app=getApp();
Page({
  data: {
    time: '获取验证码', //倒计时 
    currentTime: 60,
    disabled:false,
    mobile:'',
    code:''
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '获取验证码',
          currentTime: 60,
          disabled: false
        })
      }
    }, 1000)
  },
  mobile:function(e){
    var that=this;
    that.setData({
      mobile:e.detail.value
    })
  },
  code: function (e) {
    var that = this;
    that.setData({
      code: e.detail.value
    })
  },
  getVerificationCode() {
    var that = this;
    if (that.data.mobile!=''){
      that.getCode();
      that.setData({
        disabled: true
      })
      wx.request({
        url: 'https://www.nmsbooks.com/index/Login/shortmessage.html',
        method: 'POST',
        data: {
          mobile: that.data.mobile
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (res) {
          wx.hideLoading()
          console.log(res);
        },
        fail: function (res) {
          wx.hideLoading()
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    }else{
      wx.showLoading({
        title: '请填写手机号',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    }
    
  },
  loginBtn:function(){
    var that=this;
    app.globalData.common.post({
      url:'/login/login',
      data:{
        code:that.data.code,
        mobile: that.data.mobile
      }
    })
    .then(res=>{
      console.log(res);
      if(res.data.status=="200"){
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })
        wx.setStorageSync('token', res.data.data.token);
      }
    })
  }
})