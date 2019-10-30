// pages/health/index.js
var app=getApp();
Page({
  data: {
    currentData : 0,
    winHeight:'',
    swiperHeight:0,
    healthLists:[],//专业指导
    labelNav:[],//标签导航
    healthList:[],
    imgUrl: app.globalData.imgUrl
  },

  onLoad: function (options) {
    console.log(options)
    if (options.currentData){
      var currentData = options.currentData;
      var healthId = options.healthId;
      this.setData({
        currentData: currentData
      })
      this.getArticleList(healthId)
    }else{
      this.getCoachList()
    }
    var that=this;
    //标签导航
    app.post(app.globalData.ServerURL + "health/classify",{}).then((res) => {
      console.log(res);
      if (res.data.code == 0) {
          that.setData({
            labelNav:res.data.data
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
  onShow: function () {
    
  },
  
  //专业指导
  checkCurrent:function(e){
    var current = e.currentTarget.dataset.current;
    this.setData({
      currentData: current
    });
    this.getCoachList()
  },
  // 文章
  checkCurrent1: function (e) {
    console.log(e);
    var current = e.currentTarget.dataset.current;
    var healthId = e.currentTarget.dataset.navid;
    this.setData({
      currentData: current
    });
    this.getArticleList(healthId)
  },
  getCoachList(e){
    //专业指导列表
    app.post(app.globalData.ServerURL + "health/coach", {
      "page": '1'
    }).then((res) => {
      console.log(res);
      if (res.data.code == 0) {
        this.setData({
          healthLists: res.data.data
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    })
  },
  getArticleList(healthId){
    //文章列表
    app.post(app.globalData.ServerURL + "health/index", {
      "classid": healthId,
      "page": '1'
    }).then((res) => {
      console.log(res);
      if (res.data.code == 0) {
        res.data.data.forEach(function (item, index) {
          item.createtime = item.createtime.slice(0, 10);//发布的年月日
        })
        this.setData({
          healthList: res.data.data
        })
      }

    }).catch((errMsg) => {
      console.log(errMsg);
    })
  },
  // 跳转到教练详情
  checkDocDetail(e) {
    wx.navigateTo({
      url: '/pages/health/coachDetail/index?healthsId=' + e.currentTarget.dataset.ids
    });
  },
  // 跳转到文章详情
  articleDetail(e) {
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/health/healthDetail/index?id='+id
    });
  }
})