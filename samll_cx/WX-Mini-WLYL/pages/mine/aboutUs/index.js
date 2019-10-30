// pages/mine/aboutUs/index.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutUsData:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAboutUs()
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
  onShow: function () {

  },

  // 关于我们
  getAboutUs() {
    app.post(app.globalData.ServerURL + 'personalcenter/aboutus', {}).then((res) => {
      console.log(res);
      if (res.data.code == 0) {
        var aboutUsData = res.data.data;
        this.setData({
          aboutUsData: aboutUsData,
        })
        console.log(this.data.aboutUsData, '数据')
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },

  
})