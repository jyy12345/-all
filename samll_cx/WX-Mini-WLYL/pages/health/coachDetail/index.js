// pages/health/coachDetail/index.js
var app=getApp();
Page({
  data: {
    healthListsDetail:null,
    imgUrl: app.globalData.imgUrl,
    professionalNum:null,//专业水平
    professional_2: null,
    ptNum:null,//康复
    pt_2: null,
    loveNum: null,//爱心公益
    love_2: null,
    tmtNum: null,///tmt医学
    tmt_2:null,
    coachId:'',
  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
    app.post(app.globalData.ServerURL + "health/coachdetail",{
      'id': options.healthsId
    }).then((res) => {
      console.log(res);
      if (res.data.code == 0) {
        that.setData({
          healthListsDetail: res.data.data,
          professionalNum: res.data.data.coach.professional,//专业水平
          professional_2: 5 - res.data.data.coach.professional,
          ptNum: res.data.data.coach.pt,//康复
          pt_2: 5 - res.data.data.coach.pt,
          loveNum: res.data.data.coach.love,//爱心公益
          love_2: 5 - res.data.data.coach.love,
          tmtNum: res.data.data.coach.tmt,///tmt医学
          tmt_2: 5 - res.data.data.coach.tmt,
          coachId: res.data.data.coach.id
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);
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
  // 评级
  checkGrade(e) {
    wx.navigateTo({
      url: '/pages/mine/gradeIntro/index',
    })
  },
  // 立即预约
  checkYuyue(e) {
    wx.navigateTo({
      url: '/pages/health/yuyueCoach/index?coachId=' + this.data.coachId,
    })
  }
})