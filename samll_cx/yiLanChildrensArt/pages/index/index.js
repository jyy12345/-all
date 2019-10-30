// pages/homeIndex/homeIndex.js
Page({

  /**
   * 页面的初始数据
   */
  // 我们是这样的
  onTap: function (event) {
    //wx.navigateTo 和 wx.redirectTo 不允许跳转到 tabbar 页面，只能用 wx.switchTab 跳转到 tabbar 页面
    wx.navigateTo({
      url: './weArelike/weArelike'
    });
  },
  // 试听
  onScrt: function (event) {
    wx.navigateTo({
      url: '../auditions/auditions',
    })
  },
  // 艺术鉴赏
  onYshu: function (event) {
    wx.navigateTo({
      url: '../artCircles/artCircles',
    })
  },
  // 拍照测评
  photoEvaluation: function () {
    wx.navigateTo({
      url: '../photoEvaluation/photoEvaluation',
    })
  },
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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