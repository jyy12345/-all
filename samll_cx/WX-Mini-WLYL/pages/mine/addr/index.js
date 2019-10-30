// pages/mine/addr/index.js
var app=getApp();
Page({
  data: {
    orderId:'',
    addressList:[],
    froms:''
  },
  onLoad: function (options) {
    console.log(options)
    if (options){
      this.data.froms = options.froms
      this.data.orderId = options.id
    }
    
  },
  getAddressList(){
    var openid = wx.getStorageSync("openId");
    app.post(app.globalData.ServerURL + 'personalcenter/address',{
      'openid': openid,
    }).then((res) => {
      console.log(res)
      if (res.data.code == 0) {
        this.setData({
          addressList: res.data.data
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },
  onShow:function(){
    this.getAddressList()
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
  // 地址选择
  chooseAddr(e){
    console.log(e)
    var addrId = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var mobile = e.currentTarget.dataset.mobile;
    var addr = e.currentTarget.dataset.addr;
    var orderId = this.data.orderId
    if (this.data.froms == 'order'){
      wx.redirectTo({
        url: '/pages/cart/orderDetail/index?addrId=' + addrId+'&name=' + name + '&mobile=' + mobile + '&addr=' + addr+'&id='+orderId,
      })
    }
  },
  //编辑
  edit:function(e){
   wx.navigateTo({
     url: '/pages/mine/addAddr/index?addressId='+e.currentTarget.dataset.addressid,
   })
  },
  // 删除
  deleteAddr:function(e){
    console.log(e)
    var deleteId = e.currentTarget.dataset.id;
    wx.showModal({
      content: '确认删除此地址吗？',
      success: res => {
        if (res.confirm) {
          app.post(app.globalData.ServerURL + 'personalcenter/addressdel', {
            'id': deleteId,
          }).then((res) => {
            console.log(res)
            if (res.data.code == 0) {
              this.getAddressList()
            }
          }).catch((errMsg) => {
            console.log(errMsg);
          });
        }
      }
    })
    
  },
  // 新增地址
  handelAddAddress(e) {
    console.log(this.data.froms)
    if (this.data.froms){
      wx.navigateTo({
        url: "/pages/mine/addAddr/index?froms=" + this.data.froms + '&id=' + this.data.orderId,
      })
    }else{
      wx.navigateTo({
        url: "/pages/mine/addAddr/index"
      })
    }
    
  }
})