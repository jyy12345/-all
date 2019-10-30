// pages/cart/loveMesDetail/index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    "menuTapCurrent": 0,
    videoSrc: '',
    vStatus: 0,
    id: '',
    courseDetailData: [],
    courseLabelData: [],
    courseListData: [],
    imgUrl: app.globalData.imgUrl,
    audioAction: {
      method: 'pause'
    }
  },
  gotoN: function () {
    wx.navigateTo({
      url: '../../cart/index',
    })
  },
  onLoad: function (options) {
    console.log(options)
    this.data.id = options.id;
    // 课程详情
    this.getCourseDetail()



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
  // 课程详情
  getCourseDetail() {
    var id = this.data.id;
    console.log(id, '传')
    app.post(app.globalData.ServerURL + 'mycourse/onlinedetail', {
      'courseid': id
    }).then((res) => {
      console.log(res, '课程详情');
      if (res.data.code == 0) {
        var courseDetailData = res.data.data.course;
        var courseLabelData = res.data.data.courselabel;
        var courseListData, videoSrc
        if (res.data.data.chapter != '') {
          courseListData = res.data.data.chapter;
          videoSrc = this.data.imgUrl + res.data.data.chapter[0].mediaSource;
        }

        console.log(videoSrc)
        this.setData({
          courseDetailData: courseDetailData,
          courseLabelData: courseLabelData,
          courseListData: courseListData,
          videoSrc: videoSrc,
        })
        console.log(this.data.courseDetailData, '数据')
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },

  // 订单
  orderDetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/cart/orderDetail/index?id=' + id,
    })
  },

  // 切换
  menuTap: function (e) {
    var current = e.currentTarget.dataset.current;//获取到绑定的数据
    //改变menuTapCurrent的值为当前选中的menu所绑定的数据
    this.setData({
      menuTapCurrent: current
    });
  },
  // 视频播放
  getVideoSrc: function (e) {
    console.log(e, 'src')
    var that = this;
    var vSrc = e.currentTarget.dataset.src;
    var idx = e.currentTarget.dataset.index;
    var courseListData = this.data.courseListData
    courseListData.forEach(function (item, index) {
      if (idx == index) {
        item.status = 2;
      }
    })
    this.setData({
      vStatus: idx,
      videoSrc: vSrc,
      courseListData: courseListData
    })
  }
})
