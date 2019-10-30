// pages/search/index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    currentData: 0,
    searchCont:true,//搜索内容是否显示，true默认不显示
    inputVal: '',
    status: 1,//1文章内容，2：课程 3：医师 4：教练
    technicalgrade: [],//文章分类-技术评定
    upgrade: [],//文章分类-升级必备
    health: [],//文章分类-健康头条
    courseListData: [],//课程
    doctorListData: [],//医师
    coachListData:[],//教练
    imgUrl: app.globalData.imgUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  inps(e){
    this.setData({
      inputVal: e.detail.value
    });
  },
  //当用户点击键盘搜索按钮之后执行搜索
  handleSearch(e) {
    this.setData({
      inputVal: e.detail.value
    });
    var inputVal = this.data.inputVal;
    var status = this.data.status;
    app.post(app.globalData.ServerURL + 'homepage/search', {
      'search': inputVal,
      'status': status,
    }).then((res) => {
      app.post(app.globalData.ServerURL + 'homepage/search', {
        'search': inputVal,
        'status': this.data.status,
      }).then((res) => {
        console.log(res, 'so文章');
        if (res.data.code == 0) {
          if (this.data.status == 2) {
            var courseData = res.data.data
            console.log(courseData)
            this.setData({
              courseListData: courseData
            })
          } else if (this.data.status == 3) {
            var doctorData = res.data.data
            this.setData({
              doctorListData: doctorData
            })
          } else if (this.data.status == 4) {
            var coachData = res.data.data
            this.setData({
              coachListData: coachData
            })
          }
          // console.log(this.data.courseListData, '课程')
          // console.log(this.data.coachListData, '教练')
          // console.log(this.data.doctorListData, '医师')
        }
      }).catch((errMsg) => {
        console.log(errMsg);
      });
      if (res.data.code == 0) {
        var health = res.data.data.info.health
        console.log(health)
        if (health != '') {
          health.forEach(function (item, index) {
            item.createtime = item.createtime.slice(0, 10);//发布的年月日
          })
        }
        var technicalgrade = res.data.data.info.technicalgrade
        if (technicalgrade != '') {
          technicalgrade.forEach(function (item, index) {
            item.createtime = item.createtime.slice(0, 10);//发布的年月日
          })
        }
        var upgrade = res.data.data.info.upgrade;
        if (upgrade!=''){
          upgrade.forEach(function (item, index) {
            item.createtime = item.createtime.slice(0, 10);//发布的年月日
          })
        }
        
        this.setData({
          searchCont: false,
          health: health,
          technicalgrade: technicalgrade,
          upgrade: upgrade,
        })
        
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },
  //点击搜索
  handleSearch1(e) {
    // this.setData({
    //   inputVal: this.data.inputVal
    // });
    var inputVal = this.data.inputVal;
    console.log(inputVal)
    var status = this.data.status;
    app.post(app.globalData.ServerURL + 'homepage/search', {
      'search': inputVal,
      'status': status,
    }).then((res) => {
      app.post(app.globalData.ServerURL + 'homepage/search', {
        'search': inputVal,
        'status': this.data.status,
      }).then((res) => {
        console.log(res, 'so文章');
        if (res.data.code == 0) {
          if (this.data.status == 2) {
            var courseData = res.data.data
            console.log(courseData)
            this.setData({
              courseListData: courseData
            })
          } else if (this.data.status == 3) {
            var doctorData = res.data.data
            this.setData({
              doctorListData: doctorData
            })
          } else if (this.data.status == 4) {
            var coachData = res.data.data
            this.setData({
              coachListData: coachData
            })
          }
          // console.log(this.data.courseListData, '课程')
          // console.log(this.data.coachListData, '教练')
          // console.log(this.data.doctorListData, '医师')
        }
      }).catch((errMsg) => {
        console.log(errMsg);
      });
      if (res.data.code == 0) {
        var health = res.data.data.info.health
        console.log(health)
        if (health != '') {
          health.forEach(function (item, index) {
            item.createtime = item.createtime.slice(0, 10);//发布的年月日
          })
        }
        var technicalgrade = res.data.data.info.technicalgrade
        if (technicalgrade != '') {
          technicalgrade.forEach(function (item, index) {
            item.createtime = item.createtime.slice(0, 10);//发布的年月日
          })
        }
        var upgrade = res.data.data.info.upgrade;
        if (upgrade != '') {
          upgrade.forEach(function (item, index) {
            item.createtime = item.createtime.slice(0, 10);//发布的年月日
          })
        }

        this.setData({
          searchCont: false,
          health: health,
          technicalgrade: technicalgrade,
          upgrade: upgrade,
        })

      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },
  //点击切换
  checkCurrent: function (e) {
    var current = e.currentTarget.dataset.current;
    var status = e.currentTarget.dataset.status;
    console.log(status)
    this.setData({
      currentData: current,
      status: status
    });
    var inputVal=this.data.inputVal;
    app.post(app.globalData.ServerURL + 'homepage/search', {
      'search': inputVal,
      'status': status,
    }).then((res) => {
      console.log(res, 'kc');
      if (res.data.code == 0) {
        if(status==2){
          var courseData=res.data.data
          this.setData({
            courseListData: courseData
          })
        }else if(status==3){
          var doctorData = res.data.data
          this.setData({
            doctorListData: doctorData
          })
        } else if (status == 4) {
          var coachData = res.data.data
          this.setData({
            coachListData: coachData
          })
        }
        // console.log(this.data.courseListData,'课程')
        // console.log(this.data.coachListData,'教练')
        // console.log(this.data.doctorListData,'医师')
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },
  // 文章详情
  articleDetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/health/healthDetail/index?id='+id
    })
  },
  articleDetail1(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/smiling/upgradeDetail/index?id=' + id
    })
  }, 
  articleDetail2(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/smiling/doctorDetail/index?id=' + id
    })
  },
  onlineCoursedetail(e){
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
  }, 
  doctor_ter(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/smiling/doctorDetail/index?id=' + id
    })
  }, 
  coach_ter(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/health/coachDetail/index?id=' + id
    })
  },
  cancel(e){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})