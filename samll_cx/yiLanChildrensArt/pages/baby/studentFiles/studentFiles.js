import API from '../../../api.js';
const getPhone = wx.getStorageSync("phones");
Page({
  data: {
    tabbar: {},
    babyData:{}
  },
  onLoad: function (options) {
    getApp().editTabBar();
    var myDate = new Date(); 
    var that=this;
    var studentarchives = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '哈哈',
      phone: getPhone
    }
    wx.request({
      url: API.studentarchives,
      method: "get",
      data: API.getParams(studentarchives),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        that.setData({
          babyData: res.data.data
        })
        console.log(res.data.data);
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