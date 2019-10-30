import API from '../../../api.js';
const getPhone = wx.getStorageSync("phones");
Page({
  data: {
    tabbar: {},
    years: [],
    months: [],
    days: [],
    bukData:[],
    babytData:[],
    bukTime:'',
    voteTitle:null,
    votePhone:null,
    voteDay:null,
    value: [9999, 1, 1],
    hiddenName: false,
    dateobj: {
      yes: "2017",
      yue: "10",
      rie: "03"
    },
    leaveTime:null,//请假时间
    imgGO:true,
    bukeDatas:[],
    btnSuccess:false,
    btns:true,
    showModalStatus: false,
    showModalStatus1: false,
    showModalStatus2: false,
    textareas:null,
    adjustment:[],
    tiaozBtn:true,
    tiaozSuccess:false,
    showData:0,
imgSelects:'https://yiyanmeishu-oss001.oss-cn-beijing.aliyuncs.com/img/user/student/supplement_course_non.png',
    imgUrls:'https://yiyanmeishu-oss001.oss-cn-beijing.aliyuncs.com/img/user/student/supplement_course_non.png'
  },
  onLoad: function (options) {
    getApp().editTabBar();
    var myDate = new Date();
    var that = this;
    var makeup = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '哈哈',
      phone: getPhone,
    }
    wx.request({
      url: API.makeup,
      method: "get",
      data: API.getParams(makeup),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        
        that.setData({
          babytData: res.data.data,
          
        })
        console.log(res);
      },
      fail: function () {
        console.log("fail");
      }
    })
  },
  // handleSelecteDate(e) {
  //   wx.showToast({ title: `${e.detail.date}`, icon: false })
  // },
  buKtime:function(){
    var myDate = new Date();
    var that=this;
    var leaveData = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '哈哈',
      phone: getPhone,
    }
    wx.request({
      url: API.leaveData,
      method: "get",
      data: API.getParams(leaveData),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        that.setData({
          bukTime: res.data.data
        })
        console.log(res);
      },
      fail: function () {
        console.log("fail");
      }
    })
  },
  // 日期显示隐藏
  clickMe: function (e) {
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },
  heigged: function () {
    this.setData(
      {
        showModalStatus: false
      }
    );
  },
 
  // 取消
  quits:function(){
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },
  // 确定
  yesY:function(){
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },
  bindChange: function (e) {
    console.log(e);
    let val = e.detail.value
    var that = this;
    that.setData({
      dataobj: {
        yes: that.data.years[val[0]],
        yue: that.data.months[val[1]],
        rie: that.data.years[val[2]]
      }
    })
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu);
  },
  // 宝贝姓名获取
  voteTitle:function(e){
    console.log(e);
    this.data.voteTitle = e.detail.value;
  },
  // 宝贝联系方式获取
  votePhone:function(e){
    this.data.votePhone=e.detail.value;
  },
  //日期提交
  voteDay:function(e){
    this.data.voteDay=e.detail.value;
  },
  onselectdate:function(e){
    console.log(e.detail.val);
    this.setData({
      leaveTime: e.detail.val
    })
  },
  // 请假提交
  powersemit: function (e) {
    var myDate = new Date();
    var that = this;
    // var currentStatu = e.currentTarget.dataset.statu;
    // this.util(currentStatu);
    var leave = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '哈哈',
      phone: getPhone,
      // studentName: this.data.voteTitle,
      // studentNo: this.data.votePhone,
      leaveDate: this.data.leaveTime
    }
    wx.request({
      url: API.leave,
      method: "get",
      data: API.getParams(leave),
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: function (res) {
        console.log(res);
        
        if(res.data.code==0){
        that.setData({
          btnSuccess: true,
          btns: false
        }) 
        }else{
          wx.showToast({
            title: "提交失败",
            icon: 'loading',
            duration: 2000
          })
        }
      },
      fail: function () {
        console.log("fail");
      }
    })
  },

  /**
* 隐藏模态对话框
*/
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
  * 对话框取消按钮点击事件
  */
  onCancel: function () {
    this.hideModal();
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },

// 补课
  makeUp:function(e){
    var currentStatu1 = e.currentTarget.dataset.statu;
    this.util1(currentStatu1);
  },
  makeUp1: function (e) {
    var currentStatu1 = e.currentTarget.dataset.statu;
    this.util1(currentStatu1);
    var myDate = new Date();
    var that = this;
    var makeupsuccess = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '哈哈',
      phone: getPhone,
      supplementDateList: that.data.bukeDatas
    }
    wx.request({
      url: API.makeupsuccess,
      method: "get",
      data: API.getParams(makeupsuccess),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        console.log(res);
        if(res.data.code==0){
          wx.showModal({
            title: res.data.data.noteList[0].key,
            content: res.data.data.noteList[0].note,
            success: function (res) {
              if (res.confirm) {
                // console.log('弹框后点取消')
              } else {
                // console.log('弹框后点取消')
              }
            }
          })
        }else{
          wx.showToast({
            title: '提交失败',
            icon: 'none',
            duration: 2000
          })

        }
      },
      fail: function () {
        console.log("fail");
      }
    })
  },
  imgBtn:function(e){
    var that=this;
    // console.log(e.target.id);
    var oIndex = e.currentTarget.dataset.index;
    console.log(oIndex)
    var array = that.data.bukeDatas;
    array.forEach((item, index, arr) => {
      var sItem = "bukeDatas[" + oIndex + "].isSelect";
      var oSelected = "bukeDatas[" + oIndex + "].imgUrl"//这里需要将设置的属性用字符串进行拼接

      if (that.data.bukeDatas[oIndex].imgUrl == "https://yiyanmeishu-oss001.oss-cn-beijing.aliyuncs.com/img/user/student/supplement_course_non.png") {
        that.setData({
          [oSelected]: 
            "https://yiyanmeishu-oss001.oss-cn-beijing.aliyuncs.com/img/user/student/supplement_course_secl.png",
          [sItem]:"1"
        })
        // return
      }else if(that.data.bukeDatas[oIndex].imgUrl == "https://yiyanmeishu-oss001.oss-cn-beijing.aliyuncs.com/img/user/student/supplement_course_secl.png") {
        that.setData({
          [oSelected]: "https://yiyanmeishu-oss001.oss-cn-beijing.aliyuncs.com/img/user/student/supplement_course_non.png",
          [sItem]: "0"
        })
      }
    })
    console.log(that.data.bukeDatas);
  },
  bukIndex:function(){
    var myDate = new Date();
    var that = this;
    var lessonsup = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '哈哈',
      phone: getPhone
    }
    wx.request({
      url: API.lessonsup,
      method: "get",
      data: API.getParams(lessonsup),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        that.setData({
          bukData:res.data.data,
          bukeDatas: res.data.data.supplementDateList
        })
        console.log(res);
      },
      fail: function () {
        console.log("fail");
      }
    })
  },
 hideModal1: function () {
    this.setData({
      showModal: false
    });
  },
  /**
  * 对话框取消按钮点击事件
  */
  onCancel1: function () {
    this.hideModal1();
  },
  util1: function (currentStatu1) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu1 == "close") {
        this.setData(
          {
            showModalStatus1: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu1 == "open") {
      this.setData(
        {
          showModalStatus1: true
        }
      );
    }
  },
  heigged1: function () {
    this.setData(
      {
        showModalStatus1: false,
        btnSuccess: false,
        btns: true
      }
    );
  },
    // 班级调整
  adjustment:function(){
    var myDate = new Date();
    var that = this;
    var classadjustment = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '哈哈',
      phone: getPhone
    }
    wx.request({
      url: API.classadjustment,
      method: "get",
        data: API.getParams(classadjustment),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        that.setData({
          adjustment: res.data.data
        })
        console.log(res);
      },
      fail: function () {
        console.log("fail");
      }
    })
  },
  textareas:function(e){
    this.data.textareas=e.detail.value;
  },
  classAdjustment1:function(e){
var currentStatu2 =e.currentTarget.dataset.statu;
      this.util2(currentStatu2);
  },
    classAdjustment: function (e) {
      // var currentStatu2 =e.currentTarget.dataset.statu;
      // this.util2(currentStatu2);
      var myDate = new Date();
      var that = this;
      var classsubit = {
        appId: '100001',
        token: 'de67f0c0-edea-441f-806a-759673f1e870',
        requestId: myDate.getTime(),
        businessId: '哈哈',
        phone: getPhone,
        desc: this.data.textareas
      }
      wx.request({
        url: API.classsubit,
        method: "get",
        data: API.getParams(classsubit),
        header: {
          'content-type': 'application/json;charset=utf-8'
          // "Content-Type": "application/ x - www - form - urlencoded"
        },
        success: function (res) {
         
          console.log(res);
          if(res.data.code==0){
            that.setData({
              tiaozBtn: false,
              tiaozSuccess: true,
            })
          }
        },
        fail: function () {
          console.log("fail");
        }
      })
    },
    hideModal2: function () {
      this.setData({
        showModal: false
      });
    },
    /**
    * 对话框取消按钮点击事件
    */
    onCancel2: function () {
      this.hideModal2();
    },
    util2: function (currentStatu2) {
      /* 动画部分 */
      // 第1步：创建动画实例   
      var animation = wx.createAnimation({
        duration: 200,  //动画时长  
        timingFunction: "linear", //线性  
        delay: 0  //0则不延迟  
      });

      // 第2步：这个动画实例赋给当前的动画实例  
      this.animation = animation;

      // 第3步：执行第一组动画  
      animation.opacity(0).rotateX(-100).step();

      // 第4步：导出动画对象赋给数据对象储存  
      this.setData({
        animationData: animation.export()
      })

      // 第5步：设置定时器到指定时候后，执行第二组动画  
      setTimeout(function () {
        // 执行第二组动画  
        animation.opacity(1).rotateX(0).step();
        // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
        this.setData({
          animationData: animation
        })

        //关闭  
        if (currentStatu2 == "close") {
          this.setData(
            {
              showModalStatus2: false
            }
          );
        }
      }.bind(this), 200)

      // 显示  
      if (currentStatu2 == "open") {
        this.setData(
          {
            showModalStatus2: true
          }
        );
      }
    },
  heigged2: function () {
    this.setData(
      {
        showModalStatus2: false,
        tiaozBtn: true,
        tiaozSuccess: false
      }
    );
  },
})  
