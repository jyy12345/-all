import API from '../../api.js';
Page({
  data: {
    date: '',
    hiddenName: true,
    isScroll: true,
    showModalStatus: false,
    showModal: true,
    weekLength: 7,
    dataTap:false,
    dayList: [],
    weekNum: 0,
    tapThis: 0,
    thisMonth: 0,
    thisYear: 0,
    dayIndex: 0,
    chooseDate: "",
    num: 0,
    codeTime:'',//试听日期
    timesName:'',//试听时间
    names:'',//姓名
    ages:'',//手机号
    sex:'',//性别
    phones:'',//联系方式
    tiJ:true,
    tiJsessan:false
  },
 
 //获取选中日期的值
  chooseDate(e) {
    var that = this;
    var n = e.currentTarget.dataset.index;
    var val = e.currentTarget.dataset.value;
    console.log(n);
    if (n >= that.data.dayIndex) {
      that.setData({
        tapThis: n,
        chooseDate: that.data.thisYear + "-" + that.data.thisMonth + "-" + val,
        showModal: true,
      })
    }
  },

  /** 
  * 弹出框蒙层截断touchmove事件 
  */
  preventTouchMove: function () {
  },
  /** 
   * 隐藏模态对话框 
   */
  // selectTime: ''//试听时间
  names:function(e){
    this.setData({
      names: e.detail.value
    })
  },
  ages:function(e){
    this.setData({
      ages: e.detail.value
    })
  },
  sex:function(e){
    this.setData({
      sex: e.detail.value
    })
  },
  phones:function(e){
   this.setData({
     phones: e.detail.value
   })
  },

  hideModal() {
    var that = this;
    that.setData({
      showModal: true,
    })
  },
  showModalBtn(e) {
    var that = this;
    console.log(e);
    that.setData({
      dataTap: !this.data.dataTap
    })
  },

  heigged: function () {
    this.setData(
      {
        showModalStatus: true
      }
    );
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  //提交
  logSuccess:function(e){
    var myDate = new Date();
    var that = this;
    var audition = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId:111,
      name: this.data.names,
      age: this.data.ages,
      gender: this.data.sex,
      phone: this.data.phones,
      experienceDate: this.data.codeTime,
      duration: this.data.timesName
    }
    wx.request({
      url: API.audition,
      method: "get",
      data: API.getParams(audition),
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: function (res) {
        console.log(res);
        if(res.data.code==0){
          that.setData({
            tiJ: false,
            tiJsessan: true
          })
        }
      },
      fail: function () {
        console.log("fail");
      }
    })
  },
  handleSelecteDate(e) {
    wx.showToast({ title: `${e.detail.date}`, icon: false })
  },
  showDatePicker: function (e) {
    this.setData({
      isScroll: "{{false}}"
    });
  },
  tijiO:function(e){
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },
  onGetCode:function(e){
    console.log(e.detail)
    this.setData({
      codeTime: e.detail.val,
      num: e.detail.val,
    })
  },
  gettimes:function(e){
    console.log(e.detail);
    this.setData({
      timesName:e.detail
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
  
  }
})