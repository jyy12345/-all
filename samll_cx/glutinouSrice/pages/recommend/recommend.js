// pages/recommend/recommend.js

const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit: 11,//显示数据量
    list: '',
    page: 1,//当前页
    load: true,
    loading: false,//加载动画的显示
    code:1,
    count:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var code = options.cateId;
    var that=this;
    that.setData({
      code: code
    })
    app.globalData.common.post({
      url:'/index/lists',
      data: { 
        code: code,
        page:1
      }
    })
    .then(res=>{
      console.log(res)
      if (res.data.status == '200') {
        that.setData({
          list: res.data.data.hot,
          count: res.data.data.count
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
    var that = this;

    if (that.data.load) {//全局标志位，方式请求未响应是多次触发
      if (that.data.list.length < that.data.count) {

        that.setData({
          load: false,
          loading: true,//加载动画的显示
        })
        app.globalData.common.post({
          url: '/index/lists',
          data: {
            code: that.data.code,
            page: that.data.page
          }
        })
          .then(res => {
            console.log(res)
            if (res.data.status == '200') { 
              var content = that.data.list.concat(res.data.data.hot)//将放回结果放入content
              that.setData({
                list: content,
                page: that.data.page * 1 + 1,
                load: true,
                loading: false,
              })
            }else{
              that.setData({
                loading: false,
                load: true,
              })
              wx.showToast({
                title: '数据异常',
                icon: 'none',
                duration: 2000,
              })
            }
          })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  gd_ck:function(e){
    var ids = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../classificationdetail/classificationdetail?cateId='+ids,
    })
  }
})