// pages/smiling/skill/index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    currentData : 0,
    menuTapCurrent: 0,
    winHeight:wx.getSystemInfoSync().windowHeight,
    classifyId:'1',
    page:1,
    tabBarData:[],
    skillListData:[],
    imgUrl: app.globalData.imgUrl
  },
  onLoad: function (options) {
    console.log(options,'带过来的数据')
    this.data.classifyId = options.classifyId;
    console.log(this.data.classifyId,'类型id')
    if (options.currentData) {
      var menuTapCurrent = options.currentData;
      this.setData({
        menuTapCurrent: menuTapCurrent
      })
    }
    // 技术评定列表
    this.getSkillList()
  },
  // 技术评定列表
  getSkillList(type){
    if (type == "page") {
      this.data.page++
    }
    var classid=this.data.classifyId;
    console.log(classid,'传')
    var page=this.data.page;
    app.post(app.globalData.ServerURL + 'technicalgrade/index', {
      'classid': classid,
      'page':page
    }).then((res) => {
      console.log(res, '技术评定列表');
      if (res.data.code == 0) {
        var tabBarData = res.data.data.classify;
        var skillListData = res.data.data.technicalgrade;
        skillListData.forEach(function(item,index){
          item.createtime = item.createtime.slice(0, 10);//发布的年月日
        })
        this.setData({
          tabBarData: tabBarData,
          skillListData: skillListData,
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
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

  // 到底加载
  onReachBottom() {
    // 判断tag是否有数据，是否需要开启到底加载
    this.setData({
      loadingShow: true
    })
    this.getSkillList('page')

  },


  // 二级切换
  menuTap: function (e) {
    console.log(e)
    var current = e.currentTarget.dataset.currents;//获取到绑定的数据
    this.data.classifyId = e.currentTarget.dataset.id;//获取到绑定的数据
    //改变menuTapCurrent的值为当前选中的menu所绑定的数据
    this.setData({
      menuTapCurrent: current
    });
    this.getSkillList()
  },
  // 跳转到文章详情
  articleDetail(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: '/pages/smiling/skillDetail/index?id='+ id +'&title='+ title
    });
  },
  // 医师风采
  doctor(e) {
    console.log(e.target.dataset.current)
    var current = e.target.dataset.current
    wx.reLaunch({
      url: '/pages/smiling/index'
    })
  },
  // 技术评定
  skill(e) {
    console.log(e.target.dataset.current)
    var current = e.target.dataset.current
    wx.reLaunch({
      url: '/pages/smiling/index?currentData=' + current
    })
  },
  // 升级必备
  upGrade(e) {
    var current = e.target.dataset.current
    wx.reLaunch({
      url: '/pages/smiling/index?currentData=' + current
    })
  }
})