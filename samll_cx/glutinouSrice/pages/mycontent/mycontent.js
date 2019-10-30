const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    member:[],
    listNav: [{ 'id': 1, 'imgs': 'icon-weibiaoti2fuzhi04', 'title': '待付款', 'val': 0 }, { 'id': 2, 'imgs': 'icon-yifahuo', 'title': '待发货', 'val': 1 }, { 'id': 3, 'imgs': 'icon-daishouhuo', 'title': '待收货', 'val': 2 }, { 'id': 4, 'imgs': 'icon-tuikuan', 'title': '退款/售后', 'val': 3 }],
  },
  myCouse:function(){
   wx.navigateTo({
     url: '../collection/collection',
   })
  },
  goOrder:function(e){
    console.log(e.currentTarget.dataset.ids)
    wx.navigateTo({
      url: '../myorder/myorder?ids=' + e.currentTarget.dataset.ids + '&val=' + e.currentTarget.dataset.val,
    })
  },
  //消息
  news:function(){
    wx.navigateTo({
      url: '../news/news',
    })
  },
  browse:function(){
    wx.navigateTo({
      url: '../browse/browse',
    })
  },
  purchase: function () {
    wx.navigateTo({
      url: '../purchase/purchase',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    app.globalData.common.post({
      url:'/personal/index',
    })
    .then(res=>{
      console.log(res);
      if(res.data.status="200"){
        if (res.data.message == "请先登录"){
            wx.showModal({
              title: '提示',
              content: '请先登录',
              showCancel:false,
              success(res){
                if (res.confirm) {
                  console.log('用户点击确定');
                  wx.navigateTo({
                    url: '../login/login',
                  })
                }
              }
            })
        }else{
          that.setData({
            member: res.data.data
          })
        }
       
      }
    })
  },
  //编辑资料
  editZl:function(){
     wx.navigateTo({
       url: '../personaldata/personaldata',
     })
  },
  //管理收货地址
  address_gl: function() {
    wx.navigateTo({
      url: '../addressAdministration/addressAdministration',
    })
  },
  //跳转详情
  detail: function (e) {
    var cateId = e.currentTarget.dataset.cateid
    wx.navigateTo({
      url: '../classificationdetail/classificationdetail?cateId=' + cateId,
    })
  },
  //全部订单
  allOrder:function(){
    wx.navigateTo({
      url: '../myorder/myorder',
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