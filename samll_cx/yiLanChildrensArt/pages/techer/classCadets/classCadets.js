import API from '../../../api.js';
const getPhone = wx.getStorageSync("phones");
var studentInfo = [];
Page({
  data: {
    btnsIdis:null,
    leaveList:[],
    show1: false,
    studentList:[],
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [],//下拉列表的数据
    selectData1: [],
    index: 0,//选择的下拉列表下标
    index1:0,
    catalogSelect: 0,//判断是否选中
    cuelName:'3-4A',
    selecdBtn:0,
    teacherIds:null,//老师id
    studentInfo:[],
    evaluateId:null,
    courseId:1,//课程编号id
  },
  sinpy: function (data) {
    console.log(data);
    var that = this;
    that.setData({//把选中值放入判断值
      select: data.currentTarget.id,
      catalogSelect: data.currentTarget.dataset.select
    })
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  }, 
  imgGoto:function(e){
    console.log(e);
    if (e.currentTarget.dataset.isluate=='1'){
      console.log("none");
    }else{
      wx.navigateTo({
        url: '../techerImg/techerImg?code=' + this.data.index + '&content=' + this.data.index1 + '&studentId=' + e.target.id + '&teacherIds=' + this.data.teacherIds,//课程编号和课程内容 学生id    少一个老师id
      })
    }
    
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show,
      cuelName: e.currentTarget.dataset.name1
    });
    this.setData({
      courseId: Index + 1
    })
    var myDate = new Date();
    var that = this;
    var courseContent = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '哈哈',
      phone: getPhone,
      courseId: Index+1
    }
    wx.request({
      url: API.courseContent,
      method: "get",
      data: API.getParams(courseContent),
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: function (res) {
        const codeName = [];
        console.log(res);
        for (var i = 0; i < res.data.data.courseList.length; i++) {
          codeName.push(res.data.data.courseList[i].desc);
        }
        that.setData({
          kecName: res.data.data,
          selectData1: codeName
        })
      },
      fail: function () {
        console.log("fail");
      }
    })
  },
  selectTap1() {
    this.setData({
      show1: !this.data.show1
    });
  },
  optionTap1(e) {
    let Indexs = e.currentTarget.dataset.index1, contName = e.currentTarget.dataset.name;//获取点击的下拉列表的下标
    console.log(e)
    this.setData({
      index1: Indexs,
      show1: !this.data.show1
    });
    wx.navigateTo({
      url: '../curriculumConfirmation/curriculumConfirmation?codeId=' + this.data.index + '&contentId=' + Indexs + '&cuelName=' + this.data.cuelName + '&contName=' + contName + '&teacherIds=' + this.data.teacherIds,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myDate = new Date();
    var that = this;
    that.setData({
      teacherIds: options.teacherIds,
      evaluateId: options.evaluateId
    })
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
        const code = [];
        const codeName=[];
        console.log(res);
        
        for (var i = 0; i < res.data.data.courseNo.length; i++) {
          code.push(res.data.data.courseNo[i].info);
        }
        that.setData({
          leaveList:res.data.data,
          selectData: code,
          studentList: res.data.data.studentList
        })
      },
      fail: function () {
        console.log("fail");
      }
    })
    var courseContent = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '哈哈',
      phone: getPhone,
      courseId: 1
    }
    wx.request({
      url: API.courseContent,
      method: "get",
      data: API.getParams(courseContent),
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: function (res) {
        const codeName = [];
        console.log(res.data.data);
        for (var i = 0; i < res.data.data.courseList.length; i++) {
          codeName.push(res.data.data.courseList[i].desc);
        }
        that.setData({
          kecName: res.data.data,
          selectData1: codeName,
         
        })
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

 

  

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

 
  btns:function (e) {
    var ids=e.currentTarget.dataset.index;
    var ids1 = e.currentTarget.dataset.indexs;
    var studentList = this.data.studentList;
    var studentInfo1 = this.data.studentInfo;
    studentList[ids1].attendance.forEach((item) => {
      item.select = "0";
      })
    studentList[ids1].attendance[ids].select = "1"
    var btnsId=e.target.id;
    var parentids = e.currentTarget.dataset.parentids
    
     this.setData({
       selecdBtn: e.target.dataset.uniqueid,
       btnsIdis: e.target.id,
       studentList: studentList
     })
    if (studentInfo1==0){
     var isTo = {
       "studentId ": parentids,//学生id
       "operateId ": btnsId,//学生状态
       "evaluateId": this.data.evaluateId,//作品评价上传
     }
        studentInfo.push(isTo);
        this.setData({
          studentInfo: studentInfo
        })
   }else{
      studentInfo1.forEach((item, index, arr) => {
        var operateId= "sDate[" + parentids + "].operateId";
        var studentId= "sDate[" + parentids + "].studentId";
        var evaluateId = "sDate[" + parentids +"].evaluateId";
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
        }else{
          
        }
      })
   } 
  },
  // 提交
  successBtns:function(){
    var myDate = new Date();
    var that = this;
    var evaluateSuess={
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '1',
      phone: getPhone,
      teacherId: this.data.teacherIds,//老师id
      courseId: this.data.index1+1,//课程id
      courseNo: this.data.courseId,//课程编号
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