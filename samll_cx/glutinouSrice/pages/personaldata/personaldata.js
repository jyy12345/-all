const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [],
    avator: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
    pindex:0,
    library:[],
    selectId:'',
    inform:[],
    tempFilePaths:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var titleArr=[];
    var objectArray=[];
    var that=this;
    //获取图书馆列表
    app.globalData.common.post({
      url:'/personal/library',
    })
    .then(res=>{
      console.log(res);
      if (res.data.status=="200"){
        that.setData({
          array: res.data.data.library,
          library: res.data.data.library
        })
       
      }
    })
    //获取个人信息
    app.globalData.common.post({
      url: '/personal/userInfo',
    })
      .then(res => {
        console.log(res);
        if (res.data.status=="200") {
         that.setData({
           inform: res.data.data.member,
           avator: res.data.data.member.img
         })
          var index = that.data.array.map(item => item.id).indexOf(res.data.data.member.bookshopid)
         that.setData({
           pindex:index
         })
        }
      })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      pindex: e.detail.value
    })
  },
  //保存
  successBtn:function(){
    var that=this;
    that.setData({
      selectId: that.data.library[that.data.pindex]
    })
    console.log(that.data.selectId);
    app.globalData.common.post({
      url:'/personal/userInfoUpdate',
      data:{
        bookshopid: that.data.selectId.id
      }
    })
    .then(res=>{
      console.log(res);
      if(res.data.status="200"){
         wx.showToast({
           title: '保存成功',
         })
      }
    })
  },
  //我的地址
  goAddress:function(){
    wx.navigateTo({
      url: '../addressAdministration/addressAdministration',
    })
  },
  //绑定读者卡号
  bdReaderscard:function(){
    wx.navigateTo({
      url: '../bdReaderscard/bdReaderscard',
    })
  },
  /**
     * 上传头像
     */
  upload(userId, path, sCallback) {
    wx.uploadFile({
      url: "https://www.nmsbooks.com/api/personal/uploadImages",
      filePath: path,
      name: 'file',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;text/html; charset=utf-8"
      },
      success(res) {
        const data = JSON.parse(res.data);
        console.log(config.api_base_url + data.data.avator);

        sCallback(data);

      }
    })

  },

  uploadAvator() {

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res);
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        this.setData({
          avator: tempFilePaths
        })
        app.globalData.common.post({
          url:'/personal/uploadImages',
          data: { head: tempFilePaths}
        })
        .then(res=>{
          console.log(res);
        })
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

  }
})