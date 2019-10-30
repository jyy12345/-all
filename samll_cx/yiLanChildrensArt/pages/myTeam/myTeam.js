import API from '../../api.js';
Page({
  data: {
    tabbar: {},
    swiperCurrent: 0,
    interval: 3000,
    duration: 800,
    circular: true,
    contentData:[],
    links: [
      '../user/user',
      '../user/user',
      '../user/user'
]
  },

  //轮播图的切换事件
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
    console.log(e.detail.current);
  },
  // 左点击
  swiperClickleft:function(e){
    if (this.data.swiperCurrent=='0'){
      return;
    }
    this.setData({
      swiperCurrent: this.data.swiperCurrent-1
    })
  },
  // 右点击
  swiperClickright: function (e) {
    if (this.data.swiperCurrent >= this.data.contentData.length-1){
      return;
    }
    this.setData({
      swiperCurrent: this.data.swiperCurrent+1
    })
  },
  //点击指示点切换

  chuangEvent: function (e) {

    this.setData({

      swiperCurrent: e.currentTarget.id

    })

  },

  //点击图片触发事件

  swipclick: function (e) {

    console.log(this.data.swiperCurrent);

    wx.switchTab({
      url: this.data.links[this.data.swiperCurrent]
    })

  },
  // 试听
  onScrt: function (event) {
    wx.navigateTo({
      url: '../auditions/auditions',
    })
  },
  onLoad:function(){
    var myDate = new Date();
    getApp().editTabBar(); 
    var that = this;
    var teacherTeam = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: 111
    }
    wx.request({
      url: API.teacherTeam,
      method: "get",
      data: API.getParams(teacherTeam),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        that.setData({
          contentData: res.data.data.teacherTeam.teacherTeamDetailList
        })
        console.log(res.data.data.teacherTeam.teacherTeamDetailList);
      },
      fail: function () {
        console.log("fail");
      }
    })
  }
})

