import API from '../../api.js';
Page({
  data: {
    worksDetails:[]
  },
  onLoad: function (options) {
    var myDate = new Date();
    var that = this;
    var worksDetails = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      workId: options.workId,
      businessId:111
    }
    wx.request({
      url: API.worksDetails,
      method: "get",
      data: API.getParams(worksDetails),
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: function (res) {
        that.setData({
          worksDetails: res.data.data
        })
        console.log(res);
      },
      fail: function () {
        console.log("fail");
      }
    })
  },
  imgGo:function(e){
    var myDate = new Date();
    var that = this;
    var worksDetails = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      workId: e.target.id
    }
    wx.request({
      url: API.worksDetails,
      method: "get",
      data: API.getParams(worksDetails),
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: function (res) {
        that.setData({
          worksDetails: res.data.data
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