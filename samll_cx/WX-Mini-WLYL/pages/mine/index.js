// pages/mine/index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    headImg: '',
    name:'',
    grade:'',
  },
  onLoad: function (options) {
    this.getPersonalMes()
  },
  onShow: function () {
    // this.onLoad()
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
  getPersonalMes(){
    var openId = wx.getStorageSync('openId');
    var role = wx.getStorageSync('role');
    app.post(app.globalData.ServerURL + "personalcenter/myinformation", {
      "openid": openId,
      "status": role,
    }).then((res) => {
      console.log(res);
      console.log(role);
      if(res.data.code==0){
        var that = this;
        if(role==1){//专业
          that.data.grade = '专业会员'
          var permes=res.data.data.list;
          console.log(permes)
          this.setData({
            headImg: permes.image,
            name: permes.name,
            grade: this.data.grade,
          })
        }else{
          res.data.data.forEach(function (item, index) {
            that.data.headImg = item.image;
            that.data.name = item.name;
            var type = item.type;//1专业 2普通
            if (type == 1) {
              that.data.grade = '专业会员'
            } else {
              that.data.grade = '普通会员'
            }
          })
          console.log(this.data.grade)
          this.setData({
            headImg: this.data.headImg,
            name: this.data.name,
            grade: this.data.grade,
          })
        }
        
        
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    })
  },

  // 编辑资料
  handelPerMes(e) {
    wx.navigateTo({
      url: "/pages/mine/edit/index"
    })
  },

  // 课程
  handelCourse(e) {
    wx.navigateTo({
      url: "/pages/mine/course/index"
    })
  },

  // 预约
  handelYuyue(e) {
    wx.navigateTo({
      url: "/pages/mine/yuyue/index"
    })
  },

  // 订单列表
  handelOrder(e) {
    wx.navigateTo({
      url: "/pages/mine/orderList/index"
    })
  },

  // 地址
  handelAddr(e) {
    wx.navigateTo({
      url: "/pages/mine/addr/index"
    })
  },

  // 关于我们
  handleAboutUs(e) {
    wx.navigateTo({
      url: "/pages/mine/aboutUs/index"
    })
  },

  // 常见问题
  handleQues(e) {
    wx.navigateTo({
      url: "/pages/mine/ques/index"
    })
  }
})