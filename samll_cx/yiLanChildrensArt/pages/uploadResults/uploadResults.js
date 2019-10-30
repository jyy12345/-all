// pages/uploadResults/uploadResults.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsBj:null
  },
  // 试听
  onScrt: function (event) {
    wx.navigateTo({
      url: '../auditions/auditions',
    })
  },
  // 详情
  xiangGo:function(e){
    console.log(e.currentTarget.dataset.ids);
     wx.navigateTo({
       url: '../othersWorks/othersWorks?workId=' + e.currentTarget.dataset.ids,
     })
  },
  upload:function(){
    wx.navigateTo({
      url: '../photoEvaluation/photoEvaluation',
    })
  },
  imgGo:function(){
   wx.navigateTo({
     url: '../othersWorks/othersWorks',
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var hemes = JSON.parse(options.uploadImg);
    console.log(hemes);
     var that=this;
     that.setData({
       imgsBj: hemes
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