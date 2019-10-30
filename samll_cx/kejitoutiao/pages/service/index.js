// pages/service/index.js
const utils = require('../../utils/util.js');
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    periodicals:'',
    imgUrls: app.globalData.imgUrl,
    userIs: app.globalData.userId 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user_id = wx.getStorageSync('userId');
    if (user_id == '') {
      wx.showToast({
        title: '请登录',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      wx.navigateTo({
        url: '../authorization/authorization',
      })
    } else {
    var user_id = wx.getStorageSync('userId')
    app.post(app.globalData.ServerURL + 'periodical', {
      "user_id": user_id
    }).then((res) => {
      console.log(res,'期刊列表');
      var that=this;
      if(res.data.code==200){
        res.data.data.forEach(item => {
          var nowTime = utils.formatTime(new Date()).slice(0, 10);//当前年月日
          console.log(nowTime)
          var pubTime=item.statrtime;
          var pubDate = pubTime.slice(0, 10);//发布的年月日
          console.log(nowTime,"现在时间")
          console.log(pubDate,'发布时间')
          if (nowTime!== pubDate){
            console.log('不是一天')
            item.statrtime = pubDate;
          }else{
            let date = new Date(item.statrtime.replace(/-/g, '/')).getTime();
            item.statrtime = utils.timeHandle(date);
          }
        });
        that.setData({
          periodicals: res.data.data
        })
        console.log(that.data.periodicals, '时间改变')
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    })
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 详情
  detail(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/service/periodicalDetail/index?id='+id,
    })
  }
})