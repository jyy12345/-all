import API from "../../api.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    contentData:[]
  },
  // 试听
  onScrt: function (event) {
    wx.navigateTo({
      url: '../../../../auditions/auditions',
    })
  },
  curriculum:function(e){
    if(e.target.id==1){
      wx.navigateTo({
        url: 'activityAp/activityAp?ids=' + e.target.id,
      })
    }
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().editTabBar();
    var myDate = new Date();
    var that = this;
    var artCircles = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: 111
    }
    wx.request({
      url: API.artCircles,
      method: "get",
      data: API.getParams(artCircles),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        that.setData({
          contentData: res.data.data
        })
        console.log(res);
      },
      fail: function () {
        console.log("fail");
      }
    })
    // getApp().editTabBar();
    // var myDate = new Date();
    // var that = this;
    // var hsXq = {
    //   appId: '100001',
    //   token: 'de67f0c0-edea-441f-806a-759673f1e870',
    //   requestId: myDate.getTime(),
    //   businessId: 111,
    //   activityId: 1
    // }
    // wx.request({
    //   url: API.hdAp,
    //   method: "get",
    //   data: API.getParams(hsXq),
    //   header: {
    //     'content-type': 'application/json;charset=utf-8'
    //     // "Content-Type": "application/ x - www - form - urlencoded"
    //   },
    //   success: function (res) {
    //     that.setData({
    //       contentData: res.data
    //     })

    //     console.log(res);
    //   },
    //   fail: function () {
    //     console.log("fail");
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})