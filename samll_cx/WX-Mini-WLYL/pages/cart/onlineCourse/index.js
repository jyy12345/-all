// pages/cart/onlineCourse/index.js
//获取应用实例
var util = require("../../../utils/util.js");
var app = getApp();
Page({
  data: {
    "menuTapCurrent": 0,
    videoSrc:'',//视频地址
    vStatus:0,
    courseid:'',//课程id
    courseDetailData:[],
    courseLabelData: [],
    courseListData:[],
    imgUrl: app.globalData.imgUrl,
    audioAction: {
      method: 'pause'
    },
    addrId:0,//地址id
    coursetype: '',//课程类型
    isnotbuy:'',//是否购买-1:没买，2:已买
    times: ''
  },
  onLoad: function (options) {
    var times = util.formatTime(new Date());
    this.setData({
      times: times
    })
    console.log(times);
    console.log(options);
    this.data.courseid = options.id;
    // 课程详情
    this.getCourseDetail()
  },
  gotoN:function(){
     wx.navigateTo({
       url: '../../cart/index',
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
      //desc: '',
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
  // 课程详情
  getCourseDetail() {
    var courseid = this.data.courseid;
    console.log(courseid, '传')
    var openid = wx.getStorageSync("openId");
    app.post(app.globalData.ServerURL + 'mycourse/onlinedetail', {
      'courseid': courseid,
      'openid': openid
    }).then((res) => {
      console.log(res, '课程详情');
      if (res.data.code == 0) {
        var isnotbuy = res.data.data.isnotbuy
        var coursetype = res.data.data.course.coursetype
        console.log(coursetype, '课程类型');
        
        this.setData({
          isnotbuy: isnotbuy,
          coursetype: coursetype,
        })
        console.log(this.data.coursetype, '课程类型')
        console.log(this.data.isnotbuy,'是否购买')
        var courseDetailData = res.data.data.course;
        var courseLabelData = res.data.data.courselabel;
        var courseListData,videoSrc
        if (res.data.data.chapter!=''){
          courseListData = res.data.data.chapter;
          videoSrc = this.data.imgUrl + res.data.data.chapter[0].mediaSource;
          this.setData({
            courseListData: courseListData,
          })
        }
        this.setData({
          courseDetailData: courseDetailData,
          courseLabelData: courseLabelData,
          videoSrc: videoSrc,
        })
        console.log(this.data.courseDetailData, '数据')
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },

  // 立即购买
  toBuy(e) {
    console.log(e)
    var that=this
    var price = e.currentTarget.dataset.price;
    var id = e.currentTarget.dataset.id;
    var openid = wx.getStorageSync('openId')
    var addrId = that.data.addrId
    console.log(that.data.coursetype, '课程类型')
    wx.showToast({
      title: '支付中',
      icon: 'loading',
      duration: 2000
    });
    
    app.post(app.globalData.ServerURL + 'payment/index', {
      'openid': openid,  
      'body': '线上支付',
      'total': price,
      'goodsId': id,
      'type': this.data.coursetype,
      'addrId': addrId
    }).then((res) => {
      console.log(res, '支付');
      let result = res.data;
      var that=this;
      wx.requestPayment({
        'appId': result.appId,
        'timeStamp': result.timeStamp,
        'nonceStr': result.nonceStr,
        'package': result.package,
        'signType': 'MD5',
        'paySign': result.paySign,
        'success': res => {
          this.getCourseDetail()
          // wx.navigateBack({
          //   delta: 1
          // })
        },
        'fail': res => {
          wx.showToast({
            title: '支付失败',
            icon:'none',
            duration: 2000
          })
        }
      })
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },

  // 切换
  menuTap: function (e) {
    var current = e.currentTarget.dataset.current;//获取到绑定的数据
    //改变menuTapCurrent的值为当前选中的menu所绑定的数据
    this.setData({
      menuTapCurrent: current
    });
  },
  // 播放
  bindplay:function(e){
    wx.showToast({
      title: '请先购买此课程',
      icon:'none',
      duration: 2000
    })
  },
  // 选集-视频播放
  getVideoSrc: function(e){
    console.log(e,'src')
    var that=this;
    var vSrc = e.currentTarget.dataset.src;
    var idx = e.currentTarget.dataset.index;
    var courseListData = this.data.courseListData
    courseListData.forEach(function(item,index){
      if(idx==index){
        item.status=2;
      }
    })
    this.setData({
      vStatus:idx,
      videoSrc: vSrc,
      courseListData: courseListData
    })
  }
})
