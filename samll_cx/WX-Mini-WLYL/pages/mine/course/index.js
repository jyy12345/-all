// pages/mine/course/index.js
var app=getApp();
Page({
  data: {
    curriculum:[],
    imgUrl: app.globalData.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = wx.getStorageSync("openId");
    app.post(app.globalData.ServerURL + 'myorder/course',{
      'openid': openid,
    }).then((res) => {
      console.log(res)
      if (res.data.code == 0) {
        this.setData({
          curriculum: res.data.data
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);
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
  //去听课
  goTo:function(e){
    var coursetype = e.currentTarget.dataset.coursetype;
    if (coursetype==1){
      wx.navigateTo({
        url: '../../cart/onlineCourse/index?id=' + e.currentTarget.dataset.idss,
      })
    } else if (coursetype ==2){
      wx.navigateTo({
        url: '../../cart/offlineCourse/index?id=' + e.currentTarget.dataset.idss,
      })
    }
  }
})