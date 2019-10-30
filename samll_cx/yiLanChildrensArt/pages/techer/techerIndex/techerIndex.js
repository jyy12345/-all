import API from '../../../api.js';
const getPhone = wx.getStorageSync("phones");
Page({
  data: {
    teacher:[],
    id:0,
    height:null,
    btnsBack:false,
    classTime:[],
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    msg: '数据',
    teacherIds:null,//老师id
    lala:'',
    imgalist: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496287851&di=0a26048f586b852193cb5026d60c4fad & imgtype=jpg & er=1 & src=http % 3A % 2F % 2Fpic.58pic.com % 2F58pic % 2F12 % 2F74 % 2F05 % 2F99C58PICYck.jpg' 
    ],
    imgalist1: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496287851&di=0a26048f586b852193cb5026d60c4fad & imgtype=jpg & er=1 & src=http % 3A % 2F % 2Fpic.58pic.com % 2F58pic % 2F12 % 2F74 % 2F05 % 2F99C58PICYck.jpg,https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496287851&di=0a26048f586b852193cb5026d60c4fad & imgtype=jpg & er=1 & src=http % 3A % 2F % 2Fpic.58pic.com % 2F58pic % 2F12 % 2F74 % 2F05 % 2F99C58PICYck.jpg,https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496287851&di=0a26048f586b852193cb5026d60c4fad & imgtype=jpg & er=1 & src=http % 3A % 2F % 2Fpic.58pic.com % 2F58pic % 2F12 % 2F74 % 2F05 % 2F99C58PICYck.jpg,https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496287851&di=0a26048f586b852193cb5026d60c4fad & imgtype=jpg & er=1 & src=http % 3A % 2F % 2Fpic.58pic.com % 2F58pic % 2F12 % 2F74 % 2F05 % 2F99C58PICYck.jpg'
    ],
    
    showData:'',
    xiaoSelect:false
  },
  clossBtn:function(e){
    
    console.log(e);
    this.id = e.target.id;
    console.log(e.target.id)
      this.setData({
        showData: e.target.dataset.ind,
        btnsBack: true,
        lala: e.target.id
      })
    console.log(this.data.lala)
    
    wx.navigateTo({
      url: '../classCadets/classCadets?code=' + e.target.id + '&teacherIds=' + this.data.teacherIds
    })
  },
  // clossBtn1(e){
  //   console.log(e);
  // },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.imgalist // 需要预览的图片http链接列表
    })
  },
  previewImages: function (e) {
    var currents = e.target.dataset.src;
    wx.previewImage({
      current: currents, // 当前显示图片的http链接
      urls: this.data.imgalist1 // 需要预览的图片http链接列表
    })
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    console.log(Index);
    this.setData({
      index: Index,
      show: !this.data.show
    });
    wx.navigateTo({
      url: '../teachingPlan/teachingPlan?courseNo=' + Index,
    })
  },
  onLoad: function (options) {
    var that = this;
    var myDate = new Date();
    var curriculumCode = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '哈哈',
      phone: getPhone
      }
    wx.request({
      url: API.curriculum,
      method: "get",
      data: API.getParams(curriculumCode),
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: function (res) {
        const  arrs=[];
        console.log(res);
        for (var i = 0; i < res.data.data.courseNo.length;i++){
          arrs.push(res.data.data.courseNo[i].info);
        }
        console.log(arrs);
        that.setData({
          teacher: res.data.data,
          selectData: arrs,
          classTime: res.data.data.classTime,
          teacherIds:res.data.data.id
        })
        var query = wx.createSelectorQuery();
        //选择id
        
        query.selectAll('.rights').boundingClientRect(function (rect) {
          console.log(rect)
          that.setData({
            height: rect
          })
        }).exec()
      },
      fail: function () {
        console.log("fail");
      }
    })
  },
 

})