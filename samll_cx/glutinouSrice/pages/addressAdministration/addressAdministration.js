const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     addressList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    app.globalData.common.post({
      url:'/personal/addressList'
    })
    .then(res=>{
      console.log(res);
      if(res.data.stutes="200"){
         that.setData({
           addressList:res.data.data.list
         })
      }
    })
  },
  addAddress:function(){
    wx.navigateTo({
      url: '../addedaddress/addedaddress',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //设为默认
  checkClick:function(e){
    console.log(e.currentTarget.dataset.addressid);
    app.globalData.common.post({
      url:'/personal/addressDefault',
      data: { id: e.currentTarget.dataset.addressid}
    })
    .then(res=>{
      console.log(res);
      if (res.data.status=='200'){
        wx.showToast({
          title: '设置成功',
        })
      }
    })
  },
  //删除
  del:function(e){
    app.globalData.common.post({
      url: '/personal/addressDel',
      data: { id: e.currentTarget.dataset.addressid }
    })
      .then(res => {
        console.log(res);
        if (res.data.status == '200') {
          wx.showToast({
            title: '删除成功',
          })
          this.onLoad();
        }
      })
  },
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