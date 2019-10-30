import API from '../../api.js';
const app = getApp()
Page({
  data: {
    tabbar: {},
    contentData:[],
    limit: 11,//显示数据量
    list: '',
    page: 1,//当前页
    load: true,
    loading: false,//加载动画的显示
    songs: {}
  },
  imgGo:function(e){
    // console.log(e);
    app.globalData.currentIndex = e.target.id;
    app.globalData.songlist = this.data.songs
    wx.setStorageSync('songlist', this.data.songs)
    // console.log(this.data.songs)
    if( e.currentTarget.dataset.bindex==undefined){
      e.currentTarget.dataset.bindex=''
    }
    // console.log( e.currentTarget.dataset.bindex)
      wx.navigateTo({
        url: '../player/player?artWorkId=' +  e.currentTarget.dataset.bindex

      })
  },
  // 试听
  onScrt: function (event) {
    wx.navigateTo({
      url: '../auditions/auditions',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().editTabBar();
    this.audioCtx = wx.createAudioContext('myAudio');
    var myDate = new Date();
    var that = this;
    var masterWorks = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId:111,
      page: 1,
      pageSize: 5
    }
    console.log(options.kind);
    wx.request({
      url: API.masterWorks,
      method: "get",
      data: API.getParams(masterWorks),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        that.setData({
          contentData: res.data.data
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
    var that = this;
    var myDate = new Date();
    var masterWorks = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      page: 0,
      pageSize: 5
    }
    if (that.data.load) {//全局标志位，方式请求未响应是多次触发
      if (that.data.list.length < that.data.count) {
        that.setData({
          load: false,
          loading: true,//加载动画的显示
        })
        wx.request({
          url: API.masterWorks,
          method: "get",
          data: API.getParams(masterWorks),
          success: function (res) {
            console.log(res)
            var content = that.data.list.concat(res.data.data)//将放回结果放入content
            that.setData({
              list: content,
              page: that.data.page * 1 + 1,
              load: true,
              loading: false,
            })
          },
          fail: function (res) {
            that.setData({
              loading: false,
              load: true,
            })
            wx.showToast({
              title: '数据异常',
              icon: 'none',
              duration: 2000,
            })
          },
          complete: function (res) { },
        })
      }
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})