import API from '../../../api.js';
const getPhone = wx.getStorageSync("phones");
Page({
  data: {
    tabbar: {},
    babytData:[],
    swiperCurrent: 0,
    worklIst:[],
    interval: 3000,
    duration: 800,
    circular: true
  },
  workStavi:function(e){
    var kind = e.currentTarget.id
    wx.navigateTo({
      url: '../detailsWork/detailsWork?kind='+kind,
    })
  },
  commingSong:function(){
    wx.navigateTo({
      url: '../comingSoon/comingSoon',
    })
  },
  //轮播图的切换事件
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
    console.log(e.detail.current);
  },
  // 左点击
  swiperClickleft: function (e) {
    if (this.data.swiperCurrent == '0') {
      return;
    }
    this.setData({
      swiperCurrent: this.data.swiperCurrent -1
    })
  },
  // 右点击
  swiperClickright: function (e) {
    console.log(this.data.worklIst.length);
    if (this.data.swiperCurrent >= this.data.worklIst.length-1) {
      return;

    }
    this.setData({
      swiperCurrent: this.data.swiperCurrent + 1
    })
  },
  onLoad: function (options) {
    getApp().editTabBar(); 
    var myDate = new Date();
    var that = this;
    var babyWorks = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '哈哈',
      phone: getPhone
    }
    wx.request({
      url: API.babyWorks,
      method: "get",
      data: API.getParams(babyWorks),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        that.setData({
          babytData: res.data.data,
          worklIst: res.data.data.workList
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