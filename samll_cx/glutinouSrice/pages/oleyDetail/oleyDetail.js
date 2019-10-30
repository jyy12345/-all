// pages/recommend/recommend.js
const app = getApp();
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
    tyoes: 1,
    count: 0
  },
  //加入购物车
  shoppyC: function (e) {
    console.log(e)
    app.globalData.common.post({
      url: '/cart/addCart',
      data: {
        id: e.currentTarget.id,
        num: '1'
      }
    })
      .then(res => {
        console.log(res);
        if (res.data.status == '200') {
          wx.showToast({
            title: '加入成功',
            icon: 'success',
            duration: 2000
          })
          wx.switchTab({
            url: '../shoppingCart/shoppingCart',
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var types = options.types;
    var that = this;
    that.setData({
      tyoes: types
    })
    app.globalData.common.post({
      url: '/index/recommendLists',
      data: {
        type: types,
        page: 1
      }
    })
      .then(res => {
        console.log(res)
        if (res.data.status == '200') {
          that.setData({
            list: res.data.data.recommend.data,
            count: res.data.data.recommend.per_page
          })
          console.log(that.data.list)
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
          url: '/index/recommendLists',
          data: {
            type: that.data.tyoes,
            page: 1
          }
        })
          .then(res => {
            console.log(res)
            if (res.data.status == '200') {
              var content = that.data.list.concat(res.data.data.recommend.data)//将放回结果放入content
              that.setData({
                list: content,
                page: that.data.page * 1 + 1,
                load: true,
                loading: false,
              })
            } else {
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

  }
})