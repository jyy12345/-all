const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount:''
  },
  amount:function(e){
    this.setData({
      amount:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  pay: function (e) {
    var openId = wx.getStorageSync('openid');
    app.globalData.common.post({
      url:'/wxpayment/payment',
      data:{
        pay_from:1,
        amount: this.data.amount
      }
    })
    .then(res=>{
      console.log(res);
          wx.requestPayment({

        'timeStamp': res.data.data.timeStamp.toString(),

        'nonceStr': res.data.data.nonceStr,

        'package': res.data.data.package,

        'signType': 'MD5',

        'paySign': res.data.data.paySign,

        success: function (event) {

          // success   

          wx.showToast({

            title: '支付成功',

            icon: 'success',

            duration: 2000

          });

          //处理  业务逻辑



        },

        fail: function (error) {

          // fail   

          console.log("支付失败")

          wx.showToast({

            title: '支付失败',

            icon: 'none',

            duration: 2000

          });

        }

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