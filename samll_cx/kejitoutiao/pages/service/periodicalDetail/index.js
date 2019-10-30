var wxParse = require('../../../wxParse/wxParse.js')
const utils = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: [],
    imgUrls: app.globalData.imgUrl,
    status: ""
  },
  // 收藏
  collection: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var user_id = wx.getStorageSync('userId')
    app.post(app.globalData.ServerURL + "collection", { 
      "user_id": user_id,
      "id": id,
      "lang":3
    }).then((res) => {
      console.log(res);
      if(res.data.code==200){
        this.setData({
          status: 1
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    })
  },
  // 取消收藏
  cancel: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var user_id = '1';
    app.post(app.globalData.ServerURL + "cancel_collection", {
      "user_id": user_id,
      "id": id,
      "lang":3
    }).then((res) => {
      console.log(res);
      if(res.data.code==200){
        var status = 2
        this.setData({
          status: status
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    
    var user_id = wx.getStorageSync('userId')
    app.post(app.globalData.ServerURL + "periodical_info", { 
      "id": options.id,
      'user_id': user_id
    }).then((res) => {
      console.log(res,'详情')
      var that = this;
      if (res.data.code == 200) {
        console.log(res.data.data);
        var data=res.data.data;
        var article = data.content;//富文本内容
        wxParse.wxParse('databinding', 'html', article, that, 0);

        var status = data.status;//收藏状态
        var nowTime = utils.formatTime(new Date()).slice(0, 10);//当前年月日
        console.log(nowTime)
        var pubTime = data.statrtime;
        var pubDate = pubTime.slice(0, 10);//发布的年月日
        console.log(nowTime, "现在时间")
        console.log(pubDate, '发布时间')
        if (nowTime !== pubDate) {
          console.log('不是一天')
          data.statrtime = pubDate;
        } else {
          let date = new Date(item.statrtime.replace(/-/g, '/')).getTime();
          data.statrtime = utils.timeHandle(date);
        }
        that.setData({
          details: data,
          status: status
        })
        console.log(that.data.details, '详情')
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})