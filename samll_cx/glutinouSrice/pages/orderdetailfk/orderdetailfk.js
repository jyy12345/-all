const app=getApp();
const time=require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ids:'',
    shippId:'',
    jssj:"2020-07-24 07:23:00",//设置结束时间
    timer:"",//倒计时定时器名称
    qgdjs_jo: { day: "00", hour: "00", min: "00", sec: "00"},    //抢购倒计时
    order_detail:[],
    times:''
  },
  //倒计时
  countDown: function () {
    let that = this;
    that.setData({
      timer: setInterval(function () {

        var lefttime = parseInt((new Date(that.data.jssj.replace(/-/g, "/")).getTime() - new Date().getTime()));

        if (lefttime <= 0) {
          that.setData({
            qgdjs_jo: { day: "00", hour: "00", min: "00", sec: "00" }
          })
          clearInterval(that.data.timer);
          return;
        }

        var d = parseInt(lefttime / 1000 / 3600 / 24);  //天数
        var h = parseInt(lefttime / 1000 / 3600 % 24); //小时
        var m = parseInt(lefttime / 1000 / 60 % 60);    //分钟
        var s = parseInt(lefttime / 1000 % 60);        //当前的秒

        d < 10 ? d = "0" + d : d;
        h < 10 ? h = "0" + h : h;
        m < 10 ? m = "0" + m : m;
        s < 10 ? s = "0" + s : s;

        that.setData({
          qgdjs_jo: { day: d, hour: h, min: m, sec: s }
        })
      }, 1000)
    })
  },
  // 取消订单
  cancel:function(){
   app.globalData.common.post({
     url:'/personal/cancelOrder',
     data:{
       id: this.data.order_detail.order.order_id
     }
   })
   .then(res=>{
     console.log(res);
     if(res.data.status=='200'){
       wx.showToast({
         title: '取消成功',
         duration: '1000'
       })
       wx.navigateTo({
         url: '../myorder/myorder',
       })
     }else{
       wx.showToast({
         icon:'none',
         title: '取消失败',
       })
     }
   })
  },
  // 删除订单
  delOrder: function () {
    app.globalData.common.post({
      url: '/personal/orderDelete',
      data: {
        id: this.data.order_detail.order.order_id
      }
    })
      .then(res => {
        console.log(res);
        if (res.data.status == '200') {
          wx.showToast({
            title: '删除成功',
            duration:'1000'
          })
          wx.navigateTo({
            url: '../myorder/myorder',
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '删除失败',
          })
        }
      })
  },
  //确认收货
  confirm: function () {
    app.globalData.common.post({
      url: '/personal/confirmReceipt',
      data: {
        id: this.data.order_detail.order.order_id
      }
    })
      .then(res => {
        console.log(res);
        if (res.data.status == '200') {
          wx.showToast({
            title: '确认成功',
            duration: '1000'
          })
          wx.navigateTo({
            url: '../myorder/myorder',
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '确认失败',
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that=this;
    that.setData({
      ids: options.ids,
      shippId: options.shippId
    })
    console.log(this.data.shippId);
    this.countDown();
    app.globalData.common.post({
      url:'/personal/myOrderDetails',
      data:{
        id: options.orderId
      }
    })
    .then(res=>{
      console.log(res);
      if(res.data.status=='200'){
        var currenttime = res.data.data.order.add_time;
        that.setData({
          order_detail: res.data.data,
          times: time.formatTime(currenttime, 'Y/M/D h:m:s')
        })
      }
    })
  },
  // 一键复制事件
  copyBtn: function (e) {
    var that = this;
    wx.setClipboardData({
      //准备复制的数据
      data:that.data.order_detail.order.order_sn,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },
  //支付
  pay: function (e) {
    var openId = wx.getStorageSync('openid');
    app.globalData.common.post({
      url: '/wxpayment/payment',
      data: {
        pay_from: 1,
        amount: parseFloat(this.data.order_detail.order.total_amount) + parseFloat(this.data.order_detail.order.shipping_price),
        order_sn: this.data.order_detail.order.order_sn
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