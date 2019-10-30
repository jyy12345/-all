// pages/mine/index.js
const utils = require('../../utils/util.js');
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myCollection:[],
    imgUrls: app.globalData.imgUrl,
    headImg:'../../images/index/touxiang.jpg',
    nickname:'',
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
    var headImg = wx.getStorageSync('userImg')
    var nickname = wx.getStorageSync('userName')
    var user_id = wx.getStorageSync('userId')
    this.setData({
      headImg: headImg,
      nickname: nickname
    })
    app.post(app.globalData.ServerURL + 'us_cell', {
      "id": user_id
    }).then((res) => {
      
      console.log(res, '收藏列表');
      var that = this;
      if(res.data.code==400){
        that.setData({
          myCollection: res.data.data
        })
      }
      
      
      if (res.data.code == 200) {
        that.setData({
          myCollection: res.data.data
        })
        res.data.data.forEach(item => {
          var nowTime = utils.formatTime(new Date()).slice(0, 10);//当前年月日
          console.log(nowTime)
          var pubTime = item.statrtime;
          var pubDate;
          if (pubTime){
            pubDate = pubTime.slice(0, 10);//发布的年月日
          }
          if (nowTime !== pubDate) {
            // console.log('不是一天')
            item.statrtime = pubDate;
          } else {
            let date = new Date(item.statrtime.replace(/-/g, '/')).getTime();
            item.statrtime = utils.timeHandle(date);
          }
        });
       
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    })
    }
  },
  // 详情
  detail(e) {
    console.log(e)
    var lang = e.currentTarget.dataset.lang;
    var id = e.currentTarget.dataset.id;
    console.log(lang)
    if(lang==3){//期刊详情
      wx.navigateTo({
        url: '/pages/service/periodicalDetail/index?id='+id,
      })
    }else if(lang==1){
      wx.navigateTo({
        url: '/pages/journalism/journalism?journalismId=' + id,
      })
    } else if (lang == 2) {
      wx.navigateTo({
        url: '/pages/detail/index?informationId=' + id,
      })
    }
  },
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onShow:function(){
    this.onLoad();

    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
    // var user_id = wx.getStorageSync('userId');
    // if (user_id == '') {
    //   wx.showToast({
    //     title: '请登录',
    //     icon: 'loading',
    //     duration: 1000,
    //     mask: true
    //   })
    //   wx.navigateTo({
    //     url: '../authorization/authorization',
    //   })
    // } else {
    //   console.log(1, '11')
    //   var headImg = wx.getStorageSync('userImg')
    //   var nickname = wx.getStorageSync('userName')
    //   var user_id = wx.getStorageSync('userId')
    //   this.setData({
    //     headImg: headImg,
    //     nickname: nickname
    //   })
    //   app.post(app.globalData.ServerURL + 'us_cell', {
    //     "id": user_id
    //   }).then((res) => {
    //     console.log(res, '收藏列表');
    //     var that = this;
    //     if (res.data.code == 200) {
    //       res.data.data.forEach(item => {
    //         var nowTime = utils.formatTime(new Date()).slice(0, 10);//当前年月日
    //         console.log(nowTime)
    //         var pubTime = item.statrtime;
    //         var pubDate;
    //         if (pubTime) {
    //           pubDate = pubTime.slice(0, 10);//发布的年月日
    //         }
    //         if (nowTime !== pubDate) {
    //           // console.log('不是一天')
    //           item.statrtime = pubDate;
    //         } else {
    //           let date = new Date(item.statrtime.replace(/-/g, '/')).getTime();
    //           item.statrtime = utils.timeHandle(date);
    //         }
    //       });
    //       that.setData({
    //         myCollection: res.data.data
    //       })
    //     }
    //   }).catch((errMsg) => {
    //     console.log(errMsg);
    //   })
    // }
  }
})