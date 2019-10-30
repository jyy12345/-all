// pages/mine/yuyue/index.js
var app=getApp();
Page({
  data: {
    currentData : 0,
    appointment:[],
  },
  onLoad: function (options) {
   var that=this;
    that.getOrder();
  },
  onShow: function(){
  },
  //获取当前滑块的index
  bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //继续预约
  ontinue:function(e){
    console.log(e);
     wx.navigateTo({
       url: '../../health/coachDetail/index?healthsId=' + e.currentTarget.dataset.codesid,
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
  //取消预约
  cancel:function(e){
    app.post(app.globalData.ServerURL + 'personalcenter/appointmentstatus',
      {
        'id': e.currentTarget.dataset.yuyid,
        'status': '4'
      }).then((res) => {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '取消成功',
          })
        
         this.getOrder();
          
        }
      }).catch((errMsg) => {
        console.log(errMsg);
      });
  },
  //已完成
  completed:function(e){
    app.post(app.globalData.ServerURL + 'personalcenter/appointmentstatus',
      {
        'id': e.currentTarget.dataset.zhunt,
        'status': '3'
      }).then((res) => {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '已完成哦',
          })

         this.getOrder();
        }
      }).catch((errMsg) => {
        console.log(errMsg);
      
      });
  },
  getOrder:function(){
    var openids = wx.getStorageSync("openId");
    app.post(app.globalData.ServerURL + 'personalcenter/appointment',
      {
        'openid': openids,
        'status': this.data.currentData
      }).then((res) => {
        console.log(res)
        if (res.data.code == 0) {
          var articleDetailData = res.data.data;
          for (var i = 0; i < articleDetailData.length; i++) {
            for (var j = 0; j < articleDetailData[i].time.length; j++) {
              articleDetailData[i].time = articleDetailData[i].time.slice(0, 10);//发布的年月日
            }
          }
          this.setData({
            appointment: articleDetailData
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
    // 全部：0或空 ，预约中：1，待上课：2，已完成：3
    that.getOrder();
  }
  
})