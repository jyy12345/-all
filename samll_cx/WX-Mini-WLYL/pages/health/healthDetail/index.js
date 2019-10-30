// pages/health/healthDetail/index.js
const utils = require('../../../utils/util.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    id: '',
    articleDetailData: [],
    courseListData: [],
    imgUrl: app.globalData.imgUrl
  },
  onLoad: function (options) {
    console.log(options)
    this.data.id = options.id;//文章id
    // 文章详情
    this.getArticleDetail();
  },
  onShow: function () {

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
  getArticleDetail() {
    var id = this.data.id;
    console.log(id, '传')
    app.post(app.globalData.ServerURL + 'health/healthdetail', {
      'id': id
    }).then((res) => {
      console.log(res, '文章详情');
      if (res.data.code == 0) {
        if (res.data.data.health!='') {
          var articleDetailData = res.data.data.health;
          articleDetailData.createtime = articleDetailData.createtime.slice(0, 10);//发布的年月日
        }

        var courseListData = res.data.data.course;

        this.setData({
          articleDetailData: articleDetailData,
          courseListData: courseListData
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },


  // 更多课程
  course(e) {
    wx.navigateTo({
      url: '/pages/cart/index',
    })
  },
  // 课程详情
  courseDetail(e) {
    var id = e.currentTarget.dataset.id;
    var coursetype = e.currentTarget.dataset.coursetype;
    if (coursetype == 1) {
      wx.navigateTo({
        url: '/pages/cart/onlineCourse/index?id=' + id,
      })
    } else if (coursetype == 2) {
      wx.navigateTo({
        url: '/pages/cart/offlineCourse/index?id=' + id,
      })
    } else if (coursetype == 3) {
      wx.navigateTo({
        url: '/pages/cart/loveMesDetail/index?id=' + id,
      })
    } else if (coursetype == 4) {
      wx.navigateTo({
        url: '/pages/cart/goodsDetail/index?id=' + id,
      })

    }
  }
})