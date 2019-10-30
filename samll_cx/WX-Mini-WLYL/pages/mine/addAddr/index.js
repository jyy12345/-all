// pages/mine/addAddr/index.js
const utils = require('../../../utils/util.js');//调用封装的request
const app=getApp();
Page({
  data: {
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: '北京市 北京市 东城区',
    customItem: '全部',
    consignee:'',//收货人
    address:'',//详细地址
    mobile: '',//联系电话
    defaultaddress: 2,//2:默认地址
    checked: true,//true:默认地址
    editAddress:null,
    adres:'',//编辑id
    buttonWord:'',//btn自判断
    froms: '',//从哪跳过来的
    orderId:'',//订单id
  },
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value.join(' '))
    this.setData({
      region: e.detail.value.join(' ')
    })
  },
  onLoad: function (options) {
    if (options.addressId!=undefined){
      this.setData({
        adres: options.addressId
      })
      // 展示编辑信息
      var openid = wx.getStorageSync("openId");
      app.post(app.globalData.ServerURL + 'personalcenter/addresschange', {
        'id': options.addressId,
      }).then((res) => {
        console.log(res)
        if (res.data.code == 0) {
          if (res.data.data.defaultaddress==1){
            var checked=false;
            this.setData({
              checked: checked
            })
          }
          this.setData({
            region: res.data.data.address,
            consignee: res.data.data.name,//收货人
            address: res.data.data.addressdetail,//详细地址
            mobile: res.data.data.mobile,//联系电话
            defaultaddress: res.data.data.defaultaddress,//默认地址
          })
        }
      }).catch((errMsg) => {
        console.log(errMsg);
      });
    }
    // 从订单过来
    if (options.froms){
      var butWord='保存并选用'
      this.setData({
        buttonWord: butWord,
        orderId: options.id,
      })
    }else{
      var butWord = '保存'
      this.setData({
        buttonWord: butWord
      })
    }
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
  //收货人
  handleConsignee(e) {
    this.setData({
      consignee: e.detail.value
    })
  },
  //详细地址
  handleAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },
  //联系电话
  handleMobile(e){
    this.setData({
      mobile: e.detail.value
    })
  },
  // 默认设置
  switchChange(e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    this.data.checked=e.detail.value;
    if (e.detail.value==true){
      this.data.defaultaddress=2;
    }else{
      this.data.defaultaddress = 1;
    }
  },
  // 保存
  successe:function(){
    var ids=0;
    if (this.data.adres==''){
        ids=0;
    }else{
        ids=this.data.adres
    }
    var openid = wx.getStorageSync("openId");
    console.log(this.data.defaultaddress,'默认地址')
    if (this.data.consignee && this.data.mobile && this.data.region && this.data.address!=''){
      app.post(app.globalData.ServerURL + 'personalcenter/addressedit', {
        'id': ids,
        'openid': openid,
        'name': this.data.consignee,
        'mobile': this.data.mobile,
        'address': this.data.region,
        'addressdetail': this.data.address,
        'defaultaddress': this.data.defaultaddress
      }).then((res) => {
        console.log(res)
        if (res.data.code == 0) {
          var name = this.data.consignee;
          var mobile = this.data.mobile;
          var addr = this.data.region + this.data.address;
          var addrId = res.data.data;
          console.log(addrId)
          if (this.data.buttonWord=='保存并选用') {
            wx.redirectTo({
              url: '/pages/cart/orderDetail/index?addrId=' + addrId+'&name=' + name + '&mobile=' + mobile + '&addr=' + addr + '&id=' + this.data.orderId,
            })
          }else{
            if (ids == 0) {
              wx.showToast({
                title: '添加成功',
                duration: 2000
              })
              wx.navigateBack({
                delta: 1
              })
            } else {
              wx.showToast({
                title: '修改成功',
                duration: 2000
              })
              wx.navigateBack({
                delta: 1
              })
            }
          }
        }
      }).catch((errMsg) => {
        console.log(errMsg);
      });
    }else{
      wx.showToast({
        title: '请将信息填写完整',
        icon: 'none',
        duration: 2000
      })
    }
  }
})