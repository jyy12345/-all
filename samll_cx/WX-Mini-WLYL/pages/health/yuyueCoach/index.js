// pages/health/yuyueCoach/index.js
var app=getApp();
Page({
  data: {
    date: '2019-1-01',//时间
    region: ['北京', '北京市','东城区'],//地址
    address:'',//详细地址
    contents:'',//预约内容
    beiz:'',//备注
    coachId:'',//教练id
  },
  onLoad: function (options) {
    this.setData({
      coachId: options.coachId
    })
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
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  address:function(e){
    this.setData({
      address: e.detail.value
    })
  },
  contents: function (e) {
    this.setData({
      contents: e.detail.value
    })
  },
  beiz: function (e) {
    this.setData({
      beiz: e.detail.value
    })
  },
  //提交
  subitm:function(){
    var time = this.data.date;
    var region = this.data.region;
    var address = this.data.address;
    var contents = this.data.contents;
    var beiz = this.data.beiz;
    var openids = wx.getStorageSync("openId");
    if (time != '' && region != '' && address != '' && contents !=''){
      app.post(app.globalData.ServerURL + 'health/appointment', {
        'coachid': this.data.coachId,
        'openid': openids,
        'address': this.data.region.join(" "),
        'content': this.data.contents,
        'remarks': this.data.beiz,
        'addressdetail': this.data.address,
        'time': this.data.date
      }).then((res) => {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '预约成功',
          })
          wx.switchTab({
            url: '../../health/index',
          })
        }
      }).catch((errMsg) => {
        console.log(errMsg);
      });
    }else{
      wx.showToast({
        title: '请将信息补充完整',
        icon: 'none',
        duration: 2000
      })
    }
    
  }
})