//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inputVal: "",
    selected:true,
    banner:[],
    specialistData: [],//权威专家
    upgradeData: [],//升级必备
    loveMesData: [],//爱心科普
    guideData: [],//专业指导
    courseData: [],//必学课程
    healthMesData: [],//健康头条
    beautyData:[],//美容养生
    healthId:'',//健康秘诀第一个id
    imgUrl: app.globalData.imgUrl
  },
  onLoad: function () {
    // 所有数据
    this.getIndexList()
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
  // 所有数据
  getIndexList() {
    app.post(app.globalData.ServerURL + 'homepage/index', {}).then((res) => {
      console.log(res, '首页');
      if (res.data.code == 0) {
        var banner = res.data.data.lunbo;
        var specialistData = res.data.data.doctorstyle;
        var upgradeData = res.data.data.upgrade;
        var loveMesData = res.data.data.lovecourse;
        var guideData = res.data.data.coach;
        var courseData = res.data.data.course;
        var healthMesData = res.data.data.health;
        var beautyData = res.data.data.product;
        // 时间截取
        loveMesData.forEach(function(item,index){
          item.createtime = item.createtime.slice(0, 10);//发布的年月日
        })
        courseData.forEach(function (item, index) {
          item.createtime = item.createtime.slice(0, 10);//发布的年月日
        })
        healthMesData.forEach(function (item, index) {
          item.createtime = item.createtime.slice(0, 10);//发布的年月日
        })
        this.setData({
          banner: banner,
          specialistData: specialistData,
          upgradeData: upgradeData,
          loveMesData: loveMesData,
          guideData: guideData,
          courseData: courseData,
          healthMesData: healthMesData,
          beautyData: beautyData,
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },

  // 跳转到注册
  handelRegister(e) {
    var openid=
    wx.navigateTo({
      url: '/pages/mine/register/register'
    });
  },
  // 跳转到健康商城
  checkCart(e) {
    wx.navigateTo({
      url: '/pages/cart/index'
    });
  },
  // 搜索页
  handelSearch(e) {
    wx.navigateTo({
      url: '/pages/search/index',
    })
  },
  // 技术评定
  technology(e) {
    // console.log(e)
    var current = e.currentTarget.dataset.current
    wx.reLaunch({
      url: '/pages/smiling/index?currentData=' + current
    })
  },
  // 医师风采
  doctor(e) {
    // console.log(e,'医生')
    var current = e.currentTarget.dataset.current
    wx.reLaunch({
      url: '/pages/smiling/index'
    })
  },
  // 健康资讯
  articles(e) {
    // console.log(e)
    //标签导航
    app.post(app.globalData.ServerURL + "health/classify", {}).then((res) => {
      console.log(res);
      if (res.data.code == 0) {
        var healthId = res.data.data[0].id
        this.data.healthId = healthId;
        console.log(this.data.healthId)
        wx.reLaunch({
          url: '/pages/health/index?currentData=1&healthId=' + this.data.healthId,
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    })
  },
  // 权威专家
  checkExpert(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/smiling/doctorDetail/index?id=' + id,
    })
  },
  // 升级必备
  checkArticle(e) {
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: '/pages/smiling/upgradeDetail/index?id='+id+'&title='+title,
    })
  },
  // 升级必备更多
  upGrade(e) {
    var current = e.currentTarget.dataset.current
    wx.reLaunch({
      url: '/pages/smiling/index?currentData=' + current,
    })
  },
  // 我要升级pages/smiling/skill/index
  checkSkill(e) {
    wx.reLaunch({
      url: '/pages/smiling/index?currentData=1',
    })
  },
  //爱心科普 更多
  loveMes(e) {
    var current = e.currentTarget.dataset.current
    var type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/cart/index?currentData=' + current + '&type=' + type,
    })
  },
  // 爱心科普 
  onlineDetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/cart/loveMesDetail/index?id='+id,
    })
  },
  
  // 专业指导更多
  guide(e) {
    wx.reLaunch({
      url: '/pages/health/index'
    })
  },
  // 专业指导 老师详情
  coachDetail(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/health/coachDetail/index?healthsId=' + id,
    })
  },
  // 必学课程 更多
  course(e) {
    wx.navigateTo({
      url: '/pages/cart/index',
    })
  },
  // 课程详情
  courseDetail(e) {
    // console.log(e)
    var type = e.currentTarget.dataset.type;
    var id = e.currentTarget.dataset.id;
    if(type==1){//在线
      wx.navigateTo({
        url: '/pages/cart/onlineCourse/index?id='+id,
      })
    }else{
      wx.navigateTo({
        url: '/pages/cart/offlineCourse/index?id='+id
      })
    }
  },
  // 健康头条 更多
  healthMes(e) {
    //标签导航
    app.post(app.globalData.ServerURL + "health/classify", {}).then((res) => {
      console.log(res);
      if (res.data.code == 0) {
        var healthId = res.data.data[0].id
        this.data.healthId = healthId;
        console.log(this.data.healthId)
        wx.reLaunch({
          url: '/pages/health/index?currentData=1&healthId=' + this.data.healthId,
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    })
    
  },
  // 健康头条 详情articleDetail
  articleDetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/health/healthDetail/index?id=' + id
    });
  },
  // 美容养生pages/cart/index
  beauty(e) {
    wx.navigateTo({
      url: '/pages/cart/index?currentData=2'
    })
  },
  // 美容养生详情pages/cart/goodsDetail/index
  goodsDetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/cart/goodsDetail/index?id='+id
    })
  },
})
