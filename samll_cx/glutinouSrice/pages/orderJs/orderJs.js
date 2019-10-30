const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     orderJs:[],
    radios:true,
    order:''
  },
  radios:function(){
    this.setData({
      radios: !this.data.radios
    })
  },
  //收货地址
  jsAddress:function(){
    wx.navigateTo({
      // url: '../jsaddAddress/jsaddAddress',
      url: '../addressAdministration/addressAdministration',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type=options.type;
    if (options.cart_ids){
      var cateId = options.cart_ids;
      var newsarr = cateId.split(",").toString();
    }
    var book_id = options.bood_id;
    var book_num=options.num;
    console.log(newsarr)
    var that=this;
    if(type==1){
      app.globalData.common.post({
        url: '/order/confirm',
        data: {
          type: type,
          cart_ids: newsarr
        }
      })
        .then(res => {
          console.log(res);
          if(res.data.status=="200"){
            that.setData({
              orderJs:res.data.data.lists,
              order:res.data.data
            })
          }
        })
    }else if(type==2){
      app.globalData.common.post({
        url: '/order/confirm',
        data: {
          type: type,
          book_id: book_id,
          book_num: book_num
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.status == "200") {
            that.setData({
              orderJs: res.data.data.lists,
              order: res.data.data
            })
          }
        })
    }
   
  },
  orderDetail:function(e){
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../classificationdetail/classificationdetail?cateId=' + e.currentTarget.id,
    })
  },
  //支付
  pay: function (e) {
    var openId = wx.getStorageSync('openid');
    app.globalData.common.post({
      url: '/wxpayment/payment',
      data: {
        pay_from: 1,
        amount: this.data.order.totalPrice + this.data.order.totalNum,
        order_sn: this.data.order.order.order_sn
      }
    })
      .then(res => {
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