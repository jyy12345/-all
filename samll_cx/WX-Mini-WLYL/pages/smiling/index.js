// pages/smiling/index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    currentData : 0,
    menuTapCurrent: 0,

    docpage:1,
    doctorData:[],

    skillData:[],

    tabBarData: [],
    upgradeData:[],
    classifyId: '',
    uppage: 1,
    imgUrl: app.globalData.imgUrl
  },
  onLoad: function (options) {
    if (options.currentData){
      var currentData = options.currentData;
      this.setData({
        currentData: currentData
      })
    }
    // 医师风采
    this.getDoctorList()
    // 技术评定
    this.getSkillList()
    // 升级必备
    this.getUpGradeList()
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
  // 医师风采
  getDoctorList(){
    var page = this.data.docpage;
    app.post(app.globalData.ServerURL + 'doctorstyle/index', {
      'page':page
    }).then((res) => {
      console.log(res, '医师风采');
      if (res.data.code == 0) {
        var doctorData = res.data.data;
        this.setData({
          doctorData: doctorData,
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },

  // 技术评定
  getSkillList(){
    app.post(app.globalData.ServerURL + 'technicalgrade/classify', {}).then((res) => {
      console.log(res, '技术评定');
      if (res.data.code == 0) {
        var skillData = res.data.data;
        this.setData({
          skillData: skillData,
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },
  
  // 升级必备列表
  getUpGradeList(type) {
    if (type == "page") {
      this.data.uppage++
    }
    var classid = this.data.classifyId;
    // console.log(classid, '传')
    var page = this.data.uppage;
    app.post(app.globalData.ServerURL + 'technicalgrade/upgrade', {
      'classid': classid,
      'page': page
    }).then((res) => {
      console.log(res, '升级必备列表');
      if (res.data.code == 0) {
        var tabBarData = res.data.data.classify;
        var upgradeData = res.data.data.ugrade;
        upgradeData.forEach(function (item, index) {
          item.createtime = item.createtime.slice(0, 10);//发布的年月日
        })
        this.setData({
          tabBarData: tabBarData,
          upgradeData: upgradeData,
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },

  // 到底加载
  onReachBottom() {
    // 判断tag是否有数据，是否需要开启到底加载
    this.setData({
      loadingShow: true
    })
    // 医师风采
    this.getDoctorList('page')
    // 升级必备
    this.getUpGradeList('page')


  },

  // 一级切换
  checkCurrent: function (e) {
    // console.log(e)
    var current = e.currentTarget.dataset.current;
    this.setData({
      currentData: current
    });
  },
  // 跳转到技术评定具体页
  handelSkill(e) {
    console.log(e)
    var current = e.currentTarget.dataset.current
    var classifyId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/smiling/skill/index?currentData=' + current + '&classifyId=' + classifyId
    })
  },
  // 跳转到医师详情
  doctorDetail(e) {
    var title = e.currentTarget.dataset.title;
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/smiling/doctorDetail/index?title=医师风采&id='+id
    });
  },
  // 跳转到文章详情
  articleDetail(e) {
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: '/pages/smiling/upgradeDetail/index?id=' + id + '&title=' + title
    });
  },
  // 二级切换
  menuTap: function (e) {
    // console.log(e)
    var current = e.currentTarget.dataset.currents;//获取到绑定的数据
    this.data.classifyId = e.currentTarget.dataset.id;//获取到绑定的数据
    //改变menuTapCurrent的值为当前选中的menu所绑定的数据
    this.setData({
      menuTapCurrent: current
    });
    // 升级必备
    this.getUpGradeList()

  },
})