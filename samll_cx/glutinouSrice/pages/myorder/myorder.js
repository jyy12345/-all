const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    page:1,
    orderList:[],
    orderNav: [{ 'id': 0, 'name': '全部订单', 'val': '' }, { 'id': 1, 'name': '待付款', 'val': 0 }, { 'id': 2, 'name': '待发货', 'val': 1 }, { 'id': 3, 'name': '待收货', 'val': 2 }, { 'id': 4, 'name': '已完成', 'val': 3 }],
    seleId:0
  },
  seleBtn:function(e){
    console.log(e)
     this.setData({
       seleId: e.target.id,
       type:e.currentTarget.dataset.val
     })
    this.ajdA();
  },
  //跳转详情页面
  goTodetail:function(e){
    var ids = e.currentTarget.dataset.ids;
    var shippId = e.currentTarget.dataset.shippid;
    wx.navigateTo({
      url: '../orderdetailfk/orderdetailfk?ids=' + ids + '&shippId=' + shippId + '&orderId=' + e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that=this;
    if (options!=''){
      that.setData({
        seleId: options.ids,
        type: options.val
      })
    }
    
    that.ajdA();
  },
  ajdA:function(){
    var that=this;
    app.globalData.common.post({
      url: '/personal/myOrder',
      data: {
        type: that.data.type,
        page: that.data.page
      }
    })
      .then(res => {
        console.log(res);
        that.setData({
          orderList: res.data.data.order.data
        })
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