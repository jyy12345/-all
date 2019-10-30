// pages/mine/register/common.js
var util = require('../../../utils/util.js');//调用封装的request
//获取应用实例
const app = getApp()
Page({
  data: {
    name: '',
    sex: ['男', '女'],
    index: 0,
    sexType: 1,
    occupationage: '',//教龄
    age: '',
    mobile: '',
    email: '',
    begoodat: '',//id
    goodAt: [],
    goodArray:[],
    goodHide:true,
    intro: '',//介绍
    openId: '',
    userImg: '',
    type: 2,
    creatTime: '',
    focus:'',
  },
  onLoad: function (options) {
    var openId = wx.getStorageSync('openId');
    var userImg = wx.getStorageSync('userImg');
    this.data.openId = openId;
    this.data.userImg = userImg;
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
  // 昵称
  getName(e) {
    console.log(e)
    this.setData({
      name: e.detail.value
    })
  },
  // 性别
  getSex(e) {
    console.log(typeof (Number(e.detail.value)))
    this.data.sexType = Number(e.detail.value) + 1
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.sexType, '性别传值')
  },
  // 教龄
  getTeachage(e){
    this.setData({
      occupationage: e.detail.value
    })
  },
  // 年龄
  getAge(e) {
    console.log(e)
    this.setData({
      age: e.detail.value
    })
  },
  // 获取手机号
  getPhoneNumber(e) {
    if (e.detail.encryptedData) {
      var that=this;
      wx.login({
        success: res => {
          // console.log(res.code);
          app.post(app.globalData.ServerURL + 'user/mobile', {
            'encryptedData': encodeURIComponent(e.detail.encryptedData),
            'iv': e.detail.iv,
            'encrypteddata': e.detail.encryptedData,
            'code': res.code
          }).then((res) => {
            // console.log(res)
            if (res.data.code == 0) {
              wx.setStorageSync('phone', res.data.data.phoneNumber);
              that.setData({
                mobile: res.data.data.phoneNumber
              })
            }
          }).catch((errMsg) => {
            console.log(errMsg);
          });
        }
      })
    }
  },
  // 邮箱
  getEmail(e) {
    console.log(e)
    this.setData({
      email: e.detail.value
    })
  },
  // 擅长
  getGood(e){
    this.setData({
      focus:false
    })
    app.post(app.globalData.ServerURL + "user/coachbegoodat", {}).then((res) => {
      console.log(res);
      this.setData({
        goodArray:res.data.data
      })
    }).catch((errMsg) => {
      console.log(errMsg);
    })
    this.setData({
      goodHide: false,
    })
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var arr = [];
    e.detail.value.forEach(current => {
      for (var item of this.data.goodArray) {
        if (current == item.id) {
          arr.push(item.title);
          break;
        }
      }
    });
    this.setData({
      goodAt: arr,
      begoodat: e.detail.value
    });
    
  },
  unhide(e){
    console.log(e)
    this.setData({
      goodHide: false,
    })
  },
  confirme(e){
    this.setData({
      goodHide: true,
    })
  },
  // 个人说明
  getIntro(e) {
    this.setData({
      intro: e.detail.value
    })
  },
  hide(e){
    console.log(e)
    this.setData({
      goodHide: true,
    })
  },
  // 注册
  goReg(e) {
    var hasreg = wx.getStorageSync('type');
    console.log(hasreg)
    if (hasreg != 2) {
      var name = this.data.name
      var sexType = this.data.sexType
      var occupationage = this.data.occupationage
      var age = this.data.age
      var mobile = this.data.mobile
      var email = this.data.email;
      var begoodat = this.data.begoodat;
      var intro = this.data.intro;
      if (name != '' && sexType != '' && age != '' && mobile != '' && email != '' && begoodat != '' && intro != '') {
        app.post(app.globalData.ServerURL + "user/coach", {
          "name": name,
          "sex": sexType,
          "occupationage": occupationage,
          "age": age,
          "mobile": mobile,
          "email": email,
          "begoodat": begoodat,
          "content": intro,
          "openid": this.data.openId,
          "image": this.data.userImg,
        }).then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            wx.setStorageSync('type', 2);
            wx.setStorageSync('role', 1);//会员的状态：1是专业-2普通
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
          
        }).catch((errMsg) => {
          console.log(errMsg);
        })
      } else {
        wx.showToast({
          title: '请将信息填写完整',
          icon: 'none',
          duration: 1000
        })
      }
    } else {
      wx.showToast({
        title: '您已注册过了',
        icon: 'none',
        duration: 1000
      })
      // wx.reLaunch({
      //   url: '/pages/index/index',
      // })
    }

  },

  // textarea失去焦点
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },
  // 用户协议
  userAgreement(e) {
    wx.navigateTo({
      url: "/pages/mine/register/userAgreement"
    });
  }
})