const utils = require('../../../utils/util.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhuanList:[],
    imgUrls: app.globalData.imgUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options.ids);
    app.post(app.globalData.ServerURL + 'info', { "id": options.ids}).then((res)=>{
      console.log(res);
      if (res.data.code == 200) {
        res.data.data.forEach(item => {
          var nowTime = utils.formatTime(new Date()).slice(0, 10);//当前年月日
          console.log(nowTime)
          var pubTime = item.statrtime;
          var pubDate = pubTime.slice(0, 10);//发布的年月日
          console.log(nowTime, "现在时间")
          console.log(pubDate, '发布时间')
          if (nowTime !== pubDate) {
            console.log('不是一天')
            item.statrtime = pubDate;
          } else {
            let date = new Date(item.statrtime.replace(/-/g, '/')).getTime();
            item.statrtime = utils.timeHandle(date);
          }
        });
        that.setData({
          zhuanList: res.data.data
        })
      }
    }).catch((errMsg)=>{
      console.log(errMsg);
    })
  }, 
  goInfromDetail:function(e){
    console.log(e.currentTarget.dataset.infrom);
    wx.navigateTo({
      url: '../../detail/index?informationId=' + e.currentTarget.dataset.infrom,
    })
  },
})