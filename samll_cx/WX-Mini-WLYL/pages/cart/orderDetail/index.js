// pages/cart/orderDetail/index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',//订单id
    addrId:'',//地址id
    name: '',
    mobile: '',
    address: '',
    goodsDetail: '',
    changeAddr:false,//是否切换了地址
    imgUrl: app.globalData.imgUrl,
    courseType: 4,//课程类型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.id = options.id;
    if (options.name){
      this.data.changeAddr = true;
      this.data.addrId = options.addrId;
      this.data.name = options.name;
      this.data.mobile = options.mobile;
      this.data.address = options.addr;
    }
    
    this.getOrderDetail()
  },
  onShareAppMessage: function (options) {
    if (options.from === 'button') {
      // 来自页面内转发按钮
      console.log(options.target)
    }
    return {
      //## 此为转发页面所显示的标题
      title: '未来国医',
      //## 此为转发页面的描述性文字
      desc: '',
      //## 此为转发给微信好友或微信群后，对方点击后进入的页面链接，可以根据自己的需求添加参数
      path: 'pages/index/index',
      //## 转发操作成功后的回调函数，用于对发起者的提示语句或其他逻辑处理
      success: function (res) {
        //这是我自定义的函数，可替换自己的操作
        util.showToast(1, '发送成功');
      },
      //## 转发操作失败/取消 后的回调处理，一般是个提示语句即可
      fail: function () {
        util.showToast(0, '转发失败...');
      }
    }
  },
  getOrderDetail(e){
    var that=this;
    var openid = wx.getStorageSync("openId");
    console.log(app.globalData.ServerURL)
    app.post(app.globalData.ServerURL + "mycourse/purchase", {
      "id": this.data.id,
      'openid': openid
    }).then((res) => {
      console.log(res);
      if (res.data.code == 0) {
        if (that.data.changeAddr==true){
          that.setData({
            addrId: that.data.addrId,
            name: that.data.name,
            mobile: that.data.mobile,
            address: that.data.address
          })
        }else{
          if (res.data.data.address) {
            var addrId = res.data.data.address.id;
            var perMes = res.data.data.address;
            that.setData({
              addrId: addrId,
              name: perMes.name,
              mobile: perMes.mobile,
              address: perMes.address + perMes.addressdetail
            })
          }
        }
        
        var goodsDetail = res.data.data.course;
        that.setData({
          goodsDetail: goodsDetail,
        })
        console.log(this.data.name)
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    })
  },
  // 立即付款
  toPay(e){
    console.log(e)
    console.log(this.data.addrId)
    if (this.data.addrId!=''){
      var price = e.currentTarget.dataset.price;
      var id = e.currentTarget.dataset.id;
      var openid = wx.getStorageSync('openId')
      var addrId = this.data.addrId
      var courseType = this.data.courseType
      console.log(courseType, '课程类型')
      wx.showToast({
        title: '支付中',
        icon: 'loading',
        duration: 2000
      });
      app.post(app.globalData.ServerURL + 'payment/index', {
        'openid': openid,
        'body': '健康产品支付',
        'total': price,
        'goodsId': id,
        'type': courseType,
        'addrId': addrId
      }).then((res) => {
        console.log(res, '支付');
        let result = res.data;
        wx.requestPayment({
          'appId': result.appId,
          'timeStamp': result.timeStamp,
          'nonceStr': result.nonceStr,
          'package': result.package,
          'signType': 'MD5',
          'paySign': result.paySign,
          'success': res => {
            wx.redirectTo({
              url: '/pages/mine/orderList/index',
            })
          },
          'fail': res => {
            wx.showToast({
              title: '支付失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }).catch((errMsg) => {
        console.log(errMsg);
      });
    }else{
      wx.showToast({
        title: '请选择地址',
        icon:'none',
        duration:2000
      })
    }
    
  },
  //选择地址 
  checkAddr(e) {
    wx.redirectTo({
      url: '/pages/mine/addr/index?froms=order'+'&id='+this.data.id
    });
  }
})