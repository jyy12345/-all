const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:'',
    password:''
  },
  number:function(e){
    this.setData({
      number:e.detail.value
    })
  },
  password:function(e){
    this.setData({
      password: e.detail.value
    })
  },
  bd_success:function(){
      app.globalData.common.post({
        url:'/personal/bindCard',
        data:{
          number:this.data.number,
          pwd:this.data.password
        }
      })
      .then(res=>{
        console.log(res);
        if(res.data.status=="200"){
          wx.showToast({
            title: '绑定成功',
          })
          wx.navigateTo({
            url: '../personaldata/personaldata',
          })
        }
      })
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