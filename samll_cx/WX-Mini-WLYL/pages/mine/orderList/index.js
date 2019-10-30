// pages/mine/order/index.js
var app=getApp();
Page({
  data: {
    currentData : 0,
    winHeight:wx.getSystemInfoSync().windowHeight,
    swiperHeight:0,
    orderList:[]
  },
  onLoad: function (options) {
    this.getlist();    
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
  getlist:function(){
    var openid = wx.getStorageSync("openId");
    app.post(app.globalData.ServerURL + 'myorder/index',{
      'openid': openid,
      'status': this.data.currentData
    }).then((res) => {
      console.log(res)
      if (res.data.code == 0) {
        this.setData({
          orderList: res.data.data
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },
  //点击切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;
    if (that.data.currentData === e.target.dataset.current){
        return false;
    }else{
      that.setData({
        currentData: e.target.dataset.current
      })
    }
    this.getlist();
  },
  //继续购买
  jiZf:function(e){
    console.log(e.currentTarget.dataset.idss);
    wx.navigateTo({
      url: '/pages/cart/orderDetail/index?id=' + e.currentTarget.dataset.idss,
    })
  },
  //去支付                
  payment:function(e){
    console.log(e);
    console.log(e.currentTarget.dataset.goodsid);
    var id = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '/pages/cart/orderDetail/index?id=' + id,
    })
  },
  //确认收货
  quite:function(e){
    console.log(e.currentTarget.dataset.quite);
    app.post(app.globalData.ServerURL + 'myorder/edit',{
      'id': e.currentTarget.dataset.quite,
      'status':'3'
    }).then((res) => {
      console.log(res)
      if (res.data.code == 0) {
        console.log(1);
        this.getlist();   
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  }
})