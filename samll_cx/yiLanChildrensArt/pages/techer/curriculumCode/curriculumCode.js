import API from '../../../api.js';
const getPhone = wx.getStorageSync("phones");
Page({
  data: {
    lesson:[],
    teacher: [],
    classTime: [],
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    msg: '数据',
    imgalist: [],
    imgalist1: []
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    // this.setData({
    //   imgalist: e.target.dataset.src
    // })
    console.log(this.data.imgalist.push(current))
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.imgalist // 需要预览的图片http链接列表
    })
  },
  previewImages: function (e) {
    var currents = e.target.dataset.src;
    // this.setData({
    //   imgalist1: currents
    // })
    console.log(this.data.imgalist1.push(currents))
    wx.previewImage({
      current: currents, // 当前显示图片的http链接
      urls: this.data.imgalist1 // 需要预览的图片http链接列表
    })
  },
  // // 点击下拉显示框
  // selectTap() {
  //   this.setData({
  //     show: !this.data.show
  //   });
  // },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  onLoad: function (options) {
    var myDate = new Date();
    var that = this;
    that.setData({
      index: options.numId
    })
    var lesson={
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '哈哈',
      phone: getPhone,
      teachingCaseId: options.teachingCaseId
  }
    var curriculumCode = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '哈哈',
      phone: getPhone
    }
    wx.request({
      url: API.lesson,
      method: "get",
      data: API.getParams(lesson),
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          lesson:res.data.data
        })
      },
      fail: function () {
        console.log("fail");
      }
    })

    wx.request({
      url: API.curriculum,
      method: "get",
      data: API.getParams(curriculumCode),
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: function (res) {
        const arrs = [];
        console.log(res);
        for (var i = 0; i < res.data.data.courseNo.length; i++) {
          arrs.push(res.data.data.courseNo[i].info);
        }
        console.log(arrs);
        that.setData({
          teacher: res.data.data,
          selectData: arrs,
          classTime: res.data.data.classTime
        })
      },
      fail: function () {
        console.log("fail");
      }
    })
  }

})