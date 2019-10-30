// pages/classification/classification.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:[],
    search_txt: "",
    label_id:''
  },
  // getSearch_txt: function (e) {
  //   this.setData({
  //     search_txt: e.detail.value
  //   })
  // },
  // searchSubmit: function (options) {
  //   var that = this;
  //   var search_txt = that.data.search_txt;
  //   this.setData({
  //     label_id: search_txt
  //   })
  //   wx.navigateTo({
  //     url: '../searchresult/searchresult?search=' + this.data.label_id,
  //   })
  // },
  //搜索
  search_box: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.globalData.common.post({
      url: '/index/category',

    })
      .then(res => {
        console.log(res)
        if (res.data.status == '200') {
          that.setData({
            category: res.data.data.category
          })
        }
      })
  },
  gtoDetail:function(e){
    console.log(e);
    var cateId = e.currentTarget.dataset.cateid
    wx.navigateTo({
      url: '../searchresult/searchresult?code=' + cateId,
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