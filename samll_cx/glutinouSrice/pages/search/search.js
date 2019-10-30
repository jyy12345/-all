const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    laber:[],
    search_txt: "",
    label_id:''
  },
  getSearch_txt: function (e) {
    this.setData({
      search_txt: e.detail.value
    })
  },
  label_id:function(e){
    this.setData({
      label_id: e.currentTarget.id
    })
    wx.navigateTo({
      url: '../searchresult/searchresult?search=' + this.data.label_id,
    })
  },
  searchSubmit: function (options) {
    var that = this;
    var search_txt = that.data.search_txt;
    this.setData({
      label_id: search_txt
    })
    wx.navigateTo({
      url: '../searchresult/searchresult?search=' + this.data.label_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    app.globalData.common.post({
      url:'/index/hotSearch'
    })
    .then(res=>{
      console.log(res);
      if(res.data.status=='200'){
          that.setData({
            laber:res.data.data
          })
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