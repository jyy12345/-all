import API from '../../api.js';
Page({
  data: {
    tabbar: {},
    contentData:{}
  },
  artIn:function(e){
    if(e.target.id==1){
      wx.navigateTo({
        url: '../artAppreciation/artAppreciation',
      })
    }else if(e.target.id==2){
      wx.navigateTo({
        url: '../activityArrangement/activityArrangement',
      })
    }
    
  },
  // 试听
  onScrt: function (event) {
    wx.navigateTo({
      url: '../auditions/auditions',
    })
  },
  onLoad: function (options) {
    getApp().editTabBar(); 
    var myDate = new Date();
    var that = this;
    var artCircles = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId:111
    }
    wx.request({
      url: API.huodAp,
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