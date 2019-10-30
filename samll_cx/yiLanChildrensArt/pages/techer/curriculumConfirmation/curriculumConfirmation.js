import API from '../../../api.js';
const getPhone = wx.getStorageSync("phones");
var studentInfo=[];
Page({
  data: {
    showModalStatus: false,
    show1: false,
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: null,//下拉列表的数据
    selectData1: null,
    classBegins:[],
    index: 0,//选择的下拉列表下标
    index1: 0,
    catalogSelect: 0,//判断是否选中
    selecdBtn: 0,
    studentInfo:[],
    studentList:[],
  },
  // 跳转课程评价
  imgGoto: function (e) {
    wx.navigateTo({
      url: '../techerImg/techerImg?code=' + this.data.index + '&content=' + this.data.index1 + '&studentId=' + e.target.id + '&teacherIds=' + this.data.teacherIds,//课程编号和课程内容 学生id    少一个老师id
    })
  },
  sinpy: function (data) {
    console.log(data);
    var that = this;
    that.setData({//把选中值放入判断值
      select: data.currentTarget.id,
      catalogSelect: data.currentTarget.dataset.select
    })
  },
  //确认
  powerDrawer1: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu);
    var myDate = new Date();
    var that = this;
    var classBegins = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '哈哈',
      phone: getPhone,
      courseId: this.data.index,
      courseInfoId: this.data.index1
    }
    wx.request({
      url: API.classBegins,
      method: "get",
      data: API.getParams(classBegins),
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: function (res) {
        that.setData({
          classBegins: res.data.data
        })
        console.log(res);
      },
      fail: function () {
        console.log("fail");
      }
    })
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectData: options.cuelName,
      selectData1: options.contName,
      index: options.codeId,
      index1: options.contentId
    })
    var myDate = new Date();
    var that = this;
    var inquiryCourse = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '哈哈',
      phone: getPhone,
      courseId: options.code
    }
    wx.request({
      url: API.inquiryCourse,
      method: "get",
      data: API.getParams(inquiryCourse),
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: function (res) {
        that.setData({
          leaveList: res.data.data,
          studentList: res.data.data.studentList
        })
        console.log(res);
      },
      fail: function () {
        console.log("fail");
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  btns: function (e) {
    var ids = e.currentTarget.dataset.index;
    var ids1 = e.currentTarget.dataset.indexs;
    var studentList = this.data.studentList;
    var studentInfo1 = this.data.studentInfo;
    studentList[ids1].attendance.forEach((item) => {
      item.select = "0";
    })
    studentList[ids1].attendance[ids].select = "1"
    var btnsId = e.target.id;
    var parentids = e.currentTarget.dataset.parentids

    this.setData({
      selecdBtn: e.target.dataset.uniqueid,
      btnsIdis: e.target.id,
      studentList: studentList
    })
    if (studentInfo1 == 0) {
      var isTo = {
        "studentId ": parentids,//学生id
        "operateId ": btnsId,//学生状态
        "evaluateId": this.data.evaluateId,//作品评价上传
      }
      studentInfo.push(isTo);
      this.setData({
        studentInfo: studentInfo
      })
    } else {
      studentInfo1.forEach((item, index, arr) => {
        var operateId = "sDate[" + parentids + "].operateId";
        var studentId = "sDate[" + parentids + "].studentId";
        var evaluateId = "sDate[" + parentids + "].evaluateId";
        if (studentId != parentids) {
          var isTo = {
            "studentId ": parentids,//学生id
            "operateId ": btnsId,//学生状态
            "evaluateId": "1",//作品评价上传
          }
          studentInfo.push(isTo);
          this.setData({
            studentInfo: studentInfo
          })
          console.log(studentInfo);
        } else {

        }
      })
    }
  },
  // 提交
  successBtns: function () {
    var myDate = new Date();
    var that = this;
    var evaluateSuess = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '1',
      phone: getPhone,
      teacherId: this.data.teacherIds,//老师id
      courseId: this.data.index + 1,//课程id
      courseNo: this.data.index1+1,//课程编号
      studentInfo: this.data.studentInfo
    }
    wx.request({
      url: API.evaluateSuess,
      method: "get",
      data: API.getParams(evaluateSuess),
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: function (res) {
        console.log(res);

      },
      fail: function () {
        console.log("fail");
      }
    })
  }
})