const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: ['--请选择--'],
    name: '',
    mobile: '',
    address: '',
    defaultaddress:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 默认地址设置
  switchChange(e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    this.data.checked = e.detail.value;
    if (e.detail.value == true) {
      this.data.defaultaddress = 2;
    } else {
      this.data.defaultaddress = 1;
    }
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //收货人
  name: function (e) {
    var that = this;
    that.setData({
      name: e.detail.value
    })
  },
  //手机号
  phone: function (e) {
    var that = this;
    that.setData({
      mobile: e.detail.value
    })
  },
  //详细地址
  address: function (e) {
    var that = this;
    that.setData({
      address: e.detail.value
    })
  },
  //提交
  successBrn: function () {
    var that = this;
    app.globalData.common.post({
      url: '/personal/addressSave',
      data: {
        name: that.data.name,
        mobile: that.data.mobile,
        province: that.data.region[0],
        city: that.data.region[1],
        area: that.data.region[2],
        address: that.data.address,
        defaultaddress: that.data.defaultaddress //是否默认
      }
    }).then(res => {
      console.log(res);
      if (res.data.status == "200") {
        console.log(res);
      } else if (res.data.status == "400") {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          success(res) {
            if (res.confirm) {
              if (res.data.message == '请登录')
                wx.navigateTo({
                  url: '../login/login',
                })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
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